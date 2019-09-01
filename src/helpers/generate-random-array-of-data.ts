import * as faker from 'faker';
import { generateRandomMockObject } from './generate-random-mock-object';

// Generate random data, no primary keys on data
export function generateRandomArrayOfData(lengthOfArrayToReturn: number) {
    const returnArray = [];
    for (let i = 0; i <= lengthOfArrayToReturn; i++) {
        const randomData = generateRandomMockObject();
        returnArray.push(randomData);
    }
    return returnArray;
}
