import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-B1z_bIYh.js";
import { useForm, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import HeadNavigation from "./HeadNavigation-C5ShT8hy.js";
import { N as NoImage } from "./no-image-lUO9SVn2.js";
import { BiSortUp, BiSortDown, BiSolidCog, BiSolidTrash, BiSolidFileFind, BiSolidExtension } from "react-icons/bi/index.esm.js";
import Modal from "./Modal-DmMYx0rx.js";
import { toast } from "react-toastify";
import "lodash";
import ReactPaginate from "react-paginate";
import "./Sidebar-BZBlB_YE.js";
import "framer-motion";
function IndexEmploye(props) {
  const [sortOrder, setSortOrder] = useState(false);
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState();
  useState("");
  const [searchResults, setSearchResults] = useState(props.employe.data);
  const { delete: destroy, get } = useForm({
    id: ""
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const employeesPerPage = 10;
  const handleDelete = (id) => {
    setModal(true);
    const employeData = props.employe.data.find((emp) => emp.id === id);
    setDataModal(employeData);
  };
  const closeModal = () => {
    setModal(!modal);
  };
  const filteredEmployees = props.employe.data.filter(
    (employee) => employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || employee.no_ktp.includes(searchQuery)
  );
  const offset = currentPage * employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    offset,
    offset + employeesPerPage
  );
  const pageCount = Math.ceil(filteredEmployees.length / employeesPerPage);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const confirmDelete = (id) => {
    destroy(route(`employes.destroy`, id), {
      onSuccess: () => {
        toast.warning("Berhasil Menghapus Data Karyawan!", {
          theme: "colored"
        });
        setTimeout(() => {
          get(route("employes.index"), {
            replace: true,
            // Replace the current page
            preserveScroll: true
            // Preserve the current scroll position
          });
        }, 2e3);
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
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          placeholder: "Cari berdasarkan KTP atau Nama",
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
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Foto Profile" }),
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
          "Nama"
        ] }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "TTL" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "No. KK" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "No. KTP" }),
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Mitra" }),
        props.auth.user.role_id == 2 && /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Aksi" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: currentEmployees.length > 0 ? currentEmployees.map((emplo, index) => /* @__PURE__ */ jsxs("tr", { className: "border-[1px] border-orange-300 ", children: [
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
    /* @__PURE__ */ jsx(
      ReactPaginate,
      {
        containerClassName: "join shadow-md mb-10",
        previousLinkClassName: "join-item btn btn-sm rounded-sm bg-orange-600 hover:bg-orange-800 text-white",
        pageLinkClassName: "join-item btn btn-sm disabled:bg-orange-300 disabled:text-white rounded-sm bg-orange-600 hover:bg-orange-800 text-white",
        nextLinkClassName: "join-item btn btn-sm rounded-sm bg-orange-600 hover:bg-orange-800 text-white",
        previousLabel: "Previous",
        breakLinkClassName: "join-item rounded-sm btn btn-sm btn-disabled disabled:bg-orange-300 disabled:text-white",
        nextLabel: "Next",
        breakLabel: "...",
        pageCount,
        marginPagesDisplayed: 0,
        pageRangeDisplayed: 4,
        onPageChange: handlePageClick,
        activeClassName: "active",
        renderOnZeroPageCount: 0
      }
    ),
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
