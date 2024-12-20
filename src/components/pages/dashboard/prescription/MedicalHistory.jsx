import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import {
  ArrowUpDown,
  Eye,
  Loader,
  MoreHorizontal,
  Pencil,
  Trash,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeletePrescriptionDialog from "./DeletePrescriptionDialog";
import EditPrescriptionDialog from "./EditPresecriptionDialog";

export default function MedicalHistory() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [search, setSearch] = useState(""); // State for search input
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Create a debounced function for updating the search state
  const debouncedSetSearch = useMemo(
    () => debounce(setDebouncedSearch, 500),
    []
  );

  // Use effect to update the debounced search when the search input changes
  useEffect(() => {
    debouncedSetSearch(search);
  }, [search, debouncedSetSearch]);

  // Update query function to use debounced search parameter
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "medicalHistory",
      setIsDeleteDialogOpen,
      { search: debouncedSearch },
    ], // Include debounced search in query key
    queryFn: async () => {
      if (!debouncedSearch) {
        // Return all records if no search term
        const response = await axios.get("/api/medical-history");
        return response.data.data;
      }

      const response = await axios.get("/api/medical-history", {
        params: { search: debouncedSearch },
      });
      return response.data.data;
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
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => {
                  setSelectedPatient(row.original);
                  setIsEditDialogOpen(true);
                }}
              >
                <Pencil className="h-3.5 w-3.5 mr-1.5" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedPatient(row.original);
                  setIsDeleteDialogOpen(true);
                }}
              >
                <Trash className="h-3.5 w-3.5 mr-1.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (isLoading && !data?.length) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-6 bg-slate-50 rounded-xl shadow-md w-full max-lg:max-w-[83vw] max-w-[90vw]  flex-1">
      <Card className="w-full mt-5 h-max mx-auto">
        <CardHeader>
          <CardTitle>Medical History</CardTitle>
          <CardDescription>
            View patient medical history and eye measurements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add search input */}
          <div className="mb-4 flex gap-4">
            <Input
              type="text"
              placeholder="Search by mobile number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="inline-flex"
            />
            <Link
              href="https://et.jaanaviopticals.shop/"
              className="inline-flex"
            >
              {" "}
              <Button>New Prescription</Button>
            </Link>{" "}
          </div>
          <DataTable columns={columns} data={data} />
          {selectedPatient && (
            <>
              {" "}
              <DeletePrescriptionDialog
                isOpen={isDeleteDialogOpen}
                setIsOpen={setIsDeleteDialogOpen}
                prescription={selectedPatient}
              />
              <EditPrescriptionDialog
                isOpen={isEditDialogOpen}
                setIsOpen={setIsEditDialogOpen}
                prescriptionId={selectedPatient._id}
                initialMeasurements={selectedPatient.eyeMeasurements}
              />
            </>
          )}
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Patient Details: {selectedPatient?.name}</DialogTitle>
          </DialogHeader>

          {selectedPatient && (
            <>
              <Card className="w-full mt-5 h-max mx-auto">
                <CardContent>
                  <EyeMeasurementsTable
                    measurements={selectedPatient.eyeMeasurements || {}}
                  />
                </CardContent>
              </Card>
            </>
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

  console.log(measurements);
  return (
    <div className="overflow-x-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        Eye Measurements
      </h2>
      <table className="w-full mb-4 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Eye</th>
            <th className="border border-gray-300 p-2">SPH</th>
            <th className="border border-gray-300 p-2">CYL</th>
            <th className="border border-gray-300 p-2">Axis</th>

            <th className="border border-gray-300 p-2">Additional Power</th>
            <th className="border border-gray-300 p-2">Pupillary Distance</th>
            <th className="border border-gray-300 p-2 px-5">NV</th>
            <th className="border border-gray-300 p-2 px-5">DV</th>
          </tr>
        </thead>
        <tbody>
          {["rightEye", "leftEye"].map((eye) => {
            const eyeData = measurements[eye] || {};
            return (
              <tr key={eye}>
                <td className="border border-gray-300 p-2 font-semibold">
                  {eye === "rightEye" ? "OD (Right Eye)" : "OS (Left Eye)"}
                </td>
                <td className="border border-gray-300 p-2">
                  {eyeData.SPH || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {eyeData.CYL || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {eyeData.Axis || "N/A"}
                </td>

                <td className="border border-gray-300 p-2">
                  {eyeData.additionalPower || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {eyeData.pupillaryDistance || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {`6/${eyeData.NV}` || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {`6/${eyeData.DV}` || "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
