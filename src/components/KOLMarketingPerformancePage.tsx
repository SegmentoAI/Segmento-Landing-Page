import { useMemo, useState } from "react";

type KOL = {
  id: string;
  name: string;
  clicks: number;
  realUsers: number;
  botUsers: number;
  feesCollected: number;
  maxPotentialFees: number;
  combinedNetWorth: number;
  combinedMonthlyVolume: number;
  dailyReferredUsers: number[];
};

type LineSeries = {
  label: string;
  color: string;
  data: number[];
};

const reportWindow = "January 10, 2026 to February 9, 2026";

const kols: KOL[] = [
  {
    id: "astra",
    name: "AstraAlpha",
    clicks: 1240,
    realUsers: 980,
    botUsers: 260,
    feesCollected: 1260,
    maxPotentialFees: 7100,
    combinedNetWorth: 2_412_380,
    combinedMonthlyVolume: 3_944_260,
    dailyReferredUsers: [380, 270, 180, 35, 25, 20, 15, 12, 10, 9, 8, 6, 5, 5],
  },
  {
    id: "chain",
    name: "ChainMaven",
    clicks: 980,
    realUsers: 760,
    botUsers: 220,
    feesCollected: 1710,
    maxPotentialFees: 5825,
    combinedNetWorth: 2_683_915,
    combinedMonthlyVolume: 3_221_470,
    dailyReferredUsers: [300, 210, 150, 26, 18, 14, 10, 8, 6, 5, 4, 3, 3, 3],
  },
  {
    id: "daria",
    name: "DeFiDaria",
    clicks: 860,
    realUsers: 690,
    botUsers: 170,
    feesCollected: 980,
    maxPotentialFees: 6188,
    combinedNetWorth: 1_768_245,
    combinedMonthlyVolume: 4_486_130,
    dailyReferredUsers: [270, 190, 135, 22, 16, 12, 9, 7, 6, 5, 4, 4, 4, 6],
  },
  {
    id: "yoda",
    name: "YieldYoda",
    clicks: 720,
    realUsers: 560,
    botUsers: 160,
    feesCollected: 1215,
    maxPotentialFees: 4100,
    combinedNetWorth: 1_247_560,
    combinedMonthlyVolume: 2_094_880,
    dailyReferredUsers: [215, 155, 108, 20, 14, 11, 8, 7, 6, 5, 4, 3, 2, 2],
  },
  {
    id: "miko",
    name: "MacroMiko",
    clicks: 640,
    realUsers: 500,
    botUsers: 140,
    feesCollected: 11,
    maxPotentialFees: 140,
    combinedNetWorth: 1_096_730,
    combinedMonthlyVolume: 1_839_540,
    dailyReferredUsers: [190, 140, 100, 16, 11, 9, 7, 6, 5, 4, 4, 3, 3, 2],
  },
];

const defaultCosts: Record<string, number> = {
  astra: 600,
  chain: 540,
  daria: 500,
  yoda: 420,
  miko: 360,
};

const weeklyCollectedFees = [620, 780, 860, 940, 1010, 890, 690, 805];
const weeklyMaxPotentialFees = [2950, 3313, 3625, 3800, 3975, 3650, 3075, 2625];
const acquiredUsersDau = [
  312, 488, 675, 842, 981, 1090, 1175, 1238, 1274, 1298, 1310,
  1304, 1288, 1262, 1229, 1190, 1148, 1106, 1064, 1026, 990, 958,
  930, 905, 884, 864, 846, 829, 815, 802, 790,
];

const seriesColors = ["#15803d", "#059669", "#65a30d", "#ca8a04", "#6b7280"];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

function calcROI(returnValue: number, cost: number) {
  if (cost <= 0) return 0;
  return ((returnValue - cost) / cost) * 100;
}

function roiBackgroundColor(value: number, min: number, max: number) {
  if (max <= min) {
    return "hsl(50 85% 86%)";
  }
  const normalized = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const hue = 50 + normalized * 90;
  return `hsl(${hue} 85% 86%)`;
}

function MultiLineChart({
  title,
  subtitle,
  series,
  xLabels,
}: {
  title: string;
  subtitle: string;
  series: LineSeries[];
  xLabels: string[];
}) {
  const width = 860;
  const height = 270;
  const padding = 30;
  const pointsCount = series[0].data.length;
  const allValues = series.flatMap((line) => line.data);
  const max = Math.max(...allValues);
  const min = Math.min(...allValues);
  const range = max - min || 1;

  const buildPath = (data: number[]) => {
    const coords = data.map((value, index) => {
      const x = padding + (index * (width - padding * 2)) / (pointsCount - 1);
      const y = height - padding - ((value - min) * (height - padding * 2)) / range;
      return { x, y };
    });

    return coords.reduce((path, point, index, points) => {
      if (index === 0) return `M ${point.x} ${point.y}`;
      const prev = points[index - 1];
      const controlX = (prev.x + point.x) / 2;
      return `${path} C ${controlX} ${prev.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
    }, "");
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-56 mt-4">
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          className="stroke-gray-300"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          className="stroke-gray-300"
        />
        {series.map((line) => (
          <path
            key={line.label}
            d={buildPath(line.data)}
            fill="none"
            stroke={line.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <div className="mt-3 flex flex-wrap gap-4 text-sm">
        {series.map((line) => (
          <div key={line.label} className="flex items-center gap-2 text-gray-700">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: line.color }}
            />
            <span>{line.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-xs text-gray-500">
        <span>{xLabels[0]}</span>
        <span>{xLabels[xLabels.length - 1]}</span>
      </div>
    </div>
  );
}

export function KOLMarketingPerformancePage() {
  const [costs, setCosts] = useState<Record<string, number>>(defaultCosts);

  const totals = useMemo(() => {
    return kols.reduce(
      (acc, kol) => {
        acc.clicks += kol.clicks;
        acc.realUsers += kol.realUsers;
        acc.botUsers += kol.botUsers;
        acc.feesCollected += kol.feesCollected;
        acc.maxPotentialFees += kol.maxPotentialFees;
        acc.netWorth += kol.combinedNetWorth;
        acc.monthlyVolume += kol.combinedMonthlyVolume;
        acc.cost += costs[kol.id] || 0;
        return acc;
      },
      {
        clicks: 0,
        realUsers: 0,
        botUsers: 0,
        feesCollected: 0,
        maxPotentialFees: 0,
        netWorth: 0,
        monthlyVolume: 0,
        cost: 0,
      },
    );
  }, [costs]);

  const perKolSeries: LineSeries[] = kols.map((kol, index) => ({
    label: kol.name,
    color: seriesColors[index],
    data: kol.dailyReferredUsers,
  }));

  const campaignPerformanceRows = [...kols].sort(
    (a, b) => b.maxPotentialFees - a.maxPotentialFees,
  );

  const collectedRois = kols.map((kol) => calcROI(kol.feesCollected, costs[kol.id] || 0));
  const potentialRois = kols.map((kol) =>
    calcROI(kol.maxPotentialFees, costs[kol.id] || 0),
  );
  const totalCollectedRoi = calcROI(totals.feesCollected, totals.cost);
  const totalPotentialRoi = calcROI(totals.maxPotentialFees, totals.cost);

  const collectedMin = Math.min(...collectedRois, totalCollectedRoi);
  const collectedMax = Math.max(...collectedRois, totalCollectedRoi);
  const potentialMin = Math.min(...potentialRois, totalPotentialRoi);
  const potentialMax = Math.max(...potentialRois, totalPotentialRoi);

  const campaignClicksRange = {
    min: Math.min(...kols.map((kol) => kol.clicks)),
    max: Math.max(...kols.map((kol) => kol.clicks)),
  };
  const campaignRealUsersRange = {
    min: Math.min(...kols.map((kol) => kol.realUsers)),
    max: Math.max(...kols.map((kol) => kol.realUsers)),
  };
  const campaignBotsRange = {
    min: Math.min(...kols.map((kol) => kol.botUsers)),
    max: Math.max(...kols.map((kol) => kol.botUsers)),
  };
  const campaignFeesRange = {
    min: Math.min(...kols.map((kol) => kol.feesCollected)),
    max: Math.max(...kols.map((kol) => kol.feesCollected)),
  };
  const campaignPotentialFeesRange = {
    min: Math.min(...kols.map((kol) => kol.maxPotentialFees)),
    max: Math.max(...kols.map((kol) => kol.maxPotentialFees)),
  };
  const userNetWorthRange = {
    min: Math.min(...kols.map((kol) => kol.combinedNetWorth)),
    max: Math.max(...kols.map((kol) => kol.combinedNetWorth)),
  };
  const userMonthlyVolumeRange = {
    min: Math.min(...kols.map((kol) => kol.combinedMonthlyVolume)),
    max: Math.max(...kols.map((kol) => kol.combinedMonthlyVolume)),
  };

  const aggregateFeesSeries: LineSeries[] = [
    { label: "Fees collected", color: "#15803d", data: weeklyCollectedFees },
    { label: "Maximum potential fees", color: "#ca8a04", data: weeklyMaxPotentialFees },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-green-700">
            Segmento KOL Marketing Campaign Report
          </h1>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">
            KOL Marketing Campaign Report for: @ProtocolXY
          </h2>
          <p className="mt-3 text-gray-600">
            Campaign window: {reportWindow}. Five KOLs were hired. Segmento
            tracked click-through traffic quality, user value, fees collected,
            and maximum potential fees.
          </p>
        </section>

        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900">
            Set KOL cost
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-600">
                  <th className="text-left py-2 pr-4 font-semibold">KOL</th>
                  <th className="text-left py-2 pr-4 font-semibold">Cost (USD)</th>
                </tr>
              </thead>
              <tbody>
                {campaignPerformanceRows.map((kol) => (
                  <tr key={kol.id} className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium text-gray-900">{kol.name}</td>
                    <td className="py-2 pr-4">
                      <input
                        type="number"
                        min={0}
                        step={100}
                        value={costs[kol.id]}
                        onChange={(event) =>
                          setCosts((previous) => ({
                            ...previous,
                            [kol.id]: Number(event.target.value) || 0,
                          }))
                        }
                        className="w-36 rounded-md border border-gray-300 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900">ROI per KOL</h3>
            <p className="mt-1 text-sm text-gray-500">
              Model: ROI is computed as <code>(fees - cost) / cost</code> for
              both collected fees and maximum potential fees.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-600">
                  <th className="text-left py-2 pr-4 font-semibold">KOL</th>
                  <th className="text-left py-2 pr-4 font-semibold">ROI from fees collected</th>
                  <th className="text-left py-2 pr-4 font-semibold">
                    ROI from maximum potential fees
                  </th>
                </tr>
              </thead>
              <tbody>
                {kols.map((kol) => {
                  const cost = costs[kol.id] || 0;
                  const roiCollected = calcROI(kol.feesCollected, cost);
                  const roiPotential = calcROI(kol.maxPotentialFees, cost);

                  return (
                    <tr key={kol.id} className="border-b border-gray-100">
                      <td className="py-2 pr-4 font-medium text-gray-900">{kol.name}</td>
                      <td className="py-2 pr-4 text-gray-900">
                        <span
                          className="inline-block rounded px-2 py-1"
                          style={{
                            backgroundColor: roiBackgroundColor(
                              roiCollected,
                              collectedMin,
                              collectedMax,
                            ),
                          }}
                        >
                          {formatPercent(roiCollected)}
                        </span>
                      </td>
                      <td className="py-2 pr-4 text-gray-900">
                        <span
                          className="inline-block rounded px-2 py-1"
                          style={{
                            backgroundColor: roiBackgroundColor(
                              roiPotential,
                              potentialMin,
                              potentialMax,
                            ),
                          }}
                        >
                          {formatPercent(roiPotential)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                <tr className="font-semibold text-gray-900">
                  <td className="py-2 pr-4">Total campaign</td>
                  <td className="py-2 pr-4 text-gray-900">
                    <span
                      className="inline-block rounded px-2 py-1"
                      style={{
                        backgroundColor: roiBackgroundColor(
                          totalCollectedRoi,
                          collectedMin,
                          collectedMax,
                        ),
                      }}
                    >
                      {formatPercent(totalCollectedRoi)}
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-gray-900">
                    <span
                      className="inline-block rounded px-2 py-1"
                      style={{
                        backgroundColor: roiBackgroundColor(
                          totalPotentialRoi,
                          potentialMin,
                          potentialMax,
                        ),
                      }}
                    >
                      {formatPercent(totalPotentialRoi)}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Campaign performance
          </h2>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-600">
                  <th className="text-left py-2 pr-4 font-semibold">KOL</th>
                  <th className="text-left py-2 pr-4 font-semibold">Clicks</th>
                  <th className="text-left py-2 pr-4 font-semibold">Real users</th>
                  <th className="text-left py-2 pr-4 font-semibold">Bots</th>
                  <th className="text-left py-2 pr-4 font-semibold">Fees collected</th>
                  <th className="text-left py-2 pr-4 font-semibold">
                    Maximum potential fees
                  </th>
                </tr>
              </thead>
              <tbody>
                {kols.map((kol) => (
                  <tr key={kol.id} className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium text-gray-900">{kol.name}</td>
                    <td className="py-2 pr-4 text-gray-700">
                      <span
                        className="inline-block rounded px-2 py-1 text-gray-900"
                        style={{
                          backgroundColor: roiBackgroundColor(
                            kol.clicks,
                            campaignClicksRange.min,
                            campaignClicksRange.max,
                          ),
                        }}
                      >
                        {kol.clicks.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-gray-700">
                      <span
                        className="inline-block rounded px-2 py-1 text-gray-900"
                        style={{
                          backgroundColor: roiBackgroundColor(
                            kol.realUsers,
                            campaignRealUsersRange.min,
                            campaignRealUsersRange.max,
                          ),
                        }}
                      >
                        {kol.realUsers.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-gray-700">
                      <span
                        className="inline-block rounded px-2 py-1 text-gray-900"
                        style={{
                          backgroundColor: roiBackgroundColor(
                            kol.botUsers,
                            campaignBotsRange.min,
                            campaignBotsRange.max,
                          ),
                        }}
                      >
                        {kol.botUsers.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-gray-700">
                      <span
                        className="inline-block rounded px-2 py-1 text-gray-900"
                        style={{
                          backgroundColor: roiBackgroundColor(
                            kol.feesCollected,
                            campaignFeesRange.min,
                            campaignFeesRange.max,
                          ),
                        }}
                      >
                        {formatCurrency(kol.feesCollected)}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-gray-700">
                      <span
                        className="inline-block rounded px-2 py-1 text-gray-900"
                        style={{
                          backgroundColor: roiBackgroundColor(
                            kol.maxPotentialFees,
                            campaignPotentialFeesRange.min,
                            campaignPotentialFeesRange.max,
                          ),
                        }}
                      >
                        {formatCurrency(kol.maxPotentialFees)}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="font-semibold text-gray-900">
                  <td className="py-2 pr-4">Total</td>
                  <td className="py-2 pr-4">{totals.clicks.toLocaleString()}</td>
                  <td className="py-2 pr-4">{totals.realUsers.toLocaleString()}</td>
                  <td className="py-2 pr-4">{totals.botUsers.toLocaleString()}</td>
                  <td className="py-2 pr-4">{formatCurrency(totals.feesCollected)}</td>
                  <td className="py-2 pr-4">{formatCurrency(totals.maxPotentialFees)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">User value</h2>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-600">
                  <th className="text-left py-2 pr-4 font-semibold">KOL</th>
                  <th className="text-left py-2 pr-4 font-semibold">Combined net worth</th>
                  <th className="text-left py-2 pr-4 font-semibold">
                    Combined monthly traded volume
                  </th>
                </tr>
              </thead>
              <tbody>
                {kols.map((kol) => (
                  <tr key={kol.id} className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium text-gray-900">{kol.name}</td>
                    <td className="py-2 pr-4 text-gray-700">
                      <span
                        className="inline-block rounded px-2 py-1 text-gray-900"
                        style={{
                          backgroundColor: roiBackgroundColor(
                            kol.combinedNetWorth,
                            userNetWorthRange.min,
                            userNetWorthRange.max,
                          ),
                        }}
                      >
                        {formatCurrency(kol.combinedNetWorth)}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-gray-700">
                      <span
                        className="inline-block rounded px-2 py-1 text-gray-900"
                        style={{
                          backgroundColor: roiBackgroundColor(
                            kol.combinedMonthlyVolume,
                            userMonthlyVolumeRange.min,
                            userMonthlyVolumeRange.max,
                          ),
                        }}
                      >
                        {formatCurrency(kol.combinedMonthlyVolume)}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="font-semibold text-gray-900">
                  <td className="py-2 pr-4">Total</td>
                  <td className="py-2 pr-4">{formatCurrency(totals.netWorth)}</td>
                  <td className="py-2 pr-4">{formatCurrency(totals.monthlyVolume)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <MultiLineChart
          title="Referred real new users over time by KOL"
          subtitle="Daily users in the first 14 days after each KOL posted the campaign link."
          series={perKolSeries}
          xLabels={["Day 1", "Day 14"]}
        />

        <MultiLineChart
          title="DAU - only the users acquired within the campaing"
          subtitle="Daily active users from campaign launch to one month later (January 10, 2026 to February 9, 2026)."
          series={[{ label: "Acquired-user DAU", color: "#15803d", data: acquiredUsersDau }]}
          xLabels={["Day 1", "Day 31"]}
        />

        <MultiLineChart
          title="Fees evolution over time"
          subtitle="Weekly aggregate fees generated by all KOLs during the campaign."
          series={aggregateFeesSeries}
          xLabels={["Week 1", "Week 8"]}
        />
      </main>
    </div>
  );
}
