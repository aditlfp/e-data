import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-B1z_bIYh.js";
import { useForm, Head } from "@inertiajs/react";
import HeadNavigation from "./HeadNavigation-C5ShT8hy.js";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import "./Sidebar-BZBlB_YE.js";
import "react-icons/bi/index.esm.js";
import "framer-motion";
function CreateCareer(props) {
  var _a;
  const { data, setData, post, get, processing, errors } = useForm({
    employe_id: props.employes.data[0].id,
    mulai_masuk: "",
    sk_mulai_masuk: "",
    jenjang_karir: [],
    file_sk_kontrak: [],
    leader: []
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
    post(route("store.career"), {
      data,
      onSuccess: () => {
        toast.success("Berhasil Menambahkan Data !", {
          theme: "colored"
        });
        get(route("careers.show", props.employes.data[0].id));
      }
    });
  };
  const btnCancel = () => {
    get(route("careers.show", props.employes.data[0].id));
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Karir - Create" }),
    /* @__PURE__ */ jsx(HeadNavigation, { title: "Karir - Create" }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: submit,
        encType: "multipart/form-data",
        className: "gap-4 mt-10 flex flex-col sm:grid sm:grid-flow-cols sm:grid-cols-3",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Nama Employes : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "name",
                  disabled: true,
                  required: true,
                  value: (datas == null ? void 0 : datas.user_id) ? (_a = datas.user) == null ? void 0 : _a.nama_lengkap : datas == null ? void 0 : datas.name,
                  placeholder: "Nama",
                  className: "input input-sm rounded-sm input-bordered"
                }
              ),
              errors.name && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
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
                ] });
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
            /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Mulai Masuk : " }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "mulai_masuk",
                type: "date",
                required: true,
                onChange: (e) => setData("mulai_masuk", e.target.value),
                className: "input input-sm rounded-sm input-bordered"
              }
            ),
            errors.mulai_masuk && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.mulai_masuk }),
            /* @__PURE__ */ jsx("span", { className: "label-text", children: "SK Mulai Masuk : " }),
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
            errors.sk_mulai_masuk && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.sk_mulai_masuk })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-control", id: "parent", children: [
            arrayLooping.map((number, index) => {
              return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ jsxs("span", { className: "label-text required", children: [
                  "Riwayat Jenjang Karir :",
                  " "
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    name: "jenjang_karir",
                    type: "text",
                    required: true,
                    value: data.jenjang_karir[index],
                    placeholder: `Jenjang Karir ${props.employes.data[0].user_id ? props.employes.data[0].user.nama_lengkap : props.employes.data[0].name}`,
                    onChange: (e) => {
                      let newData = [...data.jenjang_karir];
                      newData[index] = e.target.value;
                      setData("jenjang_karir", newData);
                    },
                    className: "file-input file-input-sm rounded-sm input-bordered"
                  }
                ),
                errors.jenjang_karir && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.jenjang_karir }),
                /* @__PURE__ */ jsx("span", { className: "label-text required", children: "File SK : " }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    name: "file_sk_kontrak[]",
                    type: "file",
                    accept: ".pdf",
                    required: true,
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
                type: "submit",
                className: "btn btn-sm w-1/2 rounded-sm bg-orange-400 hover:bg-orange-600 hover:text-white transition-all ease-in-out duration-150",
                children: "Save"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => btnCancel(),
                className: "btn btn-sm w-1/2 rounded-sm bg-red-400 hover:bg-red-600 hover:text-white transition-all ease-in-out duration-150",
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
  CreateCareer as default
};
