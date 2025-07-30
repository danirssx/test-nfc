export interface NFCSession {
  id: string;
  tag_type: string;
  serial_number: string;
  actual_date: string;
  location: string;
  timestamp: number;
}

export interface SessionCardProps {
  session: NFCSession;
  onPress?: (session: NFCSession) => void;
}