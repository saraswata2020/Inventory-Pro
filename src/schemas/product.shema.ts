import { z } from "zod";

export const productSchema = z.object({
  productSerialNumber: z
    .string()
    .min(1, { message: "Product Serial Number is required" }),
  productName: z
    .string()
    .min(1, { message: "Product Name is required" }),
  companyName: z
    .string()
    .min(1, { message: "Company Name is required" }),
  category: z
    .string()
    .min(1, { message: "Category is required" }),
  stock: z
    .number()
    .positive({ message: "Stock must be a positive number" })
    .min(1, { message: "Stock must be at least 1" }),
  price: z
    .number()
    .positive({ message: "Price must be a positive number" })
    .min(1, { message: "Price must be at least 1" }),
  wholesaleDiscount: z
    .number()
    .positive({ message: "Wholesale Discount must be a positive number" })
    .optional(),
  normalDiscount: z
    .number()
    .positive({ message: "Normal Discount must be a positive number" })
    .optional(),
  specialDiscount: z
    .number()
    .positive({ message: "Special Discount must be a positive number" })
    .optional(),
});
// Type inference from the schema
export type Product = z.infer<typeof productSchema>;
