# Day 03 Lab -- Parallel file system

### This project reads an array of files and console logs the first 8 bytes in the file as hex.

- The logData function accepts an array of files.  
- It will read those files in the order they are given, and console log the first 8 bytes in the file.
- Any files to be read must be in the assets folder.

### Mocha is used to test

- Because we are testing asynchronous code (fs.readData) we are passing 'done' as a callback in our mocha tests.  This lets us know when the function has finished running, so that we only check our tests after the function has run, otherwise we will pass test without actually testing anything.
