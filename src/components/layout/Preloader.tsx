import React, { useRef } from 'react';
import gsap from 'gsap';
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Unmount or hide is handled by parent, but we signal completion here
          onComplete();
        }
      });

      // 1. Counter Animation
      const counterObj = { value: 0 };

      tl.to(counterObj, {
        value: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(counterObj.value).toString();
          }
        }
      })

        // 2. Progress Bar
        .to(progressRef.current, {
          scaleX: 1,
          duration: 2.5,
          ease: "power2.inOut"
        }, 0)

        // 3. Exit Sequence - Curtain Effect
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power3.inOut",
          delay: 0.2
        });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-9999 bg-black text-white flex flex-col justify-between p-6 md:p-12 cursor-wait">
      {/* Header */}
      <div className="flex justify-between items-start w-full mix-blend-difference">
        <div className="text-xs font-mono uppercase tracking-widest opacity-70">
          Loading Resources
        </div>
        <div className="text-xs font-mono uppercase tracking-widest opacity-70">
          SUIZE ©2024
        </div>
      </div>

      {/* Center/Main Content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-6">
        <div className="w-full h-0.5 bg-white/20 overflow-hidden mb-4">
          <div ref={progressRef} className="w-full h-full bg-white origin-left scale-x-0" />
        </div>
      </div>

      {/* Footer / Counter */}
      <div className="flex justify-between items-end w-full">
        <div className="text-[15vw] leading-[0.8] font-black tracking-tighter tabular-nums">
          <span ref={counterRef}>0</span>
        </div>
        <div className="mb-4 text-xs font-mono uppercase tracking-widest animate-pulse text-swiss-red">
          System Check
        </div>
      </div>
    </div>
  );
};

export default Preloader;