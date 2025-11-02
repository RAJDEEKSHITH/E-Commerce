import CommonForm from "@/components/common/CommonForm";
import { registerFormControls } from "@/config";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "@/features/auth/authSlice.js";
import { toast } from "sonner";


const initialState = {
  userName : "",
  email : "",
  password : ""
};


const AuthRegister = () => {

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
function onSubmit(event) {
  event.preventDefault();
  dispatch(registerUser(formData)).then((data) => {
    if (data?.payload?.success) {
      toast.success(data?.payload?.message || "Registered successfully!",{
        style : {
          background : "green",
          color : "white"
        }
      });
      navigate("/auth/login");
    } else {
      toast.error(data?.payload?.message ,{
        style : {backgroundColor: "red",
        color: "white"}
       });
    }
  });
}


  return (

    <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Create new account
            </h1>
            <p className="mt-2 ">Already have an account
              <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/login">Login</Link>
            </p>
        </div>
        <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        />
    </div>

  );

};

export default AuthRegister;

