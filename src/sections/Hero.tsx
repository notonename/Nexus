import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Play, Music, Disc, Calendar, Terminal } from 'lucide-react';
import { heroConfig } from '../config';

const ICON_MAP = {
  disc: Disc,
  play: Play,
  calendar: Calendar,
  music: Music,
};

const Hero = () => {
  // Null check: if config is empty, do not render
  if (!heroConfig.decodeText && !heroConfig.brandName && heroConfig.navItems.length === 0) {
    return null;
  }

  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const TARGET_TEXT = heroConfig.decodeText;
  const CHARS = heroConfig.decodeChars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  const [displayText, setDisplayText] = useState(' '.repeat(TARGET_TEXT.length));
  const [isDecoding, setIsDecoding] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);
  
  // Terminal typewriter effect
  const terminalText = "root@Nexus:~# ./initiate_recon.sh";
  const [terminalDisplay, setTerminalDisplay] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  // Decode text effect
  useEffect(() => {
    let iteration = 0;
    const maxIterations = TARGET_TEXT.length * 8;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return TARGET_TEXT.split('')
          .map((_, index) => {
            if (index < iteration / 8) {
              return TARGET_TEXT[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });

      iteration += 1;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(TARGET_TEXT);
        setIsDecoding(false);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Terminal typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= terminalText.length) {
        setTerminalDisplay(terminalText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 60);

    return () => clearInterval(typingInterval);
  }, []);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav slide in
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );

      // Subtitle fade in
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.5 }
      );

      // Terminal fade in
      gsap.fromTo(
        terminalRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 2 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTitleHover = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 400);
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-[#050505]"
    >
      {/* Background with grid pattern */}
      <div className="absolute inset-0 z-0">
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(230, 57, 70, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(230, 57, 70, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
        {/* Vignette effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(5, 5, 5, 0.8) 100%)'
          }}
        />
      </div>

      {/* Navigation pill */}
      <nav
        ref={navRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 nav-pill rounded-full px-2 py-2"
      >
        <div className="flex items-center gap-1">
          {heroConfig.navItems.map((item) => {
            const IconComponent = ICON_MAP[item.icon];
            return (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-mono-custom uppercase tracking-wider text-white/80 hover:text-[#e63946] transition-colors rounded-full hover:bg-white/5"
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Logo / Brand */}
        <div className="absolute top-8 left-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#e63946]/20 flex items-center justify-center border border-[#e63946]/40">
              <Terminal className="w-4 h-4 text-[#e63946]" />
            </div>
            <span className="font-display text-lg text-white tracking-wider">{heroConfig.brandName}</span>
          </div>
        </div>

        {/* Main title with decode effect and glitch on hover */}
        <h1
          ref={titleRef}
          onMouseEnter={handleTitleHover}
          className={`decode-text text-[10vw] md:text-[8vw] lg:text-[6vw] font-bold text-white leading-none tracking-tight mb-4 cursor-pointer select-none ${isGlitching ? 'glitch-effect' : ''}`}
        >
          <span className={`${isDecoding ? 'text-glow-red' : ''} transition-all duration-300`}>
            {displayText}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-mono-custom text-sm md:text-base text-[#a0a0a0] uppercase tracking-[0.3em] mb-8"
        >
          {heroConfig.subtitle}
        </p>

        {/* Terminal Prompt */}
        <div
          ref={terminalRef}
          className="mb-12 px-6 py-3 bg-[#0a0a0a] border border-[#333] rounded"
        >
          <span className="font-mono-custom text-sm">
            <span className="text-[#00ff41]">root@Nexus</span>
            <span className="text-white">:</span>
            <span className="text-[#4D9FFF]">~</span>
            <span className="text-white"># </span>
            <span className="text-[#e8e8e8]">{terminalDisplay}</span>
            <span className={`text-[#00ff41] ${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => scrollToSection(heroConfig.ctaPrimaryTarget)}
            className="px-8 py-3 bg-[#e63946] text-white font-display text-sm uppercase tracking-wider rounded hover:bg-[#ff4d5a] transition-colors duration-300 shadow-lg shadow-[#e63946]/20"
          >
            {heroConfig.ctaPrimary}
          </button>
          <button
            onClick={() => scrollToSection(heroConfig.ctaSecondaryTarget)}
            className="px-8 py-3 border border-[#e63946]/50 text-white font-display text-sm uppercase tracking-wider rounded hover:border-[#e63946] hover:text-[#e63946] transition-colors duration-300"
          >
            {heroConfig.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#e63946]/50 to-transparent" />

      {/* Corner accents */}
      <div className="absolute top-8 right-8 text-right">
        <p className="font-mono-custom text-xs text-white/40 uppercase tracking-wider">{heroConfig.cornerLabel}</p>
        <p className="font-mono-custom text-xs text-[#e63946]/80">{heroConfig.cornerDetail}</p>
      </div>

      {/* Bottom left - scroll indicator */}
      <div className="absolute bottom-8 left-8">
        <div className="flex items-center gap-2 text-white/40">
          <div className="w-px h-8 bg-gradient-to-b from-[#e63946]/50 to-transparent" />
          <span className="font-mono-custom text-xs uppercase tracking-wider">Scroll</span>
        </div>
      </div>

      {/* Bottom right - version */}
      <div className="absolute bottom-8 right-8 text-right">
        <p className="font-mono-custom text-xs text-white/30">v2.0.25</p>
        <p className="font-mono-custom text-xs text-white/30">BUILD: NIGHTLY</p>
      </div>
    </section>
  );
};

export default Hero;
