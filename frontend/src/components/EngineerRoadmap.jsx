// import React, { useState } from 'react';
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   addEdge,
// } from 'reactflow';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X } from 'lucide-react';  // For the close button icon

// // 

// const initialNodes = [
//     {
//       id: '1',
//       position: { x: 250, y: 50 },
//       data: {
//         label: '10th Grade (End of Year)',
//         description: 'The student completes the 10th grade and decides their future path.',
//       },
//       style: { backgroundColor: '#f9c74f', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '2',
//       position: { x: 0, y: 150 },
//       data: {
//         label: 'Choose Stream',
//         description: 'The student must choose between Science, Arts, or Commerce. If Science is chosen, the student prepares for the engineering path.',
//       },
//       style: { backgroundColor: '#90be6d', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '3',
//       position: { x: 0, y: 300 },
//       data: {
//         label: 'Choose Arts or Commerce',
//         description: 'If Arts or Commerce is chosen, the student may pursue other fields like Humanities or Business.',
//       },
//       style: { backgroundColor: '#f94144', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '4',
//       position: { x: 250, y: 150 },
//       data: {
//         label: 'Complete 11th & 12th Grade (Science)',
//         description: 'The student completes their higher secondary education with a focus on subjects like Math, Physics, and Chemistry.',
//       },
//       style: { backgroundColor: '#f94144', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '5',
//       position: { x: 500, y: 150 },
//       data: {
//         label: 'Choose Engineering Specialization',
//         description: 'After completing the 12th grade, the student selects the branch of engineering to pursue, such as Computer Science, Mechanical, Civil, etc.',
//       },
//       style: { backgroundColor: '#277da1', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '6',
//       position: { x: 250, y: 300 },
//       data: {
//         label: 'Clear Engineering Entrance Exams',
//         description: 'The student must appear and clear engineering entrance exams like JEE, BITSAT, etc. to qualify for admission.',
//       },
//       style: { backgroundColor: '#f4a261', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '7',
//       position: { x: 0, y: 450 },
//       data: {
//         label: 'Join Arts/Commerce College',
//         description: 'The student joins a college for Arts or Commerce after completing their higher secondary education.',
//       },
//       style: { backgroundColor: '#2a9d8f', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '8',
//       position: { x: 500, y: 450 },
//       data: {
//         label: 'Join Engineering College',
//         description: 'The student joins an engineering college after clearing entrance exams, starting the degree program.',
//       },
//       style: { backgroundColor: '#2a9d8f', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '9',
//       position: { x: 250, y: 600 },
//       data: {
//         label: 'Complete Engineering Degree',
//         description: 'The student completes the engineering degree program in the selected specialization.',
//       },
//       style: { backgroundColor: '#e9c46a', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '10',
//       position: { x: 250, y: 750 },
//       data: {
//         label: 'Internships/Projects',
//         description: 'During college, students may engage in internships or projects to gain practical experience.',
//       },
//       style: { backgroundColor: '#f9c74f', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '11',
//       position: { x: 0, y: 900 },
//       data: {
//         label: 'Job Opportunities (Non-Engineering)',
//         description: 'Students who pursued Arts/Commerce may explore job opportunities in fields like Business or Education.',
//       },
//       style: { backgroundColor: '#2a9d8f', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '12',
//       position: { x: 500, y: 900 },
//       data: {
//         label: 'Job Opportunities (Engineering)',
//         description: 'Graduates can explore various roles such as Software Engineer, Mechanical Engineer, Civil Engineer, etc.',
//       },
//       style: { backgroundColor: '#e76f51', padding: '10px', borderRadius: '8px' },
//     },
//     {
//       id: '13',
//       position: { x: 250, y: 900 },
//       data: {
//         label: 'Pursue Higher Studies',
//         description: 'Graduates may choose to pursue a Master\'s degree or specialized certifications for advanced roles.',
//       },
//       style: { backgroundColor: '#e9c46a', padding: '10px', borderRadius: '8px' },
//     },
//   ];

