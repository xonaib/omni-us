
export function coerceArray<T>(value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value];
}

/**
 * checks if array is valid
 * fails for null
 * @param items array to test
 */
export function isArray<T>(items: T[]): boolean {
    return (items != null && Array.isArray(items));
}

export function isArrayEmpty<T>(items: T[]): boolean {
    return items && items.length === 0;
    // return isArrayValid(items) && items.length === 0;
}
