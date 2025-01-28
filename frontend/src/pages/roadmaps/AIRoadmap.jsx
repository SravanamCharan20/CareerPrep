import RoadmapView from '../../components/RoadmapView';
import { aiRoadmap } from '../../data/roadmaps/aiRoadmap';

export default function AIRoadmap() {
  return (
    <RoadmapView
      title={aiRoadmap.title}
      description={aiRoadmap.description}
      nodes={aiRoadmap.nodes}
    />
  );
} 