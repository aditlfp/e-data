import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-BBNDZYJL.js";
import { useForm, usePage, Head } from "@inertiajs/react";
import HeadNavigation from "./HeadNavigation-C5ShT8hy.js";
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa/index.esm.js";
import { toast } from "react-toastify";
import "./Sidebar-CW9JvTre.js";
import "react-icons/bi/index.esm.js";
import "framer-motion";
function IndexSlip(props) {
  const { data, setData, post, get, processing, errors, reset } = useForm({
    mitra: null,
    bulan: null,
    route: "",
    file: ""
  });
  const { flash } = usePage().props;
  useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(props.employe);
  const datas = Object.values(props.slip);
  const slipsArray = filteredEmployees == null ? void 0 : filteredEmployees.map((employee) => {
    return datas.filter((slip) => (slip == null ? void 0 : slip.user_id) === (employee == null ? void 0 : employee.id));
  });
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = props.employe.filter((employee) => {
      const nameMatch = employee.nama_lengkap && employee.nama_lengkap.toLowerCase().includes(value);
      const divisionMatch = props.divisi.some(
        (dev) => employee.devisi_id === dev.id && dev.name.toLowerCase().includes(value)
      );
      return nameMatch || divisionMatch;
    });
    setFilteredEmployees(filtered);
  };
  const create = (e) => {
    e.preventDefault();
    if (data.route == "create") {
      get(route("slip-gaji.create"));
    } else if (data.route == "edit") {
      get(route("editSlip", data.mitra));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post("slipgaji/import", data.file, {
      onSuccess: () => toast.success("Berhasil Menambahkan Data !", {
        theme: "colored"
      })
    });
  };
  const download = async () => {
    if (data.mitra == 0 || data.mitra == null && data.bulan == null) {
      toast.error("Mitra & Bulan Cannot Be Empty !", {
        theme: "colored"
      });
    } else {
      fetch(route("download.template", data), {
        method: "GET",
        headers: {
          "Accept": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "X-Requested-With": "XMLHttpRequest"
        }
      }).then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error("Network response was not ok.");
        }
      }).then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "slip.xlsx";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }).catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(AdminLayout, { children: [
      /* @__PURE__ */ jsx(Head, { title: "Slip Gaji - Home" }),
      /* @__PURE__ */ jsx(HeadNavigation, { title: "Slip Gaji - Home" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row justify-end gap-2 my-4 items-start sm:items-center", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "input",
        {
          id: "search_input",
          type: "text",
          placeholder: "Cari berdasarkan Formasi atau Nama",
          className: "input input-sm rounded-sm input-bordered",
          value: searchTerm,
          onChange: handleSearch
        }
      ) }) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, enctype: "multipart/form-data", className: "flex", children: [
        /* @__PURE__ */ jsxs("div", { className: "form-group flex items-end gap-x-1", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "file", className: "label", children: "Excel File: " }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                id: "file",
                className: "file-input rounded-sm file-input-bordered file-input-sm",
                onChange: (e) => setData("file", e.target.files[0])
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex gap-x-1", children: [
            /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-sm btn-success rounded-sm", children: /* @__PURE__ */ jsx(FaFileUpload, { className: "text-green-950" }) }),
            /* @__PURE__ */ jsx("a", { onClick: () => download(), className: "btn btn-sm rounded-sm  bg-orange-500 font-semibold text-sm hover:text-gray-200 uppercase text-orange-900 hover:bg-orange-700 border-none text-white", children: "download template" })
          ] })
        ] }),
        errors.file && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.file })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2  w-fit", children: /* @__PURE__ */ jsxs("form", { onSubmit: create, className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "label", children: "Pilih Mitra" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              className: "select select-sm select-bordered rounded-sm text-xs",
              onChange: (e) => setData("mitra", e.target.value),
              required: true,
              children: [
                /* @__PURE__ */ jsx("option", { value: "0", children: "~ Mitra ~" }, "0"),
                props.mitra.map((mit, i) => /* @__PURE__ */ jsx("option", { value: mit.id, children: mit.client.name }, i))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "label", children: "Pilih Bulan" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "month",
              className: "input input-sm input-bordered rounded-sm",
              onChange: (e) => setData("bulan", e.target.value),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "label", children: "Pilih Aksi: " }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-1 items-center", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  id: "create",
                  name: "aksi",
                  value: "create",
                  className: "radio radio-sm",
                  onClick: (e) => setData("route", e.target.value)
                }
              ),
              /* @__PURE__ */ jsx("label", { htmlFor: "create", className: "label text-sm", children: "Create" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-1 items-center", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  id: "edit",
                  name: "aksi",
                  value: "edit",
                  className: "radio radio-sm",
                  onClick: (e) => setData("route", e.target.value)
                }
              ),
              /* @__PURE__ */ jsx("label", { htmlFor: "edit", className: "label text-sm", children: "Edit" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center mx-5 h-full", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "btn bg-orange-600 btn-sm text-white hover:text-orange-600 rounded-sm",
            children: "Submit"
          }
        ) })
      ] }) }),
      flash.messege && /* @__PURE__ */ jsxs("div", { role: "alert", className: "alert bg-green-400/90 border-none mt-2", children: [
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "stroke-current text-green-800 shrink-0 h-6 w-6", fill: "none", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-green-800 font-medium", children: flash.messege })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-y-auto h-[365px] my-5", children: /* @__PURE__ */ jsxs("table", { className: "table table-zebra table-xs w-full", children: [
        /* @__PURE__ */ jsx("thead", { className: "sticky top-0", children: /* @__PURE__ */ jsxs("tr", { className: "bg-orange-600 text-white capitalize", children: [
          /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0", children: "No" }),
          /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0", children: "Nama" }),
          /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0", children: "Formasi" }),
          /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0", children: "Terakhir Gajian" }),
          /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300 sticky top-0", children: "Status Slip Gaji ( Bulan Ini )" })
        ] }) }),
        /* @__PURE__ */ jsx(
          "tbody",
          {
            className: "",
            style: { maxHeight: "calc(100vh - 200px)", overflowY: "auto" },
            children: filteredEmployees.map((us, index) => {
              var _a;
              return /* @__PURE__ */ jsxs("tr", { className: "border-[1px] border-orange-300 ", children: [
                /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: index + 1 }),
                /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: us.nama_lengkap }),
                /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: (_a = props.divisi) == null ? void 0 : _a.map((dev, i) => {
                  return /* @__PURE__ */ jsx("span", { children: us.devisi_id == dev.id && dev.name }, i);
                }) }),
                /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: us.temp_ban == "false" ? /* @__PURE__ */ jsx("span", { className: "text-white rounded-sm badge badge-success badge-sm", children: "Active" }) : /* @__PURE__ */ jsx("span", { className: "text-red-900 rounded-sm badge badge-error badge-sm", children: "Temp Ban" }) }),
                /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: slipsArray.map((s, i) => {
                  const matchedSlip = s.find((slip) => us.id === slip.user_id);
                  return matchedSlip ? matchedSlip.bulan_tahun : null;
                }) }),
                /* @__PURE__ */ jsxs("td", { className: "border-[1px] border-orange-300", children: [
                  slipsArray.map((s, i) => {
                    if (us.id == s.user_id && s.bulan_tahun == props.currentMonth) {
                      return /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "w-full flex items-center justify-center",
                          children: /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: "badge badge-sm badge-info rounded-sm text-sky-950",
                              children: "Sudah Dibuat"
                            },
                            i
                          )
                        },
                        i
                      );
                    }
                  }),
                  slipsArray.map((s, i) => {
                    const matchedSlip = s.find((slip) => us.id === slip.user_id);
                    const matchMonth = s.find((slip) => slip.bulan_tahun === props.currentMonth);
                    return /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "w-full flex items-center justify-center",
                        children: matchedSlip ? matchMonth && /* @__PURE__ */ jsx(
                          "span",
                          {
                            className: "badge badge-sm badge-info rounded-sm text-sky-950",
                            children: "Sudah Dibuat"
                          },
                          i
                        ) : null
                      },
                      i
                    );
                  })
                ] })
              ] }, index);
            })
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
        ::-webkit-scrollbar {
          height: 12px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: #ea580c;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #a33b04;
        }
      ` })
  ] });
}
export {
  IndexSlip as default
};
