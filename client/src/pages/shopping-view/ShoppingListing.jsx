import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ProductFilter from "./ProductFilter";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllFilteredProducts } from "@/features/shop/shoppingProductSlice";
import ShoppingProductTile from "@/components/shopping-view/ShoppingProductTile";
import { useSearchParams } from "react-router-dom";

 const ShoppingListing = () => {
 
// fetch the list of all products

const dispatch = useDispatch();
const {productsList} = useSelector(state => state.shopProducts);
const [filters,setFilters] = useState({});
const [sort,setSort] =  useState(null);
const [searchParams, setSearchParams] = useSearchParams();
console.log(searchParams)
function handleSort(value) {
    setSort(value)
};

function handleFilter(getSectionId, getCurrentOption) {
 let copyFilters = {...filters};
 const indexOfCurrentSection = Object.keys(copyFilters).indexOf(getSectionId)
 if(indexOfCurrentSection === -1 ) {
  copyFilters = {
    ...copyFilters,
    [getSectionId] : [getCurrentOption]
  }
 } else {
  const indexOfCurrentOption = copyFilters[getSectionId].indexOf(getCurrentOption)
  if(indexOfCurrentOption === -1) {
    copyFilters[getSectionId].push(getCurrentOption)
  }
  else {
    copyFilters[getSectionId].splice(indexOfCurrentOption,1)
  }
 }
 setFilters(copyFilters)
 sessionStorage.setItem("filters",JSON.stringify(copyFilters))
}

useEffect(()  => {
  setSort("price-lowtohigh")
  setFilters(JSON.parse(sessionStorage.getItem("filters")) || {})
},[])

useEffect(() => {

},[filters])

useEffect(() => {
  dispatch(fetchAllFilteredProducts())
},[dispatch])


   return (
 
     <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 p-4 md:p-6 w-full">
        <ProductFilter filters={filters} handleFilter={handleFilter}/>
        <div className="bg-background w-full rounded-lg shadow-sm ">
          <div className="p-4  border-b flex items-center justify-between">
            <h2 className="text-lg font-bold">All Products</h2>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">{productsList?.length || 0 } products</span>
                 <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ArrowUpDown className="h-4 w-4"/>
                    <span>SortBy</span>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup   value={sort} onValueChange={handleSort}>
                  {
                    sortOptions.map(sortItem => (
                      <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {
              productsList  && productsList.length > 0 ? 
              (
                productsList.map(productItem => (
                  <ShoppingProductTile product={productItem} key={productItem._id}/>
                ))
              ) : null
            }
          </div>
        </div>
     </div>
 
   );
 
 };
 
 export default ShoppingListing;