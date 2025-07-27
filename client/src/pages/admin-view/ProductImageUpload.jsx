import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "axios"
import { Skeleton } from "@/components/ui/skeleton";
const ProductImageUpload = ({ 
  imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl, setImageLoadingState, imageLoadingState, isEditMode,
  isCustomStyling=false
}) => {

  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }

  function handleOnDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true)
  try {
    const data = new FormData();
    data.append("my_file", imageFile);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );


    if (response?.data?.success && response.data.result?.url) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

  useEffect(()=> {
    if(imageFile !== null) {
      uploadImageToCloudinary()
    }
  },[imageFile])


  return (
    <div className={`w-full ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-1 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleOnDrop}
        className={`${isEditMode ? "opacity-60" : ""} border-2 border-dashed bg-gray-100 rounded-lg p-3`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className={`${isEditMode ? "cursor-not-allowed" : ""} w-10 h-10 text-muted-foreground mb-2`} />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : (
          imageLoadingState ? 
            (<div className="flex items-center justify-center">
                <Skeleton className="h-10 bg-gray-100"/> 
                    <p>Uploading...</p>
              </div> )
                              :
          (<div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileIcon className="w-7 h-8 text-primary" />
              <p className="text-sm font-medium">{imageFile.name}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageUpload;
