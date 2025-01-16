"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useProductStore from "@/stores/product.store";
import { productSchema, Product } from "@/schemas/product.shema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

// Define type for form data
type FormData = z.infer<typeof productSchema>;

type CategoryDropdownProps = {
  value: string;
  onChange: (value: string) => void;
};

function CategoryDropdown({ value, onChange }: CategoryDropdownProps) {
  const categories = ["Bottle", "Chair", "Table"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative w-full">
          <Input
            value={value}
            placeholder="Select Category"
            readOnly
            className="cursor-pointer"
          />
          {/* Downward Arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-full mt-1 rounded-md bg-white shadow-lg"
        align="start"
      >
        {categories.map((category) => (
          <DropdownMenuCheckboxItem
            key={category}
            checked={value === category}
            onCheckedChange={() => onChange(category)}
            className="hover:bg-gray-100 p-2"
          >
            {category}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function CreateProductForm() {
  const { addProduct } = useProductStore(); // Access store action
  const [alertMessage, setAlertMessage] = useState(""); // State to manage alert messages
  const [isLoading, setIsLoading] = useState(false); // State to manage button loading state

  const form = useForm<FormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productSerialNumber: "",
      productName: "",
      companyName: "",
      category: "Select", // default value for dropdown
      stock: 1,
      price: 1,
      wholesaleDiscount: undefined,
      normalDiscount: undefined,
      specialDiscount: undefined,
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      setIsLoading(true); // Set loading state to true
      await addProduct(values); // Call store action to add product
      setAlertMessage("Product added successfully!"); // Set success message
      form.reset(); // Reset the form after successful submission
      setTimeout(() => setAlertMessage(""), 3000); // Clear alert after 3 seconds
    } catch (error: any) {
      console.error("Error adding product:", error);
      setAlertMessage(error.message || "Failed to add product.");
    } finally {
      setIsLoading(false); // Set loading state back to false after API call finishes
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <h4 className="text-xl font-semibold text-center mb-6">
          Add New Product
        </h4>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Product Serial Number */}
            <FormField
              control={form.control}
              name="productSerialNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Serial Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Product Serial Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Name and Company Name (Parallel) */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Product Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Company Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Category Dropdown with Add Category Button */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <CategoryDropdown
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button variant="outline" className="mt-8 whitespace-nowrap">
                Add Category
              </Button>
            </div>

            {/* Stock and Price (Parallel) */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Stock"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Price"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Wholesale, Normal, and Special Discount (Parallel) */}
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="wholesaleDiscount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wholesale Discount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Wholesale Discount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="normalDiscount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Normal Discount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Normal Discount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialDiscount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Discount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Special Discount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? "Creating..." : "Create Product"} {/* Show loading text */}
            </Button>
          </form>
        </Form>

        {/* Alert Message */}
        {alertMessage && (
          <div className="mt-4 text-center text-green-600 font-medium">
            {alertMessage}
          </div>
        )}
      </div>
    </div>
  );
}
