import { LibraryAdminData, FAQItem, QuickPrompt, LibraryContactInfo, LibraryHoursInfo, LibraryPolicyInfo, CustomPolicyCard, LibraryResourceItem } from '../types';
import { FAQ_LIST, QUICK_PROMPTS } from './libraryKnowledge';

export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'FallbackPassword';
export const ADMIN_STORAGE_KEY = 'lumi_library_admin_data';

export const DEFAULT_CONTACTS: LibraryContactInfo = {
  email: 'library@slc.ac.th',
  phone: '02-675-5304-12 ต่อ 3101',
  facebookUrl: 'https://www.facebook.com/SLCLib',
  facebookName: 'SLC Lib',
  lineUrl: 'https://line.me/ti/g2/rJDHa3r305wqq488K1rnMf-5g6U2tdpdYNF4TA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default',
  lineNameTh: 'คลิกเพื่อเข้าร่วมกลุ่ม',
  lineNameEn: 'Join OpenChat'
};

export const DEFAULT_HOURS: LibraryHoursInfo = {
  centralTh: 'ทุกวัน 10:00 - 19:00 น.',
  centralEn: 'Daily, 10:00 AM - 7:00 PM',
  branchTh: 'วันจันทร์ - วันศุกร์ 08:00 - 17:00 น.',
  branchEn: 'Monday - Friday, 8:00 AM - 5:00 PM',
  noteTh: 'ปิดทำการในวันหยุดนักขัตฤกษ์',
  noteEn: 'Closed on Public Holidays'
};

export const DEFAULT_POLICIES: LibraryPolicyInfo = {
  undergradTh: '7 เล่ม / 7 วัน (ต่ออายุได้ 2 ครั้ง)',
  undergradEn: '7 items / 7 days (2 renewals)',
  gradTh: '10 เล่ม / 14 วัน',
  gradEn: '10 items / 14 days',
  facultyTh: '20 เล่ม / 30 วัน',
  facultyEn: '20 items / 30 days',
  fineTh: 'ค่าปรับส่งเกินกำหนด 10 บาท/เล่ม/วัน',
  fineEn: 'Overdue fine: 10 THB/item/day'
};

export const DEFAULT_CUSTOM_POLICIES: CustomPolicyCard[] = [
  {
    id: 'policy-conduct',
    titleTh: 'ระเบียบการเข้าใช้ห้องสมุดและมารยาททั่วไป',
    titleEn: 'Library Code of Conduct & Courtesy',
    categoryTh: 'มารยาททั่วไป',
    categoryEn: 'General Etiquette',
    icon: 'users',
    itemsTh: [
      'แต่งกายด้วยชุดนักศึกษาหรือชุดสุภาพตามระเบียบของวิทยาลัย',
      'กรุณาเปิดระบบสั่นสำหรับโทรศัพท์มือถือ และงดใช้เสียงสนทนาที่รบกวนผู้อื่น',
      'ห้ามนำอาหารและเครื่องดื่มทุกชนิดเข้ามา ยกเว้นน้ำดื่มบรรจุขวดมีฝาปิดสนิท',
      'ช่วยกันรักษาความสะอาด ความเป็นระเบียบเรียบร้อย และทะนุถนอมทรัพยากรห้องสมุด'
    ],
    itemsEn: [
      'Dress in university uniform or neat polite attire in accordance with college rules.',
      'Keep mobile devices on silent mode and avoid loud conversations.',
      'Food and open drinks are prohibited, except bottled water with tight-sealing caps.',
      'Please maintain cleanliness and take good care of library property and books.'
    ]
  },
  {
    id: 'policy-computers',
    titleTh: 'การใช้บริการคอมพิวเตอร์และอินเทอร์เน็ต',
    titleEn: 'Computer Lab & Wi-Fi Guidelines',
    categoryTh: 'เทคโนโลยี',
    categoryEn: 'Technology',
    icon: 'monitor',
    itemsTh: [
      'บริการเครื่องคอมพิวเตอร์เพื่อการสืบค้นข้อมูล การวิจัย และการเรียนการสอน',
      'ล็อกอินเข้าใช้งานด้วยบัญชี SLC Account (@slc.ac.th)',
      'ห้ามดัดแปลง ลบ หรือติดตั้งโปรแกรมที่ไม่ได้รับอนุญาตลงในเครื่อง',
      'เมื่อใช้งานเสร็จสิ้น กรุณา Sign out ออกจากระบบทุกครั้งเพื่อความปลอดภัยของข้อมูล'
    ],
    itemsEn: [
      'Workstations are provided for academic research, coursework, and database search.',
      'Log in with your SLC student or staff account (@slc.ac.th).',
      'Do not modify system settings or download unauthorized applications.',
      'Always log out of your account when finished for privacy and security.'
    ]
  }
];

