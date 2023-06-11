import React, { useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import { POST } from "../../lib/api";
import { toastDefaultMessage } from "../../lib/helper";

import { categoryItems, ProductCategoryId } from "../../constants/constants";

const AddProductModal = ({ buttonName, setRefresh }) => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState();
  const [unitPrice, setUnitPrice] = useState(0);
  const [status, setStatus] = useState();

  let body = { name, categoryId: categoryId, unitPrice };

  const reset = () => {
    setCategoryId(0);
    setName("");
    setUnitPrice(0);
  };

  const handleAddProduct = () => {
    if (name && unitPrice > 0 && categoryId > 0) {
      POST("/products/createProduct", body).then(({ data, status }) => {
        if (status !== 200) {
          console.log(data);
          console.log(status);
        } else if (status === 200) {
          console.log("Product Added successful");
          console.log(data);
          toastDefaultMessage("🦄 Item added");
        }
      });
      reset();
      setRefresh(true);
    } else {
      toastDefaultMessage("🏰 Missing Fields. Product Save Failed.");
    }
  };

  const handleSelectCategory = (e) => {
    setCategoryId(e);
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };
  return (
    <div>
      <button
        className="btn bg-amber-400 hover:bg-amber-500"
        onClick={() => window.my_modal_1.showModal()}
      >
        {buttonName}
      </button>
      <dialog id="my_modal_1" className="modal  ">
        <form method="dialog" className="modal-box h-96">
          <div className="text-gray-800">Add Product</div>
          <div className="mt-2">
            <input
              className="outline-none text-sm text-gray-500 border px-4 py-2 w-full rounded-md "
              placeholder="Product name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="mt-2">
            <input
              className="outline-none text-sm text-gray-800 border px-4 py-2 w-full rounded-md "
              placeholder="Unit Price"
              type="number"
              value={unitPrice}
              onChange={(e) => {
                setUnitPrice(e.target.value);
              }}
            />
          </div>
          <div className="mt-2  w-full">
            <div className="dropdown w-full">
              <div tabIndex={0} className="flex justify-between btn m-1 w-full">
                <div>{categoryId > 0 ? ProductCategoryId[categoryId] : "Category"}</div>
                <div>
                  <BiCaretDown />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="absolute dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full"
              >
                {categoryItems.map((item, idx) => {
                  return (
                    <li
                      key={idx}
                      className=""
                      value={item.id}
                      onClick={() => {
                        handleSelectCategory(item.id);
                      }}
                    >
                      <a>{item.name}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="modal-action mt-16">
            <button className="btn">Cancel</button>
            <button className="btn bg-lime-400 hover:bg-lime-500" onClick={handleAddProduct}>
              Save Product
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default AddProductModal;
