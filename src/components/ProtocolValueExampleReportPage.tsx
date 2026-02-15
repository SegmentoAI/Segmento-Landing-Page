import { useMemo, useState } from "react";

type Series = {
  label: string;
  color: string;
  values: number[];
};

type DumpRiskRow = {
  group: string;
  sizeOfGroup: number;
  competitionSizeOfGroup: number;
  expectedAirdropProportion: number;
  immediateDumpProbability: number;
  oneMonthDumpProbability: number;
  volumeShare: number;
  valueShare: number;
};

const actualMonths = 24;
const forecastMonths = 5;
const totalMonths = actualMonths + forecastMonths;
const expectedAirdropMonthIndex = 26;

const monthLabels = [
  "Mar 2024",
  "Apr 2024",
  "May 2024",
  "Jun 2024",
  "Jul 2024",
  "Aug 2024",
  "Sep 2024",
  "Oct 2024",
  "Nov 2024",
  "Dec 2024",
  "Jan 2025",
  "Feb 2025",
  "Mar 2025",
  "Apr 2025",
  "May 2025",
  "Jun 2025",
  "Jul 2025",
  "Aug 2025",
  "Sep 2025",
  "Oct 2025",
  "Nov 2025",
  "Dec 2025",
  "Jan 2026",
  "Feb 2026",
  "Mar 2026",
  "Apr 2026",
  "May 2026",
  "Jun 2026",
  "Jul 2026",
];

function buildSeries(
  base: number,
  growth: number,
  seasonal: number,
  forecastLift: number,
) {
  const values: number[] = [];

  for (let i = 0; i < totalMonths; i += 1) {
    const trend = base + growth * i;
    const wave = Math.sin(i * 0.55) * seasonal + Math.cos(i * 0.23) * seasonal * 0.45;

    if (i < actualMonths) {
      values.push(Math.max(0, Math.round(trend + wave)));
      continue;
    }

    const prev = values[i - 1];
    const carry = growth * forecastLift;
    const forecastWave = Math.sin(i * 0.55) * seasonal * 0.65;
    values.push(Math.max(0, Math.round(prev + carry + forecastWave * 0.2)));
  }

  return values;
}

function toMau(dau: number[], multiplier: number) {
  return dau.map((value, index) =>
    Math.round(value * (multiplier + Math.sin(index * 0.3) * 0.2)),
  );
}

function applyZeroFirstMonths(values: number[], zeroMonths: number) {
  return values.map((value, index) => (index < zeroMonths ? 0 : value));
}

function applySmallSlowDropAfter(
  values: number[],
  eventIndex: number,
  totalDropPct: number,
  durationMonths: number,
) {
  return values.map((value, index) => {
    if (index < eventIndex) return value;
    const progress = Math.min(1, (index - eventIndex + 1) / Math.max(1, durationMonths));
    return Math.round(value * (1 - totalDropPct * progress));
  });
}

function applyStepDropBeforeAndStabilize(
  values: number[],
  eventIndex: number,
  stepDropPct: number,
) {
  const startIndex = Math.max(0, eventIndex - 1);
  return values.map((value, index) => {
    if (index < startIndex) return value;
    return Math.round(value * (1 - stepDropPct));
  });
}

function applyLargeDropAt(
  values: number[],
  dropIndex: number,
  dropPct: number,
) {
  return values.map((value, index) => {
    if (index < dropIndex) return value;
    return Math.round(value * (1 - dropPct));
  });
}

function applyPostAirdropStepDip(
  values: number[],
  eventIndex: number,
  dipPct: number,
  monthlyRecoveryPct: number,
) {
  const dipIndex = eventIndex + 1;
  const adjusted = [...values];

  for (let index = dipIndex; index < adjusted.length; index += 1) {
    if (index === dipIndex) {
      adjusted[index] = Math.round(adjusted[index] * (1 - dipPct));
      continue;
    }
    adjusted[index] = Math.round(adjusted[index - 1] * (1 + monthlyRecoveryPct));
  }

  return adjusted;
}

