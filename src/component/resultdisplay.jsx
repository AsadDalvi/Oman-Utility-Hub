// src/component/resultdisplay.jsx
import React from "react";
export default function ResultDisplay({ t, lang, theme, data, activeTab }) {
/**
 * MetricBar — a labelled progress bar with an animated fill.
 */
function MetricBar({ label, value, unit, max, color = "teal", icon, lang }) {
  const isRtl = lang === "ar";
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  const colorMap = {
    teal: "bg-teal-500",
    emerald: "bg-emerald-500",
    sky: "bg-sky-500",
    violet: "bg-violet-500",
    amber: "bg-amber-500",
  };

  return (
    <div className="space-y-2" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <span className="text-base leading-none">{icon}</span>}
          <span
            className={`text-sm font-medium ${
           theme === "light" ? "text-slate-700" : "text-slate-300"
         }`}
        >
      {label}
     </span>
        </div>
        <span
       className={`text-sm font-bold tabular-nums ${
          theme === "light"
            ? "text-slate-900"
            : "text-slate-100"
          }`}
          >
          {typeof value === "number" ? value.toLocaleString() : value}
          {unit && <span className="text-xs font-normal text-slate-500 mx-1">{unit}</span>}
        </span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${colorMap[color]} transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/**
 * PlaceholderState — shown when no data is available yet.
 */
function PlaceholderState({ t, lang }) {
  const isRtl = lang === "ar";
  return (
    <div
      className="bg-transparent rounded-2xl flex flex-col items-center justify-center text-center min-h-72 w-full transition-colors duration-200"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-5 transition-colors duration-200">
        <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      </div>
      <h3 className="text-slate-800 dark:text-slate-300 font-semibold text-base mb-2 transition-colors duration-200">
        {isRtl ? "ملخص الحسابات" : "Calculation Summary"}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs leading-relaxed transition-colors duration-200">
        {isRtl
          ? "أكمل البيانات في الاستمارة واضغط على زر الحساب لتظهر لك النتائج والتحليلات البيانية فوراً."
          : "Complete the form parameters and submit to visualize your bills and financial analytics instantly."}
      </p>
    </div>
  );
}


/**
 * ResultDisplay — main export.
 */
  const isRtl = lang === "ar";
  
  // Safely check if valid calculation data was returned from our Port 5000 backend server
  const hasData = data && typeof data === "object" && !data.isEasterEgg && Object.keys(data).length > 0;

  if (!hasData) {
    return <PlaceholderState t={t} lang={lang} />;
  }

  // Extract variables depending on which calculator form tab is currently active
  const isRentView = activeTab === 'rent';
  
  // Dynamic fallback calculation definitions to keep layout graph rendering flawlessly
  const electricityBill = isRentView ? (data.electricityBill || 0) : 0;
  const waterBill = isRentView ? (data.waterBill || 0) : 0;
  const fuelCost = !isRentView ? (data.monthlyCost || 0) : 0;
  const totalDisplayFootprint = isRentView ? (data.rentBudget + data.utilityTotal) : data.monthlyCost;

  const maxVal = Math.max(electricityBill, waterBill, fuelCost, totalDisplayFootprint, 1);

  // Construct metric bars to draw the visual charts
  const metrics = isRentView ? [
    {
      key: "electricity",
      label: t.lblElecBill,
      value: electricityBill,
      unit: `${t.unitOmr} (${data.totalKwh || 0} ${t.unitKwh})`,
      color: "amber",
      icon: "⚡",
    },
    {
      key: "water",
      label: t.lblWaterBill,
      value: waterBill,
      unit: t.unitOmr,
      color: "sky",
      icon: "💧",
    },
    {
      key: "total",
      label: t.lblTrueCost,
      value: Number(totalDisplayFootprint.toFixed(3)),
      unit: t.unitOmr,
      color: "teal",
      icon: "🏢",
    }
  ] : [
    {
      key: "fuel",
      label: t.lblFuelCost,
      value: fuelCost,
      unit: t.unitOmr,
      color: "violet",
      icon: "⛽",
    },
    {
      key: "totalDist",
      label: t.lblMonthlyDist,
      value: data.monthlyDistance || 0,
      unit: t.unitKm,
      color: "sky",
      icon: "🚗",
    }
  ];

  return (
    <div className="space-y-4">
      {/* Main Metrics Panel Layout Container Box */}
      <div
        className={`border rounded-2xl p-6 shadow-lg transition-colors ${
          theme === "light"
          ? "bg-white border-slate-200"
          : "bg-slate-900 border-slate-800"
      }`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* Header Title block */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-teal-600/20 border border-teal-600/30 flex items-center justify-center">
            <svg className="w-4 h-4 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <h2
          className={`text-base font-semibold ${
            theme === "light"
            ? "text-slate-900"
            : "text-slate-100"
          }`}
              >
            {t.resultsHeading}
          </h2>
        </div>

        {/* Dynamic Metric Bars visual graph charts stack */}
        <div className="space-y-5">
          {metrics.map((m) => (
             <MetricBar
               key={m.key}
               label={m.label}
               value={m.value}
               unit={m.unit}
               max={maxVal}
               color={m.color}
               icon={m.icon}
               lang={lang}
               theme={theme}
            />
          ))}
        </div>


        {/* Summary Row Footprint Total */}
        <div
          className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between"
          dir={isRtl ? "rtl" : "ltr"}
        >
          {/* Changes title between True Cost or Fuel Cost instantly */}
          <span className="text-sm text-slate-400">
            {isRentView ? t.lblTrueCost : t.lblFuelCost}
          </span>
          
          {/* Shows the calculated total footprint price along with a small one-way distance label for fuel */}
          <div className="text-right">
            <span className="text-lg font-bold text-teal-400 tabular-nums">
              {Number(totalDisplayFootprint.toFixed(3)).toLocaleString()}
              <span className="text-xs font-normal text-slate-500 mx-1">{t.unitOmr}</span>
            </span>
            {!isRentView && (
              <p className="text-xs text-slate-500 mt-0.5">
                {t.lblDistance}: {data.oneWayDistance} {t.unitKm}
              </p>
            )}
          </div>
        </div>
      </div>



          {/* Glowing Smart Eco Insights Cash Potential Savings Card */}
      {data.potentialSavings > 0 && (
        <div
          className="relative overflow-hidden bg-linear-to-br from-teal-950/80 to-slate-900 border border-teal-700/40 rounded-2xl p-6 shadow-lg"
          dir={isRtl ? "rtl" : "ltr"}
        >
          {/* Glow background layout accent spots */}
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

          <div className="relative flex items-start gap-4">
            {/* Cash Icon Box */}
            <div className="shrink-0 w-12 h-12 rounded-xl bg-teal-600/20 border border-teal-500/30 flex items-center justify-center shadow-inner">
              <svg className="w-6 h-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>

            {/* Savings Content Messaging Text Column */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-1">
                {t.lblSavingsTitle}
              </p>
              
              {/* Dynamic Description swaps between Rent or Fuel text rows instantly! */}
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                {activeTab === 'rent' ? t.lblSavingsDescRent : t.lblSavingsDescFuel}
              </p>
              
              <div className="inline-flex items-baseline gap-1.5 bg-teal-600/15 border border-teal-500/20 rounded-xl px-4 py-2">
                <span className="text-2xl font-extrabold text-teal-300 tabular-nums leading-none">
                  {data.potentialSavings}
                </span>
                <span className="text-sm font-medium text-teal-500 mx-1">
                  {t.unitOmr} / {isRtl ? "شهر" : "mo"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}