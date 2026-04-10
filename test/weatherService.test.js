import { describe, it, expect, vi } from 'vitest';
import { weatherService } from '../src/services/weatherService';

describe('weatherService', () => {
  it('handles response errors correctly', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      json: vi.fn().mockResolvedValue({ message: 'city not found' }),
    };
    
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    await expect(weatherService.getCurrentWeather('InvalidCity'))
      .rejects.toThrow('City not found');
  });

  it('handles network errors correctly', async () => {
    global.fetch = vi.fn().mockRejectedValue(new TypeError('Network error'));

    await expect(weatherService.getCurrentWeather('London'))
      .rejects.toThrow('Network error');
  });
});
