export interface Gateway {
  _id: string;
  serial: string;
  human_readable_name: string;
  ipv4_address: string;
  devices: Device[];
}

export interface Device {
  _id?: string;
  vendor: string;
  status: string;
  create_date: string;
}
