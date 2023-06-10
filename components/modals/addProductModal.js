import React, { useState } from "react";
import { BiCaretDown } from "react-icons/bi";
const categoryItems = [
  { name: "bath", id: 1 },
  { name: "bedding", id: 2 },
  { name: "kitchen", id: 3 },
];

const AddProductModal = ({ buttonName, handleClick }) => {
  const [name, setName] = useState();
  const [category, setCategory] = useState({});
  const [unitPrice, setUnitPrice] = useState();
  const [status, setStatus] = useState();

  let body = { name, category: category.id, unitPrice, status };

  const reset = () => {
    setCategory({});
    setName("");
    setUnitPrice("");
  };

  const handleAddProduct = () => {
    console.log(body);
    console.log(category.length);
    reset();
  };

  const handleSelectCategory = (e) => {
    setCategory(e);
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
          <div className="mt-2  w-full">
            <div className="dropdown w-full">
              <div tabIndex={0} className="flex justify-between btn m-1 w-full">
                <div>{Object.keys(category).length > 0 ? category.name : "Category"}</div>
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
                        handleSelectCategory(item);
                      }}
                    >
                      <a>{item.name}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
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

          <div className="modal-action">
            <button className="btn">Cancel</button>
            <button className="btn bg-lime-400 hover:bg-lime-500" onClick={handleAddProduct}>
              Add Products
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default AddProductModal;
