import { create } from "zustand";
import axios from "axios";
import { productSchema, Product } from "@/schemas/product.shema";

type ProductStore = {
  products: Product[];
  loading: boolean;
  error: string | null;

  loadProducts: () => Promise<void>;
  addProduct: (newProduct: Product) => Promise<void>;
  updateProduct: (productId: string, updatedData: Partial<Product>) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
};

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,

  loadProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("http://localhost:5000/api/products");

      if (response.data.statusCode === 200) {
        const validatedProducts = response.data.data.map((product: any) =>
          productSchema.parse(product)
        );
        set({ products: validatedProducts, loading: false });
      } else {
        set({ error: response.data.message, loading: false });
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to load products",
        loading: false,
      });
    }
  },

  addProduct: async (newProduct) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/products/create",
        newProduct
      );
      
      if (response.data.statusCode === 201) {
        const validatedProduct = productSchema.parse(response.data.data);
        set((state) => ({
          products: [...state.products, validatedProduct],
          loading: false,
        }));
      } else {
        set({ error: response.data.message, loading: false });
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to add product",
        loading: false,
      });
    }
  },

  updateProduct: async (productId, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${productId}`,
        updatedData
      );
      
      if (response.data.statusCode === 200) {
        const validatedProduct = productSchema.parse(response.data.data);
        set((state) => ({
          products: state.products.map((product) =>
            product.productSerialNumber === productId ? validatedProduct : product
          ),
          loading: false,
        }));
      } else {
        set({ error: response.data.message, loading: false });
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to update product",
        loading: false,
      });
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/products/${productId}`
      );
      
      if (response.data.statusCode === 200) {
        set((state) => ({
          products: state.products.filter(
            (product) => product.productSerialNumber !== productId
          ),
          loading: false,
        }));
      } else {
        set({ error: response.data.message, loading: false });
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to delete product",
        loading: false,
      });
    }
  },
}));

export default useProductStore;