export const DEFAULT_RESOURCES: LibraryResourceItem[] = [
  {
    id: 'res-opac',
    titleTh: 'Web OPAC ระบบสืบค้นหนังสือ',
    titleEn: 'Web OPAC Book Search',
    descTh: 'สืบค้นหนังสือ สิ่งพิมพ์ และสื่อโสตฯ ในห้องสมุด',
    descEn: 'Search physical books, media, and printed collections',
    url: 'http://slclib.slc.ac.th/',
    icon: 'book',
    categoryTh: 'ระบบสืบค้น',
    categoryEn: 'Search Catalog'
  },
  {
    id: 'res-digital',
    titleTh: 'SLC Digital Collection',
    titleEn: 'SLC Digital Collection',
    descTh: 'คลังสารสนเทศและวิทยานิพนธ์ดิจิทัลฉบับเต็ม',
    descEn: 'Institutional Repository and full-text theses',
    url: 'https://library.slc.ac.th/lib2025/nav3-1-1-d-collections.php',
    icon: 'file-text',
    categoryTh: 'คลังดิจิทัล',
    categoryEn: 'Repository'
  },
  {
    id: 'res-apa',
    titleTh: 'Citation Guide APA 7th',
    titleEn: 'Citation Guide APA 7th',
    descTh: 'คู่มือแนะนำการเขียนบรรณานุกรมฉบับสมบูรณ์',
    descEn: 'Comprehensive referencing guide',
    url: 'https://drive.google.com/file/d/1NL3hV9xEMXdVDP6elCORzsMWkVgvCvdp/view',
    icon: 'book',
    categoryTh: 'คู่มือวิชาการ',
    categoryEn: 'Academic Guide'
  },
  {
    id: 'res-acq',
    titleTh: 'เสนอซื้อทรัพยากรสารสนเทศ',
    titleEn: 'Resource Acquisition Form',
    descTh: 'แบบฟอร์มเสนอแนะหนังสือหรือสื่อเข้าห้องสมุด',
    descEn: 'Recommend new materials for acquisition',
    url: 'https://library.slc.ac.th/lib2025/nav2-6.php',
    icon: 'sparkles',
    categoryTh: 'บริการผู้ใช้',
    categoryEn: 'User Service'
  },
  {
    id: 'res-room',
    titleTh: 'ระบบจองห้องประชุม SLC Room Booking',
    titleEn: 'SLC Room Booking Portal',
    descTh: 'จองห้องประชุมและห้องศึกษาออนไลน์',
    descEn: 'Reserve meeting and group study rooms online',
    url: 'https://lib-akira.github.io/SLC-RoomBooking/',
    icon: 'building',
    categoryTh: 'จองห้อง',
    categoryEn: 'Room Booking'
  },
  {
    id: 'res-db',
    titleTh: 'ฐานข้อมูลออนไลน์ (Digital Resources)',
    titleEn: 'Digital Resources Portal',
    descTh: 'CINAHL, CU-eLibrary, IG Library',
    descEn: 'Access subscribed academic databases',
    url: 'https://library.slc.ac.th/lib2025/nav1-1-e-databases.php',
    icon: 'globe',
    categoryTh: 'ฐานข้อมูล',
    categoryEn: 'Databases'
  }
];

