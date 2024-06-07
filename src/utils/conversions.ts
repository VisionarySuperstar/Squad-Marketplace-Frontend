export type Numberish = number | string | BigInt;

/**
 * Scales a floating point number, e.g. 1.5 to a number with fixed `decimals` precision, e.g. 1.5 with 6 decimals is 1500000
 * @note this function only works with at least 6 decimals
 */
export function scale(value: Numberish, decimals: number = 6): BigInt {
  if (typeof value === "bigint") {
    return value * BigInt(10 ** decimals);
  }

  // do not scale directly by 10 ** decimals to avoid floating point errors, e.g. BigInt(12345 * 10 ** 18)
  return BigInt(Number(value) * 10 ** 6) * BigInt(10 ** (decimals - 6));
}
/**
 * Uncales a scaled number to a floating point
 * @note this function only works with at least 6 decimals
 */
export function unscale(value: Numberish, decimals: number = 6): number {
  if (typeof value === "bigint") {
    return Number(value) / 10 ** decimals;
  }

  return Number(value) / 10 ** 6 / 10 ** (decimals - 6);
}
