import React, { useState, useRef, useEffect, useCallback } from "react";

const TIPS = [
  {
    en: "Set your AC to 24°C. Lower temperatures blast your bill up by 6% per degree.",
    ar: "اضبط المكيف على 24 درجة. الدرجات الأقل ترفع فاتورتك بنسبة 6% لكل درجة.",
    icon: "❄️",
    label: { en: "24°C Rule", ar: "قاعدة 24°" },
  },
  {
    en: "Keep usage under 4,000 units. Crossing it raises the rate from 14 to 18 baisas.",
    ar: "حافظ على استهلاكك تحت 4,000 وحدة. تجاوزه يرفع السعر من 14 إلى 18 بيسة.",
    icon: "⚡",
    label: { en: "4,000 kWh Limit", ar: "حد 4,000 وحدة" },
  },
  {
    en: "Clean your AC filters every two weeks. Dirty filters waste 15% more power.",
    ar: "نظف فلاتر المكيف كل أسبوعين. الفلاتر المتسخة تستهلك طاقة أكثر بنسبة 15%.",
    icon: "🔧",
    label: { en: "Dirty Filters", ar: "الفلاتر المتسخة" },
  },
  {
    en: "Turn off water heaters in summer. Leaving them on wastes continuous electricity.",
    ar: "أطفئ سخانات المياه في الصيف. تركها تعمل يستهلك كهرباء مستمرة بلا فائدة.",
    icon: "🚿",
    label: { en: "Water Heaters", ar: "سخانات المياه" },
  },
  {
    en: "Use thick curtains during midday. Blocking sunlight keeps your rooms cooler for longer.",
    ar: "استخدم ستائر سميكة في منتصف النهار. حجب أشعة الشمس يحافظ على برودة الغرف لفترة أطول.",
    icon: "🪟",
    label: { en: "Sunlight Blockers", ar: "حجب الشمس" },
  },
  {
    en: "Avoid sudden speeding. Smooth driving saves up to 20% fuel on highways.",
    ar: "تجنب التسارع المفاجئ. القيادة السلسة توفر حتى 20% من الوقود على الطرق السريعة.",
    icon: "🚗",
    label: { en: "Smooth Driving", ar: "القيادة السلسة" },
  },
  {
    en: "Check your car manual. Most normal cars run perfectly on cheaper M91 petrol.",
    ar: "افحص دليل سيارتك. معظم السيارات العادية تعمل بشكل ممتاز بوقود M91 الأرخص.",
    icon: "📖",
    label: { en: "M91 vs M95", ar: "M91 مقابل M95" },
  },
  {
    en: "Remove heavy items from your trunk. Extra weight burns more fuel every kilometer.",
    ar: "تخلص من الأغراض الثقيلة في صندوق السيارة. الوزن الزائد يستهلك وقوداً أكثر في كل كيلومتر.",
    icon: "📦",
    label: { en: "Car Cargo", ar: "حمولة السيارة" },
  },
  {
    en: "Keep your tires pumped properly. Soft tires drag on the road and waste petrol.",
    ar: "حافظ على ضغط الإطارات الصحيح. الإطارات اللينة تزيد الاحتكاك بالطريق وتستهلك وقوداً أكثر.",
    icon: "🔵",
    label: { en: "Tire Pressure", ar: "ضغط الإطارات" },
  },
  {
    en: "Turn off your engine if parked for over a minute. Idling wastes gas fast.",
    ar: "أطفئ المحرك إذا كنت متوقفاً لأكثر من دقيقة. الوقوف والمحرك يعمل يستهلك الوقود بسرعة.",
    icon: "🅿️",
    label: { en: "Idle Engine", ar: "تشغيل بلا حركة" },
  },
  {
    en: "Fix small aerators on taps. They mix air with water to cut waste by half.",
    ar: "ركّب قطع توفير المياه في الحنفيات. إنها تخلط الماء بالهواء لتقليل الاستهلاك إلى النصف.",
    icon: "💧",
    label: { en: "Smart Nozzles", ar: "الحنفيات الذكية" },
  },
];

const VISIBLE = 3;