function buildTwoPhaseSeries(
  base: number,
  earlyGrowth: number,
  lateGrowth: number,
  splitMonth: number,
  seasonal: number,
  forecastLift: number,
) {
  const values: number[] = [];

  for (let i = 0; i < totalMonths; i += 1) {
    if (i < actualMonths) {
      const earlyPart = Math.min(i, splitMonth) * earlyGrowth;
      const latePart = Math.max(0, i - splitMonth) * lateGrowth;
      const wave = Math.sin(i * 0.55) * seasonal + Math.cos(i * 0.27) * seasonal * 0.35;
      values.push(Math.max(0, Math.round(base + earlyPart + latePart + wave)));
      continue;
    }

    const prev = values[i - 1];
    const wave = Math.sin(i * 0.55) * seasonal * 0.25;
    values.push(Math.max(0, Math.round(prev + lateGrowth * forecastLift + wave)));
  }

  return values;
}

const highNetWorthBase = applyZeroFirstMonths(buildSeries(120, 8, 22, 1.4), 3);
const midNetWorthBase = buildSeries(410, 14, 36, 1.3);
const lowNetWorthBase = buildSeries(980, 28, 65, 1.2);
const highVolumeBase = applyZeroFirstMonths(buildSeries(210, 11, 27, 1.35), 3);
const midLowVolumeBase = buildSeries(890, 24, 54, 1.2);
const airdropFarmersBase = buildSeries(640, 4, 45, 1.05);
const airdropHoldersBase = buildSeries(180, 13, 23, 1.45);

const highNetWorthDau = applySmallSlowDropAfter(
  highNetWorthBase,
  expectedAirdropMonthIndex,
  0.16,
  4,
);
const midNetWorthDau = applyStepDropBeforeAndStabilize(
  midNetWorthBase,
  expectedAirdropMonthIndex + 1,
  0.09,
);
const lowNetWorthDau = applyStepDropBeforeAndStabilize(
  lowNetWorthBase,
  expectedAirdropMonthIndex + 1,
  0.07,
);
const highVolumeDau = applySmallSlowDropAfter(
  highVolumeBase,
  expectedAirdropMonthIndex,
  0.14,
  4,
);
const midLowVolumeDau = applyStepDropBeforeAndStabilize(
  midLowVolumeBase,
  expectedAirdropMonthIndex + 1,
  0.1,
);
const airdropFarmersDau = applyLargeDropAt(
  airdropFarmersBase,
  expectedAirdropMonthIndex,
  0.9,
);
const airdropHoldersDau = airdropHoldersBase;

const highNetWorthMau = applySmallSlowDropAfter(
  toMau(highNetWorthBase, 8.6),
  expectedAirdropMonthIndex + 1,
  0.12,
  3,
);
const midNetWorthMau = applyStepDropBeforeAndStabilize(
  toMau(midNetWorthBase, 9.2),
  expectedAirdropMonthIndex + 3,
  0.07,
);
const lowNetWorthMau = applyStepDropBeforeAndStabilize(
  toMau(lowNetWorthBase, 9.8),
  expectedAirdropMonthIndex + 3,
  0.06,
);
const highVolumeMau = applySmallSlowDropAfter(
  toMau(highVolumeBase, 8.9),
  expectedAirdropMonthIndex + 1,
  0.12,
  3,
);
const midLowVolumeMau = applyStepDropBeforeAndStabilize(
  toMau(midLowVolumeBase, 9.5),
  expectedAirdropMonthIndex + 3,
  0.08,
);
const airdropFarmersMau = applyLargeDropAt(
  toMau(airdropFarmersBase, 7.6),
  expectedAirdropMonthIndex + 1,
  0.9,
);
const airdropHoldersMau = toMau(airdropHoldersBase, 8.7);

