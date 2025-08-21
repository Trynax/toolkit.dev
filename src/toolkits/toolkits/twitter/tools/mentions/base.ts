import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";
import type { TweetUserMentionTimelineV2Paginator } from "twitter-api-v2";

export const getUserMentionsTool = createBaseTool({
  description:
    "Get tweets that mention the authenticated user or a specific user",
  inputSchema: z.object({
    username: z
      .string()
      .optional()
      .describe(
        "Twitter username to get mentions for (without @ symbol). If not provided, gets mentions for the authenticated user.",
      ),
    max_results: z
      .number()
      .min(5)
      .max(100)
      .default(10)
      .describe("Number of mentions to retrieve (5-100, default 10)"),
  }),
  outputSchema: z.object({
    mentions: z.custom<TweetUserMentionTimelineV2Paginator>(),
    meta: z.object({
      result_count: z.number(),
      newest_id: z.string().optional(),
      oldest_id: z.string().optional(),
      next_token: z.string().optional(),
    }),
  }),
});
