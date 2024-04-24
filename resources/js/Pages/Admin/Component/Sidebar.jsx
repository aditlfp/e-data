import { Link } from "@inertiajs/react";

function Sidebar({ link, value, children }) {
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
      </div>
    </>
  );
}

export default Sidebar;
