import { MeasurementDetails } from "@/components/measurement-details.tsx/measurement-details";
import { PatinaPage } from "@/components/patina-page";

export default function NewMeasurement() {
  return (
    <PatinaPage>
      <MeasurementDetails measurement={null} />
    </PatinaPage>
  );
}
