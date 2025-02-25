import CustomCarousel from "@/components/carousel/Carousel";
import Image from "next/image";

export default function Intro() {
  return (
    <section className="intro">
      <div className="hero-content">
        <h1>
          <div>Bienvenue chez</div>
          <div>La Charcuterie Nouvelle</div>
        </h1>
        <p>Découvrez nos viandes artisanales et nos spécialités faites maison.</p>
        
        {/* Texte + image côte à côte */}
        <div className="provence-info">
          <p>Sur les marchés de Provence</p>
          <Image 
            src="/images/img_logo/provence150.png" 
            alt="Marchés de Provence" 
            width={50} 
            height={50} 
            className="provence-img"
          />
        </div>

        <a href="/contact" className="btn">Nous contacter</a>
      </div>

      {/* Le carousel est libre, tu peux le placer où tu veux */}
      <div className="carousel-wrapper">
        <CustomCarousel />
      </div>
    </section>
  );
}
