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
