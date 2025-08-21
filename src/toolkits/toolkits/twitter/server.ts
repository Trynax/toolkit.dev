import { createServerToolkit } from "@/toolkits/create-toolkit";
import { baseTwitterToolkitConfig } from "./base";
import {
  getUserProfileToolConfigServer,
  getLatestTweetsToolConfigServer,
  searchTweetsToolConfigServer,
  getFollowersToolConfigServer,
  getFollowingToolConfigServer,
  getTrendingTopicsToolConfigServer,
  getUserMentionsToolConfigServer,
} from "./tools/server";
import { TwitterTools } from "./tools";
import { api } from "@/trpc/server";
import { TwitterApi } from "twitter-api-v2";

export const twitterToolkitServer = createServerToolkit(
  baseTwitterToolkitConfig,
  `You have access to the Twitter toolkit for comprehensive Twitter data analysis and user research. This toolkit provides:

- **Get User Profile**: Retrieve detailed information about a Twitter user by their username
- **Get Latest Tweets**: Fetch the most recent tweets from a user (up to 100 tweets)
- **Search Tweets**: Search for tweets using Twitter's search API with advanced operators
- **Get Followers**: Retrieve followers of a user with detailed user information
- **Get Following**: Get users that a specific user is following
- **Get Trending Topics**: Retrieve trending topics and hashtags (requires premium API access)
- **Get User Mentions**: Get tweets that mention a specific user or the authenticated user

**Tool Sequencing Strategies:**
1. **User Research**: Start with Get User Profile to understand a user's background, then use Get Latest Tweets to see their recent activity
2. **Content Analysis**: Use Get Latest Tweets and Search Tweets to analyze content patterns and engagement
3. **Network Analysis**: Combine Get Followers and Get Following to understand user connections and influence
4. **Mention Monitoring**: Use Get User Mentions to track conversations about specific users
5. **Trend Analysis**: Use Search Tweets with hashtags and Get Trending Topics to identify popular themes

**Best Practices:**
- Use usernames without the @ symbol (e.g., 'elonmusk' not '@elonmusk')
- For tweet analysis, start with fewer results (10-20) to get a quick overview
- Use the exclude_retweets and exclude_replies options to focus on original content
- Consider the user's follower count and verification status when analyzing their influence
- Use search operators like 'from:username', 'to:username', '#hashtag', 'lang:en' for precise searches
- Combine multiple tools for comprehensive user and content analysis`,
  async () => {
    const account = await api.accounts.getAccountByProvider("twitter");

    if (!account) {
      throw new Error(
        "No Twitter account found. Please connect your Twitter account first.",
      );
    }

    if (!account.access_token) {
      throw new Error(
        "Twitter access token not found. Please reconnect your Twitter account.",
      );
    }

    // Create Twitter API client with user's access token
    const client = new TwitterApi(account.access_token);

    return {
      [TwitterTools.GetUserProfile]: getUserProfileToolConfigServer(client),
      [TwitterTools.GetLatestTweets]: getLatestTweetsToolConfigServer(client),
      [TwitterTools.SearchTweets]: searchTweetsToolConfigServer(client),
      [TwitterTools.GetFollowers]: getFollowersToolConfigServer(client),
      [TwitterTools.GetFollowing]: getFollowingToolConfigServer(client),
      [TwitterTools.GetTrendingTopics]:
        getTrendingTopicsToolConfigServer(client),
      [TwitterTools.GetUserMentions]: getUserMentionsToolConfigServer(client),
    };
  },
);
