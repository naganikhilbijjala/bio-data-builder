"use client"; // Needed in Next.js App Router

import { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "@/utils/cropImage";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface CropperComponentProps {
  imageSrc: string;
  onCropDone: (croppedImage: string) => void;
  onCancel: () => void;
}

const CropperComponent = ({
  imageSrc,
  onCropDone,
  onCancel,
}: CropperComponentProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if (croppedAreaPixels) {
      const croppedImage = (await getCroppedImg(
        imageSrc,
        croppedAreaPixels
      )) as string;
      onCropDone(croppedImage); // Send the cropped image to parent
    }
  };

  return (
    <div className="h-[450px]">
      <div className="relative w-full h-[400px] bg-gray-300">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          cropShape="round"
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>
      <Slider
        className="mt-4"
        min={1}
        max={3}
        step={0.1}
        value={[zoom]}
        onValueChange={(value) => setZoom(value[0])}
      />
      <div className="mt-4 absolute left-1/2 transform -translate-x-1/2 flex space-x-4">
        <Button
          onClick={handleCrop}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Crop & Save
        </Button>
        <Button
          onClick={onCancel}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CropperComponent;
