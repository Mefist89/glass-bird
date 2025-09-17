import React from 'react';

const SQL: React.FC = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>SQL Course</h1>
      <p>Welcome to our comprehensive SQL (Structured Query Language) course!</p>
      <p>SQL is the standard language for managing and manipulating relational databases. This course will teach you everything from basic queries to advanced database design.</p>
      
      <h2>Course Content</h2>
      <ul>
        <li>Introduction to Databases and SQL</li>
        <li>Basic SELECT Statements</li>
        <li>Filtering and Sorting Data</li>
        <li>Joining Tables</li>
        <li>Subqueries</li>
        <li>Aggregate Functions</li>
        <li>Grouping Data</li>
        <li>Modifying Data (INSERT, UPDATE, DELETE)</li>
        <li>Database Design and Normalization</li>
      </ul>
      
      <h2>Learning Resources</h2>
      <p>Our SQL course includes interactive exercises, real database examples, and projects to help you become proficient in database management and querying.</p>
    </div>
  );
};

export default SQL;