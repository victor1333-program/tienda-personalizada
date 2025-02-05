// src/components/InvoicePDF.tsx
"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface Invoice {
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  total: number;
  tax: number;
  createdAt: string;
  status: "paid" | "pending";
}

interface InvoicePDFProps {
  invoice: Invoice;
}

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  section: { marginBottom: 10 },
  header: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  text: { marginBottom: 5 },
  statusPaid: { color: "green" },
  statusPending: { color: "red" },
});

const InvoicePDF = ({ invoice }: InvoicePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>📄 Factura #{invoice.invoiceNumber}</Text>
        <Text style={styles.text}>Cliente: {invoice.clientName}</Text>
        <Text style={styles.text}>Correo: {invoice.clientEmail}</Text>
        <Text style={styles.text}>
          Fecha: {new Date(invoice.createdAt).toLocaleDateString()}
        </Text>
        <Text style={invoice.status === "paid" ? styles.statusPaid : styles.statusPending}>
          Estado: {invoice.status === "paid" ? "✅ Pagada" : "⌛ Pendiente"}
        </Text>
        <Text style={styles.text}>IVA: {invoice.tax}%</Text>
        <Text style={styles.text}>Total: €{invoice.total.toFixed(2)}</Text>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;
