import Image from 'next/image';

const tools = [
  'Figma',
  'React',
  'C#',
  'Node',
  'Framer',
  'JS',
  'TS',
  'Xd',
  'Next',
  'Ai',
  'Express',
  'Mongo',
];

export default function TechStack() {
  return (
    <section
      id='stack'
      className='flex flex-col items-center px-6 py-24 text-center'>
      <p className='text-base font-medium text-white md:text-lg'>
        I&apos;m currently looking to join a{' '}
        <span className='text-violet-400'>cross-functional</span> team
      </p>
      <p className='mt-1 text-sm text-white/50'>
        that values improving people&apos;s lives through accessible design
      </p>

      <div className='mt-8 flex max-w-md flex-wrap justify-center gap-3'>
        {tools.map((tool) => (
          <div
            key={tool}
            className='flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px] font-semibold text-white/70'>
            {tool}
          </div>
        ))}
      </div>

      <div className='relative mt-20 flex h-[260px] w-full max-w-xl items-center justify-center'>
        <div className='absolute h-[90px] w-[420px] -rotate-3 rounded-[50%] border border-violet-400/20' />
        <div className='absolute h-[130px] w-[500px] rotate-2 rounded-[50%] border border-violet-400/15' />
        <div className='absolute h-[170px] w-[560px] -rotate-1 rounded-[50%] border border-violet-400/10' />

        <div className='absolute h-40 w-40 rounded-full bg-violet-600/30 blur-3xl' />
        <div className='relative flex h-24 w-24 items-center justify-center rounded-full bg-violet-950 shadow-[0_0_45px_rgba(139,92,246,0.55)]'>
          <Image src='/logo.svg' alt='Logo' width={36} height={36} />
        </div>
      </div>
    </section>
  );
}
