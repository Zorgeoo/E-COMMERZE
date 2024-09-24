import type { Metadata } from "next";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductContextProvider } from "@/components/utils/context";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <ProductContextProvider> */}
      <Navbar />
      <div style={{ minHeight: "calc(100vh - 320.5px - 74px)" }}>
        {children}
      </div>
      <Footer />
      {/* </ProductContextProvider> */}
    </>
  );
}
