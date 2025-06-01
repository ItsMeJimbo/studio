'use server';
/**
 * @fileOverview A Genkit flow to generate reflection prompts.
 *
 * - generateReflectionPrompts - A function that generates reflection prompts based on an optional theme.
 * - ReflectionPromptsInput - The input type for the flow.
 * - ReflectionPromptsOutput - The return type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReflectionPromptsInputSchema = z.object({
  theme: z.string().optional().describe("An optional theme for the reflection prompts. e.g., 'Patience', 'Gratitude'. If empty, general prompts will be generated."),
});
export type ReflectionPromptsInput = z.infer<typeof ReflectionPromptsInputSchema>;

const ReflectionPromptsOutputSchema = z.object({
  prompts: z.array(z.string().describe("A thoughtful reflection prompt.")).min(3).max(5).describe("A list of 3-5 reflection prompts."),
});
export type ReflectionPromptsOutput = z.infer<typeof ReflectionPromptsOutputSchema>;

export async function generateReflectionPrompts(input: ReflectionPromptsInput): Promise<ReflectionPromptsOutput> {
  return reflectionPromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reflectionPromptsGenerator',
  input: {schema: ReflectionPromptsInputSchema},
  output: {schema: ReflectionPromptsOutputSchema},
  prompt: `You are a wise and gentle spiritual guide, adept at crafting questions for deep Catholic personal reflection and spiritual growth.
Generate 3 to 5 thoughtful reflection prompts.
{{#if theme}}
The user is looking for prompts related to the theme of: "{{theme}}". Please tailor the prompts to this theme.
{{else}}
The user is looking for general reflection prompts to aid in their spiritual journey and examination of conscience.
{{/if}}
Ensure the prompts encourage introspection and honesty.
Format your response as a list of prompts.`,
});

const reflectionPromptsFlow = ai.defineFlow(
  {
    name: 'reflectionPromptsFlow',
    inputSchema: ReflectionPromptsInputSchema,
    outputSchema: ReflectionPromptsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("Failed to generate reflection prompts. The AI model did not return an output.");
    }
    return output;
  }
);
