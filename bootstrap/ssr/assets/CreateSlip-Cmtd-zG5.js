import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import HeadNavigation from "./HeadNavigation-C5ShT8hy.js";
import { A as AdminLayout } from "./AdminLayout-BBNDZYJL.js";
import "react";
import { FormatRupiah } from "@arismun/format-rupiah";
import { toast } from "react-toastify";
import "./Sidebar-CW9JvTre.js";
import "react-icons/bi/index.esm.js";
import "framer-motion";
function CreateSlip(props) {
  console.log(props);
  const { data, setData, post, get, processing, errors, reset } = useForm({
    users: props.user.map((us) => ({
      nama_lengkap: us.nama_lengkap,
      devisi_id: us.devisi_id,
      formasi: us.devisi.name,
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
      total: 0
    }))
  });
  const calculateTotal = (user) => {
    const {
      gaji_pokok,
      gaji_lembur,
      tj_jabatan,
      tj_kehadiran,
      tj_kinerja,
      bpjs,
      pinjaman,
      lain_lain
    } = user;
    return ((parseFloat(gaji_pokok) || 0) + (parseFloat(gaji_lembur) || 0) + (parseFloat(tj_jabatan) || 0) + (parseFloat(tj_kehadiran) || 0) + (parseFloat(tj_kinerja) || 0) - (parseFloat(bpjs) || 0) - (parseFloat(pinjaman) || 0) - (parseFloat(lain_lain) || 0)).toFixed(2);
  };
  const handleChange = (index, field, value) => {
    const newUsers = [...data.users];
    newUsers[index][field] = value;
    newUsers[index].total = calculateTotal(newUsers[index]);
    setData("users", newUsers);
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("slip-gaji.store"), {
      onSuccess: () => toast.success("Berhasil Menambahkan Data !", {
        theme: "colored"
      })
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(AdminLayout, { children: [
      /* @__PURE__ */ jsx(Head, { title: "Slip Gaji - Create" }),
      /* @__PURE__ */ jsx(HeadNavigation, { title: "Slip Gaji - Create" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col  gap-2 my-4 items-start", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-lg", children: "Tambah Slip Gaji" }),
          /* @__PURE__ */ jsxs("p", { className: "font-bold text-base", children: [
            "Mitra: ",
            props.client.client.name
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "font-bold text-base", children: [
            "Bulan: ",
            props.bulan
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-start mt-1", children: /* @__PURE__ */ jsx(
          Link,
          {
            href: route("slip-gaji.index"),
            className: "btn bg-orange-600 btn-sm text-white hover:text-orange-600 rounded-sm",
            children: "Kembali"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "", children: [
        /* @__PURE__ */ jsx("form", { onSubmit: submit, className: "overflow-x-scroll", children: /* @__PURE__ */ jsxs("table", { className: "table table-zebra table-xs my-5 text-center", children: [
          /* @__PURE__ */ jsxs("thead", { className: "text-[10px]", children: [
            /* @__PURE__ */ jsxs("tr", { className: "bg-orange-600 text-white capitalize", children: [
              /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", colSpan: 3, children: "Data Karyawan" }),
              /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", colSpan: 2, children: "Gaji" }),
              /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", colSpan: 3, children: "Tunjangan" }),
              /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", colSpan: 4, children: "Potongan" }),
              /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", colSpan: 1, children: "Total" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { className: "bg-orange-600 text-white capitalize", children: [
              /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Karyawan" }),
              /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Formasi" }),
              /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "MK" }),
              /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Pokok" }),
              /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Lembur" }),
              /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Jabatan" }),
              /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Kehadiran" }),
              /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Kinerja" }),
              /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "BPJS" }),
              /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Pinjaman" }),
              /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Absen" }),
              /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Lain-lain" }),
              /* @__PURE__ */ jsx("th", { className: "border-x-[1px] border-orange-300", children: "Total" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("tbody", { className: "text-[10px]", children: data.users.map((us, index) => {
            console.log(us);
            return /* @__PURE__ */ jsxs("tr", { className: "border-[1px] border-orange-300 ", children: [
              /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: us.nama_lengkap }),
              /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: /* @__PURE__ */ jsx("span", { children: us.formasi }) }),
              [
                "mk",
                "gaji_pokok",
                "gaji_lembur",
                "tj_jabatan",
                "tj_kehadiran",
                "tj_kinerja",
                "bpjs",
                "pinjaman",
                "absen",
                "lain_lain"
              ].map((field) => /* @__PURE__ */ jsxs(
                "td",
                {
                  className: "border-[1px] border-orange-300 min-w-[95px]",
                  children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: us[field],
                        type: "number",
                        className: "input input-xs input-bordered w-full",
                        value: us[field],
                        inputMode: "numeric",
                        onChange: (e) => handleChange(index, field, e.target.value)
                      }
                    ),
                    errors[field] && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors[field] })
                  ]
                },
                field
              )),
              /* @__PURE__ */ jsx("td", { className: "border-[1px] border-orange-300", children: /* @__PURE__ */ jsx(FormatRupiah, { value: us.total }) })
            ] }, index);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: submit,
            className: "btn bg-orange-600 btn-sm text-white hover:text-orange-600 rounded-sm",
            children: "Submit"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
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
      ` })
  ] });
}
export {
  CreateSlip as default
};
