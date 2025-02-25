"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import pb from "@/lib/pocketbase";
import ProductCard from "./ProductCard";

export default function SeasonalProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // ✅ Désactivation de l'auto-cancellation
        const records = await pb.collection("Produits").getFullList({
          sort: "-created",
          $autoCancel: false, // ✅ Empêche l'annulation automatique
        });
        setProducts(records);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="loading">Chargement des produits de saison...</p>;
  }

  return (
    <section className="seasonal-products">
      <h2>Produits de Saison</h2>
      <div className="products-container">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                title: product.nom,
                image: pb.files.getUrl(product, product.image), // Récupération de l'image depuis PocketBase
                description: product.description,
              }}
            />
          ))
        ) : (
          <p className="no-products">Aucun produit de saison disponible.</p>
        )}
      </div>
    </section>
  );
}
