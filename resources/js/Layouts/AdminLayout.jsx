import Footer from "@/Components/Footer";
import Sidebar from "@/Pages/Admin/Component/Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BiChevronsLeft, BiChevronsRight, BiExtension } from "react-icons/bi";
import { ToastContainer } from "react-toastify";

function AdminLayout({ children, overflow }) {
  const [open, setOpen] = useState(true);
  const [isSm, setIsSm] = useState(window.screen.width);

  useEffect(() => {
    function handleResize() {
      setIsSm(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isSm >= 640) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isSm]);

  const openSideBar = () => {
    setOpen(!open);
  };
  // console.log(isSm, open);
  return (
    <>
      <div
        className={`flex ${
          overflow ? overflow : "overflow-auto"
        } w-full bg-gray-200 gap-2`}
      >
        <AnimatePresence>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: !open ? "0%" : "12%" }}
            transition={{ duration: 0.15, transition: { ease: "easeInOut" } }}
            className={`flex items-center fixed z-10 `}
          >
            <motion.div
              initial={{ translateX: "-100%" }}
              animate={{
                opacity: !open ? 0 : 1,

                translateX: !open ? "-100%" : "0%",
              }}
              transition={{
                duration: 0.3,
                transition: { ease: "easeIn" },
              }}
              className={"relative"}
            >
              <Sidebar
                link={"employes.index"}
                value={"Employes Data"}
                open={open}
              >
                {<BiExtension />}
              </Sidebar>
            </motion.div>
            <motion.div
              initial={{ translateX: "-338%" }}
              animate={{
                translateX: !open ? "-338%" : "0%",
              }}
              transition={{
                duration: 0.3,
                transition: { ease: "easeInOut" },
              }}
              onClick={() => openSideBar()}
              className="bg-orange-50 z-10 sm:hidden py-6 pl-1 pr-3 rounded-r-full text-center text-2xl"
            >
              <BiChevronsLeft
                className={`transition-all duration-300 ${
                  !open && "rotate-180"
                }`}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div
          className={`w-full p-10 min-h-screen sm:ml-48 overflow-hidden sm:overflow-auto`}
        >
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition:Bounce
          />
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminLayout;
