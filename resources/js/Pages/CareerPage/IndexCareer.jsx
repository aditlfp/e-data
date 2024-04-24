import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import HeadNavigation from "../Admin/Component/HeadNavigation";

function IndexCareer(props) {
  console.log(props);
  return (
    <AdminLayout>
      <Head title="Karir show - Karir" />
      <HeadNavigation title={"Karir show - Karir"} />
      <div className="mt-10">
        <p className="text-xl font-bold capitalize">
          Riwayat Karir {props?.career?.employe?.name}
        </p>
        <div className="mt-10">
          <p className="font-semibold text-lg">~ Jenjang Karir</p>
          <ul className="steps steps-vertical">
            <li className="step step-primary ml-5 capitalize font-semibold">
              <div className="flex flex-col justify-start items-start py-3 gap-4">
                <p>{props.career.jenjang_karir}</p>
                <a
                  disabled={props.career.file_sk_kontrak ? false : true}
                  href={
                    props.career.file_sk_kontrak
                      ? "/storage/sk_kontrak/" + props.career.file_sk_kontrak
                      : "#"
                  }
                  className={`${"btn btn-xs rounded-sm bg-orange-300 hover:bg-orange-400"}`}
                  // download={props.career.leader ? true : undefined}
                  target="_blank"
                >
                  Download SK Kontrak
                </a>
              </div>
            </li>

            <li className="step step-primary ml-5">
              <a
                disabled={props.career.leader ? false : true}
                href={
                  props.career.leader
                    ? "/storage/sk_kontrak/" + props.career.leader
                    : "#"
                }
                className={`${"btn btn-xs rounded-sm bg-orange-300 hover:bg-orange-400"}`}
                // download={props.career.leader ? true : undefined}
                target="_blank"
              >
                Download SK Leader
              </a>
            </li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}

export default IndexCareer;
