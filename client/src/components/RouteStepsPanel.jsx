export default function RouteStepsPanel({ route, onSave, saving, showSave = true }) {
  if (!route) return null;

  return (
    <div className="surface mt-5 flex min-h-0 flex-col gap-3 rounded-2xl p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="route-line-gradient w-16 mb-2" />
          <p className="font-display font-semibold text-navy text-lg leading-tight">
            {route.durationText}
          </p>
          <p className="text-sm text-ink/60 font-medium">{route.distanceText}</p>
        </div>
        {showSave ? (
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="text-xs px-4 py-2 rounded-full border border-navy text-navy hover:bg-navy hover:text-paper transition-all duration-300 disabled:opacity-60 hover:shadow-md"
          >
            {saving ? "Saving…" : "Save trip"}
          </button>
        ) : (
          <span className="text-xs text-emerald font-semibold bg-emerald/10 px-3 py-1.5 rounded-full">
            <i className="fa-solid fa-check mr-1" /> Saved
          </span>
        )}
      </div>

      <ol className="flex max-h-[38vh] min-h-0 flex-col gap-2 overflow-y-auto pr-1 lg:max-h-[45vh]">
        {route.steps.map((step, i) => (
          <li
            key={`${step.instruction}-${i}`}
            className="group relative flex gap-3 py-2 pl-4 border-l-2 border-mist hover:border-amber/50 transition-colors"
          >
            <span className="absolute -left-[9px] top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-navy border-2 border-mist group-hover:bg-amber group-hover:border-amber group-hover:text-paper transition-all">
              {i + 1}
            </span>
            <div className="flex-1">
              <p className="text-sm text-ink/80 leading-relaxed">
                <span dangerouslySetInnerHTML={{ __html: step.instruction }} />
              </p>
              <p className="text-xs text-ink/40 mt-0.5">
                {step.distanceText} · {step.durationText}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}