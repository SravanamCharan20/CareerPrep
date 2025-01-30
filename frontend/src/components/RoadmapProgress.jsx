import { motion } from 'framer-motion';
import { CheckCircle, Circle, X } from 'lucide-react';
import { useRoadmapProgress } from '../hooks/useRoadmapProgress';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function RoadmapProgress({ 
    isOpen, 
    onClose, 
    roadmapId, 
    nodes,
    currentNode 
}) {
    const { getNodeStatus, updateNodeProgress, roadmapProgress } = useRoadmapProgress();
    const [localNodes, setLocalNodes] = useState([]);

    // Flatten nodes into a list for easier tracking
    const flattenNodes = (node, parentTitle = '') => {
        let nodes = [];
        const fullTitle = parentTitle ? `${parentTitle} > ${node.title}` : node.title;
        
        nodes.push({
            id: node.id,
            title: node.title,
            fullTitle,
            level: node.level,
            description: node.description,
            isCompleted: getNodeStatus(roadmapId, node.id)
        });

        if (node.children) {
            node.children.forEach(child => {
                nodes = [...nodes, ...flattenNodes(child, node.title)];
            });
        }

        return nodes;
    };

    // Update local nodes when roadmap progress changes
    useEffect(() => {
        const flattened = flattenNodes(nodes);
        setLocalNodes(flattened);
    }, [nodes, roadmapId, roadmapProgress]);

    const completedNodes = localNodes.filter(node => getNodeStatus(roadmapId, node.id));
    const pendingNodes = localNodes.filter(node => !getNodeStatus(roadmapId, node.id));

    const handleNodeToggle = async (nodeId) => {
        try {
            const isCurrentlyCompleted = getNodeStatus(roadmapId, nodeId);
            
            // Update progress in Redux
            await updateNodeProgress(
                roadmapId,
                nodeId,
                !isCurrentlyCompleted,
                localNodes.length
            );

            // Update local state to reflect changes
            setLocalNodes(prevNodes => 
                prevNodes.map(node => 
                    node.id === nodeId 
                        ? { ...node, isCompleted: !isCurrentlyCompleted }
                        : node
                )
            );
        } catch (error) {
            console.error('Error toggling node:', error);
        }
    };

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: isOpen ? 0 : '100%' }}
            transition={{ type: 'tween' }}
            className="fixed right-0 top-0 h-screen w-96 bg-[#1c1c1e] border-l border-[#333333] z-50"
        >
            {/* Header */}
            <div className="p-4 border-b border-[#333333] flex items-center justify-between">
                <h2 className="text-xl font-semibold">Track Progress</h2>
                <button 
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Progress Overview */}
            <div className="p-4 border-b border-[#333333] bg-[#2d2d2f]">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Overall Progress</span>
                    <span className="text-sm font-medium">
                        {Math.round((completedNodes.length / localNodes.length) * 100)}%
                    </span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                    <motion.div 
                        className="bg-[#2997ff] h-2 rounded-full transition-all"
                        initial={{ width: 0 }}
                        animate={{ 
                            width: `${(completedNodes.length / localNodes.length) * 100}%` 
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <div className="mt-2 text-xs text-gray-400">
                    {completedNodes.length} of {localNodes.length} topics completed
                </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto h-[calc(100vh-180px)]">
                {/* Current Topic */}
                {currentNode && (
                    <div className="p-4 border-b border-[#333333]">
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Current Topic</h3>
                        <div className="p-3 bg-white/5 rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">{currentNode.title}</span>
                                <button
                                    onClick={() => handleNodeToggle(currentNode.id)}
                                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    {getNodeStatus(roadmapId, currentNode.id) ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Completed Topics */}
                <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">
                        Completed ({completedNodes.length})
                    </h3>
                    <div className="space-y-2">
                        {completedNodes.map(node => (
                            <motion.div 
                                key={node.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex items-center justify-between p-2 bg-green-500/10 rounded-lg group"
                            >
                                <div className="flex-1">
                                    <p className="text-sm text-green-500">{node.title}</p>
                                    <p className="text-xs text-gray-500">{node.fullTitle}</p>
                                </div>
                                <button
                                    onClick={() => handleNodeToggle(node.id)}
                                    className="p-1 hover:bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Pending Topics */}
                <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">
                        Pending ({pendingNodes.length})
                    </h3>
                    <div className="space-y-2">
                        {pendingNodes.map(node => (
                            <motion.div 
                                key={node.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex items-center justify-between p-2 bg-white/5 rounded-lg group"
                            >
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400">{node.title}</p>
                                    <p className="text-xs text-gray-500">{node.fullTitle}</p>
                                </div>
                                <button
                                    onClick={() => handleNodeToggle(node.id)}
                                    className="p-1 hover:bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <Circle className="w-5 h-5 text-gray-400" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

RoadmapProgress.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    roadmapId: PropTypes.string.isRequired,
    nodes: PropTypes.object.isRequired,
    currentNode: PropTypes.object
}; 