import type { ClientToolConfig } from "@/toolkits/types";
import type { getUserMentionsTool } from "./base";

export const getUserMentionsToolConfigClient: ClientToolConfig<
  typeof getUserMentionsTool.inputSchema.shape,
  typeof getUserMentionsTool.outputSchema.shape
> = {
  CallComponent: ({ args, isPartial }) => (
    <div className="flex items-center gap-2">
      <span>@</span>
      <span>
        Getting mentions
        {args.username ? ` for @${args.username}` : " for authenticated user"}
      </span>
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
        <h3 className="font-semibold">Mentions Retrieved</h3>
        <span className="text-muted-foreground text-sm">
          {result.meta.result_count} mentions
        </span>
      </div>
      <div className="text-muted-foreground mb-2 text-sm">
        {args.username
          ? `Mentions for: @${args.username}`
          : "Mentions for authenticated user"}
      </div>
      <div className="text-sm">
        Successfully retrieved mention data. Analyze engagement, sentiment, and
        conversations around the user.
      </div>
    </div>
  ),
};
