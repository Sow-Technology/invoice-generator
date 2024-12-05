"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2, Save, User } from "lucide-react";

export default function EmployeeProfile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user profile data
    const fetchProfile = async () => {
      // Placeholder data
      setProfile({
        name: "John Doe",
        contactNumber: "1234567890",
        email: "john.doe@example.com",
        employeeId: "EMP001",
        bloodGroup: "O+",
        aadharNumber: "1234 5678 9012",
        panNumber: "ABCDE1234F",
        homeAddress: "123 Main St, City, State, 12345",
        emergencyContact1: "9876543210",
        emergencyContact2: "9870123456",
        bankName: "Example Bank",
        bankAccountNumber: "1234567890",
        ifscCode: "EXBK0001234",
      });
    };

    fetchProfile();
  }, []);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);

  const handleChange = (e) => {
    if (profile) {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24 border-4 border-white">
                <AvatarImage
                  src="/placeholder.svg?height=96&width=96"
                  alt={profile.name}
                />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <p className="text-xl">{profile.employeeId}</p>
              </div>
            </div>
          </div>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
            </TabsList>
            <div className="p-6">
              <AnimatePresence mode="wait">
                <TabsContent value="personal" asChild key="personal">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <ProfileField
                      label="Name"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <ProfileField
                      label="Employee ID"
                      name="employeeId"
                      value={profile.employeeId}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <ProfileField
                      label="Blood Group"
                      name="bloodGroup"
                      value={profile.bloodGroup}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <ProfileField
                      label="Aadhar Number"
                      name="aadharNumber"
                      value={profile.aadharNumber}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <ProfileField
                      label="PAN Number"
                      name="panNumber"
                      value={profile.panNumber}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </motion.div>
                </TabsContent>
                <TabsContent value="contact" asChild key="contact">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <ProfileField
                      label="Contact Number"
                      name="contactNumber"
                      value={profile.contactNumber}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <ProfileField
                      label="Email ID"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <ProfileField
                      label="Home Address"
                      name="homeAddress"
                      value={profile.homeAddress}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="md:col-span-2"
                    />
                    <ProfileField
                      label="Emergency Contact 1"
                      name="emergencyContact1"
                      value={profile.emergencyContact1}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <ProfileField
                      label="Emergency Contact 2"
                      name="emergencyContact2"
                      value={profile.emergencyContact2}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </motion.div>
                </TabsContent>
                <TabsContent value="financial" asChild key="financial">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <ProfileField
                      label="Bank Name"
                      name="bankName"
                      value={profile.bankName}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <ProfileField
                      label="Bank Account Number"
                      name="bankAccountNumber"
                      value={profile.bankAccountNumber}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <ProfileField
                      label="IFSC Code"
                      name="ifscCode"
                      value={profile.ifscCode}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex justify-end"
              >
                <Button
                  onClick={isEditing ? handleSave : handleEdit}
                  className="flex items-center space-x-2"
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-4 w-4" />
                      <span>Edit</span>
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileField({ label, name, value, onChange, disabled, className }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
