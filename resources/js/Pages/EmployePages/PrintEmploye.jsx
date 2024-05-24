import React, { useRef } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Head } from "@inertiajs/react";
import MyDocument from "../Admin/Component/MyDocument";

function PrintEmploye(props) {
  return (
    <>
      <Head title="Export - Employes" />
      <div className="w-screen h-screen">
        <PDFViewer width="100%" height="100%">
          <MyDocument employe={props?.employe} />
        </PDFViewer>
      </div>
    </>
  );
}

export default PrintEmploye;
