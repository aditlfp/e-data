import { Head, Link, useForm } from "@inertiajs/react";
import Desain from "../../../../public/image/desain_slip.jpg";
import HeadNavigation from "../Admin/Component/HeadNavigation";
import AdminLayout from "@/Layouts/AdminLayout";
export default function CreateSlip(props) {
  // console.log(props.user);
  const { data, setData, post, get, processing, errors, reset } = useForm({
    users: props.user.map((us) => ({
      user_name: us.nama_lengkap,
      user_id: us.id,
      gaji_pokok: "",
      gaji_lembur: "",
      tj_jabatan: "",
      tj_kehadiran: "",
      tj_kinerja: "",
      bpjs_kesehatan: "",
      bpjs_ketenaga: "",
      qurban: "",
      lain_lain: "",
    })),
  });

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
            <p className="font-bold text-base">Mitra: </p>
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
                  <th className="border-x-[1px] border-orange-300">
                    BPJS <br /> Kesehatan
                  </th>
                  <th className="border-x-[1px] border-orange-300">
                    BPJS <br /> Ketenagakerjaan
                  </th>
                  <th className="border-x-[1px] border-orange-300">Qurban</th>
                  <th className="border-x-[1px] border-orange-300">
                    Lain-lain
                  </th>
                </tr>
              </thead>
              <tbody className="text-[10px]">
                {data.users.map((user, index) => {
                  return (
                    <tr key={index} className="border-[1px] border-orange-300 ">
                      <td className="border-[1px] border-orange-300">
                        {user.user_name}
                      </td>
                      <td className="border-[1px] border-orange-300">
                        divisi jabatan
                      </td>
                      <td className="border-[1px] border-orange-300">MK</td>

                      {[
                        "gaji_pokok",
                        "gaji_lembur",
                        "tj_jabatan",
                        "tj_kehadiran",
                        "tj_kinerja",
                        "bpjs_kesehatan",
                        "bpjs_ketenaga",
                        "qurban",
                        "lain_lain",
                      ].map((field) => (
                        <td
                          key={field}
                          className="border-[1px] border-orange-300 min-w-[95px]"
                        >
                          <input
                            type="text"
                            className="input input-xs input-bordered w-full"
                            value={user[field]}
                            onChange={(e) =>
                              handleChange(index, field, e.target.value)
                            }
                          />
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
