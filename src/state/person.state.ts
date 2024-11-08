import { State } from '@ngxs/store';
import { createChildSelectors } from './helper/state-helper';
import { Constructor } from './helper/state-mixin';

type PersonStateModel = {
  firstname: string;
  lastname: string;
};

export type PersonStateExtensionModel = {
  person: PersonStateModel;
};

const PersonStateSelectors = {
  firstname: (state: PersonStateModel) => state.firstname,
  lastname: (state: PersonStateModel) => state.lastname,
  fullname: (state: PersonStateModel) => `${state.firstname} ${state.lastname}`,
};

export function PersonStateExtension<
  TStateModel extends PersonStateExtensionModel,
  T extends Constructor
>(base: T, stateName: string) {
  @State({
    name: stateName,
  })
  class PersonStateExtension extends base {
    static get person() {
      return createChildSelectors<
        TStateModel,
        'person',
        typeof PersonStateSelectors
      >(base, PersonStateSelectors, 'person');
    }
  }

  return PersonStateExtension;
}
