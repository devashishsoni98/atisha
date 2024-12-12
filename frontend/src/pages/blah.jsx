import React from 'react';
import { motion } from 'framer-motion';
import { Book, Lightbulb, Users, Award, Briefcase, Compass, User } from 'lucide-react';

const icons = [
    { id: 1, y: 50, Icon: Book, color: '#FF6B6B', label: 'Study' },
    { id: 2, y: 150, Icon: Lightbulb, color: '#4ECDC4', label: 'Ideas' },
    { id: 3, y: 250, Icon: Users, color: '#45B7D1', label: 'Network' },
    { id: 4, y: 350, Icon: Award, color: '#F7B801', label: 'Skills' },
    { id: 5, y: 450, Icon: Briefcase, color: '#9B5DE5', label: 'Internship' },
];

const StudentCareerFlow = () => {
    // Coordinates
    const leftX = 100;
    const centerX = 400;
    const centerY = 250;
    const rightX = 700;
    const rightY = 250;

    // Animation for the beam effect
    const pathVariants = {
        initial: { pathLength: 0, opacity: 0 },
        animate: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
            },
        },
    };

    return (
        <div className="w-full h-screen flex items-center justify-center font-sans">
            <svg width="800" height="500" className="overflow-visible">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* Continuous beams from left to right */}
                {icons.map((icon) => (
                    <motion.path
                        key={icon.id}
                        d={`M ${leftX} ${icon.y} Q ${(leftX + centerX) / 2} ${icon.y}, ${centerX} ${centerY} T ${rightX} ${rightY}`}
                        stroke={icon.color}
                        strokeWidth="4"
                        fill="none"
                        variants={pathVariants}
                        initial="initial"
                        animate="animate"
                        style={{ filter: 'url(#glow)' }}
                    />
                ))}

                {/* Left icons */}
                {icons.map(({ id, y, Icon, color, label }) => (
                    <g key={id}>
                        <circle
                            cx={leftX}
                            cy={y}
                            r="30"
                            fill={color}
                            className="drop-shadow-lg"
                        />
                        <Icon x={leftX - 15} y={y - 15} width="30" height="30" color="white" />
                        <text x={leftX - 50} y={y} textAnchor="end" alignmentBaseline="middle" fill="#333" fontSize="14">
                            {label}
                        </text>
                    </g>
                ))}

                {/* Center node */}
                <circle
                    cx={centerX}
                    cy={centerY}
                    r="40"
                    fill="#FF9A8B"
                    className="drop-shadow-lg"
                />
                <Compass x={centerX - 20} y={centerY - 20} width="40" height="40" color="white" />
                <text x={centerX} y={centerY + 60} textAnchor="middle" fill="#333" fontSize="16" fontWeight="bold">
                    Career Guidance
                </text>

                {/* Right node (student icon) */}
                <circle
                    cx={rightX}
                    cy={rightY}
                    r="35"
                    fill="#A5DEF1"
                    className="drop-shadow-lg"
                />
                <User x={rightX - 17.5} y={rightY - 17.5} width="35" height="35" color="white" />
                <text x={rightX} y={rightY + 55} textAnchor="middle" fill="#333" fontSize="16" fontWeight="bold">
                    Student
                </text>

                {/* Decorative elements */}
                <path d="M50,20 Q100,50 50,80 T50,140 T50,200" stroke="#FFD700" strokeWidth="2" fill="none" />
                <path d="M750,20 Q700,50 750,80 T750,140 T750,200" stroke="#FFD700" strokeWidth="2" fill="none" />
                <circle cx="50" cy="20" r="5" fill="#FFD700" />
                <circle cx="750" cy="20" r="5" fill="#FFD700" />
            </svg>
        </div>
    );
};

export default StudentCareerFlow;

