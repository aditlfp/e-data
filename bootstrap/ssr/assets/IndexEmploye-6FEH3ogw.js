import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-BBNDZYJL.js";
import { useForm, Head } from "@inertiajs/react";
import { lazy, useState, useMemo, useCallback, useEffect, Suspense } from "react";
import HeadNavigation from "./HeadNavigation-C5ShT8hy.js";
import { BiSolidDownload, BiSortUp, BiSortDown, BiSolidCog, BiSolidTrash, BiSolidFileFind, BiSolidExtension } from "react-icons/bi/index.esm.js";
import Modal from "./Modal-DmMYx0rx.js";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import debounce from "lodash/debounce.js";
import "./Sidebar-CW9JvTre.js";
import "framer-motion";
const NoImageComponent = lazy(() => import("./NoImageComponent-Dusf2B3Q.js"));
function IndexEmploye({ employe, clients, auth }) {
  const [sortOrder, setSortOrder] = useState(false);
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSelect, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const employeesPerPage = 10;
  const {
    data,
    setData,
    delete: destroy,
    get
  } = useForm({
    id: "",
    name: ""
  });
  const handleDelete = (id) => {
    setModal(true);
    const employeData = employe.data.find((emp) => emp.id === id);
    setDataModal(employeData);
  };
  const closeModal = () => {
    setModal(!modal);
  };
  const combinedFilteredEmployees = useMemo(() => {
    return employe.data.filter((employee) => {
      const matchesSearchQuery = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || employee.no_ktp.includes(searchQuery);
      const matchesFilterSelect = filterSelect.toLowerCase() === "all" || employee.client.name.toLowerCase().includes(filterSelect.toLowerCase());
      return matchesSearchQuery && matchesFilterSelect;
    });
  }, [searchQuery, filterSelect, employe.data]);
  const currentEmployees = useMemo(() => {
    const offset = currentPage * employeesPerPage;
    return combinedFilteredEmployees.slice(offset, offset + employeesPerPage);
  }, [combinedFilteredEmployees, currentPage, employeesPerPage]);
  const handleDownload = () => {
    get(route("download.employe", data));
  };
  const pageCount = useMemo(() => {
    return Math.ceil(combinedFilteredEmployees.length / employeesPerPage);
  }, [combinedFilteredEmployees.length, employeesPerPage]);
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
            preserveScroll: true
          });
        }, 2e3);
      }
    });
    setModal(!modal);
  };
  const sortSearchResults = useCallback(() => {
    const sortedResults = [...combinedFilteredEmployees];
    sortOrder ? sortedResults.sort((a, b) => a.name.localeCompare(b.name)) : sortedResults.sort((a, b) => b.name.localeCompare(a.name));
    return sortedResults;
  }, [combinedFilteredEmployees, sortOrder]);
  useEffect(() => {
    sortSearchResults();
  }, [sortOrder, sortSearchResults]);
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
  const debouncedSearch = useMemo(() => debounce(setSearchQuery, 300), []);
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);
  const checkImageExists = async (img) => {
    try {
      const response = await fetch(`/storage/images/${img}`);
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  const EmployeeImage = ({ img }) => {
    const [imgSrc, setImgSrc] = useState(null);
    useEffect(() => {
      const verifyImage = async () => {
        if (img) {
          const exists = await checkImageExists(img);
          setImgSrc(exists ? `/storage/images/${img}` : null);
        }
      };
      verifyImage();
    }, [img]);
    return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }), children: imgSrc ? /* @__PURE__ */ jsx("img", { src: imgSrc, width: 100, loading: "lazy" }) : /* @__PURE__ */ jsx(NoImageComponent, { width: 100, loading: "lazy" }) });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { overflow: modal ? "overflow-hidden" : "overflow-auto", children: [
    /* @__PURE__ */ jsx(Head, { title: "Employe - Home" }),
    /* @__PURE__ */ jsx(HeadNavigation, { title: "Employe - Home" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-end gap-2 my-4 items-start sm:items-center", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
        "select",
        {
          defaultValue: 0,
          required: true,
          onChange: (e) => {
            setFilter(e.target.value);
            setData("name", e.target.value);
          },
          className: "select w-32 select-bordered select-sm text-sm rounded-sm",
          children: [
            /* @__PURE__ */ jsx("option", { value: 0, disabled: true, children: "Filter Mitra" }),
            /* @__PURE__ */ jsx("option", { value: "All", children: "Semua" }),
            clients == null ? void 0 : clients.map((client, index) => /* @__PURE__ */ jsx("option", { value: client.name, children: client.name }, index))
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: handleDownload,
          className: "btn btn-sm rounded-sm bg-green-600 text-green-900 hover:bg-green-500 hover:text-green-800",
          children: /* @__PURE__ */ jsx(BiSolidDownload, { className: "text-xl" })
        }
      ) }),
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
        /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "No" }),
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
        (auth == null ? void 0 : auth.user.role_id) == 2 && /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Aksi" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: currentEmployees.length > 0 ? currentEmployees == null ? void 0 : currentEmployees.map((emplo, index) => /* @__PURE__ */ jsxs("tr", { className: "border-[1px] border-orange-300 ", children: [
        /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: index + 1 }),
        /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: /* @__PURE__ */ jsx(EmployeeImage, { img: emplo.img }) }),
        /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: emplo.name }),
        /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: emplo.ttl }),
        /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: emplo.no_kk }),
        /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: emplo.no_ktp }),
        /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: emplo.client.name }),
        (auth == null ? void 0 : auth.user.role_id) == 2 && /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-x-1 items-center", children: [
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
