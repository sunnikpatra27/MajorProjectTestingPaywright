// Import the `test` function from Playwright to define tests.
const { test } = require('@playwright/test');

// Import the xlsx package to handle Excel files
const xlsx = require('xlsx');

// Import the path module to handle file paths
const path = require('path');

// Import the LoanCalculatorPage class which holds methods to interact with the Loan Calculator page
const { LoanCalculatorPage } = require('../pages/LoanCalculatorPage');

// Read input data from the Excel file located at '../data/input.xlsx'
const inputWorkbook = xlsx.readFile(path.join(__dirname, '../data/input.xlsx'));

// Create a new empty Excel workbook to store the results of the tests
const outputWorkbook = xlsx.utils.book_new();


// Function to write results to an Excel file.
function writeResults(sheetName, data) {

  // Convert JSON data to a worksheet format
  const worksheet = xlsx.utils.json_to_sheet(data);

  // Append the worksheet to the output workbook under the given sheet name.
  xlsx.utils.book_append_sheet(outputWorkbook, worksheet, sheetName);

  // Write the workbook to an Excel file named 'loancalcoutput.xlsx'
  xlsx.writeFile(outputWorkbook, path.join(__dirname, '../data/loancalcoutput.xlsx'));
}


//  Test 3:
// Test Case 1: Loan Calculator UI Validation
test('Loan Calculator UI Validation', async ({ page }) => {

  // Read data from the 'LoanCalculator' sheet in the input Excel file. Only the first row of data is used here.
  const input = xlsx.utils.sheet_to_json(inputWorkbook.Sheets['LoanCalculator'])[0];

  // Create an instance of the LoanCalculatorPage to interact with the loan calculator page
  const loanCalcPage = new LoanCalculatorPage(page);
  
  // Navigate to the loan calculator page
  await loanCalcPage.navigate();

  //Validate the UI elements and capture the result.
  const results = [await loanCalcPage.validateUI(input)];

  // Write the results to the output Excel file under the "LoanCalculator" sheet
  writeResults('LoanCalculator', results);

});

// Test Case 2
test('Tenure data Validation', async ({ page }) => {

  // Read data from the 'LoanCalculator' sheet in the input Excel file
  const input = xlsx.utils.sheet_to_json(inputWorkbook.Sheets['LoanCalculator'])[0];

  // Create an instance of the LoanCalculatorPage to interact with the loan calculator page
  const loanCalcPage = new LoanCalculatorPage(page);
   
  // Navigate to the loan calculator page
  await loanCalcPage.navigate();

  // Validate the tenure data and capture the result
  const results = [await loanCalcPage.validateTenuredata(input)];

  // Write the results to the output Excel file under the "TenureData" sheet
  console.log(results);
});

// Test Case 3
test('Check Scale Change', async ({ page }) => {

  // Read data from the 'LoanCalculator' sheet in the input Excel file
  const input = xlsx.utils.sheet_to_json(inputWorkbook.Sheets['LoanCalculator'])[0];

  // Create an instance of the LoanCalculatorPage to interact with the loan calculator page
  const loanCalcPage = new LoanCalculatorPage(page);
  
  // Navigate to the loan calculator page
  await loanCalcPage.navigate();

  // Validate the scale change and capture the result
  const results = [await loanCalcPage.scaleChange(input)];

   // Log the results to the console.
  console.log(results);
});

// Test Case 4
test('Check Reuse Validation', async ({ page }) => {

  // Read data from the 'LoanCalculator' sheet in the input Excel file
  const input = xlsx.utils.sheet_to_json(inputWorkbook.Sheets['LoanCalculator'])[0];

  // Create an instance of the LoanCalculatorPage to interact with the loan calculator page
  const loanCalcPage = new LoanCalculatorPage(page);
  
  // Navigate to the loan calculator page
  await loanCalcPage.navigate();

  // Validate the reuse of calculators and capture the result
  const results = [await loanCalcPage.reuseCheck(input)];

  // Log the results to the console.
  console.log(results);
});

// Test Case 5
test('Check Loan Amount Change', async ({ page }) => {

  // Read data from the 'LoanCalculator' sheet in the input Excel file
  const input = xlsx.utils.sheet_to_json(inputWorkbook.Sheets['LoanCalculator'])[0];

  // Create an instance of the LoanCalculatorPage to interact with the loan calculator page
  const loanCalcPage = new LoanCalculatorPage(page);
  
  // Navigate to the loan calculator page
  await loanCalcPage.navigate();

  // Validate the loan amount change and capture the result
  const results = [await loanCalcPage.loanAmountChange(input)];

  // Log the results to the console.
  console.log(results);
});

