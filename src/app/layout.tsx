import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "BiblioTech",
    template: "%s | BiblioTech",
  },
  description:
    "Biblioteca virtual pessoal de livros teológicos — catálogo, resenhas e wishlist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${sourceSans.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
