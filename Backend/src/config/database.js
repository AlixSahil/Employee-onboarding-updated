import oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

// Database configuration
const dbConfig = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: process.env.ORACLE_CONNECTION_STRING,
  privilege: oracledb.SYSDBA,
  poolMin: parseInt(process.env.ORACLE_POOL_MIN || '1'),
  poolMax: parseInt(process.env.ORACLE_POOL_MAX || '5'),
  poolIncrement: parseInt(process.env.ORACLE_POOL_INCREMENT || '1')
};

// Initialize the database connection pool
export const initializeDatabase = async () => {
  try {
    // Set oracledb module options
    oracledb.autoCommit = false;
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    
    // Create the connection pool
    await oracledb.createPool(dbConfig);
    console.log('Oracle database connection pool created successfully');
    
    // Test the connection
    const connection = await getConnection();
    await connection.close();
    console.log('Successfully connected to Oracle Database');
    
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Function to get a connection from the pool
export const getConnection = async () => {
  try {
    const connection = await oracledb.getConnection();
    return connection;
  } catch (error) {
    console.error('Error getting database connection:', error);
    throw error;
  }
};

// Close all connections in the pool
export const closePool = async () => {
  try {
    await oracledb.getPool().close(0);
    console.log('Connection pool closed');
  } catch (error) {
    console.error('Error closing connection pool:', error);
    throw error;
  }
};

// Execute a query with parameters
export const executeQuery = async (sql, params = {}, options = {}) => {
  let connection;
  
  try {
    connection = await getConnection();
    const result = await connection.execute(sql, params, options);
    
    if (options.autoCommit !== false) {
      await connection.commit();
    }
    
    return result;
  } catch (error) {
    if (connection && options.autoCommit !== false) {
      await connection.rollback();
    }
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Error closing connection:', error);
      }
    }
  }
};

// Execute a transaction (multiple queries)
export const executeTransaction = async (queries) => {
  let connection;
  
  try {
    connection = await getConnection();
    
    const results = [];
    
    for (const query of queries) {
      const { sql, params, options } = query;
      const result = await connection.execute(sql, params, options || {});
      results.push(result);
    }
    
    await connection.commit();
    return results;
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Error closing connection:', error);
      }
    }
  }
};