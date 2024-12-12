// import React, { useState } from 'react';
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   addEdge,
// } from 'reactflow';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X } from 'lucide-react';  // For the close button icon

// const initialNodes = [
//     {
//       id: '1',
//       position: { x: 250, y: 50 },
//       data: {
//         label: '10th Grade (End of Year)',
//         description: 'The student completes 10th grade and begins considering future options.',
//       },
//       style: { backgroundColor: '#f9c74f', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '2',
//       position: { x: 250, y: 150 },
//       data: {
//         label: '12th Grade',
//         description: 'The student completes higher secondary education in any stream.',
//       },
//       style: { backgroundColor: '#90be6d', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '3',
//       position: { x: 250, y: 300 },
//       data: {
//         label: 'Graduate in Any Discipline',
//         description: 'The student completes a bachelor’s degree in a field of their choice, fulfilling eligibility for IAS.',
//       },
//       style: { backgroundColor: '#f94144', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '4',
//       position: { x: 250, y: 450 },
//       data: {
//         label: 'Prepare for UPSC Exam',
//         description: 'The student begins preparation for the UPSC Civil Services Examination, covering Prelims, Mains, and Interview.',
//       },
//       style: { backgroundColor: '#f4a261', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '5',
//       position: { x: 250, y: 600 },
//       data: {
//         label: 'Clear UPSC Exam',
//         description: 'The candidate clears all stages of the UPSC Civil Services Exam to secure a rank.',
//       },
//       style: { backgroundColor: '#2a9d8f', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '6',
//       position: { x: 100, y: 750 },
//       data: {
//         label: 'Join IAS Training (LBSNAA)',
//         description: 'Selected candidates undergo training at the Lal Bahadur Shastri National Academy of Administration.',
//       },
//       style: { backgroundColor: '#e76f51', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '7',
//       position: { x: 400, y: 750 },
//       data: {
//         label: 'Serve as an IAS Officer',
//         description: 'After training, candidates are posted to various administrative roles across the country.',
//       },
//       style: { backgroundColor: '#e9c46a', padding: '10px', borderRadius: '8px' },
//     },
//   ];

//   const initialEdges = [
//     { id: 'e1-2', source: '1', target: '2', animated: true },
//     { id: 'e2-3', source: '2', target: '3', animated: true },
//     { id: 'e3-4', source: '3', target: '4', animated: true },
//     { id: 'e4-5', source: '4', target: '5', animated: true },
//     { id: 'e5-6', source: '5', target: '6', animated: true },
//     { id: 'e5-7', source: '5', target: '7', animated: true },
//   ];
  
// const IASRoadmap = () => {
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
// //     <div style={{ height: '100vh' }}>
// //       <ReactFlow
// //         nodes={nodes}
// //         edges={edges}
// //         onConnect={onConnect}
// //         onNodeClick={onNodeClick}
// //         fitView
// //       >
// //         <MiniMap />
// //         {/* <Controls /> */}
// //         <Background />
// //       </ReactFlow>

// //       <NodeDetailsPanel node={selectedNode} isOpen={isPanelOpen} onClose={onClosePanel} />
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
// //           initial={{ x: '100%' }}
// //           animate={{ x: 0 }}
// //           exit={{ x: '100%' }}
// //           transition={{ type: 'spring', damping: 20 }}
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
// //                 <h3 className="text-sm font-medium text-gray-500">Description</h3>
// //                 <p className="mt-1 text-gray-900">
// //                   {node.data.description || 'No description available'}
// //                 </p>
// //               </div>
// // {/* 
// //               <div>
// //                 <h3 className="text-sm font-medium text-gray-500">Node ID</h3>
// //                 <p className="mt-1 text-gray-900">{node.id}</p>
// //               </div>

// //               <div>
// //                 <h3 className="text-sm font-medium text-gray-500">Position</h3>
// //                 <p className="mt-1 text-gray-900">
// //                   X: {Math.round(node.position.x)}, Y: {Math.round(node.position.y)}
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
// export default IASRoadmap;
import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, 
  Stethoscope, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Target, 
  MapPin, 
  Star, 
  CheckCircle 
} from 'lucide-react';

