"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import pb from "@/lib/pocketbase";

export default function ArticlesAdmin() {
  const [articles, setArticles] = useState([]);
  const [titre, setTitre] = useState("");
  const [categorie, setCategorie] = useState("");
  const [premierParagraphe, setPremierParagraphe] = useState("");
  const [imagePresentation, setImagePresentation] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [titreChapitre1, setTitreChapitre1] = useState("");
  const [deuxiemeParagraphe, setDeuxiemeParagraphe] = useState("");
  const [titreChapitre2, setTitreChapitre2] = useState("");
  const [titreConclusion, setTitreConclusion] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [imageFin, setImageFin] = useState(null);
  const [previewImageFin, setPreviewImageFin] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const categories = ["Actualités", "Conseils", "Promotions", "Autre"];

  useEffect(() => {
    async function fetchArticles() {
      try {
        const records = await pb.collection("Articles").getFullList();
        setArticles(records);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
      }
    }
    fetchArticles();
  }, []);

  const handleImageChange = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titre || !categorie || !imagePresentation || !premierParagraphe || !titreChapitre1 || !titreConclusion || !conclusion) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const formData = new FormData();
    formData.append("Titre", titre);
    formData.append("categorie", categorie);
    formData.append("imagePresentation", imagePresentation);
    formData.append("PremierParagraphe", premierParagraphe);
    formData.append("TitreChapitre1", titreChapitre1);
    if (deuxiemeParagraphe) formData.append("DeuxiemeParagraphe", deuxiemeParagraphe);
    if (titreChapitre2) formData.append("TitreChapitre2", titreChapitre2);
    formData.append("TitreConclusion", titreConclusion);
    formData.append("Conclusion", conclusion);
    if (imageFin) formData.append("imageFin", imageFin);

    try {
      await pb.collection("Articles").create(formData);
      setShowModal(true);

      // Réinitialisation du formulaire après ajout
      setTitre("");
      setCategorie("");
      setPremierParagraphe("");
      setImagePresentation(null);
      setPreviewImage(null);
      setTitreChapitre1("");
      setDeuxiemeParagraphe("");
      setTitreChapitre2("");
      setTitreConclusion("");
      setConclusion("");
      setImageFin(null);
      setPreviewImageFin(null);

      // Recharger la liste des articles
      const updatedRecords = await pb.collection("Articles").getFullList();
      setArticles(updatedRecords);
    } catch (error) {
      console.error("Erreur :", error);
      setError("Erreur lors de l&apos;ajout.");
    }
  };

  return (
    <div className="admin-articles">
      <h1>Gestion des Articles</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Titre de l&apos;article" value={titre} onChange={(e) => setTitre(e.target.value)} required />

        <select value={categorie} onChange={(e) => setCategorie(e.target.value)} required>
          <option value="" disabled>-- Choisir une catégorie --</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>

        <h3>Image de présentation (obligatoire)</h3>
        <input type="file" onChange={(e) => handleImageChange(e, setImagePresentation, setPreviewImage)} required />
        {previewImage && <Image src={previewImage} alt="Aperçu" width={200} height={200} className="preview" unoptimized />}

        <h3>Premier Chapitre</h3>
        <input type="text" placeholder="Titre du Chapitre 1" value={titreChapitre1} onChange={(e) => setTitreChapitre1(e.target.value)} required />
        <textarea placeholder="Premier paragraphe (obligatoire)" value={premierParagraphe} onChange={(e) => setPremierParagraphe(e.target.value)} required />

        <h3>Deuxième Chapitre (facultatif)</h3>
        <input type="text" placeholder="Titre du Chapitre 2 (optionnel)" value={titreChapitre2} onChange={(e) => setTitreChapitre2(e.target.value)} />
        <textarea placeholder="Deuxième paragraphe (optionnel)" value={deuxiemeParagraphe} onChange={(e) => setDeuxiemeParagraphe(e.target.value)} />

        <h3>Conclusion</h3>
        <input type="text" placeholder="Titre Conclusion" value={titreConclusion} onChange={(e) => setTitreConclusion(e.target.value)} required />
        <textarea placeholder="Conclusion" value={conclusion} onChange={(e) => setConclusion(e.target.value)} required />

        <h3>Image de Fin (optionnelle)</h3>
        <input type="file" onChange={(e) => handleImageChange(e, setImageFin, setPreviewImageFin)} />
        {previewImageFin && <Image src={previewImageFin} alt="Aperçu" width={200} height={200} className="preview" unoptimized />}

        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={!titre || !categorie || !imagePresentation || !premierParagraphe || !titreChapitre1 || !titreConclusion || !conclusion}>
          Ajouter l&apos;article
        </button>
      </form>

      <div className="articles-list">
        <h2>Articles existants</h2>
        {articles.map((article) => (
          <div key={article.id} className="article-item">
            <h3>{article.Titre}</h3>
            <Image src={pb.files.getUrl(article, article.imagePresentation)} alt={article.Titre} width={100} height={100} unoptimized />
            <p>Catégorie : {article.categorie}</p>
            <button onClick={async () => {
              await pb.collection("Articles").delete(article.id);
              setArticles(articles.filter((a) => a.id !== article.id));
            }}>Supprimer</button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Article ajouté avec succès !</h2>
            <button onClick={() => setShowModal(false)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}
