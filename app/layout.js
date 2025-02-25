import { Geist, Geist_Mono, Petit_Formal_Script, Cinzel, Press_Start_2P } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import "@/styles/global.scss";

// Déclaration des polices Google Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const petitFormalScript = Petit_Formal_Script({ weight: "400", subsets: ["latin"] });

// Nouvelle police pour le h3
const cinzel = Cinzel({ weight: "400", subsets: ["latin"], variable: "--font-cinzel" });

// police pour mon h1 dans la admin - Press Start 2P
const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});


// Déclaration de la police Atocha (fichier local)
const atocha = localFont({
  src: "/fonts/atocha.woff2",
  variable: "--font-atocha",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata = {
  title: "Charcuterie Nouvelle",
  description: "Site vitrine pour un boucher charcutier",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${atocha.variable} ${cinzel.variable} ${pressStart2P.variable}`}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
