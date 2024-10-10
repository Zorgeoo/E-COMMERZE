import { ProductContextProvider } from "@/components/utils/context";
import { AdminBurgerBar } from "@/components/AdminBurgerBar";
import { AdminNavbar } from "@/components/adminNavbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProductContextProvider>
        <div style={{ minHeight: "calc(100vh - 320.5px - 74px)" }}>
          <AdminNavbar />
          <div className="flex m-auto w-[1280px]">
            <AdminBurgerBar />
            {children}
          </div>
        </div>
      </ProductContextProvider>
    </>
  );
}
