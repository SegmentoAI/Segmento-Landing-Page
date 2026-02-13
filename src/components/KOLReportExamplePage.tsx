type DistributionBin = {
  label: string;
  users: number;
  value: number;
};

type SplitItem = {
  label: string;
  value: number;
  color: string;
};

const reportDate = "January 10, 2026";
const clickSeries = [1500, 1050, 700, 95, 80, 70, 60, 55, 50, 45, 40, 35, 30, 30];
const totalClicks = clickSeries.reduce((sum, value) => sum + value, 0);
const realUsers = 2912;
const botUsers = 928;

const netWorthDistribution: DistributionBin[] = [
  { label: "$0-$1k", users: 180, value: 81_000 },
  { label: "$1k-$5k", users: 250, value: 650_000 },
  { label: "$5k-$20k", users: 190, value: 1_862_000 },
  { label: "$20k-$100k", users: 82, value: 2_788_000 },
  { label: "$100k+", users: 18, value: 2_970_000 },
];

const tradedVolumeDistribution: DistributionBin[] = [
  { label: "$0-$1k", users: 140, value: 58_800 },
  { label: "$1k-$10k", users: 280, value: 1_204_000 },
  { label: "$10k-$50k", users: 210, value: 4_095_000 },
  { label: "$50k-$200k", users: 76, value: 6_308_000 },
  { label: "$200k+", users: 14, value: 4_060_000 },
];

const combinedNetWorth = netWorthDistribution.reduce(
  (sum, bucket) => sum + bucket.value,
  0,
);
const combinedMonthlyVolume = tradedVolumeDistribution.reduce(
  (sum, bucket) => sum + bucket.value,
  0,
);

const netWorthByChain: SplitItem[] = [
  { label: "Solana", value: 2_840_000, color: "bg-green-600" },
  { label: "ETH", value: 2_310_000, color: "bg-emerald-500" },
  { label: "Arbitrum", value: 1_360_000, color: "bg-lime-500" },
  { label: "Base", value: 1_020_000, color: "bg-yellow-500" },
  { label: "Others", value: 821_000, color: "bg-gray-400" },
];

const volumeByChain: SplitItem[] = [
  { label: "Solana", value: 5_662_000, color: "bg-green-600" },
  { label: "ETH", value: 4_481_000, color: "bg-emerald-500" },
  { label: "Arbitrum", value: 2_507_000, color: "bg-lime-500" },
  { label: "Base", value: 1_886_000, color: "bg-yellow-500" },
  { label: "Others", value: 1_189_800, color: "bg-gray-400" },
];

function buildScaledSeries(
  length: number,
  total: number,
  generator: (index: number) => number,
) {
  const raw = Array.from({ length }, (_, index) => generator(index));
  const rawTotal = raw.reduce((sum, value) => sum + value, 0);
  const scaled = raw.map((value) => Math.round((value / rawTotal) * total));
  const diff = total - scaled.reduce((sum, value) => sum + value, 0);
  scaled[scaled.length - 1] += diff;
  return scaled;
}

const allProtocolsDaily = buildScaledSeries(61, 24_660_000, (i) => {
  // Smooth baseline with moderate oscillation.
  const base = 390_000 + i * 1_400;
  const wave = Math.sin((i / 60) * Math.PI * 3.1) * 34_000;

  // Holiday slowdown around Christmas / New Year.
  const holidayCenter = 15;
  const holidayDip =
    130_000 * Math.exp(-Math.pow(i - holidayCenter, 2) / (2 * Math.pow(5.5, 2)));

  // Stronger activity into end of Jan / start of Feb.
  const febCenter = 53;
  const febBoost =
    145_000 * Math.exp(-Math.pow(i - febCenter, 2) / (2 * Math.pow(6, 2)));

  return base + wave - holidayDip + febBoost;
});

const promotedProtocolDaily = buildScaledSeries(31, 4_382_000, (i) => {
  const launchBoost = i < 7 ? 1.2 : 1;
  const wave = Math.sin((i / 30) * Math.PI * 2.5) * 9_000;
  return (125_000 + i * 700 + wave) * launchBoost;
});

