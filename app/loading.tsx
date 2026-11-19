/** Route-level loading state, in the same register as the rest of the site. */
export default function Loading() {
  return (
    <div className="grid min-h-svh place-items-center bg-void" role="status" aria-live="polite">
      <div className="w-[min(18rem,60vw)] text-center">
        <p className="font-display text-2xl font-semibold tracking-[-0.03em] text-bone">BSM</p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-dim">Loading</p>
        <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-line">
          <div className="h-full w-1/3 animate-[slide_1.4s_ease-in-out_infinite] rounded-full bg-brass" />
        </div>
      </div>
      <style>{`@keyframes slide{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}`}</style>
    </div>
  );
}
