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
