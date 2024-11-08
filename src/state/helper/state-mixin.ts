export type Constructor<T = any> = new (...args: any[]) => T;

type StateMixin<T extends Constructor, R extends Constructor> = (
  base: T,
  stateName: string
) => T & R;

export class StateMixinBuilder<T extends Constructor> {
  constructor(private base: T) {}

  params(stateName: string) {
    const Base = this.base;

    return class extends Base {
      static with<R extends Constructor>(mixin: StateMixin<T, R>) {
        const Mixed = mixin(Base, stateName);
        return new StateMixinBuilder(Mixed).params(stateName);
      }
    };
  }
}
