import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import HeadNavigation from "../Admin/Component/HeadNavigation";
import { BiSolidDownload } from "react-icons/bi";
import ShowEmployeCareer from "../CareerPage/ShowEmployeCareer";
import NoImage from "../../../../public/image/no-image.jpg";

function ShowEmploye(props) {
  const { get } = useForm({});
  const [nowUrl, setNowUrl] = useState("employeRoute");
  const [showKarir, setShowKarir] = useState(false);

  const karirRoute = (id) => {
    setShowKarir(!showKarir);
    setNowUrl("karirRoute");
  };

  const employeRoute = () => {
    setShowKarir(!showKarir);
    setNowUrl("employeRoute");
  };

  return (
    <AdminLayout>
      <Head title="Employe - Details" />
      <HeadNavigation title={"Employe - Details"} />
      {/* SideBar Menu Employe-Careen */}
      <div className="bg-orange-100 flex gap-x-2 w-full h-full mt-5 rounded-sm">
        <div className="my-10 sm:w-1/6 pr-10 border-r-2 hidden sm:block border-orange-400/50">
          <button
            disabled={nowUrl == "employeRoute"}
            onClick={() => employeRoute()}
            className="bg-orange-300 ml-4 w-full btn btn-sm flex hover:text-gray-100 disabled:bg-orange-200 disabled:text-gray-100 disabled:cursor-not-allowed hover:bg-orange-400 transition-all items-center gap-x-4 font-bold ease-in-out duration-150 mb-2 py-2 px-3 rounded-sm justify-center text-sm cursor-pointer"
          >
            Profile
          </button>
          <button
            disabled={nowUrl == "karirRoute"}
            onClick={() => karirRoute(props.employe.id)}
            className="bg-orange-300 w-full ml-4 btn btn-sm flex hover:text-gray-100 disabled:bg-orange-200 disabled:text-gray-100 disabled:cursor-not-allowed hover:bg-orange-400 transition-all items-center gap-x-4 font-bold ease-in-out duration-150 mb-2 py-2 px-3 rounded-sm justify-center text-sm cursor-pointer"
          >
            Karir
          </button>
        </div>

        <div className="sm:w-5/6 w-full mb-2 mt-10">
          <div className="my-3 flex justify-end mx-10">
            <Link
              href={route("employes.index")}
              className="btn btn-sm rounded-sm bg-orange-400 hover:bg-orange-500"
            >
              Kembali
            </Link>
          </div>
          <div className="mx-4 sm:mx-10">
            {showKarir == false ? (
              <>
                <div className="sm:grid sm:grid-cols-2 flex flex-col gap-y-5 gap-x-2 items-center justify-center py-2 px-1 bg-orange-300/20 rounded-sm drop-shadow-md">
                  <div className="relative flex justify-center items-center w-full my-32 sm:my-0">
                    {props.employe.img && (
                      <>
                        <p className="capitalize text-center font-bold top-[-125px] inset-0 absolute z-50">
                          Profile{" "}
                          {props.employe.name ? props.employe.name : "kosong"}
                        </p>
                        <div className="absolute bg-orange-400/70 p-2 drop-shadow-md rounded-full w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center">
                          <img
                            src={
                              props.employe.img != "" ||
                              props.employe.img != null
                                ? `/storage/images/${props.employe.img}`
                                : `${NoImage}`
                            }
                            alt="Profile IMG"
                            width={150}
                            className="object-cover rounded-full w-full h-full"
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col w-full pr-10 bg-orange-400/10 p-2 rounded-sm sm:text-base text-sm">
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
                              : props.employe.user.jabatan.name_jabatan}
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
                            :{" "}
                            {props.employe.no_kk
                              ? props.employe.no_kk
                              : "kosong"}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-medium">No. KTP</td>
                          <td>
                            :{" "}
                            {props.employe.no_ktp
                              ? props.employe.no_ktp
                              : "kosong"}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-medium">NIK</td>
                          <td>
                            :{" "}
                            {props.employe.nik
                              ? props.employe.nik
                              : "~ NIK KOSONG ~"}
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
                                    {i !==
                                      props.employe.jenis_bpjs.length - 1 &&
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
                          <td className="font-medium">
                            No. BPJS Ketenagakerjaan
                          </td>
                          <td>
                            :{" "}
                            {props.employe.no_bpjs_ketenaga
                              ? props.employe.no_bpjs_ketenaga
                              : "kosong"}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-medium">BPJS Kesehatan</td>
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
                              className={
                                "btn btn-xs hover:text-white text-green-900 rounded-sm bg-green-500 border-0 hover:bg-green-600"
                              }
                              download={
                                props.employe.file_bpjs_kesehatan
                                  ? true
                                  : undefined
                              }
                            >
                              <BiSolidDownload className="text-lg " />
                              Download
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="font-medium">BPJS Ketenaga kerjaan</td>
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
                              className={`${"btn btn-xs hover:text-white text-green-900 rounded-sm bg-green-500 border-0 hover:bg-green-600"}`}
                              download={
                                props.employe.file_bpjs_ketenaga
                                  ? true
                                  : undefined
                              }
                            >
                              <BiSolidDownload className="text-lg " />
                              Download
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex sm:justify-start justify-center gap-4 drop-shadow-md mt-2">
                  <span
                    className="hover:tooltip hover:tooltip-open hover:tooltip-top transition-all ease-in-out duration-150"
                    data-tip="Click To Download"
                  >
                    <p className="text-sm text-center font-semibold">
                      Foto KTP
                    </p>
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
              </>
            ) : (
              <>
                <ShowEmployeCareer employe={true} datas={props} />
              </>
            )}
          </div>
        </div>
      </div>
      {/* End Section */}
    </AdminLayout>
  );
}

export default ShowEmploye;
