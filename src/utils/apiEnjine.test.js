import { fetchAdventures } from "./apiEngine";

describe('Prueba de integración con API', () => {

    test('Debe traer array con codigo 200', async () => {
        const result = await fetchAdventures();

        expect(Array.isArray(result)).toBe(true);

        if (result.length > 0) {
            const primeraAventura = result[0];
            expect(primeraAventura).toHaveProperty('id');
            expect(primeraAventura).toHaveProperty('title');
            expect(primeraAventura).toHaveProperty('coords');

            console.log('Conexion y datos exitosos')
        } else {
            console.log('Conexion exitosa, pero la tabla está vacía.')
        }
    });
});