export default function HeroIntro({ t, lang, theme, setActiveTab }) {
  const isRtl = lang === "ar";
  const [startIndex, setStartIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(null);
  const autoRef = useRef(null);

  const total = TIPS.length;
  const maxStart = total - VISIBLE;

  const slide = useCallback(
    (dir) => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setStartIndex((prev) => {
          if (dir === "next") return prev >= maxStart ? 0 : prev + 1;
          return prev <= 0 ? maxStart : prev - 1;
        });
        setAnimating(false);
        setDirection(null);
      }, 300);
    },
    [animating, maxStart]
  );

  // Auto-advance sliding tips carousel window every 5 seconds
  useEffect(() => {
    autoRef.current = setInterval(() => slide("next"), 5000);
    return () => clearInterval(autoRef.current);
  }, [slide]);

  const resetAuto = (dir) => {
    clearInterval(autoRef.current);
    slide(dir);
    autoRef.current = setInterval(() => slide("next"), 5000);
  };

  const visibleTips = Array.from({ length: VISIBLE }, (_, i) => {
    const idx = (startIndex + i) % total;
    return { ...TIPS[idx], _key: idx };
  });

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Welcome Text Container Area */}
      <div className="mb-12 text-center" dir={isRtl ? "rtl" : "ltr"}>
        {/* Main Header Brand Title */}
      <h1 className={`text-3xl sm:text-4xl font-bold mb-3 leading-tight transition-colors ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
        {t.title}
      </h1>
        {/* Subtitle */}
        <p className="text-lg text-teal-400 font-medium mb-6">
          {t.subtitle}
        </p>
        {/* Core Introductory Paragraph Text */}
        <p className={`text-sm sm:text-base max-w-3xl mx-auto leading-relaxed p-6 rounded-2xl border transition-all duration-300 shadow-md ${
          theme === 'dark' ? 'bg-slate-900/40 border-slate-800/60 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
        }`}>
          {t.welcomeText}
        </p>
      </div>




     {/* Tips Carousel */}
      <div>
        {/* Section Label */}
        <div
          className="flex items-center gap-2 mb-5"
          dir={isRtl ? "rtl" : "ltr"}
        >
          <div className="w-1 h-5 rounded-full bg-teal-500" />
          <span className="text-sm font-semibold text-teal-400 uppercase tracking-widest">
            {t.tipTitle}
          </span>
        </div>

        <div className="relative flex items-center gap-3">
          {/* Prev Arrow */}
          <button
            onClick={() => resetAuto("prev")}
            className="shrink-0 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-950 disabled:opacity-30 cursor-pointer"
            aria-label="Previous tip"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {isRtl ? <polyline points="9 18 15 12 9 6" /> : <polyline points="15 18 9 12 15 6" />}
            </svg>
          </button>

          {/* Cards Track */}
          <div className="flex-1 overflow-hidden">
            <div
              className={`grid grid-cols-1 sm:grid-cols-3 gap-4 transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"}`}
            >
              {visibleTips.map((tip, i) => (
                <div
                  key={tip._key}
                  className={`relative border rounded-xl p-5 flex flex-col gap-3 transition-all duration-300 ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                  }`}
                  dir={isRtl ? "rtl" : "ltr"}
                >
                  {/* Icon + Label */}
                  <div className="flex items-center gap-2">
                    <span className="text-2xl leading-none">{tip.icon}</span>
                    <span className="text-xs font-semibold text-teal-500 dark:text-teal-400 uppercase tracking-wide">
                      {tip.label[lang] || tip.label.en}
                    </span>
                  </div>
              {/* Tip Text */}
              <p
                className={`text-sm leading-relaxed flex-1 transition-colors duration-200 ${
                  theme === "dark"
                    ? "text-slate-300"
                    : "text-slate-900 font-medium"
                }`}
                  >
                {tip[lang] || tip.en}
              </p>

                  {/* Bottom accent line */}
                  <div className="h-0.5 w-full bg-teal-600/20" />
                  {/* Tip number badge */}
                  <span className="absolute top-3 right-3 text-xs text-slate-400 dark:text-slate-600 font-mono">
                    {String(tip._key + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Arrow */}
          <button
            onClick={() => resetAuto("next")}
            className="shrink-0 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-950 cursor-pointer"
            aria-label="Next tip"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {isRtl ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-5">
          {Array.from({ length: maxStart + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                clearInterval(autoRef.current);
                setStartIndex(i);
                autoRef.current = setInterval(() => slide("next"), 5000);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${startIndex === i ? "w-6 bg-teal-500" : "w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"}`}
              aria-label={`Go to tip set ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

