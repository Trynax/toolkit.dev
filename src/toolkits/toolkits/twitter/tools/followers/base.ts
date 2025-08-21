import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";
import type { UserV2TimelineResult } from "twitter-api-v2";

export const getFollowersTool = createBaseTool({
  description: "Get followers of a Twitter user with pagination support",
  inputSchema: z.object({
    username: z
      .string()
      .describe(
        "Twitter username (without @ symbol). Example: 'elonmusk', 'twitter'",
      ),
    max_results: z
      .number()
      .min(1)
      .max(1000)
      .default(100)
      .describe("Number of followers to retrieve (1-1000, default 100)"),
  }),
  outputSchema: z.object({
    followers: z.custom<UserV2TimelineResult>(),
    meta: z.object({
      result_count: z.number(),
      next_token: z.string().optional(),
      previous_token: z.string().optional(),
    }),
  }),
});