function formatCurrency(value: number) {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}k`;
  }
  return `$${value}`;
}

function LineChart({
  data,
  color,
  markerIndex,
}: {
  data: number[];
  color: string;
  markerIndex?: number;
}) {
  const width = 860;
  const height = 260;
  const padding = 28;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const pointCoords = data.map((value, index) => {
    const x = padding + (index * (width - padding * 2)) / (data.length - 1);
    const y = height - padding - ((value - min) * (height - padding * 2)) / range;
    return { x, y };
  });

  const smoothPath = pointCoords.reduce((path, point, index, points) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }

    const prev = points[index - 1];
    const controlX = (prev.x + point.x) / 2;
    return `${path} C ${controlX} ${prev.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
  }, "");

  const markerX =
    markerIndex === undefined
      ? undefined
      : padding + (markerIndex * (width - padding * 2)) / (data.length - 1);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-56">
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
      {markerX && (
        <line
          x1={markerX}
          y1={padding}
          x2={markerX}
          y2={height - padding}
          className="stroke-yellow-500"
          strokeDasharray="6 5"
        />
      )}
      <path
        fill="none"
        d={smoothPath}
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Histogram({
  title,
  bins,
}: {
  title: string;
  bins: DistributionBin[];
}) {
  const maxUsers = Math.max(...bins.map((bucket) => bucket.users));

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
      <h4 className="text-base font-semibold text-gray-900">{title}</h4>
      <div className="mt-4 grid grid-cols-5 gap-3 items-end min-h-56">
        {bins.map((bucket) => (
          <div key={bucket.label} className="text-center">
            <div className="h-40 flex items-end justify-center">
              <div
                className="w-12 bg-green-500 rounded-t-md"
                style={{ height: `${(bucket.users / maxUsers) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-gray-600">{bucket.label}</p>
            <p className="text-xs font-semibold text-gray-900">
              {bucket.users} users
            </p>
            <p className="text-xs text-gray-600">{formatCurrency(bucket.value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SplitBar({ items, total }: { items: SplitItem[]; total: number }) {
  return (
    <div className="space-y-3">
      <div className="h-5 w-full rounded-full overflow-hidden bg-gray-200 flex">
        {items.map((item) => (
          <div
            key={item.label}
            className={item.color}
            style={{ width: `${(item.value / total) * 100}%` }}
          />
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {items.map((item) => (
          <div key={item.label} className="text-sm text-gray-700">
            <span className="font-semibold text-gray-900">{item.label}:</span>{" "}
            {formatCurrency(item.value)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function KOLReportExamplePage() {
  const realShare = (realUsers / (realUsers + botUsers)) * 100;
  const totalUsersAnalyzed = netWorthDistribution.reduce(
    (sum, bucket) => sum + bucket.users,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <p className="text-sm font-medium text-green-700">Segmento Report</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">
            KOL Report Example
          </h1>
          <p className="mt-3 text-gray-600">
            Campaign tracked from click-through link published on {reportDate}.
            Medium-sized KOL audience with 3,840 tracked clicks.
          </p>
        </section>

        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Evolution of users that clicked over time
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Daily click-through users during the first 14 days after link
            postage (January 10, 2026). Total: {totalClicks.toLocaleString()}{" "}
            users.
          </p>
          <div className="mt-4">
            <LineChart data={clickSeries} color="#16a34a" />
          </div>
        </section>

        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Proportion of real users vs. bots
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Real users: {realUsers.toLocaleString()} ({realShare.toFixed(1)}%).
            Bots: {botUsers.toLocaleString()} ({(100 - realShare).toFixed(1)}%).
          </p>
          <div className="mt-4 h-6 w-full rounded-full overflow-hidden bg-gray-200 flex">
            <div
              className="bg-green-600"
              style={{ width: `${realShare}%` }}
              title={`Real users ${realShare.toFixed(1)}%`}
            />
            <div
              className="bg-yellow-500"
              style={{ width: `${100 - realShare}%` }}
              title={`Bots ${(100 - realShare).toFixed(1)}%`}
            />
          </div>
        </section>

        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-gray-900">
            Value of users brought to a protocol
          </h2>
          <p className="text-sm text-gray-600">
            Cohort size: {totalUsersAnalyzed.toLocaleString()} real users with
            on-chain activity.
          </p>

          <Histogram
            title={`Histogram of net worth and combined net worth (${formatCurrency(combinedNetWorth)})`}
            bins={netWorthDistribution}
          />

          <Histogram
            title={`Histogram of traded volume over last month and combined traded volume (${formatCurrency(combinedMonthlyVolume)})`}
            bins={tradedVolumeDistribution}
          />

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <h4 className="text-base font-semibold text-gray-900">
              Combined traded volume per day, from December 11, 2025 to February 9, 2026
            </h4>
            <p className="mt-1 text-sm text-gray-600">
              One month before and one month after link post date ({reportDate}).
              Total across the full period:{" "}
              {formatCurrency(
                allProtocolsDaily.reduce((sum, value) => sum + value, 0),
              )}
              .
            </p>
            <div className="mt-4">
              <LineChart data={allProtocolsDaily} color="#15803d" markerIndex={30} />
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <h4 className="text-base font-semibold text-gray-900">
              Combined traded volume per day on promoted protocol, from January
              10, 2026 to February 9, 2026
            </h4>
            <p className="mt-1 text-sm text-gray-600">
              Total on promoted protocol:{" "}
              {formatCurrency(
                promotedProtocolDaily.reduce((sum, value) => sum + value, 0),
              )}
              .
            </p>
            <div className="mt-4">
              <LineChart data={promotedProtocolDaily} color="#ca8a04" />
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <h4 className="text-base font-semibold text-gray-900">
              Traded volume over the last month by chain, from December 11, 2025 to February 9, 2026
            </h4>
            <p className="mt-1 text-sm text-gray-600">
              Split of {formatCurrency(combinedMonthlyVolume)} across Solana,
              ETH, Arbitrum, Base, and others.
            </p>
            <div className="mt-4">
              <SplitBar items={volumeByChain} total={combinedMonthlyVolume} />
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <h4 className="text-base font-semibold text-gray-900">
              Net worth by chain
            </h4>
            <p className="mt-1 text-sm text-gray-600">
              Split of {formatCurrency(combinedNetWorth)} across Solana, ETH,
              Arbitrum, Base, and others.
            </p>
            <div className="mt-4">
              <SplitBar items={netWorthByChain} total={combinedNetWorth} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
