export type PaymentMethod = "stripe" | "razorpay" | "paypal";
export type PaymentStatus = "pending" | "success" | "failed" | "refunded";
export type PaymentType = "appointment" | "blood_request" | "service";

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  type: PaymentType;
  provider_ref?: string;
  description?: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  payment_id: string;
  invoice_number: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  created_at: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}
