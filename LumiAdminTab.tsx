import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  Save,
  Check,
  AlertCircle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Clock,
  Phone,
  BookOpen,
  X,
  Search,
  Eye,
  EyeOff,
  LogOut,
  ExternalLink,
  Users,
  Monitor,
  Coffee,
  FileText,
  Building,
  Globe,
  Database
} from 'lucide-react';
import {
  LibraryAdminData,
  QuickPrompt,
  FAQItem,
  Language,
  LibraryContactInfo,
  LibraryHoursInfo,
  LibraryPolicyInfo,
  CustomPolicyCard,
  LibraryResourceItem
} from '../types';
import { validateAdminPassword } from '../data/adminStore';

interface LumiAdminTabProps {
  language: Language;
  adminData: LibraryAdminData;
  onUpdateAdminData: (newData: LibraryAdminData) => void;
  onResetAdminData: () => void;
  onCloseAdmin?: () => void;
}

export const LumiAdminTab: React.FC<LumiAdminTabProps> = ({
  language,
  adminData,
  onUpdateAdminData,
  onResetAdminData,
  onCloseAdmin
}) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('lumi_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Sub-tabs in Admin
  const [subTab, setSubTab] = useState<'prompts' | 'faqs' | 'hours' | 'contact' | 'resources'>('prompts');

  // Success toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quick Prompt Form Modal
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<QuickPrompt | null>(null);
  const [promptForm, setPromptForm] = useState<Partial<QuickPrompt>>({
    textTh: '',
    textEn: '',
    actionQueryTh: '',
    actionQueryEn: '',
    badgeTh: '',
    badgeEn: ''
  });

  // FAQ Form Modal
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [faqForm, setFaqForm] = useState<Partial<FAQItem>>({
    categoryTh: 'บริการ & สิ่งอำนวยความสะดวก',
    categoryEn: 'Services',
    questionTh: '',
    questionEn: '',
    answerTh: '',
    answerEn: '',
    tags: []
  });
  const [faqTagsInput, setFaqTagsInput] = useState('');

  // Hours & Policy Form State
  const [hoursForm, setHoursForm] = useState<LibraryHoursInfo>({ ...adminData.hours });
  const [policyForm, setPolicyForm] = useState<LibraryPolicyInfo>({ ...adminData.policies });

  // Custom Policy Card CRUD State
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [editingPolicyCard, setEditingPolicyCard] = useState<CustomPolicyCard | null>(null);
  const [policyCardForm, setPolicyCardForm] = useState<{
    titleTh: string;
    titleEn: string;
    categoryTh: string;
    categoryEn: string;
    icon: 'book' | 'shield' | 'users' | 'alert' | 'coffee' | 'monitor' | 'clock' | 'file-text';
    itemsThText: string;
    itemsEnText: string;
  }>({
    titleTh: '',
    titleEn: '',
    categoryTh: 'ระเบียบทั่วไป',
    categoryEn: 'General Regulation',
    icon: 'file-text',
    itemsThText: '',
    itemsEnText: ''
  });

  const renderPolicyCardIcon = (icon?: string) => {
    switch (icon) {
      case 'users':
        return <Users className="w-4 h-4 text-blue-900" />;
      case 'monitor':
        return <Monitor className="w-4 h-4 text-blue-900" />;
      case 'coffee':
        return <Coffee className="w-4 h-4 text-blue-900" />;
      case 'alert':
        return <AlertCircle className="w-4 h-4 text-amber-600" />;
      case 'shield':
        return <ShieldCheck className="w-4 h-4 text-blue-900" />;
      case 'clock':
        return <Clock className="w-4 h-4 text-blue-900" />;
      case 'book':
        return <BookOpen className="w-4 h-4 text-blue-900" />;
      default:
        return <FileText className="w-4 h-4 text-blue-900" />;
    }
  };

  // Library Resources CRUD State
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<LibraryResourceItem | null>(null);
  const [resourceSearchQuery, setResourceSearchQuery] = useState('');
  const [resourceForm, setResourceForm] = useState<{
    titleTh: string;
    titleEn: string;
    descTh: string;
    descEn: string;
    url: string;
    icon: 'book' | 'file-text' | 'sparkles' | 'building' | 'globe' | 'database' | 'search' | 'external-link';
    categoryTh: string;
    categoryEn: string;
  }>({
    titleTh: '',
    titleEn: '',
    descTh: '',
    descEn: '',
    url: '',
    icon: 'book',
    categoryTh: 'ระบบสืบค้น',
    categoryEn: 'Search Catalog'
  });

  const renderResourceIcon = (icon?: string) => {
    switch (icon) {
      case 'file-text':
        return <FileText className="w-4 h-4 text-blue-900" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4 text-blue-900" />;
      case 'building':
        return <Building className="w-4 h-4 text-blue-900" />;
      case 'globe':
        return <Globe className="w-4 h-4 text-blue-900" />;
      case 'database':
        return <Database className="w-4 h-4 text-blue-900" />;
      case 'search':
        return <Search className="w-4 h-4 text-blue-900" />;
      case 'external-link':
        return <ExternalLink className="w-4 h-4 text-blue-900" />;
      case 'book':
      default:
        return <BookOpen className="w-4 h-4 text-blue-900" />;
    }
  };

  // Contact Form State
  const [contactForm, setContactForm] = useState<LibraryContactInfo>({ ...adminData.contacts });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAdminPassword(passwordInput)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('lumi_admin_auth', 'true');
      setAuthError('');
      setPasswordInput('');
      showToast(language === 'th' ? 'เข้าสู่ระบบผู้ดูแลระบบสำเร็จ' : 'Admin Login Successful');
    } else {
      setAuthError(
        language === 'th'
          ? 'รหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง'
          : 'Incorrect password. Please verify and try again.'
      );
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('lumi_admin_auth');
    setPasswordInput('');
    setAuthError('');
  };

  // --- QUICK PROMPT CRUD ---
  const handleOpenAddPrompt = () => {
    setEditingPrompt(null);
    setPromptForm({
      textTh: '',
      textEn: '',
      actionQueryTh: '',
      actionQueryEn: '',
      badgeTh: 'ใหม่',
      badgeEn: 'New'
    });
    setIsPromptModalOpen(true);
  };

  const handleOpenEditPrompt = (item: QuickPrompt) => {
    setEditingPrompt(item);
    setPromptForm({ ...item });
    setIsPromptModalOpen(true);
  };

  const handleSavePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptForm.textTh?.trim() || !promptForm.actionQueryTh?.trim()) {
      alert(language === 'th' ? 'กรุณากรอกชื่อบริการและคำถาม' : 'Please fill in required fields');
      return;
    }

    let updatedPrompts: QuickPrompt[];
    if (editingPrompt) {
      updatedPrompts = adminData.quickPrompts.map(p =>
        p.id === editingPrompt.id
          ? {
              ...p,
              textTh: promptForm.textTh || p.textTh,
              textEn: promptForm.textEn || promptForm.textTh || p.textEn,
              actionQueryTh: promptForm.actionQueryTh || p.actionQueryTh,
              actionQueryEn: promptForm.actionQueryEn || promptForm.actionQueryTh || p.actionQueryEn,
              badgeTh: promptForm.badgeTh,
              badgeEn: promptForm.badgeEn
            }
          : p
      );
    } else {
      const newPrompt: QuickPrompt = {
        id: `quick-${Date.now()}`,
        textTh: promptForm.textTh || '',
        textEn: promptForm.textEn || promptForm.textTh || '',
        actionQueryTh: promptForm.actionQueryTh || promptForm.textTh || '',
        actionQueryEn: promptForm.actionQueryEn || promptForm.textEn || promptForm.textTh || '',
        badgeTh: promptForm.badgeTh,
        badgeEn: promptForm.badgeEn
      };
      updatedPrompts = [...adminData.quickPrompts, newPrompt];
    }

    onUpdateAdminData({ ...adminData, quickPrompts: updatedPrompts });
    setIsPromptModalOpen(false);
    showToast(language === 'th' ? 'บันทึกบริการเรียบร้อยแล้ว' : 'Service saved successfully');
  };

  const handleDeletePrompt = (id: string) => {
    if (window.confirm(language === 'th' ? 'คุณต้องการลบบริการนี้ใช่หรือไม่?' : 'Delete this service?')) {
      const updated = adminData.quickPrompts.filter(p => p.id !== id);
      onUpdateAdminData({ ...adminData, quickPrompts: updated });
      showToast(language === 'th' ? 'ลบบริการเรียบร้อยแล้ว' : 'Service deleted');
    }
  };

  // --- FAQ CRUD ---
  const handleOpenAddFaq = () => {
    setEditingFaq(null);
    setFaqForm({
      categoryTh: 'บริการทั่วไป',
      categoryEn: 'General Services',
      questionTh: '',
      questionEn: '',
      answerTh: '',
      answerEn: '',
      tags: []
    });
    setFaqTagsInput('');
    setIsFaqModalOpen(true);
  };

  const handleOpenEditFaq = (item: FAQItem) => {
    setEditingFaq(item);
    setFaqForm({ ...item });
    setFaqTagsInput((item.tags || []).join(', '));
    setIsFaqModalOpen(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.questionTh?.trim() || !faqForm.answerTh?.trim()) {
      alert(language === 'th' ? 'กรุณากรอกคำถามและคำตอบ' : 'Please fill in required question and answer');
      return;
    }

    const tags = faqTagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    let updatedFaqs: FAQItem[];
    if (editingFaq) {
      updatedFaqs = adminData.faqs.map(f =>
        f.id === editingFaq.id
          ? {
              ...f,
              categoryTh: faqForm.categoryTh || f.categoryTh,
              categoryEn: faqForm.categoryEn || f.categoryEn,
              questionTh: faqForm.questionTh || f.questionTh,
              questionEn: faqForm.questionEn || faqForm.questionTh || f.questionEn,
              answerTh: faqForm.answerTh || f.answerTh,
              answerEn: faqForm.answerEn || faqForm.answerTh || f.answerEn,
              tags
            }
          : f
      );
    } else {
      const newFaq: FAQItem = {
        id: `faq-${Date.now()}`,
        categoryTh: faqForm.categoryTh || 'บริการทั่วไป',
        categoryEn: faqForm.categoryEn || 'General Services',
        questionTh: faqForm.questionTh || '',
        questionEn: faqForm.questionEn || faqForm.questionTh || '',
        answerTh: faqForm.answerTh || '',
        answerEn: faqForm.answerEn || faqForm.answerTh || '',
        tags
      };
      updatedFaqs = [newFaq, ...adminData.faqs];
    }

    onUpdateAdminData({ ...adminData, faqs: updatedFaqs });
    setIsFaqModalOpen(false);
    showToast(language === 'th' ? 'บันทึกคำถาม FAQ เรียบร้อยแล้ว' : 'FAQ saved successfully');
  };

  const handleDeleteFaq = (id: string) => {
    if (window.confirm(language === 'th' ? 'ต้องการลบคำถาม FAQ นี้ใช่หรือไม่?' : 'Delete this FAQ item?')) {
      const updated = adminData.faqs.filter(f => f.id !== id);
      onUpdateAdminData({ ...adminData, faqs: updated });
      showToast(language === 'th' ? 'ลบ FAQ เรียบร้อยแล้ว' : 'FAQ deleted');
    }
  };

  // --- SAVE HOURS & POLICIES ---
  const handleSaveHoursAndPolicies = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAdminData({
      ...adminData,
      hours: hoursForm,
      policies: policyForm
    });
    showToast(language === 'th' ? 'บันทึกเวลาทำการและระเบียบแล้ว' : 'Hours and policies saved');
  };

  // --- CUSTOM REGULATION CARDS CRUD ---
  const handleOpenAddPolicyCard = () => {
    setEditingPolicyCard(null);
    setPolicyCardForm({
      titleTh: '',
      titleEn: '',
      categoryTh: 'ระเบียบทั่วไป',
      categoryEn: 'General Regulation',
      icon: 'file-text',
      itemsThText: '',
      itemsEnText: ''
    });
    setIsPolicyModalOpen(true);
  };

  const handleOpenEditPolicyCard = (card: CustomPolicyCard) => {
    setEditingPolicyCard(card);
    setPolicyCardForm({
      titleTh: card.titleTh || '',
      titleEn: card.titleEn || '',
      categoryTh: card.categoryTh || 'ระเบียบทั่วไป',
      categoryEn: card.categoryEn || 'General Regulation',
      icon: card.icon || 'file-text',
      itemsThText: (card.itemsTh || []).join('\n'),
      itemsEnText: (card.itemsEn || []).join('\n')
    });
    setIsPolicyModalOpen(true);
  };

  const handleSavePolicyCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!policyCardForm.titleTh.trim()) {
      alert(language === 'th' ? 'กรุณากรอกชื่อระเบียบ' : 'Please enter regulation title');
      return;
    }

    const itemsTh = policyCardForm.itemsThText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const itemsEn = policyCardForm.itemsEnText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    if (itemsTh.length === 0) {
      alert(language === 'th' ? 'กรุณากรอกข้อปฏิบัติอย่างน้อย 1 ข้อ' : 'Please enter at least one guideline');
      return;
    }

    const currentList = adminData.customPolicies || [];
    let updatedList: CustomPolicyCard[];

    if (editingPolicyCard) {
      updatedList = currentList.map(c =>
        c.id === editingPolicyCard.id
          ? {
              ...c,
              titleTh: policyCardForm.titleTh.trim(),
              titleEn: policyCardForm.titleEn.trim() || policyCardForm.titleTh.trim(),
              categoryTh: policyCardForm.categoryTh.trim(),
              categoryEn: policyCardForm.categoryEn.trim(),
              icon: policyCardForm.icon,
              itemsTh,
              itemsEn: itemsEn.length > 0 ? itemsEn : itemsTh
            }
          : c
      );
    } else {
      const newCard: CustomPolicyCard = {
        id: `policy-${Date.now()}`,
        titleTh: policyCardForm.titleTh.trim(),
        titleEn: policyCardForm.titleEn.trim() || policyCardForm.titleTh.trim(),
        categoryTh: policyCardForm.categoryTh.trim(),
        categoryEn: policyCardForm.categoryEn.trim(),
        icon: policyCardForm.icon,
        itemsTh,
        itemsEn: itemsEn.length > 0 ? itemsEn : itemsTh
      };
      updatedList = [...currentList, newCard];
    }

    onUpdateAdminData({ ...adminData, customPolicies: updatedList });
    setIsPolicyModalOpen(false);
    showToast(language === 'th' ? 'บันทึกการ์ดระเบียบเรียบร้อยแล้ว' : 'Regulation card saved');
  };

  const handleDeletePolicyCard = (id: string) => {
    if (window.confirm(language === 'th' ? 'คุณต้องการลบการ์ดระเบียบนี้ใช่หรือไม่?' : 'Delete this regulation card?')) {
      const updatedList = (adminData.customPolicies || []).filter(c => c.id !== id);
      onUpdateAdminData({ ...adminData, customPolicies: updatedList });
      showToast(language === 'th' ? 'ลบการ์ดระเบียบเรียบร้อยแล้ว' : 'Regulation card deleted');
    }
  };

  // --- LIBRARY RESOURCES CRUD ---
  const handleOpenAddResource = () => {
    setEditingResource(null);
    setResourceForm({
      titleTh: '',
      titleEn: '',
      descTh: '',
      descEn: '',
      url: 'https://',
      icon: 'book',
      categoryTh: 'ระบบสืบค้น',
      categoryEn: 'Search Catalog'
    });
    setIsResourceModalOpen(true);
  };

  const handleOpenEditResource = (res: LibraryResourceItem) => {
    setEditingResource(res);
    setResourceForm({
      titleTh: res.titleTh || '',
      titleEn: res.titleEn || '',
      descTh: res.descTh || '',
      descEn: res.descEn || '',
      url: res.url || '',
      icon: res.icon || 'book',
      categoryTh: res.categoryTh || 'ระบบสืบค้น',
      categoryEn: res.categoryEn || 'Search Catalog'
    });
    setIsResourceModalOpen(true);
  };

  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceForm.titleTh.trim()) {
      alert(language === 'th' ? 'กรุณากรอกชื่อทรัพยากร' : 'Please enter resource title');
      return;
    }
    if (!resourceForm.url.trim()) {
      alert(language === 'th' ? 'กรุณาระบุ URL ลิงก์' : 'Please enter resource URL');
      return;
    }

    const currentList = adminData.resources || [];
    let updatedList: LibraryResourceItem[];

    if (editingResource) {
      updatedList = currentList.map(r =>
        r.id === editingResource.id
          ? {
              ...r,
              titleTh: resourceForm.titleTh.trim(),
              titleEn: resourceForm.titleEn.trim() || resourceForm.titleTh.trim(),
              descTh: resourceForm.descTh.trim(),
              descEn: resourceForm.descEn.trim() || resourceForm.descTh.trim(),
              url: resourceForm.url.trim(),
              icon: resourceForm.icon,
              categoryTh: resourceForm.categoryTh.trim(),
              categoryEn: resourceForm.categoryEn.trim()
            }
          : r
      );
    } else {
      const newRes: LibraryResourceItem = {
        id: `res-${Date.now()}`,
        titleTh: resourceForm.titleTh.trim(),
        titleEn: resourceForm.titleEn.trim() || resourceForm.titleTh.trim(),
        descTh: resourceForm.descTh.trim(),
        descEn: resourceForm.descEn.trim() || resourceForm.descTh.trim(),
        url: resourceForm.url.trim(),
        icon: resourceForm.icon,
        categoryTh: resourceForm.categoryTh.trim(),
        categoryEn: resourceForm.categoryEn.trim()
      };
      updatedList = [...currentList, newRes];
    }

    onUpdateAdminData({ ...adminData, resources: updatedList });
    setIsResourceModalOpen(false);
    showToast(language === 'th' ? 'บันทึกทรัพยากรห้องสมุดเรียบร้อยแล้ว' : 'Library resource saved successfully');
  };

  const handleDeleteResource = (id: string) => {
    if (window.confirm(language === 'th' ? 'คุณต้องการลบทรัพยากรนี้ใช่หรือไม่?' : 'Delete this resource?')) {
      const updatedList = (adminData.resources || []).filter(r => r.id !== id);
      onUpdateAdminData({ ...adminData, resources: updatedList });
      showToast(language === 'th' ? 'ลบทรัพยากรเรียบร้อยแล้ว' : 'Resource deleted successfully');
    }
  };

  const handleMoveResource = (index: number, direction: 'up' | 'down') => {
    const list = [...(adminData.resources || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    onUpdateAdminData({ ...adminData, resources: list });
  };

  // --- SAVE CONTACTS ---
  const handleSaveContacts = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAdminData({
      ...adminData,
      contacts: contactForm
    });
    showToast(language === 'th' ? 'บันทึกข้อมูลติดต่อแล้ว' : 'Contact info saved');
  };

  // --- RESET ALL ---
  const handleReset = () => {
    if (
      window.confirm(
        language === 'th'
          ? 'ต้องการรีเซ็ตข้อมูลบริการทั้งหมดกลับเป็นค่าเริ่มต้นหรือไม่?'
          : 'Reset all services and FAQs to default values?'
      )
    ) {
      onResetAdminData();
      setHoursForm({ ...adminData.hours });
      setPolicyForm({ ...adminData.policies });
      setContactForm({ ...adminData.contacts });
      showToast(language === 'th' ? 'รีเซ็ตข้อมูลเป็นค่าเริ่มต้นแล้ว' : 'Reset to default successfully');
    }
  };

  // Filtered FAQs in Admin list
  const filteredFaqs = adminData.faqs.filter(f => {
    const q = faqSearchQuery.toLowerCase();
    return (
      f.questionTh.toLowerCase().includes(q) ||
      f.questionEn.toLowerCase().includes(q) ||
      f.categoryTh.toLowerCase().includes(q) ||
      f.answerTh.toLowerCase().includes(q)
    );
  });

  // -------------------------------------------------------------
  // RENDER: PASSWORD LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50 relative overflow-y-auto">
        <div className="max-w-md w-full bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm text-center">
          <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-900 shadow-2xs">
            <Lock className="w-7 h-7" />
          </div>

          <h3 className="font-['Prompt',sans-serif] font-bold text-lg text-slate-800">
            {language === 'th' ? 'ระบบจัดการข้อมูลบริการ (Admin)' : 'Library Admin Portal'}
          </h3>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-1 mb-6 leading-relaxed">
            {language === 'th'
              ? 'กรุณากรอกรหัสผ่านเจ้าหน้าที่เพื่อเข้าสู่ระบบเพิ่ม ลบ และแก้ไขข้อมูลบริการของ Widget'
              : 'Please enter the admin password to manage and customize widget services.'}
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 font-['Prompt',sans-serif]">
                {language === 'th' ? 'รหัสผ่านผู้ดูแลระบบ (Admin Password)' : 'Admin Password'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  placeholder={language === 'th' ? 'กรอกรหัสผ่านผู้ดูแลระบบ' : 'Enter admin password'}
                  autoFocus
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{language === 'th' ? 'เข้าสู่ระบบจัดการ' : 'Authenticate Admin'}</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400 text-[11px]">
            <Key className="w-3.5 h-3.5" />
            <span>{language === 'th' ? 'ระบบสงวนสิทธิ์เฉพาะเจ้าหน้าที่งานวิทยบริการเท่านั้น' : 'Authorized library staff only'}</span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-medium shadow-lg flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Subheader Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex-shrink-0 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <h3 className="text-sm font-bold text-slate-800 font-['Prompt',sans-serif] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-900" />
              {language === 'th' ? 'จัดการข้อมูลบริการ (Admin Mode)' : 'Admin Service Manager'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {language === 'th' ? 'แก้ไขบริการด่วน, FAQ, เวลาทำการ, และข้อมูลติดต่อ' : 'Edit Quick services, FAQs, hours & contacts'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            title={language === 'th' ? 'รีเซ็ตข้อมูลเป็นค่าเริ่มต้น' : 'Reset to Default'}
            className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{language === 'th' ? 'คืนค่าเริ่มต้น' : 'Reset'}</span>
          </button>
          <button
            onClick={handleLogout}
            title={language === 'th' ? 'ออกจากระบบ Admin' : 'Logout'}
            className="px-2.5 py-1.5 text-xs text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{language === 'th' ? 'ออกจากระบบ' : 'Logout'}</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs Navigation */}
      <div className="bg-slate-100 border-b border-slate-200 px-4 flex gap-1 overflow-x-auto">
        <button
          onClick={() => setSubTab('prompts')}
          className={`py-2 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            subTab === 'prompts'
              ? 'border-blue-900 text-blue-900 bg-white rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'th' ? 'บริการด่วน (Quick Services)' : 'Quick Prompts'}</span>
          <span className="px-1.5 py-0.2 bg-blue-100 text-blue-900 text-[10px] rounded-full">
            {adminData.quickPrompts.length}
          </span>
        </button>

        <button
          onClick={() => setSubTab('faqs')}
          className={`py-2 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            subTab === 'faqs'
              ? 'border-blue-900 text-blue-900 bg-white rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{language === 'th' ? 'คำถามที่พบบ่อย (FAQs)' : 'FAQs'}</span>
          <span className="px-1.5 py-0.2 bg-blue-100 text-blue-900 text-[10px] rounded-full">
            {adminData.faqs.length}
          </span>
        </button>

        <button
          onClick={() => setSubTab('hours')}
          className={`py-2 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            subTab === 'hours'
              ? 'border-blue-900 text-blue-900 bg-white rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>{language === 'th' ? 'เวลาทำการ & ระเบียบ' : 'Hours & Policies'}</span>
          <span className="px-1.5 py-0.2 bg-blue-100 text-blue-900 text-[10px] rounded-full">
            {(adminData.customPolicies?.length || 0) + 2}
          </span>
        </button>

        <button
          onClick={() => setSubTab('contact')}
          className={`py-2 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            subTab === 'contact'
              ? 'border-blue-900 text-blue-900 bg-white rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{language === 'th' ? 'ข้อมูลติดต่อ' : 'Contact Info'}</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* ======================================================== */}
          {/* SUBTAB 1: QUICK PROMPTS / SERVICES */}
          {/* ======================================================== */}
          {subTab === 'prompts' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 font-['Prompt',sans-serif]">
                    {language === 'th' ? 'รายการปุ่มบริการด่วนหน้าแชท (Quick Access)' : 'Quick Access Buttons'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {language === 'th' ? 'ปุ่มที่แสดงบนการ์ดต้อนรับเพื่อให้ผู้ใช้คลิกสอบถามได้ทันที' : 'Buttons shown on the welcome greeting card'}
                  </p>
                </div>
                <button
                  onClick={handleOpenAddPrompt}
                  className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{language === 'th' ? 'เพิ่มบริการใหม่' : 'Add Service'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {adminData.quickPrompts.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 w-5">#{idx + 1}</span>
                        <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                          {item.textTh}
                        </span>
                        {item.badgeTh && (
                          <span className="px-2 py-0.5 text-[9px] font-bold bg-blue-100 text-blue-900 border border-blue-200 rounded-full">
                            {item.badgeTh}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 pl-7">
                        <span className="text-slate-400">EN:</span> {item.textEn || item.textTh} •{' '}
                        <span className="text-slate-400">Query:</span> {item.actionQueryTh}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleOpenEditPrompt(item)}
                        title={language === 'th' ? 'แก้ไข' : 'Edit'}
                        className="p-1.5 text-slate-500 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePrompt(item.id)}
                        title={language === 'th' ? 'ลบ' : 'Delete'}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SUBTAB 2: FAQS KNOWLEDGE */}
          {/* ======================================================== */}
          {subTab === 'faqs' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 font-['Prompt',sans-serif]">
                    {language === 'th' ? 'คลังคำถามที่พบบ่อย (FAQs Knowledge Base)' : 'FAQ Knowledge Base'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {language === 'th' ? 'ข้อมูลในส่วนนี้ใช้ตอบคำถามอัตโนมัติในแชทและแสดงในแท็บ FAQ' : 'Used for auto-responses and the FAQs tab'}
                  </p>
                </div>
                <button
                  onClick={handleOpenAddFaq}
                  className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{language === 'th' ? 'เพิ่ม FAQ ใหม่' : 'Add FAQ'}</span>
                </button>
              </div>

              {/* FAQ Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={faqSearchQuery}
                  onChange={(e) => setFaqSearchQuery(e.target.value)}
                  placeholder={language === 'th' ? 'ค้นหาคำถามในระบบ...' : 'Search FAQs...'}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2.5">
                {filteredFaqs.map((faq, idx) => (
                  <div
                    key={faq.id}
                    className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-700 rounded-md">
                            {faq.categoryTh}
                          </span>
                        </div>
                        <h5 className="text-xs sm:text-sm font-bold text-slate-800 font-['Prompt',sans-serif]">
                          {faq.questionTh}
                        </h5>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          EN: {faq.questionEn}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleOpenEditFaq(faq)}
                          title={language === 'th' ? 'แก้ไข' : 'Edit'}
                          className="p-1.5 text-slate-500 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(faq.id)}
                          title={language === 'th' ? 'ลบ' : 'Delete'}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-600 whitespace-pre-line leading-relaxed border border-slate-100">
                      {faq.answerTh}
                    </div>

                    {faq.tags && faq.tags.length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap pt-1">
                        <span className="text-[10px] text-slate-400 font-medium">Tags:</span>
                        {faq.tags.map((t, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SUBTAB 3: HOURS & POLICIES */}
          {/* ======================================================== */}
          {subTab === 'hours' && (
            <div className="space-y-6">
              <form onSubmit={handleSaveHoursAndPolicies} className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-800 font-['Prompt',sans-serif]">
                  {language === 'th' ? 'แก้ไขเวลาทำการและสิทธิ์การยืม' : 'Operating Hours & Loan Entitlements'}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === 'th' ? 'ข้อมูลจะแสดงในแท็บ "ระเบียบ" และใช้ในการตอบคำถามอัตโนมัติ' : 'Displayed in the Policy guide tab and bot responses'}
                </p>
              </div>

              {/* Hours Card */}
              <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
                <h5 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-900" />
                  <span>{language === 'th' ? 'เวลาทำการ (Hours of Operation)' : 'Hours of Operation'}</span>
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {language === 'th' ? 'ห้องสมุดกลาง Saint Louis (ไทย)' : 'Central Library (TH)'}
                    </label>
                    <input
                      type="text"
                      value={hoursForm.centralTh}
                      onChange={(e) => setHoursForm({ ...hoursForm, centralTh: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {language === 'th' ? 'ห้องสมุดกลาง Saint Louis (อังกฤษ)' : 'Central Library (EN)'}
                    </label>
                    <input
                      type="text"
                      value={hoursForm.centralEn}
                      onChange={(e) => setHoursForm({ ...hoursForm, centralEn: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {language === 'th' ? 'สาขา Saint Benedict (ไทย)' : 'Saint Benedict Branch (TH)'}
                    </label>
                    <input
                      type="text"
                      value={hoursForm.branchTh}
                      onChange={(e) => setHoursForm({ ...hoursForm, branchTh: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {language === 'th' ? 'สาขา Saint Benedict (อังกฤษ)' : 'Saint Benedict Branch (EN)'}
                    </label>
                    <input
                      type="text"
                      value={hoursForm.branchEn}
                      onChange={(e) => setHoursForm({ ...hoursForm, branchEn: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">
                      {language === 'th' ? 'หมายเหตุวันหยุด (ไทย)' : 'Holiday Note (TH)'}
                    </label>
                    <input
                      type="text"
                      value={hoursForm.noteTh}
                      onChange={(e) => setHoursForm({ ...hoursForm, noteTh: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Policy Card */}
              <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
                <h5 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-900" />
                  <span>{language === 'th' ? 'สิทธิ์การยืมหนังสือ (Loan Policies)' : 'Loan Policies'}</span>
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {language === 'th' ? 'นศ. ป.ตรี / บุคลากร (TH)' : 'Undergrad & Staff (TH)'}
                    </label>
                    <input
                      type="text"
                      value={policyForm.undergradTh}
                      onChange={(e) => setPolicyForm({ ...policyForm, undergradTh: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {language === 'th' ? 'นศ. ป.โท (TH)' : 'Postgrad (TH)'}
                    </label>
                    <input
                      type="text"
                      value={policyForm.gradTh}
                      onChange={(e) => setPolicyForm({ ...policyForm, gradTh: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {language === 'th' ? 'คณาจารย์ (TH)' : 'Faculty (TH)'}
                    </label>
                    <input
                      type="text"
                      value={policyForm.facultyTh}
                      onChange={(e) => setPolicyForm({ ...policyForm, facultyTh: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {language === 'th' ? 'ค่าปรับส่งเกินกำหนด (TH)' : 'Overdue Fine (TH)'}
                    </label>
                    <input
                      type="text"
                      value={policyForm.fineTh}
                      onChange={(e) => setPolicyForm({ ...policyForm, fineTh: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{language === 'th' ? 'บันทึกเวลาทำการและสิทธิ์การยืม' : 'Save Hours & Loan Policies'}</span>
              </button>
            </form>

            {/* Additional Regulation Cards Section */}
            <div className="pt-5 border-t border-slate-200/90 space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 font-['Prompt',sans-serif] flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-900" />
                    <span>{language === 'th' ? 'การ์ดระเบียบและข้อปฏิบัติอื่นๆ (Regulation Cards)' : 'Additional Regulation Cards'}</span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    {language === 'th' ? 'เพิ่มหรือแก้ไขการ์ดระเบียบสำหรับแสดงในแท็บ "ระเบียบ" เช่น มารยาทการใช้ห้องสมุด, การใช้คอมพิวเตอร์ ฯลฯ' : 'Manage custom regulation cards shown in the Guide tab'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddPolicyCard}
                  className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{language === 'th' ? 'เพิ่มการ์ดระเบียบใหม่' : 'Add Policy Card'}</span>
                </button>
              </div>

              {/* List of Custom Regulation Cards */}
              <div className="space-y-3">
                {adminData.customPolicies && adminData.customPolicies.length > 0 ? (
                  adminData.customPolicies.map((card, idx) => (
                    <div key={card.id} className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5 min-w-0 flex-1">
                          <div className="p-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-100 mt-0.5 flex-shrink-0">
                            {renderPolicyCardIcon(card.icon)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-0.5">
                              <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                              {card.categoryTh && (
                                <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-700 rounded-md">
                                  {language === 'th' ? card.categoryTh : card.categoryEn || card.categoryTh}
                                </span>
                              )}
                            </div>
                            <h5 className="text-xs sm:text-sm font-bold text-slate-800 font-['Prompt',sans-serif]">
                              {card.titleTh}
                            </h5>
                            {card.titleEn && (
                              <p className="text-[11px] text-slate-500">EN: {card.titleEn}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => handleOpenEditPolicyCard(card)}
                            title={language === 'th' ? 'แก้ไขการ์ด' : 'Edit'}
                            className="p-1.5 text-slate-500 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePolicyCard(card.id)}
                            title={language === 'th' ? 'ลบการ์ด' : 'Delete'}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Bullet items preview */}
                      <ul className="pl-9 space-y-1 text-xs text-slate-600 border-t border-slate-100 pt-2">
                        {card.itemsTh.map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-blue-900 font-bold select-none">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <div className="p-6 bg-white rounded-xl border border-dashed border-slate-200 text-center space-y-2">
                    <FileText className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-xs text-slate-500 font-medium">
                      {language === 'th' ? 'ยังไม่มีการ์ดระเบียบเพิ่มเติม' : 'No additional regulation cards yet'}
                    </p>
                    <button
                      type="button"
                      onClick={handleOpenAddPolicyCard}
                      className="px-3 py-1.5 bg-blue-50 text-blue-900 hover:bg-blue-100 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{language === 'th' ? 'เพิ่มการ์ดระเบียบใบแรก' : 'Add First Regulation Card'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

          {/* ======================================================== */}
          {/* SUBTAB 4: CONTACT INFO */}
          {/* ======================================================== */}
          {subTab === 'contact' && (
            <form onSubmit={handleSaveContacts} className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-800 font-['Prompt',sans-serif]">
                  {language === 'th' ? 'แก้ไขข้อมูลการติดต่อบรรณารักษ์' : 'Contact Librarian Details'}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === 'th' ? 'ข้อมูลจะแสดงในแท็บ "ติดต่อบรรณารักษ์" และคำตอบอัตโนมัติ' : 'Shown in the Ask a Librarian tab'}
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'th' ? 'อีเมลห้องสมุด' : 'Library Email'}
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'th' ? 'เบอร์โทรศัพท์' : 'Phone Number'}
                  </label>
                  <input
                    type="text"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Facebook Name
                    </label>
                    <input
                      type="text"
                      value={contactForm.facebookName}
                      onChange={(e) => setContactForm({ ...contactForm, facebookName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Facebook URL
                    </label>
                    <input
                      type="url"
                      value={contactForm.facebookUrl}
                      onChange={(e) => setContactForm({ ...contactForm, facebookUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      LINE OpenChat Text (TH)
                    </label>
                    <input
                      type="text"
                      value={contactForm.lineNameTh}
                      onChange={(e) => setContactForm({ ...contactForm, lineNameTh: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      LINE OpenChat URL
                    </label>
                    <input
                      type="url"
                      value={contactForm.lineUrl}
                      onChange={(e) => setContactForm({ ...contactForm, lineUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{language === 'th' ? 'บันทึกข้อมูลติดต่อ' : 'Save Contact Information'}</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT QUICK PROMPT */}
      {/* ======================================================== */}
      {isPromptModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm sm:text-base font-bold text-slate-800 font-['Prompt',sans-serif]">
                {editingPrompt
                  ? language === 'th'
                    ? 'แก้ไขบริการด่วน'
                    : 'Edit Quick Service'
                  : language === 'th'
                  ? 'เพิ่มบริการด่วนใหม่'
                  : 'Add New Quick Service'}
              </h4>
              <button
                onClick={() => setIsPromptModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePrompt} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'th' ? 'ชื่อปุ่มบริการ (ภาษาไทย)*' : 'Service Label (TH)*'}
                </label>
                <input
                  type="text"
                  required
                  value={promptForm.textTh}
                  onChange={(e) => setPromptForm({ ...promptForm, textTh: e.target.value })}
                  placeholder={language === 'th' ? 'เช่น จองห้องประชุม, ยืมหนังสือ' : 'e.g. Room Booking'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'th' ? 'ชื่อปุ่มบริการ (ภาษาอังกฤษ)' : 'Service Label (EN)'}
                </label>
                <input
                  type="text"
                  value={promptForm.textEn}
                  onChange={(e) => setPromptForm({ ...promptForm, textEn: e.target.value })}
                  placeholder="e.g. Room Reservation"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'th' ? 'คำถาม/คำค้นหาที่ส่งให้บอท (TH)*' : 'Action Query (TH)*'}
                </label>
                <input
                  type="text"
                  required
                  value={promptForm.actionQueryTh}
                  onChange={(e) => setPromptForm({ ...promptForm, actionQueryTh: e.target.value })}
                  placeholder={language === 'th' ? 'เช่น ขอจองห้องประชุม' : 'e.g. How to book room'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'th' ? 'คำถาม/คำค้นหาที่ส่งให้บอท (EN)' : 'Action Query (EN)'}
                </label>
                <input
                  type="text"
                  value={promptForm.actionQueryEn}
                  onChange={(e) => setPromptForm({ ...promptForm, actionQueryEn: e.target.value })}
                  placeholder="e.g. Book a meeting room"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'th' ? 'ป้ายกำกับ (Badge TH)' : 'Badge (TH)'}
                  </label>
                  <input
                    type="text"
                    value={promptForm.badgeTh}
                    onChange={(e) => setPromptForm({ ...promptForm, badgeTh: e.target.value })}
                    placeholder="เช่น ยอดนิยม, ใหม่"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'th' ? 'ป้ายกำกับ (Badge EN)' : 'Badge (EN)'}
                  </label>
                  <input
                    type="text"
                    value={promptForm.badgeEn}
                    onChange={(e) => setPromptForm({ ...promptForm, badgeEn: e.target.value })}
                    placeholder="e.g. Popular, New"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPromptModalOpen(false)}
                  className="px-3 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {language === 'th' ? 'ยกเลิก' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  {language === 'th' ? 'บันทึกบริการ' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT FAQ */}
      {/* ======================================================== */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm sm:text-base font-bold text-slate-800 font-['Prompt',sans-serif]">
                {editingFaq
                  ? language === 'th'
                    ? 'แก้ไขคำถาม FAQ'
                    : 'Edit FAQ'
                  : language === 'th'
                  ? 'เพิ่มคำถาม FAQ ใหม่'
                  : 'Add New FAQ'}
              </h4>
              <button
                onClick={() => setIsFaqModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'th' ? 'หมวดหมู่ (TH)*' : 'Category (TH)*'}
                  </label>
                  <input
                    type="text"
                    required
                    value={faqForm.categoryTh}
                    onChange={(e) => setFaqForm({ ...faqForm, categoryTh: e.target.value })}
                    placeholder="เช่น บริการยืม-คืน, จองห้อง"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'th' ? 'หมวดหมู่ (EN)' : 'Category (EN)'}
                  </label>
                  <input
                    type="text"
                    value={faqForm.categoryEn}
                    onChange={(e) => setFaqForm({ ...faqForm, categoryEn: e.target.value })}
                    placeholder="e.g. Circulation, Rooms"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'th' ? 'คำถาม (ภาษาไทย)*' : 'Question (TH)*'}
                </label>
                <input
                  type="text"
                  required
                  value={faqForm.questionTh}
                  onChange={(e) => setFaqForm({ ...faqForm, questionTh: e.target.value })}
                  placeholder="เช่น ยืมหนังสือได้กี่วัน และต่ออายุอย่างไร?"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'th' ? 'คำถาม (ภาษาอังกฤษ)' : 'Question (EN)'}
                </label>
                <input
                  type="text"
                  value={faqForm.questionEn}
                  onChange={(e) => setFaqForm({ ...faqForm, questionEn: e.target.value })}
                  placeholder="e.g. What is the borrowing period?"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'th' ? 'คำตอบ (ภาษาไทย)*' : 'Answer (TH)*'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={faqForm.answerTh}
                  onChange={(e) => setFaqForm({ ...faqForm, answerTh: e.target.value })}
                  placeholder="รายละเอียดคำตอบ สามารถจัดบรรทัดหรือใส่ข้อความสัญลักษณ์ได้..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'th' ? 'คำตอบ (ภาษาอังกฤษ)' : 'Answer (EN)'}
                </label>
                <textarea
                  rows={3}
                  value={faqForm.answerEn}
                  onChange={(e) => setFaqForm({ ...faqForm, answerEn: e.target.value })}
                  placeholder="English answer explanation..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'th' ? 'แท็กคำค้นหา (คั่นด้วยเครื่องหมายจุลภาค ,)' : 'Search Tags (comma-separated)'}
                </label>
                <input
                  type="text"
                  value={faqTagsInput}
                  onChange={(e) => setFaqTagsInput(e.target.value)}
                  placeholder="เช่น ยืม, borrow, คืน, book, loan"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
                  className="px-3 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {language === 'th' ? 'ยกเลิก' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  {language === 'th' ? 'บันทึก FAQ' : 'Save FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT CUSTOM REGULATION CARD */}
      {/* ======================================================== */}
      {isPolicyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-100">
                  {renderPolicyCardIcon(policyCardForm.icon)}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-800 font-['Prompt',sans-serif]">
                  {editingPolicyCard
                    ? language === 'th'
                      ? 'แก้ไขการ์ดระเบียบ'
                      : 'Edit Regulation Card'
                    : language === 'th'
                    ? 'เพิ่มการ์ดระเบียบใหม่'
                    : 'Add New Regulation Card'}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsPolicyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePolicyCard} className="space-y-3.5 text-xs">
              {/* Title TH & EN */}
              <div className="space-y-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'th' ? 'หัวข้อระเบียบ (ภาษาไทย)*' : 'Regulation Title (TH)*'}
                  </label>
                  <input
                    type="text"
                    required
                    value={policyCardForm.titleTh}
                    onChange={(e) => setPolicyCardForm({ ...policyCardForm, titleTh: e.target.value })}
                    placeholder={language === 'th' ? 'เช่น ระเบียบการใช้ห้องศึกษาค้นคว้ากลุ่ม' : 'e.g. Group Study Room Guidelines'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'th' ? 'หัวข้อระเบียบ (ภาษาอังกฤษ)' : 'Regulation Title (EN)'}
                  </label>
                  <input
                    type="text"
                    value={policyCardForm.titleEn}
                    onChange={(e) => setPolicyCardForm({ ...policyCardForm, titleEn: e.target.value })}
                    placeholder="e.g. Group Study Room Regulations"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Category & Suggestions */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {language === 'th' ? 'หมวดหมู่ / ป้ายกำกับ' : 'Category / Tag'}
                </label>
                <div className="grid grid-cols-2 gap-2 mb-1.5">
                  <input
                    type="text"
                    value={policyCardForm.categoryTh}
                    onChange={(e) => setPolicyCardForm({ ...policyCardForm, categoryTh: e.target.value })}
                    placeholder={language === 'th' ? 'หมวดหมู่ (TH)' : 'Category (TH)'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  />
                  <input
                    type="text"
                    value={policyCardForm.categoryEn}
                    onChange={(e) => setPolicyCardForm({ ...policyCardForm, categoryEn: e.target.value })}
                    placeholder={language === 'th' ? 'หมวดหมู่ (EN)' : 'Category (EN)'}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-400 font-medium">แนะนำ:</span>
                  {[
                    { th: 'มารยาททั่วไป', en: 'General Etiquette' },
                    { th: 'เทคโนโลยี', en: 'Technology' },
                    { th: 'ห้องค้นคว้ากลุ่ม', en: 'Study Rooms' },
                    { th: 'การแต่งกาย', en: 'Dress Code' }
                  ].map((cat, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPolicyCardForm({ ...policyCardForm, categoryTh: cat.th, categoryEn: cat.en })}
                      className="px-2 py-0.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-900 text-slate-600 text-[10px] rounded-md transition-colors cursor-pointer"
                    >
                      {language === 'th' ? cat.th : cat.en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Icon Selector */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  {language === 'th' ? 'เลือกไอคอนประจำการ์ด' : 'Select Card Icon'}
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                  {[
                    { id: 'file-text', label: 'เอกสาร', icon: <FileText className="w-4 h-4" /> },
                    { id: 'users', label: 'บุคคล', icon: <Users className="w-4 h-4" /> },
                    { id: 'monitor', label: 'คอม', icon: <Monitor className="w-4 h-4" /> },
                    { id: 'book', label: 'หนังสือ', icon: <BookOpen className="w-4 h-4" /> },
                    { id: 'shield', label: 'ความปลอดภัย', icon: <ShieldCheck className="w-4 h-4" /> },
                    { id: 'coffee', label: 'อาหาร', icon: <Coffee className="w-4 h-4" /> },
                    { id: 'alert', label: 'ข้อห้าม', icon: <AlertCircle className="w-4 h-4" /> },
                    { id: 'clock', label: 'เวลา', icon: <Clock className="w-4 h-4" /> }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPolicyCardForm({ ...policyCardForm, icon: item.id as any })}
                      className={`p-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border ${
                        policyCardForm.icon === item.id
                          ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                      title={item.label}
                    >
                      {item.icon}
                      <span className="text-[9px] font-medium leading-none truncate max-w-full">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rules List in Thai */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700">
                    {language === 'th' ? 'รายการข้อปฏิบัติ (ภาษาไทย)*' : 'Regulation Guidelines (TH)*'}
                  </label>
                  <span className="text-[10px] text-blue-900 font-medium">1 ข้อ ต่อ 1 บรรทัด</span>
                </div>
                <textarea
                  required
                  rows={4}
                  value={policyCardForm.itemsThText}
                  onChange={(e) => setPolicyCardForm({ ...policyCardForm, itemsThText: e.target.value })}
                  placeholder={language === 'th' ? 'ตัวอย่าง:\n1. กรุณาปิดเสียงโทรศัพท์มือถือ\n2. ห้ามนำอาหารและเครื่องดื่มเข้ามา\n3. ช่วยกันรักษาความสะอาด' : 'Enter guidelines, one per line...'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono text-[11px]"
                />
              </div>

              {/* Rules List in English */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700">
                    {language === 'th' ? 'รายการข้อปฏิบัติ (ภาษาอังกฤษ)' : 'Regulation Guidelines (EN)'}
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">One rule per line</span>
                </div>
                <textarea
                  rows={3}
                  value={policyCardForm.itemsEnText}
                  onChange={(e) => setPolicyCardForm({ ...policyCardForm, itemsEnText: e.target.value })}
                  placeholder="Enter English guidelines, one per line..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono text-[11px]"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPolicyModalOpen(false)}
                  className="px-3.5 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  {language === 'th' ? 'ยกเลิก' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{language === 'th' ? 'บันทึกการ์ดระเบียบ' : 'Save Regulation Card'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
