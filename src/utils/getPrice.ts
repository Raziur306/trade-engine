import { CategoryListV5, TickerLinearInverseV5 } from "bybit-api";
import { sendMessageToAdminGroup } from "../api/telegraf/adminBot";

export function getPrice(params: CategoryListV5<TickerLinearInverseV5[], 'linear' | 'inverse'>, symbol: string): number | null {
    const result = params.list.find((item) => item.symbol === symbol);
    if (!result) {
        sendMessageToAdminGroup(`Ticker info not found for symbol: ${symbol}`);
        return null;
    }
    return Number(result.lastPrice);
}
