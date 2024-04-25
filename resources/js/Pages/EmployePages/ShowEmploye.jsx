import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import HeadNavigation from "../Admin/Component/HeadNavigation";

function ShowEmploye(props) {
  const url = new URL(window.location.href);

  if (url.href.includes("employes")) {
    url.searchParams.delete("id");
  }
  const newUrlEmploye = props.ziggy.location == url?.href ? url.href : "";

  return (
    <AdminLayout>
      <Head title="Employe - Details" />
      <HeadNavigation title={"Employe - Details"} />
      {/* SideBar Menu Employe-Careen */}
      <div className="bg-orange-100  flex gap-x-2 w-full h-full mt-5 rounded-sm">
        <div className="my-10 w-1/6 pr-10 border-r-2 border-orange-400/50">
          <button
            disabled={newUrlEmploye}
            className="bg-orange-300 ml-4 w-full btn btn-sm flex hover:text-gray-100 disabled:bg-orange-200 disabled:text-gray-100 disabled:cursor-not-allowed hover:bg-orange-400 transition-all items-center gap-x-4 font-bold ease-in-out duration-150 mb-2 py-2 px-3 rounded-sm justify-center text-sm cursor-pointer"
          >
            Profile
          </button>
          <button className="bg-orange-300 w-full ml-4 btn btn-sm flex hover:text-gray-100 hover:bg-orange-400 transition-all items-center gap-x-4 font-bold ease-in-out duration-150 mb-2 py-2 px-3 rounded-sm justify-center text-sm cursor-pointer">
            Karir
          </button>
        </div>
        <div className="w-5/6 mb-2 mt-10">
          <div className="my-3 flex justify-end mx-10">
            <Link
              href={route("employes.index")}
              className="btn btn-sm rounded-sm bg-orange-400 hover:bg-orange-500"
            >
              Kembali
            </Link>
          </div>
          <div className=" mx-10">
            <div className="grid grid-cols-2 gap-y-5 gap-x-2 items-center justify-center py-2 px-1 bg-orange-300/20 rounded-sm drop-shadow-md">
              <div className="relative flex justify-center items-center w-full">
                {props.employe.img && (
                  <>
                    <p className="capitalize text-center font-bold top-[-125px] inset-0 absolute z-50">
                      Profile{" "}
                      {props.employe.name ? props.employe.name : "kosong"}
                    </p>
                    <div className="absolute bg-orange-400/70 p-2 drop-shadow-md rounded-full w-48 h-48 flex items-center justify-center">
                      <img
                        src={
                          props.employe.img
                            ? `/storage/images/${props.employe.img}`
                            : "/image/no-image.jpg"
                        }
                        alt="Profile IMG"
                        width={150}
                        className="object-cover rounded-full w-full h-full"
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col w-full pr-10 bg-orange-400/10 p-2 rounded-sm">
                <table>
                  <thead>
                    <tr className="flex flex-col"></tr>
                  </thead>
                  <tbody className="capitalize">
                    <tr>
                      <td className="font-medium">Nama Lengkap</td>
                      <td>
                        :{" "}
                        {props.employe.user_id
                          ? props.employe.user.nama_lengkap
                          : props.employe.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium">TTL</td>
                      <td>
                        : {props.employe.ttl ? props.employe.ttl : "kosong"}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium">No. KK</td>
                      <td>
                        : {props.employe.no_kk ? props.employe.no_kk : "kosong"}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium">No. KTP</td>
                      <td>
                        :{" "}
                        {props.employe.no_ktp ? props.employe.no_ktp : "kosong"}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium">NIK</td>
                      <td>
                        : {props.employe.nik ? props.employe.nik : "kosong"}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium">Jenis BPJS</td>
                      <td className="uppercase">
                        {": "}
                        {props.employe.jenis_bpjs
                          ? props.employe.jenis_bpjs.map((jenis, i) => (
                              <React.Fragment key={i}>
                                {jenis}
                                {i !== props.employe.jenis_bpjs.length - 1 &&
                                  ", "}
                              </React.Fragment>
                            ))
                          : "kosong"}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium">No. BPJS Kesehatan</td>
                      <td>
                        :{" "}
                        {props.employe.no_bpjs_kesehatan
                          ? props.employe.no_bpjs_kesehatan
                          : "kosong"}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium">No. BPJS Ketenagakerjaan</td>
                      <td>
                        :{" "}
                        {props.employe.no_bpjs_ketenaga
                          ? props.employe.no_bpjs_ketenaga
                          : "kosong"}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium">File BPJS Kesehatan</td>
                      <td>
                        <a
                          disabled={
                            props.employe.file_bpjs_kesehatan ? false : true
                          }
                          href={
                            props.employe.file_bpjs_kesehatan
                              ? "/storage/bpjs/" +
                                props.employe.file_bpjs_kesehatan
                              : "#"
                          }
                          className={`btn btn-xs rounded-sm bg-orange-300 hover:bg-orange-400 `}
                          download={
                            props.employe.file_bpjs_kesehatan ? true : undefined
                          }
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium">File BPJS Ketenagakerjaan</td>
                      <td>
                        <a
                          disabled={
                            props.employe.file_bpjs_ketenaga ? false : true
                          }
                          href={
                            props.employe.file_bpjs_ketenaga
                              ? "/storage/bpjs/" +
                                props.employe.file_bpjs_ketenaga
                              : "#"
                          }
                          className={`${"btn btn-xs rounded-sm bg-orange-300 hover:bg-orange-400"}`}
                          download={
                            props.employe.file_bpjs_ketenaga ? true : undefined
                          }
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex gap-4 drop-shadow-md mt-2">
              <span>
                <p className="text-sm text-center font-semibold">KTP Depan</p>
                <a
                  href={`/storage/images/${props.employe.img_ktp_dpn}`}
                  download
                >
                  <img
                    src={`/storage/images/${props.employe.img_ktp_dpn}`}
                    alt="Profile IMG"
                    width={150}
                    className="rounded-sm"
                  />
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* End Section */}
    </AdminLayout>
  );
}

export default ShowEmploye;
