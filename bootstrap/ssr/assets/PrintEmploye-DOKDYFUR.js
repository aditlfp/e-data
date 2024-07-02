import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import "react";
import { PDFViewer } from "@react-pdf/renderer";
import { Head } from "@inertiajs/react";
import MyDocument from "./MyDocument-HtjfqU_Y.js";
function PrintEmploye(props) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Export - Employes" }),
    /* @__PURE__ */ jsx("div", { className: "w-screen h-screen", children: /* @__PURE__ */ jsx(PDFViewer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsx(MyDocument, { props }) }) })
  ] });
}
export {
  PrintEmploye as default
};
