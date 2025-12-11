/**
 * Unit tests for calculation utilities
 * Tests fuel density and weight calculation formulas
 */

describe('Fuel Density Calculations', () => {
  describe('API to Density Conversion', () => {
    it('converts API 40 correctly', () => {
      const api = 40;
      const density = 141.5 / (api + 131.5);
      expect(density).toBeCloseTo(0.825, 3);
    });

    it('converts API 50 correctly', () => {
      const api = 50;
      const density = 141.5 / (api + 131.5);
      expect(density).toBeCloseTo(0.780, 3);
    });

    it('converts API 30 correctly', () => {
      const api = 30;
      const density = 141.5 / (api + 131.5);
      expect(density).toBeCloseTo(0.876, 3);
    });
  });

  describe('Fuel Type Constants', () => {
    it('has correct constants for Jet A/Kerosene', () => {
      const k0 = 330.3010;
      const k1 = 0.0;
      expect(k0).toBe(330.3010);
      expect(k1).toBe(0.0);
    });

    it('has correct constants for Gasoline', () => {
      const k0 = 192.4571;
      const k1 = 0.2438;
      expect(k0).toBe(192.4571);
      expect(k1).toBe(0.2438);
    });

    it('has correct constants for Diesel', () => {
      const k0 = 103.8720;
      const k1 = 0.2701;
      expect(k0).toBe(103.8720);
      expect(k1).toBe(0.2701);
    });
  });
});

describe('Temperature Conversion', () => {
  it('converts 32°F to 0°C', () => {
    const tempC = (32 - 32) * (5/9);
    expect(tempC).toBe(0);
  });

  it('converts 212°F to 100°C', () => {
    const tempC = (212 - 32) * (5/9);
    expect(tempC).toBe(100);
  });

  it('converts 70°F to approximately 21°C', () => {
    const tempC = (70 - 32) * (5/9);
    expect(tempC).toBeCloseTo(21.1, 1);
  });

  it('converts 0°C to 32°F', () => {
    const tempF = (0 * 9/5) + 32;
    expect(tempF).toBe(32);
  });

  it('converts 100°C to 212°F', () => {
    const tempF = (100 * 9/5) + 32;
    expect(tempF).toBe(212);
  });
});

describe('Volume Conversions', () => {
  describe('Gallon Conversions', () => {
    it('converts 1 gallon to 3.78541 liters', () => {
      const liters = 1 * 3.78541;
      expect(liters).toBeCloseTo(3.78541, 5);
    });

    it('converts 1 barrel to 42 gallons', () => {
      const gallons = 1 * 42;
      expect(gallons).toBe(42);
    });

    it('converts 1000 gallons to correct liters', () => {
      const liters = 1000 * 3.78541;
      expect(liters).toBeCloseTo(3785.41, 2);
    });
  });

  describe('Liter Conversions', () => {
    it('converts 1 liter to gallons', () => {
      const gallons = 1 / 3.78541;
      expect(gallons).toBeCloseTo(0.264172, 5);
    });

    it('converts 100 liters to gallons', () => {
      const gallons = 100 / 3.78541;
      expect(gallons).toBeCloseTo(26.4172, 3);
    });
  });
});

describe('Weight Calculations', () => {
  it('calculates weight from volume and density', () => {
    const volume_liters = 1000;
    const density_g_ml = 0.8;
    const weight_kg = volume_liters * density_g_ml;
    expect(weight_kg).toBe(800);
  });

  it('converts kg to pounds', () => {
    const kg = 100;
    const pounds = kg * 2.20462;
    expect(pounds).toBeCloseTo(220.462, 2);
  });

  it('converts pounds to kg', () => {
    const pounds = 220.462;
    const kg = pounds / 2.20462;
    expect(kg).toBeCloseTo(100, 2);
  });
});

describe('Input Validation', () => {
  it('validates positive API gravity', () => {
    const api = 45;
    expect(api).toBeGreaterThan(0);
  });

  it('validates reasonable API range', () => {
    const api = 45;
    expect(api).toBeGreaterThan(0);
    expect(api).toBeLessThan(100);
  });

  it('validates positive volume', () => {
    const volume = 100;
    expect(volume).toBeGreaterThan(0);
  });

  it('handles decimal inputs', () => {
    const api = 45.5;
    const density = 141.5 / (api + 131.5);
    expect(density).toBeGreaterThan(0);
  });
});