export const DEFAULT_ADMIN_DATA: LibraryAdminData = {
  quickPrompts: QUICK_PROMPTS,
  faqs: FAQ_LIST,
  contacts: DEFAULT_CONTACTS,
  hours: DEFAULT_HOURS,
  policies: DEFAULT_POLICIES,
  customPolicies: DEFAULT_CUSTOM_POLICIES,
  resources: DEFAULT_RESOURCES
};

export function getStoredAdminData(): LibraryAdminData {
  if (typeof window === 'undefined') return DEFAULT_ADMIN_DATA;
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) return DEFAULT_ADMIN_DATA;
    const parsed = JSON.parse(raw);
    return {
      quickPrompts: Array.isArray(parsed.quickPrompts) ? parsed.quickPrompts : DEFAULT_ADMIN_DATA.quickPrompts,
      faqs: Array.isArray(parsed.faqs) ? parsed.faqs : DEFAULT_ADMIN_DATA.faqs,
      contacts: parsed.contacts ? { ...DEFAULT_CONTACTS, ...parsed.contacts } : DEFAULT_CONTACTS,
      hours: parsed.hours ? { ...DEFAULT_HOURS, ...parsed.hours } : DEFAULT_HOURS,
      policies: parsed.policies ? { ...DEFAULT_POLICIES, ...parsed.policies } : DEFAULT_POLICIES,
      customPolicies: Array.isArray(parsed.customPolicies) ? parsed.customPolicies : DEFAULT_CUSTOM_POLICIES,
      resources: Array.isArray(parsed.resources) ? parsed.resources : DEFAULT_RESOURCES
    };
  } catch (err) {
    console.warn('Failed to load admin data from localStorage:', err);
    return DEFAULT_ADMIN_DATA;
  }
}

export function saveStoredAdminData(data: LibraryAdminData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save admin data to localStorage:', err);
  }
}

export function resetStoredAdminData(): LibraryAdminData {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch (err) {
      console.warn('Failed to remove admin data from localStorage:', err);
    }
  }
  return DEFAULT_ADMIN_DATA;
}

export function validateAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

/**
 * Enhanced AutoResponse taking custom FAQs, services, and policies into account
 */
