
import React, { useState, useEffect, useRef } from 'react';
import Background from './components/Background';
import AIAssistant from './components/AIAssistant';
import { USER_PROFILE } from './constants';

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 监听 showChat 状态，如果是手机端则自动滚动到聊天区域
  useEffect(() => {
    if (showChat && chatRef.current && window.innerWidth < 1024) {
      setTimeout(() => {
        chatRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [showChat]);

  const handleMouseMove = (e: React.MouseEvent) => {
    // 仅在桌面端启用 3D 倾斜效果
    if (window.innerWidth < 1024) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start lg:justify-center p-4 sm:p-6 selection:bg-purple-500/30 overflow-x-hidden">
      <Background />

      <main className={`max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} py-8 lg:py-0`}>
        
        {/* Left Section: Personal Card */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div 
            className="group relative w-full [perspective:2000px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
          >
            <div 
              className="relative w-full glass-card rounded-[32px] lg:rounded-[40px] p-6 sm:p-10 lg:p-12 transition-transform duration-300 ease-out shadow-2xl flex flex-col justify-between overflow-hidden group-hover:border-purple-500/40"
              style={{
                transform: window.innerWidth >= 1024 ? `rotateY(${(mousePos.x - 0.5) * 8}deg) rotateX(${(0.5 - mousePos.y) * 8}deg)` : 'none',
              }}
            >
              {/* Animated Highlights */}
              <div className="absolute top-0 right-0 w-64 h-64 lg:w-80 lg:h-80 bg-purple-600/10 rounded-full -mr-24 -mt-24 lg:-mr-32 lg:-mt-32 blur-[80px] lg:blur-[100px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 lg:w-64 lg:h-64 bg-blue-600/10 rounded-full -ml-20 -mb-20 lg:-ml-24 lg:-mb-24 blur-[60px] lg:blur-[80px] pointer-events-none"></div>

              {/* ID Tag */}
              <div className="absolute top-6 right-6 lg:top-8 lg:right-8 flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="text-[8px] lg:text-[10px] font-orbitron tracking-[0.2em] text-purple-400">DIGITAL_ID</span>
                <span className="text-[10px] lg:text-xs font-mono text-white/60">{USER_PROFILE.id}</span>
              </div>

              {/* Header: Name and Title */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-[1.5rem] lg:rounded-[2rem] blur-md opacity-40 group-hover:opacity-70 transition-opacity"></div>
                  <img 
                    src={USER_PROFILE.avatar} 
                    alt={USER_PROFILE.name} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(USER_PROFILE.name)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
                    }}
                    className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-[1.5rem] lg:rounded-[2rem] object-cover border-2 border-white/10 shadow-xl bg-[#1a1a1a]"
                  />
                </div>
                <div className="text-center sm:text-left pt-1">
                  <h1 className="text-3xl lg:text-5xl font-orbitron font-bold text-white tracking-tighter mb-1 lg:mb-2">
                    {USER_PROFILE.name}
                  </h1>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <div className="h-px w-3 lg:w-4 bg-purple-500/50"></div>
                    <p className="neo-gradient-text text-sm lg:text-lg font-medium tracking-widest uppercase">
                      {USER_PROFILE.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio & Skills */}
              <div className="relative z-10 space-y-3 lg:space-y-4 mt-5 lg:mt-6">
                <p className="text-gray-400 text-sm lg:text-base leading-relaxed max-w-xl">
                  {USER_PROFILE.bio}
                </p>
                
                <div className="flex flex-wrap gap-1.5 lg:gap-2">
                  {USER_PROFILE.skills.map(skill => (
                    <div key={skill.name} className="flex flex-col gap-1 group/skill">
                      <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] lg:text-[10px] text-gray-500 font-bold uppercase tracking-wider group-hover/skill:border-purple-500/30 group-hover/skill:text-purple-400 transition-all">
                        {skill.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Dynamic QR Section */}
              <div className="relative z-10 mt-5 lg:mt-6 flex flex-row gap-3 lg:gap-4 w-full">
                {USER_PROFILE.interactiveContacts.map((contact, idx) => {
                  const isImageUrl = contact.value.match(/\.(jpeg|jpg|gif|png|webp|svg)/i) || contact.type === 'wechat';
                  const finalImgSrc = isImageUrl 
                    ? contact.value 
                    : `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(contact.value)}&color=e5e7eb&bgcolor=1a1a1a`;

                  return (
                    <div 
                      key={idx}
                      className="group/contact relative flex-1 bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl overflow-hidden transition-all duration-500 ease-in-out h-12 lg:h-14 hover:h-40 lg:hover:h-48 cursor-pointer shadow-lg hover:shadow-purple-500/20"
                    >
                      {/* Default State: Icon + Label */}
                      <div className="absolute inset-x-0 top-0 h-12 lg:h-14 flex items-center justify-center gap-2 lg:gap-3 transition-opacity duration-300 group-hover/contact:opacity-0">
                        <div className="text-gray-300 group-hover/contact:text-purple-400 transition-colors scale-90 lg:scale-100">
                          {contact.icon}
                        </div>
                        <span className="text-[9px] lg:text-xs font-orbitron tracking-widest text-white/70 uppercase">
                          {contact.label}
                        </span>
                      </div>

                      {/* Expanded State: Image/QR Code */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover/contact:opacity-100 transition-all duration-500 delay-75 bg-black/60 backdrop-blur-md">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 mix-blend-overlay"></div>
                        <div className="relative p-1 bg-[#1a1a1a] rounded-lg border border-white/10 shadow-inner group-hover/contact:scale-100 scale-90 transition-transform duration-500">
                           <img 
                            src={finalImgSrc} 
                            alt={contact.label}
                            className="w-24 h-24 lg:w-32 lg:h-32 rounded-md object-cover shadow-2xl transition-all duration-300"
                            onClick={() => window.open(contact.link, '_blank')}
                          />
                        </div>
                        <div className="mt-2 text-[8px] lg:text-[10px] font-orbitron text-purple-400 tracking-[0.2em] animate-pulse">
                          TAP TO CONNECT
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Socials and Action */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between mt-5 lg:mt-6 pt-5 lg:pt-6 border-t border-white/5 gap-4">
                <div className="flex gap-6 lg:gap-5">
                  {USER_PROFILE.socials.map(social => (
                    <a 
                      key={social.name} 
                      href={social.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-purple-400 transform hover:scale-125 lg:hover:-translate-y-1 transition-all duration-300"
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <button 
                  onClick={() => setShowChat(true)}
                  className="w-full sm:w-auto group/btn relative px-6 lg:px-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl lg:rounded-2xl text-white text-xs lg:text-sm font-semibold border border-white/10 transition-all overflow-hidden flex items-center justify-center gap-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                  <svg className="w-4 h-4 text-purple-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span className="relative z-10 uppercase tracking-tighter text-[10px] lg:text-[11px] font-bold">chat with digital identity</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Chat Interface */}
        <div ref={chatRef} className="lg:col-span-5 h-auto min-h-[400px] lg:min-h-0 lg:h-full">
          {!showChat ? (
            <div className="h-full min-h-[400px] lg:min-h-[500px] glass-card rounded-[32px] lg:rounded-[40px] p-8 flex flex-col items-center justify-center text-center space-y-6 border-dashed border-white/10 border-2 group hover:border-purple-500/30 transition-all">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-10 group-hover:opacity-30 transition-opacity"></div>
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/5 rounded-full flex items-center justify-center relative z-10 group-hover:rotate-12 transition-transform duration-500">
                  <svg className="w-8 h-8 lg:w-10 lg:h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg lg:text-xl font-orbitron text-white">Neural Persona</h3>
                <p className="text-gray-500 text-[13px] lg:text-sm max-w-[280px] mx-auto">
                  初始化 AI 人格节点。通过 Gemini 3.0 驱动我的数字身份。
                </p>
              </div>
              <button 
                onClick={() => setShowChat(true)}
                className="px-8 lg:px-10 py-3.5 lg:py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-[10px] lg:text-xs uppercase tracking-[0.2em] shadow-lg shadow-purple-900/40 hover:scale-105 active:scale-95 transition-all"
              >
                启动对话
              </button>
            </div>
          ) : (
            <div className="h-[550px] sm:h-[600px] lg:h-full">
               <AIAssistant />
            </div>
          )}
        </div>
      </main>

      {/* Status Footer */}
      <div className="lg:fixed lg:bottom-8 lg:left-8 mt-8 lg:mt-0 flex items-center gap-4 pb-8 lg:pb-0">
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-purple-500 animate-pulse"></div>
          <div className="w-1 h-1 rounded-full bg-purple-500 animate-pulse [animation-delay:0.2s]"></div>
          <div className="w-1 h-1 rounded-full bg-purple-500 animate-pulse [animation-delay:0.4s]"></div>
        </div>
        <span className="text-[8px] lg:text-[10px] font-orbitron tracking-[0.3em] text-white/20 uppercase">Core Status: Optimized</span>
      </div>
    </div>
  );
};

export default App;