//   const initialEdges = [
//   { id: 'e1-2', source: '1', target: '2', animated: true },
//   { id: 'e2-3', source: '2', target: '3', animated: true },
//   { id: 'e2-4', source: '2', target: '4', animated: true },
//   { id: 'e4-5', source: '4', target: '5', animated: true },
//   { id: 'e5-6', source: '5', target: '6', animated: true },
//   { id: 'e3-7', source: '3', target: '7', animated: true },
//   { id: 'e6-8', source: '6', target: '8', animated: true },
//   { id: 'e7-11', source: '7', target: '11', animated: true },
//   { id: 'e8-9', source: '8', target: '9', animated: true },
//   { id: 'e9-12', source: '9', target: '12', animated: true },
//   { id: 'e9-13', source: '9', target: '13', animated: true },
//   { id: 'e10-12', source: '10', target: '12', animated: true },
// ];

// const EngineerRoadmap = () => {
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
//     <div style={{ height: '150vh', }} className='border rounded-xl'>
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

// export default EngineerRoadmap;
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
import { X, Book, Briefcase, GraduationCap, Code, PenToolIcon as Tool, HardHat, ChevronRight, ChevronLeft } from 'lucide-react';

const nodeTypes = {
  custom: ({ data }) => (
    <div className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-lg max-w-xs">
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
    position: { x: 250, y: 0 },
    data: {
      label: 'High School',
      icon: <Book className="w-6 h-6 text-blue-500" />,
      shortDescription: 'Complete 10th grade and choose stream',
      description: 'Complete 10th grade with good grades in Mathematics and Science. Choose the Science stream for 11th and 12th grade.',
      duration: '2 years',
      skills: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science (optional)'],
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 250, y: 150 },
    data: {
      label: 'Higher Secondary Education',
      icon: <GraduationCap className="w-6 h-6 text-green-500" />,
      shortDescription: 'Complete 11th and 12th grade (Science)',
      description: 'Focus on Physics, Chemistry, and Mathematics (PCM). Optionally, take Computer Science or Biology as an additional subject.',
      duration: '2 years',
      skills: ['Advanced Mathematics', 'Physics', 'Chemistry', 'Problem Solving'],
    },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 250, y: 300 },
    data: {
      label: 'Engineering Entrance Exams',
      icon: <Book className="w-6 h-6 text-red-500" />,
      shortDescription: 'Prepare and appear for entrance exams',
      description: 'Prepare for and take engineering entrance exams like JEE (India), SAT (USA), or other country-specific exams.',
      duration: '6 months - 1 year',
      skills: ['Exam Strategies', 'Time Management', 'Advanced Problem Solving'],
    },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 250, y: 450 },
    data: {
      label: 'Choose Engineering Discipline',
      icon: <Tool className="w-6 h-6 text-purple-500" />,
      shortDescription: 'Select a specific engineering field',
      description: 'Choose a specific engineering discipline such as Computer Science, Mechanical, Electrical, Civil, etc. based on your interests and career goals.',
      duration: 'Decision making period',
      skills: ['Research', 'Decision Making', 'Career Planning'],
    },
  },
  {
    id: '5',
    type: 'custom',
    position: { x: 250, y: 600 },
    data: {
      label: 'Bachelor\'s Degree in Engineering',
      icon: <GraduationCap className="w-6 h-6 text-yellow-500" />,
      shortDescription: 'Complete undergraduate engineering program',
      description: 'Enroll in and complete a Bachelor\'s degree in your chosen engineering discipline. This includes theoretical courses, practical labs, and usually a final year project.',
      duration: '4 years',
      skills: ['Engineering Fundamentals', 'Technical Skills', 'Project Management', 'Teamwork'],
    },
  },
  {
    id: '6',
    type: 'custom',
    position: { x: 0, y: 750 },
    data: {
      label: 'Internships',
      icon: <Briefcase className="w-6 h-6 text-blue-500" />,
      shortDescription: 'Gain practical experience',
      description: 'Participate in internships or co-op programs to gain practical industry experience. This can be done during summer breaks or as part of the curriculum.',
      duration: '2-6 months',
      skills: ['Practical Application', 'Professional Communication', 'Industry-specific Tools'],
    },
  },
  {
    id: '7',
    type: 'custom',
    position: { x: 500, y: 750 },
    data: {
      label: 'Final Year Project',
      icon: <Tool className="w-6 h-6 text-green-500" />,
      shortDescription: 'Complete capstone project',
      description: 'Work on a significant engineering project that demonstrates your skills and knowledge acquired during the degree program.',
      duration: '6-12 months',
      skills: ['Project Management', 'Research', 'Technical Writing', 'Presentation'],
    },
  },
  {
    id: '8',
    type: 'custom',
    position: { x: 0, y: 900 },
    data: {
      label: 'Entry-Level Job',
      icon: <Briefcase className="w-6 h-6 text-indigo-500" />,
      shortDescription: 'Start professional career',
      description: 'Begin your professional career as an entry-level engineer in your chosen field. This could be in various industries such as tech companies, manufacturing, construction, etc.',
      duration: '1-3 years',
      skills: ['Professional Skills', 'Technical Expertise', 'Teamwork', 'Problem Solving'],
    },
  },
  {
    id: '9',
    type: 'custom',
    position: { x: 250, y: 900 },
    data: {
      label: 'Graduate Studies (Optional)',
      icon: <GraduationCap className="w-6 h-6 text-red-500" />,
      shortDescription: 'Pursue advanced degree',
      description: 'Optionally, pursue a Master\'s degree or Ph.D. in a specialized area of engineering to deepen your knowledge and open up research or advanced career opportunities.',
      duration: '2-5 years',
      skills: ['Advanced Research', 'Specialization', 'Academic Writing'],
    },
  },
  {
    id: '10',
    type: 'custom',
    position: { x: 500, y: 900 },
    data: {
      label: 'Entrepreneurship (Optional)',
      icon: <Briefcase className="w-6 h-6 text-yellow-500" />,
      shortDescription: 'Start your own venture',
      description: 'Use your engineering skills and knowledge to start your own business or become a consultant in your field of expertise.',
      duration: 'Varies',
      skills: ['Business Acumen', 'Leadership', 'Innovation', 'Risk Management'],
    },
  },
  {
    id: '11',
    type: 'custom',
    position: { x: 250, y: 1050 },
    data: {
      label: 'Career Progression',
      icon: <HardHat className="w-6 h-6 text-purple-500" />,
      shortDescription: 'Advance in your career',
      description: 'Progress in your career to senior engineering roles, management positions, or specialized expert roles depending on your career goals and interests.',
      duration: 'Ongoing',
      skills: ['Leadership', 'Advanced Technical Skills', 'Strategic Thinking', 'Mentoring'],
    },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, label: 'Progress to Higher Secondary' },
  { id: 'e2-3', source: '2', target: '3', animated: true, label: 'Prepare for Entrance Exams' },
  { id: 'e3-4', source: '3', target: '4', animated: true, label: 'Choose Specialization' },
  { id: 'e4-5', source: '4', target: '5', animated: true, label: 'Start Bachelor\'s Degree' },
  { id: 'e5-6', source: '5', target: '6', animated: true, label: 'Gain Experience' },
  { id: 'e5-7', source: '5', target: '7', animated: true, label: 'Complete Project' },
  { id: 'e6-8', source: '6', target: '8', animated: true, label: 'Start Career' },
  { id: 'e7-8', source: '7', target: '8', animated: true, label: 'Start Career' },
  { id: 'e5-9', source: '5', target: '9', animated: true, label: 'Further Studies' },
  { id: 'e8-10', source: '8', target: '10', animated: true, label: 'Start Business' },
  { id: 'e8-11', source: '8', target: '11', animated: true, label: 'Career Growth' },
  { id: 'e9-11', source: '9', target: '11', animated: true, label: 'Career Growth' },
  { id: 'e10-11', source: '10', target: '11', animated: true, label: 'Career Growth' },
];

const EngineerRoadmap = () => {
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
    switch (node.data.label) {
      case 'High School': return '#3B82F6';
      case 'Higher Secondary Education': return '#10B981';
      case 'Engineering Entrance Exams': return '#EF4444';
      case 'Choose Engineering Discipline': return '#8B5CF6';
      case 'Bachelor\'s Degree in Engineering': return '#F59E0B';
      case 'Internships': return '#3B82F6';
      case 'Final Year Project': return '#10B981';
      case 'Entry-Level Job': return '#6366F1';
      case 'Graduate Studies (Optional)': return '#EF4444';
      case 'Entrepreneurship (Optional)': return '#F59E0B';
      case 'Career Progression': return '#8B5CF6';
      default: return '#CBD5E1';
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center py-4 bg-blue-100">Engineering Career Roadmap</h1>
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

              <p className="mt-1 text-gray-900">{steps[currentStep].content}</p>

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

export default EngineerRoadmap;