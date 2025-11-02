import CommonForm from "@/components/common/CommonForm";
import { loginFormControls } from "@/config";
import { loginUser } from "@/features/auth/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email : "",
  password : ""
};


const AuthLogin = () => {
  
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialState);
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
      toast.success(data?.payload?.message || "Registered successfully!",{
        style : {
          background : "green",
          color : "white"
        }
      });
    } else {
      toast.error(data?.payload?.message ,{
        style : {backgroundColor: "red",
        color: "white"}
       });
    }
    })
  };


  return (

    <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Sign in to your Account
            </h1>
            <p className="mt-2 ">Don't have an account
              <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/register">Register</Link>
            </p>
        </div>
        <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        />
    </div>

  );

};

export default AuthLogin;



