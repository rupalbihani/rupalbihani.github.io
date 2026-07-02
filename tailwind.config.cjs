

/** @type {import('tailwindcss').Config} */

module.exports = {

 content: ["./index.html", "./src/**/*.{ts,tsx}"],

 theme: {

   extend: {

     colors: {

       obsidian: "#0A0A0F",

       raised: "#1A1A24",

       deep: "#050508",

       chandni: "#E8E8F0",

       silver: "#C0C0C8",

       silverDim: "#8A8A96",

       moonGlow: "#F5F5FA",

     },

        fontFamily: {

       serif: ["'Fraunces'", "'Cormorant Garamond'", "serif"],

       hindi: ["'Kalam'", "'Tiro Devanagari Hindi'", "serif"],

       sans: ["'Inter'", "system-ui", "sans-serif"],

       display: ["'Instrument Serif'", "serif"],

       playful: ["'Caveat'", "cursive"],

     },

     boxShadow: {

       "neu-out":

         "8px 8px 24px #030305, -8px -8px 24px #14141c, inset 0 1px 0 rgba(255,255,255,0.04)",

       "neu-in":

         "inset 6px 6px 16px #030305, inset -6px -6px 16px #14141c",

       "neu-soft":

         "4px 4px 12px #030305, -4px -4px 12px #14141c",

       "moon-glow":

         "0 0 60px rgba(232,232,240,0.35), 0 0 120px rgba(232,232,240,0.15)",

       "silver-ring":

         "0 0 0 1px rgba(232,232,240,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",

     },

     keyframes: {

       breathe: {

         "0%,100%": { transform: "scale(1)", opacity: "0.9" },

         "50%": { transform: "scale(1.02)", opacity: "1" },

       },

       drift: {

         "0%,100%": { transform: "translateY(0)" },

         "50%": { transform: "translateY(-8px)" },

       },

       shimmer: {

         "0%": { backgroundPosition: "-200% center" },

         "100%": { backgroundPosition: "200% center" },

       },

     },

     animation: {

       breathe: "breathe 4s ease-in-out infinite",

       drift: "drift 6s ease-in-out infinite",

       shimmer: "shimmer 3s linear infinite",

     },

   },

 },

 plugins: [],

};