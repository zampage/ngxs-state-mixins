import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Selector, State } from '@ngxs/store';
import { StateMixinBuilder } from './lib/mixin';
import {
  AddressStateExtension,
  AddressStateExtensionModel,
} from './mixins/address.state';
import {
  PersonStateExtension,
  PersonStateExtensionModel,
} from './mixins/person.state';

export type MedicalLicense = {
  expirationDate: Date;
  code: string;
};

type DoctorStateModel = {
  medicalLicense: MedicalLicense;
} & PersonStateExtensionModel &
  AddressStateExtensionModel;

const DOCTOR_STATE_NAME = 'doctorState';

@State({
  name: DOCTOR_STATE_NAME,
  defaults: {
    medicalLicense: {
      expirationDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24), // +1 day
      code: 'ABC-DEF-G',
    },
    person: {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
    },
    address: {
      street: faker.location.street(),
      buildingNumber: faker.location.buildingNumber(),
      zipCode: +faker.location.zipCode('####'),
      city: faker.location.city(),
    },
  } satisfies DoctorStateModel,
})
class DoctorStateBase {
  @Selector()
  static medicalLicense(state: DoctorStateModel) {
    return state.medicalLicense;
  }

  @Selector([DoctorStateBase.medicalLicense])
  static hasValidLicense(license: MedicalLicense) {
    return license.expirationDate.getTime() > new Date().getTime();
  }
}

const builder = new StateMixinBuilder(DoctorStateBase);

@Injectable()
export class DoctorState extends builder
  .params(DOCTOR_STATE_NAME)
  .with(PersonStateExtension)
  .with(AddressStateExtension) {}

export class DoctorStateQueries {
  @Selector([DoctorState.person.fullname, DoctorState.medicalLicense])
  static fullLicense(name: string, license: MedicalLicense) {
    return `${name} <${license.code}>`;
  }

  @Selector([
    DoctorState.hasValidLicense,
    DoctorState.person.fullname,
    DoctorState.address.streetAddress,
  ])
  static postal(isDoctor: boolean, name: string, streetAddress: string) {
    return `${isDoctor ? 'Dr. ' : ''}${name}, ${streetAddress}`;
  }
}
