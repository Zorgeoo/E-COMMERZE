import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
