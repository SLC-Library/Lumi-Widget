import { FAQItem, QuickPrompt } from '../types';

export const FAQ_LIST: FAQItem[] = [
  {
    id: 'faq-1',
    categoryTh: 'บริการยืม-คืน',
    categoryEn: 'Circulation',
    questionTh: '1. ยืมหนังสือได้กี่วัน และต่ออายุได้อย่างไร?',
    questionEn: '1. What is the loan period and how to renew?',
    answerTh: '📚 **สิทธิ์การยืมหนังสือ (Loan Policy):**\n• นักศึกษา ป.ตรี, บุคลากร, หลักสูตรระยะสั้น: 7 เล่ม / 7 วัน (ต่ออายุออนไลน์ได้ 2 ครั้ง)\n• นักศึกษา ป.โท: 10 เล่ม / 14 วัน\n• คณาจารย์: 20 เล่ม / 30 วัน\n• ค่าปรับส่งเกินกำหนด: 10 บาท/เล่ม/วัน\nสามารถต่ออายุออนไลน์ได้ด้วยตนเองผ่านระบบ Web OPAC ก่อนครบกำหนดส่งครับ',
    answerEn: '📚 **Borrowing Entitlement:**\n• Undergraduates, staff, short-course participants: 7 items / 7 days (2 renewals)\n• Postgraduates: 10 items / 14 days\n• Faculty: 20 items / 30 days\n• Overdue fine: 10 THB/item/day\nYou can renew online via Web OPAC before the due date.',
    tags: ['loan', 'borrow', 'renew', 'opac', 'ยืม']
  },
  {
    id: 'faq-2',
    categoryTh: 'จองห้องประชุม',
    categoryEn: 'Room Reservation',
    questionTh: '2. จองห้องประชุมออนไลน์ได้อย่างไร?',
    questionEn: '2. How can I book a meeting room online?',
    answerTh: '📝 **การจองห้องประชุมออนไลน์:**\nสามารถจองได้สะดวกรวดเร็วผ่านระบบจองห้องประชุมออนไลน์ของห้องสมุด ที่ระบบ SLC Room Booking ครับ',
    answerEn: '📝 **Room Reservation:**\nYou can book through the Library Online Room Reservation system (SLC Room Booking).',
    tags: ['room', 'booking', 'ห้องประชุม', 'จอง']
  },
  {
    id: 'faq-3',
    categoryTh: 'เวลาทำการ',
    categoryEn: 'Hours & Access',
    questionTh: '3. เวลาเปิด-ปิดทำการของห้องสมุด?',
    questionEn: '3. What are the library operating hours?',
    answerTh: '⏰ **เวลาทำการของห้องสมุด วิทยาลัยเซนต์หลุยส์:**\n• **ห้องสมุดกลาง Saint Louis (ฝั่งโรงพยาบาล):** ทุกวัน 10:00 - 19:00 น.\n• **ห้องสมุดสาขา Saint Benedict (ฝั่งอาคารเรียน):** วันจันทร์ - วันศุกร์ 08:00 - 17:00 น.\n• *หมายเหตุ: ปิดทำการในวันหยุดนักขัตฤกษ์*',
    answerEn: '⏰ **Library Hours of Operation:**\n• **Central Library Saint Louis (Hospital Side):** Daily, 10:00 AM - 7:00 PM\n• **Saint Benedict Branch (Academic Side):** Monday - Friday, 8:00 AM - 5:00 PM\n• *Closed on Public Holidays*',
    tags: ['hours', 'open', 'close', 'เวลา', 'เปิด']
  },
  {
    id: 'faq-4',
    categoryTh: 'วิทยานิพนธ์',
    categoryEn: 'Theses & Research',
    questionTh: '4. ค้นหาวิทยานิพนธ์ฉบับเต็มของวิทยาลัยได้อย่างไร?',
    questionEn: '4. How to access institutional theses full-text?',
    answerTh: '🎓 คุณสามารถสืบค้นและดาวน์โหลดวิทยานิพนธ์และงานนิพนธ์ฉบับเต็มได้ฟรี ผ่านระบบ **คลังสารสนเทศดิจิทัล วิทยาลัยเซนต์หลุยส์ (SLC Digital Collection)** ครับ',
    answerEn: '🎓 Access and download full-text institutional dissertations via **The Saint Louis College Digital Collections (SLC Digital Collection)**.',
    tags: ['thesis', 'dissertation', 'วิทยานิพนธ์', 'dspace']
  },
  {
    id: 'faq-5',
    categoryTh: 'ฐานข้อมูลออนไลน์',
    categoryEn: 'Databases',
    questionTh: '5. ใช้งานฐานข้อมูลวิจัยออนไลน์จากนอกวิทยาลัยได้อย่างไร?',
    questionEn: '5. How to access online research databases off-campus?',
    answerTh: '🌐 **การเข้าใช้งานฐานข้อมูลออนไลน์ (CINAHL, CU-eLibrary, IG Library, Scientific e-Resources):**\n1. เลือกฐานข้อมูลที่ต้องการจากหน้าเว็บไซต์ห้องสมุด\n2. เข้าสู่ระบบด้วยบัญชีของวิทยาลัย (ดูรหัสผ่านได้จากเอกสารคู่มือบน Google Drive)',
    answerEn: '🌐 **Accessing Online Databases (CINAHL, CU-eLibrary, IG Library, Scientific e-Resources):**\n1. Select your database from the library website\n2. Sign in using your college account credentials (refer to password guide on Google Drive)',
    tags: ['database', 'cinahl', 'offcampus', 'ฐานข้อมูล']
  },
  {
    id: 'faq-6',
    categoryTh: 'การยืมต่อ (Renew)',
    categoryEn: 'Online Renewal',
    questionTh: '6. ขั้นตอนการยืมหนังสือต่อออนไลน์ทำอย่างไร?',
    questionEn: '6. How do I renew borrowed books online?',
    answerTh: '🔄 **ขั้นตอนการยืมต่อออนไลน์ด้วยตนเอง:**\n1. เข้าสู่ระบบ Web OPAC\n2. Log in ด้วยรหัสคณะ (เช่น Nu, Pt, Psy) ตามด้วยรหัสนักศึกษา/อาจารย์/บุคลากร\n3. ไปที่รายการหนังสือที่กำลังยืม แล้วคลิก "Renew"',
    answerEn: '🔄 **Online Renewal Steps:**\n1. Go to the Web OPAC system\n2. Log in with faculty prefix (Nu, Pt, Psy) followed by ID number\n3. Select your borrowed items and click "Renew"',
    tags: ['renew', 'extend', 'ต่ออายุ', 'opac']
  }
];

