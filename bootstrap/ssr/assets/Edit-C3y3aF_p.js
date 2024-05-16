import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-BwgaERF5.js";
import DeleteUserForm from "./DeleteUserForm-ChEnN-Yb.js";
import UpdatePasswordForm from "./UpdatePasswordForm-Dv4fd9xr.js";
import UpdateProfileInformation from "./UpdateProfileInformationForm-Ck5ORd2C.js";
import { Head } from "@inertiajs/react";
import "./AdminLayout-B1z_bIYh.js";
import "react";
import "./Sidebar-BZBlB_YE.js";
import "react-icons/bi/index.esm.js";
import "framer-motion";
import "react-toastify";
import "./TextInput-DqQN-yCl.js";
import "./InputLabel-uXgJWz9w.js";
import "@headlessui/react";
import "./PrimaryButton-BVytxmEe.js";
function Edit({ auth, mustVerifyEmail, status }) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Profile" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Profile" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(
            UpdateProfileInformation,
            {
              mustVerifyEmail,
              status,
              className: "max-w-xl"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
        ] }) })
      ]
    }
  );
}
export {
  Edit as default
};
