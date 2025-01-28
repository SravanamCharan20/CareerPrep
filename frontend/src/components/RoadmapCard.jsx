import { Bookmark } from "lucide-react";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export function RoadmapCard({ title, isNew }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg blur-lg transition-opacity opacity-0 group-hover:opacity-100" />
      <div className="relative p-6 rounded-lg border border-gray-800 bg-gray-900/50 hover:border-gray-700 transition-colors">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-gray-200">{title}</h3>
          <div className="flex items-center gap-2">
            {isNew && (
              <span className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                New
              </span>
            )}
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <Bookmark className={isBookmarked ? "fill-current" : ""} size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}