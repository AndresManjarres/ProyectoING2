import MinioService from '../MinioService.mjs'; // Replace with the actual path to your MinioService class
import Boom from '@hapi/boom';
import { jest } from '@jest/globals'


const mockImage = {
  originalname: 'test.jpg',
  buffer: Buffer.from('image data'),
};

const BUCKET_NAME = 'your-bucket-name'; // Provide an actual bucket name

describe('MinioService', () => {
  let minioService;

  beforeEach(() => {
    minioService = new MinioService();
  });

  it('should save an image successfully', async () => {
    // Mock the S3Client and its send method
    minioService.conn.send = jest.fn().mockResolvedValueOnce({});

    const result = await minioService.saveImage(mockImage);

    expect(result).toMatch(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}\.jpg/); // Check if the result is a UUID with the correct extension
    expect(minioService.conn.send).toHaveBeenCalledWith(expect.objectContaining({
      Bucket: BUCKET_NAME,
      Key: expect.any(String),
      Body: mockImage.buffer,
    }));
  });

  it('should throw a Bad Request error if the image is missing', async () => {
    await expect(minioService.saveImage(null)).rejects.toThrow(Boom.badRequest('Imagen requerida'));
  });

  it('should throw a Bad Request error if originalname is missing', async () => {
    const invalidImage = { buffer: Buffer.from('image data') };
    await expect(minioService.saveImage(invalidImage)).rejects.toThrow(Boom.badRequest('Image originalname es requerido'));
  });

  it('should throw a Bad Request error if buffer is missing', async () => {
    const invalidImage = { originalname: 'test.jpg' };
    await expect(minioService.saveImage(invalidImage)).rejects.toThrow(Boom.badRequest('Image buffer es requerido'));
  });

  it('should throw a Bad Request error for an image with an invalid name', async () => {
    const invalidImage = { originalname: 'invalid-name' };
    await expect(minioService.saveImage(invalidImage)).rejects.toThrow(Boom.badRequest('Image invalid name'));
  });

  it('should handle internal errors gracefully', async () => {
    // Mock the S3Client and its send method to simulate an error
    minioService.conn.send = jest.fn().mockRejectedValueOnce(new Error('Internal Error'));

    await expect(minioService.saveImage(mockImage)).rejects.toThrow(Boom.internal('Error saving image'));
  });
});
