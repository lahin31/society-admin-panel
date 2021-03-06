export type Society = {
  description: string;
  events: [];
  name: string;
  notices: [];
  _id: string;
};

export type Event = {
  createBy: any;
  date: string;
  description: string;
  time: string;
  title: string;
  _id: string;
};

export type Notice = {
  _id: string;
  title: string;
  description: string;
  createdBy: any;
};
