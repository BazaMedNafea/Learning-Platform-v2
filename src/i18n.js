import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "./locales/en/common.json";
import arCommon from "./locales/ar/common.json";
import enHeroSection from "./locales/en/homepage/herosection.json";
import arHeroSection from "./locales/ar/homepage/herosection.json";
import enFeatureSection from "./locales/en/homepage/featuresection.json";
import arFeatureSection from "./locales/ar/homepage/featuresection.json";
import enTestimonialsSection from "./locales/en/homepage/testimonialssection.json";
import arTestimonialsSection from "./locales/ar/homepage/testimonialssection.json";
import enClassesSection from "./locales/en/homepage/classessection.json";
import arClassesSection from "./locales/ar/homepage/classessection.json";
import enClassPage from "./locales/en/classpage.json";
import arClassPage from "./locales/ar/classpage.json";
import enCourseContent from "./locales/en/coursecontent.json";
import arCourseContent from "./locales/ar/coursecontent.json";

// Retrieve the language from localStorage, default to 'en' if not found
const savedLanguage = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      "homepage/herosection": enHeroSection,
      "homepage/featuresection": enFeatureSection,
      "homepage/testimonialssection": enTestimonialsSection,
      "homepage/classessection": enClassesSection,
      classpage: enClassPage,
      coursecontent: enCourseContent, 
    },
    ar: {
      common: arCommon,
      "homepage/herosection": arHeroSection,
      "homepage/featuresection": arFeatureSection,
      "homepage/testimonialssection": arTestimonialsSection,
      "homepage/classessection": arClassesSection,
      classpage: arClassPage,
      coursecontent: arCourseContent, 
    },
  },
  lng: savedLanguage, // Use the saved language
  fallbackLng: "en", // Fallback language
  ns: [
    "common",
    "homepage/herosection",
    "homepage/featuresection",
    "homepage/testimonialssection",
    "homepage/classessection",
    "classpage",
  ], // Namespaces
  defaultNS: "common", // Default namespace
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});