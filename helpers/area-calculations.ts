import { AreaType } from "@/types/measurement-info";

const SQ_FT_TO_SQ_M = 0.09290304 as const;

export const getAreaSqFt = (area: AreaType) =>
  area.length * area.width * (area.steps ?? 1);

export const roundSqFt = (value: number) => Math.round(value * 100) / 100;

export const sqFtToSqM = (value: number) => value * SQ_FT_TO_SQ_M;

export const sqMToSqFt = (value: number) => value / SQ_FT_TO_SQ_M;
