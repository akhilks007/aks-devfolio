type Project = {
  tag: string;
  title: string;
  description: string;
  reverse?: boolean;
};

// Placeholder entries — swap in your real projects.
const projects: Project[] = [
  {
    tag: 'Featured Project',
    title: 'Example Project',
    description:
      'A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.',
  },
  {
    tag: 'Featured Project',
    title: 'Example Project',
    description:
      'A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.',
    reverse: true,
  },
];

function BrowserMockup() {
  return (
    <div className='w-full overflow-hidden rounded-xl border border-white/10 bg-white shadow-2xl'>
      <div className='flex items-center gap-1.5 border-b border-black/5 px-3 py-2'>
        <span className='h-2 w-2 rounded-full bg-black/15' />
        <span className='h-2 w-2 rounded-full bg-black/15' />
        <span className='h-2 w-2 rounded-full bg-black/15' />
      </div>
      <div className='space-y-3 p-5'>
        <div className='h-3 w-24 rounded bg-black/10' />
        <div className='h-24 w-full rounded border border-dashed border-black/15 bg-black/[.03]' />
        <div className='h-3 w-2/3 rounded bg-black/10' />
        <div className='h-3 w-1/2 rounded bg-black/10' />
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id='projects' className='flex flex-col gap-24 px-6 py-24 md:px-16 lg:px-24'>
      {projects.map((project, i) => (
        <div
          key={i}
          className={`flex flex-col items-center gap-10 md:flex-row ${
            project.reverse ? 'md:flex-row-reverse' : ''
          }`}>
          <div className='w-full md:w-1/2'>
            <p className='text-xs font-semibold tracking-widest text-violet-400 uppercase'>
              {project.tag}
            </p>
            <h3 className='mt-1 text-2xl font-bold text-white'>
              {project.title}
            </h3>
            <div className='mt-4 rounded-xl border border-white/10 bg-white/5 p-5 text-sm text-white/70 backdrop-blur'>
              {project.description}
            </div>
          </div>
          <div className='w-full md:w-1/2'>
            <BrowserMockup />
          </div>
        </div>
      ))}
    </section>
  );
}
