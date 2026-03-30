import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Crosshair, FileText, ExternalLink, AlertTriangle } from 'lucide-react';
import { tourScheduleConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const TourSchedule = () => {
  // Null check: if config is empty, do not render
  if (tourScheduleConfig.tourDates.length === 0 && !tourScheduleConfig.sectionTitle) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeVenue, setActiveVenue] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => setIsVisible(true),
    });

    scrollTriggerRef.current = st;

    return () => {
      st.kill();
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.querySelectorAll('.tour-item') || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'on-sale':
        return { text: tourScheduleConfig.statusLabels.onSale, color: 'text-[#00ff41] bg-[#00ff41]/10 border-[#00ff41]/30' };
      case 'sold-out':
        return { text: tourScheduleConfig.statusLabels.soldOut, color: 'text-[#e63946] bg-[#e63946]/10 border-[#e63946]/30' };
      case 'coming-soon':
        return { text: tourScheduleConfig.statusLabels.comingSoon, color: 'text-[#f4d03f] bg-[#f4d03f]/10 border-[#f4d03f]/30' };
      default:
        return { text: tourScheduleConfig.statusLabels.default, color: 'text-[#a0a0a0] bg-[#a0a0a0]/10 border-[#a0a0a0]/30' };
    }
  };

  const TOUR_DATES = tourScheduleConfig.tourDates;

  return (
    <section
      id="engagements"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0a0a0a] py-20 overflow-hidden warning-border"
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

      {/* Warning header */}
      <div className="absolute top-0 left-0 right-0 bg-[#e63946]/10 border-b border-[#e63946]/30 py-2">
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#e63946]" />
          <span className="font-mono-custom text-xs text-[#e63946] uppercase tracking-wider">CLASSIFIED ENGAGEMENT // AUTHORIZED PERSONNEL ONLY</span>
          <AlertTriangle className="w-4 h-4 text-[#e63946]" />
        </div>
      </div>

      {/* Rotating target icon */}
      {tourScheduleConfig.vinylImage && (
        <div className="absolute top-32 right-20 w-48 h-48 md:w-64 md:h-64 z-10 opacity-60">
          <div className="w-full h-full rounded-full border-2 border-[#e63946]/30 flex items-center justify-center animate-spin-slow">
            <div className="w-3/4 h-3/4 rounded-full border border-[#e63946]/50 flex items-center justify-center">
              <Target className="w-16 h-16 text-[#e63946]/60" />
            </div>
          </div>
        </div>
      )}

      {/* Content container */}
      <div ref={contentRef} className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pt-8">
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono-custom text-xs text-[#e63946]/60 uppercase tracking-wider mb-2">
            {tourScheduleConfig.sectionLabel}
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-white text-glow-red">
            {tourScheduleConfig.sectionTitle}
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Phase preview */}
          {TOUR_DATES.length > 0 && (
            <div className="hidden lg:flex lg:items-center">
              <div className="sticky top-32 w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#1a1a1a] border border-[#333]">
                <img
                  src={TOUR_DATES[activeVenue]?.image}
                  alt={TOUR_DATES[activeVenue]?.venue}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />

                {/* Phase info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#050505] to-transparent">
                  <p className="font-mono-custom text-xs text-[#e63946]/80 mb-1">
                    {TOUR_DATES[activeVenue]?.date}
                  </p>
                  <p className="font-display text-2xl text-white">
                    {TOUR_DATES[activeVenue]?.venue}
                  </p>
                  <p className="font-mono-custom text-sm text-white/60">
                    {TOUR_DATES[activeVenue]?.city}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Right: Phase list */}
          <div className="space-y-4">
            {TOUR_DATES.map((tour, index) => {
              const status = getStatusLabel(tour.status);

              return (
                <div
                  key={tour.id}
                  className="tour-item group relative p-6 rounded-xl bg-[#1a1a1a]/50 backdrop-blur-sm border border-[#333] hover:border-[#e63946]/50 hover:bg-[#1a1a1a]/80 transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setActiveVenue(index)}
                  onMouseLeave={() => setActiveVenue(0)}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Phase number */}
                    <div className="flex-shrink-0 w-20">
                      <p className="font-mono-custom text-3xl font-bold text-[#e63946]">
                        {tour.date.split(' ')[1]}
                      </p>
                      <p className="font-mono-custom text-xs text-white/40">
                        {tour.time}
                      </p>
                    </div>

                    {/* Phase info */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <Crosshair className="w-4 h-4 text-[#e63946]/60" />
                        <span className="font-display text-lg text-white">
                          {tour.city}
                        </span>
                      </div>
                      <p className="text-sm text-white/50 ml-6">
                        {tour.venue}
                      </p>
                    </div>

                    {/* Status badge */}
                    <div className="flex-shrink-0">
                      <span className={`px-3 py-1 rounded text-xs font-medium border ${status.color}`}>
                        {status.text}
                      </span>
                    </div>

                    {/* Action button */}
                    <div className="flex-shrink-0">
                      {tour.status === 'on-sale' ? (
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#e63946] text-white rounded text-sm font-medium hover:bg-[#ff4d5a] transition-colors">
                          <FileText className="w-4 h-4" />
                          <span>{tourScheduleConfig.buyButtonText}</span>
                        </button>
                      ) : (
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#333] text-white/60 rounded text-sm hover:border-[#e63946]/50 hover:text-white transition-colors">
                          <ExternalLink className="w-4 h-4" />
                          <span>{tourScheduleConfig.detailsButtonText}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#e63946] rounded-full group-hover:h-12 transition-all duration-300" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Impact section */}
        <div className="mt-16 p-6 bg-[#1a1a1a]/30 border border-[#e63946]/20 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-[#e63946]" />
            <span className="font-mono-custom text-sm text-[#e63946] uppercase tracking-wider">Additional Findings</span>
          </div>
          <p className="font-mono-custom text-sm text-white/60 leading-relaxed">
            {tourScheduleConfig.bottomNote}
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button className="px-8 py-4 bg-[#e63946] text-white font-display text-sm uppercase tracking-wider rounded hover:bg-[#ff4d5a] transition-colors shadow-lg shadow-[#e63946]/20">
            {tourScheduleConfig.bottomCtaText}
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e63946]/30 to-transparent" />
    </section>
  );
};

export default TourSchedule;
