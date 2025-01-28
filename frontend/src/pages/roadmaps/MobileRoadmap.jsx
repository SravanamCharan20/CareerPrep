import RoadmapView from '../../components/RoadmapView';
import { mobileRoadmap } from '../../data/roadmaps/mobileRoadmap';

export default function MobileRoadmap() {
  return (
    <RoadmapView
      title={mobileRoadmap.title}
      description={mobileRoadmap.description}
      nodes={mobileRoadmap.nodes}
    />
  );
} 