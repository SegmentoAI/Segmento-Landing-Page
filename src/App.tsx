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

export function App() {
  if (window.location.pathname === "/KOL-marketing-campaign-example-report") {
    return <KOLMarketingPerformancePage />;
  }

  if (window.location.pathname === "/KOL-report-example") {
    return <KOLReportExamplePage />;
  }

  if (window.location.pathname === "/FakeBank-example") {
    return <FakeBankExamplePage />;
  }

  if (window.location.pathname === "/Protocol-value-example-report") {
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
