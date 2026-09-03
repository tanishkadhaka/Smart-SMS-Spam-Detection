/**
 * Message validation utilities
 */

// Check if a message is empty
export const isMessageEmpty = (message: string): boolean => {
  return !message || message.trim().length === 0;
};

// Check if a message is too short (less than 5 characters)
export const isMessageTooShort = (message: string): boolean => {
  return message.trim().length < 5;
};

// Check if a message is long enough for meaningful prediction
export const isMessageValidLength = (message: string): boolean => {
  const trimmedLength = message.trim().length;
  return trimmedLength >= 5 && trimmedLength <= 1000;
};

// Get appropriate validation message
export const getValidationMessage = (message: string): string | null => {
  if (isMessageEmpty(message)) {
    return "Please enter a message to analyze";
  }
  
  if (isMessageTooShort(message)) {
    return "Message is too short for meaningful analysis";
  }
  
  if (message.trim().length > 1000) {
    return "Message is too long (maximum 1000 characters)";
  }
  
  return null;
};