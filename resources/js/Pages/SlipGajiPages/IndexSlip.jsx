import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import HeadNavigation from "../Admin/Component/HeadNavigation";

export default function IndexSlip(props) {
  console.log(props);
  const { data, setData, post, get, processing, errors, reset } = useForm({
    mitra: "0",
    bulan: "",
  });
  const slipsArray = Object.values(props.slip);
  const create = (e) => {
    e.preventDefault();
    get(route("slip-gaji.create"));
  };
  return (
    <>
      <AdminLayout>
        <Head title="Slip Gaji - Home" />
        <HeadNavigation title={"Slip Gaji - Home"} />
        <div className="flex flex-col sm:flex-row justify-end gap-2 my-4 items-start sm:items-center">
          <div>
            <input
              type="text"
              placeholder="Cari berdasarkan NIK atau Nama"
              className="input input-sm rounded-sm input-bordered"
            />
          </div>
        </div>
        <div>
          <form onSubmit={create} className="flex items-center gap-2">
            <select
              className="select select-sm select-bordered rounded-sm text-xs w-1/6"
              onChange={(e) => setData("mitra", e.target.value)}
            >
              <option value="0" key="0">
                ~ Mitra ~
              </option>
              {props.mitra.map((mit, i) => (
                <option value={mit.id} key={i}>
                  {mit.client.name}
                </option>
              ))}
            </select>
            <input
              type="month"
              className="input input-sm input-bordered rounded-sm"
              onChange={(e) => setData("bulan", e.target.value)}
            />
            <button
              type="submit"
              className="btn bg-orange-600 btn-sm text-white hover:text-orange-600 rounded-sm"
            >
              + New Slip
            </button>
          </form>
        </div>
        <div className="overflow-hidden">
          <table className="table table-zebra  table-xs my-5">
            <thead>
              <tr className="bg-orange-600 text-white capitalize">
                <th className="border-x-[1px] border-orange-300">Nama</th>
                <th className="border-x-[1px] border-orange-300">Formasi</th>
                <th className="border-x-[1px] border-orange-300">Status</th>
                <th className="border-x-[1px] border-orange-300">
                  Terakhir Gajian
                </th>
                <th className="border-x-[1px] border-orange-300">
                  Status Slip Gaji ( Bulan Ini )
                </th>
                {props.auth.user.role_id == 2 && (
                  <th className="border-x-[1px] border-orange-300">Aksi</th>
                )}
              </tr>
            </thead>
            <tbody>
              {props.employe.map((us, index) => (
                <tr key={index} className="border-[1px] border-orange-300 ">
                  <td className="border-[1px] border-orange-300">
                    {us.nama_lengkap}
                  </td>
                  <td className="border-[1px] border-orange-300">
                    {props.divisi?.map((dev, i) => {
                      // GET Devisi On DB2_CONNECTION
                      return (
                        <span key={i}>
                          {us.devisi_id == dev.id && dev.name}
                        </span>
                      );
                    })}
                  </td>
                  <td className="border-[1px] border-orange-300">
                    {us.temp_ban == "false" ? (
                      <span className="text-white rounded-sm badge badge-success badge-sm">
                        Active
                      </span>
                    ) : (
                      <span className="text-red-900 rounded-sm badge badge-error badge-sm">
                        Temp Ban
                      </span>
                    )}
                  </td>
                  <td className="border-[1px] border-orange-300">
                    {slipsArray.map((s, i) => {
                      return us.id == s.user_id && s.bulan_tahun;
                    })}
                  </td>
                  <td className="border-[1px] border-orange-300">
                    {slipsArray.map((s, i) => {
                      if (
                        us.id == s.user_id &&
                        s.bulan_tahun == props.currentMonth
                      ) {
                        return (
                          <div className="w-full flex items-center justify-center">
                            <span
                              key={i}
                              className="badge badge-sm badge-info rounded-sm text-sky-950"
                            >
                              Sudah Dibuat
                            </span>
                          </div>
                        );
                      }
                    })}
                  </td>
                  <td className="border-[1px] border-orange-300">Edit</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
}
