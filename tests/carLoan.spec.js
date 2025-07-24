// Importing necessary libraries

const { test } = require('@playwright/test'); // Import Playwright's test functionality

//Import the xlsx package to handle Excel files
const xlsx = require('xlsx');

//Import the path module to handle file paths
const path = require('path');

//Import the CarLoanPage object (Page Object Model)
const { CarLoanPage } = require('../pages/CarLoanPage');


// Load the input Excel file (test data) using the 'xlsx' package
const inputWorkbook = xlsx.readFile(path.join(__dirname, '../data/input.xlsx'));

// Create a new empty Excel workbook to store the results
const outputWorkbook = xlsx.utils.book_new();

// Utility function to write test results to an Excel file
function writeResults(sheetName, data) {

  
  // Convert JSON data to a worksheet
  const worksheet = xlsx.utils.json_to_sheet(data);

  // Append the worksheet to the workbook
  xlsx.utils.book_append_sheet(outputWorkbook, worksheet, sheetName);

  // Write the workbook to the output file
  xlsx.writeFile(outputWorkbook, path.join(__dirname, '../data/caroutput.xlsx'));
}

//  Test Case 1: Car Loan Calculator - First Month Breakdown
test('Car Loan Calculator - First Month Breakdown', async ({ page }) => {

   // Extracting the first row of data (Car Loan details) from the input Excel sheet
  const input = xlsx.utils.sheet_to_json(inputWorkbook.Sheets['CarLoan'])[0];

  // Create an instance of the CarLoanPage to interact with the car loan page
  const carLoanPage = new CarLoanPage(page);

  // Navigate to the car loan calculator page
  await carLoanPage.navigate();

  // Fill in the loan details (Loan Amount, Interest Rate, and Loan Tenure) from the Excel file
  await carLoanPage.fillLoanDetails({
    loanAmount: input['Loan Amount'],
    interestRate: input['Interest Rate'],
    tenure: input['Loan Tenure (Years)']
  });

  // Get the first month’s EMI breakdown (Principal & Interest for the first month)
  const firstMonthData = await carLoanPage.getFirstMonthBreakup();

  // Write the result (first month breakdown) to the output Excel file
  writeResults('CarLoan', [firstMonthData]);
});


//Test Case 2 : Check if the EMI calculation is visible
test('Car Loan - EMI Calculation Check', async ({ page }) => {

  // Create an instance of the CarLoanPage to interact with the car loan page
  const carLoanPage = new CarLoanPage(page);

  // Navigate to the car loan calculator page
  await carLoanPage.navigate();

  // Fill in the loan details with sample values (loan amount = 1,000,000, interest rate = 8.5%, tenure = 2 years)
  await carLoanPage.fillLoanDetails({ loanAmount: 1000000, interestRate: 8.5, tenure: 2 });

  
  // Validate whether the EMI calculation result is visible on the page
  const visible = await carLoanPage.validateEMICalculation();

  // Log the visibility status of the EMI calculation result
  console.log({ EMIVisible: visible });
});


//Test Case 3 : Check UI Elements Visibility
test('Car Loan - UI Elements Visibility', async ({ page }) => {

  // Create an instance of the CarLoanPage to interact with the car loan page
  const carLoanPage = new CarLoanPage(page);

  // Navigate to the car loan calculator page
  await carLoanPage.navigate();

  // Check the visibility of UI elements
  const ui = await carLoanPage.checkUIElements();

  // Log the visibility status of UI elements
  console.log(ui);
});


//Test Case 4 : Check Different Tenure
test('Car Loan - Different Tenure', async ({ page }) => {

  // Create an instance of the CarLoanPage to interact with the car loan page
  const carLoanPage = new CarLoanPage(page);

  // Navigate to the car loan calculator page
  await carLoanPage.navigate();

  // Fill in the loan details with different values (loan amount = 500,000, interest rate = 7.5%, tenure = 5 years)
  await carLoanPage.fillLoanDetails({ loanAmount: 500000, interestRate: 7.5, tenure: 5 });

  // Get the first month’s EMI breakdown
  const result = await carLoanPage.getFirstMonthBreakup();

  // Log the result of the first month’s EMI breakdown
  console.log(result);
});


//Test Case 5 : Check Edge Case Input
test('Car Loan - Edge Case Input', async ({ page }) => {

  // Create an instance of the CarLoanPage to interact with the car loan page
  const carLoanPage = new CarLoanPage(page);

  // Navigate to the car loan calculator page
  await carLoanPage.navigate();

  // Fill in the loan details with edge case values (loan amount = 1, interest rate = 0.1%, tenure = 1 year)
  await carLoanPage.fillLoanDetails({ loanAmount: 1, interestRate: 0.1, tenure: 1 });

  // Get the first month’s EMI breakdown
  const result = await carLoanPage.getFirstMonthBreakup();

  // Log the result of the first month’s EMI breakdown
  console.log(result);
});






// ✅ Save output after all tests
/*test.afterAll(() => {
  xlsx.writeFile(outputWorkbook, path.join(__dirname, '../data/output.xlsx'));
});*/
