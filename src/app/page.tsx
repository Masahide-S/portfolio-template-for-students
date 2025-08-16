import Awards from "@/components/Awards";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Research from "@/components/Research";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";

/**
 * ポートフォリオサイトのメインページ
 * 各セクションのコンポーネントをここに配置してページを構成する
 */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Skills />
        <Certifications />
        <Timeline />
        <Awards />
        <Research />
        <Contact />
      </main>
      <Footer />
    </>
  );
}