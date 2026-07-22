// frontend/src/component/utilityledger.jsx
import React, { useState, useEffect } from "react";
import { haptics } from "./haptics";

export default function UtilityLedger({ t, lang, theme, globalSalary }) {
  const isRtl = lang === "ar";
  const isDark = theme === "dark";

  // Shifted default entries into placeholders, freeing values for transparent editable fields
  const [ledger, setLedger] = useState({
    rent: { value: "", placeholder: 220, active: true },
    electric: { value: "", placeholder: 45, active: true },
    fuel: { value: "", placeholder: 35, active: true },
    internet: { value: "", placeholder: 25, active: true },
  });

  const [totals, setTotals] = useState({ sum: 0, rentPct: 0, electricPct: 0, fuelPct: 0, internetPct: 0 });

  useEffect(() => {
    let sum = 0;
    Object.keys(ledger).forEach((key) => {
      if (ledger[key].active) {
        const currentVal = ledger[key].value === "" ? 0 : Number(ledger[key].value);
        sum += currentVal;
      }
    });

    const calcPct = (val, isActive) => {
      const currentVal = val === "" ? 0 : Number(val);
      return isActive && sum > 0 ? (currentVal / sum) * 100 : 0;
    };

    setTotals({
      sum,
      rentPct: calcPct(ledger.rent.value, ledger.rent.active),
      electricPct: calcPct(ledger.electric.value, ledger.electric.active),
      fuelPct: calcPct(ledger.fuel.value, ledger.fuel.active),
      internetPct: calcPct(ledger.internet.value, ledger.internet.active),
    });
  }, [ledger]);

  const handleToggle = (key) => {
    haptics.click();
    setLedger((prev) => ({
      ...prev,
      [key]: { ...prev[key], active: !prev[key].active },
    }));
  };

  const handleValueChange = (key, val) => {
    haptics.tick();
    const dynamicInput = val === "" ? "" : Math.max(0, parseInt(val, 10) || 0);
    setLedger((prev) => ({
      ...prev,
      [key]: { ...prev[key], value: dynamicInput },
    }));
  };

  // V2 SMART LOGIC MATRIX: Safety ceiling adapts dynamically if a salary profile exists!
  const dynamicCeiling = globalSalary > 0 ? globalSalary * 0.50 : 380;
  const isCrossedCeiling = totals.sum > dynamicCeiling;

  return (
    <div className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
      <div className="space-y-3.5">
        <h3 className={`text-sm font-bold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          {t.lblLedgerHeading}
        </h3>
        <p className="text-xs text-slate-500 leading-normal -mt-2">
          {t.lblLedgerDesc}
        </p>

        {/* V2 SMART REMINDER BADGE: Displays only if the user has calculated a salary profile first */}
        {globalSalary > 0 && (
          <div className={`mt-2 p-2 px-3 inline-flex items-center gap-2 rounded-lg text-xs font-bold border border-dashed transition-all ${
            isDark 
              ? "bg-teal-950/20 border-teal-800 text-teal-400" 
              : "bg-teal-50 border-teal-200 text-teal-700"
          }`}>
            <span>💰</span>
            <span>
              {isRtl 
                ? `الراتب المسجل الحالي: ${globalSalary.toLocaleString()} ر.ع.` 
                : `Current Tracked Salary: ${globalSalary.toLocaleString()} OMR`}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          {Object.keys(ledger).map((key) => {
            const item = ledger[key];
            let labelText = t.lblLedgerRent;
            if (key === "electric") labelText = t.lblLedgerElectric;
            if (key === "fuel") labelText = t.lblLedgerFuel;
            if (key === "internet") labelText = t.lblLedgerInternet;

            return (
              <div 
                key={key} 
                className={`flex items-center justify-between p-3.5 border rounded-xl transition-all duration-150 ${
                  item.active 
                    ? (isDark ? "bg-slate-900/60 border-teal-600/30" : "bg-teal-50/20 border-teal-600/20")
                    : (isDark ? "bg-slate-900/20 border-slate-800 opacity-40" : "bg-slate-50/50 border-slate-200 opacity-40")
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={item.active}
                    onChange={() => handleToggle(key)}
                    className="w-4 h-4 rounded text-teal-600 border-slate-400 bg-transparent accent-teal-600 cursor-pointer focus:ring-0"
                  />
                  <span className={`text-xs font-semibold ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                    {labelText}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="0"
                    value={item.value}
                    onChange={(e) => handleValueChange(key, e.target.value)}
                    placeholder={`e.g. ${item.placeholder}`}
                    disabled={!item.active}
                    className={`w-24 px-3 py-1.5 text-center font-mono text-xs font-bold border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-transparent transition-all ${
                      isDark 
                        ? "border-slate-700 text-teal-400 placeholder-slate-600 disabled:opacity-20" 
                        : "border-slate-300 text-teal-600 placeholder-slate-400 disabled:opacity-20"
                    }`}
                  />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{t.unitOmr}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`p-4 border rounded-xl flex items-center justify-between shadow-inner ${isDark ? "bg-slate-950/50 border-slate-900" : "bg-slate-100/50 border-slate-200"}`}>
        <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-600"}`}>
          {t.lblLedgerTotal}
        </span>
        <span className={`text-xl font-black font-mono tabular-nums ${isCrossedCeiling ? "text-red-500" : "text-teal-500"}`}>
          {totals.sum.toLocaleString()} <span className="text-xs font-bold text-slate-500 uppercase">{t.unitOmr}</span>
        </span>
      </div>

      {totals.sum > 0 && (
        <div className="space-y-4">
          <div className="h-4 w-full rounded-full overflow-hidden flex bg-slate-800/20 border border-slate-800/10">
            <div style={{ width: `${totals.rentPct}%` }} className="h-full bg-red-500 transition-all duration-500 ease-out" />
            <div style={{ width: `${totals.electricPct}%` }} className="h-full bg-amber-500 transition-all duration-500 ease-out" />
            <div style={{ width: `${totals.fuelPct}%` }} className="h-full bg-teal-500 transition-all duration-500 ease-out" />
            <div style={{ width: `${totals.internetPct}%` }} className="h-full bg-violet-500 transition-all duration-500 ease-out" />
          </div>

          <div className="grid grid-cols-2 gap-2 pb-2">
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
              <div className="w-2.5 h-2.5 rounded-sm bg-red-500 shrink-0" />
              <span className="truncate">{t.lblLedgerRent}: {Math.round(totals.rentPct)}%</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
              <div className="w-2.5 h-2.5 rounded-sm bg-amber-500 shrink-0" />
              <span className="truncate">{isRtl ? "المرافق" : "Utilities"}: {Math.round(totals.electricPct)}%</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
              <div className="w-2.5 h-2.5 rounded-sm bg-teal-500 shrink-0" />
              <span className="truncate">{isRtl ? "الوقود" : "Commute"}: {Math.round(totals.fuelPct)}%</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
              <div className="w-2.5 h-2.5 rounded-sm bg-violet-500 shrink-0" />
              <span className="truncate">{isRtl ? "الإنترنت" : "Internet"}: {Math.round(totals.internetPct)}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Alert notification scales text parameters automatically based on personalized limits */}
      <div className={`border p-4 rounded-xl shadow-xs transition-colors duration-300 ${
        isCrossedCeiling ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-600"
      }`}>
        <h4 className="text-xs font-bold mb-1 flex items-center gap-1.5">
          {isCrossedCeiling ? t.alertLedgerWarningTitle : t.alertLedgerNormalTitle}
        </h4>
        <p className={`text-[11px] leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
          {isCrossedCeiling 
            ? `${t.alertLedgerWarningDesc} (${lang === 'en' ? 'Limit:' : 'الحد:'} ${dynamicCeiling} ${t.unitOmr})`
            : `${t.alertLedgerNormalDesc} (${lang === 'en' ? 'Safe Limit:' : 'الحد الآمن:'} ${dynamicCeiling} ${t.unitOmr})`}
        </p>
      </div>
    </div>
  );
}

