export default function Header() {
  return (
    <header className="sticky top-0 z-40 animate-enter">
      <div className="absolute inset-0 bg-[#100d09]/95 backdrop-blur-md border-b border-[var(--color-line)]" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-3 flex items-center justify-between gap-4">

        {/* Left: Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#c48a3a] to-[#7a4a18] flex items-center justify-center flex-shrink-0">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7" cy="7" r="3" stroke="#1a100a" strokeWidth="1.5"/>
              <circle cx="7" cy="7" r="6" stroke="#1a100a" strokeWidth="1"/>
              <line x1="7" y1="1" x2="7" y2="13" stroke="#1a100a" strokeWidth="1"/>
              <line x1="1" y1="7" x2="13" y2="7" stroke="#1a100a" strokeWidth="1"/>
            </svg>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[17px] font-bold text-white tracking-widest leading-none uppercase">
              FlowMate
            </span>
            <span className="hidden sm:block text-[#c48a3a]/50 text-sm leading-none">/</span>
            <span className="hidden sm:block text-[11px] text-[#d4b890] font-medium leading-none tracking-wide">
              AI Group Project Coordinator
            </span>
          </div>
        </div>

        {/* Right: User */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#c48a3a] to-[#7a4a18] flex items-center justify-center ring-1 ring-[#e8c48a]/20">
            <span className="text-[10px] font-bold text-[#1a100a]">K</span>
          </div>
          <span className="hidden sm:block text-[12px] font-medium text-[#e2d3bc]">
            Kunal
          </span>
        </div>

      </div>
    </header>
  );
}
