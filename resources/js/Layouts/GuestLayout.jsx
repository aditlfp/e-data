import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-white">
      <div className="flex flex-col bg-orange-100 shadow-md p-3 text-center rounded-md">
        <div className="rounded-full p-4 bg-orange-500">
          <Link href="/">
            <ApplicationLogo className="w-20 h-20 fill-current text-white" />
          </Link>
        </div>
        <span className="font-black flex flex-col mt-2 capitalize">
          SAC
          <span>DataCenter</span>
        </span>
      </div>

      <div className="w-full sm:max-w-md mt-6 px-6 py-4 overflow-hidden sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
