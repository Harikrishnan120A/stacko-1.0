import Reveal from "@/components/Reveal";

const officeHours = [
  {
    title: "Education partnerships",
    description: "Universities and bootcamps looking to integrate STACKO curriculum or internship tracks.",
  },
  {
    title: "Product sprints",
    description: "Founders and product leaders needing rapid delivery with a design-forward engineering team.",
  },
  {
    title: "Talent network",
    description: "Companies hiring STACKO alumni or offering apprenticeship-style roles for our fellows.",
  },
];

const Contact = () => {
  return (
    <div className="flex flex-col gap-[calc(var(--spacing-section)*1.1)] pb-[calc(var(--spacing-section)*1.4)] pt-[calc(var(--spacing-block)*0.6)]">
      <Reveal>
        <div className="section-shell">
          <div className="glass-surface rounded-[3.6rem] border border-white/12 bg-[linear-gradient(135deg,rgba(107,70,193,0.35),rgba(0,0,0,0.87))] px-10 py-[clamp(3.5rem,6vw,5.5rem)] md:px-16 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-secondary-500">Contact STACKO</p>
            <h1 className="mt-6 text-[clamp(2.6rem,4.4vw,3.8rem)] font-semibold text-white">Let’s architect your next chapter</h1>
            <p className="mt-6 max-w-3xl text-lead text-white/80 mx-auto">
              Share your goals, timeline, and challenges. We’ll assemble a tailored roadmap—whether that’s a cohort seat, a full-stack team on demand, or an AI build that makes your ops sing.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="section-shell grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <form className="glass-surface rounded-[3rem] border border-white/14 p-12">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-white/65">
                Full name
                <input
                  type="text"
                  required
                  className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500/30"
                  placeholder="Ada Lovelace"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/65">
                Email
                <input
                  type="email"
                  required
                  className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500/30"
                  placeholder="you@company.com"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/65">
                Company / School
                <input
                  type="text"
                  className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500/30"
                  placeholder="Stacked Ventures"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-white/65">
                Budget or subscription tier
                <input
                  type="text"
                  className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500/30"
                  placeholder="9/mo - 0K project"
                />
              </label>
            </div>
            <label className="mt-6 flex flex-col gap-2 text-sm text-white/65">
              How can we help?
              <textarea
                rows={6}
                required
                className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500/30"
                placeholder="We’re launching a new cohort for our internal dev team…"
              />
            </label>
            <button type="submit" className="glass-button hover-lift mt-10 w-full rounded-2xl px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white">
              <span className="btn btn-primary mt-10 w-full rounded-2xl px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em]">
                Book my consultation
              </span>
            </button>
          </form>
        </Reveal>
        <Reveal>
          <div className="glass-surface rounded-[3rem] border border-white/14 p-12">
            <p className="text-xs uppercase tracking-[0.32em] text-secondary-500">Office hours</p>
            <p className="mt-4 text-sm text-white/70">
              We host weekly consults. Choose your track and we’ll pair you with the right founder or lead engineer.
            </p>
            <div className="mt-8 space-y-6">
              {officeHours.map((slot) => (
                <div key={slot.title} className="rounded-2xl border border-white/12 bg-black/40 p-6">
                  <p className="text-sm font-semibold text-white">{slot.title}</p>
                  <p className="mt-2 text-sm text-white/70">{slot.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-2xl border border-secondary-500/30 bg-secondary-500/10 p-6 text-sm text-secondary-500">
              <p className="font-semibold">Direct line</p>
              <p className="mt-2 text-white/85">stackoindustries@gmail.com · +91 9751987380</p>
              <p className="mt-3 text-white/65">Response within 2 business days.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Contact;


