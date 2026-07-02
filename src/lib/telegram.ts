import { CONFIG } from "../config";



type PingType = "mood" | "song" | "poem" | "publish" | "visit";



const MESSAGES: Record<PingType, (p: any) => string> = {

 mood: (p) =>

   `🌸 *Rupal's mood right now:* ${p.emoji ?? "🌙"} ${p.hindi ?? ""}\n` +

   `_(${p.mood ?? "?"})_` +

   (p.note ? `\n\n💭 _"${p.note}"_` : ""),

 song: (p) =>

   `🎵 She added a song: *${p.title ?? "untitled"}*` +

   (p.url ? `\n${p.url}` : ""),

 poem: (p) => `📖 She just read: *${p.title ?? "a shayari"}*`,

 publish: () => `💍 *SHE PRESSED PUBLISH.*\n\nNiraj — it's time. 🌙✨\n\n_the moon has heard._`,

 visit: (p) => `👀 She just opened *layer ${p.layer ?? "?"}* of Chandralok.`,

};



export async function ping(type: PingType, payload: Record<string, any> = {}) {

 if (type === "visit") {

   console.log("[visit]", payload.layer);

   return;

 }



 const { botToken, chatId } = CONFIG.telegram;

 if (!botToken || botToken.includes("PASTE")) {

   console.log("[telegram stub — no token]", type, payload);

   return;

 }



 const text = MESSAGES[type]?.(payload) ?? `📬 Chandralok ping: ${type}`;



 try {

   await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {

     method: "POST",

     headers: { "Content-Type": "application/json" },

     body: JSON.stringify({

       chat_id: chatId,

       text,

       parse_mode: "Markdown",

     }),

   });

 } catch (e) {

   console.warn("telegram ping failed", e);

 }

}