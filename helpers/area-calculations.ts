import { AreaType } from "@/types/measurement-info";

const FT_TO_M = 0.3048 as const;
const SQ_FT_TO_SQ_M = 0.09290304 as const;

export const getAreaSqFt = (area: AreaType) =>
  area.length * area.width * (area.steps ?? 1);

export const roundSqFt = (value: number) => Math.round(value * 100) / 100;

export const ftToM = (value: number) => value * FT_TO_M;

export const mToFt = (value: number) => value / FT_TO_M;

export const sqFtToSqM = (value: number) => value * SQ_FT_TO_SQ_M;

export const sqMToSqFt = (value: number) => value / SQ_FT_TO_SQ_M;