// Custom Node Type Component
const CustomNodeType = ({ data }) => (
  <div className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-lg transition-all hover:shadow-xl">
    <div className="flex items-center mb-2">
      {data.icon}
      <h3 className="text-lg font-semibold ml-2">{data.label}</h3>
    </div>
    <p className="text-sm text-gray-600">{data.shortDescription}</p>
  </div>
);

// Node Types Configuration
const nodeTypes = {
  custom: CustomNodeType,
};

// Initial Nodes for IAS Career Path
const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
      label: '10th Grade',
      icon: <Book className="w-6 h-6 text-blue-500" />,
      shortDescription: 'Build strong academic foundation',
      description: 'Complete 10th grade with excellent grades. Focus on core subjects like Mathematics, Science, and Social Studies. Develop critical thinking and study skills.',
      duration: '1 Year',
      keyTips: [
        'Maintain above 85% academic performance',
        'Participate in school-level competitions',
        'Start developing reading and comprehension skills',
      ],
      challenges: [
        'Managing academic pressure',
        'Choosing the right stream for higher studies',
        'Developing consistent study habits',
      ],
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 0, y: 200 },
    data: {
      label: '11th-12th Grade',
      icon: <GraduationCap className="w-6 h-6 text-green-500" />,
      shortDescription: 'Prepare for competitive exams',
      description: 'Choose humanities or social science stream. Focus on subjects like Political Science, History, and English. Start preliminary UPSC exam preparation.',
      duration: '2 Years',
      keyTips: [
        'Study NCERT textbooks thoroughly',
        'Begin reading newspapers daily',
        'Start basic preparation for UPSC preliminary exams',
        'Develop writing and analytical skills',
      ],
      challenges: [
        'Balancing board exam preparation',
        'Understanding vast syllabus',
        'Maintaining consistent motivation',
      ],
    },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 0, y: 400 },
    data: {
      label: 'Undergraduate Degree',
      icon: <Target className="w-6 h-6 text-red-500" />,
      shortDescription: 'Complete bachelor\'s degree',
      description: 'Pursue a bachelor\'s degree in subjects like Political Science, Public Administration, History, or any relevant discipline. Focus on building a strong academic and general knowledge base.',
      duration: '3-4 Years',
      keyTips: [
        'Choose a stream aligned with UPSC syllabus',
        'Maintain high academic performance',
        'Participate in debates and discussions',
        'Build communication skills',
      ],
      challenges: [
        'Maintaining focus on UPSC preparation',
        'Managing academic workload',
        'Developing a comprehensive understanding of subjects',
      ],
    },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 0, y: 600 },
    data: {
      label: 'UPSC Preliminary Exam',
      icon: <MapPin className="w-6 h-6 text-purple-500" />,
      shortDescription: 'First stage of Civil Services Exam',
      description: 'Appear for the UPSC Preliminary Examination, which is an objective type exam testing general studies and current affairs knowledge.',
      duration: '1 Day (Annual Exam)',
      keyTips: [
        'Solve multiple mock tests',
        'Read newspapers and magazines extensively',
        'Focus on current affairs and general knowledge',
        'Practice time management',
      ],
      challenges: [
        'Vast and dynamic syllabus',
        'High competition',
        'Psychological pressure',
      ],
    },
  },
  {
    id: '5',
    type: 'custom',
    position: { x: -250, y: 800 },
    data: {
      label: 'UPSC Mains Exam',
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      shortDescription: 'Descriptive examination',
      description: 'Appear for the UPSC Mains Examination, which includes descriptive papers testing in-depth knowledge, writing skills, and analytical capabilities.',
      duration: '5-6 Days',
      keyTips: [
        'Practice answer writing',
        'Study optional subject in depth',
        'Develop critical analysis skills',
        'Focus on presentation and structure',
      ],
      challenges: [
        'Comprehensive and lengthy exam',
        'Intense writing requirements',
        'Managing time during the exam',
      ],
    },
  },
  {
    id: '6',
    type: 'custom',
    position: { x: 250, y: 800 },
    data: {
      label: 'Personal Interview',
      icon: <CheckCircle className="w-6 h-6 text-teal-500" />,
      shortDescription: 'Final selection stage',
      description: 'Appear for the Personality Test (Interview) which assesses candidates\' overall personality, communication skills, and suitability for civil services.',
      duration: '20-30 Minutes',
      keyTips: [
        'Practice mock interviews',
        'Stay updated on current affairs',
        'Work on body language and communication',
        'Be confident and authentic',
      ],
      challenges: [
        'Psychological pressure',
        'Unpredictable questions',
        'Managing stress and nervousness',
      ],
    },
  },
  {
    id: '7',
    type: 'custom',
    position: { x: 0, y: 1000 },
    data: {
      label: 'IAS Officer Training',
      icon: <Briefcase className="w-6 h-6 text-indigo-500" />,
      shortDescription: 'Professional training at LBSNAA',
      description: 'Complete rigorous training at Lal Bahadur Shastri National Academy of Administration (LBSNAA), learning administrative skills, leadership, and governance.',
      duration: '1-2 Years',
      keyTips: [
        'Be adaptable and open to learning',
        'Develop leadership skills',
        'Understand governance and administration',
        'Network with fellow officers',
      ],
      challenges: [
        'Intense and comprehensive training',
        'Adapting to new professional environment',
        'Balancing theoretical and practical learning',
      ],
    },
  },
];