export function getDynamicAutoResponse(
  query: string,
  lang: 'th' | 'en',
  adminData: LibraryAdminData
): { textTh: string; textEn: string; links?: { titleTh: string; titleEn: string; url: string }[] } {
  const q = query.toLowerCase().trim();

  // 1. Check custom or edited FAQs first
  const matchedFaq = adminData.faqs.find(faq => {
    const qTh = faq.questionTh.toLowerCase();
    const qEn = faq.questionEn.toLowerCase();
    const tags = (faq.tags || []).map(t => t.toLowerCase());

    if (qTh.includes(q) || q.includes(qTh.replace(/^[0-9.]+\s*/, ''))) return true;
    if (qEn.includes(q) || q.includes(qEn.replace(/^[0-9.]+\s*/, ''))) return true;
    return tags.some(tag => q.includes(tag));
  });

  if (matchedFaq) {
    return {
      textTh: matchedFaq.answerTh,
      textEn: matchedFaq.answerEn,
      links: matchedFaq.categoryTh.includes('ห้องประชุม') || matchedFaq.categoryEn.includes('Room')
        ? [{ titleTh: 'ระบบจองห้องประชุม SLC Room Booking', titleEn: 'SLC Room Booking System', url: 'https://lib-akira.github.io/SLC-RoomBooking/' }]
        : matchedFaq.categoryTh.includes('ยืม') || matchedFaq.categoryEn.includes('Loan')
        ? [{ titleTh: 'ระบบ Web OPAC', titleEn: 'Web OPAC System', url: 'http://slclib.slc.ac.th/' }]
        : undefined
    };
  }

  // 2. Room Booking
  if (q.includes('จอง') || q.includes('ห้องประชุม') || q.includes('room') || q.includes('booking')) {
    return {
      textTh: '🏢 **การจองห้องประชุมออนไลน์:**\nสามารถจองห้องประชุมเพื่อการเรียนรู้และกิจกรรมกลุ่มได้ผ่านระบบ **SLC Room Booking** ครับ',
      textEn: '🏢 **Meeting Room Reservation:**\nYou can book study and group rooms easily via **SLC Room Booking**.',
      links: [
        { titleTh: 'ระบบจองห้องประชุม SLC Room Booking', titleEn: 'SLC Room Booking System', url: 'https://lib-akira.github.io/SLC-RoomBooking/' }
      ]
    };
  }

  // 3. Loan period & rules (dynamically using adminData.policies)
  if (q.includes('ยืม') || q.includes('borrow') || q.includes('loan') || q.includes('กี่วัน') || q.includes('คืน')) {
    const p = adminData.policies;
    return {
      textTh: `📚 **ระยะเวลาและสิทธิ์การยืมหนังสือ:**\n• **นักศึกษา ป.ตรี, บุคลากร, หลักสูตรระยะสั้น:** ${p.undergradTh}\n• **นักศึกษา ป.โท:** ${p.gradTh}\n• **คณาจารย์:** ${p.facultyTh}\n• ${p.fineTh}`,
      textEn: `📚 **Loan Entitlements & Periods:**\n• **Undergraduates, Staff:** ${p.undergradEn}\n• **Postgraduates:** ${p.gradEn}\n• **Faculty:** ${p.facultyEn}\n• ${p.fineEn}`,
      links: [
        { titleTh: 'ระบบ Web OPAC ตรวจสอบรายการยืม', titleEn: 'Web OPAC Catalog', url: 'http://slclib.slc.ac.th/' }
      ]
    };
  }

  // 4. Hours & access (dynamically using adminData.hours)
  if (q.includes('เปิด') || q.includes('เวลา') || q.includes('hour') || q.includes('ปิด') || q.includes('ทำการ')) {
    const h = adminData.hours;
    return {
      textTh: `⏰ **เวลาทำการของห้องสมุด วิทยาลัยเซนต์หลุยส์:**\n• **ห้องสมุดกลาง Saint Louis (ฝั่งโรงพยาบาล):** ${h.centralTh}\n• **ห้องสมุดสาขา Saint Benedict (ฝั่งอาคารเรียน):** ${h.branchTh}\n• *หมายเหตุ: ${h.noteTh}*`,
      textEn: `⏰ **Library Operating Hours:**\n• **Central Library (Hospital Side):** ${h.centralEn}\n• **Saint Benedict Branch (Academic Side):** ${h.branchEn}\n• *Note: ${h.noteEn}*`
    };
  }

  // 5. Book search & catalog
  if (q.includes('สืบค้น') || q.includes('ค้นหนังสือ') || q.includes('ค้นหาหนังสือ') || q.includes('opac') || q.includes('catalog')) {
    return {
      textTh: '🔍 **การสืบค้นหนังสือและสิ่งพิมพ์:**\nสามารถสืบค้นได้ผ่านช่องทาง One Search บนเว็บไซต์ หรือระบบ **Web OPAC** เพื่อตรวจสอบสถานะและตำแหน่งหนังสือบนชั้นครับ',
      textEn: '🔍 **Catalog & Book Search:**\nSearch books via the One Search bar or the **Web OPAC** system to check real-time availability and shelf location.',
      links: [
        { titleTh: 'ระบบ Web OPAC', titleEn: 'Web OPAC System', url: 'http://slclib.slc.ac.th/' }
      ]
    };
  }

  // 6. Databases
  if (q.includes('ฐานข้อมูล') || q.includes('database') || q.includes('cinahl') || q.includes('off-campus') || q.includes('นอกวิทยาลัย')) {
    return {
      textTh: '🌐 **ฐานข้อมูลออนไลน์ของวิทยาลัยเซนต์หลุยส์:**\nให้บริการฐานข้อมูล เช่น CINAHL, CU-eLibrary, IG Library, Scientific e-Resources โดยเข้าใช้งานได้จากทั้งภายในและภายนอกสถาบัน',
      textEn: '🌐 **Online Databases:**\nAccess premium databases including CINAHL, CU-eLibrary, IG Library, and Scientific e-Resources on and off-campus.',
      links: [
        { titleTh: 'หน้ารวมฐานข้อมูล (Digital Resources)', titleEn: 'Digital Resources Portal', url: 'https://library.slc.ac.th/lib2025/nav1-1-e-databases.php' },
        { titleTh: 'ดูรหัสผ่านฐานข้อมูล (Google Drive)', titleEn: 'View Database Passwords', url: 'https://drive.google.com/file/d/1t2GBJjmyI2Pk5_objWsqQwXuju6KhlFO/view?usp=sharing' }
      ]
    };
  }

  // 7. Theses
  if (q.includes('วิทยานิพนธ์') || q.includes('thesis') || q.includes('dissertation') || q.includes('digital collection')) {
    return {
      textTh: '🎓 **การสืบค้นวิทยานิพนธ์ฉบับเต็ม:**\nสามารถสืบค้นและดาวน์โหลดวิทยานิพนธ์ฉบับเต็ม (Full-Text) ของวิทยาลัยเซนต์หลุยส์ได้ฟรีผ่านระบบ **SLC Digital Collection** ครับ',
      textEn: '🎓 **Full-Text Theses Access:**\nSearch and download full-text institutional dissertations via the **SLC Digital Collection** portal.',
      links: [
        { titleTh: 'คลังสารสนเทศดิจิทัล (SLC Digital Collection)', titleEn: 'SLC Digital Collection', url: 'https://library.slc.ac.th/lib2025/nav3-1-1-d-collections.php' }
      ]
    };
  }

  // 8. Contact / Librarian (dynamically using adminData.contacts)
  if (q.includes('บรรณารักษ์') || q.includes('librarian') || q.includes('ติดต่อ') || q.includes('contact') || q.includes('โทร')) {
    const c = adminData.contacts;
    return {
      textTh: `📞 **งานวิทยบริการและวารสารวิชาการ วิทยาลัยเซนต์หลุยส์:**\n• **อีเมล:** ${c.email}\n• **โทรศัพท์:** ${c.phone}\n• **Facebook:** ${c.facebookName}\n• **LINE OpenChat:** ${c.lineNameTh}`,
      textEn: `📞 **Library, Saint Louis College:**\n• **Email:** ${c.email}\n• **Phone:** ${c.phone}\n• **Facebook:** ${c.facebookName}\n• **LINE OpenChat:** ${c.lineNameEn}`,
      links: [
        { titleTh: `Facebook: ${c.facebookName}`, titleEn: 'Facebook Page', url: c.facebookUrl },
        { titleTh: 'LINE OpenChat', titleEn: 'Join LINE OpenChat', url: c.lineUrl }
      ]
    };
  }

  // Fallback
  return {
    textTh: `🐑 น้องลูมิ (Lumi) ได้รับข้อความแล้วครับ: **"${query}"**\n\nยินดีให้บริการครับ! สามารถสอบถามข้อมูลเรื่องการยืม-คืน, จองห้องประชุม, เวลาทำการ, วิทยานิพนธ์ หรือฐานข้อมูลออนไลน์ได้ตลอดเวลาครับ 💙`,
    textEn: `🐑 Lumi received your question: **"${query}"**\n\nGlad to assist you with Saint Louis College Library services, catalog lookup, borrowing rules, and research databases! 💙`
  };
}
