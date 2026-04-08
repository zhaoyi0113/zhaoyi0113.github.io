import {
  articles,
  certifications,
  experience,
  profile,
  projects,
  publications,
  skillGroups,
} from './data/content'

const nav = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'writing', label: 'Writing' },
]

function GridBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.15),transparent)]" />
      <div className="aurora-blob absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-fuchsia-500/20 blur-[100px]" />
      <div
        className="aurora-blob absolute bottom-0 left-[-15%] h-[380px] w-[380px] rounded-full bg-cyan-500/15 blur-[90px]"
        style={{ animationDelay: '-3s' }}
      />
      <div
        className="grid-perspective absolute -top-1/2 left-0 right-0 h-[200%] opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167, 139, 250, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,#030712_85%)]" />
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#030712]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <a
          href="#top"
          className="font-mono text-sm font-medium tracking-tight text-zinc-100"
        >
          <span className="text-cyan-400">~/</span>joey
        </a>
        <nav
          className="flex max-w-[42vw] flex-1 justify-end gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:max-w-none md:flex-none md:justify-center md:gap-6 [&::-webkit-scrollbar]:hidden"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-zinc-500 transition-colors hover:text-cyan-400 md:text-xs"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-zinc-300 transition-colors hover:border-cyan-500/40 hover:text-cyan-300"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-zinc-300 transition-colors hover:border-fuchsia-500/40 hover:text-fuchsia-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </header>
  )
}

