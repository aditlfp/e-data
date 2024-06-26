import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState, useMemo, useCallback, lazy, Suspense } from "react";
import HeadNavigation from "../Admin/Component/HeadNavigation";
const NoImageComponent  = lazy(() => import("../../Components/NoImageComponent"))
import {
  BiSolidCog,
  BiSolidExtension,
  BiSolidFileFind,
  BiSolidTrash,
  BiSolidUserBadge,
  BiSortDown,
  BiSortUp,
  BiSolidDownload,
} from "react-icons/bi";
import Modal from "../Admin/Component/Modal";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import debounce from "lodash/debounce";

function IndexEmploye({ employe, clients, auth }) {
  const [sortOrder, setSortOrder] = useState(false);
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSelect, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const employeesPerPage = 10;

  // Initialize useForm from Inertia.js
  const {
    data,
    setData,
    delete: destroy,
    get,
  } = useForm({
    id: "",
    name: "",
  });

  // Handle delete modal visibility and setting data
  const handleDelete = (id) => {
    setModal(true);
    const employeData = employe.data.find((emp) => emp.id === id);
    setDataModal(employeData);
  };

  // Toggle modal visibility
  const closeModal = () => {
    setModal(!modal);
  };

  // Filter employees based on search query and filter selection
  const combinedFilteredEmployees = useMemo(() => {
    return employe.data.filter((employee) => {
      const matchesSearchQuery =
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.no_ktp.includes(searchQuery);

      const matchesFilterSelect =
        filterSelect.toLowerCase() === "all" ||
        employee.client.name.toLowerCase().includes(filterSelect.toLowerCase());

      return matchesSearchQuery && matchesFilterSelect;
    });
  }, [searchQuery, filterSelect, employe.data]);

  // Paginate filtered employees
  const currentEmployees = useMemo(() => {
    const offset = currentPage * employeesPerPage;
    return combinedFilteredEmployees.slice(offset, offset + employeesPerPage);
  }, [combinedFilteredEmployees, currentPage, employeesPerPage]);

  // Handle file download
  const handleDownload = () => {
    get(route("download.employe", data));
  };

  // Calculate total pages for pagination
  const pageCount = useMemo(() => {
    return Math.ceil(combinedFilteredEmployees.length / employeesPerPage);
  }, [combinedFilteredEmployees.length, employeesPerPage]);

  // Handle page click for pagination
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Confirm delete and show a toast notification on success
  const confirmDelete = (id) => {
    destroy(route(`employes.destroy`, id), {
      onSuccess: () => {
        toast.warning("Berhasil Menghapus Data Karyawan!", {
          theme: "colored",
        });

        setTimeout(() => {
          get(route("employes.index"), {
            replace: true,
            preserveScroll: true,
          });
        }, 2000);
      },
    });
    setModal(!modal);
  };

  // Sort search results based on sortOrder
  const sortSearchResults = useCallback(() => {
    const sortedResults = [...combinedFilteredEmployees];
    sortOrder
      ? sortedResults.sort((a, b) => a.name.localeCompare(b.name))
      : sortedResults.sort((a, b) => b.name.localeCompare(a.name));

    return sortedResults;
  }, [combinedFilteredEmployees, sortOrder]);

  useEffect(() => {
    sortSearchResults();
  }, [sortOrder, sortSearchResults]);

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(!sortOrder);
  };

  // Redirect to create employee page
  const createEmploye = () => {
    get(route("employes.create"));
  };

  // Redirect to show employee page
  const showEmploye = (id) => {
    get(route("employes.show", id));
  };

  // Redirect to edit employee page
  const editEmploye = (id) => {
    get(route("employes.edit", id));
  };

  // Redirect to create career page
  const createCareer = (id) => {
    get(route("careers.show", id));
  };

  // Debounce search input to improve performance
  const debouncedSearch = useMemo(() => debounce(setSearchQuery, 300), []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

    // Check if image exists
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
  
      return (
        <Suspense fallback={<div>Loading...</div>}>
          {imgSrc ? (
            <img src={imgSrc} width={100} loading="lazy" />
          ) : (
            <NoImageComponent width={100} loading="lazy" />
          )}
        </Suspense>
      );
    };

  return (
    <AdminLayout overflow={modal ? "overflow-hidden" : "overflow-auto"}>
      <Head title="Employe - Home" />
      <HeadNavigation title={"Employe - Home"} />
      <div className="flex flex-col sm:flex-row justify-end gap-2 my-4 items-start sm:items-center">
        {/* emplo.client.name */}
        <div>
          <select
            defaultValue={0}
            required
            onChange={(e) => {
              setFilter(e.target.value);
              setData("name", e.target.value);
            }}
            className="select w-32 select-bordered select-sm text-sm rounded-sm"
          >
            <option value={0} disabled>
              Filter Mitra
            </option>
            <option value="All">Semua</option>
            {clients?.map((client, index) => (
              <option key={index} value={client.name}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            type="button"
            onClick={handleDownload}
            className="btn btn-sm rounded-sm bg-green-600 text-green-900 hover:bg-green-500 hover:text-green-800"
          >
            <BiSolidDownload className="text-xl" />
          </button>
        </div>
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan KTP atau Nama"
            className="input input-sm rounded-sm input-bordered"
          />
        </div>
        <button
          onClick={() => createEmploye()}
          className="btn bg-orange-600 btn-sm text-white hover:text-orange-600 rounded-sm"
        >
          + New Employe
        </button>
      </div>

      <div className="overflow-hidden">
        <table className="table table-zebra  table-xs my-5">
          <thead>
            <tr className="bg-orange-600 text-white capitalize">
              <th className="border-x-[1px] border-orange-300">No</th>
              <th className="border-x-[1px] border-orange-300">Foto Profile</th>
              <th className="border-x-[1px] border-orange-300 flex">
                {sortOrder == false ? (
                  <BiSortUp
                    className="text-lg hover:cursor-pointer"
                    onClick={toggleSortOrder}
                  />
                ) : (
                  <BiSortDown
                    className="text-lg hover:cursor-pointer"
                    onClick={toggleSortOrder}
                  />
                )}
                Nama
              </th>
              <th className="border-x-[1px] border-orange-300">TTL</th>
              <th className="border-x-[1px] border-orange-300">No. KK</th>
              <th className="border-x-[1px] border-orange-300">No. KTP</th>
              <th className="border-x-[1px] border-orange-300">Mitra</th>
              {auth?.user.role_id == 2 && (
                <th className="border-x-[1px] border-orange-300">Aksi</th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees?.map((emplo, index) => (
                <tr key={index} className="border-[1px] border-orange-300 ">
                  <td className="border-[1px] border-orange-300">
                    {index + 1}
                  </td>
                  <td className="border-[1px] border-orange-300">
                    <EmployeeImage img={emplo.img} />
                  </td>
                  <td className="border-[1px] border-orange-300">
                    {emplo.name}
                  </td>
                  <td className="border-[1px] border-orange-300">
                    {emplo.ttl}
                  </td>
                  <td className="border-[1px] border-orange-300">
                    {emplo.no_kk}
                  </td>
                  <td className="border-[1px] border-orange-300">
                    {emplo.no_ktp}
                  </td>
                  <td className="border-[1px] border-orange-300">
                    {emplo.client.name}
                  </td>
                  {auth?.user.role_id == 2 && (
                    <td className="border-[1px] border-orange-300">
                      <div className="flex justify-center gap-x-1 items-center">
                        <div className="flex flex-col gap-y-1">
                          {/* Edit */}
                          <div
                            className="hover:tooltip hover:tooltip-open hover:tooltip-top transition-all ease-in-out duration-150"
                            data-tip="Edit"
                          >
                            <button
                              onClick={() => editEmploye(emplo.id)}
                              className="btn btn-xs rounded-sm hover:text-yellow-500 border-0 text-white bg-yellow-500"
                            >
                              <BiSolidCog />
                            </button>
                          </div>
                          {/* End Edit */}
                          {/* delete */}
                          <div
                            className="hover:tooltip hover:tooltip-open hover:tooltip-top transition-all ease-in-out duration-150"
                            data-tip="Delete"
                          >
                            <button
                              onClick={() => handleDelete(emplo.id)}
                              className="btn btn-xs rounded-sm hover:text-red-500 border-0 text-white bg-red-500"
                            >
                              <BiSolidTrash />
                            </button>
                          </div>
                          {/* End Delete */}
                        </div>

                        <div className="flex flex-col gap-y-1">
                          <div
                            className="hover:tooltip hover:tooltip-open hover:tooltip-top transition-all ease-in-out duration-150"
                            data-tip="Details"
                          >
                            <button
                              onClick={() => showEmploye(emplo.id)}
                              className="btn btn-xs rounded-sm hover:text-blue-500 border-0 text-white bg-blue-500"
                            >
                              <BiSolidFileFind />
                            </button>
                          </div>
                          <div
                            className="hover:tooltip hover:tooltip-open hover:tooltip-top transition-all ease-in-out duration-150"
                            data-tip="Career"
                          >
                            <button
                              onClick={() => createCareer(emplo.id)}
                              className="btn btn-xs rounded-sm hover:text-green-500 border-0 text-white bg-green-500"
                            >
                              <BiSolidExtension />
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <>
                <tr className="border-[1px] text-center border-orange-300">
                  <td colSpan={8}>Data Belum Tersedia</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* <Paginate meta={props.employe.meta}></Paginate> */}
      <ReactPaginate
        containerClassName="join shadow-md mb-10"
        previousLinkClassName="join-item btn btn-sm rounded-sm bg-orange-600 hover:bg-orange-800 text-white"
        pageLinkClassName="join-item btn btn-sm disabled:bg-orange-300 disabled:text-white rounded-sm bg-orange-600 hover:bg-orange-800 text-white"
        nextLinkClassName="join-item btn btn-sm rounded-sm bg-orange-600 hover:bg-orange-800 text-white"
        previousLabel={"Previous"}
        breakLinkClassName="join-item rounded-sm btn btn-sm btn-disabled disabled:bg-orange-300 disabled:text-white"
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={0}
        pageRangeDisplayed={4}
        onPageChange={handlePageClick}
        // containerClassName={"pagination"}
        activeClassName={"active"}
        renderOnZeroPageCount={0}
      />
      {modal && (
        <Modal>
          <div className="flex flex-col">
            <h2 className="text-lg font-medium text-gray-900">
              Apakah Anda Yakin Untuk Menghapus Karyawan{" "}
              {dataModal.user_id ? dataModal.user.nama_lengkap : dataModal.name}
              ?
            </h2>
            <div className="flex justify-end gap-x-1 mt-5  items-center">
              <button
                className="btn btn-error btn-sm rounded-sm"
                onClick={() => confirmDelete(dataModal.id)}
              >
                DELETE
              </button>
              <button
                onClick={() => closeModal()}
                className="btn uppercase btn-primary btn-sm rounded-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}

export default IndexEmploye;
