import React from "react";
import { ProductItems } from "../../constants/products";

const Products = () => {
  return (
    <div className="pt-0 w-full flex flex-col p-0 m-0 items-center ">
      <div>Products</div>
      <div className="max-w-4xl lg:min-w-[1000px] pt-20 ">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>[ ]</th>
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
                  <tr key={i}>
                    <th>[ ]</th>
                    <th>{item.name}</th>
                    <th>{item.categoryId}</th>
                    <th>{item.categoryName}</th>
                    <th>{item.unitPrice}</th>
                    <th>{item.status}</th>
                    <th>{item.date}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
