import { useState, useRef, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
  Position
} from 'reactflow';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  X, 
  Maximize2, 
  ArrowLeft, 
  Rocket, 
  Book, 
  Target, 
  Users,
  Bookmark,
  Calendar,
  Download,
  Share2,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import PropTypes from 'prop-types';
import 'reactflow/dist/style.css';
import { useNavigate } from 'react-router-dom';
import { useRoadmap } from '../contexts/RoadmapContext';
import React from 'react';

// Memoize CustomNode component to prevent unnecessary re-renders
// eslint-disable-next-line react/display-name
const CustomNode = React.memo(({ data }) => {
  const { isStepCompleted } = useRoadmap();
  const completed = isStepCompleted(data.roadmapId, data.id);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    if (data.onClick) {
      data.onClick(data);
    }
  }, [data]);

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-[#2997ff] !w-2 !h-2 !border-2 !border-black/50"
        style={{ top: -6 }}
      />
      
      <div
        onClick={handleClick}
        className={`
          p-4 rounded-xl
          transition-all duration-300 ease-out
          ${data.isRoot 
            ? 'bg-gradient-to-br from-[#1d1d1f] to-[#2d2d2f] w-[280px]' 
            : 'bg-[#1d1d1f]/90 backdrop-blur-xl w-[240px]'
          }
          shadow-lg hover:shadow-xl
          border border-white/10 hover:border-[#2997ff]/30
          cursor-pointer
          relative
          group
          ${completed ? 'border-green-500' : 'border-white/10'}
          transform hover:scale-[1.02]
        `}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-3">
          {data.icon && (
            <div 
              className={`
                rounded-xl flex items-center justify-center
                ${data.isRoot ? 'w-10 h-10' : 'w-8 h-8'}
              `}
              style={{ backgroundColor: 'rgba(41, 151, 255, 0.15)' }}
            >
              <data.icon 
                className={data.isRoot ? 'w-5 h-5' : 'w-4 h-4'} 
                style={{ color: '#2997ff' }} 
              />
            </div>
          )}
          <div>
            <div className="text-white font-medium whitespace-nowrap">
              {data.title}
            </div>
            {data.level && (
              <div className="text-xs text-[#2997ff]">
                {data.level}
              </div>
            )}
          </div>
        </div>
        {completed && (
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
        )}
      </div>

      {!data.isLeaf && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!bg-[#2997ff] !w-2 !h-2 !border-2 !border-black/50"
          style={{ bottom: -6 }}
        />
      )}
    </>
  );
});

CustomNode.propTypes = {
  data: PropTypes.object.isRequired
};

