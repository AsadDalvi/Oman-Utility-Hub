import React from "react";
import { haptics } from "./haptics";

export default function Navbar({ t, toggleLanguage, lang, theme, toggleTheme }) {
  const isDark = theme === "dark";

  return (
    <header 
      className={`sticky top-0 z-50 w-full backdrop-blur-md border-b transition-colors duration-300 ${
        isDark 
          ? "bg-slate-950/90 border-slate-800 shadow-lg shadow-black/30" 
          : "bg-white/90 border-slate-200 shadow-md shadow-slate-100/50"
      }`}
    >
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
              className={`font-semibold text-lg tracking-tight select-none transition-colors duration-300 ${
                isDark ? "text-slate-100" : "text-slate-900"
              }`}
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              {t.title}
            </span>
          </div>

          {/* Action Control Button Options Wrap */}
          <div className="flex items-center gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={() => { haptics.click(); toggleTheme(); }}
              className={`
                flex items-center justify-center w-10 h-10 rounded-lg border
                transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500
                ${
                  isDark
                    ? "bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800"
                    : "bg-slate-100 border-slate-300 text-violet-600 hover:bg-slate-200"
                }
              `}
              title={isDark ? t.lblToggleThemeLight : t.lblToggleThemeDark}
              aria-label="Toggle theme appearance"
            >

              {isDark ? (
                /* Sun Icon for Light Mode conversion */
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                /* Moon Icon for Dark Mode conversion */
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Language Toggle Button */}
            <button
              onClick={() => { haptics.click(); toggleLanguage(); }}
              className="
                flex items-center gap-2 px-4 py-2 rounded-lg
                bg-teal-600 hover:bg-teal-700 active:bg-teal-800
                text-white text-sm font-medium
                transition-colors duration-150 cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-teal-500
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
              {lang === "en" ? "العربية" : "English"}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}

