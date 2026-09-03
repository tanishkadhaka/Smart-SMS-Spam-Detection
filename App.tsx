import React, { useState, useEffect } from 'react';
import { spamDetectionApi } from './api/spamDetectionApi';
import { PredictionResult, MessageExample, HistoryItem } from './types';
import Header from './components/Header';
import MessageInput from './components/MessageInput';
import ResultCard from './components/ResultCard';
import ModelMetrics from './components/ModelMetrics';
import HistoryList from './components/HistoryList';
import { AlertTriangle } from 'lucide-react';

function App() {
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null);
  const [examples, setExamples] = useState<MessageExample[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [backendError, setBackendError] = useState<string | null>(null);
  
  // Check backend connection on load
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const isConnected = await spamDetectionApi.checkStatus();
        setIsBackendConnected(isConnected);
        
        if (isConnected) {
          // Load metrics and examples
          const metricsData = await spamDetectionApi.getMetrics();
          setMetrics(metricsData);
          
          const examplesData = await spamDetectionApi.getExamples();
          setExamples(examplesData);
          
          setBackendError(null);
        }
      } catch (error) {
        console.error('Backend connection error:', error);
        setIsBackendConnected(false);
        setBackendError('Unable to connect to the backend service. Please make sure it is running.');
      }
    };
    
    checkBackendConnection();
    
    // Poll the backend connection status every 10 seconds
    const interval = setInterval(checkBackendConnection, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSubmit = async (message: string) => {
    if (!isBackendConnected) {
      setBackendError('Backend service is not connected. Please start the backend service.');
      return;
    }
    
    setIsLoading(true);
    setBackendError(null);
    
    try {
      const prediction = await spamDetectionApi.predictSpam(message);
      setResult(prediction);
      
      // Add to history
      const historyItem: HistoryItem = {
        ...prediction,
        id: Date.now().toString(),
        timestamp: Date.now()
      };
      
      setHistory(prevHistory => [historyItem, ...prevHistory.slice(0, 9)]);
    } catch (error) {
      console.error('Prediction error:', error);
      setBackendError('An error occurred while analyzing the message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setResult(null);
    setBackendError(null);
  };
  
  const handleClearHistory = () => {
    setHistory([]);
  };
  
  const handleSelectHistoryItem = (item: HistoryItem) => {
    const predictionResult: PredictionResult = {
      is_spam: item.is_spam,
      confidence: item.confidence,
      message: item.message
    };
    
    setResult(predictionResult);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isBackendConnected={isBackendConnected} />
      
      <main className="container mx-auto px-4 py-8">
        {backendError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Backend Service Error</h3>
                <p className="text-sm text-red-700 mt-1">{backendError}</p>
                {!isBackendConnected && (
                  <p className="text-xs text-red-600 mt-2">
                    Please run the backend service with <code className="bg-red-100 px-1 py-0.5 rounded">npm run backend</code> in a terminal.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MessageInput 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
              examples={examples}
              onReset={handleReset}
            />
            
            {result && <ResultCard result={result} />}
            
            {metrics && <ModelMetrics metrics={metrics} />}
          </div>
          
          <div className="space-y-6">
            <HistoryList 
              historyItems={history} 
              onClearHistory={handleClearHistory}
              onSelectItem={handleSelectHistoryItem}
            />
            
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3">About This App</h2>
              <p className="text-gray-600 text-sm">
                This SMS Spam Detection app uses machine learning to analyze text messages and 
                determine if they're likely to be spam or legitimate (ham). The model was trained on 
                the SMS Spam Collection Dataset from Kaggle.
              </p>
              <div className="mt-3 p-3 bg-indigo-50 rounded-md">
                <h3 className="text-sm font-medium text-indigo-800 mb-1">How it works</h3>
                <p className="text-xs text-indigo-700">
                  The app uses a machine learning model trained on thousands of SMS messages. It 
                  analyzes patterns in the text like specific keywords, phrases, punctuation, and 
                  other features to identify potential spam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-gray-300 py-6 mt-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              SMS Spam Detective &copy; {new Date().getFullYear()}
            </p>
            <div className="text-xs">
              Powered by React, FastAPI, and Machine Learning
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;