const dauSeries: Series[] = [
  { label: "High net worth individuals", color: "#2563eb", values: highNetWorthDau },
  { label: "Mid net worth individuals", color: "#16a34a", values: midNetWorthDau },
  { label: "Low net worth individuals", color: "#84cc16", values: lowNetWorthDau },
  { label: "High trading volume individuals", color: "#9333ea", values: highVolumeDau },
  { label: "Mid and low trading volume individuals", color: "#f97316", values: midLowVolumeDau },
  { label: "Tagged airdrop farmers", color: "#dc2626", values: airdropFarmersDau },
  { label: "Airdrop holders", color: "#0f766e", values: airdropHoldersDau },
];

const mauSeries: Series[] = [
  { label: "High net worth individuals", color: "#2563eb", values: highNetWorthMau },
  { label: "Mid net worth individuals", color: "#16a34a", values: midNetWorthMau },
  { label: "Low net worth individuals", color: "#84cc16", values: lowNetWorthMau },
  { label: "High trading volume individuals", color: "#9333ea", values: highVolumeMau },
  { label: "Mid and low trading volume individuals", color: "#f97316", values: midLowVolumeMau },
  { label: "Tagged airdrop farmers", color: "#dc2626", values: airdropFarmersMau },
  { label: "Airdrop holders", color: "#0f766e", values: airdropHoldersMau },
];

const combinedMauNetWorth = applyPostAirdropStepDip(
  buildTwoPhaseSeries(2_800_000, 92_000, 355_000, 12, 190_000, 1.2),
  expectedAirdropMonthIndex,
  0.14,
  0.03,
);
const combinedMauMonthlyVolume = applyPostAirdropStepDip(
  buildTwoPhaseSeries(18_000_000, 430_000, 1_880_000, 12, 1_350_000, 1.2),
  expectedAirdropMonthIndex,
  0.24,
  0.045,
);

const dumpRiskRows: DumpRiskRow[] = [
  {
    group: "High net worth individuals",
    sizeOfGroup: 3.8,
    competitionSizeOfGroup: 4.9,
    expectedAirdropProportion: 9,
    immediateDumpProbability: 4.8,
    oneMonthDumpProbability: 12.9,
    volumeShare: 13.6,
    valueShare: 31.2,
  },
  {
    group: "Mid net worth individuals",
    sizeOfGroup: 29.5,
    competitionSizeOfGroup: 32.9,
    expectedAirdropProportion: 39,
    immediateDumpProbability: 13.2,
    oneMonthDumpProbability: 27.6,
    volumeShare: 19.8,
    valueShare: 25.8,
  },
  {
    group: "Low net worth individuals",
    sizeOfGroup: 66.7,
    competitionSizeOfGroup: 62.2,
    expectedAirdropProportion: 52,
    immediateDumpProbability: 37.5,
    oneMonthDumpProbability: 58.3,
    volumeShare: 17.1,
    valueShare: 8.4,
  },
  {
    group: "High trading volume individuals",
    sizeOfGroup: 38.7,
    competitionSizeOfGroup: 13.1,
    expectedAirdropProportion: 51,
    immediateDumpProbability: 18.1,
    oneMonthDumpProbability: 29.4,
    volumeShare: 26.4,
    valueShare: 16.7,
  },
  {
    group: "Mid and low trading volume individuals",
    sizeOfGroup: 61.3,
    competitionSizeOfGroup: 86.9,
    expectedAirdropProportion: 49,
    immediateDumpProbability: 31.5,
    oneMonthDumpProbability: 50.2,
    volumeShare: 16.9,
    valueShare: 10.6,
  },
  {
    group: "Individuals tagged as airdrop farmers",
    sizeOfGroup: 31,
    competitionSizeOfGroup: 32.1,
    expectedAirdropProportion: 9,
    immediateDumpProbability: 74.4,
    oneMonthDumpProbability: 89.1,
    volumeShare: 4.1,
    valueShare: 2.2,
  },
  {
    group: "Individuals that hold onto their airdrops",
    sizeOfGroup: 2.4,
    competitionSizeOfGroup: 4.9,
    expectedAirdropProportion: 5,
    immediateDumpProbability: 1.9,
    oneMonthDumpProbability: 8.4,
    volumeShare: 2.1,
    valueShare: 5.1,
  },
];

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

