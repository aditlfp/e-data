import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-BeIvTlxI.js";
import { useState } from "react";
import HeadNavigation from "./HeadNavigation-C5ShT8hy.js";
import { useForm, Head } from "@inertiajs/react";
import { toast } from "react-toastify";
import "./Sidebar-BZBlB_YE.js";
import "react-icons/bi/index.esm.js";
import "framer-motion";
function CreateEmploye(props) {
  var _a, _b;
  const [jenisBpjs, setJenisBpjs] = useState({
    jkk: false,
    jkm: false,
    jht: false,
    jp: false,
    jkp: false
  });
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setData((data2) => ({
      ...data2,
      jenis_bpjs: checked ? [...data2.jenis_bpjs, name] : data2.jenis_bpjs.filter((item) => item !== name)
    }));
  };
  const { data, setData, post, get, processing, errors, reset } = useForm({
    user_id: "",
    name: "",
    ttl: "",
    no_kk: "",
    no_ktp: "",
    client_id: "",
    img: null,
    img_ktp_dpn: "",
    jenis_bpjs: [],
    no_bpjs_kesehatan: "",
    file_bpjs_kesehatan: "",
    no_bpjs_ketenaga: "",
    file_bpjs_ketenaga: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("employes.store"), {
      data,
      onSuccess: () => {
        reset(
          "user_id",
          "client_id",
          "file_bpjs_kesehatan",
          "img",
          "img_ktp_dpn",
          "jenis_bpjs",
          "name",
          "no_bpjs_kesehatan",
          "no_bpjs_ketenaga",
          "no_kk",
          "no_ktp",
          "ttl"
        ), toast.success("Berhasil Menambahkan Data !", {
          theme: "colored"
        });
      }
    });
  };
  const cancel = (e) => {
    e.preventDefault();
    window.location.href = route("employes.index");
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Employe - Create" }),
    /* @__PURE__ */ jsx(HeadNavigation, { title: "Employe - Create" }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        encType: "multipart/form-data",
        className: "gap-4 mt-10 flex flex-col sm:grid sm:grid-flow-cols sm:grid-cols-3  ",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
            /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Masukkan Nama : " }),
            /* @__PURE__ */ jsx(
              "input",
              {
                list: "users",
                id: "browser",
                name: "name",
                value: data.name,
                required: true,
                onChange: (e) => setData("name", e.target.value),
                placeholder: "Nama",
                className: "input input-sm rounded-sm input-bordered"
              }
            ),
            /* @__PURE__ */ jsx("datalist", { id: "users", className: "dark:text-white", children: (_a = props.users) == null ? void 0 : _a.map((user, key) => {
              return /* @__PURE__ */ jsx("option", { value: user.nama_lengkap, id: key }, key);
            }) }),
            errors.name && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
            /* @__PURE__ */ jsx("span", { className: "label-text", children: "Tempat Tanggal Lahir : " }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "ttl",
                value: data.ttl,
                onChange: (e) => setData("ttl", e.target.value),
                placeholder: "Tempat Tanggal Lahir",
                className: "input input-sm rounded-sm input-bordered"
              }
            ),
            errors.ttl && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.ttl })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
            /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Masukkan No KK : " }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "no_kk",
                value: data.no_kk,
                required: true,
                onChange: (e) => setData("no_kk", e.target.value),
                placeholder: "Nomor KK",
                className: "input input-sm rounded-sm input-bordered"
              }
            ),
            errors.no_kk && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.no_kk })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Masukkan No KTP : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "no_ktp",
                  value: data.no_ktp,
                  required: true,
                  onChange: (e) => setData("no_ktp", e.target.value),
                  placeholder: "Nomor KTP",
                  className: "input input-sm rounded-sm input-bordered"
                }
              ),
              errors.no_ktp && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.no_ktp })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
              data.img_ktp_dpn && /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx(
                "label",
                {
                  htmlFor: "img_ktp_dpn",
                  className: "flex justify-center items-center rounded-sm ",
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: URL.createObjectURL(data.img_ktp_dpn),
                      alt: "Image Preview",
                      style: { maxWidth: "245px" },
                      width: 150,
                      className: "rounded-sm drop-shadow-md"
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "form-control mt-2", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text", children: "Foto KTP (Depan) : " }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    accept: ".png,.jpg,.jpeg,*",
                    name: "img_ktp_dpn",
                    onChange: (e) => setData("img_ktp_dpn", e.target.files[0]),
                    className: "file-input file-input-sm rounded-sm file-input-bordered"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text required", children: "Pilih Mitra : " }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  defaultValue: 0,
                  required: true,
                  onChange: (e) => setData("client_id", e.target.value),
                  className: "select select-bordered select-sm text-sm rounded-sm",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: 0, disabled: true, children: "Pilih Mitra" }),
                    (_b = props == null ? void 0 : props.clients) == null ? void 0 : _b.map((client, index) => /* @__PURE__ */ jsx("option", { value: client.id, children: client.name }, index))
                  ]
                }
              ),
              errors.client_id && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.client_id })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-control mt-2", children: [
              data.img && /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx(
                "label",
                {
                  htmlFor: "img",
                  className: "flex justify-center items-center rounded-sm ",
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: URL.createObjectURL(data.img),
                      alt: "Image Preview",
                      style: { maxWidth: "245px" },
                      width: 150,
                      className: "rounded-sm drop-shadow-md"
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ jsx("span", { className: "label-text", children: "Foto Profile : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  name: "img",
                  accept: ".png,.jpg,.jpeg,*",
                  onChange: (e) => setData("img", e.target.files[0]),
                  className: "file-input file-input-sm rounded-sm file-input-bordered"
                }
              ),
              errors.img && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.img })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text", children: "No BPJS Kesehatan : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "no_bpjs_kesehatan",
                  value: data.no_bpjs_kesehatan,
                  onChange: (e) => setData("no_bpjs_kesehatan", e.target.value),
                  placeholder: "Nomor BPJS Kesehatan",
                  className: "input input-sm rounded-sm input-bordered"
                }
              ),
              errors.no_bpjs_kesehatan && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.no_bpjs_kesehatan })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-control mt-2", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text", children: "File BPJS Kesehatan : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  name: "file_bpjs_kesehatan",
                  accept: ".pdf,*",
                  onChange: (e) => setData("file_bpjs_kesehatan", e.target.files[0]),
                  className: "file-input file-input-sm rounded-sm file-input-bordered"
                }
              ),
              errors.file_bpjs_kesehatan && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.file_bpjs_kesehatan })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text", children: "No BPJS Ketenaga Kerjaan : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "no_bpjs_ketenaga",
                  value: data.no_bpjs_ketenaga,
                  onChange: (e) => setData("no_bpjs_ketenaga", e.target.value),
                  placeholder: "Nomor BPJS Ketenaga Kerjaan",
                  className: "input input-sm rounded-sm input-bordered"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
              /* @__PURE__ */ jsx("span", { className: "label-text", children: "File BPJS Ketenaga Kerjaan : " }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  name: "file_bpjs_ketenaga",
                  accept: ".pdf,*",
                  onChange: (e) => setData("file_bpjs_ketenaga", e.target.files[0]),
                  className: "file-input file-input-sm rounded-sm file-input-bordered"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2 w-full my-10 sm:my-0", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: processing,
                  className: "btn btn-sm w-1/2 rounded-sm bg-orange-400 hover:bg-orange-600 hover:text-white transition-all ease-in-out duration-150",
                  children: "Simpan"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => cancel(e),
                  className: "btn btn-sm w-[10.5rem] rounded-sm bg-red-400 hover:bg-red-600 hover:text-white transition-all ease-in-out duration-150",
                  children: "Cancel"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-control", children: [
            /* @__PURE__ */ jsx("span", { className: "label-text", children: "Jenis BPJS : " }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-flow-col grid-cols-1", children: /* @__PURE__ */ jsxs("div", { className: " bg-white rounded-sm outline-2 outline-lime-100", children: [
              /* @__PURE__ */ jsxs("label", { className: "label cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text", children: "JKK" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    name: "jkk",
                    chacked: jenisBpjs.jkk,
                    onChange: handleCheckboxChange,
                    type: "checkbox",
                    className: "checkbox checkbox-sm rounded-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "label cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text mx-1", children: "JKM" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    name: "jkm",
                    chacked: jenisBpjs.jkm,
                    onChange: handleCheckboxChange,
                    className: "checkbox checkbox-sm rounded-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "label cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text mx-1", children: "JHT" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    name: "jht",
                    chacked: jenisBpjs.jht,
                    onChange: handleCheckboxChange,
                    className: "checkbox checkbox-sm rounded-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "label cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text mx-1", children: "JP" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    name: "jp",
                    chacked: jenisBpjs.jp,
                    onChange: handleCheckboxChange,
                    className: "checkbox checkbox-sm rounded-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "label cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { className: "label-text mx-1", children: "JKP" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    name: "jkp",
                    chacked: jenisBpjs.jkp,
                    onChange: handleCheckboxChange,
                    className: "checkbox checkbox-sm rounded-sm"
                  }
                )
              ] })
            ] }) })
          ] })
        ]
      }
    ) })
  ] });
}
export {
  CreateEmploye as default
};
