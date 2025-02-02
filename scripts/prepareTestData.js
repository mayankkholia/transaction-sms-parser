import fs from "node:fs";
import excelToJson from "convert-excel-to-json";

const root = new URL("..", import.meta.url);
// console.log(root);
const testCasesJSONPath = new URL("tests/testCases.json", root);

const result = excelToJson({
  sourceFile: new URL("tests/testCases.xlsx", root).pathname,
  header: {
    rows: 1,
  },
  columnToKey: {
    A: "name",
    B: "message",
    C: "isTransaction",
    D: "accountType",
    E: "accountName",
    F: "accountNumber",
    G: "transactionAmount",
    H: "transactionType",
    I: "balanceAvailable",
    J: "balanceOutstanding",
    K: "merchantName",
    L: "transactionId",
    M: "skipRow",
  },
});

result.Sheet1 = result.Sheet1.filter((obj) => obj.isTransaction);
result.Sheet1 = result.Sheet1.filter((obj) => ~obj.skipRow);
fs.writeFileSync(
  testCasesJSONPath,
  JSON.stringify(result.Sheet1, null, 4),
  "utf-8",
);
