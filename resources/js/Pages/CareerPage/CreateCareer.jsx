import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import HeadNavigation from "../Admin/Component/HeadNavigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function CreateCareer(props) {
  const { data, setData, post, get, processing, errors } = useForm({
    employe_id: props.employes.data[0].id,
    mulai_masuk: "",
    sk_mulai_masuk: "",
    jenjang_karir: [],
    file_sk_kontrak: [],
    leader: [],
  });

  const [datas, setDatas] = useState();
  const [click, setClick] = useState([1]);
  const [clickLeader, setClickLeader] = useState([1]);

  useEffect(() => {
    props.employes.data.map((employ, i) => {
      setDatas(employ);
    });
  }, []);

  const clickAppend = () => {
    click.map((prev, next) => {
      setClick([prev + 1]);
    });
  };
  const clickAppendLeader = () => {
    clickLeader.map((prev, next) => {
      setClickLeader([prev + 1]);
    });
  };

  const clickMinusLeader = () => {
    clickLeader.map((prev, next) => {
      clickLeader > 1 && setClickLeader([(prev -= 1)]);
    });
  };
  const clickMinus = () => {
    click.map((prev, next) => {
      click > 1 && setClick([(prev -= 1)]);
    });
  };

  const arrayLooping = Array.from({ length: click }, (_, index) => index + 1);
  const arrayLeader = Array.from(
    { length: clickLeader },
    (_, index) => index + 1
  );

  const submit = (e) => {
    e.preventDefault();
    post(route("store.career"), {
      data,
      onSuccess: () => {
        toast.success("Berhasil Menambahkan Data !", {
          theme: "colored",
        });
        get(route("careers.show", props.employes.data[0].id));
      },
    });
  };

  const btnCancel = () => {
    get(route("careers.show", props.employes.data[0].id));
  };

  return (
    <AdminLayout>
      <Head title="Karir - Create" />
      <HeadNavigation title={"Karir - Create"} />

      <div>
        <form
          onSubmit={submit}
          encType="multipart/form-data"
          className="gap-4 mt-10 flex flex-col sm:grid sm:grid-flow-cols sm:grid-cols-3"
        >
          <div className="flex flex-col">
            <div className="form-control">
              <span className="label-text required">Nama Employes : </span>
              <input
                name="name"
                disabled
                required
                value={datas?.user_id ? datas.user?.nama_lengkap : datas?.name}
                placeholder="Nama"
                className="input input-sm rounded-sm input-bordered"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name}</span>
              )}
            </div>
            <div className="form-control">
              {arrayLeader.map((next, prev) => {
                return (
                  <div className="w-full">
                    <span className="label-text">SK Leader : </span>
                    <input
                      name="leader"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => {
                        let newData = [...data.leader];
                        newData[prev] = e.target.files[0];
                        setData("leader", newData);
                      }}
                      className="file-input w-full file-input-sm rounded-sm input-bordered"
                    />
                  </div>
                );
              })}

              {errors.leader && (
                <span className="text-red-500">{errors.leader}</span>
              )}

              <div className="flex gap-1 mt-1 justify-end">
                <button
                  type="button"
                  className="btn btn-sm text-white hover:text-black bg-orange-600 hover:bg-orange-300 rounded-sm"
                  onClick={() => clickAppendLeader()}
                >
                  +
                </button>
                <button
                  type="button"
                  disabled={clickLeader <= 1}
                  className="btn btn-sm disabled:border-slate-100 text-white hover:text-black bg-orange-600 hover:bg-orange-300 rounded-sm"
                  onClick={() => clickMinusLeader()}
                >
                  -
                </button>
              </div>
            </div>
          </div>

          <div className="form-control">
            <span className="label-text required">Mulai Masuk : </span>
            <input
              name="mulai_masuk"
              type="date"
              required
              onChange={(e) => setData("mulai_masuk", e.target.value)}
              className="input input-sm rounded-sm input-bordered"
            />
            {errors.mulai_masuk && (
              <span className="text-red-500">{errors.mulai_masuk}</span>
            )}
            <span className="label-text">SK Mulai Masuk : </span>
            <input
              name="sk_mulai_masuk"
              type="file"
              accept=".pdf"
              onChange={(e) => setData("sk_mulai_masuk", e.target.files[0])}
              className="file-input file-input-sm rounded-sm input-bordered"
            />
            {errors.sk_mulai_masuk && (
              <span className="text-red-500">{errors.sk_mulai_masuk}</span>
            )}
          </div>
          <div className="form-control" id="parent">
            {arrayLooping.map((number, index) => {
              return (
                <div className="flex flex-col gap-1" key={number}>
                  <span className="label-text required">
                    Riwayat Jenjang Karir :{" "}
                  </span>
                  <input
                    name="jenjang_karir"
                    type="text"
                    required
                    value={data.jenjang_karir[index]}
                    placeholder={`Jenjang Karir ${
                      props.employes.data[0].user_id
                        ? props.employes.data[0].user.nama_lengkap
                        : props.employes.data[0].name
                    }`}
                    onChange={(e) => {
                      let newData = [...data.jenjang_karir];
                      newData[index] = e.target.value;
                      setData("jenjang_karir", newData);
                    }}
                    className="file-input file-input-sm rounded-sm input-bordered"
                  />
                  {errors.jenjang_karir && (
                    <span className="text-red-500">{errors.jenjang_karir}</span>
                  )}
                  <span className="label-text required">File SK : </span>
                  <input
                    name="file_sk_kontrak[]"
                    type="file"
                    accept=".pdf"
                    required
                    onChange={(e) => {
                      let newData = [...data.file_sk_kontrak];
                      newData[index] = e.target.files[0];
                      setData("file_sk_kontrak", newData);
                    }}
                    className="file-input file-input-sm rounded-sm input-bordered"
                  />
                  {errors.file_sk_kontrak && (
                    <span className="text-red-500">
                      {errors.file_sk_kontrak}
                    </span>
                  )}
                </div>
              );
            })}
            <div className="flex gap-1 mt-1 justify-end">
              <button
                type="button"
                className="btn btn-sm text-white hover:text-black bg-orange-600 hover:bg-orange-300 rounded-sm"
                onClick={() => clickAppend()}
              >
                +
              </button>
              <button
                type="button"
                disabled={click <= 1}
                className="btn btn-sm disabled:border-slate-100 text-white hover:text-black bg-orange-600 hover:bg-orange-300 rounded-sm"
                onClick={() => clickMinus()}
              >
                -
              </button>
            </div>
          </div>
          <div className="flex gap-x-1">
            <button
              type="submit"
              className="btn btn-sm w-1/2 rounded-sm bg-orange-400 hover:bg-orange-600 hover:text-white transition-all ease-in-out duration-150"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => btnCancel()}
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

export default CreateCareer;
