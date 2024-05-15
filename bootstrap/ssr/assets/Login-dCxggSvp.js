import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { G as Guest } from "./GuestLayout-6C--fd8Y.js";
import { I as InputError } from "./TextInput-DqQN-yCl.js";
import { useForm, Head } from "@inertiajs/react";
import "react-icons/bi/index.esm.js";
function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    password: "",
    remember: false
  });
  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("login"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { className: "input input-bordered flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 16 16",
              fill: "currentColor",
              className: "w-4 h-4 opacity-70",
              children: /* @__PURE__ */ jsx("path", { d: "M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" })
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: "grow border-none rounded-md",
              placeholder: "Username",
              autoComplete: "username",
              isFocused: true,
              onChange: (e) => setData("name", e.target.value),
              name: "name",
              value: data.name
            }
          )
        ] }),
        /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxs("label", { className: "input input-bordered flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 16 16",
              fill: "currentColor",
              className: "w-4 h-4 opacity-70",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z",
                  clipRule: "evenodd"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              className: "grow border-none rounded-md",
              id: "password",
              placeholder: "Password",
              name: "password",
              value: data.password,
              autoComplete: "current-password",
              onChange: (e) => setData("password", e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "btn text-white hover:text-orange-500 font-semibold text-lg btn-block my-2 bg-orange-500 hover:bg-orange-300 rounded-full",
          children: "Log In"
        }
      )
    ] })
  ] });
}
export {
  Login as default
};
