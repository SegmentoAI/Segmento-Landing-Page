import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { WhereWeHelpSection } from "./components/WhereWeHelpSection";
import { SolutionSection } from "./components/SolutionSection";
import { HowWeHelpSection } from "./components/HowWeHelpSection";
import { TeamSection } from "./components/TeamSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { KOLReportExamplePage } from "./components/KOLReportExamplePage";
import { KOLMarketingPerformancePage } from "./components/KOLMarketingPerformancePage";
import { ProtocolValueExampleReportPage } from "./components/ProtocolValueExampleReportPage";
import { FakeBankExamplePage } from "./components/FakeBankExamplePage";
import { getPageVariant, PAGES } from "./navigation";
import { SegmentoClient } from "@segmento/core";

export function App() {
  SegmentoClient.init(
    "eyJ2IjoxLCJwaWQiOiJzZWdtZW50byIsIm5hbWUiOiJTZWdtZW50byIsImNoayI6ImI4NzEzMDVjIn0",
  );
  const page = getPageVariant();

  if (page === PAGES.KOLMarketingPerformancePage) return <KOLMarketingPerformancePage />;
  if (page === PAGES.KOLReportExamplePage) return <KOLReportExamplePage />;
  if (page === PAGES.FakeBankExamplePage) return <FakeBankExamplePage />;
  if (page === PAGES.ProtocolValueExampleReportPage) return <ProtocolValueExampleReportPage />;

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <Navbar />
      <main>
        <HeroSection />
        <WhereWeHelpSection />
        <SolutionSection />
        <HowWeHelpSection />
        <TeamSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
