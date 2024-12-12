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
//         description: 'The student completes 10th grade and selects the Science stream with Biology.',
//       },
//       style: { backgroundColor: '#a8dadc', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '2',
//       position: { x: 250, y: 150 },
//       data: {
//         label: '12th Grade (Science)',
//         description: 'The student completes higher secondary education with Physics, Chemistry, and Biology (PCB).',
//       },
//       style: { backgroundColor: '#457b9d', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '3',
//       position: { x: 250, y: 300 },
//       data: {
//         label: 'Qualify NEET Exam',
//         description: 'The student clears the NEET (National Eligibility cum Entrance Test) to secure a medical college seat.',
//       },
//       style: { backgroundColor: '#1d3557', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '4',
//       position: { x: 250, y: 450 },
//       data: {
//         label: 'MBBS Degree',
//         description: 'The student completes a 5.5-year Bachelor of Medicine and Bachelor of Surgery (MBBS) program.',
//       },
//       style: { backgroundColor: '#2a9d8f', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '5',
//       position: { x: 250, y: 600 },
//       data: {
//         label: 'Internship and Licensing',
//         description: 'The student completes a 1-year internship and obtains a license to practice medicine.',
//       },
//       style: { backgroundColor: '#f4a261', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '6',
//       position: { x: 100, y: 750 },
//       data: {
//         label: 'General Practitioner',
//         description: 'The individual begins practicing medicine as a General Practitioner (GP).',
//       },
//       style: { backgroundColor: '#e76f51', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '7',
//       position: { x: 400, y: 750 },
//       data: {
//         label: 'Postgraduate Specialization (Optional)',
//         description: 'The individual pursues MD/MS in a chosen specialty to become a specialist doctor.',
//       },
//       style: { backgroundColor: '#e9c46a', padding: '10px', borderRadius: '8px' },
//     },
//   ];
  

//   const initialEdges = [
//     // Primary flow
//     { id: 'e1-2', source: '1', target: '2', animated: true }, // 10th to 12th
//     { id: 'e2-3', source: '2', target: '3', animated: true }, // 12th to NEET
//     { id: 'e3-4', source: '3', target: '4', animated: true }, // NEET to MBBS
//     { id: 'e4-7', source: '4', target: '7', animated: true }, // MBBS to Specialization
//     { id: 'e4-5', source: '4', target: '5', animated: true }, // MBBS to Internship
//     { id: 'e5-6', source: '5', target: '6', animated: true }, // Internship to GP
  
//     // Added feedback loops
//     { id: 'e7-6', source: '7', target: '6', animated: true, label: 'Switch to GP' }, // Specialization to GP
//     { id: 'e6-7', source: '6', target: '7', animated: true, label: 'Specialize Later' }, // GP to Specialization
//   ];
  
  
// const DoctorRoadmap = () => {
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

//   return (
//     <div style={{height: '200vh' }} className='border rounded-xl'>
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

// export default DoctorRoadmap;
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
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
import { X, Book, Stethoscope, GraduationCap, Briefcase, Award, Clock, ChevronRight, ChevronLeft } from 'lucide-react';

