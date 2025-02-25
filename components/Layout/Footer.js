"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <footer ref={footerRef} className="footer">
      <p>
        &copy; {new Date().getFullYear()} - Site réalisé par{" "}
        <Link href="https://axelgregoire.fr/" target="_blank" rel="noopener noreferrer">
          <span className="name-highlight">Axel Grégoire</span>
        </Link>
      </p>
    </footer>
  );
}
