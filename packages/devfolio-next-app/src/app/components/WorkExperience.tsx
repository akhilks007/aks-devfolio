type WorkItem = {
  icon: string;
  title: string;
  description: string;
  href?: string;
};

// Placeholder entries — swap in your real roles/projects.
const items: WorkItem[] = [
  {
    icon: '🏳️',
    title: 'Company A — Product Redesign',
    description:
      'Helped ship a cross-platform onboarding flow that cut signup drop-off by double digits.',
    href: '#',
  },
  {
    icon: '💡',
    title: 'Company B — Design System',
    description:
      'Built and maintained a shared component library used across five product teams.',
    href: '#',
  },
  {
    icon: '🎩',
    title: 'Company C — Growth Experiments',
    description:
      'Ran rapid A/B tests on activation flows, shipping the winners straight to production.',
    href: '#',
  },
  {
    icon: '🚀',
    title: 'Company D — Platform Migration',
    description:
      'Led the move from a legacy stack to a modern, type-safe front end with zero downtime.',
    href: '#',
  },
];

export default function WorkExperience() {
  return (
    <section id='work-experience' className='px-6 py-20 md:px-16 lg:px-24'>
      <h2 className='text-2xl font-bold text-white md:text-3xl'>
        Work Experience
      </h2>

      <div className='mt-10 grid grid-cols-1 gap-5 md:grid-cols-2'>
        {items.map((item) => (
          <div
            key={item.title}
            className='flex items-start gap-5 rounded-2xl border border-violet-500/15 bg-gradient-to-br from-[#1a0b2e] to-[#3b1670]/70 p-6 transition-colors hover:border-violet-400/40'>
            <div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 text-2xl shadow-[0_0_20px_rgba(139,92,246,0.35)]'>
              {item.icon}
            </div>
            <div>
              <h3 className='text-lg font-semibold text-white'>
                {item.title}
              </h3>
              <p className='mt-1 text-sm text-white/60'>
                {item.description}
              </p>
              <a
                href={item.href}
                className='mt-4 inline-block rounded-full border border-violet-400/40 px-4 py-1.5 text-xs tracking-wide text-violet-200 transition-colors hover:bg-violet-500/10'>
                LEARN MORE
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
