import type { ToolkitConfig } from "@/toolkits/types";
import { z } from "zod";
import { TwitterTools } from "./tools";
import {
  getUserProfileTool,
  getLatestTweetsTool,
  searchTweetsTool,
  getFollowersTool,
  getFollowingTool,
  getTrendingTopicsTool,
  getUserMentionsTool,
} from "./tools";

export const twitterParameters = z.object({});

export const baseTwitterToolkitConfig: ToolkitConfig<
  TwitterTools,
  typeof twitterParameters.shape
> = {
  tools: {
    [TwitterTools.GetUserProfile]: getUserProfileTool,
    [TwitterTools.GetLatestTweets]: getLatestTweetsTool,
    [TwitterTools.SearchTweets]: searchTweetsTool,
    [TwitterTools.GetFollowers]: getFollowersTool,
    [TwitterTools.GetFollowing]: getFollowingTool,
    [TwitterTools.GetTrendingTopics]: getTrendingTopicsTool,
    [TwitterTools.GetUserMentions]: getUserMentionsTool,
  },
  parameters: twitterParameters,
};
