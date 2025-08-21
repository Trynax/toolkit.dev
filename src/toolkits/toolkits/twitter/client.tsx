import { SiX } from "@icons-pack/react-simple-icons";

import { createClientToolkit } from "@/toolkits/create-toolkit";

import { baseTwitterToolkitConfig } from "./base";
import { TwitterTools } from "./tools";
import {
  getUserProfileToolConfigClient,
  getLatestTweetsToolConfigClient,
  searchTweetsToolConfigClient,
  getFollowersToolConfigClient,
  getFollowingToolConfigClient,
  getTrendingTopicsToolConfigClient,
  getUserMentionsToolConfigClient,
} from "./tools/client";

import { ToolkitGroups } from "@/toolkits/types";

import { TwitterWrapper } from "./wrapper";

export const twitterClientToolkit = createClientToolkit(
  baseTwitterToolkitConfig,
  {
    name: "Twitter",
    description:
      "Comprehensive Twitter toolkit for user analysis, search, and social network research",
    icon: SiX,
    form: null,
    Wrapper: TwitterWrapper,
    type: ToolkitGroups.DataSource,
    envVars: [
      {
        type: "all",
        keys: ["AUTH_TWITTER_ID", "AUTH_TWITTER_SECRET"],
        description: (
          <span>
            Get OAuth credentials from{" "}
            <a
              href="https://developer.twitter.com/en/portal/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Twitter Developer Portal
            </a>
            . You&apos;ll need to create an app and generate OAuth 1.0a
            credentials.
          </span>
        ),
      },
    ],
  },
  {
    [TwitterTools.GetUserProfile]: getUserProfileToolConfigClient,
    [TwitterTools.GetLatestTweets]: getLatestTweetsToolConfigClient,
    [TwitterTools.SearchTweets]: searchTweetsToolConfigClient,
    [TwitterTools.GetFollowers]: getFollowersToolConfigClient,
    [TwitterTools.GetFollowing]: getFollowingToolConfigClient,
    [TwitterTools.GetTrendingTopics]: getTrendingTopicsToolConfigClient,
    [TwitterTools.GetUserMentions]: getUserMentionsToolConfigClient,
  },
);
