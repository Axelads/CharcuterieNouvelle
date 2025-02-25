"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; // ✅ Utilisation de next/image
import pb from "@/lib/pocketbase";
import { useRouter } from "next/navigation";

export default function AdminProduits() {
  const [produits, setProduits] = useState([]);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // ✅ Aperçu de l'image
  const [error, setError] = useState(""); // ✅ Gestion des erreurs
  const router = useRouter();

  // ✅ Liste des catégories définies
  const categories = ["Charcuterie", "Viande", "Plats préparés", "Produits Noël"];

  useEffect(() => {
    async function fetchProduits() {
      try {
        const records = await pb.collection("Produits").getFullList({
          sort: "-created",
          $autoCancel: false, // ✅ Empêche l’annulation automatique
        });
        setProduits(records);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    }
  
    fetchProduits();
  }, []);
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom || !description || !categorie || !image) {
      setError("Tous les champs doivent être remplis !");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("description", description);
    formData.append("categorie", categorie);
    formData.append("image", image);

    try {
      await pb.collection("Produits").create(formData);
      alert("Produit ajouté !");
      router.refresh();
      setNom("");
      setDescription("");
      setCategorie("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
      setError("Une erreur est survenue, veuillez réessayer.");
    }
  };

  return (
    <div className="admin-produits">
      <h1>Gestion des Produits</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        
        {/* ✅ Remplacement de l'input texte par un select */}
        <select value={categorie} onChange={(e) => setCategorie(e.target.value)} required>
          <option value="" disabled>-- Choisir une catégorie --</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>

        <input type="file" onChange={handleFileChange} />

        {preview && <Image src={preview} alt="Aperçu" width={200} height={200} className="preview-image" />} {/* ✅ Aperçu */}

        {error && <p className="error-message">{error}</p>} {/* ✅ Affichage des erreurs */}

        <button type="submit" disabled={!nom || !description || !categorie || !image}>
          Ajouter
        </button> {/* ✅ Désactivation du bouton si le formulaire est incomplet */}
      </form>

      <div className="produits-list">
        <h2>Gallerie de mes produits</h2>
        <div className="produits-item">
        {produits.map((produit) => (
          <div key={produit.id} className="produit-item">
            <Image
              src={pb.files.getUrl(produit, produit.image)}
              alt={produit.nom}
              width={200}
              height={200}
              objectFit="cover"
            />
            <h3>{produit.nom}</h3>
            <button onClick={async () => {
              await pb.collection("Produits").delete(produit.id);
              alert("Produit supprimé !");
              router.refresh();
            }}>Supprimer</button>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
