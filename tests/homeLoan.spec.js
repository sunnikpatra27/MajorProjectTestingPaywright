// Import necessary libraries and modules for the test

// Playwright test framework for writing browser automation tests
const { test } = require('@playwright/test');

// Import the xlsx package to handle Excel files
const xlsx = require('xlsx');

 // Library for working with file and directory paths
const path = require('path');

//Import the HomeLoanPage class which holds methods to interact with the Home Loan page
const { HomeLoanPage } = require('../pages/HomeLoanPage');

// Read input data from the Excel file located at '../data/input.xlsx'
const inputWorkbook = xlsx.readFile(path.join(__dirname, '../data/input.xlsx'));

// Create a new empty Excel workbook to store the results of the tests
const outputWorkbook = xlsx.utils.book_new();

// Function to write test results to an Excel sheet
function writeResults(sheetName, data) {

// Convert the JSON data to a worksheet format
const worksheet = xlsx.utils.json_to_sheet(data);

  // Add the worksheet to the output workbook with the specified sheet name
  xlsx.utils.book_append_sheet(outputWorkbook, worksheet, sheetName);

  // Write the results to an Excel file called 'homeloanoutput.xlsx'
  xlsx.writeFile(outputWorkbook, path.join(__dirname, '../data/homeloanoutput.xlsx'));
}

// ✅ Test Case 1: Home Loan EMI Calculator
test('Home Loan EMI Calculator Test', async ({ page }) => {

  //Read input data from the "HomeLoan" sheet in the input workbook
  const input = xlsx.utils.sheet_to_json(inputWorkbook.Sheets['HomeLoan'])[0];

  // Create an instance of the HomeLoanPage to interact with the home loan page
  const homeLoanPage = new HomeLoanPage(page);
  
  // Navigate to the home loan calculator page
  await homeLoanPage.navigate();

  // Fill in the home loan details using the input data from the Excel file
  await homeLoanPage.fillHomeLoanDetails(input);
  
  // Get the loan tenure from input and convert it to an integer
  const tenureYears = parseInt(input['Loan Tenure (Years)']);

   // Extract yearly breakdown data (e.g., loan repayment details) for the tenure + 1 year
  const results = await homeLoanPage.extractYearlyBreakup(tenureYears + 1);

  // Write the results to the output Excel file under the "HomeLoan" sheet
  writeResults('HomeLoan', results);

  //console.log(results);
});

// Test Case 2: Total Interest Visibility
test('Home Loan - Total Interest Check', async ({ page }) => {

  // Create an instance of the HomeLoanPage to interact with the home loan page
  const homeLoanPage = new HomeLoanPage(page);

  // Navigate to the home loan calculator page and fill in the details
  await homeLoanPage.navigate();

  // Fill the home loan form with specific values
  await homeLoanPage.fillHomeLoanDetails({

    // Fill in the home loan details with specific values
    'Home Value': 2500000,

    // Down payment percentage, loan insurance, loan amount, interest rate, tenure, and other optional fields
    'Down Payment (%)': 20,
    'Loan Insurance': 0,
    'Loan Amount': 2000000,
    'Interest Rate': 9,
    'Loan Tenure (Years)': 3,
    'Loan Fees (%)': 1,
    'One-time Expenses (%)': 0,
    'Property Taxes / year (%)': 0,
    'Home Insurance / year (%)': 0,
    'Maintenance Expenses / month': 0
  });

  //Check if the "Total Interest" field is visible on the page
  const visible = await homeLoanPage.validateTotalInterest();

  // Log the visibility status of the total interest field
  console.log({ InterestVisible: visible });
});

// ✅ Test 3: UI Elements Visibility
test('Home Loan - UI Elements Visibility', async ({ page }) => {

  // Create an instance of the HomeLoanPage to interact with the home loan page
  const homeLoanPage = new HomeLoanPage(page);

  // Navigate to the home loan calculator page
  await homeLoanPage.navigate();

  // Check the visibility of UI elements on the home loan page
  const ui = await homeLoanPage.checkUIElements();

  // Log the visibility status of UI elements
  console.log(ui);
});

// ✅ Test 4: Insurance Impact
test('Home Loan - Insurance Impact', async ({ page }) => {

  // Create an instance of the HomeLoanPage to interact with the home loan page
  const homeLoanPage = new HomeLoanPage(page);

  // Navigate to the home loan calculator page and fill in the details
  await homeLoanPage.navigate();

  // Fill the home loan form with specific values including insurance impact
  await homeLoanPage.fillHomeLoanDetails({
    'Home Value': 2000000,
    'Down Payment (%)': 15,
    'Loan Insurance': 5000,
    'Loan Amount': 1500000,
    'Interest Rate': 8.5,
    'Loan Tenure (Years)': 2,
    'Loan Fees (%)': 1,
    'One-time Expenses (%)': 0,
    'Property Taxes / year (%)': 0,
    'Home Insurance / year (%)': 0,
    'Maintenance Expenses / month': 0
  });

  // Extract the yearly breakdown data for a 3-year loan
  const results = await homeLoanPage.extractYearlyBreakup(3);

  // Write the results to the output Excel file under the "InsuranceImpact" sheet
  writeResults('InsuranceImpact', results);
});

// ✅ Test 5: Maintenance Impact
test('Home Loan - Maintenance Impact', async ({ page }) => {

  // Create an instance of the HomeLoanPage to interact with the home loan page
  const homeLoanPage = new HomeLoanPage(page);

  // Navigate to the home loan calculator page and fill in the details
  await homeLoanPage.navigate();

  // Fill the home loan form with specific values including maintenance expenses
  await homeLoanPage.fillHomeLoanDetails({
    'Home Value': 2200000,
    'Down Payment (%)': 10,
    'Loan Insurance': 0,
    'Loan Amount': 1800000,
    'Interest Rate': 9.2,
    'Loan Tenure (Years)': 4,
    'Loan Fees (%)': 1,
    'One-time Expenses (%)': 0,
    'Property Taxes / year (%)': 0,
    'Home Insurance / year (%)': 0,
    'Maintenance Expenses / month': 1000
  });

  // Extract the yearly breakdown data for a 5-year loan
  const results = await homeLoanPage.extractYearlyBreakup(5);

  // Write the results to the output Excel file under the "MaintenanceImpact" sheet
  writeResults('MaintenanceImpact', results);
});
