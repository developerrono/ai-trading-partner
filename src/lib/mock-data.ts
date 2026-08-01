export type Instrument = {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePct: string;
  direction: "up" | "down";
  trend: string;
  session: string;
  notes: string;
};

export const instruments: Instrument[] = [
  {
    symbol: "XAU/USD",
    name: "Gold",
    price: "2,412.60",
    change: "+18.40",
    changePct: "+0.77%",
    direction: "up",
    trend: "Bullish continuation above 2,398 demand",
    session: "London",
    notes: "Holding above weekly open. Watching 2,425 liquidity pool.",
  },
  {
    symbol: "XAG/USD",
    name: "Silver",
    price: "31.18",
    change: "-0.22",
    changePct: "-0.70%",
    direction: "down",
    trend: "Range-bound, lagging gold strength",
    session: "London",
    notes: "Needs reclaim of 31.45 to confirm intraday strength.",
  },
  {
    symbol: "DXY",
    name: "US Dollar Index",
    price: "104.28",
    change: "-0.16",
    changePct: "-0.15%",
    direction: "down",
    trend: "Corrective pullback into 104.10 support",
    session: "London",
    notes: "Soft dollar tone supports metals into New York open.",
  },
];

export const watchlist = [
  { symbol: "XAU/USD", price: "2,412.60", change: "+0.77%", direction: "up" as const },
  { symbol: "XAG/USD", price: "31.18", change: "-0.70%", direction: "down" as const },
  { symbol: "DXY", price: "104.28", change: "-0.15%", direction: "down" as const },
  { symbol: "US30", price: "39,412", change: "+0.31%", direction: "up" as const },
  { symbol: "NAS100", price: "18,204", change: "+0.62%", direction: "up" as const },
  { symbol: "EUR/USD", price: "1.0872", change: "+0.11%", direction: "up" as const },
];

export const economicEvents = [
  { time: "10:00", region: "EUR", event: "ECB Lane Speech", impact: "Medium" },
  { time: "13:30", region: "USD", event: "Core PCE Price Index m/m", impact: "High" },
  { time: "15:00", region: "USD", event: "Consumer Sentiment", impact: "Medium" },
  { time: "18:00", region: "USD", event: "Crude Oil Rig Count", impact: "Low" },
];

export const alerts = [
  {
    id: "a1",
    type: "Price",
    title: "Gold tapped 2,410 alert level",
    body: "XAU/USD traded into your marked supply zone at 2,410. Reaction candle forming on M15.",
    time: "12 min ago",
    unread: true,
  },
  {
    id: "a2",
    type: "Session",
    title: "London session opened",
    body: "Liquidity is now active. Your plan flags the first hour as no-trade observation time.",
    time: "1 hr ago",
    unread: true,
  },
  {
    id: "a3",
    type: "News",
    title: "Core PCE releases in 3 hours",
    body: "High impact USD event at 13:30. Consider flattening exposure 15 minutes before print.",
    time: "2 hr ago",
    unread: false,
  },
  {
    id: "a4",
    type: "AI",
    title: "Journal reminder",
    body: "You closed two trades yesterday without notes. Add reasoning to keep review quality high.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "a5",
    type: "AI",
    title: "Risk pattern detected",
    body: "Last 4 losses occurred after 16:00. RONO suggests capping late-session entries this week.",
    time: "Yesterday",
    unread: false,
  },
];

export type Trade = {
  id: string;
  date: string;
  symbol: string;
  side: "Long" | "Short";
  entry: string;
  exit: string;
  size: string;
  rr: string;
  pnl: number;
  result: "Win" | "Loss" | "Break-even";
  session: string;
  setup: string;
  notes: string;
  emotion: string;
};

export const trades: Trade[] = [
  {
    id: "T-1042",
    date: "2026-07-31",
    symbol: "XAU/USD",
    side: "Long",
    entry: "2,394.20",
    exit: "2,411.80",
    size: "0.80",
    rr: "2.4R",
    pnl: 1408,
    result: "Win",
    session: "London",
    setup: "Demand zone reclaim after liquidity sweep",
    notes: "Waited for M15 confirmation candle. Held through NY open, partial at 1.5R.",
    emotion: "Patient",
  },
  {
    id: "T-1041",
    date: "2026-07-30",
    symbol: "DXY",
    side: "Short",
    entry: "104.62",
    exit: "104.71",
    size: "1.00",
    rr: "-1.0R",
    pnl: -420,
    result: "Loss",
    session: "New York",
    setup: "Failed breakdown continuation",
    notes: "Entered before the session range formed. Stop was too tight for the volatility.",
    emotion: "Rushed",
  },
  {
    id: "T-1040",
    date: "2026-07-30",
    symbol: "XAG/USD",
    side: "Long",
    entry: "30.84",
    exit: "31.36",
    size: "2.00",
    rr: "1.8R",
    pnl: 640,
    result: "Win",
    session: "London",
    setup: "Trend pullback to 20EMA",
    notes: "Clean structure, scaled out in thirds. Followed the plan exactly.",
    emotion: "Neutral",
  },
  {
    id: "T-1039",
    date: "2026-07-29",
    symbol: "XAU/USD",
    side: "Short",
    entry: "2,388.10",
    exit: "2,388.30",
    size: "0.50",
    rr: "0.0R",
    pnl: -12,
    result: "Break-even",
    session: "Asia",
    setup: "Range fade",
    notes: "Thin liquidity, closed manually at breakeven. Correct decision.",
    emotion: "Disciplined",
  },
  {
    id: "T-1038",
    date: "2026-07-28",
    symbol: "XAU/USD",
    side: "Long",
    entry: "2,362.40",
    exit: "2,381.90",
    size: "1.00",
    rr: "3.1R",
    pnl: 1950,
    result: "Win",
    session: "New York",
    setup: "Post-news continuation",
    notes: "Best trade of the week. Waited 20 minutes after the print before entry.",
    emotion: "Confident",
  },
  {
    id: "T-1037",
    date: "2026-07-25",
    symbol: "XAG/USD",
    side: "Short",
    entry: "31.72",
    exit: "31.94",
    size: "1.50",
    rr: "-1.0R",
    pnl: -330,
    result: "Loss",
    session: "London",
    setup: "Supply rejection",
    notes: "Counter-trend attempt against a strong daily candle. Avoid this pattern.",
    emotion: "Impatient",
  },
];

