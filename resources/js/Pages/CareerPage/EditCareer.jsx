import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, useForm } from "@inertiajs/react";
import HeadNavigation from "../Admin/Component/HeadNavigation";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";

function EditCareer(props) {
  const { data, setData, put, get, processing, errors } = useForm({
    employe_id: props.career.employe_id,
    mulai_masuk: "",
    sk_mulai_masuk: "",
    old_sk_mulai_masuk: props.career.sk_mulai_masuk,
    jenjang_karir: [],
    file_sk_kontrak: [],
    old_file_sk: props.career.file_sk_kontrak,
    leader: [],
    old_file_leader: props.career.leader,
  });

  // console.log(props, `/storage/sk_kontrak/${data.leader[0]}`, data.leader[1]);
  // console.log(data);

  const [datas, setDatas] = useState();
  const [click, setClick] = useState([1]);
  const [clickLeader, setClickLeader] = useState([1]);

  useEffect(() => {
    setDatas(props.career.employe);
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

  // console.log(arrayLeader);

  const submit = (e) => {
    e.preventDefault();
    console.log(data);

    router.post(
      route("careers.update", props.career.id),
      {
        _method: "patch",
        employe_id: props.career.employe_id,
        mulai_masuk: data.mulai_masuk,
        sk_mulai_masuk: data.sk_mulai_masuk,
        old_sk_mulai_masuk: props.career.sk_mulai_masuk,
        jenjang_karir: data.jenjang_karir,
        file_sk_kontrak: data.file_sk_kontrak,
        old_file_sk: props.career.file_sk_kontrak,
        leader: data.leader,
        old_file_leader: props.career.leader,
      },
      {
        onSuccess: () => {
          toast.success("Berhasil Mengupdate Data !", {
            theme: "colored",
          });
          get(route("careers.show", props.employes.data[0].id));
        },
      }
    );
  };

  const btnCancel = () => {
    get(route("careers.show", props.career.employe_id));
  };

  return (
    <AdminLayout>
      <Head title="Karir - Edit" />
      <HeadNavigation title={"Karir - Edit"} />

      <div>
        <form
          onSubmit={submit}
          encType="multipart/form-data"
          className="gap-4 mt-10 grid grid-flow-cols grid-cols-3"
        >
          <div className="flex flex-col">
            <div className="form-control">
              <span className="label-text">Nama Employes : </span>
              <input
                name="name"
                disabled
                value={datas?.user_id ? datas.user?.nama_lengkap : datas?.name}
                placeholder="Nama"
                className="input input-sm rounded-sm input-bordered"
              />
              {/* {errors.name && <span className="text-red-500">{errors.name}</span>} */}
            </div>
            <div className="form-control">
              {props.career.leader == data.old_file_leader && (
                <div>
                  <span className="label-text">Prev. SK Leader : </span>
                  <div className="flex flex-col gap-2 my-4">
                    {props.career.leader.map(
                      (led, i) =>
                        data.old_file_leader[i] && (
                          <a
                            href={`/storage/sk_kontrak/${led}`}
                            target="_blank"
                            className="btn btn-sm mr-5 text-gray-800 hover:text-white bg-green-400 hover:bg-green-500 border-0"
                          >
                            Previous File {i + 1}
                          </a>
                        )
                    )}
                  </div>
                </div>
              )}
              {arrayLeader.map((next, prev) => {
                // console.log(data.leader[prev]);
                return (
                  <div className="w-full" key={prev}>
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
            {props.career.sk_mulai_masuk == data.sk_mulai_masuk && (
              <div>
                <span className="label-text">Prev. Mulai Masuk : </span>
                <div className="flex flex-col gap-2 my-4">
                  {data.sk_mulai_masuk && (
                    <a
                      href={`/storage/sk_kontrak/${data.sk_mulai_masuk}`}
                      target="_blank"
                      className="btn btn-sm mr-5 text-gray-800 hover:text-white bg-green-400 hover:bg-green-500 border-0"
                    >
                      Previous File
                    </a>
                  )}
                </div>
              </div>
            )}
            <span className="label-text">Mulai Masuk : </span>
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
            <span className="label-text">Mulai Masuk : </span>
            <input
              name="mulai_masuk"
              type="date"
              onChange={(e) => setData("mulai_masuk", e.target.value)}
              className="input input-sm rounded-sm input-bordered"
            />
            {errors.mulai_masuk && (
              <span className="text-red-500">{errors.mulai_masuk}</span>
            )}
          </div>

          <div className="form-control" id="parent">
            <div>
              {data.file_sk_kontrak.length == 0 && (
                <>
                  <span className="label-text">Prev. SK Kontrak : </span>
                  <div className="flex flex-col gap-2 my-4">
                    {props.career.file_sk_kontrak.map((led, i) => (
                      <React.Fragment key={i}>
                        <input
                          name="jenjang_karir"
                          type="text"
                          disabled
                          value={props.career.jenjang_karir[i]}
                          placeholder={`Jenjang Karir ${
                            props.employes?.user_id
                              ? props.employes.user.nama_lengkap
                              : props.employes?.name
                          }`}
                          onChange={(e) => {
                            let newData = [...data.jenjang_karir];
                            newData[i] = e.target.value;
                            setData("jenjang_karir", newData);
                          }}
                          className="file-input file-input-sm rounded-sm input-bordered"
                        />
                        <a
                          href={`/storage/sk_kontrak/${led}`}
                          target="_blank"
                          className="btn btn-sm mr-5 text-gray-800 hover:text-white bg-green-400 hover:bg-green-500 border-0"
                        >
                          Previous File {i + 1}
                        </a>
                      </React.Fragment>
                    ))}
                  </div>
                </>
              )}
            </div>
            {arrayLooping.map((number, index) => {
              return (
                <div className="flex flex-col gap-1" key={number}>
                  <span className="label-text">Jenjang Karir*: </span>
                  <input
                    name="jenjang_karir"
                    type="text"
                    value={data.jenjang_karir[index]}
                    placeholder={`Jenjang Karir ${
                      props.career.employe?.user_id
                        ? props.career.employe.user.nama_lengkap
                        : props.career.employe?.name
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
                  <span className="label-text">File SK* : </span>
                  <input
                    name="file_sk_kontrak[]"
                    type="file"
                    accept=".pdf"
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
              disabled={processing}
              type="submit"
              className="btn btn-sm w-full rounded-sm bg-orange-400 hover:bg-orange-600 hover:text-white transition-all ease-in-out duration-150"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => btnCancel()}
              className="btn btn-sm rounded-sm bg-red-400 hover:bg-red-600 hover:text-white transition-all ease-in-out duration-150"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default EditCareer;
