export interface PredictionResult {
  is_spam: boolean;
  confidence: number;
  message: string;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
}

export interface MessageExample {
  message: string;
  type: 'spam' | 'ham';
}

export interface HistoryItem extends PredictionResult {
  id: string;
  timestamp: number;
}