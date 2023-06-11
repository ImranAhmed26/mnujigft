import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { TrashIcon } from "@heroicons/react/24/solid";

import { authContext } from "../../context/authContext";
import { ProductCategoryId, ProductItems } from "../../constants/constants";
import AddProductModal from "../modals/addProductModal";
import Loader from "../common/loader";
import { GET, DELETEMANY } from "../../lib/api";
import { formatDate } from "../../lib/helper";
import Pagination from "../common/pagination";
import EditProductModal from "../modals/editProductModal";

const ProductList = () => {
  const [product, setProduct] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [batchDelete, setBatchDelete] = useState([]);

  const { state } = useContext(authContext);
  const router = useRouter();

  let deleteBody = { productIds: batchDelete };

  let query = { limit: 8, page: page };
  useEffect(() => {
    if (!state.user) router.push("/");
    GET(`/products`, query).then(({ data, status }) => {
      if (status !== 200) {
        console.log(status);
        setLoading(false);
      } else if (status === 200) {
        setData(data.data);
        setPages(data.pages);
        setLoading(false);
      }
    });
    setRefresh(false);
  }, [page, refresh]);

  const handleDeleteMany = () => {
    DELETEMANY("/products/batch-delete", deleteBody).then(({ data, status }) => {
      if (status !== 200) {
        console.log(data);
        console.log(status);
      } else if (status === 200) {
        console.log("Delete successful");
        console.log(data);
      }
    });
    setRefresh(true);
  };

  const handleOpenProduct = () => {
    window.my_modal_2.showModal();
  };

  const handleSelectMultiple = (e, productId) => {
    e.stopPropagation();
    if (batchDelete.includes(productId)) {
      setBatchDelete((prevState) => prevState.filter((id) => id !== productId));
    } else {
      setBatchDelete((prevState) => [...prevState, productId]);
    }
  };

  return (
    <>
      {state.user ? (
        <div className="max-w-4xl lg:min-w-[1000px] pt-20 ">
          <div className="overflow-x-auto">
            <div className="flex max-w-4xl lg:min-w-[1000px] mb-5 p-4 text-gray-700 font-semibold bg-gray-100 rounded-md text-xl text-center cursor-default items-center">
              <div className="w-1/2 text-end">Product Lists</div>
              <div className="inline-flex justify-end w-1/2">
                <AddProductModal buttonName="Add" setRefresh={setRefresh}/>
              </div>
            </div>
            <div className="min-h-[500px]">
              <table className="table cursor-default bg-gray-100 rounded-md ">
                <thead>
                  <tr className="text-base text-gray-900">
                    <th>
                      <button
                        className="btn text-rose-300 hover:text-rose-400 hover:bg-gray-200 outline-none border-0"
                        onClick={(e) => {
                          handleDeleteMany();
                        }}
                        disabled={batchDelete.length < 1 ? true : false}
                      >
                        <TrashIcon className="h-6 w-6  " />
                      </button>
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
                  {data.map((item, i) => {
                    return (
                      <tr
                        key={i}
                        className="hover text-gray-700 rounded-md cursor-pointer"
                        onClick={(e) => {
                          handleOpenProduct(e);
                          setProduct(item);
                        }}
                      >
                        <th className="inline-flex  ml-3">
                          <input
                            type="checkbox"
                            className="checkbox"
                            onClick={(e) => {
                              handleSelectMultiple(e, item._id);
                            }}
                          />
                        </th>
                        <th>{item.name}</th>
                        <th>{item.categoryId}</th>
                        <th>{ProductCategoryId[item.categoryId]}</th>
                        <th>{item.unitPrice}</th>
                        <th>{`${item.status == 1 ? " Available" : "Unavailable"}`}</th>
                        <th>{formatDate(item.createdAt)}</th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-center">
              <Pagination page={page} setPage={setPage} pages={pages} />
            </div>
          </div>
          <EditProductModal product={product} setRefresh={setRefresh} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductList;
