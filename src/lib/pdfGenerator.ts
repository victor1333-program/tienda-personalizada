import PDFDocument from "pdfkit";
import fs from "fs";

// 📌 Definimos el tipo de los datos de la factura
interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

interface InvoiceData {
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export async function generateInvoicePDF(invoiceData: InvoiceData): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const filePath = `./public/invoices/${invoiceData.invoiceNumber}.pdf`;
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      doc.fontSize(20).text("Factura", { align: "center" });
      doc.moveDown();
      doc.fontSize(14).text(`Número de factura: ${invoiceData.invoiceNumber}`);
      doc.text(`Cliente: ${invoiceData.clientName}`);
      doc.text(`Email: ${invoiceData.clientEmail}`);
      doc.moveDown();

      doc.fontSize(12).text("Detalles:");
      invoiceData.items.forEach((item: InvoiceItem) => {
        doc.text(`${item.name} - ${item.quantity} x ${item.price}€`);
      });

      doc.moveDown();
      doc.text(`Subtotal: ${invoiceData.subtotal}€`);
      doc.text(`IVA: ${invoiceData.tax}€`);
      doc.text(`Total: ${invoiceData.total}€`);

      doc.end();
      stream.on("finish", () => resolve(filePath));
    } catch (error) {
      reject(error);
    }
  });
}
