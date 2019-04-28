/**
 * Merges the pieces of an generic type into a new object which contains all them own properties.
 * Properties with same name are overrides in order.
 *
 * @example
 * const original: User = { name: 'Juliana', age: 19 };
 * const alter: User = fuse(original, { age: 25 }, { isHot: true });
 * // The 'alter' equals { name: 'Juliana', age: 25, isHot: true } and also is a new object.
 */
export function fuse<T>(...pieces: Partial<T>[]): T {
    return Object.assign({}, ...pieces);
}