export const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: 'quick-room',
    textTh: 'ขอจองห้องประชุม',
    textEn: 'Book a Meeting Room',
    actionQueryTh: 'ขอจองห้องประชุม',
    actionQueryEn: 'How can I book a meeting room?',
    badgeTh: 'ยอดนิยม',
    badgeEn: 'Popular'
  },
  {
    id: 'quick-loan',
    textTh: 'ยืมหนังสือได้กี่วัน',
    textEn: 'Borrowing Period',
    actionQueryTh: 'ยืมหนังสือได้กี่วัน',
    actionQueryEn: 'How long can I borrow books?',
    badgeTh: 'ระเบียบ',
    badgeEn: 'Policy'
  },
  {
    id: 'quick-hours',
    textTh: 'วันเวลาทำการของห้องสมุด',
    textEn: 'Operating Hours',
    actionQueryTh: 'วันเวลาทำการของห้องสมุด',
    actionQueryEn: 'What are the library opening hours?',
    badgeTh: 'เวลาทำการ',
    badgeEn: 'Hours'
  },
  {
    id: 'quick-search',
    textTh: 'สืบค้นหนังสือได้อย่างไร',
    textEn: 'Search for Books',
    actionQueryTh: 'สืบค้นหนังสือได้อย่างไร',
    actionQueryEn: 'How do I search for books in the catalog?',
    badgeTh: 'Web OPAC',
    badgeEn: 'OPAC'
  },
  {
    id: 'quick-database',
    textTh: 'ฐานข้อมูลมีอะไรบ้าง',
    textEn: 'Online Databases',
    actionQueryTh: 'ฐานข้อมูลมีอะไรบ้าง',
    actionQueryEn: 'What online databases are available?',
    badgeTh: 'ฐานข้อมูล',
    badgeEn: 'Databases'
  }
];

export const INITIAL_BOT_GREETING = {
  th: {
    title: 'สวัสดีครับ! น้องลูมิ ผู้ช่วย AI ห้องสมุดวิทยาลัยเซนต์หลุยส์',
    name: 'น้องลูมิ (Lumi)',
    subtitle: 'ยินดีให้คำแนะนำข้อมูล ยืม-คืน, จองห้องประชุม, สืบค้นหนังสือ และบริการต่างๆ ครับ~',
    quickTitle: 'บริการยอดนิยม (Quick Access)',
    viewAllFaqs: 'ดูคำถามที่พบบ่อยทั้งหมด',
    inputPlaceholder: 'พิมพ์ข้อความเพื่อสอบถามน้องลูมิ...',
    status: 'ห้องสมุดวิทยาลัยเซนต์หลุยส์ • 24/7',
    categoriesTitle: 'หมวดหมู่คำถาม'
  },
  en: {
    title: 'Hello! I am Lumi, Saint Louis College Library AI Assistant',
    name: 'Lumi the Library Assistant',
    subtitle: 'Ready to help with borrowing rules, room booking, catalog search, and databases~',
    quickTitle: 'Quick Access',
    viewAllFaqs: 'View All FAQs',
    inputPlaceholder: 'Type your message or question here...',
    status: 'Saint Louis College Library • 24/7',
    categoriesTitle: 'FAQ Categories'
  }
};

