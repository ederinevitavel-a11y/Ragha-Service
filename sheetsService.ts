
import React from 'react';
import { Zap } from 'lucide-react';

interface LogoProps {
  className?: string;
  testMode?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className, testMode = true }) => {
  // To revert to the original lightning bolt, set testMode to false
  if (!testMode) {
    return <Zap className={className} />;
  }

  return (
    <img 
      src="https://i.imgur.com/GRTjCVW.png" 
      alt="Ragha Service Logo" 
      className={className}
      referrerPolicy="no-referrer"
    />
  );
};

export default Logo;
