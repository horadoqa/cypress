import { faker } from '@faker-js/faker';

const user = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    adress: faker.location.streetAddress(),
    birthday: faker.date.birthdate(),
    sex: faker.person.sexType(),
    subscriptionTier: faker.helpers.arrayElement(['free', 'basic' , 'business']),
};

console.log(user);