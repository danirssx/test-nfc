import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  Text, 
  RefreshControl,
  TouchableOpacity 
} from 'react-native';
import { NFCSession } from '../types';
import SessionCard from '../components/SessionCard';
import { useNFCListener } from '../hooks/useNFCListener';

export default function SessionsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { 
    sessions, 
    isListening, 
    startListening, 
    stopListening, 
    clearSessions 
  } = useNFCListener();

  const onRefresh = () => {
    setRefreshing(true);
    // Restart listening
    stopListening();
    setTimeout(() => {
      startListening();
      setRefreshing(false);
    }, 1000);
  };

  const renderSession = ({ item }: { item: NFCSession }) => (
    <SessionCard 
      session={item}
      onPress={(session) => console.log('Session pressed:', session)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <View style={styles.statusInfo}>
          <View style={[
            styles.statusIndicator, 
            { backgroundColor: isListening ? '#34C759' : '#FF3B30' }
          ]} />
          <Text style={styles.statusText}>
            {isListening ? 'Listening for NFC sessions' : 'Not listening'}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={clearSessions}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {sessions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No NFC sessions detected</Text>
          <Text style={styles.emptySubtext}>
            Sessions will appear here when NFC tags are scanned
          </Text>
        </View>
      ) : (
        <FlatList
          data={sessions}
          renderItem={renderSession}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#FF3B30',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});