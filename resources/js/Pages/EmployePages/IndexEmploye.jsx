import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import HeadNavigation from "../Admin/Component/HeadNavigation";
import {
  BiSolidCog,
  BiSolidExtension,
  BiSolidFileFind,
  BiSolidTrash,
} from "react-icons/bi";
import Modal from "../Admin/Component/Modal";
import { toast } from "react-toastify";
import Paginate from "@/Components/Paginate";
import _ from "lodash";

function IndexEmploye(props) {
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(props.employe.data);
  const { delete: destroy, get } = useForm({
    id: "",
  });

  const handleDelete = (id) => {
    setModal(true);
    const employeData = props.employe.data.find((emp) => emp.id === id);
    setDataModal(employeData);
    // setDataModal(id);
  };

  const debouncedSearch = _.debounce((term) => {
    const results = props.employe.data.filter((emplo) => {
      return (
        emplo.nik.includes(term) ||
        emplo.name.toLowerCase().includes(term.toLowerCase())
      );
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
      onSuccess: () =>
        toast.warning("Berhasil Menghapus Data Karyawan!", {
          theme: "colored",
        }),
    });
    setModal(!modal);
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

  return (
    <AdminLayout overflow={modal ? "overflow-hidden" : "overflow-auto"}>
      <Head title="Employe - Home" />
      <HeadNavigation title={"Employe - Home"} />
      <div className="flex justify-end gap-x-2 items-center">
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Cari berdasarkan NIK atau Nama"
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

      <table className="table table-zebra table-xs my-5">
        <thead>
          <tr className="bg-orange-600 text-white capitalize">
            <th className="border-x-[1px] border-orange-300">NIK</th>
            <th className="border-x-[1px] border-orange-300">Foto Profile</th>
            <th className="border-x-[1px] border-orange-300">Nama</th>
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
          {searchResults.length > 0 ? (
            searchResults.map((emplo, index) => (
              <tr key={index} className="border-[1px] border-orange-300 ">
                <td className="border-[1px] border-orange-300">{emplo.nik}</td>
                <td className="border-[1px] border-orange-300">
                  <img src={`/storage/images/${emplo.img}`} width={100} />
                </td>
                <td className="border-[1px] border-orange-300">{emplo.name}</td>
                <td className="border-[1px] border-orange-300">{emplo.ttl}</td>
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
                          className="hover:tooltip hover:tooltip-open hover:tooltip-left transition-all ease-in-out duration-150"
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
                          className="hover:tooltip hover:tooltip-open hover:tooltip-left transition-all ease-in-out duration-150"
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
                          className="hover:tooltip hover:tooltip-open hover:tooltip-right transition-all ease-in-out duration-150"
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
                          className="hover:tooltip hover:tooltip-open hover:tooltip-right transition-all ease-in-out duration-150"
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

      <Paginate meta={props.employe.meta}></Paginate>
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
