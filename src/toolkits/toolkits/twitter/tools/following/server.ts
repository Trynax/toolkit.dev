import type { ServerToolConfig } from "@/toolkits/types";
import type { getFollowingTool } from "./base";
import type { TwitterApi } from "twitter-api-v2";

export const getFollowingToolConfigServer = (
  client: TwitterApi,
): ServerToolConfig<
  typeof getFollowingTool.inputSchema.shape,
  typeof getFollowingTool.outputSchema.shape
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

      // Get following
      const following = await client.v2.following(userId, {
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
        following,
        meta: {
          result_count: following.meta.result_count || 0,
          next_token: following.meta.next_token,
          previous_token: following.meta.previous_token,
        },
      };
    },
    message: (result) =>
      `Retrieved ${result.meta.result_count} users that the account is following`,
  };
};