export function getAutoResponse(query: string, lang: 'th' | 'en'): { textTh: string; textEn: string; links?: { titleTh: string; titleEn: string; url: string }[] } {
  const q = query.toLowerCase();

  // 1. Room Booking
  if (q.includes('จอง') || q.includes('ห้องประชุม') || q.includes('room') || q.includes('booking')) {
    return {
      textTh: '🏢 **การจองห้องประชุมออนไลน์:**\nสามารถจองห้องประชุมเพื่อการเรียนรู้และกิจกรรมกลุ่มได้ผ่านระบบ **SLC Room Booking** ครับ',
      textEn: '🏢 **Meeting Room Reservation:**\nYou can book study and group rooms easily via **SLC Room Booking**.',
      links: [
        { titleTh: 'ระบบจองห้องประชุม SLC Room Booking', titleEn: 'SLC Room Booking System', url: 'https://slc-library.github.io/SLC_RoomBooking/' }
      ]
    };
  }

  // 2. Loan period & rules
  if (q.includes('ยืม') || q.includes('borrow') || q.includes('loan') || q.includes('กี่วัน') || q.includes('คืน')) {
    return {
      textTh: '📚 **ระยะเวลาและสิทธิ์การยืมหนังสือ:**\n• **นักศึกษา ป.ตรี, บุคลากร, หลักสูตรระยะสั้น:** 7 เล่ม / 7 วัน (ต่ออายุออนไลน์ได้ 2 ครั้ง)\n• **นักศึกษา ป.โท:** 10 เล่ม / 14 วัน\n• **คณาจารย์:** 20 เล่ม / 30 วัน\n• ค่าปรับส่งเกินกำหนด 10 บาท/เล่ม/วัน',
      textEn: '📚 **Loan Entitlements & Periods:**\n• **Undergraduates, Staff:** 7 items / 7 days (2 renewals)\n• **Postgraduates:** 10 items / 14 days\n• **Faculty:** 20 items / 30 days\n• Overdue fine: 10 THB/item/day',
      links: [
        { titleTh: 'ระบบ Web OPAC ตรวจสอบรายการยืม', titleEn: 'Web OPAC Catalog', url: 'http://slclib.slc.ac.th/' }
      ]
    };
  }

  // 3. Hours & access
  if (q.includes('เปิด') || q.includes('เวลา') || q.includes('hour') || q.includes('ปิด') || q.includes('ทำการ')) {
    return {
      textTh: '⏰ **เวลาทำการของห้องสมุด วิทยาลัยเซนต์หลุยส์:**\n• **ห้องสมุดกลาง Saint Louis (ฝั่งโรงพยาบาล):** ทุกวัน 10:00 - 19:00 น.\n• **ห้องสมุดสาขา Saint Benedict (ฝั่งอาคารเรียน):** วันจันทร์ - วันศุกร์ 08:00 - 17:00 น.\n• *หมายเหตุ: ปิดทำการในวันหยุดนักขัตฤกษ์*',
      textEn: '⏰ **Library Operating Hours:**\n• **Central Library (Hospital Side):** Daily, 10:00 AM - 7:00 PM\n• **Saint Benedict Branch (Academic Side):** Mon - Fri, 8:00 AM - 5:00 PM\n• *Closed on Public Holidays*'
    };
  }

  // 4. Book search & catalog
  if (q.includes('สืบค้น') || q.includes('ค้นหนังสือ') || q.includes('ค้นหาหนังสือ') || q.includes('opac') || q.includes('catalog')) {
    return {
      textTh: '🔍 **การสืบค้นหนังสือและสิ่งพิมพ์:**\nสามารถสืบค้นได้ผ่านช่องทาง One Search บนเว็บไซต์ หรือระบบ **Web OPAC** เพื่อตรวจสอบสถานะและตำแหน่งหนังสือบนชั้นครับ',
      textEn: '🔍 **Catalog & Book Search:**\nSearch books via the One Search bar or the **Web OPAC** system to check real-time availability and shelf location.',
      links: [
        { titleTh: 'ระบบ Web OPAC', titleEn: 'Web OPAC System', url: 'http://slclib.slc.ac.th/' }
      ]
    };
  }

  // 5. Databases
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

  // 6. Theses
  if (q.includes('วิทยานิพนธ์') || q.includes('thesis') || q.includes('dissertation') || q.includes('digital collection')) {
    return {
      textTh: '🎓 **การสืบค้นวิทยานิพนธ์ฉบับเต็ม:**\nสามารถสืบค้นและดาวน์โหลดวิทยานิพนธ์ฉบับเต็ม (Full-Text) ของวิทยาลัยเซนต์หลุยส์ได้ฟรีผ่านระบบ **SLC Digital Collection** ครับ',
      textEn: '🎓 **Full-Text Theses Access:**\nSearch and download full-text institutional dissertations via the **SLC Digital Collection** portal.',
      links: [
        { titleTh: 'คลังสารสนเทศดิจิทัล (SLC Digital Collection)', titleEn: 'SLC Digital Collection', url: 'https://library.slc.ac.th/lib2025/nav3-1-1-d-collections.php' }
      ]
    };
  }

  // 7. APA 7th
  if (q.includes('apa') || q.includes('บรรณานุกรม') || q.includes('citation')) {
    return {
      textTh: '📖 **คู่มือการเขียนบรรณานุกรม APA 7th Edition:**\nสามารถศึกษาและดาวน์โหลดคู่มือรูปแบบการอ้างอิงและเขียนบรรณานุกรมฉบับสมบูรณ์ได้จากลิงก์นี้ครับ',
      textEn: '📖 **APA 7th Edition Citation Guide:**\nReview and download the comprehensive APA 7th referencing guide via the link below.',
      links: [
        { titleTh: 'ดาวน์โหลดคู่มือ APA 7th (PDF)', titleEn: 'Download APA 7th Guide', url: 'https://drive.google.com/file/d/1NL3hV9xEMXdVDP6elCORzsMWkVgvCvdp/view' }
      ]
    };
  }

  // 8. Purchase recommendation
  if (q.includes('เสนอซื้อ') || q.includes('recommendation') || q.includes('purchase')) {
    return {
      textTh: '🛒 **เสนอซื้อทรัพยากรสารสนเทศเข้าห้องสมุด:**\nสามารถเสนอแนะรายชื่อหนังสือหรือสื่อการเรียนรู้เพื่อให้ห้องสมุดพิจารณาจัดซื้อได้ผ่านแบบฟอร์มออนไลน์ครับ',
      textEn: '🛒 **Library Resource Acquisition Request:**\nRecommend books or educational resources for library acquisition via our online request form.',
      links: [
        { titleTh: 'แบบฟอร์มเสนอซื้อทรัพยากร', titleEn: 'Resource Acquisition Form', url: 'https://library.slc.ac.th/lib2025/nav2-6.php' }
      ]
    };
  }

  // 9. Contact / Librarian
  if (q.includes('บรรณารักษ์') || q.includes('librarian') || q.includes('ติดต่อ') || q.includes('contact') || q.includes('โทร')) {
    return {
      textTh: '📞 **ติดต่องานวิทยบริการ ห้องสมุดวิทยาลัยเซนต์หลุยส์:**\n• **อีเมล:** library@slc.ac.th\n• **โทรศัพท์:** 02-675-5304-12 ต่อ 3101\n• **Facebook:** SLC Lib\n• **LINE OpenChat:** ติดต่อสอบถามได้ทันที',
      textEn: '📞 **Contact Saint Louis College Library:**\n• **Email:** library@slc.ac.th\n• **Phone:** 02-675-5304-12 ext. 3101\n• **Facebook:** SLC Lib\n• **LINE OpenChat:** Live community group',
      links: [
        { titleTh: 'Facebook: SLC Lib', titleEn: 'Facebook Page', url: 'https://www.facebook.com/SLCLib' },
        { titleTh: 'LINE OpenChat', titleEn: 'Join LINE OpenChat', url: 'https://line.me/ti/g2/rJDHa3r305wqq488K1rnMf-5g6U2tdpdYNF4TA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default' }
      ]
    };
  }

  // Generic fallback
  return {
    textTh: `🐑 น้องลูมิ (Lumi) ได้รับข้อความแล้วครับ: **"${query}"**\n\nยินดีให้บริการครับ! สามารถสอบถามข้อมูลเรื่องการยืม-คืน, จองห้องประชุม, เวลาทำการ, วิทยานิพนธ์ หรือฐานข้อมูลออนไลน์ได้ตลอดเวลาครับ 💙`,
    textEn: `🐑 Lumi received your question: **"${query}"**\n\nGlad to assist you with Saint Louis College Library services, catalog lookup, borrowing rules, and research databases! 💙`
  };
}
