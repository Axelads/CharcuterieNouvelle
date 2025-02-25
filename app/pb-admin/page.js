"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import pb from "@/lib/pocketbase";


export default function PbAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  
  // Refs pour l'animation
  const formRef = useRef(null);
  const titleRef = useRef(null);
  
  useEffect(() => {
    // Animation GSAP
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      formRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out", delay: 0.3 }
    );
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const authData = await pb.collection("users").authWithPassword(email, password);
      console.log("Connexion réussie:", authData);
      router.push("/modification"); // Redirection vers la page admin après connexion
    } catch (err) {
      console.error("Erreur de connexion:", err);
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="admin-login">
      <h1 ref={titleRef}>Connexion Admin</h1>
      <form ref={formRef} onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Mot de passe" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Se connecter</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
