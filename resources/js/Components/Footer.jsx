import React from "react";

function Footer(props) {
  return (
    <>
      <footer className="footer fixed bottom-0 z-20 h-10 footer-center p-4 bg-gray-300 text-base-content">
        <aside>
          <p className="text-sm">
            Copyright © {new Date().getFullYear()} - All right reserved by PT.
            SAC Ponorogo Design And Code by Aditya & Syafi
          </p>
        </aside>
      </footer>
    </>
  );
}

export default Footer;
