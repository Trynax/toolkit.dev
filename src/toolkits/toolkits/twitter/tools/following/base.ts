import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";
import type { UserV2TimelineResult } from "twitter-api-v2";

export const getFollowingTool = createBaseTool({
  description:
    "Get users that a Twitter user is following with pagination support",
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
      .describe("Number of following users to retrieve (1-1000, default 100)"),
  }),
  outputSchema: z.object({
    following: z.custom<UserV2TimelineResult>(),
    meta: z.object({
      result_count: z.number(),
      next_token: z.string().optional(),
      previous_token: z.string().optional(),
    }),
  }),
});
