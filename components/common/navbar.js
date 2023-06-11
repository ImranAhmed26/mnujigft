import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Logo from "../../public/assets/logo.png";
import NavLinks from "../../constants/navLinks.js";
import SearchIcon from "../../public/assets/search.svg";
import { authContext } from "../../context/authContext";
import ProfileIcon from "../../public/assets/profile-image.png";
import LoginModal from "../modals/loginModal";
import { GET } from "../../lib/api";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileName, setProfileName] = useState("");
  const [visible, setVisible] = useState(false);

  const { state, dispatch } = useContext(authContext);
  const router = useRouter();

  useEffect(() => {
    setProfileImage(ProfileIcon);
    setProfileName("Anne Doe");
  }, []);

  const handleSearch = () => {
    "logic for handling search";
  };

  const handleShowModal = () => {
    setVisible(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    GET("/user/logout").then(({ data, status }) => {
      console.log(data);
    });
    router.push("/");
  };

  return (
    <div>
      <div className="w-full h-20 px-12 py-3.5 bg-white text-lg drop-shadow-md flex items-center sticky z-30 top-10">
        <div className="flex items-center w-1/2">
          <div>
            <Image src={Logo} width={57} height={48} alt={"logo"} />
          </div>
          <div>
            <div className=" flex gap-3 px-4 lg:gap-5 xl:gap-7 2xl:gap-9 lg:px-7 xl:px-12 2xl:px-28 text-base lg:text-lg xl:text-xl py-2 ">
              <div>
                <Link href={`/`}>
                  <a>Home</a>
                </Link>
              </div>
              {state.user && (
                <div>
                  <Link href={`/products`}>
                    <a>Products</a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-1/2 gap-4">
          <div
            className="bg-gray-100 max-w-lg w-full h-12 rounded-md px-8 text-xl items-center flex justify-between shadow-sm"
            onClick={(e) => {
              handleSearch;
            }}
          >
            <input
              type="text"
              placeholder="Search Products"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="text-color_gray bg-gray-100 outline-none w-4/5"
            />
            <Image
              src={SearchIcon}
              width={25}
              height={25}
              alt={"SearchIcon"}
              className="cursor-pointer"
            />
          </div>
          {!state.user ? (
            <div
              className="btn flex items-center justify-end pt-2 pl-2 font-semibold uppercase"
              onClick={() => {
                handleShowModal();
              }}
            >
              Login
            </div>
          ) : (
            <div
              className="btn flex items-center justify-end pt-2 pl-2 font-semibold uppercase"
              onClick={() => {
                handleLogout();
              }}
            >
              logout
            </div>
          )}
        </div>
      </div>
      <LoginModal visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default Navbar;
