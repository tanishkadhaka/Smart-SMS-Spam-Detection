import React from 'react';
import { AlertTriangle, CheckCircle, Copy } from 'lucide-react';
import { PredictionResult } from '../types';

interface ResultCardProps {
  result: PredictionResult | null;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  if (!result) return null;

  const confidencePercentage = Math.round(result.confidence * 100);
  const isHighConfidence = result.confidence > 0.8;
  
  const handleCopyMessage = () => {
    navigator.clipboard.writeText(result.message);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 overflow-hidden animate-fadeIn">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          {result.is_spam ? (
            <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
          ) : (
            <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
          )}
          <h3 className="text-lg font-semibold">
            {result.is_spam ? 'Spam Detected' : 'Not Spam'}
          </h3>
        </div>
        <div 
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            result.is_spam 
              ? 'bg-red-100 text-red-800' 
              : 'bg-green-100 text-green-800'
          }`}
        >
          {confidencePercentage}% confidence
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-3">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-gray-700">Analyzed Message</h4>
          <button 
            onClick={handleCopyMessage}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            aria-label="Copy message"
          >
            <Copy size={16} />
          </button>
        </div>
        <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-md">
          {result.message}
        </p>
      </div>
      
      <div className="mt-4">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${result.is_spam ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: `${confidencePercentage}%` }}
          ></div>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 flex justify-between">
          <span>Low confidence</span>
          <span>High confidence</span>
        </div>
      </div>
      
      {!isHighConfidence && (
        <div className="mt-4 text-sm text-gray-600 bg-yellow-50 p-3 rounded-md">
          <span className="font-medium">Note:</span> The confidence level is not very high. 
          The message might be ambiguous or contain characteristics of both spam and legitimate messages.
        </div>
      )}
    </div>
  );
};

export default ResultCard;