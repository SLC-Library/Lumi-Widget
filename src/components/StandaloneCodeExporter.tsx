import React, { useState } from 'react';
import { Copy, Check, Download, Code, Sparkles, Terminal, FileCode, HelpCircle, Layers, Play } from 'lucide-react';
import lumiWidgetRaw from '../../public/lumi-widget.js?raw';

interface StandaloneCodeExporterProps {
  isOpen: boolean;
  onClose: () => void;
}

// 1. Pure JavaScript Injection Script (IIFE - For Chrome DevTools Overrides, Tampermonkey, or Web script)
// Uses the single source of truth from /public/lumi-widget.js
export const generateStandaloneJsCode = (): string => {
  return lumiWidgetRaw;
};

// 2. Bookmarklet / Console 1-liner
export const generateBookmarkletCode = (): string => {
  const jsCode = generateStandaloneJsCode();
  return `javascript:(function(){${jsCode.replace(/\n\s*/g, ' ')}})();`;
};

// 3. HTML Embed Code with Script Tag
export const generateHtmlEmbedTagCode = (): string => {
  return `<!-- 🐑 LUMI COLLEGE LIBRARY AI CHAT WIDGET -->
<script src="https://cdn.tailwindcss.com"></script>
<script>
${generateStandaloneJsCode()}
</script>`;
};

