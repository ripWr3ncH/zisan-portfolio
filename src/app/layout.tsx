import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dewan Salman Rahman Zisan | Portfolio",
  description:
    "CSE student at KUET. Interested in Web Development, Machine Learning, Problem Solving, Microservice and DevOps.",
  keywords: [
    "portfolio",
    "web developer",
    "frontend",
    "Zisan",
    "KUET",
    "Next.js",
    "React",
    "TypeScript",
    "Machine Learning",
    "DevOps",
  ],
  authors: [{ name: "Dewan Salman Rahman Zisan" }],
  openGraph: {
    title: "Dewan Salman Rahman Zisan | Portfolio",
    description:
      "CSE student at KUET. Interested in Web Development, Machine Learning, Problem Solving, Microservice and DevOps.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dewan Salman Rahman Zisan | Portfolio",
    description:
      "CSE student at KUET. Interested in Web Development, Machine Learning, Problem Solving, Microservice and DevOps.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
