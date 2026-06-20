import React, { useState, useCallback } from "react";

const PROPERTY_SIZES = ["1BHK", "2BHK", "3BHK", "4BHK", "5BHK", "6BHK", "7BHK"];

const INITIAL_STATE = {
  monthlyRent: "",
  propertySize: "",
  acHours: 8,
  winterWaterHeater: false,
};

export default function RentCalculation({ t, lang, onSubmit, result }) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const isRtl = lang === "ar";

  // FIX: was result?.isEasterEgg in one block — kept, correct
  const isEasterEgg = result?.isEasterEgg === true;

  const validate = () => {
    const e = {};
    // Allows 0 but will still throw a "Required" error if the input is left blank or negative
    if (form.monthlyRent === "" || isNaN(Number(form.monthlyRent)) || Number(form.monthlyRent) < 0) {
      e.monthlyRent = t.errRequired || (isRtl ? "مطلوب" : "Required");
    }
    if (!form.propertySize) {
      e.propertySize = t.errRequired || (isRtl ? "مطلوب" : "Required");
    }
    return e;
  };

  const handleChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  // FIX: merged both versions — async fetch from first block, useCallback from second
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const errs = validate();
      if (Object.keys(errs).length) {
        setErrors(errs);
        return;
      }
      try {

      // Send the form values straight to your cloud backend web address
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/rent`, { 
        
        method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            propertySize: form.propertySize,
            acUsageHours: Number(form.acHours),
            includeWaterHeater: form.winterWaterHeater,
          }),
        });
        const data = await response.json();
        onSubmit?.({ ...data, rentBudget: Number(form.monthlyRent) || 0 });
      } catch (error) {
        console.error("Backend Connection Error:", error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form, onSubmit]
  );

  // FIX: passes a structured reset signal instead of null
  const handleReset = useCallback(() => {
    setForm(INITIAL_STATE);
    setErrors({});
    onSubmit?.({ type: "rent", reset: true });
  }, [onSubmit]);

  return (
    <>
      {/* z-index raised to z-50 so nothing can overlap the modal */}
      {isEasterEgg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          role="alertdialog"
          aria-modal="true"
        >
          <div
            className="relative bg-slate-900 border border-red-800/60 rounded-2xl shadow-2xl shadow-black/60 p-8 max-w-md w-full mx-4 text-center"
            dir={isRtl ? "rtl" : "ltr"}
          >
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 rounded-full bg-red-950/70 border-2 border-red-700/60 flex items-center justify-center animate-pulse">
                <svg
                  className="w-10 h-10 text-red-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-red-300 mb-3">{t.easterEggTitle}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-7">{t.easterEggMessage}</p>
            <button
              onClick={handleReset}
              className="w-full py-3 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-md shadow-teal-900/40 cursor-pointer"
            >
              {t.btnReset}
            </button>
          </div>
        </div>
      )}

      {/* FIX: single unified form panel — orphaned second block merged here */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-6" dir={isRtl ? "rtl" : "ltr"}>
          <div className="w-8 h-8 rounded-lg bg-teal-600/20 border border-teal-600/30 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-teal-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-slate-100">{t.rentHeading}</h2>
        </div>

        <form onSubmit={handleSubmit} noValidate dir={isRtl ? "rtl" : "ltr"}>
          <div className="space-y-5">
            {/* Monthly Rent */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                {t.labelRentBudget}
              </label>
              <input
                type="number"
                min="0"
                value={form.monthlyRent}
                onChange={(e) => handleChange("monthlyRent", e.target.value)}
                placeholder={isRtl ? "مثال: 250" : "e.g. 250"}
                className={`w-full bg-slate-800 border rounded-lg px-4 py-2.5 text-slate-100 text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-150 ${
                  errors.monthlyRent ? "border-red-600" : "border-slate-700 hover:border-slate-600"
                }`}
              />
              {errors.monthlyRent && (
                <p className="mt-1 text-xs text-red-400">{errors.monthlyRent}</p>
              )}
            </div>

            {/* Property Size */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                {t.labelPropSize}
              </label>
              <select
                value={form.propertySize}
                onChange={(e) => handleChange("propertySize", e.target.value)}
                className={`w-full bg-slate-800 border rounded-lg px-4 py-2.5 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-150 cursor-pointer ${
                  errors.propertySize ? "border-red-600" : "border-slate-700 hover:border-slate-600"
                }`}
              >
                <option value="" disabled>
                  {t.optSelectSize}
                </option>
                {PROPERTY_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size === "7BHK" ? `${size} 👑` : size}
                  </option>
                ))}
              </select>
              {errors.propertySize && (
                <p className="mt-1 text-xs text-red-400">{errors.propertySize}</p>
              )}
            </div>

            {/* AC Hours Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-slate-400">{t.labelAcHours}</label>
                <span className="text-sm font-semibold text-teal-400 tabular-nums">
                  {form.acHours}h
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="24"
                step="1"
                value={form.acHours}
                onChange={(e) => handleChange("acHours", Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-500 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:shadow-teal-900/60 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-teal-500 [&::-moz-range-thumb]:border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 focus:ring-offset-slate-900"
                style={{
                  background: `linear-gradient(to right, #0d9488 0%, #0d9488 ${(form.acHours / 24) * 100}%, #334155 ${(form.acHours / 24) * 100}%, #334155 100%)`,
                }}
              />
              <div className="flex justify-between mt-1 text-xs text-slate-600">
                <span>0h</span>
                <span>12h</span>
                <span>24h</span>
              </div>
            </div>

            {/* Winter Water Heater Toggle */}
            <div className="flex items-center justify-between py-3 px-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div>
                <p className="text-sm font-medium text-slate-200">{t.labelWaterHeater}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isRtl ? "تفعيل احتساب سخان المياه" : "Include water heater in calculation"}
                </p>
              </div>
              {/* Added positive values that mirror the LTR positions correctly within the reversed flex container. */}
              <button
                type="button"
                role="switch"
                aria-checked={form.winterWaterHeater}
                onClick={() => handleChange("winterWaterHeater", !form.winterWaterHeater)}
                className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 shrink-0 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-800 cursor-pointer ${
                  form.winterWaterHeater ? "bg-teal-600" : "bg-slate-600"
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 mt-1 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                    form.winterWaterHeater ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-md shadow-teal-900/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              {t.btnRent}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
