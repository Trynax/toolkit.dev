import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const getTrendingTopicsTool = createBaseTool({
  description:
    "Get trending topics and hashtags on Twitter by location (requires Twitter API v1.1 access)",
  inputSchema: z.object({
    woeid: z
      .number()
      .default(1)
      .describe(
        "Where On Earth ID for location. 1 = Worldwide, 23424977 = United States, 44418 = United Kingdom, etc.",
      ),
  }),
  outputSchema: z.object({
    trends: z.array(
      z.object({
        name: z.string(),
        url: z.string(),
        promoted_content: z.string().nullable(),
        query: z.string(),
        tweet_volume: z.number().nullable(),
      }),
    ),
    location: z.object({
      name: z.string(),
      woeid: z.number(),
    }),
  }),
});
