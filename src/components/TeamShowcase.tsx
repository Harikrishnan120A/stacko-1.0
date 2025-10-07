import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import team from "@/data/team";
import Reveal from "@/components/Reveal";

type MentorVariant = {
  id: string;
  surface: string;
  halo: string;
  badge: string;
  chip: string;
  accent: string;
  dot: string;
};

const mentorVariants: MentorVariant[] = [
  {
    id: "charcoal",
    surface: "bg-[#121a27]/85 border-white/10 shadow-[0_16px_42px_rgba(5,8,15,0.28)]",
    halo: "from-white/12 via-white/5 to-transparent",
    badge: "border-white/10 bg-white/8 text-white/65",
    chip: "border-white/10 bg-white/7 text-white/70",
    accent: "from-white/18 to-transparent",
    dot: "bg-white/55",
  },
  {
    id: "slate",
    surface: "bg-[#111723]/85 border-white/10 shadow-[0_16px_42px_rgba(4,7,14,0.26)]",
    halo: "from-white/11 via-white/4 to-transparent",
    badge: "border-white/10 bg-white/8 text-white/65",
    chip: "border-white/10 bg-white/7 text-white/70",
    accent: "from-white/18 to-transparent",
    dot: "bg-white/55",
  },
  {
    id: "ink",
    surface: "bg-[#101421]/85 border-white/10 shadow-[0_16px_42px_rgba(4,6,12,0.26)]",
    halo: "from-white/12 via-white/4 to-transparent",
    badge: "border-white/10 bg-white/8 text-white/65",
    chip: "border-white/10 bg-white/7 text-white/70",
    accent: "from-white/18 to-transparent",
    dot: "bg-white/55",
  },
];
const simpleMentorSummaries: Record<number, string> = {
  1: "Creating modern web applications with React, Node.js, and cutting-edge UI/UX design principles",
  2: "Building scalable software solutions and architecting robust systems for complex web applications", 
  3: "Specializing in innovative frontend technologies and crafting engaging interactive digital experiences",
  4: "Building production-grade React applications and mentoring teams through complex technical challenges",
  5: "Converting cutting-edge AI research into deployable business solutions and automation frameworks",
  6: "Strategic talent placement and program development connecting developers with high-impact opportunities",
  7: "Driving growth initiatives and partnership development across university and enterprise networks",
};

const mentorRoles: Record<number, string> = {
  1: "Product Leadership",
  2: "Technical Leadership", 
  3: "Education Leadership",
  4: "Engineering Leadership",
  5: "Research Leadership",
  6: "Program Leadership",
  7: "Partnership Leadership",
};

const mentorExperience: Record<number, string> = {
  1: "1-2 years",
  2: "1-2 years",
  3: "1-2 years", 
  4: "1-2 years",
  5: "1-2 years",
  6: "1-2 years",
  7: "1-2 years",
};

const toSpecialtyTokens = (value: string) =>
  value
    .split("&")
    .map((token) => token.trim())
    .filter(Boolean);

