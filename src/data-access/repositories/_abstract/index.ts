export default interface Repository<T> {
  list(): Promise<T[]>;
  where(filterFn: (i: T) => boolean): Promise<T[]>;
}
