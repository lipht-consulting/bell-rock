import * as faker from 'faker';

export function generateRandomMockObject() {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        jobTitle: faker.name.jobTitle(),
        title: faker.name.title(),
        jobArea: faker.name.jobArea(),
    };
}
