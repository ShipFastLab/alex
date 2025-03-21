import { createAzure } from '@ai-sdk/azure';
import { Agent } from '@mastra/core/agent';
import { weatherTool } from '../tools';


const azure = createAzure({
    resourceName: process.env.AZURE_OPENAI_RESOURCE_NAME,
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    apiVersion: process.env.AZURE_OPENAI_API_VERSION,
  });

export const weatherAgent = new Agent({
  name: 'Weather Agent',
  instructions: `
      You are a helpful weather assistant that provides accurate weather information.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn’t in English, please translate it
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative

      Use the weatherTool to fetch current weather data.
`,
  model: azure('gpt-4o'),
  tools: { weatherTool },
});

