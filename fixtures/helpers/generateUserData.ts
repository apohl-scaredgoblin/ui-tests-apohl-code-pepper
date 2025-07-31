import { faker } from '@faker-js/faker';


export function generateRandomCredentials() {
    const username = faker.internet.username().substring(0);
    const password = faker.internet.password(false, /[A-Za-z0-9]/);

    return { username, password };
}

export function generateCheckoutData(country: 'US' | 'CA'  = 'US') {
    let zipCode: string;

    switch (country) {
        case 'US':
            zipCode = faker.location.zipCode('#####'); // US: 5-digit
            break;
        case 'CA':
            zipCode = faker.location.zipCode('?#?#?#'); // Canada: A1B2C3
            break;
        default:
            zipCode = faker.location.zipCode(); // fallback
    }

    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        zipCode,
    };
}
