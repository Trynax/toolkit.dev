import type { ClientToolConfig } from "@/toolkits/types";
import type { getFollowingTool } from "./base";

export const getFollowingToolConfigClient: ClientToolConfig<
  typeof getFollowingTool.inputSchema.shape,
  typeof getFollowingTool.outputSchema.shape
> = {
  CallComponent: ({ args, isPartial }) => (
    <div className="flex items-center gap-2">
      <span>➡️</span>
      <span>Getting users followed by @{args.username}</span>
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
        <h3 className="font-semibold">Following Retrieved</h3>
        <span className="text-muted-foreground text-sm">
          {result.meta.result_count} accounts
        </span>
      </div>
      <div className="text-muted-foreground mb-2 text-sm">
        User: @{args.username}
      </div>
      <div className="text-sm">
        Successfully retrieved following data. You can analyze who this user
        follows and their interests based on the accounts they engage with.
      </div>
    </div>
  ),
};
