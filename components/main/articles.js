"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import pb from "@/lib/pocketbase";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const records = await pb.collection("Articles").getFullList({ 
          sort: "-created",
          $autoCancel: false, // ✅ Désactive l'annulation automatique
        });
        setArticles(records);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  if (loading) {
    return <p className="loading">Chargement des articles...</p>;
  }

  return (
    <section className="articles-list">
      <h2>Nos Articles</h2>
      <div className="articles-container">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id} className="article-card">
              <Image
                src={pb.files.getUrl(article, article.imagePresentation)}
                alt={article.Titre}
                width={300}
                height={200}
                className="article-image"
                unoptimized
              />
              <div className="article-content">
                <h3>{article.Titre}</h3>
                <p className="article-category">{article.categorie}</p>
                <p className="article-excerpt">
                  {article.PremierParagraphe
                    ? article.PremierParagraphe.slice(0, 100) + "..."
                    : "Aucun résumé disponible."}
                </p>
                <button className="read-more">Lire la suite</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-articles">Aucun article disponible pour le moment.</p>
        )}
      </div>
    </section>
  );
}
