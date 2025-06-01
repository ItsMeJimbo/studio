
import type { Metadata } from 'next';
// import Link from 'next/link'; // No longer needed for back button
// import { Button } from '@/components/ui/button'; // No longer needed for back button
// import { ChevronLeft } from 'lucide-react'; // No longer needed for back button
import { LinkIcon, YoutubeIcon, LandmarkIcon, BookOpenIcon, BookMarked } from 'lucide-react'; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Still needed for "Visit Resource"

export const metadata: Metadata = {
  title: 'Catholic Resources - ConfessEase',
  description: 'Helpful links to Catholic resources for learning and spiritual growth.',
};

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: React.ElementType;
}

const resources: Resource[] = [
  {
    id: 'scholastic-answers',
    title: 'Scholastic Answers (YouTube)',
    description: 'A YouTube channel dedicated to providing clear answers to questions about Catholic faith and theology.',
    url: 'https://www.youtube.com/channel/UCQ5DQ8zCOmeAqOcKTbSb7fg',
    icon: YoutubeIcon,
  },
  {
    id: 'vatican-website',
    title: 'Official Vatican Website',
    description: 'The Holy See\'s official website, offering news, documents, and information from the Vatican.',
    url: 'https://www.vatican.va/content/vatican/en.html',
    icon: LandmarkIcon,
  },
  {
    id: 'catechism',
    title: 'Catechism of the Catholic Church',
    description: 'A summary of the principles of Christian religion in the form of questions and answers, used for instruction.',
    url: 'https://www.vatican.va/archive/ENG0015/_INDEX.HTM',
    icon: BookOpenIcon,
  },
  // Add more resources here
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col font-sans">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3 text-center sm:text-left">
            <BookMarked className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            Catholic Resources
          </h1>
          {/* Back button removed */}
        </div>
        <p className="text-sm sm:text-base text-muted-foreground mt-3 text-center sm:text-left">
          Explore these useful links for deepening your understanding of the Catholic faith.
        </p>
      </header>

      <main className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => {
            const IconComponent = resource.icon;
            return (
              <Card key={resource.id} className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <IconComponent className="h-7 w-7 text-primary" />
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                  </div>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    <Button variant="link" className="px-0">
                      Visit Resource <LinkIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      <footer className="text-center py-6 mt-8 text-xs sm:text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} ConfessEase. All data stored locally.</p>
      </footer>
    </div>
  );
}
