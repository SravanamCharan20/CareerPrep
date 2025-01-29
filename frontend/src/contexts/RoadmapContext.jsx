import { createContext, useContext, useState, useEffect } from 'react';

const RoadmapContext = createContext();

// eslint-disable-next-line react/prop-types
export function RoadmapProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    // Load progress from localStorage if available
    const savedProgress = localStorage.getItem('roadmapProgress');
    return savedProgress ? JSON.parse(savedProgress) : {};
  });

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('roadmapProgress', JSON.stringify(progress));
  }, [progress]);

  const toggleStepCompletion = (roadmapId, stepId) => {
    setProgress(prev => ({
      ...prev,
      [roadmapId]: {
        ...prev[roadmapId],
        [stepId]: !prev[roadmapId]?.[stepId]
      }
    }));
  };

  const getCompletedSteps = (roadmapId) => {
    return Object.values(progress[roadmapId] || {}).filter(Boolean).length;
  };

  const getTotalSteps = (roadmapId) => {
    // You can define total steps for each roadmap
    const totalSteps = {
      frontend: 137,
      backend: 124,
      mobile: 98,
      ai: 112
    };
    return totalSteps[roadmapId] || 0;
  };

  const isStepCompleted = (roadmapId, stepId) => {
    return !!progress[roadmapId]?.[stepId];
  };

  const resetProgress = (roadmapId) => {
    setProgress(prev => ({
      ...prev,
      [roadmapId]: {}
    }));
  };

  return (
    <RoadmapContext.Provider value={{
      progress,
      toggleStepCompletion,
      getCompletedSteps,
      getTotalSteps,
      isStepCompleted,
      resetProgress
    }}>
      {children}
    </RoadmapContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRoadmap() {
  return useContext(RoadmapContext);
} 