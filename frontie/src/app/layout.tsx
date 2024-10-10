import "./globals.css";
import { ProductContextProvider } from "@/components/utils/context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProductContextProvider>
          <div style={{ minHeight: "calc(100vh - 320.5px - 74px)" }}>
            {/* <AdminBurgerBar /> */}
            {children}
          </div>
        </ProductContextProvider>
      </body>
    </html>
  );
}
