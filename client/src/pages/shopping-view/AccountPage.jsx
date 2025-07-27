import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accountImage from "../../assets/account.jpg";
import Address from "@/components/shopping-view/Address";
import ShoppingOrders from "@/components/shopping-view/ShoppingOrders";
const AccountPage = () => {

  return (

    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden"> 
        <img src={accountImage} alt="accountimage" className="h-full w-full object-cover object-center"/>
      </div>
      <div className="container mx-auto grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders/>
            </TabsContent>
            <TabsContent value="address">
              <Address/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>

  );

};

export default AccountPage;