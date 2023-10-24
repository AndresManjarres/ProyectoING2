// eslint-disable-next-line import/no-extraneous-dependencies
import {
  describe, test, expect, request,
} from '@jest/globals';
import app from '../index.mjs'; // import named export 'app' instead of default export

describe('Express App Tests', () => {
  // Prueba para la ruta raíz '/'
  test('GET / debe devolver un archivo HTML', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('index.html'); // Asegúrate de que el HTML se haya devuelto correctamente
  });

  // Prueba para la ruta '/images/:id'
  test('GET /images/:id debe devolver un documento', async () => {
    const id = '123'; // Supongamos que existe un documento con este ID en tus pruebas
    const response = await request(app).get(`/images/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({ _id: id }));
  });

  // Prueba para manejo de errores
  test('Manejo de errores debe funcionar correctamente', async () => {
    const response = await request(app).get('/una-ruta-que-no-existe');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Ruta no encontrada');
  });
});
