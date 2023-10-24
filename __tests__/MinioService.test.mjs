// eslint-disable-next-line import/no-extraneous-dependencies
import {
  describe, it, expect, beforeEach,
} from '@jest/globals';
import MinioService from '../src/services/MinioService.mjs'; // Ajusta la ruta de importación según tu estructura de directorios

describe('MinioService', () => {
  let minioService;

  beforeEach(() => {
    minioService = new MinioService();
  });

  it('should save an image successfully', async () => {
    const mockImage = {
      originalname: 'test.jpg',
      buffer: Buffer.from('image data'),
    };
    // eslint-disable-next-line no-unused-vars
    const result = await minioService.saveImage(mockImage);
  });

  it('should throw a Bad Request error if image is missing', async () => {
    const result = minioService.saveImage();
    await expect(result).rejects.toThrow('Imagen requerida');
  });

  it('should throw a Bad Request error if originalname is missing', async () => {
    const invalidImage = {
      buffer: Buffer.from('image data'),
    };

    const result = minioService.saveImage(invalidImage);
    await expect(result).rejects.toThrow('Image originalname es requerido');
  });

  it('should throw a Bad Request error if buffer is missing', async () => {
    const invalidImage = {
      originalname: 'test.jpg',
    };

    const result = minioService.saveImage(invalidImage);
    await expect(result).rejects.toThrow('Image buffer es requerido');
  });

  it('should throw a Bad Request error for an image with an invalid name', async () => {
    const invalidImage = {
      originalname: 'invalid-name',
      buffer: Buffer.from('image data'),
    };

    const result = minioService.saveImage(invalidImage);
    await expect(result).rejects.toThrow('Image invalid name');
  });
});
