import React from 'react';
import { motion } from 'framer-motion';

const FloatingShapes = () => {
  const shapes = [
    { type: 'circle', size: 20, color: 'rgba(99, 102, 241, 0.2)', x: '10%', y: '20%' },
    { type: 'triangle', size: 30, color: 'rgba(167, 139, 250, 0.2)', x: '80%', y: '60%' },
    { type: 'square', size: 25, color: 'rgba(244, 114, 182, 0.2)', x: '30%', y: '70%' },
    { type: 'star', size: 15, color: 'rgba(251, 146, 60, 0.2)', x: '70%', y: '20%' },
    { type: 'circle', size: 35, color: 'rgba(52, 211, 153, 0.2)', x: '40%', y: '30%' },
    { type: 'triangle', size: 20, color: 'rgba(59, 130, 246, 0.2)', x: '60%', y: '80%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.type !== 'triangle' ? shape.color : 'transparent',
            clipPath: shape.type === 'triangle' 
              ? 'polygon(50% 0%, 0% 100%, 100% 100%)' 
              : shape.type === 'star'
              ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
              : undefined,
            borderRadius: shape.type === 'circle' ? '50%' : undefined,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 3 + index,
              ease: 'easeInOut',
            },
            rotate: {
              repeat: Infinity,
              duration: 20 + index * 2,
              ease: 'linear',
            },
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;
