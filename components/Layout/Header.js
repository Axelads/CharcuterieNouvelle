"use client";

import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Recherche pour : ${searchQuery}`); // À remplacer par une vraie fonction de recherche
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link href="/">
          <Image src="/images/img_logo/cochon.png" alt="Charcuterie Nouvelle" width={60} height={60} />
          </Link>
        </div>

        {/* Menu */}
        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/a-propos">À propos</Link></li>
            <li><Link href="/evenements">Événements</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/produits">Nos Produits</Link></li>
          </ul>
        </nav>

        {/* Barre de recherche */}
        <div className={`search-container ${searchOpen ? "open" : ""}`}>
          <form onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder="Rechercher..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Bouton recherche (loupe) */}
        <button className="search-toggle" onClick={() => setSearchOpen(!searchOpen)}>
          <FaSearch />
        </button>

        {/* Bouton menu mobile */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
    </header>
  );
}
