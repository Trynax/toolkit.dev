import type { ServerToolConfig } from "@/toolkits/types";
import type { searchTweetsTool } from "./base";
import type { TwitterApi } from "twitter-api-v2";

export const searchTweetsToolConfigServer = (
  client: TwitterApi,
): ServerToolConfig<
  typeof searchTweetsTool.inputSchema.shape,
  typeof searchTweetsTool.outputSchema.shape
> => {
  return {
    callback: async (args: {
      query: string;
      max_results?: number;
      sort_order?: "recency" | "relevancy";
    }) => {
      const { query, max_results = 10, sort_order = "recency" } = args;

      const tweets = await client.v2.search(query, {
        max_results,
        sort_order,
        "tweet.fields": [
          "created_at",
          "public_metrics",
          "entities",
          "referenced_tweets",
          "author_id",
          "context_annotations",
          "lang",
        ],
        "user.fields": ["username", "name", "verified_type", "public_metrics"],
        expansions: ["author_id"],
      });

      return {
        tweets,
        meta: {
          result_count: tweets.meta.result_count || 0,
          newest_id: tweets.meta.newest_id,
          oldest_id: tweets.meta.oldest_id,
          next_token: tweets.meta.next_token,
        },
      };
    },
    message: (result) =>
      `Found ${result.meta.result_count} tweets matching the search query`,
  };
};
