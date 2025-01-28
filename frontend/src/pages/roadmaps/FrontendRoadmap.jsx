import RoadmapView from '../../components/RoadmapView';
import { frontendRoadmap } from '../../data/roadmaps/frontendRoadmap';

export default function FrontendRoadmap() {
  return (
    <RoadmapView
      title={frontendRoadmap.title}
      description={frontendRoadmap.description}
      nodes={frontendRoadmap.nodes}
    />
  );
} 