const TeamShowcase = React.memo(() => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const slides = useMemo(
    () =>
      (team && team.length > 0 ? team : []).map((member, index) => ({
        member: member || {},
        variant: mentorVariants[index % mentorVariants.length] || mentorVariants[0],
      })),
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto-play functionality removed for better user control

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  // Optimized scroll calculation with throttling
  const computeActiveCard = useCallback(() => {
    const node = sliderRef.current;
    if (!node) return;
    const cards = Array.from(node.querySelectorAll<HTMLElement>('[data-mentor-card="true"]'));
    if (!cards.length) return;

    const containerRect = node.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;
    
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    // Only update if there's a real change
    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
    
    // Calculate progress more accurately
    const maxScroll = node.scrollWidth - node.clientWidth;
    const currentProgress = maxScroll <= 0 ? 1 : Math.max(0, Math.min(1, node.scrollLeft / maxScroll));
    setProgress(currentProgress);
  }, [activeIndex]);

  useEffect(() => {
    const node = sliderRef.current;
    if (!node) return;

    const handleScroll = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        computeActiveCard();
      });
    };

    node.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", computeActiveCard);
    computeActiveCard();

    return () => {
      node.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", computeActiveCard);
    };
  }, [computeActiveCard]);

  const scrollToIndex = useCallback((index: number) => {
    const node = sliderRef.current;
    if (!node || index < 0 || index >= slides.length) return;
    
    const cards = node.querySelectorAll<HTMLElement>('[data-mentor-card="true"]');
    const target = cards[index];
    
    if (target) {
      // Calculate scroll position for centering
      const containerWidth = node.clientWidth;
      const targetRect = target.getBoundingClientRect();
      const containerRect = node.getBoundingClientRect();
      const targetCenter = targetRect.left + targetRect.width / 2 - containerRect.left;
      const containerCenter = containerWidth / 2;
      const scrollOffset = targetCenter - containerCenter;
      
      // Smooth scroll to position
      node.scrollTo({
        left: node.scrollLeft + scrollOffset,
        behavior: 'smooth'
      });
      
      // Update active index immediately for better UX
      setActiveIndex(index);
    }
  }, [slides.length]);

  const handleNavigate = useCallback(
    (direction: "prev" | "next") => {
      if (!slides.length) return;
      const delta = direction === "next" ? 1 : -1;
      const nextIndex = (() => {
        if (direction === "next" && activeIndex === slides.length - 1) return 0;
        if (direction === "prev" && activeIndex === 0) return slides.length - 1;
        return activeIndex + delta;
      })();

      scrollToIndex(nextIndex);
    },
    [activeIndex, scrollToIndex, slides.length]
  );

  // Auto-play disabled for better user control
  // useEffect(() => {
  //   if (!isAutoPlay || !slides || slides.length <= 1) return;
  //   
  //   const timer = window.setTimeout(() => {
  //     const nextIndex = (activeIndex + 1) % slides.length;
  //     scrollToIndex(nextIndex);
  //   }, 12000);

  //   return () => window.clearTimeout(timer);
  // }, [activeIndex, isAutoPlay, scrollToIndex, slides]);

  const progressPercent = slides.length <= 1 
    ? 100 
    : Math.max(8, Math.min(100, (progress > 0 ? progress : activeIndex / Math.max(1, slides.length - 1)) * 100));

  // Early return if no data to prevent empty state (after all hooks)
  if (!slides || slides.length === 0) {
    return (
      <section className="section-shell section-padding" id="team">
        <div className="text-center py-16">
          <p className="text-white/60">Team information is loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell section-padding" id="team">
      <Reveal>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-white/55">Meet Our Founders</p>
            <h2 className="balanced-text text-[clamp(2.4rem,4vw,3.6rem)] font-semibold text-white">
              Expert developers ready to guide you
            </h2>
            <p className="text-lg leading-relaxed text-white/85 max-w-3xl">
              Learn from experienced developers who have built real-world applications. Get personalized mentorship and guidance to accelerate your learning journey.
            </p>
          </div>
          <div className="flex w-full flex-col gap-4 sm:items-end sm:text-right">
            <div className="space-y-2">
              <p className="text-sm font-medium text-white/75">
                Learn from the best
              </p>
              <p className="text-xs text-white/60 max-w-xs">
                Browse our founder profiles using the controls below or scroll to explore.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="relative mt-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-[#04050b] via-[#04050b]/65 to-transparent lg:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-[#04050b] via-[#04050b]/65 to-transparent lg:w-20" />
        <div
          ref={sliderRef}
          className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-8 overflow-x-auto overscroll-x-contain pb-8 pl-4 pr-8 sm:-mx-6 sm:gap-10 sm:pl-6 sm:pr-10 lg:-mx-8 lg:gap-12 lg:pl-8 lg:pr-16 scroll-smooth"
        >
          {slides.map(({ member, variant }, index) => {
            const isActive = index === activeIndex;
            const specialties = toSpecialtyTokens(member.specialty || "General expertise").slice(0, 2);
            const plainBio = member.bio
              ?.split(".")
              ?.map((part) => part.trim())
              ?.filter(Boolean)?.[0] ?? member.bio ?? "Experienced professional";
            const summary = simpleMentorSummaries[member.id] ?? plainBio ?? "Bringing expertise to help you succeed";
            const roleType = mentorRoles[member.id] ?? "Leadership";
            const experience = mentorExperience[member.id] ?? "5+ years";
            return (
              <Reveal key={member.id} delay={index * 0.1} className="snap-center flex-shrink-0">
                <motion.article
                  data-mentor-card="true"
                  initial={false}
                  animate={{
                    scale: isActive ? 1.02 : 0.98,
                    opacity: isActive ? 1 : 0.85,
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`group relative flex h-full w-[min(88vw,24rem)] flex-col rounded-2xl border backdrop-blur-sm transition-all duration-500 ${variant.surface} ${isActive ? 'ring-2 ring-white/25 shadow-2xl' : 'hover:ring-1 hover:ring-white/15'}`}
                >
                {/* Professional gradient overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${variant.halo} opacity-0 transition-all duration-500 ${isActive ? 'opacity-40' : 'group-hover:opacity-20'}`} />
                
                {/* Header Section */}
                <div className="relative p-8 pb-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`h-3 w-3 rounded-full ${variant.dot} opacity-80`} />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                          {roleType}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold leading-tight text-white">
                        {member.name || `Team Member ${index + 1}`}
                      </h3>
                      <p className="text-sm font-medium text-white/80">{member.title || "Team Lead"}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium text-white/60 mb-1">Experience</div>
                      <div className="text-sm font-semibold text-white">{experience}</div>
                    </div>
                  </div>
                  
                  <p className="text-sm leading-relaxed text-white/85">
                    {summary}
                  </p>
                </div>

                {/* Expertise Section */}
                <div className="px-8 pb-6 flex-1">
                  {specialties.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-xs font-semibold text-white/60 px-3">CORE EXPERTISE</span>
                        <div className="h-px flex-1 bg-white/10" />
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {specialties.map((specialty) => (
                          <div key={specialty} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/8">
                            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500" />
                            <span className="text-sm font-medium text-white/90">{specialty}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Section */}
                <div className="p-8 pt-0">
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${variant.dot} animate-pulse`} />
                        <span className="text-xs font-medium text-white/70">Available for mentoring</span>
                      </div>
                    </div>
                    {member.portfolio ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const url = member.portfolio!;
                          console.log('Button clicked! Opening:', url);
                          const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
                          if (!newWindow) {
                            console.error('Popup blocked! Trying location.href');
                            window.location.href = url;
                          }
                        }}
                        style={{ pointerEvents: 'auto', zIndex: 10 }}
                        className="relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600/80 to-purple-600/80 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:from-blue-600 hover:to-purple-600 hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
                      >
                        View Portfolio
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        to="/about"
                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600/80 to-purple-600/80 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:from-blue-600 hover:to-purple-600 hover:scale-105 active:scale-95 shadow-lg"
                      >
                        Connect
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              handleNavigate("prev");
            }}
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/70 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
            aria-label="Previous mentor"
          >
            <span className="text-base transition-transform group-hover:-translate-x-0.5">&larr;</span>
          </button>
          <button
            type="button"
            onClick={() => {
              handleNavigate("next");
            }}
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/70 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
            aria-label="Next mentor"
          >
            <span className="text-base transition-transform group-hover:translate-x-0.5">&rarr;</span>
          </button>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <div className="h-1 w-36 overflow-hidden rounded-full bg-white/10 sm:w-48">
            <motion.div
              className="h-full rounded-full bg-white/70"
              animate={{ width: `${Math.max(8, progressPercent)}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
          <div className="flex items-center gap-2">
            {slides.map((_, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    scrollToIndex(index);
                  }}
                  aria-label={`Go to mentor ${index + 1}`}
                  className="group relative h-3 w-3 rounded-full bg-white/12 transition hover:bg-white/20"
                >
                  <motion.span
                    className="absolute inset-0 rounded-full bg-white/70"
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.6 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

TeamShowcase.displayName = 'TeamShowcase';
export default TeamShowcase;









