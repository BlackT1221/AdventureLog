import { faker } from '@faker-js/faker';

const adventureTypes = ['Senderismo', 'Caminata', 'Escalada', 'Ruta', 'Exploración', 'Campamento'];

export const generateAdventures = (count = 10) => {
    const createRandomAdventure = () => {
        return {
            id: faker.string.uuid(),
            title: `${faker.helpers.arrayElement(adventureTypes)} en ${faker.location.city()}`,
            description: faker.lorem.paragraph(),
            uri: faker.image.urlPicsumPhotos({ width: 800, height: 600}),
            date: faker.date.recent().toISOString().split('T')[0],
            difficulty: faker.helpers.arrayElement(['Fácil', 'Moderado', 'Difícil']),
            coords: {
                lat: faker.location.latitude(),
                lng: faker.location.longitude()
            }
        };
    };
    
    return faker.helpers.multiple(createRandomAdventure, { count });
};