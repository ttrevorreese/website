export default function MaintenancePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#0a0a0a]">
      <div className="max-w-md space-y-6">
        <p className="text-sm uppercase tracking-[0.2em] text-[#888888] font-mono">
          Trevor Reese
        </p>
        <h1
          className="text-4xl sm:text-5xl font-serif text-[#f0f0f0]"
          style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
        >
          Under Maintenance
        </h1>
        <p className="text-[#888888] text-base leading-relaxed">
          The site is temporarily down while I migrate to a new image host.
          Check back soon — everything will be back up shortly.
        </p>
        <div className="pt-4 border-t border-white/8">
          <a
            href="mailto:trevor.reese2002@gmail.com"
            className="text-sm text-[#888888] hover:text-[#f0f0f0] transition-colors duration-200"
          >
            trevor.reese2002@gmail.com
          </a>
        </div>
      </div>
    </main>
  )
}
