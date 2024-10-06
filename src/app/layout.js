import { Roboto } from "next/font/google";
import "./globals.css";
import RootProviders from "../components/providers/RootProviders";

const inter = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Invoice Generator",
  description: "Invoice Generator for Jaanavi Opticals ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
