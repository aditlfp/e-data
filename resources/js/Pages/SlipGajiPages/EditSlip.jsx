import { Head, Link, router, useForm, useRemember } from "@inertiajs/react";
import HeadNavigation from "../Admin/Component/HeadNavigation";
import AdminLayout from "@/Layouts/AdminLayout";
import { FormatRupiah } from "@arismun/format-rupiah";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
export default function CreateSlip(props) {
  const { data, setData, post, get, processing, errors, reset, delete: destroy } = useForm({
    users: props.slip.map((slip) => ({
      nama_lengkap: slip.user.nama_lengkap,
      devisi_id: slip.user.devisi_id,
      id: slip.id,
      user_id: slip.user.id,
      bulan_tahun: props.bulan,
      gaji_pokok: slip.gaji_pokok,
      gaji_lembur: slip.gaji_lembur,
      tj_jabatan: slip.tj_jabatan,
      tj_kehadiran: slip.tj_kehadiran,
      tj_kinerja: slip.tj_kinerja,
      tj_lain: slip.tj_lain,
      bpjs: slip.bpjs,
      pinjaman: slip.pinjaman,
      lain_lain: slip.lain_lain,
      mk: slip.mk,
      absen: slip.absen,
      total:
        (parseFloat(slip.gaji_pokok) || 0) +
        (parseFloat(slip.gaji_lembur) || 0) +
        (parseFloat(slip.tj_jabatan) || 0) +
        (parseFloat(slip.tj_kehadiran) || 0) +
        (parseFloat(slip.tj_kinerja) || 0) +
        (parseFloat(slip.tj_lain) || 0) -
        (parseFloat(slip.bpjs) || 0) -
        (parseFloat(slip.pinjaman) || 0) -
        (parseFloat(slip.lain_lain) || 0),
      })),
  });

  console.log(data.users);


  const calculateTotal = (user) => {
    const {
      gaji_pokok,
      gaji_lembur,
      tj_jabatan,
      tj_kehadiran,
      tj_kinerja,
      tj_lain,
      bpjs,
      pinjaman,
      lain_lain,
    } = user;

    return (
      (parseFloat(gaji_pokok) || 0) +
      (parseFloat(gaji_lembur) || 0) +
      (parseFloat(tj_jabatan) || 0) +
      (parseFloat(tj_kehadiran) || 0) +
      (parseFloat(tj_kinerja) || 0) +
      (parseFloat(tj_lain) || 0) -
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
    // patch(route("slip-gaji.update", props.mitra));
    router.post(route("slip-gaji.update", props.mitra), {
      _method: "PATCH",
      users: data.users,
      onSuccess: () =>
        toast.success("Berhasil Menambahkan Data !", {
          theme: "colored",
        }),
    });
  };

   const confirmDelete = (id) => {
    router.delete(route(`slip-gaji.destroy`, id), { 
      onSuccess: () => {
        toast.warning("Berhasil Menghapus Data Slip!", {
          theme: "colored",
        });
        window.location.reload();
      },
    });
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
                  <th className="border-x-[1px] border-orange-300" rowSpan={2}>Action</th>
                  <th className="border-x-[1px] border-orange-300" colSpan={3}>
                    Data Karyawan
                  </th>
                  <th className="border-x-[1px] border-orange-300" colSpan={2}>
                    Gaji
                  </th>
                  <th className="border-x-[1px] border-orange-300" colSpan={4}>
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
                  <th className="border-x-[1px] border-orange-300">Lain Lain</th>
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
                  return (
                    <tr key={index} className="border-[1px] border-orange-300 ">
                      <td>
                      <button
                        type="button"
                        className="btn btn-error btn-sm rounded-sm text-white hover:text-red-900 hover:bg-red-600 hover:bg-opacity-20 hover:border-0"
                        onClick={() => confirmDelete(us.id)}
                      >
                        <MdDeleteForever className="text-xl"/>
                      </button>
                      </td>
                      <td className="border-[1px] border-orange-300">
                        {us.nama_lengkap}
                      </td>
                      <td className="border-[1px] border-orange-300">
                        {props.divisi?.map((dev, i) => {
                          return (
                            <span key={i}>
                              {us.devisi_id == dev.id && dev.name}
                            </span>
                          );
                        })}
                      </td>
                      {/* MK */}

                      {[
                        "mk",
                        "gaji_pokok",
                        "gaji_lembur",
                        "tj_jabatan",
                        "tj_kehadiran",
                        "tj_kinerja",
                        "tj_lain",
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
