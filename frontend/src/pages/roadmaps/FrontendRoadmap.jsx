import RoadmapView from '../../components/RoadmapView';
import { frontendRoadmap } from '../../data/roadmaps/frontendRoadmap';
import { useUserProgress } from '../../hooks/useUserProgress';

export default function FrontendRoadmap() {
  const { updateProgress, getProgress } = useUserProgress();
  const roadmapId = 'frontend';
  const progress = getProgress(roadmapId);

  const handleCompleteSection = (sectionId) => {
    const newProgress = progress + 10; // Example progress calculation
    updateProgress(roadmapId, newProgress);
  };

  return (
    <RoadmapView
      title={frontendRoadmap.title}
      description={frontendRoadmap.description}
      nodes={frontendRoadmap.nodes}
    />
  );
} 