// Initial Edges Configuration
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, label: 'Academic Progression' },
  { id: 'e2-3', source: '2', target: '3', animated: true, label: 'Higher Education' },
  { id: 'e3-4', source: '3', target: '4', animated: true, label: 'Preliminary Exam' },
  { id: 'e4-5', source: '4', target: '5', animated: true, label: 'Mains Exam' },
  { id: 'e4-6', source: '4', target: '6', animated: true, label: 'Interview Stage' },
  { id: 'e5-7', source: '5', target: '7', animated: true, label: 'Final Selection' },
  { id: 'e6-7', source: '6', target: '7', animated: true, label: 'Officer Training' },
];

// Node Color Function
const nodeColor = (node) => {
  const colorMap = {
    '1': '#3B82F6',   // Blue for 10th Grade
    '2': '#10B981',   // Green for 11th-12th Grade
    '3': '#EF4444',   // Red for Undergraduate
    '4': '#8B5CF6',   // Purple for Preliminary Exam
    '5': '#F59E0B',   // Yellow for Mains Exam
    '6': '#6366F1',   // Indigo for Interview
    '7': '#10B981',   // Teal for Training
  };
  return colorMap[node.id] || '#CBD5E1';
};

// Main Roadmap Component
const IASRoadmap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isPanelOpen, setPanelOpen] = useState(false);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setPanelOpen(true);
  }, []);

  const onClosePanel = useCallback(() => {
    setPanelOpen(false);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center py-4 bg-blue-100">IAS Career Roadmap</h1>
      <div className="flex-grow relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap nodeColor={nodeColor} />
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
        <NodeDetailsPanel 
          node={selectedNode} 
          isOpen={isPanelOpen} 
          onClose={onClosePanel} 
        />
      </div>
    </div>
  );
};

// Node Details Panel Component
const NodeDetailsPanel = ({ node, isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = useMemo(() => {
    if (!node) return [];
    return [
      { 
        title: 'Overview', 
        content: node.data.description,
        icon: <Book className="w-5 h-5 mr-2" />
      },
      { 
        title: 'Duration', 
        content: node.data.duration,
        icon: <Clock className="w-5 h-5 mr-2" />
      },
      { 
        title: 'Key Tips', 
        content: node.data.keyTips.map((tip, index) => (
          <div key={index} className="flex items-center mb-2">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            <span>{tip}</span>
          </div>
        )),
        icon: <Star className="w-5 h-5 mr-2" />
      },
      { 
        title: 'Challenges', 
        content: node.data.challenges.map((challenge, index) => (
          <div key={index} className="flex items-center mb-2">
            <X className="w-4 h-4 mr-2 text-red-500" />
            <span>{challenge}</span>
          </div>
        )),
        icon: <Target className="w-5 h-5 mr-2" />
      },
    ];
  }, [node]);

  if (!node) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                {node.data.icon}
                {node.data.label}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close panel"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                {steps[currentStep].icon}
                <span className="text-lg font-semibold">{steps[currentStep].title}</span>
              </div>

              <div className="min-h-[200px]">
                {steps[currentStep].content}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className="flex items-center text-blue-500 disabled:text-gray-300"
                  aria-label="Previous step"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Previous
                </button>
                <button
                  onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
                  disabled={currentStep === steps.length - 1}
                  className="flex items-center text-blue-500 disabled:text-gray-300"
                  aria-label="Next step"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IASRoadmap;