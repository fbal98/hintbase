import { HomeContent } from "./components/HomeContent";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <HomeContent />
      </main>
      <Footer />
    </>
  );
}
