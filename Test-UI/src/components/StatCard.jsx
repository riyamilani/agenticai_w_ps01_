export default function StatCard({ label, value, supportingText, icon: Icon, iconColor, iconBg }) {
  return (
    <article className="glass-panel rounded-2xl p-5 hover-lift animate-enter">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold text-[var(--color-ink-muted)] uppercase tracking-[0.14em] mb-1.5">
            {label}
          </p>
          <p className="font-display text-3xl font-bold text-[var(--color-ink)] leading-none tabular-nums">
            {value}
          </p>
          <p className="text-xs text-[var(--color-ink-muted)] mt-1.5">{supportingText}</p>
        </div>
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}
        >
          <Icon size={18} className={iconColor} />
        </div>
      </div>
    </article>
  );
}
