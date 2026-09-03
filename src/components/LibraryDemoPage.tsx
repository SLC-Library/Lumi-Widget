import React from 'react';
import { 
  Search, 
  BookOpen, 
  FileText, 
  Database, 
  Calendar, 
  Clock, 
  Sparkles, 
  Code, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building,
  GraduationCap
} from 'lucide-react';
import { Language } from '../types';

interface LibraryDemoPageProps {
  language: Language;
  onOpenWidget: () => void;
  onOpenCodeModal: () => void;
  onToggleLanguage: () => void;
}

export const LibraryDemoPage: React.FC<LibraryDemoPageProps> = ({
  language,
  onOpenWidget,
  onOpenCodeModal,
  onToggleLanguage,
}) => {
  const isTh = language === 'th';

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col selection:bg-blue-900 selection:text-white font-['Sarabun',sans-serif]">
      {/* Top Banner for Code Exporter & Switchers */}
      <div className="bg-blue-900 border-b border-blue-800 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs shadow-sm z-30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-['Prompt',sans-serif] font-semibold text-white">
            {isTh ? 'ตัวอย่างการแสดงผลกล่องแชทห้องสมุดวิทยาลัย (Lumi AI Chat Widget)' : 'College Library AI Chatbot Widget (Lumi) Live Preview'}
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-blue-800 text-blue-100 text-[10px] border border-blue-700">
            Geometric Balance • 2 Languages (TH/EN)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <button
            id="demo-top-lang-btn"
            onClick={onToggleLanguage}
            className="px-2.5 py-1 rounded-lg bg-blue-800 hover:bg-blue-700 text-white border border-blue-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>🌐</span>
            <span>{isTh ? 'เปลี่ยนเป็น English (EN)' : 'Switch to ภาษาไทย (TH)'}</span>
          </button>

          {/* Copy Standalone JavaScript / DevTools Override Button */}
          <button
            id="demo-top-code-btn"
            onClick={onOpenCodeModal}
            className="px-3 py-1 rounded-lg bg-white hover:bg-slate-100 text-blue-900 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Code className="w-3.5 h-3.5" />
            <span>{isTh ? 'รับโค้ด JavaScript (สำหรับ DevTools Overrides & เว็บจริง)' : 'Get Standalone JavaScript Widget Code'}</span>
          </button>
        </div>
      </div>

      {/* College Library Header Navbar */}
      <header className="bg-white/95 backdrop-blur border-b border-slate-200 px-4 lg:px-8 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center text-white font-bold shadow-sm">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-['Prompt',sans-serif] font-bold text-sm sm:text-base text-slate-800 leading-tight">
              {isTh ? 'หอสมุดและศูนย์สารสนเทศวิทยาลัย' : 'College Academic Library & Resource Center'}
            </h1>
            <p className="text-[11px] text-slate-500 leading-tight">
              {isTh ? 'ระบบสืบค้นสารสนเทศและบริการดิจิทัล 24/7' : 'Digital Learning Commons & 24/7 Research Hub'}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs text-slate-600 font-medium">
          <a href="#opac" className="hover:text-blue-900 transition-colors">{isTh ? 'สืบค้นหนังสือ (OPAC)' : 'Web OPAC'}</a>
          <a href="#theses" className="hover:text-blue-900 transition-colors">{isTh ? 'คลังวิทยานิพนธ์' : 'e-Theses'}</a>
          <a href="#databases" className="hover:text-blue-900 transition-colors">{isTh ? 'ฐานข้อมูลออนไลน์' : 'Databases'}</a>
          <a href="#turnitin" className="hover:text-blue-900 transition-colors">{isTh ? 'บริการ Turnitin' : 'Turnitin'}</a>
          <a href="#hours" className="hover:text-blue-900 transition-colors">{isTh ? 'เวลาทำการ' : 'Hours'}</a>
        </nav>

        {/* Ask Lumi Trigger Button in Nav */}
        <button
          onClick={onOpenWidget}
          className="px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-900 text-blue-900 hover:text-white border border-blue-200 hover:border-blue-900 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-700" />
          <span>{isTh ? 'เปิดแชทน้องลูมิ' : 'Chat with Lumi'}</span>
        </button>
      </header>

      {/* Main Library Portal Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 sm:py-12 space-y-8">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-blue-900 text-white p-6 sm:p-10 shadow-xl border border-blue-800">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/80 border border-blue-700 text-blue-100 text-xs font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>{isTh ? '24/7 Co-Learning Space เปิดให้บริการทุกวัน' : '24/7 Co-Learning Space Open Daily'}</span>
            </div>

            <h2 className="font-['Prompt',sans-serif] font-extrabold text-2xl sm:text-4xl text-white leading-tight">
              {isTh ? 'ยินดีต้อนรับสู่หอสมุดดิจิทัลและศูนย์การเรียนรู้อัจฉริยะ' : 'Welcome to the Digital Library & Smart Learning Hub'}
            </h2>

            <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-light">
              {isTh 
                ? 'ค้นหาหนังสือกว่า 100,000 เล่ม ฐานข้อมูลสากล วิทยานิพนธ์ฉบับเต็ม และรับคำแนะนำการวิจัยผ่านน้องแกะขาว Lumi AI ตลอด 24 ชั่วโมง'
                : 'Explore over 100,000 print books, global databases, full-text theses, and get instant guidance with Lumi the White Sheep AI 24/7.'}
            </p>

            {/* Big Search Bar */}
            <div className="pt-2">
              <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1.5 shadow-lg focus-within:border-blue-900 transition-colors">
                <Search className="w-5 h-5 text-slate-400 ml-3" />
                <input 
                  type="text" 
                  placeholder={isTh ? 'ค้นหาชื่อหนังสือ, ผู้แต่ง, วิทยานิพนธ์, หัวเรื่อง, หรือ ISBN...' : 'Search books, authors, theses, topics, or ISBN...'}
                  className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onOpenWidget();
                  }}
                />
                <button 
                  onClick={onOpenWidget}
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>{isTh ? 'สืบค้น' : 'Search'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              titleTh: 'Web OPAC',
              titleEn: 'Web OPAC',
              subTh: 'สืบค้นรายการหนังสือและทรัพยากร',
              subEn: 'Book Catalog & Shelf Locations',
              icon: BookOpen,
              actionTh: 'สืบค้นหนังสือ',
              actionEn: 'Search Books'
            },
            {
              titleTh: 'Turnitin Service',
              titleEn: 'Turnitin Service',
              subTh: 'ตรวจความซ้ำซ้อนของงานวิจัย',
              subEn: 'Plagiarism & Originality Check',
              icon: ShieldCheck,
              actionTh: 'ขอเปิดบัญชี',
              actionEn: 'Request Account'
            },
            {
              titleTh: 'e-Theses DSpace',
              titleEn: 'e-Theses DSpace',
              subTh: 'คลังวิทยานิพนธ์ฉบับเต็ม PDF',
              subEn: 'Full-Text College Theses',
              icon: FileText,
              actionTh: 'ดาวน์โหลดงานวิจัย',
              actionEn: 'Download Theses'
            },
            {
              titleTh: 'Online Databases',
              titleEn: 'Online Databases',
              subTh: 'ScienceDirect, Scopus, IEEE',
              subEn: 'ScienceDirect, Scopus, IEEE',
              icon: Database,
              actionTh: 'เข้าสู่ฐานข้อมูล',
              actionEn: 'Access Databases'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={onOpenWidget}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 border border-blue-100 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-['Prompt',sans-serif] font-bold text-base text-slate-800 group-hover:text-blue-900">
                  {isTh ? item.titleTh : item.titleEn}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {isTh ? item.subTh : item.subEn}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-900 font-semibold group-hover:translate-x-0.5 transition-transform">
                <span>{isTh ? item.actionTh : item.actionEn}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Information Banner with Lumi introduction */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🐑</div>
            <div>
              <h4 className="font-['Prompt',sans-serif] font-bold text-base text-slate-800">
                {isTh ? 'มีคำถามเกี่ยวกับบริการห้องสมุด? ถามน้องลูมิ (Lumi) ได้ทันที' : 'Need help with library services? Ask Lumi anytime!'}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {isTh 
                  ? 'น้องลูมิตอบคำถามเรื่องการยืม-คืน การขอ Turnitin จองห้องติว และสืบค้นวิทยานิพนธ์ได้ตลอด 24 ชั่วโมง'
                  : 'Lumi provides instant assistance for book loans, Turnitin accounts, study rooms, and thesis research.'}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenWidget}
            className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            {isTh ? 'เปิดกล่องแชทน้องลูมิ' : 'Open Lumi Chat'}
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500">
        <p>© 2026 College Library & Learning Commons. Designed with Lumi AI Chatbot Widget (Geometric Balance Theme).</p>
      </footer>
    </div>
  );
};
