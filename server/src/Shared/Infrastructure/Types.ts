export type UserSession = { name: string; email: string; };

export type Primitives = string | boolean | number | Date;

export type ValueObjectConstructor<T> = new (_value: any) => T