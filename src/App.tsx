import React, { useState } from 'react';
import { LumiMascot } from './components/LumiMascot';
import { LumiChatWidget } from './components/LumiChatWidget';
import { StandaloneCodeExporter } from './components/StandaloneCodeExporter';
import { LibraryDemoPage } from './components/LibraryDemoPage';
import { Language } from './types';
import { MessageSquare, Sparkles, Code } from 'lucide-react';

export default function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [language, setLanguage] = useState<Language>('th');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'th' ? 'en' : 'th');
  };

  return (
    <div className="relative min-h-screen bg-slate-100 text-slate-800 font-['Sarabun',sans-serif]">
      {/* 1. College Library Portal Demo Background */}
      <LibraryDemoPage
        language={language}
        onOpenWidget={() => setIsOpen(true)}
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
        onToggleLanguage={toggleLanguage}
      />

      {/* 2. Floating Launcher Bubble Button (Shown when widget is closed/minimized) */}
      {!isOpen && (
        <button
          id="lumi-floating-trigger-btn"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-blue-900 hover:bg-blue-800 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 ring-4 ring-blue-900/20 border-2 border-white flex items-center gap-3 cursor-pointer group animate-in fade-in zoom-in-90 duration-200"
          aria-label="Open Lumi Library AI Assistant"
        >
          <div className="relative">
            <LumiMascot size={44} mood="happy" withBadge={true} />
          </div>
          <div className="hidden sm:flex flex-col text-left pr-2">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold font-['Prompt',sans-serif] leading-tight text-white group-hover:text-blue-100">
                {language === 'th' ? 'ถามน้องลูมิ (Lumi AI)' : 'Ask Lumi AI'}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            </div>
            <span className="text-[11px] text-blue-200 font-medium">
              {language === 'th' ? 'ห้องสมุดวิทยาลัย • 24/7' : 'College Library • 24/7'}
            </span>
          </div>
        </button>
      )}

      {/* 3. The Main Interactive Lumi Chat Widget */}
      {isOpen && (
        <LumiChatWidget
          language={language}
          onLanguageChange={setLanguage}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onMinimize={() => setIsOpen(false)}
        />
      )}

      {/* 4. Standalone HTML + Tailwind CSS Ready-to-use Code Exporter Modal */}
      <StandaloneCodeExporter
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </div>
  );
}
