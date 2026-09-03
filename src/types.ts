export type Language = 'th' | 'en';

export interface FAQItem {
  id: string;
  categoryTh: string;
  categoryEn: string;
  questionTh: string;
  questionEn: string;
  answerTh: string;
  answerEn: string;
  iconName?: string;
  tags?: string[];
}

export interface QuickPrompt {
  id: string;
  textTh: string;
  textEn: string;
  actionQueryTh: string;
  actionQueryEn: string;
  badgeTh?: string;
  badgeEn?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'lumi' | 'system';
  textTh: string;
  textEn: string;
  timestamp: string;
  quickReplies?: string[];
  links?: { titleTh: string; titleEn: string; url: string; isExternal?: boolean }[];
  category?: string;
  isHelpful?: boolean | null;
}

export interface LibraryContactInfo {
  email: string;
  phone: string;
  facebookUrl: string;
  facebookName: string;
  lineUrl: string;
  lineNameTh: string;
  lineNameEn: string;
}

export interface LibraryHoursInfo {
  centralTh: string;
  centralEn: string;
  branchTh: string;
  branchEn: string;
  noteTh: string;
  noteEn: string;
}

export interface LibraryPolicyInfo {
  undergradTh: string;
  undergradEn: string;
  gradTh: string;
  gradEn: string;
  facultyTh: string;
  facultyEn: string;
  fineTh: string;
  fineEn: string;
}

export interface CustomPolicyCard {
  id: string;
  titleTh: string;
  titleEn: string;
  categoryTh?: string;
  categoryEn?: string;
  icon?: 'book' | 'shield' | 'users' | 'alert' | 'coffee' | 'monitor' | 'clock' | 'file-text';
  itemsTh: string[];
  itemsEn: string[];
}

export interface LibraryResourceItem {
  id: string;
  titleTh: string;
  titleEn: string;
  descTh: string;
  descEn: string;
  url: string;
  icon: 'book' | 'file-text' | 'sparkles' | 'building' | 'globe' | 'database' | 'search' | 'external-link';
  categoryTh?: string;
  categoryEn?: string;
}

export interface LibraryAdminData {
  quickPrompts: QuickPrompt[];
  faqs: FAQItem[];
  contacts: LibraryContactInfo;
  hours: LibraryHoursInfo;
  policies: LibraryPolicyInfo;
  customPolicies: CustomPolicyCard[];
  resources: LibraryResourceItem[];
}

export interface WidgetConfig {
  isOpen: boolean;
  isFaqDrawerOpen: boolean;
  language: Language;
  soundEnabled: boolean;
  theme: 'deep-navy' | 'midnight-blue' | 'slate-dark';
  position: 'bottom-right' | 'bottom-left';
}
