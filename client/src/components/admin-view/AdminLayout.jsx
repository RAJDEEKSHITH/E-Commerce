import { Outlet } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";
import AdminHeader from "./AdminHeader";
import { useState } from "react";

const AdminLayout = () => {
    const [openSidebar, setOpenSidebar] = useState(false)
  return (

    <div className="flex min-h-screen w-full"> 
        {/* admin side bar */}
        <AdminSideBar open={openSidebar} setOpen={setOpenSidebar}/>
        <div className="flex flex-1 flex-col ">
            {/* admin header */}
            <AdminHeader open={openSidebar} setOpen={setOpenSidebar}/>
            <main className="flex flex-col flex-1 bg-muted/40 p-4 md:p-6">
                <Outlet/>
            </main>
        </div>
    </div>

  );

};

export default AdminLayout;