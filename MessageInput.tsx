import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Copy } from 'lucide-react';
import { getValidationMessage, isMessageValidLength } from '../utils/validationUtils';

interface MessageInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
  examples: { message: string; type: string }[];
  onReset: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSubmit, isLoading, examples, onReset }) => {
  const [message, setMessage] = useState('');
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [showExamples, setShowExamples] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Validate message on change
  useEffect(() => {
    setValidationMessage(getValidationMessage(message));
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isMessageValidLength(message)) {
      onSubmit(message);
    }
  };

  const handleClear = () => {
    setMessage('');
    onReset();
  };

  const handleUseExample = (exampleMessage: string) => {
    setMessage(exampleMessage);
    setShowExamples(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 transition-all duration-300">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Enter a message to analyze
          </label>
          <div className="relative">
            <textarea
              ref={textareaRef}
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-all duration-200 min-h-[100px]"
              placeholder="Type or paste a message here to check if it's spam..."
              disabled={isLoading}
            />
            
            {message && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Clear message"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
          
          {validationMessage && (
            <p className="text-sm text-red-500 mt-1">{validationMessage}</p>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <button
            type="button"
            onClick={() => setShowExamples(!showExamples)}
            className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            {showExamples ? 'Hide examples' : 'Show examples'}
          </button>
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center"
              disabled={isLoading || !message}
            >
              <Trash2 size={16} className="mr-2" />
              Clear
            </button>
            
            <button
              type="submit"
              className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center ${
                (!isMessageValidLength(message) || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!isMessageValidLength(message) || isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <Send size={16} className="mr-2" />
                  Analyze
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      
      {showExamples && examples.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Example messages</h3>
          <div className="grid gap-2">
            {examples.map((example, index) => (
              <div
                key={index}
                className={`p-3 rounded-md text-sm cursor-pointer flex justify-between items-start ${
                  example.type === 'spam' ? 'bg-red-50 border border-red-100' : 'bg-green-50 border border-green-100'
                }`}
                onClick={() => handleUseExample(example.message)}
              >
                <p className="mr-2 line-clamp-2">{example.message}</p>
                <span 
                  className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                    example.type === 'spam' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}
                >
                  {example.type === 'spam' ? 'Spam' : 'Not Spam'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageInput;