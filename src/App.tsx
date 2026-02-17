import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { WhereWeHelpSection } from "./components/WhereWeHelpSection";
import { SolutionSection } from "./components/SolutionSection";
import { HowWeHelpSection } from "./components/HowWeHelpSection";
import { ExamplesSection } from "./components/ExamplesSection";
import { TeamSection } from "./components/TeamSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { KOLReportExamplePage } from "./components/KOLReportExamplePage";
import { KOLMarketingPerformancePage } from "./components/KOLMarketingPerformancePage";
import { ProtocolValueExampleReportPage } from "./components/ProtocolValueExampleReportPage";
import { FakeBankExamplePage } from "./components/FakeBankExamplePage";
import { getPageVariant, PAGES } from "./navigation";

export function App() {
  const page = getPageVariant();

  if (page === PAGES.KOLMarketingPerformancePage) {
    return <KOLMarketingPerformancePage />;
  }

  if (page === PAGES.KOLReportExamplePage) {
    return <KOLReportExamplePage />;
  }

  if (page === PAGES.FakeBankExamplePage) {
    return <FakeBankExamplePage />;
  }

  if (page === PAGES.ProtocolValueExampleReportPage) {
    return <ProtocolValueExampleReportPage />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ExamplesSection />
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
