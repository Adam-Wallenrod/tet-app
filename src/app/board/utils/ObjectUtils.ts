export class ObjectUtils {
  static enumToArray<T>(arg: {[key: string]: T}): T[] {
    return Object.values(arg);
  }
}
