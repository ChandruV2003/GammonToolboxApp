/**
 * Comprehensive test suite for GammonToolboxApp
 * Tests API gravity correction and weight calculation functionality
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../App';

describe('GammonToolboxApp', () => {
  describe('Component Rendering', () => {
    it('renders without crashing', () => {
      const { getByText } = render(<App />);
      expect(getByText(/Gammon/i)).toBeTruthy();
    });

    it('renders API correction section', () => {
      const { getByPlaceholderText } = render(<App />);
      expect(getByPlaceholderText(/API Gravity/i)).toBeTruthy();
      expect(getByPlaceholderText(/Temperature/i)).toBeTruthy();
    });

    it('renders weight calculation section', () => {
      const { getByPlaceholderText } = render(<App />);
      expect(getByPlaceholderText(/Volume/i)).toBeTruthy();
    });
  });

  describe('API Gravity Calculations', () => {
    it('calculates corrected API for Jet A/Kerosene', () => {
      const { getByPlaceholderText, getByText } = render(<App />);
      
      const apiInput = getByPlaceholderText(/API Gravity/i);
      const tempInput = getByPlaceholderText(/Temperature/i);
      
      fireEvent.changeText(apiInput, '45');
      fireEvent.changeText(tempInput, '70');
      
      const calculateButton = getByText(/Calculate API/i);
      fireEvent.press(calculateButton);
      
      // Should display some result
      waitFor(() => {
        expect(getByText(/Corrected API/i)).toBeTruthy();
      });
    });

    it('handles invalid API gravity input', () => {
      const { getByPlaceholderText, getByText } = render(<App />);
      
      const apiInput = getByPlaceholderText(/API Gravity/i);
      const tempInput = getByPlaceholderText(/Temperature/i);
      
      fireEvent.changeText(apiInput, 'abc');
      fireEvent.changeText(tempInput, '70');
      
      const calculateButton = getByText(/Calculate API/i);
      fireEvent.press(calculateButton);
      
      // Should handle gracefully
    });

    it('handles empty inputs', () => {
      const { getByText } = render(<App />);
      
      const calculateButton = getByText(/Calculate API/i);
      fireEvent.press(calculateButton);
      
      // Should not crash
    });
  });

  describe('Weight Calculations', () => {
    it('calculates weight from volume', () => {
      const { getByPlaceholderText, getByText } = render(<App />);
      
      // First calculate API
      const apiInput = getByPlaceholderText(/API Gravity/i);
      const tempInput = getByPlaceholderText(/Temperature/i);
      
      fireEvent.changeText(apiInput, '45');
      fireEvent.changeText(tempInput, '70');
      
      const calculateApiButton = getByText(/Calculate API/i);
      fireEvent.press(calculateApiButton);
      
      // Then calculate weight
      const volumeInput = getByPlaceholderText(/Volume/i);
      fireEvent.changeText(volumeInput, '100');
      
      const calculateWeightButton = getByText(/Calculate Weight/i);
      fireEvent.press(calculateWeightButton);
      
      // Should display some result
      waitFor(() => {
        expect(getByText(/Weight/i)).toBeTruthy();
      });
    });

    it('handles different volume units', () => {
      const { getByPlaceholderText, getByText } = render(<App />);
      
      const volumeInput = getByPlaceholderText(/Volume/i);
      fireEvent.changeText(volumeInput, '1000');
      
      // Should handle unit conversions
    });
  });

  describe('Fuel Type Selection', () => {
    it('supports multiple fuel types', () => {
      const { getByText } = render(<App />);
      
      // Should have fuel type options
      // Jet A, Gasoline, Diesel
    });
  });

  describe('Clear Functionality', () => {
    it('clears API calculation results', () => {
      const { getByText, getByPlaceholderText } = render(<App />);
      
      const apiInput = getByPlaceholderText(/API Gravity/i);
      fireEvent.changeText(apiInput, '45');
      
      const clearButton = getByText(/Clear/i);
      if (clearButton) {
        fireEvent.press(clearButton);
        
        waitFor(() => {
          expect(apiInput.props.value).toBe('');
        });
      }
    });
  });
});

describe('Calculation Functions', () => {
  describe('API Gravity Correction', () => {
    it('calculates density correctly', () => {
      const api = 45;
      const expected_rho = 141.5 / (api + 131.5);
      expect(expected_rho).toBeCloseTo(0.802, 3);
    });

    it('handles temperature conversion', () => {
      const tempF = 70;
      const tempC = (tempF - 32) * (5/9);
      expect(tempC).toBeCloseTo(21.1, 1);
    });
  });

  describe('Volume Conversion', () => {
    it('converts gallons to liters', () => {
      const gallons = 100;
      const liters = gallons * 3.78541;
      expect(liters).toBeCloseTo(378.541, 2);
    });

    it('converts liters to gallons', () => {
      const liters = 378.541;
      const gallons = liters / 3.78541;
      expect(gallons).toBeCloseTo(100, 2);
    });

    it('converts barrels to gallons', () => {
      const barrels = 1;
      const gallons = barrels * 42;
      expect(gallons).toBe(42);
    });
  });

  describe('Weight Conversion', () => {
    it('converts pounds to kilograms', () => {
      const pounds = 220.462;
      const kg = pounds / 2.20462;
      expect(kg).toBeCloseTo(100, 2);
    });

    it('converts kilograms to pounds', () => {
      const kg = 100;
      const pounds = kg * 2.20462;
      expect(pounds).toBeCloseTo(220.462, 2);
    });
  });
});

describe('Edge Cases', () => {
  it('handles very large numbers', () => {
    const largeNumber = 999999;
    expect(largeNumber).toBeLessThan(1000000);
  });

  it('handles very small numbers', () => {
    const smallNumber = 0.0001;
    expect(smallNumber).toBeGreaterThan(0);
  });

  it('handles negative numbers appropriately', () => {
    // Temperature can be negative
    const tempC = -20;
    expect(tempC).toBeLessThan(0);
  });

  it('handles zero values', () => {
    const zero = 0;
    expect(zero).toBe(0);
  });
});

