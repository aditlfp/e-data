import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-BBNDZYJL.js";
import { useForm, Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
import HeadNavigation from "./HeadNavigation-C5ShT8hy.js";
import { BiSolidDownload } from "react-icons/bi/index.esm.js";
import ShowEmployeCareer from "./ShowEmployeCareer-CQuEBZPv.js";
import { N as NoImage } from "./no-image-lUO9SVn2.js";
import "./Sidebar-CW9JvTre.js";
import "framer-motion";
import "react-toastify";
function ShowEmploye(props) {
  useForm({});
  const [nowUrl, setNowUrl] = useState("employeRoute");
  const [showKarir, setShowKarir] = useState(false);
  const karirRoute = (id) => {
    setShowKarir(!showKarir);
    setNowUrl("karirRoute");
  };
  const employeRoute = () => {
    setShowKarir(!showKarir);
    setNowUrl("employeRoute");
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Employe - Details" }),
    /* @__PURE__ */ jsx(HeadNavigation, { title: "Employe - Details" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-orange-100 flex gap-x-2 w-full h-full mt-5 rounded-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "my-10 sm:w-1/6 pr-10 border-r-2 hidden sm:block border-orange-400/50", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            disabled: nowUrl == "employeRoute",
            onClick: () => employeRoute(),
            className: "bg-orange-300 ml-4 w-full btn btn-sm flex hover:text-gray-100 disabled:bg-orange-200 disabled:text-gray-100 disabled:cursor-not-allowed hover:bg-orange-400 transition-all items-center gap-x-4 font-bold ease-in-out duration-150 mb-2 py-2 px-3 rounded-sm justify-center text-sm cursor-pointer",
            children: "Profile"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            disabled: nowUrl == "karirRoute",
            onClick: () => karirRoute(props.employe.id),
            className: "bg-orange-300 w-full ml-4 btn btn-sm flex hover:text-gray-100 disabled:bg-orange-200 disabled:text-gray-100 disabled:cursor-not-allowed hover:bg-orange-400 transition-all items-center gap-x-4 font-bold ease-in-out duration-150 mb-2 py-2 px-3 rounded-sm justify-center text-sm cursor-pointer",
            children: "Karir"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "sm:w-5/6 w-full mb-2 mt-10", children: [
        /* @__PURE__ */ jsx("div", { className: "my-3 flex justify-end mx-10", children: /* @__PURE__ */ jsx(
          Link,
          {
            href: route("employes.index"),
            className: "btn btn-sm rounded-sm bg-orange-400 hover:bg-orange-500",
            children: "Kembali"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "mx-4 sm:mx-10", children: showKarir == false ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "sm:grid sm:grid-cols-2 flex flex-col gap-y-5 gap-x-2 items-center justify-center py-2 px-1 bg-orange-300/20 rounded-sm drop-shadow-md", children: [
            /* @__PURE__ */ jsx("div", { className: "relative flex justify-center items-center w-full my-32 sm:my-0", children: props.employe.img && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("p", { className: "capitalize text-center font-bold top-[-125px] inset-0 absolute z-50", children: [
                "Profile",
                " ",
                props.employe.name ? props.employe.name : "kosong"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "absolute bg-orange-400/70 p-2 drop-shadow-md rounded-full w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: props.employe.img != "" || props.employe.img != null ? `/storage/images/${props.employe.img}` : `${NoImage}`,
                  alt: "Profile IMG",
                  width: 150,
                  className: "object-cover rounded-full w-full h-full"
                }
              ) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-col w-full pr-10 bg-orange-400/10 p-2 rounded-sm sm:text-base text-sm", children: /* @__PURE__ */ jsxs("table", { children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { className: "flex flex-col" }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "capitalize", children: [
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "font-medium", children: "Nama Lengkap" }),
                  /* @__PURE__ */ jsxs("td", { children: [
                    ":",
                    " ",
                    props.employe.user_id ? props.employe.user.nama_lengkap : props.users.jabatan.name_jabatan
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "font-medium", children: "TTL" }),
                  /* @__PURE__ */ jsxs("td", { children: [
                    ": ",
                    props.employe.ttl ? props.employe.ttl : "kosong"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "font-medium", children: "No. KK" }),
                  /* @__PURE__ */ jsxs("td", { children: [
                    ":",
                    " ",
                    props.employe.no_kk ? props.no_kk : "kosong"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "font-medium", children: "No. KTP" }),
                  /* @__PURE__ */ jsxs("td", { children: [
                    ":",
                    " ",
                    props.employe.no_ktp ? props.no_ktp : "kosong"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "font-medium", children: "NIK" }),
                  /* @__PURE__ */ jsxs("td", { children: [
                    ":",
                    " ",
                    props.employe.nik ? props.employe.nik : "~ NIK KOSONG ~"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "font-medium", children: "Jenis BPJS" }),
                  /* @__PURE__ */ jsxs("td", { className: "uppercase", children: [
                    ": ",
                    props.employe.jenis_bpjs ? props.employe.jenis_bpjs.map((jenis, i) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
                      jenis,
                      i !== props.employe.jenis_bpjs.length - 1 && ", "
                    ] }, i)) : "kosong"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "font-medium", children: "No. BPJS Kesehatan" }),
                  /* @__PURE__ */ jsxs("td", { children: [
                    ":",
                    " ",
                    props.employe.no_bpjs_kesehatan ? props.employe.no_bpjs_kesehatan : "kosong"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "font-medium", children: "No. BPJS Ketenagakerjaan" }),
                  /* @__PURE__ */ jsxs("td", { children: [
                    ":",
                    " ",
                    props.employe.no_bpjs_ketenaga ? props.employe.no_bpjs_ketenaga : "kosong"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "font-medium", children: "BPJS Kesehatan" }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs(
                    "a",
                    {
                      disabled: props.employe.file_bpjs_kesehatan ? false : true,
                      href: props.employe.file_bpjs_kesehatan ? "/storage/bpjs/" + props.employe.file_bpjs_kesehatan : "#",
                      className: "btn btn-xs hover:text-white text-green-900 rounded-sm bg-green-500 border-0 hover:bg-green-600",
                      download: props.employe.file_bpjs_kesehatan ? true : void 0,
                      children: [
                        /* @__PURE__ */ jsx(BiSolidDownload, { className: "text-lg " }),
                        "Download"
                      ]
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "font-medium", children: "BPJS Ketenaga kerjaan" }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs(
                    "a",
                    {
                      disabled: props.employe.file_bpjs_ketenaga ? false : true,
                      href: props.employe.file_bpjs_ketenaga ? "/storage/bpjs/" + props.employe.file_bpjs_ketenaga : "#",
                      className: `${"btn btn-xs hover:text-white text-green-900 rounded-sm bg-green-500 border-0 hover:bg-green-600"}`,
                      download: props.employe.file_bpjs_ketenaga ? true : void 0,
                      children: [
                        /* @__PURE__ */ jsx(BiSolidDownload, { className: "text-lg " }),
                        "Download"
                      ]
                    }
                  ) })
                ] })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex sm:justify-start justify-center gap-4 drop-shadow-md mt-2", children: /* @__PURE__ */ jsxs(
            "span",
            {
              className: "hover:tooltip hover:tooltip-open hover:tooltip-top transition-all ease-in-out duration-150",
              "data-tip": "Click To Download",
              children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-center font-semibold", children: "Foto KTP" }),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `/storage/images/${props.employe.img_ktp_dpn}`,
                    download: true,
                    children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: `/storage/images/${props.employe.img_ktp_dpn}`,
                        alt: "Profile IMG",
                        width: 150,
                        className: "rounded-sm"
                      }
                    )
                  }
                )
              ]
            }
          ) })
        ] }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(ShowEmployeCareer, { employe: true, datas: props }) }) })
      ] })
    ] })
  ] });
}
export {
  ShowEmploye as default
};
