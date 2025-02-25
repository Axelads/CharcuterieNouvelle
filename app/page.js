"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loading from "@/components/Loading/Loading";
import Intro from "@/components/main/intro";
import BullesMedia from "@/components/design/media/BulleMedia";
import ResumeAbout from "@/components/main/ResumeAbout";
import SeasonalProducts from "@/components/Saison/SeasonalPrducts";
import ArticlesList from "@/components/main/articles";
import "@/styles/pages/_home.scss";

// Activation de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const sectionsRef = useRef([]); // Stocker les refs des sections

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  useEffect(() => {
    if (!loading) {
      sectionsRef.current.forEach((section, index) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%", // L'animation commence quand 80% de l'élément est visible
              toggleActions: "play none none none",
            },
            delay: index * 0.3, // Chaque composant apparaît avec un léger délai
          }
        );
      });
    }
  }, [loading]);

  return loading ? (
    <Loading />
  ) : (
    <main className="home-container">
      <section ref={(el) => (sectionsRef.current[0] = el)} className="full-width">
        <Intro />
      </section>
      <BullesMedia />
      <section ref={(el) => (sectionsRef.current[1] = el)} className="full-width">
        <ResumeAbout />
      </section>
      <section ref={(el) => (sectionsRef.current[2] = el)} className="full-width">
        <SeasonalProducts />
      </section>
      <section ref={(el) => (sectionsRef.current[3] = el)} className="full-width">
        <ArticlesList />
      </section>

    </main>
  );
}