function buildSmoothPath(points: Array<{ x: number; y: number }>) {
  return points.reduce((path, point, index, all) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const prev = all[index - 1];
    const controlX = (prev.x + point.x) / 2;
    return `${path} C ${controlX} ${prev.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
  }, "");
}

function ForecastChart({
  title,
  subtitle,
  series,
  hiddenLabels = [],
  onToggleLabel,
}: {
  title: string;
  subtitle: string;
  series: Series[];
  hiddenLabels?: string[];
  onToggleLabel?: (label: string) => void;
}) {
  const width = 920;
  const height = 310;
  const padding = 36;
  const pointCount = monthLabels.length;
  const forecastStartIndex = actualMonths - 1;
  const expectedAirdropIndex = expectedAirdropMonthIndex;

  const visibleSeries = series.filter((line) => !hiddenLabels.includes(line.label));
  const plottedSeries = visibleSeries.length > 0 ? visibleSeries : series;

  const allValues = plottedSeries.flatMap((line) => line.values);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;

  const plotWidth = width - padding * 2;
  const splitX = padding + plotWidth * 0.5;
  const actualSpan = actualMonths - 1;
  const forecastSpan = pointCount - actualMonths;

  const getX = (index: number) => {
    if (index <= forecastStartIndex) {
      const ratio = actualSpan === 0 ? 0 : index / actualSpan;
      return padding + ratio * (plotWidth * 0.5);
    }
    const ratio = forecastSpan === 0 ? 0 : (index - forecastStartIndex) / forecastSpan;
    return splitX + ratio * (plotWidth * 0.5);
  };

  const getPoints = (values: number[]) =>
    values.map((value, index) => {
      const x = getX(index);
      const y = height - padding - ((value - min) * (height - padding * 2)) / range;
      return { x, y };
    });

  const forecastStartX = splitX;
  const expectedAirdropX = splitX + (width - padding - splitX) * 0.5;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{subtitle}</p>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-72 mt-4">
        <rect
          x={splitX}
          y={padding}
          width={width - padding - splitX}
          height={height - padding * 2}
          fill="#fef3c7"
          opacity="0.2"
        />
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
        <line
          x1={forecastStartX}
          y1={padding}
          x2={forecastStartX}
          y2={height - padding}
          className="stroke-yellow-600"
          strokeDasharray="6 6"
        />
        <line
          x1={expectedAirdropX}
          y1={padding}
          x2={expectedAirdropX}
          y2={height - padding}
          className="stroke-orange-600"
          strokeDasharray="4 5"
        />
        {plottedSeries.map((line) => {
          const points = getPoints(line.values);
          const actualPath = buildSmoothPath(points.slice(0, actualMonths));
          const preAirdropForecastPath = buildSmoothPath(
            points.slice(forecastStartIndex, expectedAirdropIndex + 1),
          );
          const postAirdropForecastPath = buildSmoothPath(
            points.slice(expectedAirdropIndex, pointCount),
          );

          return (
            <g key={line.label}>
              <path
                d={actualPath}
                fill="none"
                stroke={line.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={preAirdropForecastPath}
                fill="none"
                stroke={line.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="8 7"
              />
              <path
                d={postAirdropForecastPath}
                fill="none"
                stroke={line.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="2 7"
              />
            </g>
          );
        })}
      </svg>

      <div className="mt-3 relative h-5 text-xs text-gray-500">
        <span
          className="absolute -translate-x-1/2"
          style={{ left: `${(padding / width) * 100}%` }}
        >
          {monthLabels[0]}
        </span>
        <span
          className="absolute -translate-x-1/2 text-yellow-700 font-semibold"
          style={{ left: `${(forecastStartX / width) * 100}%` }}
        >
          Today (Feb 15, 2026)
        </span>
        <span
          className="absolute -translate-x-1/2 text-orange-700 font-semibold"
          style={{ left: `${(expectedAirdropX / width) * 100}%` }}
        >
          Expected airdrop
        </span>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
        {series.map((line) => (
          <button
            key={line.label}
            type="button"
            onClick={() => onToggleLabel?.(line.label)}
            disabled={!onToggleLabel}
            className={`flex items-center gap-2 text-left text-gray-700 ${
              hiddenLabels.includes(line.label) ? "opacity-40" : "opacity-100"
            } ${onToggleLabel ? "cursor-pointer" : "cursor-default"}`}
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: line.color }}
            />
            <span>{line.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProtocolValueExampleReportPage() {
  const [activityMode, setActivityMode] = useState<"DAU" | "MAU">("DAU");
  const [hiddenActivityLabels, setHiddenActivityLabels] = useState<string[]>([]);

  const activitySeries = useMemo(
    () => (activityMode === "DAU" ? dauSeries : mauSeries),
    [activityMode],
  );

  const combinedDumpRow = useMemo(() => {
    const totalSizeOfGroup = dumpRiskRows.reduce((sum, row) => sum + row.sizeOfGroup, 0);
    const totalCompetitionSizeOfGroup = dumpRiskRows.reduce(
      (sum, row) => sum + row.competitionSizeOfGroup,
      0,
    );
    const totalProportion = dumpRiskRows.reduce(
      (sum, row) => sum + row.expectedAirdropProportion,
      0,
    );
    const weightedImmediate =
      dumpRiskRows.reduce(
        (sum, row) =>
          sum + row.immediateDumpProbability * row.expectedAirdropProportion,
        0,
      ) / totalProportion;
    const weightedOneMonth =
      dumpRiskRows.reduce(
        (sum, row) =>
          sum + row.oneMonthDumpProbability * row.expectedAirdropProportion,
        0,
      ) / totalProportion;
    const volumeShare = dumpRiskRows.reduce((sum, row) => sum + row.volumeShare, 0);
    const valueShare = dumpRiskRows.reduce((sum, row) => sum + row.valueShare, 0);

    return {
      sizeOfGroup: totalSizeOfGroup,
      competitionSizeOfGroup: totalCompetitionSizeOfGroup,
      expectedAirdropProportion: totalProportion,
      immediateDumpProbability: weightedImmediate,
      oneMonthDumpProbability: weightedOneMonth,
      volumeShare,
      valueShare,
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-green-700">
            Segmento Protocol Value Report
          </h1>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">
            Protocol Value Example Report for: @ProtocolXY
          </h2>
          <p className="mt-3 text-gray-600">
            Investor-facing view of user quality, activity profile, and forward
            outlook. Data spans protocol launch to February 2026, with forecast
            through August 2026.
          </p>
        </section>

        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-gray-900">
              DAU and MAU by user quality segment
            </h3>
            <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
              <button
                type="button"
                className={`px-4 py-1.5 rounded-md text-sm font-semibold ${
                  activityMode === "DAU"
                    ? "bg-green-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActivityMode("DAU")}
              >
                DAU
              </button>
              <button
                type="button"
                className={`px-4 py-1.5 rounded-md text-sm font-semibold ${
                  activityMode === "MAU"
                    ? "bg-green-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActivityMode("MAU")}
              >
                MAU
              </button>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Includes high/mid/low net worth cohorts, trading volume cohorts,
            airdrop farmers, and users that hold onto airdrops.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Click a legend label to hide or unhide a line.
          </p>
          <div className="mt-4">
            <ForecastChart
              title={`${activityMode} trend from protocol launch to today + forecast`}
              subtitle={`Series shown in ${activityMode}. Dashed lines and yellow zone indicate forecast.`}
              series={activitySeries}
              hiddenLabels={hiddenActivityLabels}
              onToggleLabel={(label) =>
                setHiddenActivityLabels((previous) =>
                  previous.includes(label)
                    ? previous.filter((item) => item !== label)
                    : [...previous, label],
                )
              }
            />
          </div>
        </section>

        <ForecastChart
          title="Combined net worth of MAU users"
          subtitle="From protocol launch to today. Current: 179.2M"
          series={[
            {
              label: "Combined MAU net worth",
              color: "#15803d",
              values: combinedMauNetWorth,
            },
          ]}
        />

        <ForecastChart
          title="Cross protocol combined daily traded volume of MAU"
          subtitle="From protocol launch to today. Current: 344.4M"
          series={[
            {
              label: "Combined monthly traded volume",
              color: "#ca8a04",
              values: combinedMauMonthlyVolume,
            },
          ]}
        />

        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900">
            Expected airdrop dump behavior by cohort
          </h3>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-600">
                  <th className="text-left py-2 pr-4 font-semibold">Cohort</th>
                  <th className="text-left py-2 pr-4 font-semibold">Size of the group</th>
                  <th className="text-left py-2 pr-4 font-semibold">
                    Competition's size of the group
                  </th>
                  <th className="text-left py-2 pr-4 font-semibold">
                    Expected airdrop proportion
                  </th>
                  <th className="text-left py-2 pr-4 font-semibold">
                    Probability of immediate dump after airdrop
                  </th>
                  <th className="text-left py-2 pr-4 font-semibold">
                    Probability of airdrop dump within 1 month
                  </th>
                  <th className="text-left py-2 pr-4 font-semibold">
                    % of protocol trading volume
                  </th>
                  <th className="text-left py-2 pr-4 font-semibold">
                    % of $ brought into protocol (current value)
                  </th>
                </tr>
              </thead>
              <tbody>
                {dumpRiskRows.map((row) => (
                  <tr
                    key={row.group}
                    className={`${
                      row.group === "High net worth individuals"
                        ? "border-t-2 border-t-gray-300"
                        : ""
                    } ${
                      row.group === "Low net worth individuals" ||
                      row.group === "Mid and low trading volume individuals"
                        ? "border-b border-b-gray-300"
                        : row.group === "Individuals that hold onto their airdrops"
                          ? "border-b-2 border-b-gray-400"
                          : "border-b border-b-gray-100"
                    }`}
                  >
                    <td className="py-2 pr-4 font-medium text-gray-900">{row.group}</td>
                    <td className="py-2 pr-4 text-gray-700">
                      {formatPercent(row.sizeOfGroup)}
                    </td>
                    <td className="py-2 pr-4 text-gray-700">
                      {formatPercent(row.competitionSizeOfGroup)}
                    </td>
                    <td className="py-2 pr-4 text-gray-700">
                      {formatPercent(row.expectedAirdropProportion)}
                    </td>
                    <td className="py-2 pr-4 text-gray-700">
                      {formatPercent(row.immediateDumpProbability)}
                    </td>
                    <td className="py-2 pr-4 text-gray-700">
                      {formatPercent(row.oneMonthDumpProbability)}
                    </td>
                    <td className="py-2 pr-4 text-gray-700">{formatPercent(row.volumeShare)}</td>
                    <td className="py-2 pr-4 text-gray-700">{formatPercent(row.valueShare)}</td>
                  </tr>
                ))}
                <tr className="font-semibold text-gray-900">
                  <td className="py-2 pr-4">Combined value</td>
                  <td className="py-2 pr-4">-</td>
                  <td className="py-2 pr-4">-</td>
                  <td className="py-2 pr-4">-</td>
                  <td className="py-2 pr-4">
                    <div>{formatPercent(combinedDumpRow.immediateDumpProbability)}</div>
                    <div className="text-xs text-gray-500">
                      (weighted by expected airdrop)
                    </div>
                  </td>
                  <td className="py-2 pr-4">
                    <div>{formatPercent(combinedDumpRow.oneMonthDumpProbability)}</div>
                    <div className="text-xs text-gray-500">
                      (weighted by expected airdrop)
                    </div>
                  </td>
                  <td className="py-2 pr-4">{formatPercent(combinedDumpRow.volumeShare)}</td>
                  <td className="py-2 pr-4">{formatPercent(combinedDumpRow.valueShare)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
