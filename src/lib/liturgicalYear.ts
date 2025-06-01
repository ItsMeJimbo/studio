
'use client';

import {
  getYear, getMonth, getDate, addDays, subDays,
  startOfDay, isSameDay, isBefore, isAfter,
  setYear, setMonth, setDate as setDateOfMonth, // Renamed to avoid conflict
  getDay, // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  format,
  differenceInDays,
  startOfYear,
  endOfYear,
} from 'date-fns';

// Function to calculate Easter Sunday (Anonymous Gregorian algorithm)
// Returns a Date object for Easter Sunday in the given year.
export function getEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // month is 1-based (March=3, April=4)
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return startOfDay(new Date(year, month - 1, day)); // month - 1 because Date constructor expects 0-indexed month
}

// Function to calculate Ash Wednesday
export function getAshWednesday(year: number): Date {
  const easter = getEaster(year);
  return startOfDay(subDays(easter, 46));
}

// Function to calculate Pentecost Sunday
export function getPentecost(year: number): Date {
  const easter = getEaster(year);
  return startOfDay(addDays(easter, 49)); // 7 weeks after Easter
}

// Function to calculate the First Sunday of Advent
export function getFirstSundayOfAdvent(year: number): Date {
  const christmas = startOfDay(new Date(year, 11, 25)); // December 25th
  const christmasDayOfWeek = getDay(christmas); // 0 (Sun) to 6 (Sat)

  // Days to subtract to get to the Sunday before Christmas (or Christmas itself if it's a Sunday)
  let daysToPreviousSunday = christmasDayOfWeek;
  const sundayBeforeChristmas = subDays(christmas, daysToPreviousSunday);

  // Advent starts on the 4th Sunday before Christmas
  return startOfDay(subDays(sundayBeforeChristmas, 21)); // Subtract 3 more weeks
}

// Function to calculate Epiphany (January 6th)
export function getEpiphany(year: number): Date {
  return startOfDay(new Date(year, 0, 6)); // January 6th
}

// Function to calculate Baptism of the Lord
// The Sunday after Epiphany (Jan 6). If Epiphany is Jan 7 or 8 (a Sunday or Monday), then Baptism is the next day (Monday or Tuesday).
// Simplified: Sunday following Jan 6.
export function getBaptismOfTheLord(year: number): Date {
  const epiphany = getEpiphany(year);
  let baptismDate = epiphany;
  while (getDay(baptismDate) !== 0) { // Find the next Sunday
    baptismDate = addDays(baptismDate, 1);
  }
  // If Epiphany itself is a Sunday, Baptism is the following Sunday. No, this rule is more complex.
  // Rule: The Sunday after January 6.
  // If Jan 6 is Sunday, Baptism is Jan 13.
  // If Jan 6 is Saturday (e.g. 2024), Epiphany is celebrated Jan 7 (Sun), Baptism is Jan 8 (Mon)
  // Let's use a simpler rule for now: The Sunday falling on or after Jan 7.
  // Or more accurately: The Sunday after the Epiphany (Jan 6). If Jan 6 is a Sunday, it's Jan 13. Otherwise, it's the first Sunday after Jan 6.

  // Corrected logic: Baptism of the Lord is the first Sunday *after* January 6th.
  // If Jan 6 is a Sunday, then Baptism is the *following* Sunday. (e.g. Jan 6, 2019 was Sun, Baptism was Jan 13, 2019)
  // However, if Epiphany is transferred to Sunday Jan 7 or 8, Baptism is the following Monday.
  // This is too complex for a simple rule. Standard practice in US is Sunday after Jan 6.
  let current = startOfDay(new Date(year, 0, 7)); // Start checking from Jan 7
  while (getDay(current) !== 0) { // 0 is Sunday
      current = addDays(current, 1);
  }
  return current;
}

export interface LiturgicalSeasonInfo {
  name: string;
  color: string; // e.g., 'purple', 'white', 'green', 'red', 'rose'
  description: string;
  dateRange?: string; // Optional: for displaying the date range
}

