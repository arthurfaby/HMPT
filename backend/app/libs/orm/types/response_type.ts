export type APIResponse<T> = {
  command: string;
  rowCount: number;
  oid: number;
  rows: T[];
  fields: [
    {
      name: string;
      tableID: number;
      columnID: number;
      dataTypeID: number;
      dataTypeSize: number;
      dataTypeModifier: number;
      format: string;
    },
  ];
  rowAsArray: boolean;
};
