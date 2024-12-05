"use server";
import dbConnect from "@/lib/dbConnect";
import MedicalHistory from "@/models/MedicalHistory";

export async function deletePrescription(prescriptionId) {
  await dbConnect();

  try {
    const deletedPrescription = await MedicalHistory.findByIdAndDelete(
      prescriptionId
    );
    if (!deletedPrescription) {
      throw new Error("Prescription not found");
    }
    return true;
  } catch (err) {
    console.error(err);
    throw new Error("Unable to delete the prescription");
  }
}
export async function updatePrescription(prescriptionId, eyeMeasurements) {
  console.log(eyeMeasurements);
  await dbConnect();
  try {
    const updatedPrescription = await MedicalHistory.findByIdAndUpdate(
      prescriptionId,
      { eyeMeasurements },
      {
        new: true,
      }
    );
    console.log(updatedPrescription);
    if (!updatedPrescription) {
      throw new Error("Prescription not found");
    }
  } catch (err) {
    console.error(err);
    throw new Error("Unable to update the prescription");
  }
}