// Optimize sidebar content
// eslint-disable-next-line react/display-name
const SidebarContent = React.memo(({ node, roadmapId, onClose, handleStatusChange }) => {
  const { isStepCompleted } = useRoadmap();
  const [selectedMenu, setSelectedMenu] = useState('details');
  
  const menuItems = [
    { id: 'details', label: 'Details', icon: Book },
    { id: 'resources', label: 'Resources', icon: ExternalLink },
    { id: 'notes', label: 'Notes', icon: HelpCircle }
  ];
  
  return (
    <div className="flex h-full">
      {/* Left Side Menu */}
      <div className="w-16 border-r border-white/10 bg-black/20">
        <div className="flex flex-col items-center py-4 space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedMenu(item.id)}
              className={`
                p-2 rounded-lg transition-colors
                ${selectedMenu === item.id 
                  ? 'bg-[#2997ff]/20 text-[#2997ff]' 
                  : 'text-gray-400 hover:text-white'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>

      {/* Right Side Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-6">
          {/* Status Dropdown */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">Status</div>
            <div className="relative group">
              <button 
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-lg 
                  ${isStepCompleted(roadmapId, node.id) 
                    ? 'bg-green-500/20 text-green-500 border border-green-500/20'
                    : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/20'
                  }
                  hover:bg-opacity-30 transition-colors
                `}
              >
                <span>{isStepCompleted(roadmapId, node.id) ? 'Completed' : 'Pending'}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <div className="absolute right-0 mt-1 w-32 py-1 bg-[#2d2d2f] rounded-lg border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button
                  onClick={() => handleStatusChange(node.id, 'pending')}
                  className={`w-full px-3 py-1.5 text-left text-sm hover:bg-white/5 
                    ${!isStepCompleted(roadmapId, node.id) ? 'text-yellow-500' : 'text-gray-400'}`}
                >
                  Pending
                </button>
                <button
                  onClick={() => handleStatusChange(node.id, 'completed')}
                  className={`w-full px-3 py-1.5 text-left text-sm hover:bg-white/5 
                    ${isStepCompleted(roadmapId, node.id) ? 'text-green-500' : 'text-gray-400'}`}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>

          {/* Content based on selected menu */}
          {selectedMenu === 'details' && (
            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-start gap-4">
                {node.icon && (
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-[#2997ff]/15">
                    <node.icon className="w-7 h-7 text-[#2997ff]" />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-semibold text-white">{node.title}</h2>
                  {node.level && (
                    <div className="text-sm font-medium text-[#2997ff] mt-1">{node.level}</div>
                  )}
                </div>
              </div>

              {/* Description */}
              {node.description && (
                <div className="bg-white/5 rounded-xl p-4">
                  <h3 className="text-sm font-medium text-white mb-2">Description</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{node.description}</p>
                </div>
              )}
            </div>
          )}

          {/* Resources Tab */}
          {selectedMenu === 'resources' && node.resources && node.resources.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-white">Learning Resources</h3>
              <div className="grid gap-2">
                {node.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl bg-white/5 text-gray-400 hover:text-[#2997ff] transition-colors border border-white/10 group"
                  >
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    <span className="text-sm">{resource.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Notes Tab */}
          {selectedMenu === 'notes' && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Personal Notes</h3>
              <textarea 
                className="w-full h-40 bg-white/5 rounded-xl p-4 text-sm text-gray-400 border border-white/10 focus:border-[#2997ff] focus:ring-1 focus:ring-[#2997ff] outline-none resize-none"
                placeholder="Add your notes here..."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

SidebarContent.propTypes = {
  node: PropTypes.object.isRequired,
  roadmapId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  handleStatusChange: PropTypes.func.isRequired
};

export default function RoadmapView({ title, description, nodes }) {
  const navigate = useNavigate();
  const { 
    toggleStepCompletion, 
    isStepCompleted, 
    getCompletedSteps, 
    getTotalSteps 
  } = useRoadmap();
  
  const [selectedNode, setSelectedNode] = useState(null);
  const [isFullscreen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const flowContainerRef = useRef(null);

  // Get roadmapId from URL
  const roadmapId = window.location.pathname.split('/').pop();
  const completedSteps = getCompletedSteps(roadmapId);
  const totalSteps = getTotalSteps(roadmapId);

  // Update node data to include roadmapId
  const processNodeData = (node) => ({
    ...node,
    roadmapId,
    completed: isStepCompleted(roadmapId, node.id)
  });

  const handleNodeClick = useCallback((nodeData) => {
    setSelectedNode(nodeData);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateNodePositions = useCallback((node, level = 0, parentX = 0) => {
    const verticalSpacing = 400;
    const minHorizontalSpacing = 500;
    const positions = [];
    
    const getSubtreeWidth = (node) => {
      if (!node.children || node.children.length === 0) return minHorizontalSpacing;
      return Math.max(
        node.children.length * minHorizontalSpacing,
        node.children.reduce((sum, child) => sum + getSubtreeWidth(child), 0)
      );
    };

    const subtreeWidth = getSubtreeWidth(node);
    const x = parentX - subtreeWidth / 2 + minHorizontalSpacing / 2;
    const y = level * verticalSpacing;

    positions.push({
      id: node.id.toString(),
      position: { x, y },
      data: {
        ...processNodeData(node),
        title: node.title,
        label: node.title,
        level: node.level,
        isRoot: level === 0,
        isLeaf: !node.children || node.children.length === 0,
        description: node.description,
        quickStart: node.quickStart,
        skills: node.skills,
        resources: node.resources,
        icon: node.icon,
        onClick: handleNodeClick
      },
      type: 'custom'
    });

    if (node.children) {
      let childX = x;
      node.children.forEach((child) => {
        const childSubtreeWidth = getSubtreeWidth(child);
        const childPositions = calculateNodePositions(
          child,
          level + 1,
          childX + childSubtreeWidth / 2
        );
        positions.push(...childPositions);
        childX += childSubtreeWidth;
      });
    }

    return positions;
  });

  const createNodesAndEdges = useCallback((node) => {
    const nodes = calculateNodePositions(node);
    const edges = [];

    // Create edges with curved paths
    const processNodeEdges = (node, parentId = null) => {
      const nodeId = node.id.toString();
      
      if (parentId) {
        edges.push({
          id: `${parentId}-${nodeId}`,
          source: parentId,
          target: nodeId,
          type: 'smoothstep',
          animated: true,
          style: { 
            stroke: '#2997ff',
            strokeWidth: 2,
            opacity: 0.6
          },
          markerEnd: {
            type: 'arrow',
            color: '#2997ff',
            width: 20,
            height: 20
          }
        });
      }

      if (node.children) {
        node.children.forEach(child => processNodeEdges(child, nodeId));
      }
    };

    processNodeEdges(node);
    return { nodes, edges };
  }, [calculateNodePositions]);

  const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges(nodes);

  const [flowNodes,, onNodesChange] = useNodesState(initialNodes);
  const [flowEdges,, onEdgesChange] = useEdgesState(initialEdges);

  const toggleFullscreen = async () => {
    if (!flowContainerRef.current) return;

    try {
      if (!isFullscreen) {
        await flowContainerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

  // Add download functionality
  const handleDownload = () => {
    const roadmapData = {
      title,
      description,
      progress: {
        completed: completedSteps,
        total: totalSteps,
        percentage: Math.round((completedSteps / totalSteps) * 100)
      },
      nodes: nodes
    };

    const blob = new Blob([JSON.stringify(roadmapData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${roadmapId}-roadmap.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Add share functionality
  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${title} Roadmap`,
        text: description,
        url: window.location.href
      });
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      // You might want to show a toast notification here
    }
  };

  const handleStatusChange = (nodeId, status) => {
    if (status === 'completed') {
      toggleStepCompletion(roadmapId, nodeId);
    } else {
      // If status is pending, ensure it's not in completed state
      if (isStepCompleted(roadmapId, nodeId)) {
        toggleStepCompletion(roadmapId, nodeId);
      }
    }
  };

  // Optimize ReactFlow settings
  const flowOptions = {
    fitView: true,
    minZoom: 0.2,
    maxZoom: 1.5,
    defaultZoom: 0.6,
    fitViewOptions: {
      padding: 0.4,
      minZoom: 0.2,
      maxZoom: 1
    },
    proOptions: { hideAttribution: true }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-40 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Back Button */}
            <button
              onClick={() => navigate('/roadmaps')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Roadmaps</span>
            </button>

            {/* Center - Title */}
            <h1 className="text-xl font-semibold">{title}</h1>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg border ${
                  isBookmarked 
                    ? 'border-[#2997ff] text-[#2997ff]' 
                    : 'border-white/10 text-gray-400 hover:text-white'
                } transition-colors`}
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20">
        {/* Hero Section */}
        <section className="px-6 py-12">
          <div className="max-w-[980px] mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl sm:text-7xl font-bold mb-6"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto mb-8"
            >
              {description}
            </motion.p>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:text-white border border-white/10 transition-colors">
                <Calendar className="w-4 h-4" />
                <span>Schedule Learning Time</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f7df1e] text-black font-medium hover:bg-[#f7df1e]/90 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f7df1e] text-black font-medium hover:bg-[#f7df1e]/90 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </section>

        {/* Flow Chart Section */}
        <section className="px-6 mb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Learning Path</h2>
              <button
                onClick={toggleFullscreen}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
                <span className="text-sm">
                  {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </span>
              </button>
            </div>

            {/* Flow Chart Container */}
            <div 
              ref={flowContainerRef}
              className={`
                relative rounded-3xl border border-white/10
                bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]
                overflow-hidden backdrop-blur-xl
                ${isFullscreen ? 'fixed inset-0 z-50' : 'h-[600px]'}
                transition-all duration-300
              `}
            >
              <ReactFlow
                nodes={flowNodes}
                edges={flowEdges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={{ custom: CustomNode }}
                {...flowOptions}
                className="h-full"
              >
                <Background 
                  color="rgba(255,255,255,0.05)"
                  gap={24} 
                  size={1}
                />
                <Controls 
                  className="bg-[#1d1d1f]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden"
                  style={{ 
                    button: { 
                      color: '#fff',
                      backgroundColor: 'transparent',
                      width: '32px',
                      height: '32px'
                    }
                  }}
                />
                <MiniMap 
                  style={{ 
                    backgroundColor: 'rgba(29,29,31,0.9)',
                    backdropFilter: 'blur(16px)',
                    maskColor: '#00000080',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px'
                  }} 
                  nodeColor="#2997ff"
                  nodeStrokeWidth={3}
                  zoomable
                  pannable
                />
              </ReactFlow>
            </div>
          </div>
        </section>

        {/* Progress Tracking - Fixed Bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#1d1d1f]/95 backdrop-blur-xl border-t border-white/10 z-40">
          <div className="max-w-[1400px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-[#f7df1e]/20 text-[#f7df1e]">
                  {Math.round((completedSteps / totalSteps) * 100)}% DONE
                </span>
                <span className="text-gray-400">
                  {completedSteps} of {totalSteps} Done
                </span>
              </div>

              <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <HelpCircle className="w-4 h-4" />
                <span>Track Progress</span>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="h-1 w-full bg-white/5 mt-4 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#f7df1e] transition-all duration-300"
                style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <section className="px-6 py-20 bg-[#1d1d1f]">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-12 text-center"
            >
              About This Learning Path
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Getting Started */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-2xl bg-[#2d2d2f] border border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2997ff]/10 flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-[#2997ff]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Getting Started</h3>
                <p className="text-gray-400">
                  Begin your journey with fundamental concepts and gradually progress to advanced topics.
                  Each step is carefully designed to build upon previous knowledge.
                </p>
              </motion.div>

              {/* Learning Approach */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl bg-[#2d2d2f] border border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-[#30d158]/10 flex items-center justify-center mb-4">
                  <Book className="w-6 h-6 text-[#30d158]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Learning Approach</h3>
                <p className="text-gray-400">
                  Combine theoretical knowledge with practical projects. Access curated resources
                  and hands-on exercises to reinforce your learning.
                </p>
              </motion.div>

              {/* Career Goals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-2xl bg-[#2d2d2f] border border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-[#ff375f]/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-[#ff375f]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Career Goals</h3>
                <p className="text-gray-400">
                  Prepare for real-world opportunities. This roadmap aligns with industry demands
                  and helps you build a strong professional portfolio.
                </p>
              </motion.div>
            </div>

            {/* Community Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-[#2997ff]/20 to-transparent border border-white/10"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-xl bg-[#2997ff]/10 flex items-center justify-center shrink-0">
                  <Users className="w-7 h-7 text-[#2997ff]" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Join Our Community</h3>
                  <p className="text-gray-400 mb-4">
                    Connect with fellow learners, share your progress, and get help from the community.
                    Learning is better together!
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-2 text-[#2997ff] hover:underline"
                  >
                    <span>Join Discord Community</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sidebar */}
        <AnimatePresence>
          {selectedNode && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedNode(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 h-full w-full max-w-md bg-[#1d1d1f]/95 backdrop-blur-2xl z-50 overflow-y-auto border-l border-white/10"
              >
                <SidebarContent 
                  node={selectedNode}
                  roadmapId={roadmapId}
                  onClose={() => setSelectedNode(null)}
                  handleStatusChange={handleStatusChange}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

RoadmapView.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  nodes: PropTypes.object.isRequired
};