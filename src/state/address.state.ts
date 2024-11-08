import { State } from '@ngxs/store';
import { createChildSelectors } from './helper/state-helper';
import { Constructor } from './helper/state-mixin';

type AddressStateModel = {
  street: string;
  buildingNumber: string;
  zipCode: number;
  city: string;
};

export type AddressStateExtensionModel = {
  address: AddressStateModel;
};

const AddressStateSelectors = {
  street: (state: AddressStateModel) => state.street,
  buildingNumber: (state: AddressStateModel) => state.buildingNumber,
  zipCode: (state: AddressStateModel) => state.zipCode,
  city: (state: AddressStateModel) => state.city,
  streetAddress: (state: AddressStateModel) =>
    `${state.street} ${state.buildingNumber}, ${state.zipCode} ${state.city}`,
};

export function AddressStateExtension<
  TStateModel extends AddressStateExtensionModel,
  T extends Constructor
>(base: T, stateName: string) {
  @State({ name: stateName })
  class AddressStateExtension extends base {
    static get address() {
      return createChildSelectors<
        TStateModel,
        'address',
        typeof AddressStateSelectors
      >(base, AddressStateSelectors, 'address');
    }
  }

  return AddressStateExtension;
}
