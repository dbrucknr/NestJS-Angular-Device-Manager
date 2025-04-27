export type Device = {
  id: number;
  serialNumber: string;
  macAddress: string;
  platform: string;
  osVersion: string;
  status: string;
  createdDate: Date;
  updatedDate: Date;
};

export type PaginatedDeviceResponse = {
  devices: Device[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
