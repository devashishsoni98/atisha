import  { useState } from "react";
import ReactFlow, { MiniMap, Controls, Background, addEdge } from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // For the close button icon

// const initialNodes = [
//     {
//       id: '1',
//       position: { x: 350, y: 50 },
//       data: { label: '10th Grade', description: 'The student completes 10th grade and chooses the path for Chartered Accountancy.' },
//       style: { backgroundColor: '#f9c74f', padding: '10px', borderRadius: '8px' }
//     },
//     {
//       id: '2',
//       position: { x: 150, y: 150 },
//       data: { label: '12th Grade', description: 'The student completes 12th grade with a focus on Commerce subjects.' },
//       style: { backgroundColor: '#90be6d', padding: '10px', borderRadius: '8px' }
//     },
//     {
//       id: '3',
//       position: { x: 550, y: 220 },
//       data: { label: 'Register for CA Foundation', description: 'After 12th, the student registers for the CA Foundation course.' },
//       style: { backgroundColor: '#f94144', padding: '10px', borderRadius: '8px' }
//     },
//     {
//       id: '4',
//       position: { x: 150, y: 300 },
//       data: { label: 'CA Foundation Exam', description: 'The student takes and clears the CA Foundation exam.' },
//       style: { backgroundColor: '#277da1', padding: '10px', borderRadius: '8px' }
//     },
//     {
//       id: '5',
//       position: { x: 150, y: 400 },
//       data: { label: 'Register for CA Intermediate', description: 'After passing CA Foundation, the student registers for the CA Intermediate course.' },
//       style: { backgroundColor: '#f4a261', padding: '10px', borderRadius: '8px' }
//     },
//     {
//       id: '6',
//       position: { x: 550, y: 450 },
//       data: { label: 'CA Intermediate Exam', description: 'The student clears the CA Intermediate exam after completing the course.' },
//       style: { backgroundColor: '#2a9d8f', padding: '10px', borderRadius: '8px' }
//     },
//     {
//       id: '7',
//       position: { x: 350, y: 550 },
//       data: { label: 'Articlehip (Internship)', description: 'The student undergoes practical training in CA firms.' },
//       style: { backgroundColor: '#e9c46a', padding: '10px', borderRadius: '8px' }
//     },
//     {
//       id: '8',
//       position: { x: 550, y: 650 },
//       data: { label: 'CA Final', description: 'The student prepares and clears the CA Final exam after completing the articlehip.' },
//       style: { backgroundColor: '#e76f51', padding: '10px', borderRadius: '8px' }
//     },
//     {
//       id: '9',
//       position: { x: 350, y: 700 },
//       data: { label: 'Become a CA', description: 'Upon clearing the CA Final exam, the student becomes a Chartered Accountant.' },
//       style: { backgroundColor: '#f9c74f', padding: '10px', borderRadius: '8px' }
//     }
//   ];

// const initialEdges = [
//     // Primary flow from 10th Grade to becoming a CA
//     { id: 'e1-2', source: '1', target: '2', animated: true }, // 10th to 12th
//     { id: 'e2-3', source: '2', target: '3', animated: true }, // 12th to Register for Foundation
//     { id: 'e3-4', source: '3', target: '4', animated: true }, // Register for Foundation to Foundation Exam
//     { id: 'e4-5', source: '4', target: '5', animated: true }, // CA Foundation Exam to Register for Intermediate
//     { id: 'e5-6', source: '5', target: '6', animated: true }, // Register for Intermediate to Intermediate Exam
//     { id: 'e6-7', source: '6', target: '7', animated: true }, // Intermediate Exam to Articlehip (Internship)
//     { id: 'e7-8', source: '7', target: '8', animated: true }, // Articlehip to CA Final
//     { id: 'e8-9', source: '8', target: '9', animated: true }, // CA Final to Become a CA
//   ];

