import React, { useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
} from 'reactflow';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';  // For the close button icon

// Static data for nodes
// const initialNodes = [
//   {
//     id: '1',
//     position: { x: 250, y: 50 },
//     data: {
//       label: '10th Grade (End of Year)',
//       description: 'The student completes the 10th grade and decides their future path.',
//     },
//     style: { backgroundColor: '#f9c74f', padding: '10px', borderRadius: '8px' },
//   },
//   {
//     id: '2',
//     position: { x: 0, y: 150 },
//     data: {
//       label: 'Choose Science Stream',
//       description:
//         'The student must choose between Science, Arts, or Commerce. If Science is chosen, the student prepares for the engineering path.',
//     },
//     style: { backgroundColor: '#90be6d', padding: '10px', borderRadius: '8px' },
//   },
//   {
//     id: '3',
//     position: { x: 250, y: 150 },
//     data: {
//       label: 'Complete 11th & 12th Grade (Science)',
//       description:
//         'The student completes their higher secondary education with a focus on subjects like Math, Physics, and Chemistry.',
//     },
//     style: { backgroundColor: '#f94144', padding: '10px', borderRadius: '8px' },
//   },
//   {
//     id: '4',
//     position: { x: 500, y: 150 },
//     data: {
//       label: 'Choose Engineering Specialization',
//       description:
//         'After completing the 12th grade, the student selects the branch of engineering to pursue, such as Computer Science, Mechanical, Civil, etc.',
//     },
//     style: { backgroundColor: '#277da1', padding: '10px', borderRadius: '8px' },
//   },
//   {
//     id: '5',
//     position: { x: 250, y: 300 },
//     data: {
//       label: 'Clear Engineering Entrance Exams',
//       description:
//         'The student must appear and clear engineering entrance exams like JEE, BITSAT, etc. to qualify for admission.',
//     },
//     style: { backgroundColor: '#f4a261', padding: '10px', borderRadius: '8px' },
//   },
//   {
//     id: '6',
//     position: { x: 0, y: 450 },
//     data: {
//       label: 'Join Engineering College',
//       description:
//         'The student joins an engineering college after clearing entrance exams, starting the degree program.',
//     },
//     style: { backgroundColor: '#2a9d8f', padding: '10px', borderRadius: '8px' },
//   },
//   {
//     id: '7',
//     position: { x: 500, y: 450 },
//     data: {
//       label: 'Complete Engineering Degree',
//       description:
//         'The student completes the engineering degree program in the selected specialization, such as Computer Science, Mechanical, Civil, etc.',
//     },
//     style: { backgroundColor: '#e9c46a', padding: '10px', borderRadius: '8px' },
//   },
//   {
//     id: '8',
//     position: { x: 250, y: 600 },
//     data: {
//       label: 'Become an Engineer',
//       description:
//         'The student graduates with an engineering degree and begins working in the industry as an engineer.',
//     },
//     style: { backgroundColor: '#e76f51', padding: '10px', borderRadius: '8px' },
//   },
// ];

// // Static edges connecting nodes
// const initialEdges = [
//   { id: 'e1-2', source: '1', target: '2', animated: true },
//   { id: 'e1-3', source: '1', target: '3', animated: true },
//   { id: 'e2-5', source: '2', target: '5', animated: true },
//   { id: 'e3-5', source: '3', target: '5', animated: true },
//   { id: 'e4-5', source: '4', target: '5', animated: true },
//   { id: 'e5-6', source: '5', target: '6', animated: true },
//   { id: 'e5-7', source: '5', target: '7', animated: true },
//   { id: 'e6-8', source: '6', target: '8', animated: true },
//   { id: 'e7-8', source: '7', target: '8', animated: true },
// ];