function SectionTitle({
  step,
  title,
  subtitle,
}: {
  step: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="mb-2 font-mono text-xs tracking-[0.25em] text-cyan-500/90">
        {step}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-500">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

function Hero() {
  const years = new Date().getFullYear() - profile.since
  return (
    <section
      id="top"
      className="relative border-b border-white/[0.06] px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 font-mono text-sm text-zinc-500">
          <span className="text-cyan-400/90">▸</span> Team Lead @ Zeller ·
          payments · platform engineering
        </p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 md:text-6xl md:leading-[1.08]">
          <span className="text-gradient">{profile.name}</span>
          <span className="mt-2 block text-zinc-400 md:mt-3">
            {profile.title}
          </span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
          {profile.tagline}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-xs text-zinc-400">
            Since {profile.since} · {years}+ yrs building software
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-xs text-zinc-400">
            {profile.location}
          </span>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={profile.links.medium}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 px-5 py-3 font-mono text-sm font-medium text-zinc-100 ring-1 ring-inset ring-white/15 transition hover:ring-cyan-400/40"
          >
            Read on Medium
            <span aria-hidden>↗</span>
          </a>
          <a
            href="#experience"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 font-mono text-sm text-zinc-300 transition hover:border-zinc-500 hover:bg-white/[0.03]"
          >
            View timeline
          </a>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          step="01 / PROFILE"
          title="Technical lead with a builder’s mindset"
          subtitle="From healthcare imaging platforms to fintech at scale — shipping systems that teams can evolve safely."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c1222]/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] backdrop-blur-sm md:p-8">
            <pre className="font-mono text-[13px] leading-relaxed text-zinc-400">
              <span className="text-zinc-600">$ </span>
              <span className="text-cyan-400">cat</span> ./bio.txt{'\n\n'}
              <span className="text-zinc-300">
                I care about architecture you can reason about, APIs that stay
                stable under load, and teams that own quality end-to-end.
                {'\n\n'}
                Outside of work: writing on AI, ML, blockchain, and cloud — see
                the writing section for articles.
              </span>
            </pre>
          </div>
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-violet-950/40 to-[#0c1222] p-6 md:p-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-fuchsia-400/80">
                Links
              </p>
              <ul className="mt-4 space-y-3 font-mono text-sm">
                <li>
                  <a
                    href={profile.links.github}
                    className="text-zinc-300 underline decoration-white/20 underline-offset-4 transition hover:text-cyan-300 hover:decoration-cyan-400/50"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/zhaoyi0113
                  </a>
                </li>
                <li>
                  <a
                    href={profile.links.medium}
                    className="text-zinc-300 underline decoration-white/20 underline-offset-4 transition hover:text-cyan-300 hover:decoration-cyan-400/50"
                    target="_blank"
                    rel="noreferrer"
                  >
                    medium.com/@zhaoyi0113
                  </a>
                </li>
                <li>
                  <a
                    href={profile.links.stackoverflow}
                    className="text-zinc-300 underline decoration-white/20 underline-offset-4 transition hover:text-cyan-300 hover:decoration-cyan-400/50"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Stack Exchange profile
                  </a>
                </li>
                <li>
                  <a
                    href={profile.links.legacySite}
                    className="text-zinc-300 underline decoration-white/20 underline-offset-4 transition hover:text-cyan-300 hover:decoration-cyan-400/50"
                    target="_blank"
                    rel="noreferrer"
                  >
                    zhaoyi0113.github.io
                  </a>
                </li>
              </ul>
            </div>
            <p className="font-mono text-xs text-zinc-600">
              // Also on LinkedIn for full recommendations and endorsements.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-white/[0.06] bg-black/20 px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          step="02 / EXPERIENCE"
          title="Where I’ve shipped"
          subtitle="A condensed timeline — details and endorsements live on LinkedIn."
        />
        <ol className="relative space-y-0 border-l border-white/10 pl-8 md:pl-10">
          {experience.map((job, i) => (
            <li key={i} className="relative pb-14 pl-2 md:pb-16 md:pl-4">
              <span
                className="absolute -left-[9px] top-1.5 h-[11px] w-[11px] rounded-full border-2 border-cyan-400 bg-[#030712] md:-left-[10px]"
                aria-hidden
              />
              <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between">
                <h3 className="text-lg font-semibold text-zinc-100">
                  {job.role}
                  {job.companyUrl ? (
                    <>
                      {' '}
                      <span className="text-zinc-600">@</span>{' '}
                      <a
                        href={job.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400/90 transition hover:text-cyan-300"
                      >
                        {job.company}
                      </a>
                    </>
                  ) : (
                    <>
                      {' '}
                      <span className="text-zinc-600">@</span>{' '}
                      <span className="text-zinc-200">{job.company}</span>
                    </>
                  )}
                </h3>
                <span className="font-mono text-xs text-zinc-500">
                  {job.period}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-zinc-600">
                {job.location}
              </p>
              <p className="mt-4 text-zinc-400">{job.summary}</p>
              <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-zinc-500 marker:text-cyan-600/80">
                {job.highlights.map((h, j) => (
                  <li key={j} className="pl-1">
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-400"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex font-mono text-sm text-cyan-400/80 hover:text-cyan-300"
        >
          Full profile on LinkedIn →
        </a>
      </div>
    </section>
  )
}

function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          step="03 / STACK"
          title="Tools and patterns"
          subtitle="Not exhaustive — a snapshot of what shows up most often in recent work."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((g) => (
            <div
              key={g.label}
              className="rounded-2xl border border-white/[0.08] bg-[#0c1222]/60 p-6 backdrop-blur-sm"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-fuchsia-400/90">
                {g.label}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg bg-white/[0.05] px-3 py-1.5 font-mono text-xs text-zinc-300 ring-1 ring-white/[0.06]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-white/[0.06] bg-black/20 px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          step="04 / PROJECTS"
          title="Things you can try"
          subtitle="Open-source and product work — including tooling used by other developers every day."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent p-6 transition hover:border-cyan-500/30 hover:shadow-[0_0_40px_-12px_rgba(34,211,238,0.35)]"
            >
              {p.badge ? (
                <span className="mb-3 w-fit rounded-md border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-violet-300">
                  {p.badge}
                </span>
              ) : null}
              <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-cyan-200">
                {p.name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-500">
                {p.description}
              </p>
              <span className="mt-4 font-mono text-xs text-cyan-500/80 group-hover:text-cyan-400">
                Open ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function WritingSection() {
  return (
    <section
      id="writing"
      className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          step="05 / WRITING"
          title="Articles & essays"
          subtitle="Selected posts from Medium — AI, cloud, smart contracts, and engineering practice."
        />
        <div className="space-y-3">
          {articles.map((a) => (
            <a
              key={a.url}
              href={a.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-[#0c1222]/50 px-5 py-4 transition hover:border-fuchsia-500/25 hover:bg-[#0c1222]/90 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-zinc-200 transition group-hover:text-fuchsia-200">
                  {a.title}
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {a.topics.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] uppercase tracking-wider text-zinc-600"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="shrink-0 font-mono text-xs text-zinc-600 group-hover:text-fuchsia-400/80">
                {a.date} · Medium ↗
              </span>
            </a>
          ))}
        </div>
        <div className="mt-14">
          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            InfoQ (中文)
          </h3>
          <ul className="mt-4 space-y-2">
            {publications.map((pub) => (
              <li key={pub.url}>
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-zinc-400 underline decoration-white/15 underline-offset-4 transition hover:text-cyan-300 hover:decoration-cyan-500/40"
                >
                  {pub.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 rounded-2xl border border-dashed border-white/10 p-6">
          <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-500/80">
            Certifications
          </h3>
          <ul className="mt-4 space-y-3">
            {certifications.map((c) => (
              <li
                key={c.name}
                className="flex flex-col gap-1 sm:flex-row sm:justify-between"
              >
                <span className="text-sm text-zinc-300">{c.name}</span>
                <span className="font-mono text-xs text-zinc-600">
                  {c.issuer} · {c.issued}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-5 py-12 md:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-xs text-zinc-600">
          © {new Date().getFullYear()} {profile.name}. Built with React & Vite.
        </p>
        <div className="flex flex-wrap gap-4 font-mono text-xs">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 hover:text-zinc-300"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 hover:text-zinc-300"
          >
            LinkedIn
          </a>
          <a
            href={profile.links.medium}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 hover:text-zinc-300"
          >
            Medium
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="relative min-h-dvh">
      <GridBackdrop />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <WritingSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
