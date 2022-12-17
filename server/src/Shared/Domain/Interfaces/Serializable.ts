export interface Serializable<T = any> {
  serialize(): T;
}