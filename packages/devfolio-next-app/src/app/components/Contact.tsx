const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'Dribbble', href: '#' },
  { label: 'GitHub', href: '#' },
];

export default function Contact() {
  return (
    <section id='contact' className='px-6 py-24 md:px-16 lg:px-24'>
      <h2 className='text-2xl font-bold text-white'>Contact</h2>
      <p className='mt-4 max-w-xl text-sm text-white/60'>
        I&apos;m currently looking to join a cross-functional team that
        values improving people&apos;s lives through accessible design, or
        have a project in mind? Let&apos;s connect.
      </p>

      <a
        href='mailto:your.email@example.com'
        className='mt-6 inline-block text-sm text-violet-300 underline-offset-4 hover:underline'>
        your.email@example.com
      </a>

      <div className='mt-6 flex gap-5'>
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            className='text-sm text-white/50 transition-colors hover:text-white'>
            {social.label}
          </a>
        ))}
      </div>
    </section>
  );
}
