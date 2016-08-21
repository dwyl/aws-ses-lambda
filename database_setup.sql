/* first drop test tables from previous session so we have a clean database */
/* DROP SCHEMA public cascade; http://stackoverflow.com/a/13823560/1148249 */
CREATE SCHEMA IF NOT EXISTS public;
/* DROP DATABASE IF EXISTS test; */
/* CREATE DATABASE test; */
/* create the people table */
CREATE TABLE IF NOT EXISTS bounces (
  id SERIAL PRIMARY KEY,
  email VARCHAR(254) NOT NULL,
  start_timestamp INTEGER DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)
);
