import React, { useEffect, useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import { DELETE, POST, PUT } from "../../lib/api";
import { toastDefaultMessage } from "../../lib/helper";
import { categoryItems, ProductCategoryId, statusId } from "../../constants/constants";
import { TrashIcon } from "@heroicons/react/24/solid";

const EditProductModal = ({ product, setRefresh }) => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [status, setStatus] = useState(0);

  let body = { name, categoryId: categoryId, unitPrice, status };

  const reset = () => {
    setCategoryId(0);
    setName("");
    setUnitPrice(0);
    setStatus(0);
  };

  useEffect(() => {
    // console.log(body);
    setName(product.name);
    setCategoryId(product.categoryId);
    setUnitPrice(product.unitPrice);
    setStatus(product.status);
  }, [product]);

  const handleEditProduct = () => {
    setRefresh(true);
    if (name && unitPrice && categoryId > 0) {
      PUT(`/products/${product._id}`, body).then(({ data, status }) => {
        if (status !== 200) {
          console.log(data);
          console.log(status);
        } else if (status === 200) {
          console.log("Product Update successful");
          console.log(data);
          toastDefaultMessage("🦄 Product Update successful");
        }
      });
    } else {
      toastDefaultMessage("🦄 Missing Fields. Product Save Failed.");
    }
  };

  const handleDeleteRequest = () => {
    setRefresh(true);
    DELETE(`/products/${product._id}`).then(({ data, status }) => {
      if (status !== 200) {
        console.log(data);
        console.log(status);
      } else if (status === 200) {
        console.log("Delete successful");
        console.log(data);
        // setVisible(false);
      }
    });
  };

  const handleSelectCategory = (e) => {
    setCategoryId(e);
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  const handleSelectStatus = (e) => {
    setStatus(e);
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };
  return (
    <div>
      <dialog id="my_modal_2" className="modal  ">
        <form method="dialog" className="modal-box h-[420px]">
          <div className="text-gray-800">Edit Product</div>
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
          <div className="mt-3  w-full ">
            <div className="dropdown w-full z-30 top-0">
              <div tabIndex={0} className="flex justify-between btn  w-full">
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
          <div className="mt-3 w-full">
            <div className="dropdown w-full">
              <div tabIndex={0} className="flex justify-between btn  w-full">
                <div>{status == 0 ? "Unavailable" : status == 1 ? "Available" : "status"}</div>
                <div>
                  <BiCaretDown />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="absolute dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full"
              >
                {statusId.map((item, idx) => {
                  return (
                    <li
                      key={idx}
                      className=""
                      value={item.id}
                      onClick={() => {
                        handleSelectStatus(item.id);
                      }}
                    >
                      <a>{item.name}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="flex ">
            <div className="modal-action mt-16 w-1/2 justify-start">
              <button className="btn inline-flex justify-start">Cancel</button>
            </div>
            <div className="modal-action mt-16 ">
              <button
                className="btn text-rose-300 hover:text-rose-400 hover:bg-gray-200 outline-none border-0"
                onClick={(e) => {
                  handleDeleteRequest();
                }}
              >
                <TrashIcon className="h-6 w-6  " />
              </button>
              <button className="btn bg-lime-400 hover:bg-lime-500" onClick={handleEditProduct}>
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default EditProductModal;
