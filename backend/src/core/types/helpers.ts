export type Optional<T, K extends keyof T> = Omit<T, K> & Pick<Partial<T>, K>;
export type ArrayToUnion<T extends Array<unknown>> = T[number];
export type UnknownObject = Record<string, unknown>;
