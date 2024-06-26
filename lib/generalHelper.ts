import crypto from "crypto";

/**
 * Generates a random integer within a specified range, inclusive of both the minimum and maximum values.
 * @param {number} min - The minimum value in the range.
 * @param {number} max - The maximum value in the range.
 * @returns {number} A random integer between min and max, inclusive.
 */
export function randomIntFromRange(min: number, max: number): number {
  return Math.floor(randomUniform(min, max + 1));
}

/**
 * Generates a random floating-point number within a specified range, including the minimum value but excluding the maximum value.
 * @param {number} min - The minimum value in the range.
 * @param {number} max - The maximum value in the range.
 * @returns {number} A random floating-point number between min and max, exclusive of max.
 */
export function randomUniform(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Converts a camelCase string to kebab-case.
 * @param {string} str - The camelCase string to convert.
 * @returns {string} The string converted to kebab-case.
 */
export function camelToKebabCase(str: string): string {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase();
}

/**
 * Checks if a string represents a valid number.
 * @param {string} str - The string to check.
 * @returns {boolean} True if the string represents a valid number, otherwise false.
 */
export function isStringNumber(str: string): boolean {
  return !isNaN(+str);
}

/**
 * Converts a string with a custom keyword suffix to a number.
 * @param {string} inputString - The string to convert (e.g., "50%", "50", "30deg", "30").
 * @param {string} suffix - The custom keyword suffix to remove (e.g., "%", "deg").
 * @returns {number} The numerical value of the input string. Returns 0 if the input is not valid.
 */
export function stringWithUnitSuffixToNumber(
  inputString: string,
  suffix: string
): number {
  const regex = new RegExp(`^(-?\\d*\\.?\\d+)${suffix}?$`);
  const match = inputString.match(regex);

  if (match) {
    return parseFloat(match[1]);
  } else {
    return 0;
  }
}

/**
 * Calculates the result of a general modulo operation that always returns a non-negative result.
 * @param {number} a - The dividend.
 * @param {number} b - The divisor.
 * @returns {number} The non-negative result of the modulo operation.
 */
export function modInRange(a: number, b: number): number {
  const quotient = Math.floor(a / b);
  const result = a - quotient * b;
  return result < 0 ? result + b : result;
}

/**
 * Generates a hashed and encoded string representation of an object using SHA-256 algorithm.
 * @param {any} obj - The object to be hashed and encoded.
 * @param {number} [length=12] - The desired length of the encoded hash. Defaults to 12.
 * @returns {string} The hashed and encoded string representation of the object.
 */
export function hashAndEncode(obj: any, length: number = 12): string {
  const jsonString = JSON.stringify(obj);

  const hash = crypto.createHash("sha256").update(jsonString).digest("base64");

  const encodedHash = hash.replace(/[+/=]/g, "");

  const trimmedHash = encodedHash.substring(
    0,
    Math.min(length, encodedHash.length)
  );

  return trimmedHash;
}

/**
 * Clamps a value within a specified range.
 * @param {number} value - The value to be clamped.
 * @param {number} min - The minimum boundary of the range.
 * @param {number} max - The maximum boundary of the range.
 * @returns {number} The clamped value.
 */
export function clampValue(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
