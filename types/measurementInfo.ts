import { z } from "zod";

export type MeasurementInfoType = {
  measurementID: string;
  name: string;
  contactInfo: ContactInfoType | null;
  areas: AreaType[];
  notes: NotesType | null;
};

export type ContactInfoType = {
  name: string;
  email?: string;
  phone?: string;
  address: string;
  date: string;
};

export type AreaType = {
  name: string;
  length: number;
  width: number;
  steps?: number;
};

export type NotesType = {
  productInfo: string;
  toiletRnR?: number;
  furnitureRnR?: number;
  floorPrep?: number;
  appliancesRnR?: number;
  pullUpAndDisposal?: number;
  baseboards?: number;
  moldings?: MoldingsType;
};

export type MoldingsType = {
  endcaps?: number;
  tMoldings?: number;
  reducers?: number;
};

const PositiveNumberString = z
  .string()
  .refine((v) => Number(v) > 0, "Must be greater than 0");

const OptionalPositiveNumberString = z
  .string()
  .refine((v) => v === "" || Number(v) > 0, "Must be greater than 0");

export const AreaFormSchema = z
  .object({
    name: z.string().min(1, "Required"),
    length: PositiveNumberString,
    width: PositiveNumberString,
    hasSteps: z.boolean(),
    steps: z.string(),
  })
  .refine((data) => !data.hasSteps || Number(data.steps) > 0, {
    error: "Must be greater than 0",
    path: ["steps"],
  });

export type AreaFormType = z.infer<typeof AreaFormSchema>;

export const NotesFormSchema = z.object({
  productInfo: z.string().min(1, "Required"),
  toiletRnR: OptionalPositiveNumberString,
  furnitureRnR: OptionalPositiveNumberString,
  floorPrep: OptionalPositiveNumberString,
  appliancesRnR: OptionalPositiveNumberString,
  pullUpAndDisposal: OptionalPositiveNumberString,
  baseboards: OptionalPositiveNumberString,
  moldings: z.object({
    endcaps: OptionalPositiveNumberString,
    tMoldings: OptionalPositiveNumberString,
    reducers: OptionalPositiveNumberString,
  }),
});

export type NotesFormType = z.infer<typeof NotesFormSchema>;
