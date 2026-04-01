import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingContact from "../FloatingContact";
import AdminBar from "../AdminBar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AdminBar />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <FloatingContact />
      <Footer />
    </div>
  );
}
