declare module 'pdf-lib' {
    export class PDFDocument {
      static create(): Promise<PDFDocument>;
      addPage(): PDFPage;
      save(): Promise<Uint8Array>;
    }
  
    export class PDFPage {
      drawText(text: string, options?: { x: number; y: number; size?: number; color?: PDFColor }): void;
    }
  
    export interface PDFColor {
      red: number;
      green: number;
      blue: number;
    }
  
    export function rgb(r: number, g: number, b: number): PDFColor;
  }
  