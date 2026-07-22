// frontend/src/App.jsx
import React, { useState } from 'react';
import { translations } from './translations';
import Navbar from './component/navbar';
import HeroIntro from './component/herointro';
import RentCalculation from './component/rentcalculation';
import FuelCalculation from './component/fuelcalculation';
import SalaryCalculation from './component/salarycalculation';
import UtilityLedger from './component/utilityledger';
import ResultDisplay from './component/resultdisplay';
import { haptics } from './component/haptics';

function App() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('rent'); 
  const [calculationResult, setCalculationResult] = useState(null);
  const [theme, setTheme] = useState('dark');
  
  // V2. Global state to sync salary between budget and ledger tools
  const [globalSalary, setGlobalSalary] = useState(0);

  const t = translations[lang];
  const isDark = theme === 'dark';

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const getTabClass = (tabId) => {
    const isActive = activeTab === tabId;
    if (isDark) {
      return isActive ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800';
    } else {
      return isActive ? 'bg-teal-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200 border-slate-300';
    }
  };

  const isSplitLayout = activeTab === 'rent' || activeTab === 'fuel';

  return (
    <div 
      dir={t.dir} 
      className={`min-h-screen font-sans transition-colors duration-300 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* 1. STICKY NAVBAR */}
      <Navbar lang={lang} toggleLanguage={toggleLanguage} theme={theme} toggleTheme={toggleTheme} t={t} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* 2. INTRODUCTION ACCENT CARD */}
        <HeroIntro t={t} lang={lang} theme={theme} setActiveTab={setActiveTab} />

        {/* 3. RESPONSIVE SWITCHER TRAY GRID */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 max-w-4xl mx-auto p-1.5 rounded-xl border border-dashed transition-colors duration-150 ${
          isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-200 border-slate-300'
        }`}>
          <button
            onClick={() => { haptics.click(); setActiveTab('rent'); setCalculationResult(null); }}
            className={`py-2.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis ${getTabClass('rent')}`}
          >
            {t.btnRent}
          </button>
          
          <button
            onClick={() => { haptics.click(); setActiveTab('fuel'); setCalculationResult(null); }}
            className={`py-2.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis ${getTabClass('fuel')}`}
          >
            {t.btnFuel}
          </button>

          <button
            onClick={() => { haptics.click(); setActiveTab('budget'); setCalculationResult(null); }}
            className={`py-2.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis ${getTabClass('budget')}`}
          >
            {t.btnBudget}
          </button>

          <button
            onClick={() => { haptics.click(); setActiveTab('ledger'); setCalculationResult(null); }}
            className={`py-2.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis ${getTabClass('ledger')}`}
          >
            {t.btnLedger}
          </button>
        </div>

        {/* 4. WORKSPACE FLEX GRID ARCHITECTURE CONTAINER */}
        <div className={`grid gap-8 items-start ${isSplitLayout ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-3xl mx-auto'}`}>
          
          {/* COLUMN PANEL: Forms Inputs Frame */}
          <div className={`p-6 rounded-2xl border transition-all duration-300 shadow-xl ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            {activeTab === 'rent' && (
              <RentCalculation 
                t={t} 
                lang={lang} 
                theme={theme} 
                onSubmit={setCalculationResult} 
                setCalculationResult={setCalculationResult} 
                result={calculationResult} 
              />
            )}
            {activeTab === 'fuel' && (
              <FuelCalculation 
                t={t} 
                lang={lang} 
                theme={theme} 
                onSubmit={setCalculationResult} 
                setCalculationResult={setCalculationResult} 
                result={calculationResult} 
              />
            )}
            {activeTab === 'budget' && (
              <SalaryCalculation t={t} lang={lang} theme={theme} onSalaryCalculated={setGlobalSalary} />
            )}
            {activeTab === 'ledger' && (
              <UtilityLedger t={t} lang={lang} theme={theme} globalSalary={globalSalary} />
            )}
          </div>

          {/* COLUMN PANEL: Graphical Metric Bars Display */}
          {isSplitLayout && (
            <div className={`p-6 rounded-2xl border transition-all duration-300 shadow-xl min-h-72 flex flex-col justify-between ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <ResultDisplay t={t} lang={lang} theme={theme} data={calculationResult} activeTab={activeTab} />
            </div>
          )}

        </div>

      </main>
    </div>
  );
}

export default App;
