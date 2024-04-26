import { Link, useForm } from "@inertiajs/react";
import { BiSolidLockOpenAlt } from "react-icons/bi";

function Sidebar({ link, value, children }) {
  const { post } = useForm({});

  const signOut = () => {
    post(route("logout"));
  };
  return (
    <>
      <div className="bg-orange-100 min-h-screen w-52 justify-start items-start px-3">
        <div className="text-center font-black text-xl bg-orange-600 p-5 rounded-b-lg shadow-sm text-white">
          <span>E-DATA</span>
        </div>
        <Link
          href={route(`${link}`)}
          className="bg-orange-300 flex hover:text-gray-100 hover:bg-orange-400 transition-all items-center gap-x-4 font-bold ease-in-out duration-150 my-10 py-2 px-3 rounded-sm justify-center text-sm cursor-pointer"
        >
          <div className="text-lg">{children}</div>
          {value}
        </Link>
        <button
          type="button"
          onClick={() => signOut()}
          className="btn btn-sm rounded-sm text-red-900 bg-red-400 hover:bg-red-500 w-full hover:text-white"
        >
          <BiSolidLockOpenAlt />
          Sign Out
        </button>
      </div>
    </>
  );
}

export default Sidebar;
