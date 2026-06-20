import React from "react";

export default function Navbar({ t, toggleLanguage, lang }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-teal-600 shadow-md shadow-teal-900/50">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span
              className="text-slate-100 font-semibold text-lg tracking-tight select-none"
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              {t.title}
            </span>
          </div>

          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="
              flex items-center gap-2 px-4 py-2 rounded-lg
              bg-teal-600 hover:bg-teal-700 active:bg-teal-800
              text-white text-sm font-medium
              transition-colors duration-150
              focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-950
              shadow-sm shadow-teal-900/40
            "
            aria-label="Toggle language"
          >
            <svg
              className="w-4 h-4 opacity-80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {t.langButton}
          </button>
        </div>
      </div>
    </header>
  );
}
