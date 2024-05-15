import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import "react";
import { useForm, Head } from "@inertiajs/react";
import { BiSolidCog, BiSolidDownload } from "react-icons/bi/index.esm.js";
import "react-toastify";
import HeadNavigation from "./HeadNavigation-C5ShT8hy.js";
function ShowEmployeCareer(props) {
  var _a, _b, _c, _d, _e;
  console.log(props.datas);
  const { get } = useForm({});
  const createCareer = (id) => {
    get(route("create.career", id));
  };
  const editCareer = (id) => {
    get(route("careers.edit", id));
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Karir show - Karir" }),
    /* @__PURE__ */ jsx(HeadNavigation, { title: "Karir show - Karir" }),
    /* @__PURE__ */ jsx("div", { className: "my-10 bg-orange-100 min-h-screen min-w-full rounded-sm", children: /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-xl ml-5 underline font-bold capitalize", children: [
          "Riwayat Karir",
          " ",
          ((_b = (_a = props.datas) == null ? void 0 : _a.employe) == null ? void 0 : _b.user_id) ? props.datas.employe.user.nama_lengkap : props.datas.employe.name
        ] }),
        ((_c = props.datas) == null ? void 0 : _c.career) ? /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              var _a2, _b2;
              return editCareer((_b2 = (_a2 = props.datas) == null ? void 0 : _a2.employe) == null ? void 0 : _b2.id);
            },
            className: "btn btn-sm btn-circle mr-5 text-gray-600 hover:text-white bg-yellow-400 hover:bg-yellow-500 border-0",
            children: /* @__PURE__ */ jsx(BiSolidCog, { className: "text-xl" })
          }
        ) : /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              var _a2, _b2;
              return createCareer((_b2 = (_a2 = props.datas) == null ? void 0 : _a2.employe) == null ? void 0 : _b2.id);
            },
            className: "btn btn-sm rounded-sm mr-5 bg-blue-300 hover:bg-blue-400 border-0",
            children: "+ Tambahkan Karir"
          }
        )
      ] }),
      props.datas.career ? /* @__PURE__ */ jsxs("div", { className: "mt-10", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: "~ Jenjang Karir" }),
        /* @__PURE__ */ jsxs("ul", { className: "steps steps-vertical text-sm", children: [
          /* @__PURE__ */ jsx("li", { className: "step step-primary ml-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-start items-start py-3 gap-y-1 capitalize font-semibold", children: [
            /* @__PURE__ */ jsx("p", { children: "Mulai Masuk" }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                disabled: props.datas.career.mulai_masuk ? false : true,
                href: props.datas.career.mulai_masuk ? "/storage/sk_kontrak/" + props.datas.career.mulai_masuk : "#",
                className: `${"btn btn-xs hover:text-white text-green-900 rounded-sm bg-green-500 border-0 hover:bg-green-600"}`,
                target: "_blank",
                children: [
                  /* @__PURE__ */ jsx(BiSolidDownload, { className: "text-lg " }),
                  "SK Masuk"
                ]
              }
            )
          ] }) }),
          props.datas.career.jenjang_karir.length > 0 && props.datas.career.jenjang_karir.map((names, index) => {
            return /* @__PURE__ */ jsx(
              "li",
              {
                className: "step step-primary ml-5 capitalize font-semibold",
                children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-start items-start py-3 gap-y-1", children: [
                  /* @__PURE__ */ jsx("p", { children: names }),
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: props.datas.career.file_sk_kontrak[index] ? "/storage/sk_kontrak/" + props.datas.career.file_sk_kontrak[index] : "#",
                      className: `${"btn btn-xs hover:text-white text-green-900 rounded-sm bg-green-500 border-0 hover:bg-green-600"}`,
                      target: "_blank",
                      children: [
                        /* @__PURE__ */ jsx(BiSolidDownload, { className: "text-lg " }),
                        "SK Kontrak"
                      ]
                    }
                  )
                ] })
              },
              index
            );
          }),
          /* @__PURE__ */ jsx("li", { className: "step step-primary ml-5", children: /* @__PURE__ */ jsxs(
            "a",
            {
              disabled: props.datas.career.leader ? false : true,
              href: props.datas.career.leader ? "/storage/sk_kontrak/" + props.datas.career.leader : "#",
              className: `${"btn btn-xs hover:text-white text-green-900 rounded-sm bg-green-500 border-0 hover:bg-green-600"}`,
              target: "_blank",
              children: [
                /* @__PURE__ */ jsx(BiSolidDownload, { className: "text-lg " }),
                "SK Leader"
              ]
            }
          ) })
        ] })
      ] }) : /* @__PURE__ */ jsx("div", { className: "text-center bg-gray-100 flex justify-center p-36 rounded-sm m-5", children: /* @__PURE__ */ jsxs("span", { className: "italic text-sm", children: [
        ((_e = (_d = props.datas) == null ? void 0 : _d.employe) == null ? void 0 : _e.user_id) ? props.datas.employe.user.nama_lengkap : props.datas.employe.name,
        " ",
        "Belum Memiliki Riwayat Karir"
      ] }) })
    ] }) })
  ] });
}
export {
  ShowEmployeCareer as default
};
