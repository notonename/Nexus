import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Cpu, Brain, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = `Started operations: August 21, 2025.

My methodology centers on a manual-first mindset.
I don't just run tools; I analyze logic.

Automation is my accelerator,
but deep manual analysis is my edge.

My dream is to be a top-tier security researcher.
I don't want the fame;
I want the raw, absolute knowledge.`;

  useEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      onEnter: () => setIsVisible(true),
    });

    return () => {
      st.kill();
    };
  }, []);

  // Typewriter effect for terminal text
  useEffect(() => {
    if (!isVisible) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 25);

    return () => clearInterval(typingInterval);
  }, [isVisible]);

  // GSAP animations
  useEffect(() => {
    if (!isVisible || !terminalRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        terminalRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  const renderTerminalText = () => {
    return typedText.split('\n').map((line, index) => (
      <div key={index} className="mb-1">
        {line.startsWith('My') || line.startsWith('I ') || line.startsWith('Auto') || line.startsWith('but') ? (
          <span className="text-[#e8e8e8]">{line}</span>
        ) : line.startsWith('Started') ? (
          <span>
            <span className="text-[#00ff41]">➜</span>{' '}
            <span className="text-[#4D9FFF]">~</span>{' '}
            <span className="text-[#a0a0a0]">{line}</span>
          </span>
        ) : line === '' ? (
          <span>&nbsp;</span>
        ) : (
          <span className="text-[#a0a0a0]">{line}</span>
        )}
      </div>
    ));
  };

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] py-20 overflow-hidden flex items-center justify-center"
    >
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(230, 57, 70, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(230, 57, 70, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Section label */}
      <div className="absolute top-12 left-12">
        <p className="font-mono-custom text-xs text-[#e63946]/60 uppercase tracking-wider">// CORE PHILOSOPHY</p>
      </div>

      {/* Terminal Window */}
      <div
        ref={terminalRef}
        className="relative w-full max-w-4xl mx-6"
      >
        {/* Terminal Header */}
        <div className="terminal-header rounded-t-lg">
          <div className="terminal-dot terminal-dot-red" />
          <div className="terminal-dot terminal-dot-yellow" />
          <div className="terminal-dot terminal-dot-green" />
          <span className="ml-4 font-mono-custom text-xs text-white/40">nexus@philosophy — bash — 80x24</span>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body rounded-b-lg min-h-[400px]">
          {/* Command prompt */}
          <div className="mb-4">
            <span className="text-[#00ff41]">nexus@core</span>
            <span className="text-white">:</span>
            <span className="text-[#4D9FFF]">~</span>
            <span className="text-white">$ </span>
            <span className="text-[#e8e8e8]">cat philosophy.txt</span>
          </div>

          {/* Output */}
          <div className="font-mono-custom text-sm leading-relaxed">
            {renderTerminalText()}
            <span className="inline-block w-2 h-4 bg-[#00ff41] animate-pulse ml-0.5" />
          </div>
        </div>

        {/* Decorative corners */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#e63946]/50" />
        <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#e63946]/50" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#e63946]/50" />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#e63946]/50" />
      </div>

      {/* Side decorations */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8">
        <div className="flex items-center gap-3 text-white/30">
          <Brain className="w-5 h-5" />
          <span className="font-mono-custom text-xs">MANUAL_ANALYSIS</span>
        </div>
        <div className="flex items-center gap-3 text-white/30">
          <Cpu className="w-5 h-5" />
          <span className="font-mono-custom text-xs">AUTOMATION</span>
        </div>
        <div className="flex items-center gap-3 text-white/30">
          <Target className="w-5 h-5" />
          <span className="font-mono-custom text-xs">PRECISION</span>
        </div>
        <div className="flex items-center gap-3 text-white/30">
          <Terminal className="w-5 h-5" />
          <span className="font-mono-custom text-xs">DEEP_KNOWLEDGE</span>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 text-white/20">
          <div className="w-8 h-px bg-[#e63946]/30" />
          <span className="font-mono-custom text-xs">MANUAL_FIRST_MINDSET</span>
          <div className="w-8 h-px bg-[#e63946]/30" />
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
