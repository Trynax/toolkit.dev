import type { ClientToolConfig } from "@/toolkits/types";
import type { getTrendingTopicsTool } from "./base";

export const getTrendingTopicsToolConfigClient: ClientToolConfig<
  typeof getTrendingTopicsTool.inputSchema.shape,
  typeof getTrendingTopicsTool.outputSchema.shape
> = {
  CallComponent: ({ args, isPartial }) => (
    <div className="flex items-center gap-2">
      <span>📈</span>
      <span>Getting trending topics</span>
      {args.woeid !== 1 && (
        <span className="text-muted-foreground text-sm">
          (location: {args.woeid})
        </span>
      )}
      {isPartial && <span className="animate-pulse">...</span>}
    </div>
  ),
  ResultComponent: ({ args, result }) => (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">Trending Topics</h3>
        <span className="text-muted-foreground text-sm">
          {result.trends.length} trends
        </span>
      </div>
      <div className="text-muted-foreground mb-2 text-sm">
        Location: {result.location.name}
      </div>
      <div className="text-sm">
        Successfully retrieved trending topics. Analyze popular hashtags,
        conversation themes, and emerging topics.
      </div>
    </div>
  ),
};
