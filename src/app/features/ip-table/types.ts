export type Route = {
  uuid: string;
  address: string;
  mask: string;
  gateway: string;
  interface: string;
};

export type RouteTableRow = {
  uuid: string;
  destination: string;
  gateway: string;
  interface: string;
};
