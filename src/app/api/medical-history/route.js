import dbConnect from "@/lib/dbConnect";
import MedicalHistory from "@/models/MedicalHistory";

export async function GET(req, res) {
  try {
    await dbConnect();
    const medicalHistories = await MedicalHistory.find({}).lean();
    return Response.json(medicalHistories);
  } catch (error) {
    console.error("Error in GET request:", error);
    return Response.json({ error: "Error retrieving medical histories" });
  }
}
