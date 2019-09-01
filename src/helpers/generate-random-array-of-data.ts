import * as faker from 'faker';

// Generate random data, no primary keys on data
export function generateRandomArrayOfData(lengthOfArrayToReturn: number) {
    const returnArray = [];
    for (let i = 0; i <= lengthOfArrayToReturn; i++) {
        const randomData = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            jobTitle: faker.name.jobTitle(),
            title: faker.name.title(),
            jobArea: faker.name.jobArea(),
        };
        returnArray.push(randomData);
    }
    return returnArray;
}
