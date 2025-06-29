import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { dispatch } from "../store";
import { MetaVisualTradesProps } from "@/types/metaStats";

const initialState: MetaVisualTradesProps = {
  error: null,
  visualTrades: [],
  visualTradesByPositionSize: [],
  visualTradesBySymbol: [],
  visualTradesByTimeRange: [],
  visualTradesByType: [],
};

const metaVisualTrades = createSlice({
  name: "metaVisualTrades",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getMetaVisualTradesSuccess(state, action) {
      state.visualTrades = action.payload;
    },
    getMetaVisualTradesByTimeRangeSuccess(state, action) {
      state.visualTradesByTimeRange = action.payload;
    },
    getMetaVisualTradesBySymbolSuccess(state, action) {
      state.visualTradesBySymbol = action.payload;
    },
    getMetaVisualTradesByPositionSizeSuccess(state, action) {
      state.visualTradesByPositionSize = action.payload;
    },
    getMetaVisualTradesByTypeSuccess(state, action) {
      state.visualTradesByType = action.payload;
    },
  },
});

export const { hasError, getMetaVisualTradesSuccess } =
  metaVisualTrades.actions;

export function getMetaVisualTrades(
  email: string,
  index: string,
  accountId: string
) {
  return async () => {
    try {
      const response = await axios.post("metaStats/visual-trades", {
        email,
        index,
        accountId,
      });
      dispatch(
        metaVisualTrades.actions.getMetaVisualTradesSuccess(
          response.data.data.finalResult
        )
      );
      dispatch(
        metaVisualTrades.actions.getMetaVisualTradesByTimeRangeSuccess(
          response.data.data.tradesByTimeRange
        )
      );
      dispatch(
        metaVisualTrades.actions.getMetaVisualTradesBySymbolSuccess(
          response.data.data.tradesBySymbol
        )
      );
      dispatch(
        metaVisualTrades.actions.getMetaVisualTradesByPositionSizeSuccess(
          response.data.data.tradesByPositionSizes
        )
      );
      dispatch(
        metaVisualTrades.actions.getMetaVisualTradesByTypeSuccess(
          response.data.data.tradesByType
        )
      );
    } catch (err) {
      dispatch(metaVisualTrades.actions.hasError(err));
    }
  };
}

export default metaVisualTrades.reducer;
