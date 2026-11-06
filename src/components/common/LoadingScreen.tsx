import React, { useEffect, useState } from 'react';

const MESSAGES = [
  'Preparing Punt AI workspace...',
  'Initialising membership environment...',
  'Loading Stripe integration preview...',
  'Preparing Discord community...',
  'Synchronising demonstration data...'
];

interface LoadingScreenProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, forceShow = false }) => {
  const [visible, setVisible] = useState(() => {
    if (forceShow) return true;
    return !sessionStorage.getItem('punt_ai_loaded_v1');
  });

  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(10);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (!visible) {
      if (onComplete) onComplete();
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 15;
      });
    }, 150);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 280);

    const timeout = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('punt_ai_loaded_v1', 'true');
        if (onComplete) onComplete();
      }, 350);
    }, 1300);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearTimeout(timeout);
    };
  }, [visible, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F5F6F2] transition-opacity duration-300 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-sm px-6 text-center">
        {/* Brand Wordmark */}
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#17392F] flex items-center justify-center text-white font-bold text-xl tracking-tight shadow-sm">
            P
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#17392F]">
            PUNT<span className="text-[#4B805D]">·AI</span>
          </span>
        </div>

        <p className="text-sm font-medium text-[#747E76] mb-8 tracking-wide">
          Membership infrastructure, simplified.
        </p>

        {/* Progress Line */}
        <div className="w-full bg-[#E0E9E0] h-1.5 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-[#285B49] rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Rotating Status Message */}
        <div className="h-6 flex items-center justify-center">
          <p className="text-xs text-[#202923] font-mono animate-pulse">
            {MESSAGES[messageIndex]}
          </p>
        </div>

        <div className="mt-2 text-[11px] text-[#A1B5A3] font-tabular">
          {progress}%
        </div>
      </div>
    </div>
  );
};

