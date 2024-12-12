// import  { useState } from "react";
// import ReactFlow, { MiniMap, Controls, Background, addEdge } from "reactflow";
// import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react"; // For the close button icon

// // const initialNodes = [
// //     {
// //       id: '1',
// //       position: { x: 350, y: 50 },
// //       data: { label: '10th Grade', description: 'The student completes 10th grade and chooses the path for Chartered Accountancy.' },
// //       style: { backgroundColor: '#f9c74f', padding: '10px', borderRadius: '8px' }
// //     },
// //     {
// //       id: '2',
// //       position: { x: 150, y: 150 },
// //       data: { label: '12th Grade', description: 'The student completes 12th grade with a focus on Commerce subjects.' },
// //       style: { backgroundColor: '#90be6d', padding: '10px', borderRadius: '8px' }
// //     },
// //     {
// //       id: '3',
// //       position: { x: 550, y: 220 },
// //       data: { label: 'Register for CA Foundation', description: 'After 12th, the student registers for the CA Foundation course.' },
// //       style: { backgroundColor: '#f94144', padding: '10px', borderRadius: '8px' }
// //     },
// //     {
// //       id: '4',
// //       position: { x: 150, y: 300 },
// //       data: { label: 'CA Foundation Exam', description: 'The student takes and clears the CA Foundation exam.' },
// //       style: { backgroundColor: '#277da1', padding: '10px', borderRadius: '8px' }
// //     },
// //     {
// //       id: '5',
// //       position: { x: 150, y: 400 },
// //       data: { label: 'Register for CA Intermediate', description: 'After passing CA Foundation, the student registers for the CA Intermediate course.' },
// //       style: { backgroundColor: '#f4a261', padding: '10px', borderRadius: '8px' }
// //     },
// //     {
// //       id: '6',
// //       position: { x: 550, y: 450 },
// //       data: { label: 'CA Intermediate Exam', description: 'The student clears the CA Intermediate exam after completing the course.' },
// //       style: { backgroundColor: '#2a9d8f', padding: '10px', borderRadius: '8px' }
// //     },
// //     {
// //       id: '7',
// //       position: { x: 350, y: 550 },
// //       data: { label: 'Articlehip (Internship)', description: 'The student undergoes practical training in CA firms.' },
// //       style: { backgroundColor: '#e9c46a', padding: '10px', borderRadius: '8px' }
// //     },
// //     {
// //       id: '8',
// //       position: { x: 550, y: 650 },
// //       data: { label: 'CA Final', description: 'The student prepares and clears the CA Final exam after completing the articlehip.' },
// //       style: { backgroundColor: '#e76f51', padding: '10px', borderRadius: '8px' }
// //     },
// //     {
// //       id: '9',
// //       position: { x: 350, y: 700 },
// //       data: { label: 'Become a CA', description: 'Upon clearing the CA Final exam, the student becomes a Chartered Accountant.' },
// //       style: { backgroundColor: '#f9c74f', padding: '10px', borderRadius: '8px' }
// //     }
// //   ];

// // const initialEdges = [
// //     // Primary flow from 10th Grade to becoming a CA
// //     { id: 'e1-2', source: '1', target: '2', animated: true }, // 10th to 12th
// //     { id: 'e2-3', source: '2', target: '3', animated: true }, // 12th to Register for Foundation
// //     { id: 'e3-4', source: '3', target: '4', animated: true }, // Register for Foundation to Foundation Exam
// //     { id: 'e4-5', source: '4', target: '5', animated: true }, // CA Foundation Exam to Register for Intermediate
// //     { id: 'e5-6', source: '5', target: '6', animated: true }, // Register for Intermediate to Intermediate Exam
// //     { id: 'e6-7', source: '6', target: '7', animated: true }, // Intermediate Exam to Articlehip (Internship)
// //     { id: 'e7-8', source: '7', target: '8', animated: true }, // Articlehip to CA Final
// //     { id: 'e8-9', source: '8', target: '9', animated: true }, // CA Final to Become a CA
// //   ];

