import { RoadmapCard } from "../components/RoadmapCard.jsx";
import { roadmaps } from "../data/roadmap.js";

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-[#0B1121] text-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
            Developer Roadmaps
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            roadmap.sh is a community effort to create roadmaps, guides and other educational content to help guide
            developers in picking up a path and guide their learnings.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl text-gray-300">Role-based Roadmaps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roadmaps.map((roadmap) => (
              <RoadmapCard key={roadmap.title} {...roadmap} />
            ))}
          </div>
          <button className="w-full p-6 rounded-lg border border-dashed border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300 transition-colors">
            + Create your own Roadmap
          </button>
        </div>
      </div>
    </div>
  );
}