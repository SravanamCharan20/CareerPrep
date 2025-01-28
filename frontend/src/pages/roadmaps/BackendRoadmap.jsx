import RoadmapView from '../../components/RoadmapView';
import { backendRoadmap } from '../../data/roadmaps/backendRoadmap';

export default function BackendRoadmap() {
  return (
    <RoadmapView
      title={backendRoadmap.title}
      description={backendRoadmap.description}
      nodes={backendRoadmap.nodes}
    />
  );
} 