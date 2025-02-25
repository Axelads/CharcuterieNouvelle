"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; // ✅ Import de next/image
import pb from "@/lib/pocketbase";
import "@/styles/pages/_produits.scss";

export default function Produits() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    async function fetchProduits() {
      const records = await pb.collection("Produits").getFullList({ sort: "-created" });
      setProduits(records);
    }
    fetchProduits();
  }, []);

  return (
    <div className="produits-container">
      <h1>Nos Produits</h1>
      <div className="produits-list">
        {produits.map((produit) => (
          <div key={produit.id} className="produit-item">
            {/* ✅ Remplacement de <img> par <Image /> */}
            <Image
              src={pb.files.getUrl(produit, produit.image)}
              alt={produit.nom}
              width={250} // Définir une largeur
              height={250} // Définir une hauteur
              objectFit="cover"
            />
            <h2>{produit.nom}</h2>
            <p>{produit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
