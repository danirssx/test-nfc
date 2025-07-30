import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { NFCSession } from '../types';

export default function AddSessionScreen() {
  const [tagType, setTagType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [location, setLocation] = useState('');

  const handleAddSession = () => {
    if (!tagType.trim() || !serialNumber.trim() || !location.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newSession: NFCSession = {
      id: Date.now().toString(),
      tag_type: tagType,
      serial_number: serialNumber,
      actual_date: new Date().toISOString(),
      location: location,
      timestamp: Date.now(),
    };

    // In a real app, you would send this to your API
    console.log('New session created:', newSession);
    
    Alert.alert('Success', 'Session added successfully!', [
      {
        text: 'OK',
        onPress: () => {
          setTagType('');
          setSerialNumber('');
          setLocation('');
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add New NFC Session</Text>
        <Text style={styles.subtitle}>
          Manually add a session or wait for automatic detection
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tag Type</Text>
            <TextInput
              style={styles.input}
              value={tagType}
              onChangeText={setTagType}
              placeholder="e.g., NTAG215"
              placeholderTextColor="#8E8E93"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Serial Number</Text>
            <TextInput
              style={styles.input}
              value={serialNumber}
              onChangeText={setSerialNumber}
              placeholder="e.g., A1B2C3D4"
              placeholderTextColor="#8E8E93"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="e.g., Office - Floor 1"
              placeholderTextColor="#8E8E93"
            />
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddSession}>
            <Text style={styles.addButtonText}>Add Session</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Auto Detection</Text>
          <Text style={styles.infoText}>
            This app will automatically listen for NFC sessions from your API server.
            Sessions will appear in the Sessions tab when detected.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 32,
  },
  form: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#1C1C1E',
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
  },
});