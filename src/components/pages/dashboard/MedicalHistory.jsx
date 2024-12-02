import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { ArrowUpDown, Eye, Loader, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MedicalHistory() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["medicalHistory"],
    queryFn: async () => {
      const response = await axios.get("/api/medical-history");
      return response.data;
    },
  });

  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    { accessorKey: "age", header: "Age" },
    { accessorKey: "sex", header: "Sex" },
    { accessorKey: "occupation", header: "Occupation" },
    { accessorKey: "place", header: "Place" },
    { accessorKey: "contactNo", header: "Contact No" },
    { accessorKey: "chiefComplaint", header: "Chief Complaint" },
    {
      accessorKey: "blurringOfVision",
      header: "Blurring of Vision",
      cell: ({ row }) => (row.getValue("blurringOfVision") ? "Yes" : "No"),
    },
    {
      accessorKey: "photophobia",
      header: "Photophobia",
      cell: ({ row }) => (row.getValue("photophobia") ? "Yes" : "No"),
    },
    {
      accessorKey: "itchingIrritation",
      header: "Itching/Irritation",
      cell: ({ row }) => row.getValue("itchingIrritation").join(", "),
    },
    {
      accessorKey: "wateringOfEyes",
      header: "Watering of Eyes",
      cell: ({ row }) => row.getValue("wateringOfEyes").join(", "),
    },
    {
      accessorKey: "rednessOfEyes",
      header: "Redness of Eyes",
      cell: ({ row }) => row.getValue("rednessOfEyes").join(", "),
    },
    {
      accessorKey: "pastOcularHistory",
      header: "Past Ocular History",
      cell: ({ row }) => row.getValue("pastOcularHistory").join(", "),
    },
    {
      accessorKey: "systemicHistory",
      header: "Systemic History",
      cell: ({ row }) => row.getValue("systemicHistory").join(", "),
    },
    { accessorKey: "allergicHistory", header: "Allergic History" },
    {
      accessorKey: "familyHistory",
      header: "Family History",
      cell: ({ row }) => row.getValue("familyHistory").join(", "),
    },
    {
      accessorKey: "personalHistory",
      header: "Personal History",
      cell: ({ row }) => row.getValue("personalHistory").join(", "),
    },
    {
      header: "Eye Measurements",
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          onClick={() => {
            setSelectedPatient(row.original);
            setIsDialogOpen(true);
          }}
        >
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return <Loader className="h-8 w-8 animate-spin" />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-6 bg-slate-50 rounded-xl shadow-md w-full max-lg:max-w-[83vw] max-w-[90vw] lg:min-w-max flex-1">
      <Card className="w-full mt-5 h-max mx-auto">
        <CardHeader>
          <CardTitle>Medical History</CardTitle>
          <CardDescription>
            View patient medical history and eye measurements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Patient Details: {selectedPatient?.name}</DialogTitle>
          </DialogHeader>

          {selectedPatient && (
            <Card className="w-full mt-5 h-max mx-auto">
              <CardContent>
                <EyeMeasurementsTable
                  measurements={selectedPatient.eyeMeasurements || {}}
                />
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
function EyeMeasurementsTable({ measurements }) {
  if (!measurements || (!measurements.rightEye && !measurements.leftEye)) {
    return <p>No eye measurements available for this patient.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        Eye Measurements
      </h2>
      <table className="w-full mb-4 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Eye</th>
            <th className="border border-gray-300 p-2" colSpan="3">
              Distance
            </th>
            <th className="border border-gray-300 p-2" colSpan="3">
              Addition
            </th>
            <th className="border border-gray-300 p-2">Additional Power</th>
            <th className="border border-gray-300 p-2">Pupillary Distance</th>
            <th className="border border-gray-300 p-2">NV</th>
            <th className="border border-gray-300 p-2">DV</th>
          </tr>
          <tr>
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2">SPH</th>
            <th className="border border-gray-300 p-2">CYL</th>
            <th className="border border-gray-300 p-2">Axis</th>
            <th className="border border-gray-300 p-2">SPH</th>
            <th className="border border-gray-300 p-2">CYL</th>
            <th className="border border-gray-300 p-2">Axis</th>
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2"></th>
          </tr>
        </thead>
        <tbody>
          {["rightEye", "leftEye"].map((eye) => {
            const eyeData = measurements[eye] || {};
            const distanceData = eyeData.distance || {};
            const additionData = eyeData.addition || {};
            return (
              <tr key={eye}>
                <td className="border border-gray-300 p-2 font-semibold">
                  {eye === "rightEye" ? "OD (Right Eye)" : "OS (Left Eye)"}
                </td>
                <td className="border border-gray-300 p-2">
                  {distanceData.SPH || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {distanceData.CYL || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {distanceData.Axis || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {additionData.SPH || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {additionData.CYL || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {additionData.Axis || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {eyeData.additionalPower || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {eyeData.pupillaryDistance || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {eyeData.NV || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {eyeData.DV || "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
