import CryptoJS from "crypto-js";

const RESULTS_COUNT = 40;

const generateResult = (
  server_seed: string,
  client_seed: string,
  nonce: number,
  sub_nonce: number,
  resultsCount: number
): number => {
  const betHash = CryptoJS.HmacSHA256(
    server_seed,
    `${client_seed}_${nonce}_${sub_nonce}`
  ).toString();
  const floats = new Array(4).fill(0).map((el, index) => {
    return parseInt(betHash.substr(index * 2, 2), 16);
  });
  let sum = 0;
  floats.forEach((float, index) => {
    sum += round(float / Math.pow(256, index + 1), 10);
  });
  return round(sum * resultsCount, 0, "floor");
};

const round = (
  oldAmount: number,
  decimal: number,
  direction: string = "round"
): number => {
  if (!oldAmount && oldAmount !== 0) return oldAmount;
  const amount = parseFloat(String(oldAmount));
  decimal = Math.pow(10, decimal);
  const result = Math[direction](amount * decimal) / decimal;
  return result === 0 ? 0 : result;
};

const generateSquares = (length: number): Array<number> => {
  return new Array(length).fill(0).map((el, index) => index + 1);
};

const generateResults = (
  server_seed: string,
  client_seed: string,
  nonce: number,
  drawCount: number
): Array<number> => {
  const results = [];
  const squareArray = generateSquares(RESULTS_COUNT);
  for (let i = 0; i < drawCount; i++) {
    const maxIndex = squareArray.length - 1;
    const hitIndex = generateResult(
      server_seed,
      client_seed,
      nonce,
      i,
      squareArray.length
    );
    const hit = squareArray[hitIndex];
    squareArray[hitIndex] = squareArray[maxIndex];
    squareArray.pop();
    results.push(hit);
  }
  return results;
};

export default generateResults;
