"use client";

import { gsap } from "gsap";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import pb from "@/lib/pocketbase";

export default function Modification() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push("/pb-admin"); 
    } else {
      setUser(pb.authStore.model);
    }
  }, [router]);

  useEffect(() => {
    gsap.to(".admin-dashboard h1", { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
    gsap.to(".admin-dashboard p", { opacity: 1, delay: 0.5, duration: 1, ease: "power2.out" });
    gsap.to(".admin-actions", { opacity: 1, delay: 1, duration: 1, ease: "power2.out" });
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Tableau de bord Admin</h1>
      {user ? <p>Bienvenue, {user.name} !</p> : <p>Chargement...</p>}

      <div className="admin-actions">
        <button onClick={() => router.push("/modification/articles")}>Gérer les Articles</button>
        <button onClick={() => router.push("/modification/produits")}>Gérer les Produits</button>
        <button
          onClick={() => {
            pb.authStore.clear();
            router.push("/pb-admin");
          }}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
