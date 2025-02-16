"use client";

import { useRef, useState } from "react";
import { FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function CreateBioData() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    tob: "",
    pob: "",
    rashi: "",
    nakshtra: "",
    complexion: "",
    height: "",
    education: "",
    religionCaste: "",
    jobOccupation: "",
    income: "",
    gothram: "",
    image: null as File | null,
  });
  const bioDataRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleGeneratePDF = async () => {
    if (!formData.image) {
      console.error("No image selected");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          imageUrl: base64Image,
        }),
      });

      if (!response.ok) {
        console.error("Failed to generate PDF");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "biodata.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    reader.readAsDataURL(formData.image);
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text" },
    { name: "dob", label: "Date of Birth", type: "date" },
    { name: "tob", label: "Time of Birth", type: "time" },
    { name: "pob", label: "Place of Birth", type: "text" },
    { name: "rashi", label: "Rashi", type: "text" },
    { name: "nakshatra", label: "Nakshatra", type: "text" },
    { name: "complexion", label: "Complexion", type: "text" },
    { name: "height", label: "Height (e.g., 5'9\")", type: "text" },
    { name: "education", label: "Education", type: "text" },
    { name: "religionCaste", label: "Religion/Caste", type: "text" },
    { name: "jobOccupation", label: "Job/Occupation", type: "text" },
    { name: "income", label: "Income (e.g., $50,000/year)", type: "text" },
    { name: "gothram", label: "Gothram", type: "text" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-center mb-6">
            <FileText className="h-10 w-10 text-blue-500 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">
              Create Your Bio Data
            </h1>
          </div>
          {/* Display Bio Data */}
          <div ref={bioDataRef} className="p-4 bg-white rounded-md shadow-md">
            <p className="text-xl font-bold">{formData.name || "Full Name"}</p>
            <p className="text-gray-600">DOB: {formData.dob || "YYYY-MM-DD"}</p>
            {formData.image && (
              <Image
                src={URL.createObjectURL(formData.image)}
                alt="Profile"
                className="w-24 h-24 rounded-full mt-4"
                width={96}
                height={96}
              />
            )}
          </div>
          <div className="space-y-6 mt-6">
            {fields.map((field) => (
              <div key={field.name}>
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={
                    formData[field.name as keyof typeof formData] as string
                  }
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <div>
              <Label htmlFor="image">Upload Photo</Label>
              <div className="mt-1 flex items-center">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
                <Label
                  htmlFor="image"
                  className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Upload className="h-4 w-4 text-gray-400 mr-2 inline" />
                  Choose file
                </Label>
                <span className="ml-3 text-sm text-gray-500">
                  {formData.image ? formData.image.name : "No file chosen"}
                </span>
              </div>
            </div>
            <Button
              type="button"
              onClick={handleGeneratePDF}
              className="w-full"
            >
              Generate PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
