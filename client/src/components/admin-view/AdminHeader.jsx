import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginOutUser, resetTokenAndCredentials } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";


const AdminHeader = ({setOpen}) => {

  const dispacth = useDispatch();
  const navigate = useNavigate();
  
  function handleLogOut () {
    // dispacth(loginOutUser())
      dispacth(resetTokenAndCredentials())
      localStorage.clear();
      navigate("/auth/login");
  }

  return (

    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)}
      className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button onClick={handleLogOut}
        className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
          <LogOut/>
          Logout
        </Button>
      </div>
    </header>

  );

};

export default AdminHeader;