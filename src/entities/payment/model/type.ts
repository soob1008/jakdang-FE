import { Author } from "@/entities/author/model/types";
import { Writing } from "@/entities/work/model/type";

interface Payment {
  id: string;
  user: Author;
  writing: Writing;
  amount: number;
  status: PaymentStatus;
  paid_at: Date;
  is_viewd: boolean;
  refundable_until: Date;
}

type PaymentStatus = "paid" | "refunded" | "cancelled";

export type { Payment };
