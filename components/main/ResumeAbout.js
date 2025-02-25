"use client";

import Link from "next/link";


export default function ResumeAbout() {
  return (
    <section className="resume-about">
      <h2 className="atocha-font">Artisan Boucher - La Charcuterie Nouvelle</h2>
      <p>
        Découvrez l&apos;excellence de l&apos;artisanat boucher avec <strong>La Charcuterie Nouvelle</strong>.  
        Présent sur les marchés de Provence, nous vous proposons des viandes de qualité et des spécialités artisanales,  
        travaillées avec passion et savoir-faire.  
        Suivez-nous sur <a href="https://www.facebook.com/Lacharcuterienouvelle" target="_blank" rel="noopener noreferrer">Facebook</a>  
        pour ne rien manquer de nos événements et nouveautés !
      </p>
      <Link href="/about" className="btn">
        En savoir plus
      </Link>
    </section>
  );
}
