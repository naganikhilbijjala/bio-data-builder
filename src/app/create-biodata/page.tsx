"use client";

import { useRef, useState } from "react";
import { FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function CreateBioData() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const bioDataRef = useRef<HTMLDivElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleGeneratePDF = async () => {
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, dob }),
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
          <div ref={bioDataRef} className="p-4 bg-white rounded-md shadow-md">
            <p className="text-xl font-bold">{name || "Full Name"}</p>
            <p className="text-gray-600">DOB: {dob || "YYYY-MM-DD"}</p>
            {image && (
              <Image
                src={URL.createObjectURL(image)}
                alt="Profile"
                className="w-24 h-24 rounded-full mt-4"
                width={96}
                height={96}
              />
            )}
          </div>
          <div className="space-y-6 mt-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>
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
                  {image ? image.name : "No file chosen"}
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