const initialNodes = [
  {
    id: "1",
    position: { x: 400, y: 50 }, // Start centered
    data: {
      label: "10th Grade",
      description:
        "The student completes 10th grade and chooses the path for Chartered Accountancy.",
    },
    style: { backgroundColor: "#f9c74f", padding: "10px", borderRadius: "8px" },
  },
  {
    id: "2",
    position: { x: 250, y: 150 }, // Curve left
    data: {
      label: "12th Grade",
      description:
        "The student completes 12th grade with a focus on Commerce subjects.",
    },
    style: { backgroundColor: "#90be6d", padding: "10px", borderRadius: "8px" },
  },
  {
    id: "3",
    position: { x: 500, y: 250 }, // Curve right
    data: {
      label: "Register for CA Foundation",
      description:
        "After 12th, the student registers for the CA Foundation course.",
    },
    style: { backgroundColor: "#f94144", padding: "10px", borderRadius: "8px" },
  },
  {
    id: "4",
    position: { x: 200, y: 350 }, // Curve back left
    data: {
      label: "CA Foundation Exam",
      description: "The student takes and clears the CA Foundation exam.",
    },
    style: { backgroundColor: "#277da1", padding: "10px", borderRadius: "8px" },
  },
  {
    id: "5",
    position: { x: 550, y: 450 }, // Curve right
    data: {
      label: "Register for CA Intermediate",
      description:
        "After passing CA Foundation, the student registers for the CA Intermediate course.",
    },
    style: { backgroundColor: "#f4a261", padding: "10px", borderRadius: "8px" },
  },
  {
    id: "6",
    position: { x: 250, y: 550 }, // Curve left
    data: {
      label: "CA Intermediate Exam",
      description:
        "The student clears the CA Intermediate exam after completing the course.",
    },
    style: { backgroundColor: "#2a9d8f", padding: "10px", borderRadius: "8px" },
  },
  {
    id: "7",
    position: { x: 500, y: 650 }, // Curve right
    data: {
      label: "Articlehip (Internship)",
      description: "The student undergoes practical training in CA firms.",
    },
    style: { backgroundColor: "#e9c46a", padding: "10px", borderRadius: "8px" },
  },
  {
    id: "8",
    position: { x: 300, y: 750 }, // Curve slightly left
    data: {
      label: "CA Final",
      description:
        "The student prepares and clears the CA Final exam after completing the articlehip.",
    },
    style: { backgroundColor: "#e76f51", padding: "10px", borderRadius: "8px" },
  },
  {
    id: "9",
    position: { x: 400, y: 850 }, // End centered
    data: {
      label: "Become a CA",
      description:
        "Upon clearing the CA Final exam, the student becomes a Chartered Accountant.",
    },
    style: { backgroundColor: "#f9c74f", padding: "10px", borderRadius: "8px" },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    // Using smoothstep for curved edges
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    animated: true,
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    animated: true,
  },
  {
    id: "e6-7",
    source: "6",
    target: "7",
    animated: true,
  },
  {
    id: "e7-8",
    source: "7",
    target: "8",
    animated: true,
  },
  {
    id: "e8-9",
    source: "8",
    target: "9",
    animated: true,
  },
];

const CARoadmap = () => {
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
//     <div style={{ height: "150vh" }} className="border rounded-xl">
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onConnect={onConnect}
//         onNodeClick={onNodeClick}
//         fitView
//       >
//         <MiniMap />
//         <Controls />
//         <Background />
//       </ReactFlow>

//       <NodeDetailsPanel
//         node={selectedNode}
//         isOpen={isPanelOpen}
//         onClose={onClosePanel}
//       />
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
//           initial={{ x: "100%" }}
//           animate={{ x: 0 }}
//           exit={{ x: "100%" }}
//           transition={{ type: "spring", damping: 20 }}
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
//                 <h3 className="text-sm font-medium text-gray-500">
//                   Description
//                 </h3>
//                 <p className="mt-1 text-gray-900">
//                   {node.data.description || "No description available"}
//                 </p>
//               </div>
// {/* 
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500">Node ID</h3>
//                 <p className="mt-1 text-gray-900">{node.id}</p>
//               </div> */}

//               {/* <div>
//                 <h3 className="text-sm font-medium text-gray-500">Position</h3>
//                 <p className="mt-1 text-gray-900">
//                   X: {Math.round(node.position.x)}, Y:{" "}
//                   {Math.round(node.position.y)}
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
export default CARoadmap;
