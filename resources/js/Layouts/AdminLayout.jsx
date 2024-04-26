import Footer from "@/Components/Footer";
import Sidebar from "@/Pages/Admin/Component/Sidebar";
import React from "react";
import { BiExtension } from "react-icons/bi";
import { ToastContainer } from "react-toastify";

function AdminLayout({ children, overflow }) {
  return (
    <>
      <div
        className={`flex ${overflow ? overflow : "overflow-auto"} bg-gray-200`}
      >
        <Sidebar link={"employes.index"} value={"Employes Data"}>
          {<BiExtension />}
        </Sidebar>
        <div className=" w-screen p-10 min-h-screen">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition:Bounce
          />
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminLayout;
