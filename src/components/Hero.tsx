import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const programTracks = [
  "Enterprise Dashboard Development",
  "Advanced React Certification",
  "AI Delivery Pods",
  "Corporate Training Pipeline",
];

const partnerSignals = [
  { value: "94%", label: "Placement within 90 days" },
  { value: "1,200+", label: "Professionals certified" },
  { value: "$47K", label: "Average salary lift" },
];

const Hero = React.memo(() => {
  return (
    <section className="relative isolate overflow-x-hidden bg-[radial-gradient(circle_at_top,#2E1D57_0%,#06070C_68%)] section-padding">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(139,92,246,0.22),transparent_65%)]" />
        <div className="absolute -top-24 -left-12 h-72 w-72 rounded-full bg-gradient-to-br from-purple-600/35 to-indigo-600/10 blur-3xl" />
        <div className="absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-gradient-to-tr from-indigo-500/25 to-transparent blur-[140px]" />
      </div>

      <div className="page-shell grid lg:grid-cols-2 items-stretch gap-8 lg:gap-20 xl:gap-24">
        <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="uppercase tracking-wider font-semibold"
            style={{ color: 'var(--color-primary)', fontSize: '13px', display: 'inline-block', marginBottom: '32px' }}
          >
            STACKO - Professional Development Platform
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            style={{ fontWeight: 800, lineHeight: '1.1', letterSpacing: '-0.03em', marginBottom: '24px' }}
          >
            Learn modern web development from expert developers
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ fontSize: '18px', lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '40px', maxWidth: '540px' }}
          >
            Master React, Node.js, and full-stack development through hands-on courses. Build real projects with guidance from experienced developers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-4 mb-12 lg:mb-16"
          >
            <Link to="/signup" className="btn btn-primary px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base">
              Start Learning
            </Link>
            <Link to="/services" className="btn btn-secondary px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base">
              View Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {partnerSignals.map((signal) => (
              <div
                key={signal.label}
                className="card text-center"
                style={{ padding: '24px 16px' }}
              >
                <p className="text-gradient text-3xl sm:text-4xl lg:text-5xl" style={{ fontWeight: 800, lineHeight: 1, marginBottom: '12px' }}>{signal.value}</p>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>{signal.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
            className="hero-code-block flex-1 rounded-3xl border border-white/10 bg-[linear-gradient(150deg,rgba(17,24,39,0.9),rgba(15,23,42,0.8))] backdrop-blur-lg shadow-xl transition-all duration-300 hover:border-white/15 flex flex-col"
            style={{ padding: '32px' }}
          >
            <p className="text-xs uppercase tracking-[0.32em] text-secondary-500 font-bold">Programs launching this quarter</p>
            <div className="mt-6 space-y-4 text-white/70" style={{ fontSize: '14px', lineHeight: '1.8' }}>
              {programTracks.map((track) => (
                <div key={track} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-secondary-500 shadow-lg shadow-purple-500/50" />
                  <span className="leading-relaxed font-medium">{track}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-white/8 bg-white/4 p-6 text-sm text-white/70 transition-all duration-300 hover:bg-white/6">
              <p className="font-bold text-white tracking-tight">Remote-first · Weekly delivery · Portfolio-grade assets</p>
              <p className="mt-3 leading-relaxed">
                Teams collaborate live with STACKO mentors, ship production features, and exit with a polished playbook.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
