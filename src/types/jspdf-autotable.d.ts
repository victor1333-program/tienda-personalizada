// src/types/jspdf-autotable.d.ts
declare module "jspdf" {
    interface jsPDF {
      lastAutoTable: { finalY: number };
      autoTable: (options: {
        head: string[][];
        body: (string | number)[][];
        startY?: number;
        theme?: "striped" | "grid" | "plain";
        styles?: Record<string, unknown>;
        columnStyles?: Record<number, Record<string, unknown>>;
        margin?: { top?: number; left?: number; right?: number; bottom?: number };
      }) => void;
    }
  }
  