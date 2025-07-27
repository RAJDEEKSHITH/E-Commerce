import CommonForm from "@/components/common/CommonForm";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useState } from "react";
import { Fragment } from "react";
import ProductImageUpload from "./ProductImageUpload";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/features/admin/productsSlice";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import AdminProductTile from "@/components/admin-view/AdminProductTile";



const initialFormData = {
  image : null,
  title : "",
  category : "",
  brand : "",
  price : "",
  salePrice : "",
  totalStock : ""
}

const AdminProducts = () => {
    const [openCreateProductsDialog,setOpenCreateProductsDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditedId,setCurrentEditedId] = useState(null)

    const dispatch = useDispatch();
    const {productsList} = useSelector(state => state.adminProducts);

    function onSubmit (event) {
      event.preventDefault();
      currentEditedId !== null ? dispatch(editProduct({id : currentEditedId,formData })).then((data) => {
        if(data?.payload.success) {
          dispatch(fetchAllProducts());
          setFormData(initialFormData);
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null)
        }
      })
       : dispatch(addNewProduct({
        ...formData,
        image : uploadedImageUrl
      })).then((data) => {

        if(data?.payload?.success) {
          dispatch(fetchAllProducts());
          setOpenCreateProductsDialog(false)
          setImageFile(null);
          setFormData(initialFormData);
          toast.success("Product added successfully")

        }

      })
    };

    function handleDelete(getCurrentProductId) {
      dispatch(deleteProduct(getCurrentProductId)).then((data)=>{
        if(data?.payload.success) {
          dispatch(fetchAllProducts())
        }
      })
    }



    useEffect(()=> {
      dispatch(fetchAllProducts())
    },[dispatch])

    function isFormvalid() {
      return Object.keys(formData).map( key => formData[key] !== "").every(item => item)
    }
    
    
  return (

    <Fragment>
      <div className="mb-5 w-full flex justify-end"> 
        <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productsList && productsList.length > 0 ? 
          productsList.map(productItem => (
          <AdminProductTile 
            setFormData={setFormData} 
            setOpenCreateProductsDialog={setOpenCreateProductsDialog} 
            setCurrentEditedId={setCurrentEditedId} 
            product={productItem}
            key={productItem._id}
            handleDelete={handleDelete}

          />)) : null
        }
        <Sheet open={openCreateProductsDialog} onOpenChange={() => {
          setOpenCreateProductsDialog(false)
          setCurrentEditedId(null)
          setFormData(initialFormData)
        }}>
          <SheetContent side="right" className="overflow-auto  p-4 pt-2 space-y-2" aria-describedby={undefined}>
            <SheetHeader>
              <SheetTitle className="text-xl">{currentEditedId !== null  ? "Edit Product" : "Add New Product"}</SheetTitle>
            </SheetHeader>
            <ProductImageUpload 
            imageFile={imageFile} 
            setImageFile={setImageFile} 
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl} 
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
            />
            <div className="py-6 px-4">
                <CommonForm 
                formData={formData}
                setFormData={setFormData}
                formControls={addProductFormElements}
                onSubmit={onSubmit}
                buttonText={currentEditedId !== null ? "Edit" : "Add"}
                isButtonDisabled={!isFormvalid()}
                />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>

  );

};

export default AdminProducts;