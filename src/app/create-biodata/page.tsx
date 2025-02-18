"use client";

import { useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import UploadImage from "./UploadImage";

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
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageCrop = (croppedImage: string) => {
    setFormData((prev) => ({ ...prev, image: croppedImage }));
  };

  const handleGeneratePDF = async () => {
    if (!formData.image) {
      console.error("No image selected");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          imageUrl: formData.image,
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
    } catch (error) {
      console.log("Error generating PDF: ", error);
    } finally {
      setLoading(false);
    }
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
            <UploadImage onImageCrop={handleImageCrop} />
            {formData.image && (
              <Image
                src={formData.image}
                alt="Profile"
                className="w-28 h-28 rounded-full mt-4"
                width={112}
                height={112}
              />
            )}
            <Button
              type="button"
              onClick={handleGeneratePDF}
              className="w-full flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />{" "}
                  Processing...
                </>
              ) : (
                "Generate PDF"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
