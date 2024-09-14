import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gradient-to-b from-background to-background/80 py-12 px-4">
        <div className="w-full max-w-[480px] bg-card rounded-lg shadow-lg p-8 flex flex-col items-center">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
