import React from 'react';
import { HistoryItem } from '../types';
import { AlertTriangle, CheckCircle, Trash2 } from 'lucide-react';

interface HistoryListProps {
  historyItems: HistoryItem[];
  onClearHistory: () => void;
  onSelectItem: (item: HistoryItem) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ 
  historyItems, 
  onClearHistory,
  onSelectItem 
}) => {
  if (historyItems.length === 0) return null;
  
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Predictions</h2>
        <button
          onClick={onClearHistory}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center"
        >
          <Trash2 size={14} className="mr-1" />
          Clear history
        </button>
      </div>
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {historyItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="border rounded-md p-3 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                {item.is_spam ? (
                  <AlertTriangle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                )}
                <p className="text-sm text-gray-700 line-clamp-1">
                  {item.message}
                </p>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                {formatTime(item.timestamp)}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  item.is_spam 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {item.is_spam ? 'Spam' : 'Not Spam'}
              </span>
              <span className="text-xs text-gray-500">
                {Math.round(item.confidence * 100)}% confidence
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;