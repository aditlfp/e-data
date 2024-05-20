import { Head, Link, useForm } from "@inertiajs/react";
import Desain from "../../../../public/image/desain_slip.jpg";
import HeadNavigation from "../Admin/Component/HeadNavigation";
import AdminLayout from "@/Layouts/AdminLayout";
import TimeDiffcomponent from "@/Components/TimeDiffcomponent";
export default function CreateSlip(props) {
  console.log(props);
  const { data, setData, post, get, processing, errors, reset } = useForm({
    users: props.user.map((us) => ({
      user_name: us.nama_lengkap,
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

  const handleChange = (index, field, value) => {
    const newUsers = [...data.users];
    newUsers[index][field] = value;
    setData("users", newUsers);
  };

  const submit = (e) => {
    e.preventDefault();
    post(route("slip-gaji.store"));
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

        <div className="overflow-hidden">
          <form onSubmit={submit} className="">
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
                </tr>
              </thead>
              <tbody className="text-[10px]">
                {props.user.map((us, index) => {
                  return (
                    <tr key={index} className="border-[1px] border-orange-300 ">
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
                            type="text"
                            className="input input-xs input-bordered w-full"
                            value={us[field]}
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn bg-orange-600 btn-sm text-white hover:text-orange-600 rounded-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </>
  );
}
