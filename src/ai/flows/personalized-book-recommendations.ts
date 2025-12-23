'use server';

/**
 * @fileOverview Provides personalized book recommendations based on user browsing history.
 *
 * - getPersonalizedBookRecommendations - A function that returns personalized book recommendations.
 * - PersonalizedBookRecommendationsInput - The input type for the getPersonalizedBookRecommendations function.
 * - PersonalizedBookRecommendationsOutput - The return type for the getPersonalizedBookRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedBookRecommendationsInputSchema = z.object({
  browsingHistory: z.array(
    z.object({
      bookId: z.string().describe('The ID of the book.'),
      title: z.string().describe('The title of the book.'),
      author: z.string().describe('The author of the book.'),
      categories: z.array(z.string()).describe('The categories of the book.'),
    })
  ).describe('The user browsing history.'),
  numberOfRecommendations: z.number().describe('The number of book recommendations to return.'),
});
export type PersonalizedBookRecommendationsInput = z.infer<typeof PersonalizedBookRecommendationsInputSchema>;

const PersonalizedBookRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      bookId: z.string().describe('The ID of the recommended book.'),
      title: z.string().describe('The title of the recommended book.'),
      author: z.string().describe('The author of the recommended book.'),
      categories: z.array(z.string()).describe('The categories of the recommended book.'),
      reason: z.string().describe('The reason for the recommendation.'),
    })
  ).describe('A list of personalized book recommendations.'),
});
export type PersonalizedBookRecommendationsOutput = z.infer<typeof PersonalizedBookRecommendationsOutputSchema>;

export async function getPersonalizedBookRecommendations(input: PersonalizedBookRecommendationsInput): Promise<PersonalizedBookRecommendationsOutput> {
  return personalizedBookRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedBookRecommendationsPrompt',
  input: {schema: PersonalizedBookRecommendationsInputSchema},
  output: {schema: PersonalizedBookRecommendationsOutputSchema},
  prompt: `You are an expert book recommender. Based on the user's browsing history, provide personalized book recommendations.

  Browsing History:
  {{#each browsingHistory}}
  - Title: {{this.title}}, Author: {{this.author}}, Categories: {{this.categories}}
  {{/each}}

  Number of Recommendations: {{numberOfRecommendations}}

  Provide recommendations that align with the user's interests and preferences as indicated by their browsing history. Include a brief reason for each recommendation.

  Format your response as a JSON object conforming to the following schema:
  ${JSON.stringify(PersonalizedBookRecommendationsOutputSchema.describe, null, 2)}`,
});

const personalizedBookRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedBookRecommendationsFlow',
    inputSchema: PersonalizedBookRecommendationsInputSchema,
    outputSchema: PersonalizedBookRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
