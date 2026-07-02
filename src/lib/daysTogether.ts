import { CONFIG } from "../config";



export function daysTogether(now = new Date()): number {

 const start = new Date(CONFIG.firstMessageDate).getTime();

 return Math.max(0, Math.floor((now.getTime() - start) / 86400000));

}



export function fullMoonsWitnessed(now = new Date()): number {

 return Math.floor(daysTogether(now) / 29.530588853);

}