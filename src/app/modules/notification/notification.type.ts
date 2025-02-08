export default interface NotificationType {
  _id: string;
  order_id: string;
  product_id: string;
  user_id: string;
  message: string;
  image: string;
  status: "show" | "hide";
  created_at: Date;
  updated_at: Date;
  __v: number;
}
