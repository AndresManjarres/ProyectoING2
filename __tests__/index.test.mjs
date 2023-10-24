import { startServer } from '../index.mjs'; // Replace with the actual path to your startServer function

describe('startServer', () => {
  it('should start the server successfully', async () => {
    const startConnectionMock = jest.fn();
    const appListenMock = jest.fn();

    // Mock the startConnection and app.listen methods
    jest.mock('./index.mjs', () => ({
      startConnection: startConnectionMock,
      app: {
        listen: appListenMock,
      },
    }));

    await startServer();

    expect(startConnectionMock).toHaveBeenCalled();
    expect(appListenMock).toHaveBeenCalled();
  });
});