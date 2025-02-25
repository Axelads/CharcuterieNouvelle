"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className={`product-card ${hovered ? "hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <div className="product-image">
        <Image src={product.image} alt={product.title} width={300} height={200} />
      </div>
    </div>
  );
}