// const initialNodes = [
//   {
//     id: "1",
//     position: { x: 400, y: 50 }, // Start centered
//     data: {
//       label: "10th Grade",
//       description:
//         "The student completes 10th grade and chooses the path for Chartered Accountancy.",
//     },
//     style: { backgroundColor: "#f9c74f", padding: "10px", borderRadius: "8px" },
//   },
//   {
//     id: "2",
//     position: { x: 250, y: 150 }, // Curve left
//     data: {
//       label: "12th Grade",
//       description:
//         "The student completes 12th grade with a focus on Commerce subjects.",
//     },
//     style: { backgroundColor: "#90be6d", padding: "10px", borderRadius: "8px" },
//   },
//   {
//     id: "3",
//     position: { x: 500, y: 250 }, // Curve right
//     data: {
//       label: "Register for CA Foundation",
//       description:
//         "After 12th, the student registers for the CA Foundation course.",
//     },
//     style: { backgroundColor: "#f94144", padding: "10px", borderRadius: "8px" },
//   },
//   {
//     id: "4",
//     position: { x: 200, y: 350 }, // Curve back left
//     data: {
//       label: "CA Foundation Exam",
//       description: "The student takes and clears the CA Foundation exam.",
//     },
//     style: { backgroundColor: "#277da1", padding: "10px", borderRadius: "8px" },
//   },
//   {
//     id: "5",
//     position: { x: 550, y: 450 }, // Curve right
//     data: {
//       label: "Register for CA Intermediate",
//       description:
//         "After passing CA Foundation, the student registers for the CA Intermediate course.",
//     },
//     style: { backgroundColor: "#f4a261", padding: "10px", borderRadius: "8px" },
//   },
//   {
//     id: "6",
//     position: { x: 250, y: 550 }, // Curve left
//     data: {
//       label: "CA Intermediate Exam",
//       description:
//         "The student clears the CA Intermediate exam after completing the course.",
//     },
//     style: { backgroundColor: "#2a9d8f", padding: "10px", borderRadius: "8px" },
//   },
//   {
//     id: "7",
//     position: { x: 500, y: 650 }, // Curve right
//     data: {
//       label: "Articlehip (Internship)",
//       description: "The student undergoes practical training in CA firms.",
//     },
//     style: { backgroundColor: "#e9c46a", padding: "10px", borderRadius: "8px" },
//   },
//   {
//     id: "8",
//     position: { x: 300, y: 750 }, // Curve slightly left
//     data: {
//       label: "CA Final",
//       description:
//         "The student prepares and clears the CA Final exam after completing the articlehip.",
//     },
//     style: { backgroundColor: "#e76f51", padding: "10px", borderRadius: "8px" },
//   },
//   {
//     id: "9",
//     position: { x: 400, y: 850 }, // End centered
//     data: {
//       label: "Become a CA",
//       description:
//         "Upon clearing the CA Final exam, the student becomes a Chartered Accountant.",
//     },
//     style: { backgroundColor: "#f9c74f", padding: "10px", borderRadius: "8px" },
//   },
// ];

// const initialEdges = [
//   {
//     id: "e1-2",
//     source: "1",
//     target: "2",
//     animated: true,
//     // Using smoothstep for curved edges
//   },
//   {
//     id: "e2-3",
//     source: "2",
//     target: "3",
//     animated: true,
//   },
//   {
//     id: "e3-4",
//     source: "3",
//     target: "4",
//     animated: true,
//   },
//   {
//     id: "e4-5",
//     source: "4",
//     target: "5",
//     animated: true,
//   },
//   {
//     id: "e5-6",
//     source: "5",
//     target: "6",
//     animated: true,
//   },
//   {
//     id: "e6-7",
//     source: "6",
//     target: "7",
//     animated: true,
//   },
//   {
//     id: "e7-8",
//     source: "7",
//     target: "8",
//     animated: true,
//   },
//   {
//     id: "e8-9",
//     source: "8",
//     target: "9",
//     animated: true,
//   },
// ];

