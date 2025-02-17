"use client";

import { useState } from "react";
import Image from "next/image";
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

const UploadImage = () => {
  // Use appropriate types for states
  const [imageSrc, setImageSrc] = useState<string | null>(null); // Image source (base64 string)
  const [croppedImage, setCroppedImage] = useState<string | null>(null); // Cropped image
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
    setCroppedImage(cropped);
    setShowCropper(false);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Upload Photo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Choose Image</DialogTitle>
        <DialogDescription>
          <div className="p-4">
            <Label htmlFor="image"></Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />

            {showCropper && imageSrc && (
              <CropperComponent
                imageSrc={imageSrc}
                onCropDone={handleCropDone}
                onCancel={() => setShowCropper(false)}
              />
            )}

            {croppedImage && (
              <div className="mt-4">
                <h3 className="mb-2">Cropped Image:</h3>
                <Image
                  src={croppedImage}
                  alt="Cropped"
                  width={128}
                  height={128}
                  className="rounded-full"
                />
              </div>
            )}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default UploadImage;
