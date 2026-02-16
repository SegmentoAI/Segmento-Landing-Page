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

const pages = {
  KOLMarketingPerformancePage:
    "KOL-marketing-campaign-example-report".toLowerCase(),
  KOLReportExamplePage: "KOL-report-example".toLowerCase(),
  FakeBankExamplePage: "FakeBank-example".toLowerCase(),
  ProtocolValueExampleReportPage: "Protocol-value-example-report".toLowerCase(),
};

export function App() {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("p");

  if (page !== null) {
    const lowerCase = page.toLowerCase();

    if (lowerCase === pages.KOLMarketingPerformancePage) {
      return <KOLMarketingPerformancePage />;
    }

    if (lowerCase === pages.KOLReportExamplePage) {
      return <KOLReportExamplePage />;
    }

    if (lowerCase === pages.FakeBankExamplePage) {
      return <FakeBankExamplePage />;
    }

    if (lowerCase === pages.ProtocolValueExampleReportPage) {
      return <ProtocolValueExampleReportPage />;
    }
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
