import Footer from "@/Components/Footer";
import Sidebar from "@/Pages/Admin/Component/Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { BiChevronsLeft, BiChevronsRight, BiExtension } from "react-icons/bi";
import { ToastContainer } from "react-toastify";

function AdminLayout({ children, overflow }) {
  const [open, setOpen] = useState(true);
  const openSideBar = () => {
    setOpen(!open);
  };
  return (
    <>
      <div
        className={`flex ${
          overflow ? overflow : "overflow-auto"
        } w-full bg-gray-200 gap-2`}
      >
        <AnimatePresence>
          <motion.div
            initial={{ left: "0" }}
            animate={{ left: 0, width: open ? "100%" : "0%" }}
            transition={{ duration: 0.15, transition: { ease: "easeInOut" } }}
            className={`flex items-center fixed z-10 `}
          >
            <motion.div
              animate={{
                opacity: open ? 1 : 0,

                translateX: open ? "0%" : "-100%",
              }}
              transition={{
                duration: 0.3,
                transition: { ease: "easeIn" },
              }}
              className="relative"
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
              animate={{
                translateX: open ? "0%" : "-280%",
              }}
              transition={{
                duration: 0.3,
                transition: { ease: "easeInOut" },
              }}
              onClick={() => openSideBar()}
              className="bg-orange-50  z-10 sm:hidden py-6 pl-2 pr-4 rounded-r-full text-center text-2xl"
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
