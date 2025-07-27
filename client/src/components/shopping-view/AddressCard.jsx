import { CircleCheckBig } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

const AddressCard = ({
  addressInfo,
  handleEditAddress,
  handleDeleteAddress,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  const isSelected = selectedId?._id === addressInfo?._id;

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`relative cursor-pointer transition-all duration-300 rounded-md 
        ${isSelected ? 'border-green-600 border-2 bg-green-50 shadow-md scale-[1.01]' : 'border border-gray-300'}`}
    >
      {/* Show icon only if selected */}
      {isSelected && (
        <CircleCheckBig className="absolute top-2 right-2 text-green-600 w-6 h-6" />
      )}

      <CardContent className="grid gap-4 p-4">
        <Label>Address : {addressInfo?.address}</Label>
        <Label>City : {addressInfo?.city}</Label>
        <Label>Pincode : {addressInfo?.pincode}</Label>
        <Label>Phone : {addressInfo?.phone}</Label>
        <Label>Notes : {addressInfo?.notes}</Label>
      </CardContent>

      <CardFooter className="flex justify-between px-4 pb-4 pt-0">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleEditAddress(addressInfo);
          }}
        >
          Edit
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo);
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
