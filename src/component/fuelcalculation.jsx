import React, { useState, useCallback } from "react";

const INITIAL_STATE = {
  startPoint: "",
  destination: "",
  vehicle: "",
  engine: "",
  fuel: "",
  commuteDays: "",
};

export default function FuelCalculation({ t, lang, onSubmit }) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const isRtl = lang === "ar";

  const locations = t.locations ? Object.entries(t.locations) : [];
  const cars = Array.isArray(t.cars) ? t.cars : Object.entries(t.cars || {});
  const engines = Array.isArray(t.engines) ? t.engines : Object.entries(t.engines || {});
  const fuels = Array.isArray(t.fuels) ? t.fuels : Object.entries(t.fuels || {});

  const normalizeOptions = (data) => {
    if (!data || data.length === 0) return [];
    const first = data[0];
    if (Array.isArray(first)) return data; // already [key, label] pairs
    if (typeof first === "string") return data.map((v) => [v, v]);
    if (typeof first === "object") return data.map((v) => [v.value ?? v.key ?? v.id ?? v, v.label ?? v.name ?? v.value ?? v]);
    return [];
  };

  const locationOptions = locations;
  const carOptions = normalizeOptions(cars);
  const engineOptions = normalizeOptions(engines);
  const fuelOptions = normalizeOptions(fuels);


  const validate = () => {
    const e = {};
    if (!form.startPoint) e.startPoint = t.errRequired || "Required";
    if (!form.destination) e.destination = t.errRequired || "Required";
    if (form.startPoint && form.destination && form.startPoint === form.destination) {
      e.destination = t.errSameLocation || (isRtl ? "نقطة البداية والوجهة متطابقتان" : "Start and destination cannot be the same");
    }
    if (!form.vehicle) e.vehicle = t.errRequired || "Required";
    if (!form.engine) e.engine = t.errRequired || "Required";
    if (!form.fuel) e.fuel = t.errRequired || "Required";

    // Checks if the field is blank, negative, or not a number to completely allows numbers higher than 31
    if (!form.commuteDays || isNaN(Number(form.commuteDays)) || Number(form.commuteDays) < 1) {
      e.commuteDays = t.errRequired || (isRtl ? "مطلوب" : "Required");
    }

    return e;
  };

  
  const handleChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined, destination: undefined }));
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Run validation check rules
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      
      // Transmit the driving settings directly to your cloud backend web address
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/fuel`, {
        
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          startPoint: form.startPoint,
          endPoint: form.destination, // Maps 'form.destination' to backend parameters!
          carType: form.vehicle,       // Maps'form.vehicle' to backend parameters!
          engineSize: form.engine,     // Maps 'form.engine' to backend parameters!
          fuelType: form.fuel,         // Maps 'form.fuel' to backend parameters!
          daysPerMonth: Number(form.commuteDays)
        })
      });
      
      const data = await response.json();
      
      // 3. Send the final fuel math outputs back up to update your ResultDisplay cards
      onSubmit?.(data);
    } catch (error) {
      console.error("Backend Fuel Connection Error:", error);
    }
  };




  const SelectField = ({ id, label, value, onChange, options, error, placeholder }) => (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-slate-400 mb-1.5">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full bg-slate-800 border rounded-lg px-4 py-2.5
          text-slate-100 text-sm
          focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
          transition-colors duration-150 cursor-pointer
          ${error ? "border-red-600" : "border-slate-700 hover:border-slate-600"}
        `}
      >
        <option value="" disabled>
          {placeholder || (isRtl ? "اختر..." : "Select...")}
        </option>
        {options.map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6" dir={isRtl ? "rtl" : "ltr"}>
        <div className="w-8 h-8 rounded-lg bg-teal-600/20 border border-teal-600/30 flex items-center justify-center">
          <svg className="w-4 h-4 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
          </svg>
        </div>
        <h2 className="text-base font-semibold text-slate-100">
          {t.fuelTitle || (isRtl ? "احتساب تكاليف الوقود" : "Fuel Cost Calculator")}
        </h2>
      </div>

      <form onSubmit={handleSubmit} noValidate dir={isRtl ? "rtl" : "ltr"}>
        <div className="space-y-5">


{/* Route: Start & Destination side by side on wider screens */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

  {/* Starting Location Dropdown Component */}
  <div>
    <label className="block text-xs font-medium text-slate-400 mb-1.5">
      {t.labelStart}
    </label>
    <select
      value={form.startPoint}
      onChange={(e) => handleChange("startPoint", e.target.value)}
      className={`
        w-full bg-slate-800 border rounded-lg px-4 py-2.5
        text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
        transition-colors duration-150 cursor-pointer
        ${errors.startPoint ? "border-red-600" : "border-slate-700 hover:border-slate-600"}
      `}
    >
      <option value="">{t.optSelectLoc}</option>
      {Object.keys(t.locations).map((key) => (
        <option key={key} value={key}>
          {t.locations[key]}
        </option>
      ))}
    </select>
    {errors.startPoint && (
      <p className="mt-1 text-xs text-red-400">{errors.startPoint}</p>
    )}
  </div>

  {/* Destination Location Dropdown Component */}
  <div>
    <label className="block text-xs font-medium text-slate-400 mb-1.5">
      {t.labelEnd}
    </label>
    <select
      value={form.destination}
      onChange={(e) => handleChange("destination", e.target.value)}
      className={`
        w-full bg-slate-800 border rounded-lg px-4 py-2.5
        text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
        transition-colors duration-150 cursor-pointer
        ${errors.destination ? "border-red-600" : "border-slate-700 hover:border-slate-600"}
      `}
    >
      <option value="">{t.optSelectLoc}</option>
      {Object.keys(t.locations).map((key) => (
        <option key={key} value={key}>
          {t.locations[key]}
        </option>
      ))}
    </select>
    {errors.destination && (
      <p className="mt-1 text-xs text-red-400">{errors.destination}</p>
    )}
  </div>

</div>



          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-xs text-slate-500 shrink-0">
              {t.lblVehicleSection || (isRtl ? "تفاصيل المركبة" : "Vehicle Details")}
            </span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* Vehicle Category */}
          <SelectField
            id="vehicle"
            label={t.lblVehicle || (isRtl ? "فئة المركبة" : "Vehicle Category")}
            value={form.vehicle}
            onChange={(v) => handleChange("vehicle", v)}
            options={carOptions}
            error={errors.vehicle}
            placeholder={t.selectPlaceholder || (isRtl ? "اختر فئة..." : "Choose category...")}
          />

          {/* Engine & Fuel side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              id="engine"
              label={t.lblEngine || (isRtl ? "حجم المحرك" : "Engine Size")}
              value={form.engine}
              onChange={(v) => handleChange("engine", v)}
              options={engineOptions}
              error={errors.engine}
              placeholder={t.selectPlaceholder || (isRtl ? "اختر..." : "Select...")}
            />
            <SelectField
              id="fuel"
              label={t.lblFuel || (isRtl ? "نوع الوقود" : "Fuel Variant")}
              value={form.fuel}
              onChange={(v) => handleChange("fuel", v)}
              options={fuelOptions}
              error={errors.fuel}
              placeholder={t.selectPlaceholder || (isRtl ? "اختر..." : "Select...")}
            />
          </div>

          {/* Commute Days */}
          <div>
            <label htmlFor="commuteDays" className="block text-xs font-medium text-slate-400 mb-1.5">
              {t.lblCommuteDays || (isRtl ? "أيام التنقل شهرياً" : "Commute Days Per Month")}
            </label>
            <div className="relative">

              <input
                id="commuteDays"
                type="number"
                min="1"
                value={form.commuteDays}
                onChange={(e) => handleChange("commuteDays", e.target.value)}
                placeholder={isRtl ? "مثال: 22 (اليوم الواحد يشمل الذهاب والعودة معًا)": "e.g. 22 (1 day equals going and coming back)"}
                className={`
                  w-full bg-slate-800 border rounded-lg px-4 py-2.5
                  text-slate-100 text-sm placeholder-slate-600
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                  transition-colors duration-150
                  ${errors.commuteDays ? "border-red-600" : "border-slate-700 hover:border-slate-600"}
                `}
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 pointer-events-none">
                {isRtl ? "يوم/شهر" : "days/mo"}
              </span>
            </div>
            {errors.commuteDays && (
              <p className="mt-1 text-xs text-red-400">{errors.commuteDays}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full py-3 px-6 rounded-xl
              bg-teal-600 hover:bg-teal-700 active:bg-teal-800
              text-white font-semibold text-sm
              transition-colors duration-150
              focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900
              shadow-md shadow-teal-900/30
              flex items-center justify-center gap-2
            "
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            {t.btnCalculate || (isRtl ? "احسب التكاليف" : "Calculate Costs")}
          </button>
        </div>
      </form>
    </div>
  );
}
