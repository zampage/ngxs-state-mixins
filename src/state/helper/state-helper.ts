import { createSelector } from '@ngxs/store';
import { Constructor } from './state-mixin';

export function createChildSelectors<
  TStateModel,
  TChildPath extends keyof TStateModel,
  TSelectors extends Record<string, (state: TStateModel[TChildPath]) => unknown>
>(parentState: Constructor, selectors: TSelectors, childStatePath: TChildPath) {
  return Object.fromEntries(
    Object.entries(selectors).map(([key, value]) => [
      key,
      createSelector([parentState], (state: TStateModel) =>
        value(state[childStatePath])
      ),
    ])
  ) as {
    [K in keyof TSelectors]: (state: TStateModel) => ReturnType<TSelectors[K]>;
  };
}
