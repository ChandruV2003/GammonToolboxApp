import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Linking,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  // API Correction Section State
  const [apiGravity, setApiGravity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [fuelType, setFuelType] = useState('Jet A/Kerosene');
  const [tempUnit, setTempUnit] = useState('Fahrenheit');
  const [correctedAPI, setCorrectedAPI] = useState('');

  // Weight Calculation Section State
  const [volume, setVolume] = useState('');
  const [volumeUnit, setVolumeUnit] = useState('Gallons');
  const [weight, setWeight] = useState('');

  // Internal state for calculations
  const [rhoInitial, setRhoInitial] = useState(0);

  // Fuel type constants
  const getFuelConstants = (fuel) => {
    switch (fuel) {
      case 'Gasoline':
        return { k0: 192.4571, k1: 0.2438 };
      case 'Diesel':
        return { k0: 103.8720, k1: 0.2701 };
      case 'Jet A/Kerosene':
      default:
        return { k0: 330.3010, k1: 0.0 };
    }
  };

  // Calculate API Gravity
  const calculateAPI = () => {
    const api = parseFloat(apiGravity);
    const temp = parseFloat(temperature);

    if (isNaN(api) || isNaN(temp)) {
      Alert.alert('Error', 'Please enter valid numbers for API Gravity and Temperature');
      return;
    }

    // Calculate Delta T
    let deltatemp = 0.0;
    if (tempUnit === 'Fahrenheit') {
      deltatemp = temp - 60.0;
    } else {
      deltatemp = (temp * 1.8 + 32.0) - 60.0;
    }

    // Calculate Rho Initial
    const rho_initial = (141.5 * 999.07) / (131.5 + api);
    setRhoInitial(rho_initial);

    // Get fuel constants
    const { k0, k1 } = getFuelConstants(fuelType);

    // Iterative calculation
    let rho_new = rho_initial;
    let abs_old = 999.9;
    let abs_new = 999.9;

    while (abs_old > 0.05 || abs_new > 0.05) {
      const alpha = (k0 / (rho_new * rho_new)) + (k1 / rho_new);
      const vcf = Math.exp((-alpha * deltatemp) * (1 + 0.8 * alpha * deltatemp));
      const rho_old = rho_new;
      abs_old = abs_new;
      rho_new = rho_initial / vcf;
      abs_new = Math.abs(rho_new - rho_old);
    }

    // Calculate corrected API
    let api_corrected = (141.5 * 999.07) / rho_new - 131.5;
    api_corrected = Math.round(api_corrected * 10) / 10;

    setCorrectedAPI(`Corrected API Gravity: ${api_corrected.toFixed(1)}`);
  };

  // Calculate Weight
  const calculateWeight = () => {
    const vol = parseFloat(volume);

    if (isNaN(vol)) {
      Alert.alert('Error', 'Please enter a valid volume');
      return;
    }

    if (rhoInitial === 0) {
      Alert.alert('Error', 'Please calculate API Gravity first');
      return;
    }

    let volume_m3 = 0.0;
    let mass = 0.0;

    if (volumeUnit === 'Gallons') {
      volume_m3 = vol / 264.172; // US gallon to m³
      mass = rhoInitial * volume_m3 / 0.4536;
      setWeight(`Fuel Weight: ${mass.toFixed(1)} lbs`);
    } else {
      volume_m3 = vol / 1000.0;
      mass = rhoInitial * volume_m3;
      setWeight(`Fuel Weight: ${mass.toFixed(1)} kgs`);
    }
  };

  // Reset API Section
  const resetAPISection = () => {
    setApiGravity('');
    setTemperature('');
    setFuelType('Jet A/Kerosene');
    setTempUnit('Fahrenheit');
    setCorrectedAPI('');
    setRhoInitial(0);
  };

  // Reset Volume Section
  const resetVolumeSection = () => {
    setVolume('');
    setVolumeUnit('Gallons');
    setWeight('');
  };

  // Contact Us
  const handleContactUs = () => {
    Alert.alert(
      'Contact Gammon Technical',
      'Gammon Technical Products\nAPI Gravity Calculator v2.0\n\n2300 Highway 34\nManasquan, NJ 08736\n\nPhone: 732-223-4600\ninfo@gammontech.com\nwww.gammontech.com',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Visit Website', onPress: () => Linking.openURL('https://www.gammontech.com') },
        { text: 'Email Us', onPress: () => Linking.openURL('mailto:info@gammontech.com') },
      ]
    );
  };

  // Segmented Control Component
  const SegmentedControl = ({ options, selectedValue, onValueChange, style }) => (
    <View style={[styles.segmentedControl, style]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.segmentButton,
            selectedValue === option && styles.segmentButtonActive
          ]}
          onPress={() => onValueChange(option)}
        >
          <Text style={[
            styles.segmentButtonText,
            selectedValue === option && styles.segmentButtonTextActive
          ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Fuel Type Selector Component
  const FuelTypeSelector = () => (
    <View style={styles.fuelTypeContainer}>
      <Text style={styles.label}>Fuel Type</Text>
      <View style={styles.fuelTypeGrid}>
        {['Gasoline', 'Diesel', 'Jet A/Kerosene'].map((fuel) => (
          <TouchableOpacity
            key={fuel}
            style={[
              styles.fuelTypeButton,
              fuelType === fuel && styles.fuelTypeButtonActive
            ]}
            onPress={() => setFuelType(fuel)}
          >
            <Text style={[
              styles.fuelTypeButtonText,
              fuelType === fuel && styles.fuelTypeButtonTextActive
            ]}>
              {fuel}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1a365d" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Header with Gradient Effect */}
        <View style={styles.header}>
          <View style={styles.headerGradient}>
            <Text style={styles.headerTitle}>API Gravity Calculator</Text>
            <Text style={styles.headerSubtitle}>Professional Fuel Analysis Tool</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* API Correction Section */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>API Correction</Text>
              <View style={styles.cardTitleUnderline} />
            </View>

            <FuelTypeSelector />

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Temperature</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Temperature"
                placeholderTextColor="#a0a0a0"
                keyboardType="numeric"
                value={temperature}
                onChangeText={setTemperature}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Temperature Unit</Text>
              <SegmentedControl
                options={['Fahrenheit', 'Celsius']}
                selectedValue={tempUnit}
                onValueChange={setTempUnit}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>API Gravity</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter API Gravity"
                placeholderTextColor="#a0a0a0"
                keyboardType="numeric"
                value={apiGravity}
                onChangeText={setApiGravity}
              />
            </View>

            {correctedAPI ? (
              <View style={styles.resultCard}>
                <Text style={styles.resultText}>{correctedAPI}</Text>
              </View>
            ) : null}

            <View style={styles.buttonRow}>
              <Pressable 
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.primaryButtonPressed
                ]}
                onPress={calculateAPI}
              >
                <Text style={styles.primaryButtonText}>Calculate API</Text>
              </Pressable>
              <Pressable 
                style={({ pressed }) => [
                  styles.resetButton,
                  pressed && styles.resetButtonPressed
                ]}
                onPress={resetAPISection}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </Pressable>
            </View>
          </View>

          {/* Weight Calculation Section */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Weight Calculator</Text>
              <View style={styles.cardTitleUnderline} />
            </View>

            {correctedAPI ? (
              <View style={[styles.statusCard, styles.statusSuccess]}>
                <Text style={[styles.statusText, { color: '#22543d' }]}>● API Gravity Calculated</Text>
              </View>
            ) : (
              <View style={[styles.statusCard, styles.statusWarning]}>
                <Text style={[styles.statusText, { color: '#c05621' }]}>▲ Calculate API Gravity First</Text>
              </View>
            )}

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Volume</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Volume"
                  placeholderTextColor="#a0a0a0"
                  keyboardType="numeric"
                  value={volume}
                  onChangeText={setVolume}
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Volume Unit</Text>
                <SegmentedControl
                  options={['Gallons', 'Litres']}
                  selectedValue={volumeUnit}
                  onValueChange={setVolumeUnit}
                />
              </View>
            </View>

            {weight ? (
              <View style={styles.resultCard}>
                <Text style={styles.resultText}>{weight}</Text>
              </View>
            ) : null}

            <View style={styles.buttonRow}>
              <Pressable 
                style={({ pressed }) => [
                  styles.primaryButton, 
                  !correctedAPI && styles.disabledButton,
                  pressed && !correctedAPI && styles.primaryButtonPressed
                ]}
                onPress={calculateWeight}
                disabled={!correctedAPI}
              >
                <Text style={[styles.primaryButtonText, !correctedAPI && styles.disabledButtonText]}>
                  Calculate Weight
                </Text>
              </Pressable>
              <Pressable 
                style={({ pressed }) => [
                  styles.resetButton,
                  pressed && styles.resetButtonPressed
                ]}
                onPress={resetVolumeSection}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </Pressable>
            </View>
          </View>

          {/* Contact Section */}
          <TouchableOpacity style={styles.contactCard} onPress={handleContactUs}>
            <View style={styles.contactContent}>
              <Text style={styles.contactTitle}>Need Help?</Text>
              <Text style={styles.contactSubtitle}>Contact Gammon Technical Products</Text>
              <View style={styles.contactButtons}>
                <View style={styles.contactButton}>
                  <Text style={styles.contactButtonText}>◉ Visit Website</Text>
                </View>
                <View style={styles.contactButton}>
                  <Text style={styles.contactButtonText}>✉ Email Support</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerGradient: {
    alignItems: 'center',
    backgroundColor: '#1a365d',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    shadowColor: '#1a365d',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e2e8f0',
    textAlign: 'center',
    fontWeight: '500',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 0.5,
    borderColor: '#f1f5f9',
  },
  cardHeader: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1a365d',
    marginBottom: 8,
  },
  cardTitleUnderline: {
    height: 3,
    backgroundColor: '#3182ce',
    borderRadius: 2,
    width: 60,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 18,
    fontSize: 17,
    backgroundColor: '#ffffff',
    color: '#2d3748',
    fontWeight: '400',
    textAlignVertical: 'center',
    includeFontPadding: false,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  fuelTypeContainer: {
    marginBottom: 20,
  },
  fuelTypeGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  fuelTypeButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  fuelTypeButtonActive: {
    borderColor: '#3182ce',
    backgroundColor: '#ebf8ff',
  },
  fuelTypeButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4a5568',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  fuelTypeButtonTextActive: {
    color: '#3182ce',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#f7fafc',
    borderRadius: 10,
    padding: 4,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  segmentButtonActive: {
    backgroundColor: '#3182ce',
  },
  segmentButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4a5568',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  segmentButtonTextActive: {
    color: '#ffffff',
  },
  resultCard: {
    backgroundColor: '#f0f8ff',
    borderLeftWidth: 4,
    borderLeftColor: '#3182ce',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  resultText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a365d',
    textAlign: 'center',
  },
  statusCard: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  statusSuccess: {
    backgroundColor: '#f0fff4',
    borderColor: '#9ae6b4',
  },
  statusWarning: {
    backgroundColor: '#fffaf0',
    borderColor: '#fbd38d',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    flex: 2,
    backgroundColor: '#3182ce',
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#3182ce',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  primaryButtonPressed: {
    backgroundColor: '#2c5282',
    transform: [{ scale: 0.98 }],
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e53e3e',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#e53e3e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  resetButtonText: {
    color: '#e53e3e',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  resetButtonPressed: {
    backgroundColor: '#fed7d7',
    borderColor: '#c53030',
    transform: [{ scale: 0.98 }],
  },
  disabledButton: {
    backgroundColor: '#a0aec0',
    shadowOpacity: 0,
    elevation: 0,
  },
  disabledButtonText: {
    color: '#ffffff',
  },
  contactCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#3182ce',
  },
  contactContent: {
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a365d',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 16,
    textAlign: 'center',
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    flex: 1,
    backgroundColor: '#f7fafc',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minHeight: 48,
  },
  contactButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3182ce',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});