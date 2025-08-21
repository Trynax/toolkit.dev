import type { ServerToolConfig } from "@/toolkits/types";
import type { getUserMentionsTool } from "./base";
import type { TwitterApi } from "twitter-api-v2";

export const getUserMentionsToolConfigServer = (
  client: TwitterApi,
): ServerToolConfig<
  typeof getUserMentionsTool.inputSchema.shape,
  typeof getUserMentionsTool.outputSchema.shape
> => {
  return {
    callback: async (args: { username?: string; max_results?: number }) => {
      const { username, max_results = 10 } = args;

      let userId: string;

      if (username) {
        // Get mentions for specific user
        const user = await client.v2.userByUsername(username);
        if (!user.data) {
          throw new Error(`User ${username} not found`);
        }
        userId = user.data.id;
      } else {
        // Get mentions for authenticated user
        const me = await client.v2.me();
        if (!me.data) {
          throw new Error("Unable to get authenticated user information");
        }
        userId = me.data.id;
      }

      // Get mentions using user mention timeline
      const mentions = await client.v2.userMentionTimeline(userId, {
        max_results,
        "tweet.fields": [
          "created_at",
          "public_metrics",
          "entities",
          "referenced_tweets",
          "author_id",
          "context_annotations",
        ],
        "user.fields": ["username", "name", "verified_type", "public_metrics"],
        expansions: ["author_id"],
      });

      return {
        mentions,
        meta: mentions.meta,
      };
    },
    message: (result) => `Retrieved ${result.meta.result_count} mentions`,
  };
};
