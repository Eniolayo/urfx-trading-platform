import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { dispatch } from "../store";
import {
  MetaAnalysisStatsParams,
  MetaTotalStatsStateProps,
} from "@/types/metaStats";
import { differenceInDays, formatDate } from "date-fns";

const initialState: MetaTotalStatsStateProps = {
  error: null,
  totalStats: {
    balance: 0,
    equity: 0,
    profit: 0,
    todayWinRate: 0,
    totalTrades: 0,
    winTrades: 0,
    avgHoldTime: 0,
    successRate: 0,
  },
  analysisStats: {
    start: "",
    end: "",
    status: "",
    accountSize: 0,
    platform: {
      windows: "",
      mac: "",
      ios: "",
      android: "",
    },
    updated: "",
    minTradingDays: 0,
    dailyLossLimit: 0,
    maxDrawDown: 0,
    profitTarget: 0,
    challengeType: ""
  },
};

const metaTotalStats = createSlice({
  name: "metaTotalStats",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getMetaTotalStatsSuccess(state, action) {
      state.totalStats = action.payload;
    },
    getAnalysisStatsSuccess(state, action) {
      state.analysisStats = action.payload;
    },
  },
});

export const { hasError, getMetaTotalStatsSuccess } = metaTotalStats.actions;

export function getMetaTotalStats(accountId: string) {
  return async () => {
    try {
      const response = await axios.post("metaStats/total-stats", { accountId });
      dispatch(
        metaTotalStats.actions.getMetaTotalStatsSuccess(response.data.data.data)
      );
      return response.data.data.result;
    } catch (err) {
      dispatch(metaTotalStats.actions.hasError(err));
    }
  };
}

export function updateAnalysis(accountId: string) {
  return async () => {
    try {
      const response = await axios.post("metaStats/update-analysis", {
        accountId,
      });
      console.log(response.data);
      if (response?.data?.data?.analysisData) {
        const updatedData: MetaAnalysisStatsParams = {
          updated: formatDate(
            new Date(response.data.data.analysisData.updatedAt),
            "MM/dd/yyyy"
          ),
          start: formatDate(
            new Date(response.data.data.analysisData.createdAt),
            "MM/dd/yyyy"
          ),
          end: "-",
          status: response.data.data.analysisData.mtAccount.status,
          accountSize: response.data.data.analysisData.initBalance,
          platform:
            response.data.data.analysisData.mtAccount.platform === "mt4"
              ? {
                  windows:
                    "https://download.mql5.com/cdn/web/16626/mt4/forextimefxtm4setup.exe?utm_blocka=cs003",
                  mac: "https://download.mql5.com/cdn/web/metaquotes.software.corp/mt4/MetaTrader4.pkg.zip?utm_source=www.metatrader4.com&utm_campaign=download.mt4.macos",
                  ios: "https://apps.apple.com/my/app/metatrader-4/id496212596",
                  android:
                    "https://play.google.com/store/apps/details?id=net.metaquotes.metatrader4&hl=en&referrer=ref_id%3d5008970588049925536%26utm_campaign%3d64289654%26utm_source%3d64289654%26hl%3den%26server%3dForexTimeFXTM-Cent%252cForexTimeFXTM-Cent-demo%252cForexTimeFXTM-ECN%252cForexTimeFXTM-ECN-demo%252cForexTimeFXTM-ECN-Zero%252cForexTimeFXTM-Pro%252cForexTimeFXTM-Standard%252cForexTimeFXTM-Standard-demo%252cForexTimeFXTM-ECN-Zero-demo",
                }
              : {
                  windows:
                    "https://download.mql5.com/cdn/web/16626/mt5/forextimefxtm5setup.exe?utm_blocka=cs003",
                  mac: "https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/MetaTrader5.pkg.zip?utm_source=www.metatrader5.com&utm_campaign=download.mt5.macos",
                  ios: "https://apps.apple.com/us/app/metatrader-5/id413251709",
                  android:
                    "https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5&hl=en&referrer=ref_id%3d5008970588049925536%26utm_campaign%3d64289654%26utm_source%3d64289654%26hl%3den%26server%3dForexTimeFXTM-Cent%252cForexTimeFXTM-Cent-demo%252cForexTimeFXTM-ECN%252cForexTimeFXTM-ECN-demo%252cForexTimeFXTM-ECN-Zero%252cForexTimeFXTM-Pro%252cForexTimeFXTM-Standard%252cForexTimeFXTM-Standard-demo%252cForexTimeFXTM-ECN-Zero-demo",
                },
          minTradingDays: differenceInDays(
            new Date(response.data.data.analysisData.updatedAt),
            new Date(response.data.data.analysisData.createdAt)
          ),
          dailyLossLimit: response.data.data.analysisData.dailyLoss,
          maxDrawDown: response.data.data.analysisData.maxDrawdown,
          profitTarget: response.data.data.analysisData.profit,
          challengeType: response.data.data.analysisData.mtAccount.challengeType,
        };
        dispatch(metaTotalStats.actions.getAnalysisStatsSuccess(updatedData));
      }
    } catch (err) {
      console.error(err);
    }
  };
}

export default metaTotalStats.reducer;
