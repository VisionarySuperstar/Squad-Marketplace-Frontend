interface Message {
  id: number;
  from: string;
  to: string;
  type: string;
  time: string;
  status: string;
  message: string;
}

export default Message;
