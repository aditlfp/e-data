import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-BeIvTlxI.js";
import { Link, useForm, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import HeadNavigation from "./HeadNavigation-C5ShT8hy.js";
import { N as NoImage } from "./no-image-lUO9SVn2.js";
import { BiSortUp, BiSortDown, BiSolidCog, BiSolidTrash, BiSolidFileFind, BiSolidExtension } from "react-icons/bi/index.esm.js";
import Modal from "./Modal-DmMYx0rx.js";
import { toast } from "react-toastify";
import _ from "lodash";
import "./Sidebar-BZBlB_YE.js";
import "framer-motion";
const Paginate = ({ meta }) => {
  const prev = meta.links[0].url;
  const next = meta.links[meta.links.length - 1].url;
  const current = meta.current_page;
  return /* @__PURE__ */ jsxs("div", { className: "join shadow-md", children: [
    prev && /* @__PURE__ */ jsx(
      Link,
      {
        href: prev,
        className: "join-item btn btn-sm rounded-sm bg-orange-600 hover:bg-orange-800 text-white",
        children: "«"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        disabled: true,
        className: "join-item btn btn-sm disabled:bg-orange-300 disabled:text-white rounded-sm bg-orange-600 hover:bg-orange-800 text-white",
        children: current
      }
    ),
    next && /* @__PURE__ */ jsx(
      Link,
      {
        href: next,
        className: "join-item btn btn-sm rounded-sm bg-orange-600 hover:bg-orange-800 text-white",
        children: "»"
      }
    )
  ] });
};
function IndexEmploye(props) {
  const [sortOrder, setSortOrder] = useState(false);
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(props.employe.data);
  const { delete: destroy, get } = useForm({
    id: ""
  });
  const handleDelete = (id) => {
    setModal(true);
    const employeData = props.employe.data.find((emp) => emp.id === id);
    setDataModal(employeData);
  };
  const debouncedSearch = _.debounce((term) => {
    const results = props.employe.data.filter((emplo) => {
      return emplo.nik.includes(term) || emplo.name.toLowerCase().includes(term.toLowerCase());
    });
    setSearchResults(results);
  }, 300);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };
  const closeModal = () => {
    setModal(!modal);
  };
  const confirmDelete = (id) => {
    destroy(route(`employes.destroy`, id), {
      onSuccess: () => {
        toast.warning("Berhasil Menghapus Data Karyawan!", {
          theme: "colored"
        });
        get(route("employes.index"), {
          replace: true,
          // Replace the current page
          preserveScroll: true
          // Preserve the current scroll position
        });
      }
    });
    setModal(!modal);
  };
  const sortSearchResults = () => {
    const sortedResults = [...searchResults];
    sortOrder ? sortedResults.sort((a, b) => a.name.localeCompare(b.name)) : sortedResults.sort((a, b) => b.name.localeCompare(a.name));
    setSearchResults(sortedResults);
  };
  useEffect(() => {
    sortSearchResults();
  }, [sortOrder]);
  const toggleSortOrder = () => {
    setSortOrder(!sortOrder);
  };
  const createEmploye = () => {
    get(route("employes.create"));
  };
  const showEmploye = (id) => {
    get(route("employes.show", id));
  };
  const editEmploye = (id) => {
    get(route("employes.edit", id));
  };
  const createCareer = (id) => {
    get(route("careers.show", id));
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { overflow: modal ? "overflow-hidden" : "overflow-auto", children: [
    /* @__PURE__ */ jsx(Head, { title: "Employe - Home" }),
    /* @__PURE__ */ jsx(HeadNavigation, { title: "Employe - Home" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-end gap-2 my-4 items-start sm:items-center", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: searchTerm,
          onChange: handleSearch,
          placeholder: "Cari berdasarkan NIK atau Nama",
          className: "input input-sm rounded-sm input-bordered"
        }
      ) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => createEmploye(),
          className: "btn bg-orange-600 btn-sm text-white hover:text-orange-600 rounded-sm",
          children: "+ New Employe"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "table table-zebra  table-xs my-5", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-orange-600 text-white capitalize", children: [
        /* @__PURE__ */ jsxs("th", { className: "border-x-[1px] border-orange-300 flex", children: [
          sortOrder == false ? /* @__PURE__ */ jsx(
            BiSortUp,
            {
              className: "text-lg hover:cursor-pointer",
              onClick: toggleSortOrder
            }
          ) : /* @__PURE__ */ jsx(
            BiSortDown,
            {
              className: "text-lg hover:cursor-pointer",
              onClick: toggleSortOrder
            }
          ),
          "NIK"
        ] }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Foto Profile" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Nama" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "TTL" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "No. KK" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "No. KTP" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Mitra" }),
        props.auth.user.role_id == 2 && /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Aksi" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: searchResults.length > 0 ? searchResults.map((emplo, index) => /* @__PURE__ */ jsxs("tr", { className: "border-[1px] border-orange-300 ", children: [
        /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: emplo.nik ? emplo.nik : "~ NIK KOSONG ~" }),
        /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: emplo.img ? /* @__PURE__ */ jsx("img", { src: `/storage/images/${emplo.img}`, width: 100 }) : /* @__PURE__ */ jsx("img", { src: NoImage, width: 100 }) }),
        /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: emplo.name }),
        /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: emplo.ttl }),
        /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: emplo.no_kk }),
        /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: emplo.no_ktp }),
        /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: emplo.client.name }),
        props.auth.user.role_id == 2 && /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-x-1 items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-1", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "hover:tooltip hover:tooltip-open hover:tooltip-top transition-all ease-in-out duration-150",
                "data-tip": "Edit",
                children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => editEmploye(emplo.id),
                    className: "btn btn-xs rounded-sm hover:text-yellow-500 border-0 text-white bg-yellow-500",
                    children: /* @__PURE__ */ jsx(BiSolidCog, {})
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "hover:tooltip hover:tooltip-open hover:tooltip-top transition-all ease-in-out duration-150",
                "data-tip": "Delete",
                children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDelete(emplo.id),
                    className: "btn btn-xs rounded-sm hover:text-red-500 border-0 text-white bg-red-500",
                    children: /* @__PURE__ */ jsx(BiSolidTrash, {})
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-1", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "hover:tooltip hover:tooltip-open hover:tooltip-top transition-all ease-in-out duration-150",
                "data-tip": "Details",
                children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => showEmploye(emplo.id),
                    className: "btn btn-xs rounded-sm hover:text-blue-500 border-0 text-white bg-blue-500",
                    children: /* @__PURE__ */ jsx(BiSolidFileFind, {})
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "hover:tooltip hover:tooltip-open hover:tooltip-top transition-all ease-in-out duration-150",
                "data-tip": "Career",
                children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => createCareer(emplo.id),
                    className: "btn btn-xs rounded-sm hover:text-green-500 border-0 text-white bg-green-500",
                    children: /* @__PURE__ */ jsx(BiSolidExtension, {})
                  }
                )
              }
            )
          ] })
        ] }) })
      ] }, index)) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("tr", { className: "border-[1px] text-center border-orange-300", children: /* @__PURE__ */ jsx("td", { colSpan: 8, children: "Data Belum Tersedia" }) }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(Paginate, { meta: props.employe.meta }),
    modal && /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-lg font-medium text-gray-900", children: [
        "Apakah Anda Yakin Untuk Menghapus Karyawan",
        " ",
        dataModal.user_id ? dataModal.user.nama_lengkap : dataModal.name,
        "?"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-x-1 mt-5  items-center", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "btn btn-error btn-sm rounded-sm",
            onClick: () => confirmDelete(dataModal.id),
            children: "DELETE"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => closeModal(),
            className: "btn uppercase btn-primary btn-sm rounded-sm",
            children: "Cancel"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  IndexEmploye as default
};
