import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 5,
    fontSize: 5,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    fontSize: 5,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    textAlign: "center",
    fontSize: 5,
  },
  tableRow: {
    flexDirection: "row",
    fontSize: 5,
  },
  tableColHeader: {
    width: "12%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "white",
    fontSize: 5,
  },
  tableColHeaderNo: {
    width: "5%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "white",
    fontSize: 5,
  },
  tableCol: {
    width: "12%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: 5,
  },
  tableColNo: {
    width: "5%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: 5,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 8,
  },
  tableCell: {
    margin: 5,
    fontSize: 8,
  },
  tableBpjs: {
    margin: 5,
    fontSize: 8,
    textTransform: "uppercase",
  },
});

const MyDocument = ( {props} ) => {
  return (
      <Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      <View style={styles.section}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeaderNo}>
              <Text style={styles.tableCellHeader}>No</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Name</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>TTL</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>No. KTP</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>No. KK</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Mitra</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Jenis BPJS</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>NO. BPJS Kesehatan</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>
                NO. BPJS Ketenaga Kerjaan
              </Text>
            </View>
          </View>
          {props?.employe?.map((emp, i) => (
            <View style={styles.tableRow} key={i}>
              <View style={styles.tableColNo}>
                <Text style={styles.tableCell}>{i + 1}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{emp.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{emp.ttl}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{emp.no_ktp}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{emp.no_kk}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {emp.client ? emp.client.name : "~"}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableBpjs}>
                  {emp.jenis_bpjs?.length > 0 ? emp.jenis_bpjs.join(", ") : "~"}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {emp.no_bpjs_kesehatan || "~"}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {emp.no_bpjs_ketenaga || "~"}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>

  )
};

export default MyDocument;
