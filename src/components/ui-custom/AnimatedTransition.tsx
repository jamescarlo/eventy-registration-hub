
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  className?: string;
  type?: 'fade' | 'slide-up' | 'scale' | 'blur' | 'rotate';
  duration?: 'fast' | 'normal' | 'slow';
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  className,
  type = 'fade',
  duration = 'normal',
}) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('enter');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('exit');
    }
  }, [location, displayLocation]);

  // Animation type classes
  const animationClasses = {
    fade: {
      enter: 'animate-fade-in',
      exit: 'animate-fade-out',
    },
    'slide-up': {
      enter: 'animate-slide-up',
      exit: 'animate-fade-out',
    },
    scale: {
      enter: 'animate-scale-in',
      exit: 'animate-fade-out',
    },
    blur: {
      enter: 'animate-blur-in',
      exit: 'animate-fade-out',
    },
    rotate: {
      enter: 'animate-rotate-in',
      exit: 'animate-fade-out',
    },
  };

  // Duration modifier classes
  const durationClasses = {
    fast: '[animation-duration:200ms]',
    normal: '[animation-duration:400ms]',
    slow: '[animation-duration:600ms]',
  };

  const handleAnimationEnd = () => {
    if (transitionStage === 'exit') {
      setTransitionStage('enter');
      setDisplayLocation(location);
    }
  };

  return (
    <div
      className={cn(
        'min-h-screen w-full',
        animationClasses[type][transitionStage],
        durationClasses[duration],
        className
      )}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
