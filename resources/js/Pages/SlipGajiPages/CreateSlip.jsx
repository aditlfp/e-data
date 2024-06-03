import { Head, Link, useForm } from "@inertiajs/react";
import Desain from "../../../../public/image/desain_slip.jpg";
import HeadNavigation from "../Admin/Component/HeadNavigation";
import AdminLayout from "@/Layouts/AdminLayout";
import TimeDiffcomponent from "@/Components/TimeDiffcomponent";
import { useEffect, useState } from "react";
import { FormatRupiah } from "@arismun/format-rupiah";
import { toast } from "react-toastify";
export default function CreateSlip(props) {
  console.log(props);
  const { data, setData, post, get, processing, errors, reset } = useForm({
    users: props.user.map((us) => ({
      nama_lengkap: us.nama_lengkap,
      devisi_id: us.devisi_id,
      formasi: us.devisi.name, 
      user_id: us.id,
      bulan_tahun: props.bulan,
      gaji_pokok: "",
      gaji_lembur: "",
      tj_jabatan: "",
      tj_kehadiran: "",
      tj_kinerja: "",
      bpjs: "",
      pinjaman: "",
      lain_lain: "",
      mk: "",
      total: 0,
    })),
  });

  // function handleChange(e) {
  //   const key = e.target.id;
  //   const value = e.target.value;
  //   setData((values) => ({
  //     ...values.users,
  //     [key]: value,
  //   }));
  // }

  const calculateTotal = (user) => {
    const {
      gaji_pokok,
      gaji_lembur,
      tj_jabatan,
      tj_kehadiran,
      tj_kinerja,
      bpjs,
      pinjaman,
      lain_lain,
    } = user;

    return (
      (parseFloat(gaji_pokok) || 0) +
      (parseFloat(gaji_lembur) || 0) +
      (parseFloat(tj_jabatan) || 0) +
      (parseFloat(tj_kehadiran) || 0) +
      (parseFloat(tj_kinerja) || 0) -
      (parseFloat(bpjs) || 0) -
      (parseFloat(pinjaman) || 0) -
      (parseFloat(lain_lain) || 0)
    ).toFixed(2);
  };

  const handleChange = (index, field, value) => {
    const newUsers = [...data.users];
    newUsers[index][field] = value;
    newUsers[index].total = calculateTotal(newUsers[index]);
    setData("users", newUsers);
  };

  const submit = (e) => {
    e.preventDefault();
    post(route("slip-gaji.store"), {
      onSuccess: () =>
        toast.success("Berhasil Menambahkan Data !", {
          theme: "colored",
        }),
    });
  };
  const btnSubmit = (e) => {
    submit();
  };
  return (
    <>
      <AdminLayout>
        <Head title="Slip Gaji - Create" />
        <HeadNavigation title={"Slip Gaji - Create"} />
        <div className="flex flex-col  gap-2 my-4 items-start">
          <div>
            <p className="font-bold text-lg">Tambah Slip Gaji</p>
            <p className="font-bold text-base">
              Mitra: {props.client.client.name}
            </p>
            <p className="font-bold text-base">Bulan: {props.bulan}</p>
          </div>
          <div className="flex justify-start mt-1">
            <Link
              href={route("slip-gaji.index")}
              className="btn bg-orange-600 btn-sm text-white hover:text-orange-600 rounded-sm"
            >
              Kembali
            </Link>
          </div>
        </div>

        <div className="">
          <form onSubmit={submit} className="overflow-x-scroll">
            <table className="table table-zebra table-xs my-5 text-center">
              <thead className="text-[10px]">
                <tr className="bg-orange-600 text-white capitalize">
                  <th className="border-x-[1px] border-orange-300" colSpan={3}>
                    Data Karyawan
                  </th>
                  <th className="border-x-[1px] border-orange-300" colSpan={2}>
                    Gaji
                  </th>
                  <th className="border-x-[1px] border-orange-300" colSpan={3}>
                    Tunjangan
                  </th>
                  <th className="border-x-[1px] border-orange-300" colSpan={4}>
                    Potongan
                  </th>
                  <th className="border-x-[1px] border-orange-300" colSpan={1}>
                    Total
                  </th>
                </tr>
                <tr className="bg-orange-600 text-white capitalize">
                  <th className="border-x-[1px] border-orange-300">Karyawan</th>
                  <th className="border-x-[1px] border-orange-300">Formasi</th>
                  <th className="border-x-[1px] border-orange-300">MK</th>
                  <th className="border-x-[1px] border-orange-300">Pokok</th>
                  <th className="border-x-[1px] border-orange-300">Lembur</th>
                  <th className="border-x-[1px] border-orange-300">Jabatan</th>
                  <th className="border-x-[1px] border-orange-300">
                    Kehadiran
                  </th>
                  <th className="border-x-[1px] border-orange-300">Kinerja</th>
                  <th className="border-x-[1px] border-orange-300">BPJS</th>
                  <th className="border-x-[1px] border-orange-300">Pinjaman</th>
                  <th className="border-x-[1px] border-orange-300">Absen</th>
                  <th className="border-x-[1px] border-orange-300">
                    Lain-lain
                  </th>
                  <th className="border-x-[1px] border-orange-300">Total</th>
                </tr>
              </thead>
              <tbody className="text-[10px]">
                {data.users.map((us, index) => {
                  console.log(us)
                  return (
                    <tr key={index} className="border-[1px] border-orange-300 ">
                      <td className="border-[1px] border-orange-300">
                        {us.nama_lengkap}
                      </td>
                      <td className="border-[1px] border-orange-300">
                        <span>
                          {us.formasi}
                        </span>
                      </td>
                      {/* MK */}

                      {[
                        "mk",
                        "gaji_pokok",
                        "gaji_lembur",
                        "tj_jabatan",
                        "tj_kehadiran",
                        "tj_kinerja",
                        "bpjs",
                        "pinjaman",
                        "absen",
                        "lain_lain",
                      ].map((field) => (
                        <td
                          key={field}
                          className="border-[1px] border-orange-300 min-w-[95px]"
                        >
                          <input
                            id={us[field]}
                            type="number"
                            className="input input-xs input-bordered w-full"
                            value={us[field]}
                            inputMode="numeric"
                            onChange={(e) =>
                              handleChange(index, field, e.target.value)
                            }
                          />
                          {errors[field] && (
                            <span className="text-red-500">
                              {errors[field]}
                            </span>
                          )}
                        </td>
                      ))}
                      <td className="border-[1px] border-orange-300">
                        <FormatRupiah value={us.total} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </form>
          <div className="flex justify-end">
            <button
              onClick={submit}
              className="btn bg-orange-600 btn-sm text-white hover:text-orange-600 rounded-sm"
            >
              Submit
            </button>
          </div>
        </div>
      </AdminLayout>
      <style jsx>{`
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
        ::-webkit-scrollbar {
          height: 12px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: #ea580c;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #a33b04;
        }
      `}</style>
    </>
  );
}
