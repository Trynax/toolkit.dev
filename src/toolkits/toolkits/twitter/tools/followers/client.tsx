import type { ClientToolConfig } from "@/toolkits/types";
import type { getFollowersTool } from "./base";

export const getFollowersToolConfigClient: ClientToolConfig<
  typeof getFollowersTool.inputSchema.shape,
  typeof getFollowersTool.outputSchema.shape
> = {
  CallComponent: ({ args, isPartial }) => (
    <div className="flex items-center gap-2">
      <span>👥</span>
      <span>Getting followers for @{args.username}</span>
      {args.max_results && (
        <span className="text-muted-foreground text-sm">
          (max {args.max_results})
        </span>
      )}
      {isPartial && <span className="animate-pulse">...</span>}
    </div>
  ),
  ResultComponent: ({ args, result }) => (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">Followers Retrieved</h3>
        <span className="text-muted-foreground text-sm">
          {result.meta.result_count} followers
        </span>
      </div>
      <div className="text-muted-foreground mb-2 text-sm">
        User: @{args.username}
      </div>
      <div className="text-sm">
        Successfully retrieved follower data. You can analyze follower
        demographics, engagement patterns, and audience insights.
      </div>
    </div>
  ),
};
