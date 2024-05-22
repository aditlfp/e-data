import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import HeadNavigation from "../Admin/Component/HeadNavigation";
import { useState } from "react";

export default function IndexSlip(props) {
  // console.log(props);
  const { data, setData, post, get, processing, errors, reset } = useForm({
    mitra: "0",
    bulan: "",
    route: "",
  });
  const slipsArray = Object.values(props.slip);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(props.employe);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = props.employe.filter((employee) => {
      const nameMatch =
        employee.nama_lengkap &&
        employee.nama_lengkap.toLowerCase().includes(value);
      const divisionMatch = props.divisi.some(
        (dev) =>
          employee.devisi_id === dev.id &&
          dev.name.toLowerCase().includes(value)
      );
      return nameMatch || divisionMatch;
    });

    setFilteredEmployees(filtered);
  };

  // console.log(data);

  const create = (e) => {
    e.preventDefault();
    if (data.route == "create") {
      get(route("slip-gaji.create"));
    } else if (data.route == "edit") {
      get(route("editSlip", data.mitra));
    }
  };
  return (
    <>
      <AdminLayout>
        <Head title="Slip Gaji - Home" />
        <HeadNavigation title={"Slip Gaji - Home"} />
        <div className="flex flex-col sm:flex-row justify-end gap-2 my-4 items-start sm:items-center">
          <div>
            <input
              id="search_input"
              type="text"
              placeholder="Cari berdasarkan Formasi atau Nama"
              className="input input-sm rounded-sm input-bordered"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="flex gap-2  w-fit">
          <form onSubmit={create} className="flex items-center gap-2">
            <div>
              <label className="label">Pilih Mitra</label>
              <select
                className="select select-sm select-bordered rounded-sm text-xs"
                onChange={(e) => setData("mitra", e.target.value)}
                required
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
            </div>
            <div>
              <label className="label">Pilih Bulan</label>
              <input
                type="month"
                className="input input-sm input-bordered rounded-sm"
                onChange={(e) => setData("bulan", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Pilih Aksi: </label>
              <div className="flex items-center gap-x-1">
                <div className="flex gap-1 items-center">
                  <input
                    type="radio"
                    id="create"
                    name="aksi"
                    value="create"
                    className="radio radio-sm"
                    onClick={(e) => setData("route", e.target.value)}
                  />
                  <label htmlFor="create" className="label text-sm">
                    Create
                  </label>
                </div>
                <div className="flex gap-1 items-center">
                  <input
                    type="radio"
                    id="edit"
                    name="aksi"
                    value="edit"
                    className="radio radio-sm"
                    onClick={(e) => setData("route", e.target.value)}
                  />
                  <label htmlFor="edit" className="label text-sm">
                    Edit
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center mx-5 h-full">
              <button
                type="submit"
                className="btn bg-orange-600 btn-sm text-white hover:text-orange-600 rounded-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="overflow-y-auto h-[365px] my-5">
          <table className="table table-zebra table-xs w-full">
            <thead className="sticky top-0">
              <tr className="bg-orange-600 text-white capitalize">
                <th className="border-x-[1px] border-orange-300 sticky top-0">
                  Nama
                </th>
                <th className="border-x-[1px] border-orange-300 sticky top-0">
                  Formasi
                </th>
                <th className="border-x-[1px] border-orange-300 sticky top-0">
                  Status
                </th>
                <th className="border-x-[1px] border-orange-300 sticky top-0">
                  Terakhir Gajian
                </th>
                <th className="border-x-[1px] border-orange-300 sticky top-0">
                  Status Slip Gaji ( Bulan Ini )
                </th>
              </tr>
            </thead>
            <tbody
              className=""
              style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
            >
              {filteredEmployees.map((us, index) => (
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
                          <div
                            key={i}
                            className="w-full flex items-center justify-center"
                          >
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      <style jsx>{`
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
