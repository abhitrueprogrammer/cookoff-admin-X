import { Button } from "@/components/ui/button";
import Providers from "@/lib/Providers";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";
export const metadata: Metadata = {
  title: "CodeChef-VIT",
  description: "Made with ♡ by CodeChef-VIT",
  icons: [{ rel: "icon", url: "/cc-logo.svg" }],
  openGraph: {
    title: "CodeChef-VIT",
    images: [{ url: "/open-graph.png" }],
    url: "https://portal.codechefvit.com",
    type: "website",
    description: "Made with ♡ by CodeChef-VIT",
    siteName: "CodeChef-VIT",
  },
  applicationName: "CodeChef-VIT",
  keywords: [
    "CodeChef",
    "VIT",
    "Vellore Institute of Technology",
    "CodeChef-VIT",
  ],
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-dark">
        <div className="dark">
          <Toaster position="top-right" toastOptions={{ id: "_toast" }} />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
