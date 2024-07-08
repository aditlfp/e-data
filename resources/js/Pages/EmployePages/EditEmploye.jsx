import AdminLayout from "@/Layouts/AdminLayout";
import React, { useEffect, useState } from "react";
import HeadNavigation from "../Admin/Component/HeadNavigation";
import { Head, router, useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

function EditEmploye(props) {
  const [jenisBpjs, setJenisBpjs] = useState({
    jkk: false,
    jkm: false,
    jht: false,
    jp: false,
    jkp: false,
  });

 
  const { data, setData, put, processing, errors } = useForm({
    user_id: props.employe.user_id,
    name: props.employe.name,
    ttl: props.employe.ttl,
    no_kk: props.no_kk,
    no_ktp: props.no_ktp,
    client_id: props.employe.client_id,
    jenis_bpjs: props.employe.jenis_bpjs,
    no_bpjs_kesehatan: props.employe.no_bpjs_kesehatan,
    no_bpjs_ketenaga: props.employe.no_bpjs_ketenaga,
    img: "",
    img_ktp_dpn: "",
    file_bpjs_kesehatan: "",
    file_bpjs_ketenaga: "",
    oldimage: props.employe.img ? props.employe.img : "",
    oldktp: props.employe.img_ktp_dpn ? props.employe.img_ktp_dpn : "",
    oldFileBpjs: props.employe.file_bpjs_kesehatan
      ? props.employe.file_bpjs_kesehatan
      : "",
    oldKetenaga: props.employe.file_bpjs_ketenaga
      ? props.employe.file_bpjs_ketenaga
      : "",
  });

   const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      jenis_bpjs: Array.isArray(prevData.jenis_bpjs)
        ? (checked
          ? [...prevData.jenis_bpjs, name]
          : prevData.jenis_bpjs.filter((item) => item !== name))
        : [], // Fallback to empty array if not iterable
    }));
  };

  const updatedJenisBpjs = Object.keys(jenisBpjs).reduce((acc, key) => {
    acc[key] = data.jenis_bpjs?.includes(key);
    return acc;
  }, {});

  const [newImg, setNewImg] = useState(null);
  const [newKtp, setNewKtp] = useState(null);
  const [newBpjs, setNewBpjs] = useState(null);
  const [newKetenaga, setNewKetenaga] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    router.post(route("employes.update", props.employe.id), {
      _method: "PATCH",
      user_id: data.user_id,
      name: data.name,
      ttl: data.ttl,
      no_kk: data.no_kk,
      no_ktp: data.no_ktp,
      client_id: data.client_id,
      jenis_bpjs: data.jenis_bpjs,
      no_bpjs_kesehatan: data.no_bpjs_kesehatan,
      no_bpjs_ketenaga: data.no_bpjs_ketenaga,
      img: newImg,
      img_ktp_dpn: newKtp,
      file_bpjs_kesehatan: newBpjs,
      file_bpjs_ketenaga: newKetenaga,
      oldimage: data.oldimage,
      oldktp: data.oldktp,
      oldFileBpjs: data.oldFileBpjs,
      oldKetenaga: data.oldKetenaga,
    }, {
      onSuccess: () => {
        toast.success("Berhasil Mengupdate Data !", {
          theme: "colored",
        });
        window.location.href = route('employes.index')
      }
        
    });
  };

  const cancel = (e) => {
    e.preventDefault();
    window.location.href = route("employes.index");
  };
  return (
    <AdminLayout>
      <Head title="Employe - Update" />
      <HeadNavigation title={"Employe - Update"} />
      <div>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="gap-4 mt-10 flex flex-col sm:grid sm:grid-flow-cols sm:grid-cols-4"
        >
          <div className="form-control">
            <span className="label-text">Masukkan Nama : </span>
            <input
              name="name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              placeholder="Nama"
              className="input input-sm rounded-sm input-bordered"
            />
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
            <span className="label-text">Masukkan No KK : </span>
            <input
              name="no_kk"
              value={data.no_kk}
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
              <span className="label-text">Masukkan No KTP : </span>

              <input
                name="no_ktp"
                value={data.no_ktp}
                onChange={(e) => setData("no_ktp", e.target.value)}
                placeholder="Nomor KTP"
                className="input input-sm rounded-sm input-bordered"
              />
              {errors.no_ktp && (
                <span className="text-red-500">{errors.no_ktp}</span>
              )}
            </div>
            <div className="flex flex-col">
              <div className="mt-2">
                <label
                  htmlFor="img_ktp_dpn"
                  className="flex justify-center items-center rounded-sm "
                >
                  {props.employe.img_ktp_dpn ? (
                    <img
                      src={`${props.ziggy.url}/storage/images/${props.employe.img_ktp_dpn}`}
                      alt="Image Preview"
                      style={{ maxWidth: "245px" }}
                      width={150}
                      className="rounded-sm drop-shadow-md"
                    />
                  ) : (
                    newKtp && (
                      <img
                        src={URL.createObjectURL(newKtp)}
                        alt="Image Preview"
                        style={{ maxWidth: "245px" }}
                        className="rounded-sm drop-shadow-md"
                      />
                    )
                  )}
                </label>
              </div>
              <div className="form-control mt-2">
                <span className="label-text">Foto KTP (Depan) : </span>

                <input
                  type="file"
                  name="img_ktp_dpn"
                  onChange={(e) => {
                    setNewKtp(e.target.files[0]);
                  }}
                  className="file-input file-input-sm rounded-sm file-input-bordered"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="form-control">
              <span className="label-text">Pilih Mitra* : </span>
              <select
                defaultValue={data.client_id}
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
              <div className="mt-2">
                <label
                  htmlFor="img"
                  className="flex justify-center items-center rounded-sm "
                >
                  {props.employe.img ? (
                    <img
                      src={`${props.ziggy.url}/storage/images/${props.employe.img}`}
                      alt="Image Preview"
                      style={{ maxWidth: "245px" }}
                      width={150}
                      className="rounded-sm drop-shadow-md"
                    />
                  ) : (
                    newImg && (
                      <img
                        src={URL.createObjectURL(newImg)}
                        alt="Image Preview"
                        style={{ maxWidth: "245px" }}
                        width={150}
                        className="rounded-sm drop-shadow-md"
                      />
                    )
                  )}
                </label>
              </div>
              <span className="label-text">Foto : </span>
              <input
                type="file"
                name="img"
                onChange={(e) => {
                  setNewImg(e.target.files[0]);
                }}
                className="file-input file-input-sm rounded-sm file-input-bordered"
              />
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
                accept=".pdf"
                name="file_bpjs_kesehatan"
                onChange={(e) => {
                  setNewBpjs(e.target.files[0]);
                }}
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
                    defaultChecked={updatedJenisBpjs.jkk}
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
                    defaultChecked={updatedJenisBpjs.jkm}
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
                    defaultChecked={updatedJenisBpjs.jht}
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
                    defaultChecked={updatedJenisBpjs.jp}
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
                    defaultChecked={updatedJenisBpjs.jkp}
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
                onChange={(e) => {
                  setNewKetenaga(e.target.files[0]);
                }}
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

export default EditEmploye;