export const journalStats = {
  winRate: 62,
  trades: 42,
  avgRR: "1.9R",
  profitFactor: "2.14",
  netPnl: "+$8,420",
  bestSession: "London",
  maxDrawdown: "-4.2%",
  avgHold: "2h 14m",
};

export const equityCurve = [
  { day: "Wk 1", value: 10000 },
  { day: "Wk 2", value: 10620 },
  { day: "Wk 3", value: 10410 },
  { day: "Wk 4", value: 11280 },
  { day: "Wk 5", value: 11940 },
  { day: "Wk 6", value: 11710 },
  { day: "Wk 7", value: 12680 },
  { day: "Wk 8", value: 13420 },
];

export const recentJournal = [
  {
    id: "T-1042",
    symbol: "XAU/USD",
    result: "Win",
    rr: "2.4R",
    note: "Waited for confirmation. Plan followed end to end.",
    date: "31 Jul",
  },
  {
    id: "T-1041",
    symbol: "DXY",
    result: "Loss",
    rr: "-1.0R",
    note: "Early entry before session range formed.",
    date: "30 Jul",
  },
  {
    id: "T-1040",
    symbol: "XAG/USD",
    result: "Win",
    rr: "1.8R",
    note: "Trend pullback, scaled out in thirds.",
    date: "30 Jul",
  },
];

export const reports = [
  {
    period: "Daily Report",
    range: "31 July 2026",
    stats: [
      { label: "Trades", value: "3" },
      { label: "Win rate", value: "67%" },
      { label: "Net P&L", value: "+$1,628" },
      { label: "Avg R", value: "1.9R" },
    ],
    summary:
      "Discipline was strong today. All three entries came from pre-marked levels and you avoided the pre-PCE chop. The single loss was small and within plan. Keep the no-trade window around high-impact releases.",
    highlights: [
      "Best execution: XAU/USD long from 2,394 demand",
      "One deviation: added size mid-trade without a written reason",
      "Session focus: London produced 100% of the day's profit",
    ],
  },
  {
    period: "Weekly Report",
    range: "27 Jul – 31 Jul 2026",
    stats: [
      { label: "Trades", value: "11" },
      { label: "Win rate", value: "64%" },
      { label: "Net P&L", value: "+$3,236" },
      { label: "Avg R", value: "1.7R" },
    ],
    summary:
      "A constructive week driven by metals. Your edge is clearly concentrated in London-session continuation setups, while counter-trend fades produced every losing trade. Consider removing fades from the playbook for two weeks and measuring the difference.",
    highlights: [
      "Counter-trend trades: 0 wins from 3 attempts",
      "Average hold time improved from 3h 10m to 2h 14m",
      "Risk per trade stayed within 1% on every entry",
    ],
  },
  {
    period: "Monthly Report",
    range: "July 2026",
    stats: [
      { label: "Trades", value: "42" },
      { label: "Win rate", value: "62%" },
      { label: "Net P&L", value: "+$8,420" },
      { label: "Profit factor", value: "2.14" },
    ],
    summary:
      "Your most consistent month so far. Equity grew steadily with a controlled 4.2% maximum drawdown. The main remaining leak is late-session revenge entries after a loss — four of the month's six worst trades happened within 40 minutes of a stop-out.",
    highlights: [
      "Strongest instrument: XAU/USD (+$6,110)",
      "Weakest window: 16:00–18:00 (-$1,240)",
      "Journal completion rate: 88% of trades documented",
    ],
  },
];

export const chatSeed = [
  {
    role: "assistant" as const,
    content:
      "Good morning. London is open and gold is holding above the 2,398 demand zone with a soft dollar backdrop. Your plan for today flags Core PCE at 13:30 as the main risk event. Where would you like to start?",
  },
  {
    role: "user" as const,
    content: "Walk me through the gold bias for today.",
  },
  {
    role: "assistant" as const,
    content:
      "Bias is cautiously bullish.\n\n• Structure: higher lows on H4 since Monday, weekly open reclaimed.\n• Liquidity: resting highs at 2,425 are the obvious magnet.\n• Invalidation: an H4 close below 2,392 flips the intraday read to neutral.\n\nBased on your journal, your best version of this setup is a pullback entry after a London liquidity sweep — not a breakout chase. Want me to draft the trade plan with risk sizing?",
  },
];

export const suggestedPrompts = [
  "Give me today's market briefing",
  "Review my last five trades",
  "What is my most profitable setup?",
  "Prepare a plan for the New York session",
  "Where am I losing the most money?",
  "Quiz me on my trading rules",
];

export const aiMemory = [
  "Trades XAU/USD, XAG/USD and DXY only",
  "Risk capped at 1% per trade, 3% daily",
  "Prefers London session continuation setups",
  "Avoids trading 15 minutes around high-impact news",
  "Working on: no re-entry within 40 minutes of a loss",
];
