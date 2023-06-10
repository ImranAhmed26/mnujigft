import React from "react";
import { ProductItems } from "../../constants/products";
import AddProductModal from "../modals/addProductModal";

const ProductList = () => {
  return (
    <div className="max-w-4xl lg:min-w-[1000px] pt-20 ">
      <div className="overflow-x-auto">
        <div className="flex max-w-4xl lg:min-w-[1000px] mb-5 p-4 text-gray-700 font-semibold bg-gray-100 rounded-md text-xl text-center cursor-default items-center">
          <div className="w-1/2 text-end">Product Lists</div>
          <div className="inline-flex justify-end w-1/2">
            <AddProductModal buttonName="Add" />
          </div>
        </div>

        <table className="table cursor-default bg-gray-100 rounded-md ">
          <thead>
            <tr className="text-base text-gray-900">
              <th>
                <input type="checkbox" className="checkbox" />
              </th>
              <th>Product Name</th>
              <th>Category ID</th>
              <th>Category Name</th>
              <th>Unit Price</th>
              <th>Status</th>
              <th>Available Since</th>
            </tr>
          </thead>
          <tbody>
            {ProductItems.map((item, i) => {
              return (
                <tr key={i} className="hover text-gray-700 rounded-md cursor-pointer">
                  <th>
                    <input type="checkbox" className="checkbox" />
                  </th>
                  <th>{item.name}</th>
                  <th>{item.categoryId}</th>
                  <th>{item.categoryName}</th>
                  <th>{item.unitPrice}</th>
                  <th>{`${item.status == 1 ? " Available" : "Unavailable"}`}</th>
                  <th>{item.date}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
