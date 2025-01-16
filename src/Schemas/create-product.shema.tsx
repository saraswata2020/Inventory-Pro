import { z } from "zod";

export const CreateProductSchema = z.object({
  productSerialNumber: z.string().nonempty(),
  productName: z.string().nonempty(),
  companyName: z.string().nonempty(),
  category: z.string().nonempty(),
  stock: z.number().positive(),
  price: z.number().positive(),
  wholesaleDiscount: z.number().positive().optional(),
  normalDiscount: z.number().positive().optional(),
  specialDiscount: z.number().positive().optional(),
});
