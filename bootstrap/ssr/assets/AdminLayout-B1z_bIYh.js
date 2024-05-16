import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar-BZBlB_YE.js";
import { AnimatePresence, motion } from "framer-motion";
import { BiExtension, BiChevronsLeft } from "react-icons/bi/index.esm.js";
import { ToastContainer } from "react-toastify";
function Footer(props) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("footer", { className: "footer fixed bottom-0 z-20 h-10 footer-center p-4 bg-gray-300 text-base-content", children: /* @__PURE__ */ jsx("aside", { children: /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
    "Copyright © ",
    (/* @__PURE__ */ new Date()).getFullYear(),
    " - All right reserved by PT. SAC Ponorogo Design And Code by Aditya & Syafi"
  ] }) }) }) });
}
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `flex ${overflow ? overflow : "overflow-auto"} w-full bg-gray-200 gap-2`,
        children: [
          /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { width: "0%" },
              animate: { width: !open ? "0%" : "12%" },
              transition: { duration: 0.15, transition: { ease: "easeInOut" } },
              className: `flex items-center fixed z-10 `,
              children: [
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { translateX: "-100%" },
                    animate: {
                      opacity: !open ? 0 : 1,
                      translateX: !open ? "-100%" : "0%"
                    },
                    transition: {
                      duration: 0.3,
                      transition: { ease: "easeIn" }
                    },
                    className: "relative",
                    children: /* @__PURE__ */ jsx(
                      Sidebar,
                      {
                        link: "employes.index",
                        value: "Employes Data",
                        open,
                        children: /* @__PURE__ */ jsx(BiExtension, {})
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { translateX: "-338%" },
                    animate: {
                      translateX: !open ? "-338%" : "0%"
                    },
                    transition: {
                      duration: 0.3,
                      transition: { ease: "easeInOut" }
                    },
                    onClick: () => openSideBar(),
                    className: "bg-orange-50 z-10 sm:hidden py-6 pl-1 pr-3 rounded-r-full text-center text-2xl",
                    children: /* @__PURE__ */ jsx(
                      BiChevronsLeft,
                      {
                        className: `transition-all duration-300 ${!open && "rotate-180"}`
                      }
                    )
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `w-full p-10 min-h-screen sm:ml-48 overflow-hidden sm:overflow-auto`,
              children: [
                /* @__PURE__ */ jsx(
                  ToastContainer,
                  {
                    position: "top-center",
                    autoClose: 5e3,
                    hideProgressBar: false,
                    newestOnTop: false,
                    closeOnClick: true,
                    rtl: false,
                    pauseOnFocusLoss: true,
                    draggable: true,
                    pauseOnHover: true,
                    theme: "light",
                    "transition:Bounce": true
                  }
                ),
                children
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  AdminLayout as A
};
