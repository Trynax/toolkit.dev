import type { ServerToolConfig } from "@/toolkits/types";
import type { getFollowersTool } from "./base";
import type { TwitterApi } from "twitter-api-v2";

export const getFollowersToolConfigServer = (
  client: TwitterApi,
): ServerToolConfig<
  typeof getFollowersTool.inputSchema.shape,
  typeof getFollowersTool.outputSchema.shape
> => {
  return {
    callback: async (args: { username: string; max_results?: number }) => {
      const { username, max_results = 100 } = args;

      // First get the user ID
      const user = await client.v2.userByUsername(username);
      if (!user.data) {
        throw new Error(`User ${username} not found`);
      }

      const userId = user.data.id;

      // Get followers
      const followers = await client.v2.followers(userId, {
        max_results,
        "user.fields": [
          "username",
          "name",
          "description",
          "public_metrics",
          "verified_type",
          "profile_image_url",
          "created_at",
        ],
      });

      return {
        followers,
        meta: {
          result_count: followers.meta.result_count || 0,
          next_token: followers.meta.next_token,
          previous_token: followers.meta.previous_token,
        },
      };
    },
    message: (result) =>
      `Retrieved ${result.meta.result_count} followers for the user`,
  };
};
