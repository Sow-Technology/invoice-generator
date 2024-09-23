import { updateUser } from "@/app/_actions/user";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { storesData } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function EditUserDialog({ isOpen, setIsOpen, user }) {
  const [userData, setUserData] = useState(user);
  const [selectedStores, setSelectedStores] = useState(user.storeAccess || []);
  const [open, setOpen] = useState(false);

  const handleUpdate = async () => {
    try {
      await updateUser({ ...userData, storeAccess: selectedStores });
      toast.success("User updated successfully!", {
        id: "update-user",
      });
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to update user. Please try again later.", {
        id: "update-user",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Edit the details of the user.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              className="col-span-3"
              value={userData.email}
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select
              defaultValue={userData.role}
              onValueChange={(val) => setUserData({ ...userData, role: val })}
            >
              <SelectTrigger className="min-w-[270px] justify-between flex">
                <SelectValue placeholder="Select user role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {["coSuperAdmin", "admin", "user"].map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="storeAccess" className="text-right">
              Store Access
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[200px] justify-between">
                  {selectedStores.length > 0
                    ? selectedStores.join(", ")
                    : "Select store(s)"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search store..." />
                  <CommandList>
                    <CommandEmpty>No store found.</CommandEmpty>
                    {storesData.map((store) => (
                      <CommandItem
                        key={store.name}
                        onSelect={() => {
                          setSelectedStores((prev) =>
                            prev.includes(store.name)
                              ? prev.filter((s) => s !== store.name)
                              : [...prev, store.name]
                          );
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedStores.includes(store.name)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {store.name}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleUpdate}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
