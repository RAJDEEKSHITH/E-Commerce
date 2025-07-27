// import { useEffect, useState } from "react";
// import ProductImageUpload from "./ProductImageUpload";
// import { Button } from "@/components/ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { addFeatureImage, getFeatureImages } from "@/features/common/commonSlice";

// const AdminDashBoard = () => {

// const [imageFile, setImageFile] = useState(null);
// const [uploadedImageUrl, setUploadedImageUrl] = useState("");
// const [imageLoadingState, setImageLoadingState] = useState(false);
// const dispatch = useDispatch();
// const {featureImageList} = useSelector(state => state.commonFeature);
// function handleUploadFeatureImage () {
//   dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
//     if(data?.payload?.success) {
//       dispatch(getFeatureImages())
//     }
//   })
// }
// useEffect(() => {
//   dispatch(getFeatureImages());
// },[dispatch])

//   return (

//     <div>
//           <ProductImageUpload 
//             imageFile={imageFile} 
//             setImageFile={setImageFile} 
//             uploadedImageUrl={uploadedImageUrl}
//             setUploadedImageUrl={setUploadedImageUrl} 
//             setImageLoadingState={setImageLoadingState}
//             imageLoadingState={imageLoadingState}
//             isCustomStyling={true}
//             // isEditMode={currentEditedId !== null}
//           />
//           <Button className="mt-4 w-full cursor-pointer" onClick={handleUploadFeatureImage}>Upload</Button>
//           <div>
//             {
//               featureImageList && featureImageList.length > 0 ? 
//               featureImageList.map(featureImageItem => (
//                 <div className="mt-5" key={featureImageItem?._id}>
//                   <img src={featureImageItem.image} 
//                   className="w-full h-[300px] object-cover rounded-sm"
//                   />
//                 </div>
//               )) : null
//             }
//           </div>
//     </div>

//   );

// };

// export default AdminDashBoard
import { useEffect, useState } from "react";
import ProductImageUpload from "./ProductImageUpload";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addFeatureImage,
  getFeatureImages,
} from "@/features/common/commonSlice";

const AdminDashBoard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const handleUploadFeatureImage = () => {
    if (!uploadedImageUrl) return;

    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setUploadedImageUrl("");
        setImageFile(null);
      }
    });
  };

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="p-4">
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />

      <Button
        className="mt-4 w-full cursor-pointer"
        onClick={handleUploadFeatureImage}
        disabled={imageLoadingState || !uploadedImageUrl}
      >
        {imageLoadingState ? "Uploading..." : "Upload"}
      </Button>

      <div className="flex flex-col gap-6 mt-6">
        {featureImageList?.length > 0 ? (
          featureImageList.map((item) => (
            <div key={item?._id}>
              <img
                src={item.image}
                alt="Feature"
                className="w-full h-[300px] object-cover rounded-sm"
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No feature images uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminDashBoard;
