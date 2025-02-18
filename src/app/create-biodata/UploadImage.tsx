"use client";

import { useState } from "react";
import CropperComponent from "./Cropper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface UploadImageProps {
  onImageCrop: (croppedImage: string) => void;
}

const UploadImage = ({ onImageCrop }: UploadImageProps) => {
  // Use appropriate types for states
  const [imageSrc, setImageSrc] = useState<string | null>(null); // Image source (base64 string)
  const [showCropper, setShowCropper] = useState<boolean>(false); // Flag to show cropper

  // Image file selection handler (event is of type React.ChangeEvent<HTMLInputElement>)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageSrc(reader.result);
        }
        setShowCropper(true);
      };
    }
  };

  // Handle the crop result (cropped image as a base64 string)
  const handleCropDone = (cropped: string) => {
    onImageCrop(cropped);
    setShowCropper(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-6 py-2 text-sm font-medium">
          Upload Photo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogTitle className="text-lg font-semibold">
          Choose Image
        </DialogTitle>
        <DialogDescription>
          <div className="p-4 space-y-4">
            {/* Styled File Input */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <Label
                htmlFor="image"
                className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                Choose File
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Image Cropper */}
            {showCropper && imageSrc && (
              <CropperComponent
                imageSrc={imageSrc}
                onCropDone={handleCropDone}
                onCancel={() => setShowCropper(false)}
              />
            )}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default UploadImage;
