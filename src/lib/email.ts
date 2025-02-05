import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendInvoiceEmail(to: string, subject: string, text: string, pdfBuffer: Buffer) {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to,
    subject,
    text,
    attachments: [
      {
        filename: "factura.pdf",
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📩 Correo enviado correctamente");
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
  }
}
