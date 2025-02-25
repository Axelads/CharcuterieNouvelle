"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image"; // Importation de Next.js Image

export default function Loading() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline();

    // Assurer que les images commencent bien en opacity: 0
    gsap.set(".loading-images img", { opacity: 0 });

    // Animation des images
    tl.fromTo(
      ".loading-images img",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 2, stagger: 0.5, ease: "power2.out" }
    )
    .fromTo(
      ".loading-title",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }, 
      "-=1"
    );

    // Animation des couteaux qui commence immédiatement
    gsap.fromTo(
      ".knives",
      { opacity: 0, scale: 0.5, rotation: 0, y: 50 },
      { opacity: 1, scale: 1.2, rotation: 720, y: 0, duration: 5, ease: "power2.out" }
    );

    // FORCER LE LOADER À RESTER 6 SECONDES COMPLÈTES
    setTimeout(() => {
      gsap.to(".loading-container", { opacity: 0, duration: 1.2, onComplete: () => setIsVisible(false) });
    }, 2000);

  }, []);

  if (!isVisible) return null;

  return (
    <div className="loading-container">
      <div className="loading-images">
        <Image src="/images/img_logo/vache.png" alt="vache" width={100} height={100} />
        <Image src="/images/img_logo/cochon.png" alt="cochon" width={100} height={100} />
        <Image src="/images/img_logo/coque.png" alt="coq" width={100} height={100} />
        <Image src="/images/img_logo/agneau.png" alt="agneau" width={100} height={100} />
      </div>
      
      <h2 className="loading-title">La Charcuterie Nouvelle</h2>
    </div>
  );
}
