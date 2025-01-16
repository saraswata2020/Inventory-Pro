// src/app/products/edit/[id]/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function EditProduct({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  return (
    <div>
      <h1>Edit Product: {id}</h1>
      {/* Add logic to fetch product details by ID and edit */}
    </div>
  );
}