// 4. Standalone HTML File
export const generateStandaloneHtmlCode = (): string => {
  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lumi - College Library AI Chat Widget</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts: Prompt & Sarabun -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700&family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-slate-100 min-h-screen flex items-center justify-center p-4">
  <div class="max-w-md text-center p-8 bg-white rounded-3xl border border-slate-200 shadow-xl">
    <h1 class="text-xl font-bold font-['Prompt',sans-serif] text-slate-800">College Library Website</h1>
    <p class="text-sm text-slate-500 mt-2">หน้านี้เป็นหน้าจำลองเว็บไซต์จริง น้องลูมิ (Lumi AI Widget) จะโหลดขึ้นมามุมขวาล่างโดยอัตโนมัติ</p>
  </div>

  <!-- Lumi Chat Widget Script -->
  <script>
${generateStandaloneJsCode()}
  </script>
</body>
</html>`;
};

export const StandaloneCodeExporter: React.FC<StandaloneCodeExporterProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'js' | 'override_guide' | 'html_embed' | 'html_file'>('js');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsCode = generateStandaloneJsCode();
  const htmlEmbedCode = generateHtmlEmbedTagCode();
  const htmlFileCode = generateStandaloneHtmlCode();

  const getCurrentCode = () => {
    switch (activeTab) {
      case 'js':
        return jsCode;
      case 'html_embed':
        return htmlEmbedCode;
      case 'html_file':
        return htmlFileCode;
      default:
        return jsCode;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadJs = () => {
    const blob = new Blob([jsCode], { type: 'application/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lumi-widget.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([htmlFileCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lumi-chat-widget.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 font-['Sarabun',sans-serif]">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-5xl h-[92vh] max-h-[840px] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-blue-900 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-800 text-white border border-blue-700">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-['Prompt',sans-serif] font-bold text-base sm:text-lg text-white flex items-center gap-2">
                <span>รับโค้ด JavaScript ของ Lumi Chat Widget</span>
                <span className="px-2.5 py-0.5 text-[10px] bg-emerald-500 text-white font-semibold rounded-full shadow-xs">
                  Standalone JS Ready
                </span>
              </h3>
              <p className="text-xs text-blue-200">
                นำไปใส่ใน Chrome DevTools Local Overrides, Custom Script หรือหน้าเว็บจริงได้ทันที
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-blue-800 hover:bg-blue-700 text-blue-100 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation Strip */}
        <div className="px-4 py-2.5 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 flex-shrink-0">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('js')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'js'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>JavaScript Snippet (.js)</span>
            </button>

            <button
              onClick={() => setActiveTab('override_guide')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'override_guide'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>วิธีใช้กับ Chrome DevTools Override</span>
            </button>

            <button
              onClick={() => setActiveTab('html_embed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'html_embed'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Embed Tag (&lt;script&gt;)</span>
            </button>

            <button
              onClick={() => setActiveTab('html_file')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'html_file'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Full HTML File (.html)</span>
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={activeTab === 'html_file' ? handleDownloadHtml : handleDownloadJs}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-blue-900" />
              <span>{activeTab === 'html_file' ? 'ดาวน์โหลด .html' : 'ดาวน์โหลด .js'}</span>
            </button>

            {activeTab !== 'override_guide' && (
              <button
                onClick={handleCopy}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-900 hover:bg-blue-800 text-white'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'คัดลอกโค้ดสำเร็จแล้ว!' : 'คัดลอกโค้ด (Copy)'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden p-4 bg-slate-50">
          {activeTab === 'override_guide' ? (
            <div className="h-full overflow-y-auto p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs text-slate-700 space-y-6">
              
              <div className="border-b border-slate-200 pb-4">
                <h4 className="font-['Prompt',sans-serif] font-bold text-lg text-blue-900 flex items-center gap-2">
                  <span>🛠️ วิธีนำ JavaScript Snippet ไปทดสอบบนเว็บจริงด้วย Chrome DevTools Local Overrides</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  วิธีนี้ช่วยให้คุณสามารถนำ Lumi Chat Widget ไปทดสอบบนหน้าเว็บห้องสมุดจริงของวิทยาลัยได้ทันที โดยไม่ต้องรอแก้โค้ดบน Production Server!
                </p>
              </div>

              {/* Step 1 */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center">1</span>
                  <h5 className="font-['Prompt',sans-serif] font-bold text-sm text-slate-800">
                    วิธีรันด่วนที่สุดผ่าน DevTools Console (Quick Test)
                  </h5>
                </div>
                <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1.5 pl-2">
                  <li>เปิดเว็บไซต์จริงของห้องสมุดใน Google Chrome</li>
                  <li>กดปุ่ม <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-slate-800 font-bold">F12</kbd> หรือคลิกขวาเลือก <strong>Inspect</strong> แล้วไปที่แท็บ <strong>Console</strong></li>
                  <li>คัดลอกโค้ดจากแท็บ <strong>JavaScript Snippet (.js)</strong> ด้านบน แล้วนำมาวางใน Console จากนั้นกด <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-slate-800 font-bold">Enter</kbd></li>
                  <li>กล่องแชทน้องลูมิ (Lumi Widget) จะเด้งขึ้นมาที่มุมขวาล่างของเว็บไซต์จริงทันที! 🎉</li>
                </ol>
              </div>

              {/* Step 2 */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center">2</span>
                  <h5 className="font-['Prompt',sans-serif] font-bold text-sm text-slate-800">
                    วิธีทำ Chrome DevTools Local Overrides (ติดถาวรตอน Refresh หน้าเว็บ)
                  </h5>
                </div>
                <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1.5 pl-2">
                  <li>เปิด DevTools (<kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-slate-800 font-bold">F12</kbd>) แล้วไปที่แท็บ <strong>Sources</strong></li>
                  <li>ที่แถบด้านซ้าย คลิกที่แท็บย่อย <strong>Overrides</strong> (หากไม่เห็น ให้กดปุ่ม <code>»</code> เพื่อเลือก Overrides)</li>
                  <li>คลิก <strong>+ Select folder for overrides</strong> แล้วเลือกโฟลเดอร์ในเครื่องคอมพิวเตอร์ของคุณเพื่อเก็บไฟล์</li>
                  <li>กดยืนยัน <strong>Allow</strong> เมื่อเบราว์เซอร์ถามการอนุญาตเข้าถึงโฟลเดอร์</li>
                  <li>เปิดไฟล์ HTML หลักหรือไฟล์ <code>.js</code> ของเว็บจริงในแท็บ <strong>Page</strong> คลิกขวาเลือก <strong>Override content</strong></li>
                  <li>นำโค้ด Lumi Widget จากแท็บ <strong>JavaScript Snippet</strong> ไปวางต่อท้ายไฟล์ หรือบันทึกเป็น <code>lumi-widget.js</code> แล้วกด <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-slate-800 font-bold">Ctrl + S</kbd> (หรือ <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-slate-800 font-bold">Cmd + S</kbd>) เพื่อบันทึก</li>
                  <li>เมื่อ Refresh หน้าเว็บจริง กล่องแชทน้องลูมิจะยังคงแสดงอยู่ตลอดเวลาครับ!</li>
                </ol>
              </div>

              {/* Step 3 */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center">3</span>
                  <h5 className="font-['Prompt',sans-serif] font-bold text-sm text-slate-800">
                    วิธีนำไปติดตั้งในระบบจริง (Production Implementation)
                  </h5>
                </div>
                <p className="text-xs text-slate-600">
                  เมื่อทดสอบจนพอใจแล้ว คุณสามารถบันทึกเป็นไฟล์ <code className="text-blue-900 font-bold">lumi-widget.js</code> แล้วอัปโหลดขึ้น Web Server จากนั้นเรียกใช้ในหน้าเว็บจริงด้วยแท็กเดียว:
                </p>
                <div className="bg-slate-900 text-blue-200 p-3 rounded-xl text-xs font-mono">
                  &lt;script src="/js/lumi-widget.js"&gt;&lt;/script&gt;
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full rounded-2xl border border-slate-200 bg-slate-900 overflow-hidden flex flex-col shadow-inner">
              <div className="p-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2 font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="ml-2 text-slate-300">
                    {activeTab === 'js' ? 'lumi-widget.js (Vanilla JavaScript IIFE)' : activeTab === 'html_embed' ? 'embed-snippet.html' : 'index.html'}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">{getCurrentCode().length.toLocaleString()} characters</span>
              </div>
              <pre className="flex-1 overflow-auto p-4 text-xs font-mono text-blue-100 leading-relaxed selection:bg-blue-800 selection:text-white">
                <code>{getCurrentCode()}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 flex-shrink-0 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>ธีม Geometric Balance • รองรับภาษาไทย (TH) และ English (EN) • เสียงอ่าน TTS ในตัว</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold transition-colors cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>

      </div>
    </div>
  );
};
