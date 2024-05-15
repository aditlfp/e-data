import AdminLayout from "@/Layouts/AdminLayout";
import React, { useEffect, useState } from "react";
import HeadNavigation from "../Admin/Component/HeadNavigation";
import { Head, router, useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

function CreateEmploye(props) {
  const [jenisBpjs, setJenisBpjs] = useState({
    jkk: false,
    jkm: false,
    jht: false,
    jp: false,
    jkp: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    // For arrays, we need to handle the change manually
    setData((data) => ({
      ...data,
      jenis_bpjs: checked
        ? [...data.jenis_bpjs, name]
        : data.jenis_bpjs.filter((item) => item !== name),
    }));
  };

  const { data, setData, post, get, processing, errors, reset } = useForm({
    user_id: "",
    name: "",
    ttl: "",
    nik: "",
    no_kk: "",
    no_ktp: "",
    client_id: "",
    img: null,
    img_ktp_dpn: "",
    jenis_bpjs: [],
    no_bpjs_kesehatan: "",
    file_bpjs_kesehatan: "",
    no_bpjs_ketenaga: "",
    file_bpjs_ketenaga: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    post(route("employes.store"), {
      data,
      onSuccess: () => {
        reset(
          "user_id",
          "client_id",
          "file_bpjs_kesehatan",
          "img",
          "img_ktp_dpn",
          "jenis_bpjs",
          "name",
          "nik",
          "no_bpjs_kesehatan",
          "no_bpjs_ketenaga",
          "no_kk",
          "no_ktp",
          "ttl"
        ),
          toast.success("Berhasil Menambahkan Data !", {
            theme: "colored",
          });
      },
    });
  };
  const cancel = (e) => {
    e.preventDefault();
    window.location.href = route("employes.index");
  };
  return (
    <AdminLayout>
      <Head title="Employe - Create" />
      <HeadNavigation title={"Employe - Create"} />
      <div>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="gap-4 mt-10 flex flex-col sm:grid sm:grid-flow-cols sm:grid-cols-4  "
        >
          <div className="form-control">
            <span className="label-text required">Masukkan Nama : </span>
            <input
              list="users"
              id="browser"
              name="name"
              value={data.name}
              required
              onChange={(e) => setData("name", e.target.value)}
              placeholder="Nama"
              className="input input-sm rounded-sm input-bordered"
            />

            <datalist id="users" className="dark:text-white">
              {props.users?.map((user, key) => {
                return <option value={user.nama_lengkap} key={key} id={key} />;
              })}
            </datalist>

            {errors.name && <span className="text-red-500">{errors.name}</span>}
          </div>

          <div className="form-control">
            <span className="label-text">Tempat Tanggal Lahir : </span>
            <input
              name="ttl"
              value={data.ttl}
              onChange={(e) => setData("ttl", e.target.value)}
              placeholder="Tempat Tanggal Lahir"
              className="input input-sm rounded-sm input-bordered"
            />
            {errors.ttl && <span className="text-red-500">{errors.ttl}</span>}
          </div>

          <div className="form-control">
            <span className="label-text">Masukkan NIK : </span>
            <input
              name="nik"
              value={data.nik}
              onChange={(e) => setData("nik", e.target.value)}
              placeholder="NIK"
              className="input input-sm rounded-sm input-bordered"
            />
            {errors.nik && <span className="text-red-500">{errors.nik}</span>}
          </div>

          <div className="form-control">
            <span className="label-text required">Masukkan No KK : </span>
            <input
              name="no_kk"
              value={data.no_kk}
              required
              onChange={(e) => setData("no_kk", e.target.value)}
              placeholder="Nomor KK"
              className="input input-sm rounded-sm input-bordered"
            />
            {errors.no_kk && (
              <span className="text-red-500">{errors.no_kk}</span>
            )}
          </div>

          <div className="flex flex-col">
            <div className="form-control">
              <span className="label-text required">Masukkan No KTP : </span>

              <input
                name="no_ktp"
                value={data.no_ktp}
                required
                onChange={(e) => setData("no_ktp", e.target.value)}
                placeholder="Nomor KTP"
                className="input input-sm rounded-sm input-bordered"
              />
              {errors.no_ktp && (
                <span className="text-red-500">{errors.no_ktp}</span>
              )}
            </div>
            <div className="flex flex-col">
              {data.img_ktp_dpn && (
                <div className="mt-2">
                  <label
                    htmlFor="img_ktp_dpn"
                    className="flex justify-center items-center rounded-sm "
                  >
                    <img
                      src={URL.createObjectURL(data.img_ktp_dpn)}
                      alt="Image Preview"
                      style={{ maxWidth: "245px" }}
                      width={150}
                      className="rounded-sm drop-shadow-md"
                    />
                  </label>
                </div>
              )}
              <div className="form-control mt-2">
                <span className="label-text">Foto KTP (Depan) : </span>

                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,*"
                  name="img_ktp_dpn"
                  onChange={(e) => setData("img_ktp_dpn", e.target.files[0])}
                  className="file-input file-input-sm rounded-sm file-input-bordered"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="form-control">
              <span className="label-text required">Pilih Mitra : </span>
              <select
                defaultValue={0}
                required
                onChange={(e) => setData("client_id", e.target.value)}
                className="select select-bordered select-sm text-sm rounded-sm"
              >
                <option value={0} disabled>
                  Pilih Mitra
                </option>
                {props?.clients?.map((client, index) => (
                  <option key={index} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              {errors.client_id && (
                <span className="text-red-500">{errors.client_id}</span>
              )}
            </div>
            <div className="form-control mt-2">
              {data.img && (
                <div className="mt-2">
                  <label
                    htmlFor="img"
                    className="flex justify-center items-center rounded-sm "
                  >
                    <img
                      src={URL.createObjectURL(data.img)}
                      alt="Image Preview"
                      style={{ maxWidth: "245px" }}
                      width={150}
                      className="rounded-sm drop-shadow-md"
                    />
                  </label>
                </div>
              )}
              <span className="label-text">Foto Profile : </span>
              <input
                type="file"
                name="img"
                accept=".png,.jpg,.jpeg,*"
                onChange={(e) => setData("img", e.target.files[0])}
                className="file-input file-input-sm rounded-sm file-input-bordered"
              />
              {errors.img && <span className="text-red-500">{errors.img}</span>}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <div className="form-control">
              <span className="label-text">No BPJS Kesehatan : </span>

              <input
                type="text"
                name="no_bpjs_kesehatan"
                value={data.no_bpjs_kesehatan}
                onChange={(e) => setData("no_bpjs_kesehatan", e.target.value)}
                placeholder="Nomor BPJS Kesehatan"
                className="input input-sm rounded-sm input-bordered"
              />
              {errors.no_bpjs_kesehatan && (
                <span className="text-red-500">{errors.no_bpjs_kesehatan}</span>
              )}
            </div>
            <div className="form-control mt-2">
              <span className="label-text">File BPJS Kesehatan : </span>

              <input
                type="file"
                name="file_bpjs_kesehatan"
                accept=".pdf,*"
                onChange={(e) =>
                  setData("file_bpjs_kesehatan", e.target.files[0])
                }
                className="file-input file-input-sm rounded-sm file-input-bordered"
              />
              {errors.file_bpjs_kesehatan && (
                <span className="text-red-500">
                  {errors.file_bpjs_kesehatan}
                </span>
              )}
            </div>
          </div>

          {/* BPJS */}
          <div className="flex flex-col gap-y-2">
            <div className="form-control">
              <span className="label-text">No BPJS Ketenaga Kerjaan : </span>

              <input
                type="text"
                name="no_bpjs_ketenaga"
                value={data.no_bpjs_ketenaga}
                onChange={(e) => setData("no_bpjs_ketenaga", e.target.value)}
                placeholder="Nomor BPJS Ketenaga Kerjaan"
                className="input input-sm rounded-sm input-bordered"
              />
            </div>
            <span className="label-text">Jenis BPJS : </span>
            <div className="grid grid-flow-col grid-cols-1">
              <div className=" bg-white rounded-sm outline-2 outline-lime-100">
                <label className="label cursor-pointer">
                  <span className="label-text">JKK</span>
                  <input
                    name="jkk"
                    chacked={jenisBpjs.jkk}
                    onChange={handleCheckboxChange}
                    type="checkbox"
                    className="checkbox checkbox-sm rounded-sm"
                  />
                </label>

                <label className="label cursor-pointer">
                  <span className="label-text mx-1">JKM</span>
                  <input
                    type="checkbox"
                    name="jkm"
                    chacked={jenisBpjs.jkm}
                    onChange={handleCheckboxChange}
                    className="checkbox checkbox-sm rounded-sm"
                  />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text mx-1">JHT</span>
                  <input
                    type="checkbox"
                    name="jht"
                    chacked={jenisBpjs.jht}
                    onChange={handleCheckboxChange}
                    className="checkbox checkbox-sm rounded-sm"
                  />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text mx-1">JP</span>
                  <input
                    type="checkbox"
                    name="jp"
                    chacked={jenisBpjs.jp}
                    onChange={handleCheckboxChange}
                    className="checkbox checkbox-sm rounded-sm"
                  />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text mx-1">JKP</span>
                  <input
                    type="checkbox"
                    name="jkp"
                    chacked={jenisBpjs.jkp}
                    onChange={handleCheckboxChange}
                    className="checkbox checkbox-sm rounded-sm"
                  />
                </label>
              </div>
            </div>
            <div className="form-control">
              <span className="label-text">File BPJS Ketenaga Kerjaan : </span>

              <input
                type="file"
                name="file_bpjs_ketenaga"
                accept=".pdf,*"
                onChange={(e) =>
                  setData("file_bpjs_ketenaga", e.target.files[0])
                }
                className="file-input file-input-sm rounded-sm file-input-bordered"
              />
            </div>
          </div>
          {/* BPJS */}

          <div className="flex gap-2 w-full my-10 sm:my-0">
            <button
              type="submit"
              disabled={processing}
              className="btn btn-sm w-1/2 rounded-sm bg-orange-400 hover:bg-orange-600 hover:text-white transition-all ease-in-out duration-150"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={(e) => cancel(e)}
              className="btn btn-sm w-1/2 rounded-sm bg-red-400 hover:bg-red-600 hover:text-white transition-all ease-in-out duration-150"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default CreateEmploye;
