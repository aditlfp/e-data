import { jsx, jsxs } from "react/jsx-runtime";
import { BiSolidUserDetail } from "react-icons/bi/index.esm.js";
import { Link } from "@inertiajs/react";
function ApplicationLogo(props) {
  return /* @__PURE__ */ jsx(BiSolidUserDetail, { ...props });
}
function Guest({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-white", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col bg-orange-100 shadow-md p-3 text-center rounded-md", children: [
      /* @__PURE__ */ jsx("div", { className: "rounded-full p-4 bg-orange-500", children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "w-20 h-20 fill-current text-white" }) }) }),
      /* @__PURE__ */ jsxs("span", { className: "font-black flex flex-col mt-2 capitalize", children: [
        "SAC",
        /* @__PURE__ */ jsx("span", { children: "DataCenter" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full sm:max-w-md mt-6 px-6 py-4 overflow-hidden sm:rounded-lg", children })
  ] });
}
export {
  Guest as G
};
