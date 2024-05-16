import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import HeadNavigation from "../Admin/Component/HeadNavigation";
import NoImage from "../../../../public/image/no-image.jpg";
import {
  BiSolidCog,
  BiSolidExtension,
  BiSolidFileFind,
  BiSolidTrash,
  BiSolidUserBadge,
  BiSortDown,
  BiSortUp,
} from "react-icons/bi";
import Modal from "../Admin/Component/Modal";
import { toast } from "react-toastify";
import Paginate from "@/Components/Paginate";
import _ from "lodash";
import ReactPaginate from "react-paginate";

function IndexEmploye(props) {
  const [sortOrder, setSortOrder] = useState(false);
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(props.employe.data);
  const { delete: destroy, get } = useForm({
    id: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const employeesPerPage = 10;

  const handleDelete = (id) => {
    setModal(true);
    const employeData = props.employe.data.find((emp) => emp.id === id);
    setDataModal(employeData);
    // setDataModal(id);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const closeModal = () => {
    setModal(!modal);
  };

  // Filter employees based on search query
  const filteredEmployees = props.employe.data.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current employees to display
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
          theme: "colored",
        });

        setTimeout(() => {
          get(route("employes.index"), {
            replace: true, // Replace the current page
            preserveScroll: true, // Preserve the current scroll position
          });
        }, 2000);
      },
    });
    setModal(!modal);
  };

  const sortSearchResults = () => {
    const sortedResults = [...searchResults];
    sortOrder
      ? sortedResults.sort((a, b) => a.name.localeCompare(b.name))
      : sortedResults.sort((a, b) => b.name.localeCompare(a.name));

    setSearchResults(sortedResults);
  };

  useEffect(() => {
    sortSearchResults();
  }, [sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(!sortOrder);
  };

  // const toggleSortOrder = () => {
  //   setSortOrder(!sortOrder);
  //   const sortedByNikAsc = [...searchResults].sort((a, b) => a.nik - b.nik);
  //   const sortedByNikDesc = [...searchResults].sort((a, b) => b.nik - a.nik);
  //   setSearchResults(sortOrder ? sortedByNikAsc : sortedByNikDesc);
  // };

  // Sort by NIK in descending order

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

  return (
    <AdminLayout overflow={modal ? "overflow-hidden" : "overflow-auto"}>
      <Head title="Employe - Home" />
      <HeadNavigation title={"Employe - Home"} />
      <div className="flex flex-col sm:flex-row justify-end gap-2 my-4 items-start sm:items-center">
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
              {props.auth.user.role_id == 2 && (
                <th className="border-x-[1px] border-orange-300">Aksi</th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((emplo, index) => (
                <tr key={index} className="border-[1px] border-orange-300 ">
                  <td className="border-[1px] border-orange-300">
                    {emplo.img ? (
                      <img src={`/storage/images/${emplo.img}`} width={100} />
                    ) : (
                      <img src={NoImage} width={100} />
                    )}
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
                  {props.auth.user.role_id == 2 && (
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
