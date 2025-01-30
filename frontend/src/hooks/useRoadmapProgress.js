import { useDispatch, useSelector } from 'react-redux';
import { updateRoadmapProgress, addActivity, updateUserStats } from '../redux/user/userSlice';

export const useRoadmapProgress = () => {
    const dispatch = useDispatch();
    const { userInteractions } = useSelector(state => state.user);
    
    const roadmapProgress = userInteractions?.roadmapProgress || {
        frontend: {
            progress: 0,
            completedNodes: [],
            totalNodes: 0
        },
        backend: {
            progress: 0,
            completedNodes: [],
            totalNodes: 0
        },
        mobile: {
            progress: 0,
            completedNodes: [],
            totalNodes: 0
        },
        ai: {
            progress: 0,
            completedNodes: [],
            totalNodes: 0
        }
    };

    const updateNodeProgress = (roadmapId, nodeId, isCompleted, totalNodesCount) => {
        try {
            // Get current roadmap state with proper fallback
            const currentRoadmap = roadmapProgress[roadmapId] || {
                progress: 0,
                completedNodes: [],
                totalNodes: totalNodesCount
            };

            // Create new completed nodes array
            let updatedCompletedNodes = [...(currentRoadmap.completedNodes || [])];
            
            if (isCompleted && !updatedCompletedNodes.includes(nodeId)) {
                updatedCompletedNodes.push(nodeId);
            } else if (!isCompleted) {
                updatedCompletedNodes = updatedCompletedNodes.filter(id => id !== nodeId);
            }

            // Calculate new progress
            const newProgress = Math.round((updatedCompletedNodes.length / totalNodesCount) * 100);

            // Dispatch update immediately
            dispatch(updateRoadmapProgress({
                roadmapId,
                data: {
                    progress: newProgress,
                    completedNodes: updatedCompletedNodes,
                    totalNodes: totalNodesCount
                }
            }));

            // Add activity for milestone progress
            if (Math.floor(newProgress / 25) > Math.floor(currentRoadmap.progress / 25)) {
                dispatch(addActivity({
                    type: 'milestone',
                    title: `Reached ${Math.floor(newProgress / 25) * 25}% in ${roadmapId.charAt(0).toUpperCase() + roadmapId.slice(1)} Development`,
                }));
            }

            // Add activity for completion
            if (newProgress >= 100 && currentRoadmap.progress < 100) {
                dispatch(addActivity({
                    type: 'achievement',
                    title: `Completed ${roadmapId.charAt(0).toUpperCase() + roadmapId.slice(1)} Development Roadmap! 🎉`,
                }));
            }

            // Update time spent
            dispatch(updateUserStats({
                totalTimeSpent: 30 * 60 // 30 minutes in seconds
            }));
        } catch (error) {
            console.error('Error in updateNodeProgress:', error);
        }
    };

    const getRoadmapStatus = (roadmapId) => {
        const progress = roadmapProgress[roadmapId]?.progress || 0;
        if (progress === 0) return 'Not Started';
        if (progress === 100) return 'Completed';
        return 'In Progress';
    };

    const getNodeStatus = (roadmapId, nodeId) => {
        const completedNodes = roadmapProgress[roadmapId]?.completedNodes || [];
        return completedNodes.includes(nodeId);
    };

    return {
        roadmapProgress,
        updateNodeProgress,
        getRoadmapStatus,
        getNodeStatus
    };
}; 