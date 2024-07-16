import { escapeMarkdownV2 } from "../utils";

const formatTradeCallMessage = (message: string): string => {
    const lines = message.split(";").map((line) => line.trim());
    const formattedLines = lines.map((line, index) => {
      switch (index) {
        case 0:
          return `\\- **Invest**: ${escapeMarkdownV2(line.replace("Invest", "").trim())}`;
        case 1:
          return `\\- **Sell**: ${escapeMarkdownV2(line.replace("aim to sell at", "").trim())}`;
        case 2:
          return `\\- **Stop**: ${escapeMarkdownV2(line.replace("stop if it falls to", "").trim())}`;
        default:
          return escapeMarkdownV2(line);
      }
    });
  
    return formattedLines.join("\n");
  };

  

  export { formatTradeCallMessage };