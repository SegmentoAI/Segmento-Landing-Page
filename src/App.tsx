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
import { initAnalytics } from "@segmento/analytics";
import { SegmentoClient } from "@segmento/core";

SegmentoClient.init(
  "eyJ2IjoxLCJwaWQiOiJzZWdtZW50byIsIm5hbWUiOiJTZWdtZW50byIsImNoayI6ImI4NzEzMDVjIn0",
);
initAnalytics("segmento");

export function App() {

  const page = getPageVariant();

  if (page === PAGES.KOLMarketingPerformancePage)
    return <KOLMarketingPerformancePage />;
  if (page === PAGES.KOLReportExamplePage) return <KOLReportExamplePage />;
  if (page === PAGES.FakeBankExamplePage) return <FakeBankExamplePage />;
  if (page === PAGES.ProtocolValueExampleReportPage)
    return <ProtocolValueExampleReportPage />;

  return (
    <div className="min-h-screen bg-ink text-paper font-sans">
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
