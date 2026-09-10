/**
 * ==============================================================================
 * 🐑 LUMI LIBRARY AI CHAT WIDGET - STANDALONE JAVASCRIPT INJECTION SCRIPT
 * Theme: Geometric Balance (Slate Neutral + Deep Blue Accent)
 * Library: งานวิทยบริการและวารสารวิชาการ วิทยาลัยเซนต์หลุยส์ (Saint Louis College Library)
 * Usage: Paste in Chrome DevTools Console, DevTools Local Overrides, or include in <script>
 * ==============================================================================
 */
(function() {
  // Prevent duplicate initialization
  if (window.__LUMI_CHAT_WIDGET_INITIALIZED__) {
    console.log('Lumi Chat Widget is already initialized.');
    if (window.LumiWidget && window.LumiWidget.open) {
      window.LumiWidget.open();
    }
    return;
  }
  window.__LUMI_CHAT_WIDGET_INITIALIZED__ = true;

  // 1. Load Tailwind CSS & Google Fonts if not present
  if (!document.getElementById('lumi-tailwind-cdn')) {
    const twScript = document.createElement('script');
    twScript.id = 'lumi-tailwind-cdn';
    twScript.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(twScript);
  }

  if (!document.getElementById('lumi-google-fonts')) {
    const fontLink = document.createElement('link');
    fontLink.id = 'lumi-google-fonts';
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700&family=Sarabun:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(fontLink);
  }

  // Inject Styles for Typography, Layout & Smooth Animations
  const styleEl = document.createElement('style');
  styleEl.id = 'lumi-custom-styles';
  styleEl.textContent = `
    #lumi-widget-root {
      font-family: 'Sarabun', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      z-index: 999999;
      position: fixed;
      bottom: 24px;
      right: 24px;
      line-height: 1.6;
    }
    #lumi-widget-root * {
      box-sizing: border-box;
    }
    #lumi-widget-root .font-prompt {
      font-family: 'Prompt', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    #lumi-widget-root strong {
      font-weight: 700;
      color: #1e3a8a;
    }
    #lumi-widget-root ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    #lumi-widget-root ::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    #lumi-widget-root ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    #lumi-widget-root ::-webkit-scrollbar-thumb:hover {
      background: #1e3a8a;
    }
    .lumi-bubble-enter {
      animation: lumiFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes lumiFadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .lumi-bubble-content {
      word-break: break-word;
      overflow-wrap: anywhere;
      line-height: 1.65;
    }
    .lumi-link-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.75rem;
      border-radius: 0.75rem;
      background-color: #eff6ff;
      color: #1e3a8a;
      border: 1px solid #bfdbfe;
      font-size: 0.75rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.15s ease-in-out;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
    .lumi-link-btn:hover {
      background-color: #dbeafe;
      border-color: #93c5fd;
      color: #172554;
      transform: translateY(-1px);
    }
  `;
  document.head.appendChild(styleEl);

  // SVG Mascot Helper
  const getLumiMascotSvg = (size = 36, mood = 'happy') => {
    const base = `
      <circle cx="30" cy="32" r="14" fill="#FFFFFF" />
      <circle cx="50" cy="24" r="15" fill="#FFFFFF" />
      <circle cx="70" cy="32" r="14" fill="#FFFFFF" />
      <circle cx="78" cy="50" r="13" fill="#FFFFFF" />
      <circle cx="72" cy="68" r="14" fill="#FFFFFF" />
      <circle cx="50" cy="76" r="15" fill="#FFFFFF" />
      <circle cx="28" cy="68" r="14" fill="#FFFFFF" />
      <circle cx="22" cy="50" r="13" fill="#FFFFFF" />
      <circle cx="50" cy="50" r="32" fill="#F8FAFC" />
      <ellipse cx="18" cy="46" rx="9" ry="5" fill="#F1F5F9" transform="rotate(-25 18 46)" />
      <ellipse cx="18" cy="46" rx="5" ry="3" fill="#FBCFE8" transform="rotate(-25 18 46)" />
      <ellipse cx="82" cy="46" rx="9" ry="5" fill="#F1F5F9" transform="rotate(25 82 46)" />
      <ellipse cx="82" cy="46" rx="5" ry="3" fill="#FBCFE8" transform="rotate(25 82 46)" />
      <ellipse cx="50" cy="53" rx="23" ry="19" fill="#FFF1F2" />
      <circle cx="42" cy="34" r="7" fill="#FFFFFF" />
      <circle cx="58" cy="34" r="7" fill="#FFFFFF" />
    `;
    const cheeks = `
      <circle cx="33" cy="57" r="4.5" fill="#FDA4AF" opacity="0.7" />
      <circle cx="67" cy="57" r="4.5" fill="#FDA4AF" opacity="0.7" />
    `;
    const cap = `
      <path d="M40 22 L50 17 L60 22 L50 26 Z" fill="#1E3A8A" stroke="#38BDF8" stroke-width="1" />
      <circle cx="50" cy="17" r="1.2" fill="#F59E0B" />
      <circle cx="59" cy="25" r="1" fill="#F59E0B" />
    `;
 
    const moods = {
      happy: `
        <ellipse cx="40" cy="51" rx="3.5" ry="4" fill="#0B192C" />
        <circle cx="38.5" cy="49" r="1.3" fill="#FFFFFF" />
        <ellipse cx="60" cy="51" rx="3.5" ry="4" fill="#0B192C" />
        <circle cx="58.5" cy="49" r="1.3" fill="#FFFFFF" />
        ${cheeks}
        <ellipse cx="50" cy="57" rx="2" ry="1.4" fill="#FB7185" />
        <path d="M46 59 Q48 62 50 60 Q52 62 54 59" stroke="#0F172A" stroke-width="1.6" stroke-linecap="round" fill="none" />
        ${cap}
      `,
      thinking: `
        <ellipse cx="41" cy="50" rx="3.5" ry="4" fill="#0F172A" />
        <circle cx="39.5" cy="48.5" r="1.1" fill="#FFFFFF" />
        <path d="M57 49 Q61 46 65 49" stroke="#0F172A" stroke-width="2.3" stroke-linecap="round" fill="none" />
        ${cheeks}
        <path d="M47 60 Q50 58 53 60" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" fill="none" />
        ${cap}
        <circle cx="76" cy="20" r="1.6" fill="#CBD5E1" />
        <circle cx="81" cy="14" r="2.4" fill="#CBD5E1" />
      `,
      smart: `
        <ellipse cx="40" cy="51" rx="3.5" ry="4" fill="#0B192C" />
        <circle cx="38.5" cy="49" r="1.3" fill="#FFFFFF" />
        <ellipse cx="60" cy="51" rx="3.5" ry="4" fill="#0B192C" />
        <circle cx="58.5" cy="49" r="1.3" fill="#FFFFFF" />
        ${cheeks}
        <ellipse cx="50" cy="57" rx="2" ry="1.4" fill="#FB7185" />
        <path d="M46 59 Q48 62 50 60 Q52 62 54 59" stroke="#0F172A" stroke-width="1.6" stroke-linecap="round" fill="none" />
        <g stroke="#D97706" stroke-width="1.5" fill="none">
          <circle cx="40" cy="51" r="5.5" />
          <circle cx="60" cy="51" r="5.5" />
          <path d="M46 51 L54 51" />
        </g>
        ${cap}
      `,
      waving: `
        <path d="M36 50 Q40 46 44 50" stroke="#0B192C" stroke-width="2.6" stroke-linecap="round" fill="none" />
        <path d="M56 50 Q60 46 64 50" stroke="#0B192C" stroke-width="2.6" stroke-linecap="round" fill="none" />
        ${cheeks}
        <path d="M44 58 Q50 65 56 58" stroke="#0F172A" stroke-width="1.7" stroke-linecap="round" fill="none" />
        ${cap}
        <ellipse cx="85" cy="61" rx="5" ry="7" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" transform="rotate(20 85 61)" />
      `,
      sleepy: `
        <path d="M36 51 Q40 53 44 51" stroke="#0B192C" stroke-width="1.8" stroke-linecap="round" fill="none" />
        <path d="M56 51 Q60 53 64 51" stroke="#0B192C" stroke-width="1.8" stroke-linecap="round" fill="none" />
        ${cheeks}
        <ellipse cx="50" cy="59" rx="2.3" ry="1.6" fill="#0F172A" opacity="0.85" />
        ${cap}
        <text x="76" y="22" font-family="Arial" font-size="6" font-weight="bold" fill="#93C5FD">z</text>
        <text x="82" y="15" font-family="Arial" font-size="8" font-weight="bold" fill="#93C5FD">Z</text>
      `,
      surprised: `
        <circle cx="40" cy="51" r="4.2" fill="#0B192C" />
        <circle cx="38.5" cy="49" r="1.4" fill="#FFFFFF" />
        <circle cx="60" cy="51" r="4.2" fill="#0B192C" />
        <circle cx="58.5" cy="49" r="1.4" fill="#FFFFFF" />
        ${cheeks}
        <ellipse cx="50" cy="60" rx="2.6" ry="3.4" fill="#0F172A" />
        ${cap}
        <text x="80" y="22" font-family="Arial" font-size="11" font-weight="bold" fill="#FBBF24">!</text>
      `
    };
 
    const face = moods[mood] || moods.happy;
 
    return `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="drop-shadow-xs">
      ${base}
      ${face}
    </svg>
  `;
  };

  // Knowledge Base FAQs (SLC Library Data)
  const FAQS = [
    {
      id: 1,
      catTh: 'บริการยืม-คืน',
      catEn: 'Circulation',
      qTh: 'ยืมหนังสือได้กี่วัน?',
      qEn: 'What is the loan period?',
      aTh: '📚 **สิทธิ์การยืมหนังสือ (Loan Policy):**\n**• นักศึกษา ป.ตรี, บุคลากร, หลักสูตรระยะสั้น:** 7 เล่ม / 7 วัน\n**• นักศึกษา ป.โท:** 10 เล่ม / 14 วัน\n**• คณาจารย์:** 20 เล่ม / 30 วัน\n<strong style="color: #16a34a;">• ต่ออายุออนไลน์ได้ 2 ครั้ง</strong>\n ค่าปรับส่งเกินกำหนด: 10 บาท/เล่ม/วัน\nสามารถต่ออายุออนไลน์ได้ด้วยตนเองผ่านระบบ Web OPAC ก่อนครบกำหนดส่งครับ',
      aEn: '📚 **Borrowing Entitlement:**\n**• Undergraduates, staff, short-course participants:** 7 items / 7 days \n**• Postgraduates:** 10 items / 14 days\n**• Faculty:** 20 items / 30 days\n• 2 renewals\n** Overdue fine: 10 THB/item/day\nYou can renew online via Web OPAC before the due date.',
      links: [
        { titleTh: 'เข้าสู่ระบบ Web OPAC', titleEn: 'Web OPAC System', url: 'http://slclib.slc.ac.th/' }
      ]
    },
    {
      id: 2,
      catTh: 'จองห้องประชุม',
      catEn: 'Room Reservation',
      qTh: 'จองห้องประชุมออนไลน์ได้อย่างไร?',
      qEn: 'How can I book a meeting room online?',
      aTh: '📝 **การจองห้องประชุมออนไลน์:**\nสามารถจองได้สะดวกรวดเร็วผ่านระบบจองห้องประชุมออนไลน์ของห้องสมุด โดยคลิกที่ลิงก์ด้านล่างนี้ได้เลยครับ~',
      aEn: '📝 **Room Reservation:**\nYou can book through the Library Online Room Reservation system by clicking the link below:',
      links: [
        { titleTh: 'ระบบจองห้องประชุม Conference Room Booking', titleEn: 'SLC Conference Room Booking', url: 'https://slc-library.github.io/SLC_RoomBooking/' }
      ]
    },
    {
      id: 3,
      catTh: 'ฐานข้อมูลออนไลน์',
      catEn: 'Databases',
      qTh: 'รหัสผ่านฐานข้อมูลออนไลน์?',
      qEn: 'What is the password for online database access?',
	    aTh: "🔑 **รหัสผ่านฐานข้อมูลออนไลน์:**\n• สำหรับนักศึกษา, คณาจารย์และบุคลากรของวิทยาลัยเซนต์หลุย์ \n(เข้าถึงด้วย SLC Mail)",
      aEn: '🔑 **Online Database Password:**\n• For Students, Faculty and Staff of Saint Louis College (Access with SLC Mail)',
      links: [
        { titleTh: 'รหัสผ่านฐานข้อมูลออนไลน์', titleEn: 'Online Database Password', url: 'https://drive.google.com/file/d/1t2GBJjmyI2Pk5_objWsqQwXuju6KhlFO/view' }
      ]
    },
    {
      id: 4,
      catTh: 'เวลาทำการ',
      catEn: 'Hours & Access',
      qTh: 'เวลาเปิด-ปิดทำการของห้องสมุด?',
      qEn: 'What are the library operating hours?',
	    aTh: '⏰ **เวลาทำการของห้องสมุด วิทยาลัยเซนต์หลุยส์:**\n• **ห้องสมุดกลาง Saint Louis (ฝั่งโรงพยาบาล):**\n&nbsp;&nbsp; ทุกวัน 10:00 - 19:00 น.\n• **ห้องสมุดสาขา Saint Benedict (ฝั่งอาคารเรียน):**\n&nbsp;&nbsp; วันจันทร์ - วันศุกร์ 08:00 - 17:00 น.\n&nbsp;&nbsp; <span style=\"color: red;\">หมายเหตุ: * ปิดทำการในวันหยุดนักขัตฤกษ์ *</span> \n• **ปฏิทินห้องสมุด:** สามารถตรวจสอบวันหยุดและกิจกรรมได้ที่ลิงก์ด้านล่าง',
      aEn: '⏰ **Library Operating Hours:**\n• **Central Library (Hospital Side):** Daily, 10:00 AM - 7:00 PM\n• **Saint Benedict (Academic Side):** Mon - Fri, 8:00 AM - 5:00 PM\n&nbsp;&nbsp;* Closed on Public Holidays * \n• **Library Calendar:** Check for holidays and events via the link below',
      links: [
          { titleTh: 'เว็บไซต์ห้องสมุด', titleEn: 'Library Website', url: 'https://library.slc.ac.th/' }
        ]
    },
    {
      id: 5,
      catTh: 'วิทยานิพนธ์',
      catEn: 'Theses & Dissertations',
      qTh: 'ค้นหาวิทยานิพนธ์ฉบับเต็มของวิทยาลัยได้อย่างไร?',
      qEn: 'How to access institutional theses full-text?',
      aTh: '🎓 คุณสามารถสืบค้นและดาวน์โหลดวิทยานิพนธ์และงานนิพนธ์ฉบับเต็มได้ฟรี \nผ่านระบบ **คลังสารสนเทศดิจิทัล วิทยาลัยเซนต์หลุยส์ (SLC Digital Collection)** ตามลิงก์ด้านล่างนี้ครับ',
      aEn: '🎓 Access and download full-text institutional dissertations via\n **The Saint Louis College Digital Collections (SLC Digital Collection)**:',
      links: [
        { titleTh: 'คลังสารสนเทศดิจิทัล (SLC Digital Collection)', titleEn: 'SLC Digital Collection', url: 'https://library.slc.ac.th/lib2025/nav3-1-1-d-collections.php' }
      ]
    },
    {
      id: 6,
      catTh: 'ฐานข้อมูลออนไลน์',
      catEn: 'Databases',
      qTh: 'ใช้งานฐานข้อมูลออนไลน์จากนอกวิทยาลัยได้อย่างไร?',
      qEn: 'How to access online databases off-campus?',
      aTh: '🌐 **การเข้าใช้งานฐานข้อมูลออนไลน์ (CINAHL, CU-eLibrary, IG Library, Scientific e-Resources):**\n1. เลือกฐานข้อมูลที่ต้องการจากหน้าเว็บไซต์ห้องสมุด\n2. เข้าสู่ระบบด้วยบัญชีของวิทยาลัย (ดูรหัสผ่านได้จากเอกสารคู่มือ)',
      aEn: '🌐 **Accessing Online Databases (CINAHL, CU-eLibrary, IG Library, Scientific e-Resources):**\n1. Select your database from the library website\n2. Sign in using your college account credentials (refer to password guide)',
      links: [
        { titleTh: 'หน้ารวมฐานข้อมูล (Digital Resources)', titleEn: 'Digital Resources Portal', url: 'https://library.slc.ac.th/lib2025/nav1-1-e-databases.php' },
        { titleTh: 'ดูรหัสผ่านฐานข้อมูล (Google Drive)', titleEn: 'View Database Passwords', url: 'https://drive.google.com/file/d/1t2GBJjmyI2Pk5_objWsqQwXuju6KhlFO/view?usp=sharing' }
      ]
    },
    {
      id: 7,
      catTh: 'การยืมต่อ (Renew)',
      catEn: 'Online Renewal',
      qTh: 'การยืมหนังสือต่อออนไลน์ทำอย่างไร?',
      qEn: 'How do I renew borrowed books online?',
      aTh: '🔄 **ขั้นตอนการยืมต่อออนไลน์ด้วยตนเอง:**\n1. เข้าสู่ระบบ Web OPAC\n2. Log in ด้วยรหัสคณะ (เช่น Nu, Pt, Psy) ตามด้วยรหัสนักศึกษา/อาจารย์/บุคลากร\n3. ไปที่รายการหนังสือที่กำลังยืม แล้วคลิก **"Renew"**',
      aEn: '🔄 **Online Renewal Steps:**\n1. Go to the Web OPAC system\n2. Log in with faculty prefix (Nu, Pt, Psy) followed by ID number\n3. Select your borrowed items and click **"Renew"**',
      links: [
        { titleTh: 'เข้าสู่ระบบ Web OPAC', titleEn: 'Web OPAC System', url: 'http://slclib.slc.ac.th/' },
        { titleTh: 'คู่มือการยืมต่อ', titleEn: 'Online Renewal Guide', url: 'https://library.slc.ac.th/lib2025/guides_training_detail.php?id=8' }
      ]
    }
  ];

  // Resources Tab Data
  const RESOURCES = [
    {
      id: 1,
      titleTh: 'Web OPAC ระบบสืบค้นหนังสือ',
      titleEn: 'Web OPAC (Library Catalog)',
      descTh: 'สืบค้นหนังสือ สิ่งพิมพ์ และสื่อการเรียนรู้ในห้องสมุด',
      descEn: 'Search books, periodicals, and media in the library.',
      url: 'http://slclib.slc.ac.th/',
      query: 'สืบค้นหนังสือได้อย่างไร'
    },
    {
      id: 2,
      titleTh: 'SLC Digital Collection',
      titleEn: 'SLC Digital Collection',
      descTh: 'คลังสารสนเทศและวิทยานิพนธ์ดิจิทัลฉบับเต็ม',
      descEn: 'Institutional Repository and full-text theses.',
      url: 'https://library.slc.ac.th/lib2025/nav3-1-1-d-collections.php',
      query: 'วิทยานิพนธ์ฉบับเต็ม'
    },
    {
      id: 3,
      titleTh: 'Citation Guide APA 7th',
      titleEn: 'Citation Guide APA 7th',
      descTh: 'คู่มือแนะนำการเขียนบรรณานุกรมฉบับสมบูรณ์',
      descEn: 'Bibliography and reference formatting guide.',
      url: 'https://drive.google.com/file/d/1NL3hV9xEMXdVDP6elCORzsMWkVgvCvdp/view',
      query: 'คู่มือการเขียนบรรณานุกรม APA 7th'
    },
    {
      id: 4,
      titleTh: 'CINAHL Database',
      titleEn: 'CINAHL Database',
      descTh: 'ฐานข้อมูลการวิจัยด้านสุขภาพ',
      descEn: 'Health science research database.',
      url: 'https://research.ebsco.com/c/f26r7l/search',
      query: 'ฐานข้อมูล CINAHL'
    },
    {
      id: 5,
      titleTh: 'CU-eLibrary',
      titleEn: 'CU-eLibrary',
      descTh: 'โดยศูนย์หนังสือจุฬาลงกรณ์มหาวิทยาลัย',
      descEn: 'Provided by Chulalongkorn University Book Center.',
      url: 'https://elibrary-slclibrary.cu-elibrary.com/',
      query: 'CU-eLibrary'
    },
    {
      id: 6,
      titleTh: 'iG Library',
      titleEn: 'iG Library',
      descTh: 'พัฒนาโดย iG Publishing',
      descEn: 'iG Publishing eBook Platform.',
      url: 'https://portal.igpublish.com/search',
      query: 'iG Library'
    },
    {
      id: 7,
      titleTh: 'Scientific e - Resources',
      titleEn: 'Scientific e - Resources',
      descTh: 'คลังทรัพยากรวิทยาศาสตร์ดิจิทัล',
      descEn: 'Digital scientific resources repository.',
      url: 'https://ser-infotech.com/',
      query: 'Scientific e - Resources'
    },
    {
      id: 8,
      titleTh: 'ThaiLis',
      titleEn: 'ThaiLis',
      descTh: 'ฐานข้อมูลเอกสารฉบับเต็มในรูปแบบอิเล็กทรอนิกส์',
      descEn: 'Thai Digital Collection.',
      url: 'https://tdc.thailis.or.th/tdc/basic.php',
      query: 'ThaiLis'
    },
  ];

  // Create Container
  const container = document.createElement('div');
  container.id = 'lumi-widget-root';
  document.body.appendChild(container);

  // State
  let currentLang = 'th';
  let isWidgetOpen = false;
  let isFaqOpen = false;
  let currentView = 'chat'; // 'chat' | 'resources' | 'librarian' | 'guide'

  // Render HTML Structure
  container.innerHTML = `
    <!-- Floating Trigger Bubble Button -->
    <button 
      id="lumi-floating-trigger"
      class="p-3.5 rounded-full bg-blue-900 hover:bg-blue-800 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 ring-4 ring-blue-900/20 border-2 border-white flex items-center gap-3 cursor-pointer select-none"
      title="ถามน้องลูมิ (Lumi Library AI)"
    >
      <div class="relative w-10 h-10 flex items-center justify-center bg-blue-700 rounded-full p-0.5 shadow-xs ">
        ${getLumiMascotSvg(36,'happy')}
        <div class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-blue-900"></div>
      </div>
      <div class="hidden sm:flex flex-col text-left pr-2">
        <span class="text-sm font-bold font-prompt leading-tight text-white">ถามน้องลูมิ (Lumi AI)</span>
        <span class="text-[10px] text-blue-200 uppercase tracking-widest font-semibold">SLC Library</span>
      </div>
    </button>

    <!-- Main Widget Window (Balanced Proportion) -->
    <div 
      id="lumi-main-window"
      class="hidden w-[94vw] sm:w-[480px] md:w-[680px] lg:w-[740px] h-[86vh] max-h-[740px] bg-white text-slate-800 shadow-2xl border border-slate-200 ring-4 ring-blue-900/10 rounded-3xl overflow-hidden flex flex-row transition-all duration-300 select-text"
    >
      <!-- 1. LEFT ICON SIDEBAR (Symmetrical, Single Purpose: Navigation & Actions) -->
      <aside class="w-14 sm:w-16 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-4 justify-between select-none z-20 flex-shrink-0">
        <div class="flex flex-col items-center gap-3 w-full">
        

          <div class="w-7 h-px bg-slate-800 my-1"></div>

          <!-- Navigation Icons Stack (Clean, equal dimensions) -->
          <!-- 1. Chat Tab -->
          <button 
            id="lumi-tab-chat-btn"
            class="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-900 text-white shadow-md ring-2 ring-blue-400/40 cursor-pointer transition-all"
            title="กล่องแชท / Chat"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          </button>

          <!-- 2. FAQs Drawer Toggle -->
          <button 
            id="lumi-tab-faq-btn"
            class="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
            title="คำถามที่พบบ่อย (FAQs)"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-400 rounded-full"></span>
          </button>

          <!-- 3. Resources Tab -->
          <button 
            id="lumi-tab-resources-btn"
            class="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
            title="ทรัพยากรห้องสมุด / Resources"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
          </button>

          <!-- 4. Ask a Librarian Tab -->
          <button 
            id="lumi-tab-librarian-btn"
            class="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
            title="ติดต่อบรรณารักษ์ / Ask a Librarian"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 18v-6a9 9 0 0118 0v6"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>
          </button>

          <!-- 5. Guide & Rules Tab -->
          <button 
            id="lumi-tab-guide-btn"
            class="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
            title="ระเบียบและเวลาทำการ / Guide"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          </button>
        </div>

        <!-- Reset / Clear Button (Bottom aligned) -->
        <button 
          id="lumi-reset-btn"
          class="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="ล้างบทสนทนา / Clear Chat"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
        </button>
      </aside>

      <!-- 2. MAIN CHAT / CONTENT BODY -->
      <main class="flex-1 flex flex-col h-full bg-slate-50 relative min-w-0">
        <!-- Top App Bar Header (Deep Blue header, Symmetrical distribution) -->
        <header class="bg-blue-900 text-white px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between flex-shrink-0 shadow-md">
          <!-- Left: Avatar + Title + Organization -->
          <div class="flex items-center gap-3 min-w-0">
            <div class="relative w-10 h-10 sm:w-11 sm:h-11 bg-rose-900 rounded-full flex items-center justify-center p-0.5 shadow-xs flex-shrink-0">
              ${getLumiMascotSvg(36,'happy')}
              <div class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-blue-900"></div>
            </div>
            <div class="min-w-0">
              <h3 id="lumi-header-title" class="font-prompt font-bold text-sm sm:text-base text-white tracking-tight truncate">Lumi (ลูมิ)</h3>
              <p id="lumi-header-status" class="text-[10px] sm:text-[11px] text-blue-200 font-medium truncate mt-0.5">ห้องสมุดวิทยาลัยเซนต์หลุยส์ • Saint Louis College</p>
            </div>
          </div>

          <!-- Right: ONLY ONE Language Switcher + Window Actions -->
          <div class="flex items-center gap-2 flex-shrink-0">
            <!-- Segmented TH / EN Switcher (Single source of truth) -->
            <div class="flex items-center bg-blue-950/40 p-1 rounded-xl border border-blue-700/50">
              <button id="lumi-seg-th" class="px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all bg-white text-blue-900 shadow-xs cursor-pointer">TH</button>
              <button id="lumi-seg-en" class="px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all text-blue-200 hover:text-white cursor-pointer">EN</button>
            </div>

            <!-- Minimize & Close Buttons -->
            <div class="flex items-center gap-1 pl-1 border-l border-blue-800/70">
              <button id="lumi-minimize-btn" class="w-8 h-8 rounded-lg flex items-center justify-center text-blue-200 hover:text-white hover:bg-blue-800/80 transition-colors cursor-pointer" title="ย่อหน้าต่าง / Minimize">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5"/></svg>
              </button>
              <button id="lumi-close-btn" class="w-8 h-8 rounded-lg flex items-center justify-center text-blue-200 hover:text-white hover:bg-blue-800/80 transition-colors cursor-pointer" title="ปิด / Close">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
        </header>

        <!-- CHAT VIEW WRAPPER -->
        <div id="lumi-chat-view" class="flex-1 flex flex-col min-h-0">
          <!-- Messages Feed (Centered Container for Symmetrical Layout & Comfortable Reading) -->
          <div id="lumi-messages-box" class="flex-1 overflow-y-auto p-4 sm:p-5">
            <div class="max-w-2xl mx-auto w-full space-y-4">
              <!-- Symmetrical Hero Card -->
              <div id="lumi-hero-card" class="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
                <!-- Header with Mascot -->
                <div class="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                  <div class="w-12 h-12 bg-blue-800 border border-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 p-1">
                    ${getLumiMascotSvg(44,'waving')}
                  </div>
                  <div>
                    <h2 id="lumi-hero-title" class="font-prompt font-bold text-sm sm:text-base text-slate-800 leading-snug">
                      สวัสดีครับ 😊 น้องลูมิ ผู้ช่วย AI ห้องสมุดวิทยาลัยเซนต์หลุยส์
                    </h2>
                    <p id="lumi-hero-sub" class="text-xs sm:text-[13px] text-slate-600 mt-0.5 leading-relaxed">
                      ยินดีให้คำแนะนำเกี่ยวกับบริการต่างๆของห้องสมุดครับ~
                    </p>
                  </div>
                </div>

                <!-- Symmetrical 2-Column Quick Access Grid -->
                <div class="mt-3.5">
                  <span id="lumi-quick-label" class="text-[11px] font-bold text-blue-900 font-prompt block mb-2.5 uppercase tracking-wider">
                    ⚡ บริการยอดนิยม (Quick Access)
                  </span>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                    <!-- Item 1: Room Booking -->
                    <button onclick="window.LumiWidget.sendMessage('ขอจองห้องประชุม')" class="text-left p-3 rounded-xl bg-slate-50/80 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between group cursor-pointer shadow-2xs">
                      <div class="flex items-center gap-2 min-w-0 pr-1">
                        <span class="text-base flex-shrink-0">🏢</span>
                        <span class="text-xs sm:text-[13px] text-slate-700 font-medium group-hover:text-blue-900 truncate lumi-quick-1">ขอจองห้องประชุม</span>
                      </div>
                      <span class="px-2 py-0.5 text-[9px] font-bold bg-blue-100 text-blue-900 border border-blue-200 rounded-full flex-shrink-0">ยอดนิยม</span>
                    </button>

                    <!-- Item 2: Borrowing Period -->
                    <button onclick="window.LumiWidget.sendMessage('ยืมหนังสือได้กี่วัน')" class="text-left p-3 rounded-xl bg-slate-50/80 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between group cursor-pointer shadow-2xs">
                      <div class="flex items-center gap-2 min-w-0 pr-1">
                        <span class="text-base flex-shrink-0">📚</span>
                        <span class="text-xs sm:text-[13px] text-slate-700 font-medium group-hover:text-blue-900 truncate lumi-quick-2">ยืมหนังสือได้กี่วัน</span>
                      </div>
                      <span class="px-2 py-0.5 text-[9px] font-bold bg-slate-200/80 text-slate-700 rounded-full flex-shrink-0">ระเบียบ</span>
                    </button>

                    <!-- Item 3: Library Hours -->
                    <button onclick="window.LumiWidget.sendMessage('วันเวลาทำการของห้องสมุด')" class="text-left p-3 rounded-xl bg-slate-50/80 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between group cursor-pointer shadow-2xs">
                      <div class="flex items-center gap-2 min-w-0 pr-1">
                        <span class="text-base flex-shrink-0">⏰</span>
                        <span class="text-xs sm:text-[13px] text-slate-700 font-medium group-hover:text-blue-900 truncate lumi-quick-3">วันเวลาทำการของห้องสมุด</span>
                      </div>
                      <span class="px-2 py-0.5 text-[9px] font-bold bg-slate-200/80 text-slate-700 rounded-full flex-shrink-0">เวลาทำการ</span>
                    </button>

                    <!-- Item 4: Book Search -->
                    <button onclick="window.LumiWidget.sendMessage('สืบค้นหนังสือได้อย่างไร')" class="text-left p-3 rounded-xl bg-slate-50/80 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between group cursor-pointer shadow-2xs">
                      <div class="flex items-center gap-2 min-w-0 pr-1">
                        <span class="text-base flex-shrink-0">🔍</span>
                        <span class="text-xs sm:text-[13px] text-slate-700 font-medium group-hover:text-blue-900 truncate lumi-quick-4">สืบค้นหนังสือได้อย่างไร</span>
                      </div>
                      <span class="px-2 py-0.5 text-[9px] font-bold bg-slate-200/80 text-slate-700 rounded-full flex-shrink-0">Web OPAC</span>
                    </button>

                    <!-- Item 5: Databases -->
                    <button onclick="window.LumiWidget.sendMessage('ฐานข้อมูลมีอะไรบ้าง')" class="text-left p-3 rounded-xl bg-slate-50/80 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between group cursor-pointer shadow-2xs">
                      <div class="flex items-center gap-2 min-w-0 pr-1">
                        <span class="text-base flex-shrink-0">🌐</span>
                        <span class="text-xs sm:text-[13px] text-slate-700 font-medium group-hover:text-blue-900 truncate lumi-quick-5">ฐานข้อมูลมีอะไรบ้าง</span>
                      </div>
                      <span class="px-2 py-0.5 text-[9px] font-bold bg-slate-200/80 text-slate-700 rounded-full flex-shrink-0">ฐานข้อมูล</span>
                    </button>

                    <!-- Item 6: View All FAQs (Symmetrical Grid Completion) -->
                    <button id="lumi-hero-faqs-link" class="text-left p-3 rounded-xl bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200 transition-all flex items-center justify-between group cursor-pointer shadow-2xs">
                      <div class="flex items-center gap-2 min-w-0 pr-1">
                        <span class="text-base flex-shrink-0">❓</span>
                        <span id="lumi-view-all-label" class="text-xs sm:text-[13px] text-blue-900 font-semibold truncate">ดูคำถามที่พบบ่อยทั้งหมด</span>
                      </div>
                      <svg class="w-4 h-4 text-blue-900 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Dynamic Chat Bubbles Feed -->
              <div id="lumi-dynamic-feed" class="space-y-3.5"></div>

              <!-- Typing Indicator -->
              <div id="lumi-typing-indicator" class="hidden flex items-end gap-2.5 pt-1">
                <div class="w-7 h-7 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center shadow-xs">
                  <span class="text-[10px] font-bold text-blue-900">L</span>
                </div>
                <div class="bg-white border border-slate-200 px-4 py-2.5 rounded-2xl rounded-bl-none flex items-center gap-2 text-xs text-slate-600 shadow-xs">
                  <span class="w-1.5 h-1.5 rounded-full bg-blue-900 animate-bounce" style="animation-delay: 0ms"></span>
                  <span class="w-1.5 h-1.5 rounded-full bg-blue-900 animate-bounce" style="animation-delay: 150ms"></span>
                  <span class="w-1.5 h-1.5 rounded-full bg-blue-900 animate-bounce" style="animation-delay: 300ms"></span>
                  <span id="lumi-typing-text" class="ml-1 text-slate-500 font-medium">น้องลูมิกำลังค้นหาข้อมูลห้องสมุด...</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Symmetrical Input Area -->
          <div class="p-3 sm:p-4 bg-white border-t border-slate-100 flex flex-col gap-1.5 flex-shrink-0">
            <div class="max-w-2xl mx-auto w-full">
              <form id="lumi-input-form" class="flex items-center gap-2 bg-slate-100/90 rounded-2xl px-3.5 py-1.5 border border-slate-200 focus-within:border-blue-900 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-900/10 transition-all">
                <input 
                  type="text" 
                  id="lumi-chat-input"
                  placeholder="พิมพ์ข้อความเพื่อสอบถามน้องลูมิ..."
                  class="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 py-1.5 focus:outline-none"
                  autocomplete="off"
                />
            <button 
                type="submit"
                class="w-9 h-9 rounded-xl bg-blue-900 hover:bg-blue-800 text-white shadow-xs transition-all flex items-center justify-center cursor-pointer shrink-0"
                title="ส่งข้อความ / Send"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3 21l18-9L3 3l3 9zm0 0h7" />
                </svg>
              </button>
              </form>
              <div class="text-center mt-1.5">
                <span class="text-[9px] text-slate-400 font-medium">Lumi Library AI • งานวิทยบริการและวารสารวิชาการ วิทยาลัยเซนต์หลุยส์</span>
              </div>
            </div>
          </div>
        </div>
        <!-- END CHAT VIEW WRAPPER -->

        <!-- FAQ VIEW (Dedicated Full Symmetrical View) -->
        <div id="lumi-faq-view" class="hidden flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          <div class="max-w-2xl mx-auto w-full space-y-4">
            <!-- Header with Back to Chat -->
            <div class="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 id="lumi-faq-view-title" class="font-prompt font-bold text-base sm:text-lg text-slate-800 flex items-center gap-2">
                  <span>คำถามที่พบบ่อย (FAQs)</span>
                  <span id="lumi-faq-count-badge" class="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-medium">10 คำถาม</span>
                </h3>
                <p id="lumi-faq-view-sub" class="text-xs text-slate-500 mt-0.5">คลิกเลือกคำถามเพื่อให้ระบบถามน้องลูมิในแชททันที</p>
              </div>
              <button id="lumi-faq-back-btn" class="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                <span id="lumi-faq-back-label">กลับไปที่แชท</span>
              </button>
            </div>

            <!-- Search Bar -->
            <div class="relative">
              <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input 
                type="text" 
                id="lumi-faq-search-input"
                placeholder="ค้นหาคำถาม เช่น ยืมหนังสือ, จองห้องประชุม, วิทยานิพนธ์, ฐานข้อมูล..."
                class="w-full pl-10 pr-4 py-2.5 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 shadow-2xs"
              />
            </div>

            <!-- Category Pills Filter -->
            <div id="lumi-faq-categories" class="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <!-- Populated by JS -->
            </div>

            <!-- FAQ Items Cards List -->
            <div id="lumi-faq-items-list" class="space-y-2.5 pt-1">
              <!-- Populated by JS -->
            </div>
          </div>
        </div>

        <!-- RESOURCES VIEW -->
        <div id="lumi-resources-view" class="hidden flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          <div class="max-w-2xl mx-auto w-full space-y-4">
            <div class="border-b border-slate-200 pb-3">
              <h3 id="lumi-resources-title" class="font-prompt font-bold text-base sm:text-lg text-slate-800">ทรัพยากรและบริการห้องสมุด</h3>
              <p id="lumi-resources-sub" class="text-xs text-slate-500 mt-0.5">เข้าถึงสิ่งพิมพ์, e-resources, ฐานข้อมูล, และบริการต่างๆ ของวิทยาลัยเซนต์หลุยส์</p>
            </div>
            <div id="lumi-resources-list" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Populated by JS -->
            </div>
          </div>
        </div>

        <!-- ASK A LIBRARIAN VIEW -->
        <div id="lumi-librarian-view" class="hidden flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          <div class="max-w-2xl mx-auto w-full space-y-4">
            <div class="border-b border-slate-200 pb-3">
              <h3 id="lumi-librarian-title" class="font-prompt font-bold text-base sm:text-lg text-slate-800">ติดต่อบรรณารักษ์</h3>
              <p id="lumi-librarian-sub" class="text-xs text-slate-500 mt-0.5">ช่องทางติดต่อเจ้าหน้าที่งานวิทยบริการโดยตรง</p>
            </div>
            <div id="lumi-librarian-content" class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <!-- Populated by JS -->
            </div>
          </div>
        </div>

        <!-- GUIDE VIEW -->
        <div id="lumi-guide-view" class="hidden flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          <div class="max-w-2xl mx-auto w-full space-y-4">
            <div class="border-b border-slate-200 pb-3">
              <h3 id="lumi-guide-title" class="font-prompt font-bold text-base sm:text-lg text-slate-800">ระเบียบและเวลาทำการของห้องสมุด</h3>
              <p class="text-xs text-slate-500 mt-0.5">ข้อมูลเวลาเปิด-ปิด และระเบียบการยืมคืนหนังสือ</p>
            </div>
            <div id="lumi-guide-content" class="space-y-3 text-xs sm:text-[13px]">
              <!-- Populated by JS -->
            </div>
          </div>
        </div>
      </main>
    </div>
  `;

  // UI Element References
  const floatingBtn = document.getElementById('lumi-floating-trigger');
  const mainWindow = document.getElementById('lumi-main-window');
  const chatInput = document.getElementById('lumi-chat-input');
  const inputForm = document.getElementById('lumi-input-form');
  const dynamicFeed = document.getElementById('lumi-dynamic-feed');
  const typingIndicator = document.getElementById('lumi-typing-indicator');
  const messagesBox = document.getElementById('lumi-messages-box');
  const chatView = document.getElementById('lumi-chat-view');
  const faqView = document.getElementById('lumi-faq-view');
  const faqItemsList = document.getElementById('lumi-faq-items-list');
  const faqCategoriesContainer = document.getElementById('lumi-faq-categories');
  const faqSearchInput = document.getElementById('lumi-faq-search-input');
  const faqBackBtn = document.getElementById('lumi-faq-back-btn');
  const resourcesView = document.getElementById('lumi-resources-view');
  const librarianView = document.getElementById('lumi-librarian-view');
  const guideView = document.getElementById('lumi-guide-view');
  const resourcesList = document.getElementById('lumi-resources-list');
  const librarianContent = document.getElementById('lumi-librarian-content');
  const guideContent = document.getElementById('lumi-guide-content');

  let selectedFaqCategory = 'all';

  const FAQ_CATEGORIES = [
    { id: 'all', nameTh: 'ทั้งหมด', nameEn: 'All Topics' },
    { id: 'borrow', nameTh: 'การยืม-คืน & เวลา', nameEn: 'Borrowing & Hours' },
    { id: 'room', nameTh: 'จองห้องประชุม', nameEn: 'Room Booking' },
    { id: 'theses', nameTh: 'วิทยานิพนธ์', nameEn: 'Theses & IR' },
    { id: 'databases', nameTh: 'ฐานข้อมูล & OPAC', nameEn: 'Databases & OPAC' },
    { id: 'service', nameTh: 'บริการห้องสมุด', nameEn: 'Services' }
  ];

  const tabButtons = {
    chat: document.getElementById('lumi-tab-chat-btn'),
    faq: document.getElementById('lumi-tab-faq-btn'),
    resources: document.getElementById('lumi-tab-resources-btn'),
    librarian: document.getElementById('lumi-tab-librarian-btn'),
    guide: document.getElementById('lumi-tab-guide-btn')
  };

  // Toggle Window
  function openWidget() {
    isWidgetOpen = true;
    floatingBtn.classList.add('hidden');
    mainWindow.classList.remove('hidden');
    setTimeout(() => chatInput.focus(), 120);
  }

  function closeWidget() {
    isWidgetOpen = false;
    mainWindow.classList.add('hidden');
    floatingBtn.classList.remove('hidden');
  }

  function toggleWidget() {
    if (isWidgetOpen) closeWidget();
    else openWidget();
  }

  // Main View Switcher
  function switchView(view) {
    currentView = view;
    chatView.classList.toggle('hidden', view !== 'chat');
    faqView.classList.toggle('hidden', view !== 'faq');
    resourcesView.classList.toggle('hidden', view !== 'resources');
    librarianView.classList.toggle('hidden', view !== 'librarian');
    guideView.classList.toggle('hidden', view !== 'guide');

    Object.keys(tabButtons).forEach(key => {
      const btn = tabButtons[key];
      if (!btn) return;
      if (key === view) {
        btn.className = 'w-10 h-10 rounded-xl flex items-center justify-center bg-blue-900 text-white shadow-md ring-2 ring-blue-400/40 cursor-pointer transition-all';
      } else {
        btn.className = 'w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer';
      }
    });

    if (view === 'faq') renderFaqList();
    if (view === 'resources') renderResourcesList();
    if (view === 'librarian') renderLibrarianContent();
    if (view === 'guide') renderGuideContent();
  }

  // Render Resources Tab
  function renderResourcesList() {
    const isTh = currentLang === 'th';
    resourcesList.innerHTML = RESOURCES.map(r => `
      <div class="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all flex flex-col justify-between">
        <div>
          <h4 class="text-xs sm:text-sm font-bold text-slate-800 font-prompt text-center">${isTh ? r.titleTh : r.titleEn}</h4>
          <p class="text-[11px] sm:text-xs text-slate-500 mt-1 leading-relaxed text-center">${isTh ? r.descTh : r.descEn}</p>
        </div>
        <div class="mt-3.5 flex flex-col gap-1.5">
          <a href="${r.url}" target="_blank" rel="noreferrer" class="w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
            <span>${isTh ? 'เปิดเว็บไซต์โดยตรง' : 'Open Direct Link'}</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
        </div>
      </div>
    `).join('');
  }

  // Helper to retrieve dynamic admin data from localStorage if configured
  function getDynamicAdminData() {
    try {
      const raw = localStorage.getItem('lumi_library_admin_data');
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return null;
  }

  // Render Ask a Librarian Tab
  function renderLibrarianContent() {
    const isTh = currentLang === 'th';
    const dyn = getDynamicAdminData();
    const c = (dyn && dyn.contacts) ? dyn.contacts : {
      email: 'library@slc.ac.th',
      phone: '02-675-5304-12 ต่อ 3101',
      facebookName: 'SLC Lib',
      facebookUrl: 'https://www.facebook.com/SLCLib',
      lineNameTh: 'คลิกเพื่อเข้าร่วมกลุ่ม',
      lineNameEn: 'Join OpenChat',
      lineUrl: 'https://line.me/ti/g2/rJDHa3r305wqq488K1rnMf-5g6U2tdpdYNF4TA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default'
    };

    librarianContent.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="p-3 rounded-xl bg-blue-50 text-blue-900 border border-blue-100">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 18v-6a9 9 0 0118 0v6"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>
        </div>
        <div>
          <h4 class="text-sm sm:text-base font-bold text-slate-800 font-prompt">${isTh ? 'งานวิทยบริการและวารสารวิชาการ วิทยาลัยเซนต์หลุยส์' : 'Library, Saint Louis College'}</h4>
          <p class="text-xs text-slate-500">${isTh ? 'พร้อมให้บริการและตอบคำถามแก่นักศึกษาและบุคลากร' : 'Ready to support students, faculty, and staff'}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
        <a href="mailto:${c.email}" class="p-3.5 bg-slate-50/80 hover:bg-blue-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors block">
          <span class="text-slate-500 block text-[10px] uppercase font-semibold">${isTh ? 'อีเมล' : 'Email'}</span>
          <span class="text-blue-900 font-bold text-xs sm:text-sm">${c.email}</span>
        </a>
        <div class="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200">
          <span class="text-slate-500 block text-[10px] uppercase font-semibold">${isTh ? 'เบอร์โทรศัพท์' : 'Phone'}</span>
          <span class="text-blue-900 font-bold text-xs sm:text-sm">${c.phone}</span>
        </div>
        <a href="${c.facebookUrl}" target="_blank" rel="noreferrer" class="p-3.5 bg-slate-50/80 hover:bg-blue-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors block">
          <span class="text-slate-500 block text-[10px] uppercase font-semibold">Facebook Page</span>
          <span class="text-blue-900 font-bold text-xs sm:text-sm">${c.facebookName}</span>
        </a>
        <a href="${c.lineUrl}" target="_blank" rel="noreferrer" class="p-3.5 bg-slate-50/80 hover:bg-blue-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors block">
          <span class="text-slate-500 block text-[10px] uppercase font-semibold">LINE OpenChat</span>
          <span class="text-blue-900 font-bold text-xs sm:text-sm">${isTh ? c.lineNameTh : c.lineNameEn}</span>
        </a>
      </div>
    `;
  }

  // Render Guide Tab
  function renderGuideContent() {
    const isTh = currentLang === 'th';
    const dyn = getDynamicAdminData();
    const h = (dyn && dyn.hours) ? dyn.hours : {
      centralTh: 'ทุกวัน 10:00 - 19:00 น.',
      centralEn: 'Daily, 10:00 AM - 7:00 PM',
      branchTh: 'วันจันทร์ - วันศุกร์ 08:00 - 17:00 น.',
      branchEn: 'Monday - Friday, 8:00 AM - 5:00 PM',
      noteTh: 'ปิดทำการในวันหยุดนักขัตฤกษ์',
      noteEn: 'Closed on Public Holidays'
    };
    const p = (dyn && dyn.policies) ? dyn.policies : {
      undergradTh: '7 เล่ม / 7 วัน',
      undergradEn: '7 items / 7 days',
      gradTh: '10 เล่ม / 14 วัน',
      gradEn: '10 items / 14 days',
      facultyTh: '20 เล่ม / 30 วัน',
      facultyEn: '20 items / 30 days',
      renewalTh: 'สามารถต่ออายุการยืมได้ 2 ครั้ง',
      renewalEn: 'Can renew 2 times',
      fineTh: 'ค่าปรับส่งเกินกำหนด 10 บาท/เล่ม/วัน',
      fineEn: 'Overdue fine: 10 THB/item/day'
    };

    guideContent.innerHTML = `
      <div class="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <h4 class="font-bold text-slate-800 font-prompt flex items-center gap-2 mb-2 text-sm">
          <svg class="w-4 h-4 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 7v5l3 3"/></svg>
          ${isTh ? 'เวลาทำการ (Operating Hours)' : 'Hours of Operation'}
        </h4>
        <ul class="space-y-1.5 text-slate-600 leading-relaxed">
          <li>• <strong>${isTh ? 'ห้องสมุดกลาง Saint Louis (ฝั่งโรงพยาบาล):' : 'Central Library (Hospital Side):'}</strong> ${isTh ? h.centralTh : h.centralEn}</li>
          <li>• <strong>${isTh ? 'ห้องสมุดสาขา Saint Benedict (ฝั่งอาคารเรียน):' : 'Saint Benedict (Academic Side):'}</strong> ${isTh ? h.branchTh : h.branchEn}</li>
          <li class="text-slate-500 text-[11px] pt-1">• ${isTh ? h.noteTh : h.noteEn}</li>
        </ul>
      </div>

      <div class="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <h4 class="font-bold text-slate-800 font-prompt flex items-center gap-2 mb-2 text-sm">
          <svg class="w-4 h-4 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          ${isTh ? 'ระยะเวลายืมหนังสือ (Loan Policy)' : 'Loan Policy'}
        </h4>
        <ul class="space-y-1.5 text-slate-600 leading-relaxed">
          <li>• <strong>${isTh ? 'นักศึกษา ป.ตรี, บุคลากร, หลักสูตรระยะสั้น:' : 'Undergraduate, Staff:'}</strong> ${isTh ? p.undergradTh : p.undergradEn}</li>
          <li>• <strong>${isTh ? 'นักศึกษา ป.โท:' : 'Graduate Students:'}</strong> ${isTh ? p.gradTh : p.gradEn}</li>
          <li>• <strong>${isTh ? 'คณาจารย์:' : 'Faculty Members:'}</strong> ${isTh ? p.facultyTh : p.facultyEn}</li>
          <li>• <strong style="color: #16a34a;">${isTh ? 'การต่ออายุ:' : 'Renewal Policy:'}</strong> ${isTh ? p.renewalTh : p.renewalEn}</li>
          <li class="text-rose-600 text-[11px] pt-1">• * ${isTh ? p.fineTh : p.fineEn}</li>
        </ul>
      </div>
    `;
  }

  // Language Change Handler (ONLY 1 Switcher in Header)
  function setLanguage(lang) {
    currentLang = lang;
    const isTh = currentLang === 'th';

    // Segmented button active state
    const segEn = document.getElementById('lumi-seg-en');
    const segTh = document.getElementById('lumi-seg-th');
    if (isTh) {
      segTh.className = 'px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all bg-white text-blue-900 shadow-xs cursor-pointer';
      segEn.className = 'px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all text-blue-200 hover:text-white cursor-pointer';
    } else {
      segEn.className = 'px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all bg-white text-blue-900 shadow-xs cursor-pointer';
      segTh.className = 'px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all text-blue-200 hover:text-white cursor-pointer';
    }

    document.getElementById('lumi-header-title').innerText = isTh ? 'Lumi (ลูมิ)' : 'Lumi Library AI';
    document.getElementById('lumi-header-status').innerText = isTh ? 'ห้องสมุดวิทยาลัยเซนต์หลุยส์ • Saint Louis College' : 'Saint Louis College Library • Central Portal';

    document.getElementById('lumi-hero-title').innerText = isTh 
      ? 'สวัสดีครับ! น้องลูมิ ผู้ช่วย AI ห้องสมุดวิทยาลัยเซนต์หลุยส์'
      : 'Hello! I am Lumi, Saint Louis College Library AI Assistant';
    document.getElementById('lumi-hero-sub').innerText = isTh
      ? 'ยินดีให้คำแนะนำข้อมูล ยืม-คืน, จองห้องประชุม, สืบค้นหนังสือ และบริการต่างๆ ครับ~'
      : 'Ready to help with borrowing rules, room booking, catalog search, and databases~';

    document.getElementById('lumi-quick-label').innerText = isTh ? '⚡ บริการยอดนิยม (Quick Access)' : '⚡ Quick Access';
    document.getElementById('lumi-view-all-label').innerText = isTh ? 'ดูคำถามที่พบบ่อยทั้งหมด' : 'View All FAQs';
    
    const faqViewTitle = document.getElementById('lumi-faq-view-title');
    if (faqViewTitle) {
      faqViewTitle.firstElementChild.innerText = isTh ? 'คำถามที่พบบ่อย (FAQs)' : 'Frequently Asked Questions';
    }
    const faqViewSub = document.getElementById('lumi-faq-view-sub');
    if (faqViewSub) {
      faqViewSub.innerText = isTh ? 'คลิกเลือกคำถามเพื่อให้ระบบถามน้องลูมิในแชททันที' : 'Select any question to ask Lumi directly in chat';
    }
    const faqBackLabel = document.getElementById('lumi-faq-back-label');
    if (faqBackLabel) {
      faqBackLabel.innerText = isTh ? 'กลับไปที่แชท' : 'Back to Chat';
    }
    if (faqSearchInput) {
      faqSearchInput.placeholder = isTh ? 'ค้นหาคำถาม เช่น ยืมหนังสือ, จองห้องประชุม, วิทยานิพนธ์, ฐานข้อมูล...' : 'Search questions or library services...';
    }

    document.getElementById('lumi-chat-input').placeholder = isTh ? 'พิมพ์ข้อความเพื่อสอบถามน้องลูมิ...' : 'Type your question here...';
    document.getElementById('lumi-typing-text').innerText = isTh ? 'น้องลูมิกำลังค้นหาข้อมูลห้องสมุด...' : 'Lumi is searching library database...';

    const q1 = document.querySelector('.lumi-quick-1');
    const q2 = document.querySelector('.lumi-quick-2');
    const q3 = document.querySelector('.lumi-quick-3');
    const q4 = document.querySelector('.lumi-quick-4');
    const q5 = document.querySelector('.lumi-quick-5');
    if (q1) q1.innerText = isTh ? 'ขอจองห้องประชุม' : 'Book a meeting room';
    if (q2) q2.innerText = isTh ? 'ยืมหนังสือได้กี่วัน' : 'How long can I borrow books?';
    if (q3) q3.innerText = isTh ? 'วันเวลาทำการของห้องสมุด' : 'Library operating hours';
    if (q4) q4.innerText = isTh ? 'สืบค้นหนังสือได้อย่างไร' : 'How can I search for books?';
    if (q5) q5.innerText = isTh ? 'ฐานข้อมูลมีอะไรบ้าง' : 'What databases are available?';

    document.getElementById('lumi-resources-title').innerText = isTh ? 'ทรัพยากรและบริการห้องสมุด' : 'Library Resources & Services';
    document.getElementById('lumi-resources-sub').innerText = isTh ? 'เข้าถึงสิ่งพิมพ์ e-Books e-Journals ฐานข้อมูล และบริการต่างๆ ของวิทยาลัยเซนต์หลุยส์' : 'Access Saint Louis College print books, e-resources, databases, and library services.';
    document.getElementById('lumi-librarian-title').innerText = isTh ? 'ติดต่อบรรณารักษ์' : 'Ask a Librarian';
    document.getElementById('lumi-librarian-sub').innerText = isTh ? 'ช่องทางติดต่อเจ้าหน้าที่งานวิทยบริการโดยตรง' : 'Direct contact channels for library staff';
    document.getElementById('lumi-guide-title').innerText = isTh ? 'ระเบียบและเวลาทำการของห้องสมุด' : 'Library Regulations & Hours';

    renderFaqList();
    if (currentView === 'resources') renderResourcesList();
    if (currentView === 'librarian') renderLibrarianContent();
    if (currentView === 'guide') renderGuideContent();
  }

  // Render FAQ list in Dedicated Symmetrical View
  function renderFaqList() {
    const search = (faqSearchInput ? faqSearchInput.value : '').toLowerCase().trim();
    const isTh = currentLang === 'th';

    if (!faqCategoriesContainer || !faqItemsList) return;

    // Render category filter pills
    faqCategoriesContainer.innerHTML = FAQ_CATEGORIES.map(cat => `
      <button 
        onclick="window.LumiWidget.setFaqCategory('${cat.id}')"
        class="px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
          selectedFaqCategory === cat.id
            ? 'bg-blue-900 text-white font-semibold shadow-xs'
            : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
        }"
      >
        ${isTh ? cat.nameTh : cat.nameEn}
      </button>
    `).join('');

    // Filter FAQs by search and category
    const filtered = FAQS.filter(f => {
      const qText = isTh ? f.qTh : f.qEn;
      const catText = isTh ? f.catTh : f.catEn;
      const aText = isTh ? f.aTh : f.aEn;

      const matchesSearch = !search || 
        qText.toLowerCase().includes(search) || 
        catText.toLowerCase().includes(search) ||
        aText.toLowerCase().includes(search);

      let matchesCat = true;
      if (selectedFaqCategory === 'borrow') {
        matchesCat = f.catTh.includes('ยืม') || f.catTh.includes('เวลา') || f.catEn.includes('Borrow') || f.catEn.includes('Hours');
      } else if (selectedFaqCategory === 'room') {
        matchesCat = f.catTh.includes('ห้อง') || f.catEn.includes('Room');
      } else if (selectedFaqCategory === 'theses') {
        matchesCat = f.catTh.includes('วิทยานิพนธ์') || f.catEn.includes('Theses');
      } else if (selectedFaqCategory === 'databases') {
        matchesCat = f.catTh.includes('ฐานข้อมูล') || f.catTh.includes('OPAC') || f.catEn.includes('Databases') || f.catEn.includes('OPAC');
      } else if (selectedFaqCategory === 'service') {
        matchesCat = f.catTh.includes('บริการ') || f.catEn.includes('Service');
      }

      return matchesSearch && matchesCat;
    });

    // Update count badge
    const badge = document.getElementById('lumi-faq-count-badge');
    if (badge) {
      badge.innerText = `${filtered.length} ${isTh ? 'คำถาม' : 'items'}`;
    }

    // Empty state
    if (filtered.length === 0) {
      faqItemsList.innerHTML = `
        <div class="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
          <svg class="w-8 h-8 text-slate-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.08 4h.01"/></svg>
          <p class="text-sm font-medium text-slate-600">${isTh ? 'ไม่พบคำถามที่ตรงกับการค้นหา' : 'No matching questions found'}</p>
          <p class="text-xs text-slate-400">${isTh ? 'คุณสามารถพิมพ์สอบถามน้องลูมิในกล่องแชทได้โดยตรงครับ' : 'You can type your question directly in the chat'}</p>
          <button onclick="window.LumiWidget.switchView('chat')" class="mt-2 px-4 py-2 bg-blue-900 text-white text-xs font-semibold rounded-xl hover:bg-blue-800 cursor-pointer">
            ${isTh ? 'ไปที่กล่องแชท' : 'Go to Chat'}
          </button>
        </div>
      `;
      return;
    }

    // FAQ Cards
    faqItemsList.innerHTML = filtered.map(f => `
      <div class="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
        <div class="space-y-1 flex-1 min-w-0">
          <span class="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md inline-block font-prompt">
            ${isTh ? f.catTh : f.catEn}
          </span>
          <h4 class="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-blue-900 transition-colors leading-relaxed">
            ${isTh ? f.qTh : f.qEn}
          </h4>
        </div>
        <button 
          onclick="window.LumiWidget.askFaq(${f.id})"
          class="self-start sm:self-center px-3.5 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer flex-shrink-0"
        >
          <span>${isTh ? 'ถามน้องลูมิ' : 'Ask Question'}</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    `).join('');
  }

  // Send Message Logic
  function sendMessage(text) {
    if (!text || !text.trim()) return;
    openWidget();
    switchView('chat');
    appendUserBubble(text.trim());
    showTyping(true);

    setTimeout(() => {
      showTyping(false);
      const reply = generateBotResponse(text.trim());
      appendBotBubble(reply);
    }, 550);
  }

  // Ask a specific FAQ directly — uses the FAQ's own pre-written answer,
  // bypassing generateBotResponse's keyword matching entirely.
  function askFaqDirectly(faqId) {
    const faq = FAQS.find(f => f.id === faqId);
    if (!faq) return;
    const isTh = currentLang === 'th';

    openWidget();
    switchView('chat');
    appendUserBubble(isTh ? faq.qTh : faq.qEn);
    showTyping(true);

    setTimeout(() => {
      showTyping(false);
      appendBotBubble({
        text: isTh ? faq.aTh : faq.aEn,
        links: faq.links || []
      });
    }, 550);
  }

  function appendUserBubble(text) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const bubble = document.createElement('div');
    bubble.className = 'flex gap-2.5 items-end flex-row-reverse lumi-bubble-enter';
    bubble.innerHTML = `
      <div class="max-w-[85%] sm:max-w-[78%] space-y-1">
        <div class="p-3.5 shadow-xs text-xs sm:text-[13.5px] leading-relaxed bg-blue-900 text-white rounded-2xl rounded-br-none font-normal lumi-bubble-content">
          ${escapeHtml(text)}
        </div>
        <span class="block text-[10px] text-slate-400 text-right pr-1">${time}</span>
      </div>
    `;
    dynamicFeed.appendChild(bubble);
    scrollBottom();
  }

  function appendBotBubble(content) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formatted = content.text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');

    const bubble = document.createElement('div');
    bubble.className = 'flex gap-2.5 items-start flex-row lumi-bubble-enter';
    
    let linksHtml = '';
    if (content.links && content.links.length > 0) {
      linksHtml = '<div class="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-2">' + 
        content.links.map(l => `
          <a href="${l.url}" target="_blank" rel="noreferrer" class="lumi-link-btn">
            <span>${currentLang === 'th' ? l.titleTh : l.titleEn}</span>
            <svg class="w-3.5 h-3.5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
        `).join('') + '</div>';
    }

    bubble.innerHTML = `
      <div class="w-7 h-7 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 shadow-xs">
        <span class="text-[10px] font-bold text-blue-900">L</span>
      </div>
      <div class="max-w-[85%] sm:max-w-[78%] space-y-1">
        <div class="p-3.5 sm:p-4 shadow-xs text-xs sm:text-[13.5px] leading-relaxed bg-white text-slate-700 border border-slate-200/90 rounded-2xl rounded-tl-none">
          <div class="lumi-bubble-content">${formatted}</div>
          ${linksHtml}
        </div>
        <div class="flex items-center gap-2 px-1 text-[11px] text-slate-400">
          <span>${time}</span>
          <button onclick="window.LumiWidget.speak('${escapeQuotes(content.text)}')" class="p-0.5 hover:text-blue-900 rounded cursor-pointer transition-colors" title="อ่านออกเสียง / Read Aloud">🔊</button>
        </div>
      </div>
    `;
    dynamicFeed.appendChild(bubble);
    scrollBottom();
  }

  function showTyping(show) {
    if (show) typingIndicator.classList.remove('hidden');
    else typingIndicator.classList.add('hidden');
    scrollBottom();
  }

  function scrollBottom() {
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  // Response Generator with High-Precision SLC Library Data
  function generateBotResponse(query) {
    const q = query.toLowerCase();
    const isTh = currentLang === 'th';

    // 1. Web OPAC Search Tips
    if (q.includes('เคล็ดลับ') || q.includes('search tip') || q.includes('keyword search')) {
      return {
        text: isTh
          ? "🔍 **เคล็ดลับการสืบค้นผ่านระบบ Web OPAC:**\n• **ค้นหาด้วยคำสำคัญ (Keyword):** ใส่คำสำคัญหลัก เช่น ชื่อหนังสือ, ชื่อผู้แต่ง หรือหัวเรื่องที่สนใจ\n• **ใช้เครื่องหมายคำพูด (\" \"):** ค้นหาข้อความแบบตรงตัว เช่น \"nursing research\"\n• **ใช้เครื่องหมายดอกจัน (*):** สำหรับคำที่มีรากศัพท์เดียวกัน เช่น nurs* จะพบ nurse, nursing, nurses\n• **กรองผลการค้นหา:** เลือกประเภททรัพยากร (เช่น หนังสือ, วิทยานิพนธ์) เพื่อความแม่นยำ"
          : "🔍 **Web OPAC Search Tips:**\n• **Keyword Search:** Use specific terms like book title, author, or subject.\n• **Quotation Marks (\" \"):** Search exact phrases (e.g. \"nursing research\").\n• **Asterisk (*):** Truncate words (e.g. nurs* finds nurse, nursing).\n• **Filters:** Narrow down results by material type (books, dissertations).",
        links: [
          { titleTh: 'ระบบ Web OPAC', titleEn: 'Web OPAC System', url: 'http://slclib.slc.ac.th/' }
        ]
      };
    }

    // 2. SLC Digital Collection
    if (q.includes('digital collection') || q.includes('คลังสารสนเทศ')) {
      return {
        text: isTh
          ? "🎓 **คลังสารสนเทศดิจิทัล วิทยาลัยเซนต์หลุยส์ (SLC Digital Collection):**\nแหล่งรวบรวมผลงานทางวิชาการและงานวิจัยของสถาบัน ให้บริการค้นหาและดาวน์โหลดเอกสารฉบับเต็มได้ฟรี ประกอบด้วย:\n• วิทยานิพนธ์และงานนิพนธ์ของนักศึกษา\n• ผลงานวิชาการและบทความวิจัยของคณาจารย์\n• เอกสารเผยแพร่ออนไลน์แบบ Open Access"
          : "🎓 **SLC Digital Collection:**\nThe Institutional Repository of Saint Louis College offering free access to full-text academic outputs:\n• Master's theses and research papers\n• Academic publications by faculty and staff\n• Open Access scholarly resources",
        links: [
          { titleTh: 'คลังสารสนเทศดิจิทัล (SLC Digital Collection)', titleEn: 'SLC Digital Collection', url: 'https://library.slc.ac.th/lib2025/nav3-1-1-d-collections.php' }
        ]
      };
    }

    // 3. Citation Guide APA 7th
    if (q.includes('apa') || q.includes('บรรณานุกรม') || q.includes('citation')) {
      return {
        text: isTh
          ? "📖 **คู่มือการเขียนบรรณานุกรม APA 7th Edition:**\nคุณสามารถศึกษาและดาวน์โหลดคู่มือรูปแบบการอ้างอิงและเขียนบรรณานุกรมตามมาตรฐาน APA 7th ได้จากลิงก์ด้านล่างนี้ครับ"
          : "📖 **APA 7th Edition Citation Guide:**\nYou can review and download the comprehensive APA 7th referencing guide via the link below.",
        links: [
          { titleTh: 'ดาวน์โหลดคู่มือ APA 7th (PDF)', titleEn: 'Download APA 7th Guide', url: 'https://drive.google.com/file/d/1NL3hV9xEMXdVDP6elCORzsMWkVgvCvdp/view' }
        ]
      };
    }

    // 4. Resource Purchase Recommendation
    if (q.includes('เสนอซื้อ') || q.includes('recommendation') || q.includes('purchase')) {
      return {
        text: isTh
          ? "🛒 **เสนอซื้อทรัพยากรสารสนเทศเข้าห้องสมุด:**\nอาจารย์, นักศึกษา และบุคลากร สามารถเสนอแนะรายชื่อหนังสือ, ตำรา หรือสื่อการเรียนรู้เพื่อให้ห้องสมุดพิจารณาจัดซื้อได้ผ่านแบบฟอร์มออนไลน์ครับ"
          : "🛒 **Library Resource Acquisition Request:**\nFaculty, students, and staff can recommend books or educational resources for library acquisition via our online request form.",
        links: [
          { titleTh: 'แบบฟอร์มเสนอซื้อทรัพยากร', titleEn: 'Resource Acquisition Form', url: 'https://library.slc.ac.th/lib2025/nav2-6.php' }
        ]
      };
    }

    // 5. Ask a Librarian / Contact Info
    if (q.includes('บรรณารักษ์') || q.includes('librarian') || q.includes('ติดต่อ') || q.includes('contact') || q.includes('เบอร์')) {
      return {
        text: isTh
          ? "📞 **ติดต่อห้องสมุด วิทยาลัยเซนต์หลุยส์:**\n• **อีเมล:** library@slc.ac.th\n• **โทรศัพท์:** 02-675-5304-12 ต่อ 3101\n• **Facebook:** SLC Lib\n• **LINE OpenChat:** สอบถามข้อสงสัยได้แบบเรียลไทม์"
          : "📞 **Contact Saint Louis College Library:**\n• **Email:** library@slc.ac.th\n• **Phone:** 02-675-5304-12 ext. 3101\n• **Facebook:** SLC Lib\n• **LINE OpenChat:** Instant live support group",
        links: [
          { titleTh: 'Facebook: SLC Lib', titleEn: 'Facebook Page', url: 'https://www.facebook.com/SLCLib' },
          { titleTh: 'LINE OpenChat', titleEn: 'Join LINE OpenChat', url: 'https://line.me/ti/g2/rJDHa3r305wqq488K1rnMf-5g6U2tdpdYNF4TA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default' }
        ]
      };
    }

    // 6. Online Renewal (Renew)
    if (q.includes('ต่ออายุ') || q.includes('ต่อหนังสือ') || q.includes('renew') || q.includes('ยืมต่อ') || q.includes('ยืมหนังสือต่อ') || q.includes('Renewal')) {
      return {
        text: isTh
          ? "🔄 **ขั้นตอนการยืมต่อออนไลน์ (Online Renewal):**\n1. เข้าสู่ระบบ Web OPAC\n2. Log in ด้วยรหัสคณะ (เช่น Nu, Pt, Psy) ตามด้วยรหัสนักศึกษา/อาจารย์\n3. ไปที่รายการยืมของคุณ แล้วคลิกปุ่ม **Renew** เพื่อต่ออายุล่วงหน้า"
          : "🔄 **Online Renewal Instructions:**\n1. Visit the Web OPAC system\n2. Log in with faculty prefix (Nu, Pt, Psy) followed by ID\n3. Navigate to borrowed items and click **Renew**",
        links: [
          { titleTh: 'ระบบ Web OPAC', titleEn: 'Web OPAC System', url: 'http://slclib.slc.ac.th/' },
          { titleTh: 'คู่มือการยืมต่อ', titleEn: 'Online Renewal Guide', url: 'https://library.slc.ac.th/lib2025/guides_training_detail.php?id=8' }
        ]
      };
    }

    // 7. Borrowing Rules
    if (q.includes('ยืม') || q.includes('borrow') || q.includes('loan') || q.includes('กี่วัน') || q.includes('คืน')) {
      return {
        text: isTh
          ? "📚 **ระยะเวลาและสิทธิ์การยืมหนังสือ:**\n• **นักศึกษา ป.ตรี, บุคลากร, หลักสูตรระยะสั้น:** 7 เล่ม / 7 วัน \n• **นักศึกษา ป.โท:** 10 เล่ม / 14 วัน\n• **คณาจารย์:** 20 เล่ม / 30 วัน\n<span class=\"text-red-500 font-medium\">• ค่าปรับส่งเกินกำหนด 10 บาท/เล่ม/วัน</span>"
          : "📚 **Loan Entitlements & Periods:**\n• **Undergraduates, Staff:** 7 items / 7 days\n• **Postgraduates:** 10 items / 14 days\n• **Faculty:** 20 items / 30 days\n<span class=\"text-red-500 font-medium\">• 2 renewals\n• Overdue fine: 10 THB/item/day</span>",
        links: [
          { titleTh: 'ระบบ Web OPAC ตรวจสอบรายการยืม', titleEn: 'Check Loans in Web OPAC', url: 'http://slclib.slc.ac.th/' }
        ]
      };
    }

    // 8. Room Booking
    if (q.includes('จอง') || q.includes('ห้องประชุม') || q.includes('room') || q.includes('booking') || q.includes('reservation')) {
      return {
        text: isTh
          ? "🏢 **ระบบจองห้องประชุมออนไลน์**\nสามารถจองห้องประชุมเพื่อการเรียนรู้และการทำกิจกรรมกลุ่มได้\nผ่านระบบ SLC Library ตามลิงก์ด้านล่างนี้ครับ"
          : "🏢 **Online Meeting Room Reservation:**\nYou can book group study and conference rooms easily \nvia the SLC Room Booking system:",
        links: [
          { titleTh: 'ระบบจองห้องประชุม SLC Library', titleEn: 'Book Conference Room', url: 'https://slc-library.github.io/SLC_RoomBooking/' }
        ]
      };
    }

    // 9. Hours & Access
    if (q.includes('เปิด') || q.includes('เวลา') || q.includes('hour') || q.includes('ปิด') || q.includes('ทำการ') || q.includes('library hours') || q.includes('เวลาทำการ') || q.includes('เปิดไหม') || q.includes('Open') || q.includes('เวลาเปิดปิด') || q.includes('opening hours') || q.includes('open') || q.includes('close') || q.includes('ปิดทำการ') || q.includes('ปิดทำการวันหยุด') || q.includes('holiday') || q.includes('วันหยุด') || q.includes('วันหยุดนักขัตฤกษ์') || q.includes('public holiday') || q.includes('opening') || q.includes('closing') || q.includes('วันหยุด')) {
      return {
        text: isTh
          ? "⏰ **เวลาทำการของห้องสมุด วิทยาลัยเซนต์หลุยส์:**\n• **ห้องสมุดกลาง Saint Louis (ฝั่งโรงพยาบาล):**\n&nbsp;&nbsp; ทุกวัน 10:00 - 19:00 น.\n• **ห้องสมุดสาขา Saint Benedict (ฝั่งอาคารเรียน):**\n&nbsp;&nbsp; วันจันทร์ - วันศุกร์ 08:00 - 17:00 น.\n&nbsp;&nbsp; <span style=\"color: red;\">หมายเหตุ: * ปิดทำการในวันหยุดนักขัตฤกษ์ *</span> \n• **ปฏิทินห้องสมุด:** สามารถตรวจสอบวันหยุดและกิจกรรมได้ที่ลิงก์ด้านล่าง"
          : "⏰ **Library Operating Hours:**\n• **Central Library (Hospital Side):** Daily, 10:00 AM - 7:00 PM\n• **Saint Benedict (Academic Side):** Mon - Fri, 8:00 AM - 5:00 PM\n&nbsp;&nbsp;* Closed on Public Holidays * \n• **Library Calendar:** Check for holidays and events via the link below",
        links: [
          { titleTh: 'เว็บไซต์ห้องสมุด', titleEn: 'Library Website', url: 'https://library.slc.ac.th/' }
        ]
       };
    }

    // 10. Theses & Dissertations
    if (q.includes('วิทยานิพนธ์') || q.includes('thesis') || q.includes('dissertation') || q.includes('full-text') || q.includes('Theses') || q.includes('งานวิจัย')) {
      return {
        text: isTh
          ? "🎓 **การสืบค้นวิทยานิพนธ์ฉบับเต็ม:**\nสามารถสืบค้นและดาวน์โหลดวิทยานิพนธ์ฉบับเต็ม (Full-Text)\n ของวิทยาลัยเซนต์หลุยส์ได้ฟรีผ่านระบบ **SLC Digital Collection** ครับ"
          : "🎓 **Full-Text Theses Access:**\nSearch and download full-text institutional dissertations \nvia the **SLC Digital Collection** portal:",
        links: [
          { titleTh: 'คลังสารสนเทศดิจิทัล (SLC Digital Collection)', titleEn: 'SLC Digital Collection', url: 'https://library.slc.ac.th/lib2025/nav3-1-1-d-collections.php' }
        ]
      };
    }

    // 11. Book Search
    if (q.includes('สืบค้น') || q.includes('ค้นหนังสือ') || q.includes('ค้นหาหนังสือ') || q.includes('search')) {
      return {
        text: isTh
          ? "🔍 **การสืบค้นหนังสือและสิ่งพิมพ์:**\nสามารถสืบค้นได้ 2 ช่องทางหลัก:\n1. ช่อง One Search บนเว็บไซต์ห้องสมุด\n2. ระบบ Web OPAC ของวิทยาลัย เพื่อตรวจสอบสถานะและตำแหน่งบนชั้นหนังสือ"
          : "🔍 **Book & Catalog Search:**\nYou can search materials via:\n1. The One Search bar on our library website\n2. The Web OPAC system to locate physical shelf locations",
        links: [
          { titleTh: 'ระบบ Web OPAC', titleEn: 'Web OPAC System', url: 'http://slclib.slc.ac.th/' },
          { titleTh: 'คู่มือการสืบค้น', titleEn: 'Web OPAC Manual', url: 'https://library.slc.ac.th/lib2025/guides_training_detail.php?id=12' }
        ]
      };
    }

    // 12. Databases
    if (q.includes('ฐานข้อมูล') || q.includes('database') || q.includes('cinahl') || q.includes('off-campus') || q.includes('นอกวิทยาลัย') || q.includes('รหัสผ่าน') || q.includes('รหัสผ่านฐานข้อมูล') || q.includes('รหัส') || q.includes('Password database') || q.includes('password')) {
      return {
        text: isTh
          ? "🌐 **ฐานข้อมูลออนไลน์ของวิทยาลัยเซนต์หลุยส์:**\nให้บริการฐานข้อมูล เช่น CINAHL, CU-eLibrary, IG Library, Scientific e-Resources โดยเข้าผ่านหน้าทรัพยากรดิจิทัล และใช้รหัสผ่านสำหรับใช้งานภายนอกวิทยาลัย"
          : "🌐 **Online Databases:**\nAccess premium databases including CINAHL, CU-eLibrary, IG Library, and Scientific e-Resources off-campus using college accounts.",
        links: [
          { titleTh: 'หน้ารวมฐานข้อมูล (Digital Resources)', titleEn: 'Digital Resources Portal', url: 'https://library.slc.ac.th/lib2025/nav1-1-e-databases.php' },
          { titleTh: 'ดูรหัสผ่านฐานข้อมูล (Google Drive)', titleEn: 'View Database Passwords', url: 'https://drive.google.com/file/d/1t2GBJjmyI2Pk5_objWsqQwXuju6KhlFO/view?usp=sharing' }
        ]
      };
    }
    
    // 13. บรรณานุกรมและการอ้างอิง (Citation & References)
    if (q.includes('อ้างอิง') || q.includes('การเขียนอ้างอิง') || q.includes('บรรณานุกรม') || q.includes('APA') || q.includes('APA 7th Edition') || q.includes('APA 7th') || q.includes('การอ้างอิง APA') || q.includes('Citation')  || q.includes('References')) {
      return {
        text: isTh
          ? "🔄 **แนะนำการเขียนบรรณานุกรม (Citation & References):**\nทำไมต้องเป็น APA 7th Edition และบริการนี้สำคัญอย่างไร \n• เป็นมาตรฐานสากล: เป็นรูปแบบที่ใช้กันอย่างแพร่หลายในสาขาสังคมศาสตร์ วิทยาศาสตร์สุขภาพ และการศึกษา \n• เป็นฉบับล่าสุด: อัปเดตเพื่อให้รองรับแหล่งข้อมูลใหม่ ๆ เช่น Social Media, YouTube, Podcast, Data Set \n• ช่วยให้งานน่าเชื่อถือ: แสดงความเคารพต่อผลงานของผู้อื่น และป้องกันปัญหาการคัดลอกผลงาน (Plagiarism)"
          : "🔄 **Citation & References Guide:**\nWhy APA 7th Edition & Why Is This Service Important? \n• International Standard: Widely used across social sciences, health sciences, and education.\n• Latest Edition: Updated to support modern citations such as Social Media, YouTube, Podcasts, and Data Sets. \n• Enhances Credibility: Gives proper credit to original authors and prevents plagiarism.",
        links: [
          { titleTh: 'คู่มือการอ้างอิง', titleEn: 'Citation Guide', url: 'https://drive.google.com/file/d/1NL3hV9xEMXdVDP6elCORzsMWkVgvCvdp/view' }
        ]
      };
    }

    // 14. CINAHL Database
    if (q.includes('CINAHL') || q.includes('ฐานข้อมูล CINAHL')  || q.includes('ฐานข้อมูลด้านการพยาบาล') || q.includes('ฐานข้อมูลด้านสุขภาพ') || q.includes('CINAHL Nursing') || q.includes('CINAHL Health')) {
      return {
        text: isTh
          ? "🌐 **ฐานข้อมูล CINAHL:**\nเป็นฐานข้อมูลที่เน้นเนื้อหาในสาขาการพยาบาลและการดูแลสุขภาพ พร้อมให้บริการการค้นหาและเข้าถึงบทความวิชาการที่เกี่ยวข้อง"
          : "🌐 **CINAHL Database:**\nA comprehensive database focusing on nursing and healthcare literature, providing access to scholarly articles and research.",
          links: [
          { titleTh: 'CINAHL Database', titleEn: 'CINAHL Database', url: 'https://research.ebsco.com/c/f26r7l/search' },
          { titleTh: 'คู่มือการใช้งาน CINAHL', titleEn: 'CINAHL User Guide', url: 'https://library.slc.ac.th/2020/pdf/handbook-cinahl2.pdf' }
        ]
      };
    }

    // 15. CU-eLibrary
    if (q.includes('CU-eLibrary') || q.includes('eLibrary') || q.includes('ฐานข้อมูล CU-eLibrary') || q.includes('ฐานข้อมูลออนไลน์ CU-eLibrary') || q.includes('ฐานข้อมูล CU eLibrary') || q.includes('ฐานข้อมูลออนไลน์ CU eLibrary')  || q.includes('จุฬาลงกรณ์') || q.includes('Chulalongkorn University') || q.includes('Chula') || q.includes('ฐานข้อมูลจุฬา') || q.includes('ฐานข้อมูลออนไลน์จุฬา') || q.includes('จุฬา')) {
      return {
        text: isTh
          ? "🌐 **CU-eLibrary:**\nระบบห้องสมุดดิจิทัลและคลังหนังสืออิเล็กทรอนิกส์ (e-Book) \nที่พัฒนาขึ้นโดยความร่วมมือกับ ศูนย์หนังสือจุฬาลงกรณ์มหาวิทยาลัย \nเพื่อให้บริการหนังสือตำราวิชาการและหนังสือทั่วไปจากสำนักพิมพ์ชั้นนำ"
          : "🌐 **CU-eLibrary:**\nAn online database providing access to various academic resources of Chulalongkorn University.",
          links: [
            { titleTh: 'CU-eLibrary', titleEn: 'CU-eLibrary', url: 'https://elibrary-slclibrary.cu-elibrary.com/' },
            { titleTh: 'คู่มือการใช้งาน CU-eLibrary', titleEn: 'CU-eLibrary User Guide', url: 'https://drive.google.com/file/d/1jsMRZPhyETTK2uHh1geqRlyhCe7GhAW2/view' }
          ]
      };
    }

    // 16. iG Library
    if (q.includes('iG Library') || q.includes('iG') || q.includes('ฐานข้อมูล iG Library') || q.includes('ฐานข้อมูลออนไลน์ iG Library') || q.includes('ฐานข้อมูล iG') || q.includes('ฐานข้อมูลออนไลน์ iG')) {
      return {
        text: isTh
          ? "🌐 **iG Library:**\nระบบห้องสมุดดิจิทัลและคลังหนังสืออิเล็กทรอนิกส์ (e-Book) \nที่พัฒนาขึ้นโดย iG Publishing"
          : "🌐 **iG Library:**\niG Publishing eBook Platform.",
          links: [
            { titleTh: 'iG Library', titleEn: 'iG Library', url: 'https://portal.igpublish.com/search' },
            { titleTh: 'คู่มือการใช้งาน iG Library', titleEn: 'iG Library User Guide', url: 'https://library.slc.ac.th/2020/pdf/handbook-iglibrary2.pdf' }
          ]
      };
    }

    // 17. Scientific e - Resources
    if (q.includes('Scientific e-Resources') || q.includes('e-Resources') || q.includes('ฐานข้อมูลวิทยาศาสตร์') || q.includes('ฐานข้อมูลออนไลน์วิทยาศาสตร์')  || q.includes('Scientific')) {
      return {
        text: isTh
          ? "🌐 **Scientific e-Resources:**\nระบบฐานข้อมูลออนไลน์ที่ให้บริการเนื้อหาทางวิทยาศาสตร์และเทคโนโลยี"
          : "🌐 **Scientific e-Resources:**\nAn online database providing access to scientific and technological resources.",
          links: [
            { titleTh: 'Scientific e-Resources', titleEn: 'Scientific e-Resources', url: 'https://ser-infotech.com/' },
            { titleTh: 'รหัสผ่านสำหรับใช้ภายนอก', titleEn: 'Off-Campus Password', url: 'https://drive.google.com/file/d/1t2GBJjmyI2Pk5_objWsqQwXuju6KhlFO/view?usp=sharing' }
          ]
      };
    }

    // Default Fallback
    return {
      text: isTh
        ? "🐑 น้องลูมิ (Lumi) ได้รับข้อความแล้วครับ! คุณสามารถสอบถามเรื่องการยืม-คืน, การจองห้องประชุม, เวลาทำการ, วิทยานิพนธ์ หรือฐานข้อมูลออนไลน์ได้เลยครับ 💙"
        : "🐑 Lumi received your question! Feel free to ask about borrowing, room booking, opening hours, theses, or online databases anytime. 💙"
    };
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  // Event Listeners Binding
  floatingBtn.addEventListener('click', openWidget);
  document.getElementById('lumi-close-btn').addEventListener('click', closeWidget);
  document.getElementById('lumi-minimize-btn').addEventListener('click', closeWidget);
  document.getElementById('lumi-tab-chat-btn').addEventListener('click', () => switchView('chat'));
  document.getElementById('lumi-tab-faq-btn').addEventListener('click', () => switchView('faq'));
  document.getElementById('lumi-tab-resources-btn').addEventListener('click', () => switchView('resources'));
  document.getElementById('lumi-tab-librarian-btn').addEventListener('click', () => switchView('librarian'));
  document.getElementById('lumi-tab-guide-btn').addEventListener('click', () => switchView('guide'));
  if (faqBackBtn) faqBackBtn.addEventListener('click', () => switchView('chat'));
  const heroFaqsLink = document.getElementById('lumi-hero-faqs-link');
  if (heroFaqsLink) heroFaqsLink.addEventListener('click', () => switchView('faq'));
  
  // Single Language Switcher (Header Segmented Control)
  document.getElementById('lumi-seg-th').addEventListener('click', () => setLanguage('th'));
  document.getElementById('lumi-seg-en').addEventListener('click', () => setLanguage('en'));

  document.getElementById('lumi-reset-btn').addEventListener('click', () => {
    dynamicFeed.innerHTML = '';
  });

  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', renderFaqList);
  }

  inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = chatInput.value;
    if (val.trim()) {
      sendMessage(val);
      chatInput.value = '';
    }
  });

  // Global API Exposure
  window.LumiWidget = {
    open: openWidget,
    close: closeWidget,
    toggle: toggleWidget,
    setLanguage: setLanguage,
    switchView: switchView,
    setFaqCategory: (catId) => {
      selectedFaqCategory = catId;
      renderFaqList();
    },
    sendMessage: (msg) => {
      if (!isWidgetOpen) openWidget();
      sendMessage(msg);
    },
    askFaq: (faqId) => {
      if (!isWidgetOpen) openWidget();
      askFaqDirectly(faqId);
    },
    speak: (text) => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const clean = text.replace(/[*#_]/g, '');
        const utterance = new SpeechSynthesisUtterance(clean);
        utterance.lang = currentLang === 'th' ? 'th-TH' : 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // Initial State Setup
  openWidget();
  renderFaqList();

  console.log('🐑 Lumi Library AI Chat Widget loaded successfully! (SLC Library Edition)');
})();
