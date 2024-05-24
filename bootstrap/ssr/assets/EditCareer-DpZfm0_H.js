import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-BBNDZYJL.js";
import { useForm, Head, router } from "@inertiajs/react";
import HeadNavigation from "./HeadNavigation-C5ShT8hy.js";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import "./Sidebar-CW9JvTre.js";
import "react-icons/bi/index.esm.js";
import "framer-motion";
function EditCareer(props) {
  var _a;
  const { data, setData, put, get, processing, errors } = useForm({
    employe_id: props.career.employe_id,
    mulai_masuk: "",
    sk_mulai_masuk: "",
    old_sk_mulai_masuk: props.career.sk_mulai_masuk,
    jenjang_karir: [],
    file_sk_kontrak: [],
    old_file_sk: props.career.file_sk_kontrak,
    leader: [],
    old_file_leader: props.career.leader
  });
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
      clickLeader > 1 && setClickLeader([prev -= 1]);
    });
  };
  const clickMinus = () => {
    click.map((prev, next) => {
      click > 1 && setClick([prev -= 1]);
    });
  };
  const arrayLooping = Array.from({ length: click }, (_, index) => index + 1);
  const arrayLeader = Array.from(
    { length: clickLeader },
    (_, index) => index + 1
  );
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
        old_file_leader: props.career.leader
      },
      {
        onSuccess: () => {
          toast.success("Berhasil Mengupdate Data !", {
            theme: "colored"
          });
          get(route("careers.show", props.employes.data[0].id));
        }
      }
    );
  };
  const btnCancel = () => {
    get(route("careers.show", props.career.employe_id));
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Karir - Edit" }),
    /* @__PURE__ */ jsx(HeadNavigation, { title: "Karir - Edit" }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: submit,
        encType: "multipart/form-data",
        className: "gap-4 mt-10 grid grid-flow-cols grid-cols-3",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text", children: "Nama Employes : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "name",
                  disabled: true,
                  value: (datas == null ? void 0 : datas.user_id) ? (_a = datas.user) == null ? void 0 : _a.nama_lengkap : datas == null ? void 0 : datas.name,
                  placeholder: "Nama",
                  className: "input input-sm rounded-sm input-bordered"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              props.career.leader == data.old_file_leader && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "label-text", children: "Prev. SK Leader : " }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 my-4", children: props.career.leader.map(
                  (led, i) => data.old_file_leader[i] && /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: `/storage/sk_kontrak/${led}`,
                      target: "_blank",
                      className: "btn btn-sm mr-5 text-gray-800 hover:text-white bg-green-400 hover:bg-green-500 border-0",
                      children: [
                        "Previous File ",
                        i + 1
                      ]
                    }
                  )
                ) })
              ] }),
              arrayLeader.map((next, prev) => {
                return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
                  /* @__PURE__ */ jsx("span", { className: "label-text", children: "SK Leader : " }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      name: "leader",
                      type: "file",
                      accept: ".pdf",
                      onChange: (e) => {
                        let newData = [...data.leader];
                        newData[prev] = e.target.files[0];
                        setData("leader", newData);
                      },
                      className: "file-input w-full file-input-sm rounded-sm input-bordered"
                    }
                  )
                ] }, prev);
              }),
              errors.leader && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.leader }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-1 mt-1 justify-end", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn btn-sm text-white hover:text-black bg-orange-600 hover:bg-orange-300 rounded-sm",
                    onClick: () => clickAppendLeader(),
                    children: "+"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    disabled: clickLeader <= 1,
                    className: "btn btn-sm disabled:border-slate-100 text-white hover:text-black bg-orange-600 hover:bg-orange-300 rounded-sm",
                    onClick: () => clickMinusLeader(),
                    children: "-"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
            props.career.sk_mulai_masuk == data.sk_mulai_masuk && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "label-text", children: "Prev. Mulai Masuk : " }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 my-4", children: data.sk_mulai_masuk && /* @__PURE__ */ jsx(
                "a",
                {
                  href: `/storage/sk_kontrak/${data.sk_mulai_masuk}`,
                  target: "_blank",
                  className: "btn btn-sm mr-5 text-gray-800 hover:text-white bg-green-400 hover:bg-green-500 border-0",
                  children: "Previous File"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "label-text", children: "Mulai Masuk : " }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "sk_mulai_masuk",
                type: "file",
                accept: ".pdf",
                onChange: (e) => setData("sk_mulai_masuk", e.target.files[0]),
                className: "file-input file-input-sm rounded-sm input-bordered"
              }
            ),
            errors.sk_mulai_masuk && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.sk_mulai_masuk }),
            /* @__PURE__ */ jsx("span", { className: "label-text", children: "Mulai Masuk : " }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "mulai_masuk",
                type: "date",
                onChange: (e) => setData("mulai_masuk", e.target.value),
                className: "input input-sm rounded-sm input-bordered"
              }
            ),
            errors.mulai_masuk && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.mulai_masuk })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-control", id: "parent", children: [
            /* @__PURE__ */ jsx("div", { children: data.file_sk_kontrak.length == 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: "label-text", children: "Prev. SK Kontrak : " }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 my-4", children: props.career.file_sk_kontrak.map((led, i) => {
                var _a2, _b;
                return /* @__PURE__ */ jsxs(React.Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      name: "jenjang_karir",
                      type: "text",
                      disabled: true,
                      value: props.career.jenjang_karir[i],
                      placeholder: `Jenjang Karir ${((_a2 = props.employes) == null ? void 0 : _a2.user_id) ? props.employes.user.nama_lengkap : (_b = props.employes) == null ? void 0 : _b.name}`,
                      onChange: (e) => {
                        let newData = [...data.jenjang_karir];
                        newData[i] = e.target.value;
                        setData("jenjang_karir", newData);
                      },
                      className: "file-input file-input-sm rounded-sm input-bordered"
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: `/storage/sk_kontrak/${led}`,
                      target: "_blank",
                      className: "btn btn-sm mr-5 text-gray-800 hover:text-white bg-green-400 hover:bg-green-500 border-0",
                      children: [
                        "Previous File ",
                        i + 1
                      ]
                    }
                  )
                ] }, i);
              }) })
            ] }) }),
            arrayLooping.map((number, index) => {
              var _a2, _b;
              return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text", children: "Jenjang Karir*: " }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    name: "jenjang_karir",
                    type: "text",
                    value: data.jenjang_karir[index],
                    placeholder: `Jenjang Karir ${((_a2 = props.career.employe) == null ? void 0 : _a2.user_id) ? props.career.employe.user.nama_lengkap : (_b = props.career.employe) == null ? void 0 : _b.name}`,
                    onChange: (e) => {
                      let newData = [...data.jenjang_karir];
                      newData[index] = e.target.value;
                      setData("jenjang_karir", newData);
                    },
                    className: "file-input file-input-sm rounded-sm input-bordered"
                  }
                ),
                errors.jenjang_karir && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.jenjang_karir }),
                /* @__PURE__ */ jsx("span", { className: "label-text", children: "File SK* : " }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    name: "file_sk_kontrak[]",
                    type: "file",
                    accept: ".pdf",
                    onChange: (e) => {
                      let newData = [...data.file_sk_kontrak];
                      newData[index] = e.target.files[0];
                      setData("file_sk_kontrak", newData);
                    },
                    className: "file-input file-input-sm rounded-sm input-bordered"
                  }
                ),
                errors.file_sk_kontrak && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.file_sk_kontrak })
              ] }, number);
            }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-1 mt-1 justify-end", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "btn btn-sm text-white hover:text-black bg-orange-600 hover:bg-orange-300 rounded-sm",
                  onClick: () => clickAppend(),
                  children: "+"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  disabled: click <= 1,
                  className: "btn btn-sm disabled:border-slate-100 text-white hover:text-black bg-orange-600 hover:bg-orange-300 rounded-sm",
                  onClick: () => clickMinus(),
                  children: "-"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-x-1", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                disabled: processing,
                type: "submit",
                className: "btn btn-sm w-full rounded-sm bg-orange-400 hover:bg-orange-600 hover:text-white transition-all ease-in-out duration-150",
                children: "Save"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => btnCancel(),
                className: "btn btn-sm rounded-sm bg-red-400 hover:bg-red-600 hover:text-white transition-all ease-in-out duration-150",
                children: "Cancel"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
export {
  EditCareer as default
};
