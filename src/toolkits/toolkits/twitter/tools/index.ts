export enum TwitterTools {
  GetUserProfile = "get-user-profile",
  GetLatestTweets = "get-latest-tweets",
  SearchTweets = "search-tweets",
  GetFollowers = "get-followers",
  GetFollowing = "get-following",
  GetTrendingTopics = "get-trending-topics",
  GetUserMentions = "get-user-mentions",
}

export * from "./profile/base";
export * from "./tweets/base";
export * from "./search/base";
export * from "./followers/base";
export * from "./following/base";
export * from "./trends/base";
export * from "./mentions/base";
