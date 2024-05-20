import React from "react";
import { parseISO } from "date-fns";

function TimeDiffcomponent(props) {
  console.log("DIFF COMPONENT", props);

  return (
    <>
      {props.absensi?.map(
        (abs, i) => {
          return abs.user_id;
        }
        // logus.id == abs.user_id && us.nama_lengkap;
      )}
    </>
  );
}

export default TimeDiffcomponent;
