import { FunctionTool, LlmAgent } from "@google/adk";
import { z } from "zod";

const getCurrentTime = new FunctionTool({
  name: "get_current_time",
  description: "Returns the current time in a specified city.",
  parameters: z.object({
    city: z.string().describe("The name of the city."),
    timezone: z
      .string()
      .describe(
        "IANA timezone identifier of the city, e.g. 'America/Toronto' for Ottawa, 'Europe/Paris' for Paris.",
      ),
  }),
  execute: ({ city, timezone }) => {
    try {
      const time = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        dateStyle: "full",
        timeStyle: "long",
      }).format(new Date());
      return {
        status: "success",
        report: `The current time in ${city} is ${time}`,
      };
    } catch {
      return {
        status: "error",
        report: `Invalid timezone '${timezone}' for ${city}`,
      };
    }
  },
});

export const rootAgent = new LlmAgent({
  name: "hello_time_agent",
  model: "gemini-3.5-flash-lite",
  description: "Tells the current time in a specified city.",
  instruction: `You are a time assistant. Your ONLY purpose is to tell the current time in a city.
Always use the 'get_current_time' tool and pass the city's IANA timezone.
If the user asks anything that is not about the current time in a place
(general knowledge, politics, opinions, etc.), politely refuse in one sentence
and say you can only provide the current time in a city.
Never answer from your own knowledge.`,
  tools: [getCurrentTime],
});