export function getCurrentLiturgicalSeason(currentDateInput?: Date): LiturgicalSeasonInfo {
  const currentDate = startOfDay(currentDateInput || new Date());
  const year = getYear(currentDate);

  // Key dates for the current liturgical year (which might span calendar years)
  const easterCurrentYear = getEaster(year);
  const ashWednesdayCurrentYear = getAshWednesday(year);
  const pentecostCurrentYear = getPentecost(year);
  const firstSundayOfAdventCurrentYear = getFirstSundayOfAdvent(year);
  const christmasCurrentYear = startOfDay(new Date(year, 11, 25));
  const baptismOfLordCurrentYear = getBaptismOfTheLord(year);

  // Key dates for previous/next calendar year for seasons spanning year boundary
  const firstSundayOfAdventPreviousYear = getFirstSundayOfAdvent(year - 1);
  const christmasPreviousYear = startOfDay(new Date(year - 1, 11, 25));
  const baptismOfLordNextYear = getBaptismOfTheLord(year + 1); // For Christmas season ending in Jan

  // Format date helper
  const formatDate = (date: Date) => format(date, 'MMM d');

  // 1. Advent
  // Advent season from previous year extending into current year, or current year's Advent
  if (isAfter(currentDate, firstSundayOfAdventPreviousYear) && isBefore(currentDate, startOfDay(new Date(year, 0, 1)))) {
     // Part of previous year's Advent that falls in current calendar year (e.g. Dec 27-31)
  }
  if (isSameDay(currentDate, firstSundayOfAdventCurrentYear) || (isAfter(currentDate, firstSundayOfAdventCurrentYear) && isBefore(currentDate, christmasCurrentYear))) {
    return {
      name: "Advent",
      color: "purple",
      description: "A time of joyful expectation and preparation for Christmas.",
      dateRange: `${formatDate(firstSundayOfAdventCurrentYear)} - ${formatDate(subDays(christmasCurrentYear,1))}`
    };
  }
  // Check if in Advent from previous year (e.g. current date is Jan 1-5, Advent started late Nov/early Dec)
  // This logic needs to be careful. If current date is Jan, we need to check against previous year's Advent end (Christmas Eve).
  if (getMonth(currentDate) === 11 && isAfter(currentDate, firstSundayOfAdventCurrentYear)) { // December
     // Already covered
  } else if (isAfter(currentDate, firstSundayOfAdventPreviousYear) && isBefore(currentDate, christmasPreviousYear)) {
    // This case would mean currentDate is in previous year, which is not how year is calculated
  }
  // More robust check for Advent of the *liturgical year* which might have started in previous calendar year
  if (isSameDay(currentDate, firstSundayOfAdventPreviousYear) || (isAfter(currentDate, firstSundayOfAdventPreviousYear) && isBefore(currentDate, startOfDay(new Date(year -1, 11, 25))))) {
      // This logic is for the previous year, the primary check handles current year's Advent.
  }
  // Final Advent check: if current date is in Dec and after 1st Sun of Advent, OR if current date is in Nov and IS 1st Sun of Advent or later
  const endOfAdventPreviousYear = subDays(christmasPreviousYear,1);
  if( (isSameDay(currentDate, firstSundayOfAdventPreviousYear) || isAfter(currentDate, firstSundayOfAdventPreviousYear)) && isBefore(currentDate, christmasPreviousYear) ) {
     return {
      name: "Advent",
      color: "purple",
      description: "A time of joyful expectation and preparation for Christmas.",
      dateRange: `${formatDate(firstSundayOfAdventPreviousYear)} - ${formatDate(endOfAdventPreviousYear)}`
    };
  }


  // 2. Christmas Time
  // Extends from Christmas Day of previous year into January of current year OR current year's Christmas
  if ( (isSameDay(currentDate, christmasPreviousYear) || isAfter(currentDate, christmasPreviousYear)) && isBefore(currentDate, getBaptismOfTheLord(year)) ) {
    return {
      name: "Christmas Time",
      color: "white",
      description: "Celebrating the birth of Jesus Christ.",
      dateRange: `${formatDate(christmasPreviousYear)} - ${formatDate(subDays(getBaptismOfTheLord(year),1))}`
    };
  }
  if ( (isSameDay(currentDate, christmasCurrentYear) || isAfter(currentDate, christmasCurrentYear)) && isBefore(currentDate, baptismOfLordNextYear) ) {
    return {
      name: "Christmas Time",
      color: "white",
      description: "Celebrating the birth of Jesus Christ.",
      dateRange: `${formatDate(christmasCurrentYear)} - ${formatDate(subDays(baptismOfLordNextYear,1))}`
    };
  }

  // 3. Lent
  if ((isSameDay(currentDate, ashWednesdayCurrentYear) || isAfter(currentDate, ashWednesdayCurrentYear)) && isBefore(currentDate, easterCurrentYear)) {
    return {
      name: "Lent",
      color: "purple",
      description: "A period of prayer, fasting, and almsgiving in preparation for Easter.",
      dateRange: `${formatDate(ashWednesdayCurrentYear)} - ${formatDate(subDays(easterCurrentYear,1))}`
    };
  }

  // 4. Easter Time (includes Easter Sunday up to Pentecost)
  if ((isSameDay(currentDate, easterCurrentYear) || isAfter(currentDate, easterCurrentYear)) && isBefore(currentDate, pentecostCurrentYear)) {
    return {
      name: "Easter Time",
      color: "white",
      description: "Celebrating the Resurrection of Jesus Christ and new life.",
      dateRange: `${formatDate(easterCurrentYear)} - ${formatDate(subDays(pentecostCurrentYear,1))}`
    };
  }
  if (isSameDay(currentDate, pentecostCurrentYear)) {
    return {
        name: "Pentecost Sunday",
        color: "red",
        description: "Celebrating the descent of the Holy Spirit.",
        dateRange: formatDate(pentecostCurrentYear)
    }
  }


  // 5. Ordinary Time
  // Part 1: After Christmas Time, before Lent
  if (isAfter(currentDate, getBaptismOfTheLord(year)) && isBefore(currentDate, ashWednesdayCurrentYear)) {
    return {
      name: "Ordinary Time",
      color: "green",
      description: "A time for growth in faith and discipleship.",
      dateRange: `${formatDate(addDays(getBaptismOfTheLord(year),0))} - ${formatDate(subDays(ashWednesdayCurrentYear,1))}`
    };
  }
  // Part 2: After Pentecost, before Advent
  if (isAfter(currentDate, pentecostCurrentYear) && isBefore(currentDate, firstSundayOfAdventCurrentYear)) {
    return {
      name: "Ordinary Time",
      color: "green",
      description: "A time for growth in faith and discipleship.",
      dateRange: `${formatDate(addDays(pentecostCurrentYear,1))} - ${formatDate(subDays(firstSundayOfAdventCurrentYear,1))}`
    };
  }

  // Default fallback (should ideally be covered by Ordinary Time logic if checks are robust)
  // This often means it's in the sliver of Ordinary Time at the very start of Jan before Baptism of Lord if Christmas was from prev year
  // Or if it's late Dec after Christmas but before new year's Advent/Christmas logic kicks in fully.
  // Re-check Ordinary Time Part 1 for very early January dates:
  const baptismPrevYearCycle = getBaptismOfTheLord(year); // Baptism for current year (e.g., Jan 2024)
  const ashWedCurrentYear = ashWednesdayCurrentYear;
  if(isAfter(currentDate, baptismPrevYearCycle) && isBefore(currentDate, ashWedCurrentYear)) {
    return {
        name: "Ordinary Time",
        color: "green",
        description: "A time for growth in faith and discipleship (Early Year).",
        dateRange: `${formatDate(baptismPrevYearCycle)} - ${formatDate(subDays(ashWedCurrentYear,1))}`
      };
  }


  return {
    name: "Ordinary Time", // Default fallback
    color: "green",
    description: "A time for growth in faith and discipleship.",
    dateRange: "Varies"
  };
}
