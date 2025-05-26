/**
 * Helper functions for the API
 */

// Format date to YYYY-MM-DD for Oracle database
export const formatDateForDB = (dateString) => {
  if (!dateString) return null;
  
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      console.error('Invalid date format:', dateString);
      return null;
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (err) {
    console.error('Error formatting date:', err);
    return null;
  }
};

// Format date response for client
export const formatDateResponse = (obj) => {
  if (!obj) return obj;
  
  const formattedObj = { ...obj };
  
  Object.keys(obj).forEach(key => {
    // Convert Oracle date objects to JS date strings
    if (obj[key] instanceof Date) {
      formattedObj[key] = obj[key].toISOString().split('T')[0];
    }
  });
  
  return formattedObj;
};

// Validate required fields
export const validateRequiredFields = (data, requiredFields) => {
  if (!data) return requiredFields;
  
  return requiredFields.filter(field => {
    return data[field] === undefined || data[field] === null || data[field] === '';
  });
};

// Build dynamic SQL update query
export const buildUpdateQuery = (tableName, fields, whereField) => {
  const updateFields = fields.map(field => `${field} = :${field}`).join(', ');
  return `UPDATE ${tableName} SET ${updateFields} WHERE ${whereField} = :${whereField}`;
};

// Parse error message
export const parseErrorMessage = (error) => {
  if (!error) return 'Unknown error';
  
  if (error.message) {
    // Check for Oracle specific errors
    if (error.message.includes('ORA-')) {
      const oraMatch = error.message.match(/ORA-\d+:(.*?)(?:ORA-|$)/);
      if (oraMatch && oraMatch[1]) {
        return oraMatch[1].trim();
      }
    }
    
    return error.message;
  }
  
  return 'Internal server error';
};

// Convert camelCase to snake_case
export const camelToSnake = (str) => {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

// Convert snake_case to camelCase
export const snakeToCamel = (str) => {
  return str.replace(/([-_][a-z])/g, group => 
    group.toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );
};

// Transform object keys from snake_case to camelCase
export const transformToCamelCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(v => transformToCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      result[snakeToCamel(key)] = transformToCamelCase(obj[key]);
      return result;
    }, {});
  }
  return obj;
};

// Transform object keys from camelCase to snake_case
export const transformToSnakeCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(v => transformToSnakeCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      result[camelToSnake(key)] = transformToSnakeCase(obj[key]);
      return result;
    }, {});
  }
  return obj;
};