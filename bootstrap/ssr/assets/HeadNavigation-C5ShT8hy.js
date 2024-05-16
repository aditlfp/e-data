import { jsxs } from "react/jsx-runtime";
import "react";
function HeadNavigation({ title }) {
  return /* @__PURE__ */ jsxs("span", { className: "text-[10px] flex underline", children: [
    "On Pages ",
    title,
    " !"
  ] });
}
export {
  HeadNavigation as default
};
