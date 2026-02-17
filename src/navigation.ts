export const PAGES = {
  KOLMarketingPerformancePage: "kol-marketing-campaign-example-report",
  KOLReportExamplePage: "kol-report-example",
  FakeBankExamplePage: "fakebank-example",
  ProtocolValueExampleReportPage: "protocol-value-example-report",
} satisfies Readonly<Record<string, string>>;

export type PageSlug = (typeof PAGES)[keyof typeof PAGES];

export const getPageVariant = (): PageSlug | null => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("p");

  if (page === null) {
    return null;
  }

  return page.trim().toLowerCase();
};

export const getPageLink = (page: PageSlug) => {
  const params = new URLSearchParams(window.location.search);
  params.append("p", page);
  return "/?" + params.toString();
};