// const CARoadmap = () => {
//   const [nodes, setNodes] = useState(initialNodes);
//   const [edges, setEdges] = useState(initialEdges);
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [isPanelOpen, setPanelOpen] = useState(false);

//   // Handle node click
//   const onNodeClick = (event, node) => {
//     setSelectedNode(node);
//     setPanelOpen(true); // Open the panel when a node is clicked
//   };

//   // Handle panel close
//   const onClosePanel = () => {
//     setPanelOpen(false);
//   };

//   // Handle adding new edge
//   const onConnect = (params) => {
//     setEdges((eds) => addEdge(params, eds));
//   };

// //   return (
// //     <div style={{ height: "150vh" }} className="border rounded-xl">
// //       <ReactFlow
// //         nodes={nodes}
// //         edges={edges}
// //         onConnect={onConnect}
// //         onNodeClick={onNodeClick}
// //         fitView
// //       >
// //         <MiniMap />
// //         <Controls />
// //         <Background />
// //       </ReactFlow>

// //       <NodeDetailsPanel
// //         node={selectedNode}
// //         isOpen={isPanelOpen}
// //         onClose={onClosePanel}
// //       />
// //     </div>
// //   );
// // };

// // // NodeDetailsPanel Component
// // const NodeDetailsPanel = ({ node, isOpen, onClose }) => {
// //   if (!node) return null;

// //   return (
// //     <AnimatePresence>
// //       {isOpen && (
// //         <motion.div
// //           initial={{ x: "100%" }}
// //           animate={{ x: 0 }}
// //           exit={{ x: "100%" }}
// //           transition={{ type: "spring", damping: 20 }}
// //           className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 overflow-y-auto"
// //         >
// //           <div className="p-6">
// //             <div className="flex justify-between items-center mb-6">
// //               <h2 className="text-2xl font-bold">{node.data.label}</h2>
// //               <button
// //                 onClick={onClose}
// //                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
// //               >
// //                 <X className="w-6 h-6" />
// //               </button>
// //             </div>

// //             <div className="space-y-4">
// //               <div>
// //                 <h3 className="text-sm font-medium text-gray-500">
// //                   Description
// //                 </h3>
// //                 <p className="mt-1 text-gray-900">
// //                   {node.data.description || "No description available"}
// //                 </p>
// //               </div>
// // {/* 
// //               <div>
// //                 <h3 className="text-sm font-medium text-gray-500">Node ID</h3>
// //                 <p className="mt-1 text-gray-900">{node.id}</p>
// //               </div> */}

// //               {/* <div>
// //                 <h3 className="text-sm font-medium text-gray-500">Position</h3>
// //                 <p className="mt-1 text-gray-900">
// //                   X: {Math.round(node.position.x)}, Y:{" "}
// //                   {Math.round(node.position.y)}
// //                 </p>
// //               </div> */}

// //               <div
// //                 className="w-6 h-6 rounded"
// //                 style={{ backgroundColor: node.style.backgroundColor }}
// //               />
// //             </div>
// //           </div>
// //         </motion.div>
// //       )}
// //     </AnimatePresence>
// //   );
// // };

// return (
//   <div style={{height: '200vh' }} className=' border rounded-xl '>
//     <ReactFlow
//       nodes={nodes}
//       edges={edges}
//       onConnect={onConnect}
//       onNodeClick={onNodeClick}
//       fitView
//     >
//       <MiniMap />
//       <Controls />
//       <Background />
//     </ReactFlow>

//     <NodeDetailsPanel node={selectedNode} isOpen={isPanelOpen} onClose={onClosePanel} />
//   </div>
// );
// };

// // NodeDetailsPanel Component
// const NodeDetailsPanel = ({ node, isOpen, onClose }) => {
// if (!node) return null;

