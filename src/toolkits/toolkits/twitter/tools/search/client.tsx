import type { ClientToolConfig } from "@/toolkits/types";
import type { searchTweetsTool } from "./base";

export const searchTweetsToolConfigClient: ClientToolConfig<
  typeof searchTweetsTool.inputSchema.shape,
  typeof searchTweetsTool.outputSchema.shape
> = {
  CallComponent: ({ args, isPartial }) => (
    <div className="flex items-center gap-2">
      <span>🔍</span>
      <span>Searching Twitter for: "{args.query}"</span>
      {args.max_results && (
        <span className="text-muted-foreground text-sm">
          (max {args.max_results} results)
        </span>
      )}
      {isPartial && <span className="animate-pulse">...</span>}
    </div>
  ),
  ResultComponent: ({ args, result }) => (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">Twitter Search Results</h3>
        <span className="text-muted-foreground text-sm">
          {result.meta.result_count} tweets found
        </span>
      </div>
      <div className="text-muted-foreground mb-2 text-sm">
        Query: "{args.query}"
      </div>
      <div className="text-sm">
        Search completed successfully. Use the results to analyze tweet content,
        engagement patterns, or trends.
      </div>
    </div>
  ),
};