const nodeTypes = {
  custom: ({ data }) => (
    <div className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-lg">
      <div className="flex items-center mb-2">
        {data.icon}
        <h3 className="text-lg font-semibold ml-2">{data.label}</h3>
      </div>
      <p className="text-sm text-gray-600">{data.shortDescription}</p>
    </div>
  ),
};

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
      label: 'High School',
      icon: <Book className="w-6 h-6 text-blue-500" />,
      shortDescription: 'Focus on science subjects',
      description: 'Complete high school with a strong foundation in Biology, Chemistry, and Physics. Maintain high grades and participate in science-related extracurricular activities.',
      duration: '4 years',
      skills: ['Biology', 'Chemistry', 'Physics', 'Mathematics', 'Critical Thinking'],
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 0, y: 150 },
    data: {
      label: 'Pre-Medical Studies',
      icon: <GraduationCap className="w-6 h-6 text-green-500" />,
      shortDescription: 'Prepare for medical school entrance exams',
      description: 'Enroll in a pre-medical program or take required courses. Prepare for and take medical school entrance exams like MCAT (USA) or NEET (India).',
      duration: '2-4 years',
      skills: ['MCAT/NEET Preparation', 'Advanced Biology', 'Organic Chemistry', 'Research Skills'],
    },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 0, y: 300 },
    data: {
      label: 'Medical School',
      icon: <Stethoscope className="w-6 h-6 text-red-500" />,
      shortDescription: 'Earn a medical degree',
      description: 'Complete a medical degree program (e.g., MD in the USA, MBBS in India). This includes pre-clinical studies and clinical rotations.',
      duration: '4-5 years',
      skills: ['Anatomy', 'Physiology', 'Pharmacology', 'Pathology', 'Clinical Skills'],
    },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 0, y: 450 },
    data: {
      label: 'Residency',
      icon: <Briefcase className="w-6 h-6 text-purple-500" />,
      shortDescription: 'Specialized training in a chosen field',
      description: 'Complete a residency program in your chosen specialty. This involves hands-on training under supervision.',
      duration: '3-7 years',
      skills: ['Specialized Medical Knowledge', 'Patient Care', 'Medical Procedures', 'Teamwork'],
    },
  },
  {
    id: '5',
    type: 'custom',
    position: { x: -200, y: 600 },
    data: {
      label: 'Fellowship (Optional)',
      icon: <Award className="w-6 h-6 text-yellow-500" />,
      shortDescription: 'Further specialization',
      description: 'Pursue additional specialized training in a subspecialty of medicine.',
      duration: '1-3 years',
      skills: ['Advanced Specialized Knowledge', 'Research', 'Specialized Procedures'],
    },
  },
  {
    id: '6',
    type: 'custom',
    position: { x: 200, y: 600 },
    data: {
      label: 'Medical Practice',
      icon: <Briefcase className="w-6 h-6 text-indigo-500" />,
      shortDescription: 'Begin professional practice',
      description: 'Start your career as a practicing physician in hospitals, clinics, or private practice.',
      duration: 'Ongoing',
      skills: ['Patient Care', 'Diagnosis', 'Treatment Planning', 'Continuing Medical Education'],
    },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, label: 'Progress to Pre-Med' },
  { id: 'e2-3', source: '2', target: '3', animated: true, label: 'Enter Medical School' },
  { id: 'e3-4', source: '3', target: '4', animated: true, label: 'Begin Residency' },
  { id: 'e4-5', source: '4', target: '5', animated: true, label: 'Optional Fellowship' },
  { id: 'e4-6', source: '4', target: '6', animated: true, label: 'Start Practice' },
  { id: 'e5-6', source: '5', target: '6', animated: true, label: 'Start Specialized Practice' },
];

const DoctorRoadmap = () => {
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

  const nodeColor = (node) => {
    switch (node.id) {
      case '1': return '#3B82F6';
      case '2': return '#10B981';
      case '3': return '#EF4444';
      case '4': return '#8B5CF6';
      case '5': return '#F59E0B';
      case '6': return '#6366F1';
      default: return '#CBD5E1';
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center py-4 bg-blue-100">Doctor Career Roadmap</h1>
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
        <NodeDetailsPanel node={selectedNode} isOpen={isPanelOpen} onClose={onClosePanel} />
      </div>
    </div>
  );
};

const NodeDetailsPanel = ({ node, isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = useMemo(() => {
    if (!node) return [];
    return [
      { title: 'Overview', content: node.data.description },
      { title: 'Duration', content: node.data.duration },
      { title: 'Skills', content: node.data.skills.join(', ') },
      { title: '3D View', content: '3D' },
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
              <h2 className="text-2xl font-bold">{node.data.label}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close panel"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                {node.data.icon}
                <span className="text-lg font-semibold">{steps[currentStep].title}</span>
              </div>

              {currentStep === 3 ? (
                <div className="h-64 border rounded-lg overflow-hidden">
                  <Canvas>
                    <OrbitControls />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <Box args={[1, 1, 1]} rotation={[0, Math.PI / 4, 0]}>
                      <meshStandardMaterial color={nodeColor(node)} />
                    </Box>
                    <Text
                      position={[0, 1.5, 0]}
                      fontSize={0.2}
                      color="black"
                      anchorX="center"
                      anchorY="middle"
                    >
                      {node.data.label}
                    </Text>
                  </Canvas>
                </div>
              ) : (
                <p className="mt-1 text-gray-900">{steps[currentStep].content}</p>
              )}

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

export default DoctorRoadmap;