// return (
//   <AnimatePresence>
//     {isOpen && (
//       <motion.div
//         initial={{ x: '100%' }}
//         animate={{ x: 0 }}
//         exit={{ x: '100%' }}
//         transition={{ type: 'spring', damping: 20 }}
//         className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 overflow-y-auto"
//       >
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold">{node.data.label}</h2>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <h3 className="text-sm font-medium text-gray-500">Description</h3>
//               <p className="mt-1 text-gray-900">
//                 {node.data.description || 'No description available'}
//               </p>
//             </div>
// {/* 
//             <div>
//               <h3 className="text-sm font-medium text-gray-500">Node ID</h3>
//               <p className="mt-1 text-gray-900">{node.id}</p>
//             </div>

//             <div>
//               <h3 className="text-sm font-medium text-gray-500">Position</h3>
//               <p className="mt-1 text-gray-900">
//                 X: {Math.round(node.position.x)}, Y: {Math.round(node.position.y)}
//               </p>
//             </div> */}

//             <div
//               className="w-6 h-6 rounded"
//               style={{ backgroundColor: node.style.backgroundColor }}
//             />
//           </div>
//         </div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// );
// };
// export default CARoadmap;
import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  Award, 
  ChevronRight 
} from 'lucide-react';

// Custom Node Component
const CANode = ({ data }) => {
  return (
    <div className="ca-node bg-white border-2 border-gray-300 rounded-lg p-4 shadow-lg transform transition-all hover:scale-105">
      <div className="flex items-center mb-2">
        {data.icon}
        <h3 className="text-lg font-bold ml-2 text-gray-800">{data.label}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-2">{data.shortDescription}</p>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-4 h-4 bg-blue-500" 
      />
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-4 h-4 bg-blue-500" 
      />
    </div>
  );
};

// Node Types
const nodeTypes = {
  caNode: CANode,
};

// Initial Nodes for CA Roadmap
const initialNodes = [
  {
    id: '1',
    type: 'caNode',
    position: { x: 400, y: 50 },
    data: {
      label: '10th Grade',
      icon: <BookOpen className="w-6 h-6 text-blue-500" />,
      shortDescription: 'Complete 10th standard',
      fullDescription: 'Complete 10th grade with a focus on Commerce and Mathematics. Develop a strong foundation in mathematical and analytical skills.',
      keyLearnings: [
        'Basic accounting principles',
        'Mathematics fundamentals',
        'Commerce basics'
      ],
      recommendedStreams: ['Commerce', 'Science with Mathematics']
    },
  },
  {
    id: '2',
    type: 'caNode',
    position: { x: 400, y: 200 },
    data: {
      label: '12th Grade',
      icon: <GraduationCap className="w-6 h-6 text-green-500" />,
      shortDescription: 'Complete 12th standard in Commerce',
      fullDescription: 'Complete 12th grade with Commerce stream, focusing on Accountancy, Economics, and Business Studies.',
      keyLearnings: [
        'Advanced accounting',
        'Business economics',
        'Financial management'
      ],
      minimumScoreRequired: '60% in 12th Board Exams'
    },
  },
  {
    id: '3',
    type: 'caNode',
    position: { x: 400, y: 350 },
    data: {
      label: 'CA Foundation',
      icon: <FileText className="w-6 h-6 text-red-500" />,
      shortDescription: 'Register and prepare for CA Foundation Exam',
      fullDescription: 'Register for CA Foundation course after 12th grade. This is the first step in the Chartered Accountancy professional journey.',
      examPattern: 'Online Computer Based Test (CBT)',
      eligibilityCriteria: 'Passed 12th standard exam from a recognized board',
      registrationProcess: 'Online registration through ICAI website'
    },
  },
  {
    id: '4',
    type: 'caNode',
    position: { x: 400, y: 500 },
    data: {
      label: 'CA Intermediate',
      icon: <Briefcase className="w-6 h-6 text-purple-500" />,
      shortDescription: 'Prepare and appear for CA Intermediate Exam',
      fullDescription: 'After clearing Foundation, register for CA Intermediate. This is a crucial stage with complex accounting and professional subjects.',
      subjectsIncluded: [
        'Accounting',
        'Corporate and Other Laws',
        'Cost Accounting and Financial Management',
        'Taxation'
      ],
      examMode: 'Online Computer Based Test (CBT)'
    },
  },
  {
    id: '5',
    type: 'caNode',
    position: { x: 400, y: 650 },
    data: {
      label: 'Articleship Training',
      icon: <Award className="w-6 h-6 text-yellow-500" />,
      shortDescription: '3-year practical training in CA firms',
      fullDescription: 'Mandatory 3-year practical training in a Chartered Accountancy firm. Gain hands-on experience in accounting, auditing, and taxation.',
      trainingAreas: [
        'Audit and Assurance',
        'Taxation',
        'Financial Accounting',
        'Business Laws'
      ],
      duration: '3 years',
      stipend: 'Varies based on firm and location'
    },
  },
  {
    id: '6',
    type: 'caNode',
    position: { x: 400, y: 800 },
    data: {
      label: 'CA Final',
      icon: <FileText className="w-6 h-6 text-orange-500" />,
      shortDescription: 'Prepare and appear for CA Final Exam',
      fullDescription: 'The final and most challenging exam to become a Chartered Accountant. Tests comprehensive knowledge and professional skills.',
      subjectsIncluded: [
        'Advanced Accounting',
        'Auditing and Professional Ethics',
        'Advanced Corporate Law',
        'Strategic Financial Management'
      ],
      successRate: 'Typically 15-20%'
    },
  },
  {
    id: '7',
    type: 'caNode',
    position: { x: 400, y: 950 },
    data: {
      label: 'Become a CA',
      icon: <Award className="w-6 h-6 text-green-600" />,
      shortDescription: 'Officially become a Chartered Accountant',
      fullDescription: 'After clearing CA Final and completing Articleship, get membership with ICAI and start professional practice.',
      benefits: [
        'Professional Certification',
        'High Earning Potential',
        'Multiple Career Opportunities'
      ],
      possibleRoles: [
        'Independent CA',
        'Corporate Finance Professional',
        'Tax Consultant',
        'Audit Manager'
      ]
    },
  }
];

