import { updatePrescription } from "@/app/_actions/prescription";
import { updateProduct } from "@/app/_actions/product";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { toast } from "sonner";

export default function EditPrescriptionDialog({
  isOpen,
  setIsOpen,
  prescriptionId,
  initialMeasurements,
}) {
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePrescription(prescriptionId, measurements);
      toast.success("Prescriiption updated successfully!", {
        id: "update-prescription",
      });
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to update prescription. Please try again later.", {
        id: "update-prescription",
      });
    }
  };
  const [measurements, setMeasurements] = useState(
    initialMeasurements || {
      rightEye: {
        SPH: "",
        CYL: "",
        Axis: "",
        NV: "",
        DV: "",
        additionalPower: "",
        pupillaryDistance: "",
      },
      leftEye: {
        SPH: "",
        CYL: "",
        Axis: "",
        NV: "",
        DV: "",
        additionalPower: "",
        pupillaryDistance: "",
      },
      multiFocal: false,
    }
  );

  const handleInputChange = (eye, field, value) => {
    setMeasurements((prev) => ({
      ...prev,
      [eye]: {
        ...prev[eye],
        [field]: value,
      },
    }));
  };

  const generateOptions = (type) => {
    const options = [];
    if (type === "SPH") {
      options.push(
        <SelectItem key="Plano" value="Plano">
          Plano
        </SelectItem>
      );
      // Negative values for SPH
      for (let i = -0.25; i >= -20.0; i -= 0.25) {
        options.push(
          <SelectItem key={i} value={i.toFixed(2)}>
            {i.toFixed(2)}
          </SelectItem>
        );
      }
      // Positive values for SPH
      for (let i = 0.25; i <= 20.0; i += 0.25) {
        options.push(
          <SelectItem key={`+${i}`} value={`+${i.toFixed(2)}`}>{`+${i.toFixed(
            2
          )}`}</SelectItem>
        );
      }
    } else if (type === "CYL") {
      options.push(
        <SelectItem key="Plano" value="Plano">
          Plano
        </SelectItem>
      );
      // Negative values for CYL
      for (let i = -0.25; i >= -6.0; i -= 0.25) {
        options.push(
          <SelectItem key={i} value={i.toFixed(2)}>
            {i.toFixed(2)}
          </SelectItem>
        );
      }
      // Positive values for CYL
      for (let i = 0.25; i <= 6.0; i += 0.25) {
        options.push(
          <SelectItem key={`+${i}`} value={`+${i.toFixed(2)}`}>{`+${i.toFixed(
            2
          )}`}</SelectItem>
        );
      }
    }
    return options;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="min-w-[60%] w-[900px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Edit the details of the product.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate}>
          {/* Main Table */}
          <table className="w-full mb-4 border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Eye</th>
                <th className="border border-gray-300 p-2">SPH</th>
                <th className="border border-gray-300 p-2">CYL</th>
                <th className="border border-gray-300 p-2">Axis</th>
                <th className="border border-gray-300 p-2">DV</th>
              </tr>
            </thead>
            <tbody>
              {["rightEye", "leftEye"].map((eye) => (
                <tr key={eye}>
                  <td className="border border-gray-300 p-2 font-semibold">
                    {eye === "rightEye" ? "OD (Right Eye)" : "OS (Left Eye)"}
                  </td>
                  {/* SPH Dropdown */}
                  <td className="border border-gray-300 p-2">
                    <Select
                      value={measurements[eye].SPH}
                      onValueChange={(value) =>
                        handleInputChange(eye, "SPH", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select SPH" />
                      </SelectTrigger>
                      <SelectContent>{generateOptions("SPH")}</SelectContent>
                    </Select>
                  </td>
                  {/* CYL Dropdown */}
                  <td className="border border-gray-300 p-2">
                    <Select
                      value={measurements[eye].CYL}
                      onValueChange={(value) =>
                        handleInputChange(eye, "CYL", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select CYL" />
                      </SelectTrigger>
                      <SelectContent>{generateOptions("CYL")}</SelectContent>
                    </Select>
                  </td>
                  {/* Axis Input */}
                  <td className="border border-gray-300 p-2">
                    <Input
                      type="number"
                      placeholder="0-180"
                      value={measurements[eye].Axis}
                      onChange={(e) =>
                        handleInputChange(eye, "Axis", e.target.value)
                      }
                      className="w-full"
                    />
                  </td>

                  {/* DV Input */}
                  <td className="border border-gray-300 p-2 flex items-center">
                    6/
                    <Input
                      type="number"
                      placeholder="DV (Distance Vision)"
                      value={measurements[eye].DV}
                      onChange={(e) =>
                        handleInputChange(eye, "DV", e.target.value)
                      }
                      className="w-full"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Bifocal Toggle */}
          <div className="mb-4">
            <span className="font-semibold mr-4">
              Do you have a Multi-focal Power?
            </span>
            <RadioGroup
              value={measurements.multiFocal == true ? "yes" : "no"}
              onValueChange={(value) => {
                let bool = value == "yes" ? true : false;
                console.log(bool);
                setMeasurements((prev) => ({
                  ...prev,
                  multiFocal: bool,
                }));
              }}
              className="inline-flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
          </div>
          {/* Additional Power and Pupillary Distance Table */}
          {measurements.multiFocal && (
            <table className="w-full mb-4 border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Eye</th>
                  <th className="border border-gray-300 p-2">
                    Additional Power
                  </th>
                  <th className="border border-gray-300 p-2">
                    Pupillary Distance
                  </th>
                  <th className="border border-gray-300 p-2">NV</th>
                </tr>
              </thead>
              <tbody>
                {["rightEye", "leftEye"].map((eye) => (
                  <tr key={eye}>
                    <td className="border border-gray-300 p-2 font-semibold">
                      {eye === "rightEye" ? "OD (Right Eye)" : "OS (Left Eye)"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Select
                        value={measurements[eye].additionalPower}
                        onValueChange={(value) =>
                          handleInputChange(eye, "additionalPower", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Addition Power" />
                        </SelectTrigger>
                        <SelectContent>{generateOptions("SPH")}</SelectContent>
                      </Select>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Input
                        type="number"
                        placeholder="Enter PD (mm)"
                        value={measurements[eye].pupillaryDistance}
                        onChange={(e) =>
                          handleInputChange(
                            eye,
                            "pupillaryDistance",
                            e.target.value
                          )
                        }
                        className="w-full"
                      />
                    </td>
                    {/* NV Input */}
                    <td className="border border-gray-300 p-2 flex items-center">
                      6/
                      <Input
                        type="number"
                        placeholder="NV (Near Vision)"
                        value={measurements[eye].NV}
                        onChange={(e) =>
                          handleInputChange(eye, "NV", e.target.value)
                        }
                        className="w-full"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <Button type="submit" className="w-full" onClick={handleUpdate}>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
