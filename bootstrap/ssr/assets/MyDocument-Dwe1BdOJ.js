import { jsx, jsxs } from "react/jsx-runtime";
import { StyleSheet, Document, Page, View, Text } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 5,
    fontSize: 5
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    fontSize: 5
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    textAlign: "center",
    fontSize: 5
  },
  tableRow: {
    flexDirection: "row",
    fontSize: 5
  },
  tableColHeader: {
    width: "12%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#EEE",
    fontSize: 5
  },
  tableColHeaderNo: {
    width: "5%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#EEE",
    fontSize: 5
  },
  tableCol: {
    width: "12%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: 5
  },
  tableColNo: {
    width: "5%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: 5
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 8
  },
  tableCell: {
    margin: 5,
    fontSize: 8
  },
  tableBpjs: {
    margin: 5,
    fontSize: 8,
    textTransform: "uppercase"
  }
});
const MyDocument = ({ employe }) => /* @__PURE__ */ jsx(Document, { children: /* @__PURE__ */ jsx(Page, { size: "A4", style: styles.page, orientation: "landscape", children: /* @__PURE__ */ jsx(View, { style: styles.section, children: /* @__PURE__ */ jsxs(View, { style: styles.table, children: [
  /* @__PURE__ */ jsxs(View, { style: styles.tableRow, children: [
    /* @__PURE__ */ jsx(View, { style: styles.tableColHeaderNo, children: /* @__PURE__ */ jsx(Text, { style: styles.tableCellHeader, children: "No" }) }),
    /* @__PURE__ */ jsx(View, { style: styles.tableColHeader, children: /* @__PURE__ */ jsx(Text, { style: styles.tableCellHeader, children: "Name" }) }),
    /* @__PURE__ */ jsx(View, { style: styles.tableColHeader, children: /* @__PURE__ */ jsx(Text, { style: styles.tableCellHeader, children: "TTL" }) }),
    /* @__PURE__ */ jsx(View, { style: styles.tableColHeader, children: /* @__PURE__ */ jsx(Text, { style: styles.tableCellHeader, children: "No. KTP" }) }),
    /* @__PURE__ */ jsx(View, { style: styles.tableColHeader, children: /* @__PURE__ */ jsx(Text, { style: styles.tableCellHeader, children: "No. KK" }) }),
    /* @__PURE__ */ jsx(View, { style: styles.tableColHeader, children: /* @__PURE__ */ jsx(Text, { style: styles.tableCellHeader, children: "Mitra" }) }),
    /* @__PURE__ */ jsx(View, { style: styles.tableColHeader, children: /* @__PURE__ */ jsx(Text, { style: styles.tableCellHeader, children: "Jenis BPJS" }) }),
    /* @__PURE__ */ jsx(View, { style: styles.tableColHeader, children: /* @__PURE__ */ jsx(Text, { style: styles.tableCellHeader, children: "NO. BPJS Kesehatan" }) }),
    /* @__PURE__ */ jsx(View, { style: styles.tableColHeader, children: /* @__PURE__ */ jsx(Text, { style: styles.tableCellHeader, children: "NO. BPJS Ketenaga Kerjaan" }) })
  ] }),
  employe == null ? void 0 : employe.map((emp, i) => /* @__PURE__ */ jsxs(View, { style: styles.tableRow, children: [
    /* @__PURE__ */ jsx(View, { style: styles.tableColNo, children: /* @__PURE__ */ jsx(Text, { style: styles.tableCell, children: i + 1 }) }),
    /* @__PURE__ */ jsx(View, { style: styles.tableCol, children: /* @__PURE__ */ jsx(Text, { style: styles.tableCell, children: emp.name }) }),
    /* @__PURE__ */ jsx(View, { style: styles.tableCol, children: /* @__PURE__ */ jsx(Text, { style: styles.tableCell, children: emp.ttl }) }),
    /* @__PURE__ */ jsx(View, { style: styles.tableCol, children: /* @__PURE__ */ jsx(Text, { style: styles.tableCell, children: emp.no_ktp }) }),
    /* @__PURE__ */ jsx(View, { style: styles.tableCol, children: /* @__PURE__ */ jsx(Text, { style: styles.tableCell, children: emp.no_kk }) }),
    /* @__PURE__ */ jsx(View, { style: styles.tableCol, children: /* @__PURE__ */ jsx(Text, { style: styles.tableCell, children: emp.client ? emp.client.name : "~" }) }),
    /* @__PURE__ */ jsx(View, { style: styles.tableCol, children: /* @__PURE__ */ jsx(Text, { style: styles.tableBpjs, children: emp.jenis_bpjs.length > 0 ? emp.jenis_bpjs.join(", ") : "~" }) }),
    /* @__PURE__ */ jsx(View, { style: styles.tableCol, children: /* @__PURE__ */ jsx(Text, { style: styles.tableCell, children: emp.no_bpjs_kesehatan || "~" }) }),
    /* @__PURE__ */ jsx(View, { style: styles.tableCol, children: /* @__PURE__ */ jsx(Text, { style: styles.tableCell, children: emp.no_bpjs_ketenaga || "~" }) })
  ] }, i))
] }) }) }) });
export {
  MyDocument as default
};
