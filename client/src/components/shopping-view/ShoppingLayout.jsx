import { Outlet } from "react-router-dom";
import ShoppingHeader from "./ShoppingHeader";

const ShoppingLayout = () => {

  return (

    <div className="flex flex-col bg-white overflow-hidden">
      {/* Header component of shoppingview */}
      <ShoppingHeader/>
        <main className="flex felx-col w-full">
          <Outlet/>
        </main>

    </div>

  );

};

export default ShoppingLayout;