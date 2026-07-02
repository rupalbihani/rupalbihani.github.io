// Simple, no-API moon phase calculation (accurate to ±1 day)

// Based on the known new moon: 2000-01-06 18:14 UTC

// Synodic month: 29.530588853 days



export type MoonPhase = {

 fraction: number;  // 0 = new, 0.5 = full, 1 = new again

 illumination: number; // 0..1 (0 = new, 1 = full)

 name: string;

 emoji: string;

 hindi: string;

};



const SYNODIC = 29.530588853;

const KNOWN_NEW_MOON = new Date("2000-01-06T18:14:00Z").getTime();



export function getMoonPhase(date = new Date()): MoonPhase {

 const daysSince = (date.getTime() - KNOWN_NEW_MOON) / 86400000;

 const fraction = ((daysSince % SYNODIC) + SYNODIC) % SYNODIC / SYNODIC;

 const illumination = (1 - Math.cos(fraction * 2 * Math.PI)) / 2;



 let name = "New Moon", emoji = "🌑", hindi = "अमावस्या";

 if (fraction < 0.03 || fraction > 0.97) { name = "New Moon"; emoji = "🌑"; hindi = "अमावस्या"; }

 else if (fraction < 0.22) { name = "Waxing Crescent"; emoji = "🌒"; hindi = "बढ़ता चाँद"; }

 else if (fraction < 0.28) { name = "First Quarter"; emoji = "🌓"; hindi = "अर्ध चाँद"; }

 else if (fraction < 0.47) { name = "Waxing Gibbous"; emoji = "🌔"; hindi = "बढ़ता चाँद"; }

 else if (fraction < 0.53) { name = "Full Moon"; emoji = "🌕"; hindi = "पूर्णिमा"; }

 else if (fraction < 0.72) { name = "Waning Gibbous"; emoji = "🌖"; hindi = "घटता चाँद"; }

 else if (fraction < 0.78) { name = "Last Quarter"; emoji = "🌗"; hindi = "अर्ध चाँद"; }

 else { name = "Waning Crescent"; emoji = "🌘"; hindi = "घटता चाँद"; }



 return { fraction, illumination, name, emoji, hindi };

}