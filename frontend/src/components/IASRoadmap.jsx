import React, { useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
} from 'reactflow';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';  // For the close button icon

const initialNodes = [
    {
      id: '1',
      position: { x: 250, y: 50 },
      data: {
        label: '10th Grade (End of Year)',
        description: 'The student completes 10th grade and begins considering future options.',
      },
      style: { backgroundColor: '#f9c74f', padding: '10px', borderRadius: '8px' },
    },
    {
      id: '2',
      position: { x: 250, y: 150 },
      data: {
        label: '12th Grade',
        description: 'The student completes higher secondary education in any stream.',
      },
      style: { backgroundColor: '#90be6d', padding: '10px', borderRadius: '8px' },
    },
    {
      id: '3',
      position: { x: 250, y: 300 },
      data: {
        label: 'Graduate in Any Discipline',
        description: 'The student completes a bachelor’s degree in a field of their choice, fulfilling eligibility for IAS.',
      },
      style: { backgroundColor: '#f94144', padding: '10px', borderRadius: '8px' },
    },
    {
      id: '4',
      position: { x: 250, y: 450 },
      data: {
        label: 'Prepare for UPSC Exam',
        description: 'The student begins preparation for the UPSC Civil Services Examination, covering Prelims, Mains, and Interview.',
      },
      style: { backgroundColor: '#f4a261', padding: '10px', borderRadius: '8px' },
    },
    {
      id: '5',
      position: { x: 250, y: 600 },
      data: {
        label: 'Clear UPSC Exam',
        description: 'The candidate clears all stages of the UPSC Civil Services Exam to secure a rank.',
      },
      style: { backgroundColor: '#2a9d8f', padding: '10px', borderRadius: '8px' },
    },
    {
      id: '6',
      position: { x: 100, y: 750 },
      data: {
        label: 'Join IAS Training (LBSNAA)',
        description: 'Selected candidates undergo training at the Lal Bahadur Shastri National Academy of Administration.',
      },
      style: { backgroundColor: '#e76f51', padding: '10px', borderRadius: '8px' },
    },
    {
      id: '7',
      position: { x: 400, y: 750 },
      data: {
        label: 'Serve as an IAS Officer',
        description: 'After training, candidates are posted to various administrative roles across the country.',
      },
      style: { backgroundColor: '#e9c46a', padding: '10px', borderRadius: '8px' },
    },
  ];

  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e3-4', source: '3', target: '4', animated: true },
    { id: 'e4-5', source: '4', target: '5', animated: true },
    { id: 'e5-6', source: '5', target: '6', animated: true },
    { id: 'e5-7', source: '5', target: '7', animated: true },
  ];
  
const IASRoadmap = () => {
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

//   return (
//     <div style={{ height: '100vh' }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onConnect={onConnect}
//         onNodeClick={onNodeClick}
//         fitView
//       >
//         <MiniMap />
//         {/* <Controls /> */}
//         <Background />
//       </ReactFlow>

//       <NodeDetailsPanel node={selectedNode} isOpen={isPanelOpen} onClose={onClosePanel} />
//     </div>
//   );
// };

// // NodeDetailsPanel Component
// const NodeDetailsPanel = ({ node, isOpen, onClose }) => {
//   if (!node) return null;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ x: '100%' }}
//           animate={{ x: 0 }}
//           exit={{ x: '100%' }}
//           transition={{ type: 'spring', damping: 20 }}
//           className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 overflow-y-auto"
//         >
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold">{node.data.label}</h2>
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500">Description</h3>
//                 <p className="mt-1 text-gray-900">
//                   {node.data.description || 'No description available'}
//                 </p>
//               </div>
// {/* 
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500">Node ID</h3>
//                 <p className="mt-1 text-gray-900">{node.id}</p>
//               </div>

//               <div>
//                 <h3 className="text-sm font-medium text-gray-500">Position</h3>
//                 <p className="mt-1 text-gray-900">
//                   X: {Math.round(node.position.x)}, Y: {Math.round(node.position.y)}
//                 </p>
//               </div> */}

//               <div
//                 className="w-6 h-6 rounded"
//                 style={{ backgroundColor: node.style.backgroundColor }}
//               />
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

return (
  <div style={{height: '200vh' }} className=' border rounded-xl '>
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
{/* 
            <div>
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
export default IASRoadmap;
