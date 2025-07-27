import { useState } from "react";
import CommonForm from "../common/CommonForm";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editAddress, fetchAllAddresses } from "@/features/shop/addressSlice";
import { useEffect } from "react";
import AddressCard from "./AddressCard";
import {toast} from "sonner";
const initialAddressFormData = {
    address : "",
    city : "",
    phone : "",
    pincode : "",
    notes : "",
}

const Address = ({setCurrentSelectedAddress,selectedId}) => {

    const [formData,setFormData] = useState(initialAddressFormData);
    const [currentEditedId,setCurrentEditedId] = useState(null);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const {addressList} = useSelector(state => state.shopAddress);

    const handleManageAddress = (event) => {
        event.preventDefault();
        if(addressList.length >= 3 && currentEditedId === null) {
            setFormData(initialAddressFormData);
            toast.error("you can add max 3 addresses");
            return;
        }
        currentEditedId !== null ? dispatch(editAddress({userId : user?.id,addressId : currentEditedId
            ,formData
        })).then((data) => {
            if(data?.payload?.success) {
                dispatch(fetchAllAddresses(user?.id));
                setCurrentEditedId(null);
                setFormData(initialAddressFormData);
                toast.success("Address updated successfully");
            }
        }) : 
        dispatch(addNewAddress({
            ...formData,
            userId : user?.id
        })).then((data) => {
            if(data?.payload?.success) {
                dispatch(fetchAllAddresses(user?.id));
                setFormData(initialAddressFormData);
                toast.success("Address Added successfully");
            }
        })
    }

function handleDeleteAddress(getCurrentAddress) {
    dispatch(deleteAddress({userId : user?.id, addressId : getCurrentAddress?._id})).then((data) => {
        if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id))
            toast.success("Address Deleted Successfully");
        }
    })
}
function handleEditAddress (getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData(({
        ...formData,
        address : getCurrentAddress?.address,
        city : getCurrentAddress?.city,
        phone : getCurrentAddress?.phone,
        pincode : getCurrentAddress?.pincode,
        notes : getCurrentAddress?.notes,
    }))
}

function isFormValid() {
    return Object.keys(formData).map(key => formData[key].trim() !== "").every(item => item)
}

useEffect(() => {
    dispatch(fetchAllAddresses(user?.id))
},[dispatch])

  return (

    <Card>
        <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {
                addressList && addressList.length > 0 ? (
                    addressList.map(singleAddressItem => (
                        <AddressCard addressInfo={singleAddressItem}
                        handleDeleteAddress={handleDeleteAddress}
                        handleEditAddress={handleEditAddress}
                        setCurrentSelectedAddress={setCurrentSelectedAddress} 
                        key={singleAddressItem?._id}
                        selectedId={selectedId}
                        />
                    ))
                ) : null
            }
        </div>
        <CardHeader>
            <CardTitle>
                {
                    currentEditedId !== null ? "Edit Address" : "Add New Address"
                }
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            <CommonForm formControls={addressFormControls}
            buttonText={currentEditedId !== null ? "Edit" : "Add"}
            formData={formData}
            setFormData={setFormData}  onSubmit={handleManageAddress}
            isButtonDisabled={!isFormValid()}
            />
        </CardContent>
    </Card>

  );

};

export default Address;