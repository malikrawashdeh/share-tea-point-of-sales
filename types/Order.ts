import { drinks } from "@prisma/client";

export type Order = {
  order_id: number;
  total_price: number;
  name: string;
  user_id: number;
  created_at: Date;
  created_time: string;
  drinks: drinks[];
};
