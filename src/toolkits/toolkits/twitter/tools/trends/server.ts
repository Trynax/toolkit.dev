import type { ServerToolConfig } from "@/toolkits/types";
import type { getTrendingTopicsTool } from "./base";
import type { TwitterApi } from "twitter-api-v2";

export const getTrendingTopicsToolConfigServer = (
  client: TwitterApi,
): ServerToolConfig<
  typeof getTrendingTopicsTool.inputSchema.shape,
  typeof getTrendingTopicsTool.outputSchema.shape
> => {
  return {
    callback: async (args: { woeid?: number }) => {
      const { woeid = 1 } = args; // Default to worldwide

      try {
        // Get trending topics using v1.1 API
        const trends = await client.v1.trendsAvailable();

        // For now, return a mock response since trending API access is limited
        throw new Error(
          "Trending topics require Twitter API v1.1 Premium access. This feature is not available with basic API tier.",
        );
      } catch (error) {
        // Fallback message if v1.1 API is not available
        throw new Error(
          "Trending topics require Twitter API v1.1 access. This feature may not be available with current API tier.",
        );
      }
    },
    message: (result) =>
      `Retrieved ${result.trends.length} trending topics for ${result.location.name}`,
  };
};