const initialNodes = [
    {
      id: '1',
      position: { x: 250, y: 50 },
      data: {
        label: '10th Grade (End of Year)',
        description: 'The student completes the 10th grade and decides their future path.',
      },
      style: { backgroundColor: '#f9c74f', padding: '10px', borderRadius: '8px' },
    },
    {
      id: '2',
      position: { x: 0, y: 150 },
      data: {
        label: 'Choose Stream',
        description: 'The student must choose between Science, Arts, or Commerce. If Science is chosen, the student prepares for the engineering path.',
      },
      style: { backgroundColor: '#90be6d', padding: '10px', borderRadius: '8px' },
    },
    {
      id: '3',
      position: { x: 0, y: 300 },
      data: {
        label: 'Choose Arts or Commerce',
        description: 'If Arts or Commerce is chosen, the student may pursue other fields like Humanities or Business.',
      },
      style: { backgroundColor: '#f94144', padding: '10px', borderRadius: '8px' },
    },
    {
      id: '4',
      position: { x: 250, y: 150 },
      data: {
        label: 'Complete 11th & 12th Grade (Science)',
        description: 'The student completes their higher secondary education with a focus on subjects like Math, Physics, and Chemistry.',
      },
      style: { backgroundColor: '#f94144', padding: '10px', borderRadius: '8px' },
    },
    {
      id: '5',
      position: { x: 500, y: 150 },
      data: {
        label: 'Choose Engineering Specialization',
        description: 'After completing the 12th grade, the student selects the branch of engineering to pursue, such as Computer Science, Mechanical, Civil, etc.',
      },
      style: { backgroundColor: '#277da1', padding: '10px', borderRadius: '8px' },
    },
    {
      id: '6',
      position: { x: 250, y: 300 },
      data: {
        label: 'Clear Engineering Entrance Exams',
        description: 'The student must appear and clear engineering entrance exams like JEE, BITSAT, etc. to qualify for admission.',
      },
      style: { backgroundColor: '#f4a261', padding: '10px', borderRadius: '8px' },
    },
    {
      id: '7',
      position: { x: 0, y: 450 },
      data: {
        label: 'Join Arts/Commerce College',
        description: 'The student joins a college for Arts or Commerce after completing their higher secondary education.',
      },
      style: { backgroundColor: '#2a9d8f', padding: '10px', borderRadius: '8px' },
    },
    {
      id: '8',
      position: { x: 500, y: 450 },
      data: {
        label: 'Join Engineering College',
        description: 'The student joins an engineering college after clearing entrance exams, starting the degree program.',
      },
      style: { backgroundColor: '#2a9d8f', padding: '10px', borderRadius: '8px' },
    },
    {
      id: '9',
      position: { x: 250, y: 600 },
      data: {
        label: 'Complete Engineering Degree',
        description: 'The student completes the engineering degree program in the selected specialization.',
      },
      style: { backgroundColor: '#e9c46a', padding: '10px', borderRadius: '8px' },
    },
    {
      id: '10',
      position: { x: 250, y: 750 },
      data: {
        label: 'Internships/Projects',
        description: 'During college, students may engage in internships or projects to gain practical experience.',
      },
      style: { backgroundColor: '#f9c74f', padding: '10px', borderRadius: '8px' },
    },
    {
      id: '11',
      position: { x: 0, y: 900 },
      data: {
        label: 'Job Opportunities (Non-Engineering)',
        description: 'Students who pursued Arts/Commerce may explore job opportunities in fields like Business or Education.',
      },
      style: { backgroundColor: '#2a9d8f', padding: '10px', borderRadius: '8px' },
    },
    {
      id: '12',
      position: { x: 500, y: 900 },
      data: {
        label: 'Job Opportunities (Engineering)',
        description: 'Graduates can explore various roles such as Software Engineer, Mechanical Engineer, Civil Engineer, etc.',
      },
      style: { backgroundColor: '#e76f51', padding: '10px', borderRadius: '8px' },
    },
    {
      id: '13',
      position: { x: 250, y: 900 },
      data: {
        label: 'Pursue Higher Studies',
        description: 'Graduates may choose to pursue a Master\'s degree or specialized certifications for advanced roles.',
      },
      style: { backgroundColor: '#e9c46a', padding: '10px', borderRadius: '8px' },
    },
  ];

  const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
  { id: 'e5-6', source: '5', target: '6', animated: true },
  { id: 'e3-7', source: '3', target: '7', animated: true },
  { id: 'e6-8', source: '6', target: '8', animated: true },
  { id: 'e7-11', source: '7', target: '11', animated: true },
  { id: 'e8-9', source: '8', target: '9', animated: true },
  { id: 'e9-12', source: '9', target: '12', animated: true },
  { id: 'e9-13', source: '9', target: '13', animated: true },
  { id: 'e10-12', source: '10', target: '12', animated: true },
];

const EngineerRoadmap = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isPanelOpen, setPanelOpen] = useState(false);

  // Handle node click
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setPanelOpen(true); // Open the panel when a node is clicked
  };

  // Handle panel close
  const onClosePanel = () => {
    setPanelOpen(false);
  };

  // Handle adding new edge
  const onConnect = (params) => {
    setEdges((eds) => addEdge(params, eds));
  };

  return (
    <div style={{ height: '150vh', }} className='border rounded-xl'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

      <NodeDetailsPanel node={selectedNode} isOpen={isPanelOpen} onClose={onClosePanel} />
    </div>
  );
};

// NodeDetailsPanel Component
const NodeDetailsPanel = ({ node, isOpen, onClose }) => {
  if (!node) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{node.data.label}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 text-gray-900">
                  {node.data.description || 'No description available'}
                </p>
              </div>

              {/* <div>
                <h3 className="text-sm font-medium text-gray-500">Node ID</h3>
                <p className="mt-1 text-gray-900">{node.id}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Position</h3>
                <p className="mt-1 text-gray-900">
                  X: {Math.round(node.position.x)}, Y: {Math.round(node.position.y)}
                </p>
              </div> */}

              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: node.style.backgroundColor }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EngineerRoadmap;
