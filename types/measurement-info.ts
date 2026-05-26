import { z } from "zod";

export type MeasurementInfoType = {
  measurementID: string;
  name: string;
  contactInfo: ContactInfoType | null;
  areas: AreaType[];
  notes: NotesType | null;
  imperial: boolean;
  total: number;
};

export const ContactInfoSchema = z.object({
  name: z.string().min(1),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().min(1),
  date: z
    .string()
    .min(1)
    .regex(/^\d{2}([/-])\d{2}\1\d{4}$/, "Use MM/DD/YYYY or MM-DD-YYYY"),
});

export type ContactInfoType = z.infer<typeof ContactInfoSchema>;

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

export const measurementsFormSchema = z.object({
  name: z.string().min(1),
  notes: NotesFormSchema,
  areas: AreaFormSchema,
  contactInfo: ContactInfoSchema,
});
