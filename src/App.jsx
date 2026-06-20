// frontend/src/App.jsx

import React, { useState } from 'react';
import { translations } from './translations';
import Navbar from './component/navbar';
import HeroIntro from './component/herointro';
import RentCalculation from './component/rentcalculation';
import FuelCalculation from './component/fuelcalculation';
import ResultDisplay from './component/resultdisplay';

function App() {
  // Global state to track if app is in English ('en') or Arabic ('ar')
  const [lang, setLang] = useState('en');
  
  // State to toggle between Rent Calculator view or Fuel Calculator view
  const [activeTab, setActiveTab] = useState('rent'); 
  
  // State to hold the final mathematical results from our Port 5000 backend
  const [calculationResult, setCalculationResult] = useState(null);

  // Helper shortcut to pull correct text lists out of our global dictionary
  const t = translations[lang];

  // Function to switch global languages and flip screen reading directions
  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  return (
    // Automatically adds dir="rtl" (right to left) or dir="ltr" (left to right) to flip the entire UI structure for language change
    <div dir={t.dir} className="min-h-screen bg-slate-950 font-sans transition-all duration-300">
      
      {/* 1. STICKY NAVBAR */}
      <Navbar lang={lang} toggleLanguage={toggleLanguage} t={t} />

      {/* MAIN CONTAINER CONTENT BOX */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* 2. INTRODUCTION PARAGRAPH & 11-TIP SLIDER */}
        {/* FIXED: Added missing lang prop so the sliding tips translate properly! */}
        <HeroIntro t={t} lang={lang} setActiveTab={setActiveTab} />

        {/* 3. INTERACTIVE SWITCHER BUTTONS */}
        <div className="flex justify-center max-w-md mx-auto bg-slate-800 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => { setActiveTab('rent'); setCalculationResult(null); }}
            className={`w-full py-2.5 px-4 text-sm font-medium rounded-lg transition-all cursor-pointer ${
              activeTab === 'rent' 
                ? 'bg-teal-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {t.btnRent}
          </button>
          <button
            onClick={() => { setActiveTab('fuel'); setCalculationResult(null); }}
            className={`w-full py-2.5 px-4 text-sm font-medium rounded-lg transition-all cursor-pointer ${
              activeTab === 'fuel' 
                ? 'bg-teal-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {t.btnFuel}
          </button>
        </div>

        {/* 4. WORKSPACE COLUMN WHERE CHOSEN CALCULATOR ON ONE SIDE AND RESULTS ON THE OTHER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Active input form panel */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
            {/* FIXED: Changed setCalculationResult to onSubmit and mapped result so components align perfectly! */}
            {activeTab === 'rent' ? (
              <RentCalculation t={t} lang={lang} onSubmit={setCalculationResult} result={calculationResult} />
            ) : (
              <FuelCalculation t={t} lang={lang} onSubmit={setCalculationResult} result={calculationResult} />
            )}
          </div>

          {/* Graphical Progress Bar Summary and Words Cards Display Box */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl min-h-72 flex flex-col justify-between">
            {/* FIXED: Passed lang prop here as well so the results box orientation stays tight! */}
            <ResultDisplay t={t} lang={lang} data={calculationResult} activeTab={activeTab} />
          </div>

        </div>

      </main>
    </div>
  );
}

export default App;
