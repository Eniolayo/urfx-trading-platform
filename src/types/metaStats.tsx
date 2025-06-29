export interface MetaStatsStateProps {
  error: object | string | null;
  stats: MetaTradesParams[];
  won_lost: WonLostParams[];
  trades_by_week: TradesByWeekParams[];
  trades_by_hour: TradesByHourParams[];
}

export interface WonLostParams {
  name: string;
  value: number;
}

export interface TradesByHourParams {
  hour: string;
  lostProfit: number;
  wonProfit: number;
}

export interface TradesByWeekParams {
  name: string;
  lostProfit: number;
  wonProfit: number;
}

export interface MetaTradesParams {
  _id: string;
  symbol: string;
  type: string;
  volume: number;
  openPrice: number;
  closePrice: number;
  profit: number;
  openTime: string;
  closeTime: string;
}

export interface MetaTotalStatsStateProps {
  error: object | string | null;
  totalStats: MetaTotalStatsParams;
  analysisStats: MetaAnalysisStatsParams;
}

export interface MetaAnalysisStatsParams {
  start: string;
  end: string;
  status: string;
  accountSize: number;
  platform: {
    windows: string;
    mac: string;
    ios: string;
    android: string;
  };
  updated: string;
  minTradingDays: number;
  dailyLossLimit: number;
  maxDrawDown: number;
  profitTarget: number;
  challengeType: string;
}

export interface MetaTotalStatsParams {
  balance: number;
  equity: number;
  profit: number;
  todayWinRate: number;
  totalTrades: number;
  winTrades: number;
  avgHoldTime: number;
  successRate: number;
}

export interface MetaVisualTradesProps {
  error: object | string | null;
  visualTrades: MetaVisualTradesParams[];
  visualTradesByTimeRange: MetaVisualTradesByTimeRangeParams[];
  visualTradesByPositionSize: MetaVisualTradesByPositionSizeParams[];
  visualTradesBySymbol: MetaVisualTradesBySymbolParams[];
  visualTradesByType: MetaVisualTradesByTypeParams[];
}
export interface MetaVisualTradesParams {
  date: string;
  profit: number;
  loss: number;
}

export interface MetaVisualTradesByTimeRangeParams {
  range: string;
  totalProfit: number;
}

export interface MetaVisualTradesByPositionSizeParams {
  positionSize: string;
  totalProfit: number;
}

export interface MetaVisualTradesBySymbolParams {
  symbol: string;
  totalProfit: number;
}

export interface MetaVisualTradesByTypeParams {
  type: string;
  tradeCount: number;
}
