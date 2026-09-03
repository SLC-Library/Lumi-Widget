import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Globe, 
  MessageSquare, 
  HelpCircle, 
  Headphones, 
  BookOpen, 
  RotateCcw, 
  X, 
  Minus, 
  ChevronRight, 
  Search, 
  Check, 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  ExternalLink,
  Sparkles,
  Volume2,
  FileText,
  Calendar,
  Layers,
  Clock,
  Building,
  ArrowLeft,
  ShieldCheck,
  Users,
  Monitor,
  Coffee,
  AlertCircle
} from 'lucide-react';
import { LumiMascot } from './LumiMascot';
import { LumiAdminTab } from './LumiAdminTab';
import { FAQ_LIST, QUICK_PROMPTS, INITIAL_BOT_GREETING } from '../data/libraryKnowledge';
import { getStoredAdminData, saveStoredAdminData, resetStoredAdminData, getDynamicAutoResponse } from '../data/adminStore';
import { ChatMessage, Language, LibraryAdminData } from '../types';

interface LumiChatWidgetProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  isEmbedded?: boolean;
}

export const LumiChatWidget: React.FC<LumiChatWidgetProps> = ({
  language,
  onLanguageChange,
  isOpen,
  onClose,
  onMinimize,
  isEmbedded = false
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'faq' | 'resources' | 'librarian' | 'guide' | 'admin'>('chat');
  
  // Dynamic Admin Data (services, FAQs, hours, contact)
  const [adminData, setAdminData] = useState<LibraryAdminData>(getStoredAdminData);

  const handleUpdateAdminData = (newData: LibraryAdminData) => {
    setAdminData(newData);
    saveStoredAdminData(newData);
  };

  const handleResetAdminData = () => {
    const def = resetStoredAdminData();
    setAdminData(def);
  };
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = INITIAL_BOT_GREETING[language];

  // Auto scroll chat to bottom when messages update or when typing
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, activeTab]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      textTh: query,
      textEn: query,
      timestamp: new Date().toLocaleTimeString(language === 'th' ? 'th-TH' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);
    setActiveTab('chat');

    // Simulate smart AI typing response
    setTimeout(() => {
      const response = getDynamicAutoResponse(query, language, adminData);
      const botMsg: ChatMessage = {
        id: `lumi-${Date.now()}`,
        sender: 'lumi',
        textTh: response.textTh,
        textEn: response.textEn,
        timestamp: new Date().toLocaleTimeString(language === 'th' ? 'th-TH' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
        links: response.links
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleClearChat = () => {
    setMessages([]);
    setActiveTab('chat');
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id: string, isHelpful: boolean) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isHelpful } : m));
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*#`]/g, ''));
      utterance.lang = language === 'th' ? 'th-TH' : 'en-US';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Filter FAQs
  const filteredFaqs = adminData.faqs.filter(faq => {
    const q = faqSearchQuery.toLowerCase();
    const matchQuery = 
      faq.questionTh.toLowerCase().includes(q) ||
      faq.questionEn.toLowerCase().includes(q) ||
      faq.answerTh.toLowerCase().includes(q) ||
      faq.answerEn.toLowerCase().includes(q);
    
    if (selectedCategory === 'all') return matchQuery;
    return matchQuery && (faq.categoryTh === selectedCategory || faq.categoryEn === selectedCategory);
  });

  const categories = [
    { id: 'all', nameTh: 'ทั้งหมด', nameEn: 'All Topics' },
    { id: 'ทรัพยากร & การยืมคืน', nameTh: 'ทรัพยากร & ยืมคืน', nameEn: 'Resources & Loans' },
    { id: 'วิทยานิพนธ์ & วิจัย', nameTh: 'วิทยานิพนธ์ & วิจัย', nameEn: 'Theses & Research' },
    { id: 'วารสาร & ฐานข้อมูล', nameTh: 'วารสาร & ฐานข้อมูล', nameEn: 'Journals & DB' },
    { id: 'บริการ & สิ่งอำนวยความสะดวก', nameTh: 'บริการห้องสมุด', nameEn: 'Services' }
  ];

  if (!isOpen) return null;

  return (
    <div 
      id="lumi-chat-widget-container"
      className={`
        flex flex-row overflow-hidden bg-white text-slate-800 shadow-2xl border border-slate-200 ring-4 ring-blue-900/10
        rounded-3xl transition-all duration-300 font-['Sarabun',sans-serif]
        ${isEmbedded 
          ? 'w-full h-full max-h-[750px]' 
          : 'fixed z-50 bottom-4 right-4 sm:bottom-6 sm:right-6 w-[95vw] sm:w-[460px] md:w-[720px] lg:w-[840px] h-[85vh] max-h-[720px]'
        }
      `}
    >
      {/* 1. LEFT ICON SIDEBAR (Strip) */}
      <aside 
        id="lumi-icon-sidebar" 
        className="w-14 sm:w-16 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-4 justify-between select-none z-20 flex-shrink-0"
      >
        {/* Top: Lumi Logo / Avatar icon */}
        <div className="flex flex-col items-center gap-3.5">
          <button 
            id="sidebar-lumi-logo-btn"
            onClick={() => setActiveTab('chat')}
            title="Lumi - AI Library Assistant"
            className="p-1 rounded-xl bg-blue-900/80 border border-blue-700/60 hover:scale-105 transition-transform cursor-pointer shadow-sm"
          >
            <LumiMascot size={36} mood="happy" />
          </button>

          <div className="w-8 h-px bg-slate-800 my-0.5" />

          {/* Chat Tab Icon */}
          <button 
            id="sidebar-chat-btn"
            onClick={() => setActiveTab('chat')}
            title={language === 'th' ? 'กล่องแชท' : 'Chat'}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-blue-900 text-white shadow-lg ring-2 ring-blue-400/40' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          {/* FAQs Tab Icon */}
          <button
            id="sidebar-faq-btn"
            onClick={() => setActiveTab('faq')}
            title={language === 'th' ? 'คำถามที่พบบ่อย (FAQs)' : 'All FAQs'}
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              activeTab === 'faq'
                ? 'bg-blue-900 text-white shadow-lg ring-2 ring-blue-400/40' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse" />
          </button>

          {/* Library Web Resources / OPAC Search */}
          <button
            id="sidebar-resources-btn"
            onClick={() => setActiveTab('resources')}
            title={language === 'th' ? 'ทรัพยากรห้องสมุด & ฐานข้อมูล' : 'Library Resources & Databases'}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              activeTab === 'resources'
                ? 'bg-blue-900 text-white shadow-lg' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Globe className="w-5 h-5" />
          </button>

          {/* Contact Librarian / Human Help */}
          <button
            id="sidebar-librarian-btn"
            onClick={() => setActiveTab('librarian')}
            title={language === 'th' ? 'ติดต่อบรรณารักษ์ (Ask a Librarian)' : 'Ask a Librarian'}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              activeTab === 'librarian'
                ? 'bg-blue-900 text-white shadow-lg' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Headphones className="w-5 h-5" />
          </button>

          {/* Library Guide & Regulations */}
          <button
            id="sidebar-guide-btn"
            onClick={() => setActiveTab('guide')}
            title={language === 'th' ? 'ระเบียบและคู่มือการใช้งาน' : 'Library Guide & Policy'}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              activeTab === 'guide'
                ? 'bg-blue-900 text-white shadow-lg' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-5 h-5" />
          </button>

          {/* Admin Service Management Tab */}
          <button
            id="sidebar-admin-btn"
            onClick={() => setActiveTab('admin')}
            title={language === 'th' ? 'จัดการข้อมูลบริการ (Admin)' : 'Admin Service Portal'}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-blue-900 text-white shadow-lg ring-2 ring-blue-400/40' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Actions: Clear chat */}
        <div className="flex flex-col items-center gap-3">
          <button
            id="sidebar-clear-btn"
            onClick={handleClearChat}
            title={language === 'th' ? 'ล้างบทสนทนา' : 'Reset Conversation'}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT BODY */}
      <main className="flex-1 flex flex-col h-full bg-slate-50 relative min-w-0">
        {/* Top App Bar Header (Deep Blue header matching Geometric Balance design) */}
        <header 
          id="lumi-widget-header" 
          className="bg-blue-900 text-white p-4 sm:p-5 flex items-center justify-between flex-shrink-0 shadow-md"
        >
          {/* Left: Avatar + Title + Status */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative">
              <div className="w-11 h-11 bg-[#00529a] rounded-full flex items-center justify-center p-0.5 overflow-hidden shadow-sm">
                <LumiMascot size={36} mood="happy" />
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-blue-900"></div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-['Prompt',sans-serif] font-bold text-sm sm:text-base text-white tracking-tight truncate">
                  {language === 'th' ? 'Lumi (ลูมิ)' : 'Lumi Library AI'}
                </h3>
              </div>
              <p className="text-[10px] text-blue-200 uppercase tracking-widest font-semibold leading-tight mt-0.5">
                {language === 'th' ? 'ระบบผู้ช่วยห้องสมุดอัจฉริยะ' : 'Library Assistant • Central Portal'}
              </p>
            </div>
          </div>

          {/* Right Header Action Icons */}
          <div className="flex items-center gap-2">
            {/* Segmented EN/TH Language Switcher */}
            <div className="flex bg-blue-800/60 p-1 rounded-lg border border-blue-700/50">
              <button
                id="header-lang-en-btn"
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all ${
                  language === 'en'
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-blue-100 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                id="header-lang-th-btn"
                onClick={() => onLanguageChange('th')}
                className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all ${
                  language === 'th'
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-blue-100 hover:text-white'
                }`}
              >
                TH
              </button>
            </div>

            {/* Minimize */}
            {onMinimize && (
              <button
                id="header-minimize-btn"
                onClick={onMinimize}
                title={language === 'th' ? 'ย่อหน้าต่าง' : 'Minimize'}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-blue-200 hover:text-white hover:bg-blue-800 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
            )}

            {/* Close */}
            <button
              id="header-close-btn"
              onClick={onClose}
              title={language === 'th' ? 'ปิดกล่องแชท' : 'Close'}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-blue-200 hover:text-white hover:bg-blue-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Tab 1: CHAT VIEW */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col min-h-0 bg-slate-50">
            {/* Messages Scroll Area */}
            <div 
              id="lumi-chat-scroll-area"
              className="flex-1 overflow-y-auto p-4 sm:p-5"
            >
              <div className="max-w-2xl mx-auto w-full space-y-4">
                {/* HERO GREETING CONTAINER */}
                <div 
                  id="lumi-hero-welcome-card"
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs relative overflow-hidden"
                >
                  <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                    <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 p-1">
                      <LumiMascot size={44} mood="smart" />
                    </div>
                    <div>
                      <h2 className="font-['Prompt',sans-serif] font-bold text-sm sm:text-base text-slate-800 leading-snug">
                        {t.title}
                      </h2>
                      <p className="text-xs sm:text-[13px] text-slate-600 mt-0.5 leading-relaxed">
                        {t.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* QUICK ACCESS SECTION */}
                  <div className="mt-3.5">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[11px] font-bold text-blue-900 font-['Prompt',sans-serif] flex items-center gap-1.5 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-blue-700" />
                        {t.quickTitle}
                      </span>
                    </div>

                    {/* Symmetrical 2-Column Quick Action Chips Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                      {adminData.quickPrompts.map((prompt) => (
                        <button
                          key={prompt.id}
                          id={`quick-chip-${prompt.id}`}
                          onClick={() => handleSendMessage(language === 'th' ? prompt.actionQueryTh : prompt.actionQueryEn)}
                          className="w-full text-left p-3 rounded-xl bg-slate-50/80 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all group flex items-center justify-between shadow-2xs cursor-pointer"
                        >
                          <div className="flex items-center gap-2 min-w-0 pr-1">
                            <span className="text-xs sm:text-[13px] text-slate-700 font-medium group-hover:text-blue-900 truncate">
                              {language === 'th' ? prompt.textTh : prompt.textEn}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            {prompt.badgeTh && (
                              <span className="px-2 py-0.5 text-[9px] font-bold bg-blue-100 text-blue-900 border border-blue-200 rounded-full">
                                {language === 'th' ? prompt.badgeTh : prompt.badgeEn}
                              </span>
                            )}
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </button>
                      ))}

                      {/* View All FAQs Link as 6th Symmetrical Grid Item */}
                      <button
                        id="view-all-faqs-link-btn"
                        onClick={() => setActiveTab('faq')}
                        className="w-full text-left p-3 rounded-xl bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200 transition-all group flex items-center justify-between shadow-2xs cursor-pointer"
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-1">
                          <HelpCircle className="w-4 h-4 text-blue-900 flex-shrink-0" />
                          <span className="text-xs sm:text-[13px] text-blue-900 font-semibold truncate">
                            {t.viewAllFaqs}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-blue-900 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

              {/* Dynamic Chat Messages Stream */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 items-end ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {msg.sender === 'lumi' && (
                    <div className="w-7 h-7 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center mb-1">
                      <span className="text-[10px] font-bold text-blue-900">L</span>
                    </div>
                  )}

                  <div className={`max-w-[85%] sm:max-w-[78%] space-y-1.5`}>
                    {/* Message Bubble */}
                    <div
                      className={`p-3.5 shadow-sm text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-blue-900 text-white rounded-2xl rounded-br-none'
                          : 'bg-white text-slate-700 border border-slate-200 rounded-2xl rounded-bl-none'
                      }`}
                    >
                      <div className="whitespace-pre-line">
                        {language === 'th' ? msg.textTh : msg.textEn}
                      </div>

                      {/* Attached Links / Action buttons if available */}
                      {msg.links && msg.links.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-2">
                          {msg.links.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-blue-200 text-xs font-semibold text-blue-900 hover:bg-blue-50 transition-colors shadow-2xs"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-blue-700" />
                              <span>{language === 'th' ? link.titleTh : link.titleEn}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Metadata & Actions */}
                    <div className={`flex items-center gap-2 px-1 text-[11px] text-slate-400 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <span>{msg.timestamp}</span>
                      
                      {msg.sender === 'lumi' && (
                        <div className="flex items-center gap-1 ml-2">
                          <button
                            onClick={() => handleSpeak(language === 'th' ? msg.textTh : msg.textEn)}
                            title="Read aloud"
                            className="p-1 hover:text-blue-900 rounded"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleCopyText(language === 'th' ? msg.textTh : msg.textEn, msg.id)}
                            title="Copy message"
                            className="p-1 hover:text-blue-900 rounded"
                          >
                            {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => handleFeedback(msg.id, true)}
                            title="Helpful"
                            className={`p-1 rounded ${msg.isHelpful === true ? 'text-emerald-600' : 'hover:text-emerald-600'}`}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleFeedback(msg.id, false)}
                            title="Not helpful"
                            className={`p-1 rounded ${msg.isHelpful === false ? 'text-rose-600' : 'hover:text-rose-600'}`}
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-blue-900">L</span>
                  </div>
                  <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-2 text-xs text-slate-600 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-900 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-blue-900 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-blue-900 animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="ml-1 text-slate-500">
                      {language === 'th' ? 'น้องลูมิกำลังค้นหาข้อมูลห้องสมุด...' : 'Lumi is searching library database...'}
                    </span>
                  </div>
                </div>
              )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Bottom Message Input Bar */}
            <div 
              id="lumi-chat-input-bar"
              className="p-3 sm:p-4 bg-white border-t border-slate-100 flex flex-col gap-1.5 flex-shrink-0"
            >
              <div className="max-w-2xl mx-auto w-full">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2 bg-slate-100/90 rounded-2xl px-3.5 py-1.5 border border-slate-200 focus-within:border-blue-900 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-900/10 transition-all"
                >
                  <input
                    ref={inputRef}
                    id="lumi-main-text-input"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={t.inputPlaceholder}
                    className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 py-1.5 focus:outline-none"
                  />

                  {/* Send Button matching Geometric Balance design */}
                  <button
                    id="lumi-send-message-btn"
                    type="submit"
                    disabled={!inputValue.trim()}
                    title={language === 'th' ? 'ส่งข้อความ' : 'Send message'}
                    className={`p-2 rounded-xl transition-all flex items-center justify-center ${
                      inputValue.trim()
                        ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-xs cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-4 h-4 translate-x-0.5 -translate-y-0.5" />
                  </button>
                </form>
                <div className="text-center mt-1.5">
                  <span className="text-[9px] text-slate-400 font-medium">Lumi Library AI • งานวิทยบริการและวารสารวิชาการ วิทยาลัยเซนต์หลุยส์</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: FREQUENTLY ASKED QUESTIONS (FAQ) VIEW - Full Symmetrical Layout */}
        {activeTab === 'faq' && (
          <div id="lumi-faq-view" className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
            <div className="max-w-2xl mx-auto w-full space-y-4">
              {/* Header with Back to Chat */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h3 className="font-['Prompt',sans-serif] font-bold text-base sm:text-lg text-slate-800 flex items-center gap-2">
                    <span>{language === 'th' ? 'คำถามที่พบบ่อย (FAQs)' : 'Frequently Asked Questions'}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-medium">
                      {filteredFaqs.length} {language === 'th' ? 'คำถาม' : 'items'}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {language === 'th' ? 'คลิกเลือกคำถามเพื่อให้ระบบถามน้องลูมิในแชททันที' : 'Select any question to ask Lumi directly in chat'}
                  </p>
                </div>
                <button
                  id="faq-back-to-chat-btn"
                  onClick={() => setActiveTab('chat')}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{language === 'th' ? 'กลับไปที่แชท' : 'Back to Chat'}</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="faq-search-input"
                  type="text"
                  value={faqSearchQuery}
                  onChange={(e) => setFaqSearchQuery(e.target.value)}
                  placeholder={language === 'th' ? 'ค้นหาคำถาม เช่น ยืมหนังสือ, จองห้องประชุม, วิทยานิพนธ์, ฐานข้อมูล...' : 'Search questions or library services...'}
                  className="w-full pl-10 pr-4 py-2.5 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 shadow-2xs font-['Sarabun',sans-serif]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-blue-900 text-white font-semibold shadow-xs'
                        : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {language === 'th' ? cat.nameTh : cat.nameEn}
                  </button>
                ))}
              </div>

              {/* FAQ Items Cards */}
              <div className="space-y-2.5 pt-1">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md inline-block">
                        {language === 'th' ? faq.categoryTh : faq.categoryEn}
                      </span>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-blue-900 transition-colors leading-relaxed">
                        {language === 'th' ? faq.questionTh : faq.questionEn}
                      </h4>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('chat');
                        handleSendMessage(language === 'th' ? faq.questionTh : faq.questionEn);
                      }}
                      className="self-start sm:self-center px-3.5 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer flex-shrink-0"
                    >
                      <span>{language === 'th' ? 'ถามน้องลูมิ' : 'Ask Question'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
                    <HelpCircle className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-sm font-medium text-slate-600">
                      {language === 'th' ? 'ไม่พบคำถามที่ตรงกับการค้นหา' : 'No matching questions found'}
                    </p>
                    <p className="text-xs text-slate-400">
                      {language === 'th' ? 'คุณสามารถพิมพ์สอบถามน้องลูมิในกล่องแชทได้โดยตรงครับ' : 'You can type your question directly in the chat'}
                    </p>
                    <button
                      onClick={() => setActiveTab('chat')}
                      className="mt-2 px-4 py-2 bg-blue-900 text-white text-xs font-semibold rounded-xl hover:bg-blue-800 cursor-pointer"
                    >
                      {language === 'th' ? 'ไปที่กล่องแชท' : 'Go to Chat'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: LIBRARY RESOURCES VIEW */}
        {activeTab === 'resources' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
            <div className="max-w-2xl mx-auto w-full space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="font-['Prompt',sans-serif] font-bold text-base sm:text-lg text-slate-800">
                  {language === 'th' ? 'ทรัพยากรและบริการห้องสมุด' : 'Library Resources & Services'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {language === 'th' ? 'เข้าถึงแคตตาล็อกหนังสือ ฐานข้อมูล และบริการต่างๆ ของวิทยาลัยเซนต์หลุยส์' : 'Access book catalogs, research databases, and library services'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { titleTh: 'Web OPAC ระบบสืบค้นหนังสือ', titleEn: 'Web OPAC Book Search', descTh: 'สืบค้นหนังสือ สิ่งพิมพ์ และสื่อโสตฯ ในห้องสมุด', descEn: 'Search physical books, media, and printed collections', url: 'http://slclib.slc.ac.th/', icon: BookOpen },
                  { titleTh: 'SLC Digital Collection', titleEn: 'SLC Digital Collection', descTh: 'คลังสารสนเทศและวิทยานิพนธ์ดิจิทัลฉบับเต็ม', descEn: 'Institutional Repository and full-text theses', url: 'https://library.slc.ac.th/lib2025/nav3-1-1-d-collections.php', icon: FileText },
                  { titleTh: 'Citation Guide APA 7th', titleEn: 'Citation Guide APA 7th', descTh: 'คู่มือแนะนำการเขียนบรรณานุกรมฉบับสมบูรณ์', descEn: 'Comprehensive referencing guide', url: 'https://drive.google.com/file/d/1NL3hV9xEMXdVDP6elCORzsMWkVgvCvdp/view', icon: BookOpen },
                  { titleTh: 'เสนอซื้อทรัพยากรสารสนเทศ', titleEn: 'Resource Acquisition Form', descTh: 'แบบฟอร์มเสนอแนะหนังสือหรือสื่อเข้าห้องสมุด', descEn: 'Recommend new materials for acquisition', url: 'https://library.slc.ac.th/lib2025/nav2-6.php', icon: Sparkles },
                  { titleTh: 'ระบบจองห้องประชุม SLC Room Booking', titleEn: 'SLC Room Booking Portal', descTh: 'จองห้องประชุมและห้องศึกษาออนไลน์', descEn: 'Reserve meeting and group study rooms online', url: 'https://lib-akira.github.io/SLC-RoomBooking/', icon: Building },
                  { titleTh: 'ฐานข้อมูลออนไลน์ (Digital Resources)', titleEn: 'Digital Resources Portal', descTh: 'CINAHL, CU-eLibrary, IG Library', descEn: 'Access subscribed academic databases', url: 'https://library.slc.ac.th/lib2025/nav1-1-e-databases.php', icon: Globe }
                ].map((res, i) => (
                  <div 
                    key={i}
                    className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 rounded-xl bg-blue-50 text-blue-900 border border-blue-100">
                          <res.icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 font-['Prompt',sans-serif]">
                          {language === 'th' ? res.titleTh : res.titleEn}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {language === 'th' ? res.descTh : res.descEn}
                      </p>
                    </div>
                    <div className="mt-3.5 flex flex-col gap-1.5">
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>{language === 'th' ? 'เปิดเว็บไซต์โดยตรง' : 'Open Link'}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-blue-700" />
                      </a>
                      <button
                        onClick={() => handleSendMessage(language === 'th' ? `สอบถามเกี่ยวกับ ${res.titleTh}` : `Information about ${res.titleEn}`)}
                        className="w-full py-1.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 text-[11px] font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>{language === 'th' ? 'ถามน้องลูมิเกี่ยวกับบริการนี้' : 'Ask Lumi'}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: ASK A LIBRARIAN VIEW */}
        {activeTab === 'librarian' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
            <div className="max-w-2xl mx-auto w-full space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="font-['Prompt',sans-serif] font-bold text-base sm:text-lg text-slate-800">
                  {language === 'th' ? 'ติดต่อบรรณารักษ์' : 'Ask a Librarian'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {language === 'th' ? 'ช่องทางติดต่อเจ้าหน้าที่งานวิทยบริการโดยตรง' : 'Direct contact channels for library staff'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-900 border border-blue-100">
                    <Headphones className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 font-['Prompt',sans-serif]">
                      {language === 'th' ? 'งานวิทยบริการและวารสารวิชาการ วิทยาลัยเซนต์หลุยส์' : 'Library, Saint Louis College'}
                    </h4>
                    <p className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {language === 'th' ? 'พร้อมให้บริการและตอบข้อซักถาม' : 'Staff available to assist you'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
                  <a href={`mailto:${adminData.contacts.email}`} className="p-3.5 bg-slate-50/80 hover:bg-blue-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors block">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">{language === 'th' ? 'อีเมล' : 'Email'}</span>
                    <span className="text-blue-900 font-bold text-xs sm:text-sm">{adminData.contacts.email}</span>
                  </a>
                  <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">{language === 'th' ? 'เบอร์โทรศัพท์' : 'Phone'}</span>
                    <span className="text-blue-900 font-bold text-xs sm:text-sm">{adminData.contacts.phone}</span>
                  </div>
                  <a href={adminData.contacts.facebookUrl} target="_blank" rel="noreferrer" className="p-3.5 bg-slate-50/80 hover:bg-blue-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors block">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Facebook Page</span>
                    <span className="text-blue-900 font-bold text-xs sm:text-sm">{adminData.contacts.facebookName}</span>
                  </a>
                  <a href={adminData.contacts.lineUrl} target="_blank" rel="noreferrer" className="p-3.5 bg-slate-50/80 hover:bg-blue-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors block">
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">LINE OpenChat</span>
                    <span className="text-blue-900 font-bold text-xs sm:text-sm">{language === 'th' ? adminData.contacts.lineNameTh : adminData.contacts.lineNameEn}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: LIBRARY GUIDE & POLICIES */}
        {activeTab === 'guide' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
            <div className="max-w-2xl mx-auto w-full space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="font-['Prompt',sans-serif] font-bold text-base sm:text-lg text-slate-800">
                  {language === 'th' ? 'ระเบียบและเวลาทำการของห้องสมุด' : 'Library Regulations & Operating Hours'}
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-[13px]">
                <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
                  <h4 className="font-bold text-slate-800 font-['Prompt',sans-serif] flex items-center gap-2 mb-2 text-sm">
                    <Clock className="w-4 h-4 text-blue-900" />
                    {language === 'th' ? 'เวลาทำการ (Operating Hours)' : 'Hours of Operation'}
                  </h4>
                  <ul className="space-y-1.5 text-slate-600 leading-relaxed">
                    <li>• <strong>{language === 'th' ? 'ห้องสมุดกลาง Saint Louis (ฝั่งโรงพยาบาล):' : 'Central Library (Hospital Side):'}</strong> {language === 'th' ? adminData.hours.centralTh : adminData.hours.centralEn}</li>
                    <li>• <strong>{language === 'th' ? 'ห้องสมุดสาขา Saint Benedict (ฝั่งอาคารเรียน):' : 'Saint Benedict Branch (Academic Side):'}</strong> {language === 'th' ? adminData.hours.branchTh : adminData.hours.branchEn}</li>
                    <li className="text-slate-500 text-[11px] pt-1">• {language === 'th' ? `* ${adminData.hours.noteTh}` : `* ${adminData.hours.noteEn}`}</li>
                  </ul>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
                  <h4 className="font-bold text-slate-800 font-['Prompt',sans-serif] flex items-center gap-2 mb-2 text-sm">
                    <BookOpen className="w-4 h-4 text-blue-900" />
                    {language === 'th' ? 'สิทธิ์และระยะเวลายืมหนังสือ (Loan Policy)' : 'Borrowing Entitlement'}
                  </h4>
                  <ul className="space-y-1.5 text-slate-600 leading-relaxed">
                    <li>• <strong>{language === 'th' ? 'นักศึกษา ป.ตรี, บุคลากร, หลักสูตรระยะสั้น:' : 'Undergraduate, Staff:'}</strong> {language === 'th' ? adminData.policies.undergradTh : adminData.policies.undergradEn}</li>
                    <li>• <strong>{language === 'th' ? 'นักศึกษา ป.โท:' : 'Graduate Students:'}</strong> {language === 'th' ? adminData.policies.gradTh : adminData.policies.gradEn}</li>
                    <li>• <strong>{language === 'th' ? 'คณาจารย์:' : 'Faculty Members:'}</strong> {language === 'th' ? adminData.policies.facultyTh : adminData.policies.facultyEn}</li>
                    <li className="text-rose-600 text-[11px] pt-1">• {language === 'th' ? `* ${adminData.policies.fineTh}` : `* ${adminData.policies.fineEn}`}</li>
                  </ul>
                </div>

                {/* Additional Dynamic Policy Cards */}
                {adminData.customPolicies && adminData.customPolicies.map((card) => (
                  <div key={card.id} className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="font-bold text-slate-800 font-['Prompt',sans-serif] flex items-center gap-2 text-sm">
                        {card.icon === 'users' ? (
                          <Users className="w-4 h-4 text-blue-900" />
                        ) : card.icon === 'monitor' ? (
                          <Monitor className="w-4 h-4 text-blue-900" />
                        ) : card.icon === 'coffee' ? (
                          <Coffee className="w-4 h-4 text-blue-900" />
                        ) : card.icon === 'alert' ? (
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                        ) : card.icon === 'shield' ? (
                          <ShieldCheck className="w-4 h-4 text-blue-900" />
                        ) : card.icon === 'book' ? (
                          <BookOpen className="w-4 h-4 text-blue-900" />
                        ) : card.icon === 'clock' ? (
                          <Clock className="w-4 h-4 text-blue-900" />
                        ) : (
                          <FileText className="w-4 h-4 text-blue-900" />
                        )}
                        <span>{language === 'th' ? card.titleTh : card.titleEn || card.titleTh}</span>
                      </h4>
                      {(card.categoryTh || card.categoryEn) && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-900 border border-blue-100 rounded-md">
                          {language === 'th' ? card.categoryTh : card.categoryEn || card.categoryTh}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-1.5 text-slate-600 leading-relaxed text-xs sm:text-[13px]">
                      {(language === 'th' ? card.itemsTh : (card.itemsEn && card.itemsEn.length > 0 ? card.itemsEn : card.itemsTh)).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-blue-900 font-bold select-none">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: ADMIN SERVICE MANAGEMENT */}
        {activeTab === 'admin' && (
          <LumiAdminTab
            language={language}
            adminData={adminData}
            onUpdateAdminData={handleUpdateAdminData}
            onResetAdminData={handleResetAdminData}
            onCloseAdmin={() => setActiveTab('chat')}
          />
        )}
      </main>
    </div>
  );
};
