import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-BBNDZYJL.js";
import { useForm, Head } from "@inertiajs/react";
import "react";
import HeadNavigation from "./HeadNavigation-C5ShT8hy.js";
import { BiSolidCog, BiSolidDownload } from "react-icons/bi/index.esm.js";
import "./Sidebar-CW9JvTre.js";
import "framer-motion";
import "react-toastify";
function IndexCareer(props) {
  var _a, _b;
  const { get } = useForm({});
  const createCareer = (id) => {
    get(route("create.career", id));
  };
  const editCareer = (id) => {
    get(route("careers.edit", id));
  };
  const back = () => {
    get(route("employes.index"));
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Karir show - Karir" }),
    /* @__PURE__ */ jsx(HeadNavigation, { title: "Karir show - Karir" }),
    /* @__PURE__ */ jsx("div", { className: "my-10 bg-orange-100 min-h-screen min-w-full rounded-sm", children: /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
      /* @__PURE__ */ jsx("div", { className: "my-3 flex justify-end", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => back(),
          className: "btn btn-sm rounded-sm bg-red-600 hover:text-red-900 text-white hover:bg-red-500",
          children: "Kembali"
        }
      ) }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: (props == null ? void 0 : props.career) ? "flex flex-row justify-between " : "flex flex-col sm:flex-row sm:justify-between gap-2 ",
          children: [
            /* @__PURE__ */ jsxs("p", { className: "text-xl ml-5 underline font-bold capitalize", children: [
              "Riwayat Karir",
              " ",
              ((_a = props == null ? void 0 : props.employe) == null ? void 0 : _a.user_id) ? props.employe.user.nama_lengkap : props.employe.name
            ] }),
            (props == null ? void 0 : props.career) ? /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  var _a2;
                  return editCareer((_a2 = props == null ? void 0 : props.employe) == null ? void 0 : _a2.id);
                },
                className: "btn btn-sm btn-circle mr-5 text-gray-600 hover:text-white bg-yellow-400 hover:bg-yellow-500 border-0",
                children: /* @__PURE__ */ jsx(BiSolidCog, { className: "text-xl" })
              }
            ) : /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  var _a2;
                  return createCareer((_a2 = props == null ? void 0 : props.employe) == null ? void 0 : _a2.id);
                },
                className: "btn btn-sm w-fit rounded-sm mr-5 bg-blue-300 hover:bg-blue-400 border-0",
                children: "+ Tambahkan Karir"
              }
            ) })
          ]
        }
      ),
      props.career ? /* @__PURE__ */ jsxs("div", { className: "mt-10", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: "~ Jenjang Karir" }),
        /* @__PURE__ */ jsxs("ul", { className: "steps steps-vertical text-sm", children: [
          /* @__PURE__ */ jsx("li", { className: "step step-primary ml-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-start items-start py-3 gap-y-1 capitalize font-semibold", children: [
            /* @__PURE__ */ jsx("p", { children: "Mulai Masuk" }),
            /* @__PURE__ */ jsx("span", { children: props.career.mulai_masuk }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                disabled: props.career.sk_mulai_masuk ? false : true,
                href: props.career.sk_mulai_masuk ? "/storage/sk_kontrak/" + props.career.sk_mulai_masuk : "#",
                className: `${"btn btn-xs hover:text-white text-green-900 rounded-sm bg-green-500 border-0 hover:bg-green-600"}`,
                target: "_blank",
                children: [
                  /* @__PURE__ */ jsx(BiSolidDownload, { className: "text-lg " }),
                  "SK Masuk"
                ]
              }
            )
          ] }) }),
          props.career.jenjang_karir.length > 0 && props.career.jenjang_karir.map((names, index) => {
            return /* @__PURE__ */ jsx("li", { className: "step step-primary ml-5 capitalize font-semibold", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-start items-start py-3 gap-y-1", children: [
              /* @__PURE__ */ jsx("p", { children: names }),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: props.career.file_sk_kontrak[index] ? "/storage/sk_kontrak/" + props.career.file_sk_kontrak[index] : "#",
                  className: `${"btn btn-xs hover:text-white text-green-900 rounded-sm bg-green-500 border-0 hover:bg-green-600"}`,
                  target: "_blank",
                  children: [
                    /* @__PURE__ */ jsx(BiSolidDownload, { className: "text-lg " }),
                    "SK Kontrak"
                  ]
                }
              )
            ] }) });
          }),
          /* @__PURE__ */ jsx("li", { className: "step step-primary ml-5", children: /* @__PURE__ */ jsxs(
            "a",
            {
              disabled: props.career.leader ? false : true,
              href: props.career.leader ? "/storage/sk_kontrak/" + props.career.leader : "#",
              className: `${"btn btn-xs hover:text-white text-green-900 rounded-sm bg-green-500 border-0 hover:bg-green-600"}`,
              target: "_blank",
              children: [
                /* @__PURE__ */ jsx(BiSolidDownload, { className: "text-lg " }),
                "SK Leader"
              ]
            }
          ) })
        ] })
      ] }) : /* @__PURE__ */ jsx("div", { className: "text-center bg-gray-100 flex justify-center py-14 sm:p-36 rounded-sm m-5", children: /* @__PURE__ */ jsxs("span", { className: "italic text-sm", children: [
        ((_b = props == null ? void 0 : props.employe) == null ? void 0 : _b.user_id) ? props.employe.user.nama_lengkap : props.employe.name,
        " ",
        "Belum Memiliki Riwayat Karir"
      ] }) })
    ] }) })
  ] });
}
export {
  IndexCareer as default
};
