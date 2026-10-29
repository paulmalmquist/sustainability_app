// Tests run against fixed market data so results don't move with each weekly
// refresh. Tests that need real or sample data set it themselves.
import { NO_MARKET_DATA, setMarketData } from '../src/engine/marketData.ts';

setMarketData(NO_MARKET_DATA);
