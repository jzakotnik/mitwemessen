// Shared types for Lunch app
// Use this from any component/server file:
//   import type { LunchData } from '@/types/lunch'  // if you have a baseUrl/paths alias
//   // or
//   // import type { LunchData } from '../types/lunch'

export interface LunchData {
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  /** 0..100 — 0=Privat, 50=egal, 100=Arbeit */
  lunchtopic: number;
}
