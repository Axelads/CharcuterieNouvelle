import React, { useEffect, useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import Image from "next/image";

const BullesMedia = ({ isModalOpen }) => {
  const mediaRef = useRef(null);

  useEffect(() => {
    const elements = mediaRef.current.children;
    
    gsap.fromTo(
      elements,
      { opacity: 0, x: 50 },
      { opacity: isModalOpen ? 0 : 1, x: 0, duration: 1.2, ease: "power2.out", stagger: 0.5 }
    );
  }, [isModalOpen]);

  return (
    <ul className="media" ref={mediaRef}>
      <li className="bulle">
        <a href="https://www.facebook.com/Lacharcuterienouvelle" target="_blank" rel="noopener noreferrer">
        <Image src="/images/logoMedia/facebook_logo.svg" alt="Facebook Logo" width={50} height={50} />
        </a>
      </li>   
      
    </ul>
  );
};

export default BullesMedia;
