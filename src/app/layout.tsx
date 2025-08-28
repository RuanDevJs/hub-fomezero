import type { Metadata } from "next";
import "./globals.css";
import { fontPoppins } from "@/style/font";

export const metadata: Metadata = {
  title: "HubFomeZero | Plataforma de Doação de Alimentos para Famílias em Vulnerabilidade",
  description: "HubFomeZero é uma plataforma que conecta doadores a famílias em situação de vulnerabilidade, facilitando a doação de alimentos de forma rápida, segura e solidária.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontPoppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