// Initial Edges
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, type: 'smoothstep' },
  { id: 'e2-3', source: '2', target: '3', animated: true, type: 'smoothstep' },
  { id: 'e3-4', source: '3', target: '4', animated: true, type: 'smoothstep' },
  { id: 'e4-5', source: '4', target: '5', animated: true, type: 'smoothstep' },
  { id: 'e5-6', source: '5', target: '6', animated: true, type: 'smoothstep' },
  { id: 'e6-7', source: '6', target: '7', animated: true, type: 'smoothstep' },
];

// Node Details Panel Component
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
          className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl z-50 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                {node.data.icon}
                <h2 className="text-2xl font-bold ml-3">{node.data.label}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Description</h3>
                <p className="text-gray-800">{node.data.fullDescription}</p>
              </div>

              {node.data.keyLearnings && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Key Learnings</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {node.data.keyLearnings.map((learning, index) => (
                      <li key={index}>{learning}</li>
                    ))}
                  </ul>
                </div>
              )}

              {node.data.subjectsIncluded && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Subjects Included</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {node.data.subjectsIncluded.map((subject, index) => (
                      <li key={index}>{subject}</li>
                    ))}
                  </ul>
                </div>
              )}

              {node.data.benefits && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Benefits</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {node.data.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Component
const CARoadmap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isPanelOpen, setPanelOpen] = useState(false);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setPanelOpen(true);
  }, []);

  const onClosePanel = useCallback(() => {
    setPanelOpen(false);
  }, []);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  return (
    <div className="h-[150vh] w-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
      >
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>

      <NodeDetailsPanel 
        node={selectedNode} 
        isOpen={isPanelOpen} 
        onClose={onClosePanel} 
      />
    </div>
  );
};

export default CARoadmap;