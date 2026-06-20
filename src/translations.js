// frontend/src/translations.js

export const translations = {
  en: {
    dir: "ltr", //left to right for english
    langButton: "العربية",
    title: "Oman Smart Utility Hub",
    subtitle: "Take control of your wallet. Calculate your true living and driving costs across Oman instantly.",
    welcomeText: "Welcome to the Oman Smart Utility Hub! Living and driving in Oman can bring unexpected expenses, especially when summer hits. This free tool helps you take control of your monthly budget. Tell us your housing type, AC habits, and daily driving routes. Our app instantly calculates your true cost of living using official utility rates and fuel prices. It is simple math to help you save money and make smarter choices!",
    
    // Core Navigation Buttons
    btnRent: "Rent & Utilities Calculator",
    btnFuel: "Fuel Commute Calculator",
    tipTitle: "Energy-Saving Insights",

    // Rent Calculator Form Inputs
    rentHeading: "Rent & Utility Calculator Setup",
    labelRentBudget: "Monthly Rent Budget (OMR):",
    labelPropSize: "Property Size:",
    labelAcHours: "Daily AC Running Hours (Per Unit):",
    labelWaterHeater: "Enable Winter Water Heater Penalty",
    optSelectSize: "-- Select Size --",

    // Fuel Calculator Form Inputs
    fuelHeading: "Fuel Commute Calculator Setup",
    labelStart: "Starting Location:",
    labelEnd: "Destination Location:",
    labelCarType: "Vehicle Category:",
    labelEngine: "Engine Displacement Size:",
    labelFuelType: "Fuel Variant Type:",
    labelDays: "Commute Days Per Month:",
    optSelectLoc: "-- Select Location --",
    optSelectCar: "-- Select Car --",
    optSelectEngine: "-- Select Engine --",
    optSelectFuel: "-- Select Fuel --",

    // Display Units & Results Terms
    resultsHeading: "Calculated Living Cost Summary",
    unitOmr: "OMR",
    unitKwh: "kWh",
    unitKm: "km",
    unitLiters: "Liters",
    lblElecBill: "Estimated Nama Electricity Bill:",
    lblWaterBill: "Estimated Fixed Water Bill:",
    lblUtilityTotal: "Combined Utility Expenses:",
    lblTrueCost: "True Monthly Cost of Living:",
    lblDistance: "One-Way Commute Distance:",
    lblMonthlyDist: "Total Monthly Driving Distance:",
    lblFuelConsumed: "Estimated Petrol Consumed:",
    lblFuelCost: "Monthly Commute Fuel Cost:",
    lblSavingsTitle: "Your Smart Potential Savings:",
    lblSavingsDescRent: "By adjusting your AC thermostat to 24°C, cleaning your dust filters regularly, and turning off water heaters during the Muscat summer, you could save:",
    lblSavingsDescFuel: "By practicing smooth acceleration on Oman highways, keeping your tire pressure correct, and avoiding unnecessary engine idling, you could save:",


    // Vehicle & Fuel Dropdown Choices
    cars: { Sedan: "Sedan", Crossover: "Crossover", SUV: "SUV / Off-Road", Pickup: "Pickup Truck" },
    engines: { "1.5L-2.0L": "1.5L - 2.0L (Efficient)", "2.5L-3.5L": "2.5L - 3.5L (Medium)", "4.0L+": "4.0L+ (Heavy)" },
    fuels: { M91: "M91 Petrol", M95: "M95 Petrol", Diesel: "Diesel" },

    // 11 Oman Locations Dictionary
    locations: {
      "Al Maabilah": "Al Maabilah", "Ruwi": "Ruwi", "Seeb": "Seeb", "Al Khuwair": "Al Khuwair",
      "Muttrah": "Muttrah", "Barka": "Barka", "Sohar": "Sohar", "Musannah": "Musannah",
      "Samail": "Samail", "Amerat": "Amerat", "Ansab": "Ansab", "Salalah": "Salalah",
      "Al Khoud": "Al Khoud"
    },

    // 7BHK Easter Egg Text
    easterEggTitle: "System Freeze! 🥶",
    easterEggMessage: "Too many ACs! You are cooling down all of Oman. Turn off some cooling units or use a normal house layout!",
    btnReset: "Go Back / Reset Form"
  },

  
  ar: {
    dir: "rtl", //right to left for arabic
    langButton: "English",
    title: "منصة عُمان الذكية للخدمات",
    subtitle: "تحكّم في ميزانيتك. احسب التكلفة الحقيقية للمعيشة والقيادة في عُمان فوراً.",
    welcomeText: "مرحباً بكم في منصة عُمان الذكية للخدمات! المعيشة والقيادة في عُمان قد تأتي أحياناً بمفاجآت مالية غير متوقعة، خاصة مع بداية حرارة الصيف. تم بناء هذه الأداة المجانية لتمحك تحكماً كاملاً في ميزانيتك الشهرية. من خلال اختيار منطقتك، وحجم مسكنك، ومسارات قيادتك اليومية، تقوم حاسبتنا الذكية بحساب التكلفة الحقيقية لمعيشتك باستخدام تعرفة الكهرباء الرسمية في عُمان وأسعار الوقود الحالية. لا توجد رسوم خفية ولا حسابات معقدة—فقط أرقام بسيطة تساعدك على اتخاذ قرارات مالية ذكية وتوفير المزيد من المال في جيبك!",
    
    btnRent: "حاسبة الإيجار والخدمات",
    btnFuel: "حاسبة وقود المشاوير",
    tipTitle: "نصائح ذكية لتوفير الطاقة",

    rentHeading: "إعدادات حاسبة الإيجار والخدمات",
    labelRentBudget: "ميزانية الإيجار الشهري (ريال عُماني):",
    labelPropSize: "حجم العقار أو السكن:",
    labelAcHours: "ساعات تشغيل المكيف يومياً (لكل وحدة):",
    labelWaterHeater: "تفعيل زيادة استهلاك سخان المياه الشتوي",
    optSelectSize: "-- اختر الحجم --",

    fuelHeading: "إعدادات حاسبة وقود المشاوير",
    labelStart: "نقطة الانطلاق وبداية المشوار:",
    labelEnd: "الوجهة ونهاية المشوار:",
    labelCarType: "فئة ونوع المركبة:",
    labelEngine: "سعة وحجم محرك السيارة:",
    labelFuelType: "نوع الوقود المستخدم:",
    labelDays: "عدد أيام المشاوير في الشهر:",
    optSelectLoc: "-- اختر الموقع --",
    optSelectCar: "-- اختر نوع السيارة --",
    optSelectEngine: "-- اختر حجم المحرك --",
    optSelectFuel: "-- اختر نوع الوقود --",

    resultsHeading: "ملخص تكلفة المعيشة المحسوبة",
    unitOmr: "ر.ع",
    unitKwh: "ك.و.س",
    unitKm: "كم",
    unitLiters: "لتر",
    lblElecBill: "فاتورة نماء للكهرباء المتوقعة:",
    lblWaterBill: "فاتورة المياه الثابتة المقدرة:",
    lblUtilityTotal: "إجمالي مصاريف الخدمات والعدادات:",
    lblTrueCost: "التكلفة الشهرية الحقيقية للمعيشة:",
    lblDistance: "مسافة المشوار (اتجاه واحد):",
    lblMonthlyDist: "إجمالي مسافة القيادة الشهرية:",
    lblFuelConsumed: "كمية الوقود المستهلكة المقدرة:",
    lblFuelCost: "تكلفة وقود المشاوير الشهرية:",
    lblSavingsTitle: "مجموع توفيرك الذكي المحتمل:",
    lblSavingsDescRent: "من خلال ضبط ترموستات المكيف عند 24 درجة مئوية، وتنظيف فلاتر الغبار بانتظام، وإطفاء سخانات المياه خلال الصيف، يمكنك توفير:",
    lblSavingsDescFuel: "من خلال القيادة السلسة على طرق عُمان السريعة، وتعديل ضغط الإطارات الصحيح، وتجنب تشغيل المحرك أثناء الوقوف، يمكنك توفير:",

    cars: { Sedan: "صالون", Crossover: "كروس أوفر", SUV: "دفع رباعي / فورويل", Pickup: "بيك آب / شاحنة" },
    engines: { "1.5L-2.0L": "1.5L - 2.0L (اقتصادي)", "2.5L-3.5L": "2.5L - 3.5L (متوسط)", "4.0L+": "4.0L+ (ثقيل)" },
    fuels: { M91: "بنزين عادي / جيد (M91)", M95: "بنزين ممتاز (M95)", Diesel: "ديزل" },

    locations: {
      "Al Maabilah": "المعبيلة", "Ruwi": "روي", "Seeb": "السيب", "Al Khuwair": "الخوير",
      "Muttrah": "مطرح", "Barka": "بركاء", "Sohar": "صحار", "Musannah": "المصنعة",
      "Samail": "سمائل", "Amerat": "العامرات", "Ansab": "الأنصب", "Salalah": "صلالة",
      "Al Khoud": "الخوض"
    },

    easterEggTitle: "تجمد النظام! 🥶",
    easterEggMessage: "مكيفات كثيرة جداً! أنت تقوم بتبريد عُمان بأكملها. يرجى إطفاء بعض التكييف أو اختيار حجم منزل طبيعي!",
    btnReset: "العودة / إعادة تعيين الاستمارة"
  }
};
