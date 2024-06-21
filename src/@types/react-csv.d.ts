// src/@types/react-csv.d.ts
declare module 'react-csv' {
    export const CSVLink: React.ComponentType<{
      data: any;
      filename?: string;
      headers?: string[];
      separator?: string;
      enclosingCharacter?: string;
      uFEFF?: boolean;
      target?: string;
      children?: React.ReactNode;
    }>;
  
    export const CSVDownload: React.ComponentType<{
      data: any;
      filename?: string;
      headers?: string[];
      separator?: string;
      enclosingCharacter?: string;
      uFEFF?: boolean;
      target?: string;
    }>;
  }
  