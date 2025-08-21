import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";
import type { TweetSearchRecentV2Paginator } from "twitter-api-v2";

export const searchTweetsTool = createBaseTool({
  description:
    "Search for tweets using Twitter's search API with various filters and operators",
  inputSchema: z.object({
    query: z
      .string()
      .min(1)
      .max(500)
      .describe(
        "Search query. Supports operators like: 'from:username', 'to:username', '#hashtag', 'lang:en', 'is:retweet', '-is:retweet', etc.",
      ),
    max_results: z
      .number()
      .min(10)
      .max(100)
      .default(10)
      .describe("Number of tweets to retrieve (10-100, default 10)"),
    sort_order: z
      .enum(["recency", "relevancy"])
      .default("recency")
      .describe("Sort tweets by recency or relevancy"),
  }),
  outputSchema: z.object({
    tweets: z.custom<TweetSearchRecentV2Paginator>(),
    meta: z.object({
      result_count: z.number(),
      newest_id: z.string().optional(),
      oldest_id: z.string().optional(),
      next_token: z.string().optional(),
    }),
  }),
});
