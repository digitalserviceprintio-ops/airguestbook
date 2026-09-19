import React from 'react';
import { ShieldCheck, Wifi, HelpCircle } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenQRISProtocol?: () => void;
  onOpenOperatorHelp?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenQRISProtocol,
  onOpenOperatorHelp
}) => {
  return (
    <footer className="w-full bg-white border-t border-gray-200/80 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          
          {/* Brand Tagline */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 tracking-tight">AirGuest</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-600 font-normal">
              Modern Touchless Concierge &amp; Guest Experience
            </span>
          </div>

          {/* Quick Informational Links */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
            <button 
              onClick={onOpenPrivacy}
              className="hover:text-amber-600 transition-colors"
            >
              Privasi
            </button>
            <span className="text-gray-300">•</span>
            <button 
              onClick={onOpenQRISProtocol}
              className="hover:text-amber-600 transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Protokol QRIS
            </button>
            <span className="text-gray-300">•</span>
            <button 
              onClick={onOpenOperatorHelp}
              className="hover:text-amber-600 transition-colors flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
              Bantuan Operator
            </button>
            <span className="text-gray-300">•</span>
            <span className="text-gray-400">© 2025 AirGuest Inc.</span>
          </div>

        </div>
      </div>
    </footer>
  );
};
