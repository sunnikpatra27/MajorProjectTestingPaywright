// CarLoanPage class to interact with the car loan EMI calculator webpage
class HomeLoanPage {

  // Constructor to initialize the page and selectors
  constructor(page) {

    // The 'page' object represents the browser page where interactions happen
    this.page = page;

    // Selectors for the input fields on the home loan calculator page
    this.loanAmountInput = '#homeloanamount';

    // Selectors for the interest rate and tenure input fields
    this.interestRateInput = '#homeloaninterest';

    // Selector for the tenure input field
    this.tenureInput = '#homeloanterm';
  }

  // Method to navigate to the home loan calculator page
  async navigate() {

    // Navigate to the home loan calculator page
    await this.page.goto('https://emicalculator.net');

    // Click on the link to the home loan calculator
    await this.page.click('a[title="Loan Calculators, Widgets & Rates"]');

    // Wait for the home loan calculator page to load
    await this.page.click('text=Home Loan EMI Calculator');
  }

   // Fill the home loan form with the provided input values
  async fillHomeLoanDetails(input) {

    // Fill home value if provided
    if (input['Home Value']) await this.page.fill('#homeprice', input['Home Value'].toString());

    // Fill the home loan form with the input values if provided
    if (input['Down Payment (%)']) await this.page.fill('#downpayment', input['Down Payment (%)'].toString());

    // Fill the loan insurance amount if provided
    if (input['Loan Insurance']) await this.page.fill('#homeloaninsuranceamount', input['Loan Insurance'].toString());

    // Fill the loan details with the provided input values
    if (input['Loan Amount']) await this.page.fill('#homeloanamount', input['Loan Amount'].toString());

    // Fill the interest rate, tenure, and other optional fields if provided
    if (input['Interest Rate']) await this.page.fill('#homeloaninterest', input['Interest Rate'].toString());

    // Fill the tenure, loan fees, one-time expenses, property taxes, home insurance, and maintenance expenses if provided
    if (input['Loan Tenure (Years)']) await this.page.fill('#homeloanterm', input['Loan Tenure (Years)'].toString());

    // Fill the additional fields if provided
    if (input['Loan Fees (%)']) await this.page.fill('#loanfees', input['Loan Fees (%)'].toString());

    // Fill the one-time expenses, property taxes, home insurance, and maintenance expenses if provided
    if (input['One-time Expenses (%)']) await this.page.fill("//input[@id='onetimeexpenses']", input['One-time Expenses (%)'].toString());

    // Fill property taxes if provided
    if (input['Property Taxes / year (%)']) await this.page.fill("//input[@id='propertytaxes']", input['Property Taxes / year (%)'].toString());

    // Fill home insurance and maintenance expenses if provided
    if (input['Home Insurance / year (%)']) await this.page.fill("//input[@id='homeinsurance']", input['Home Insurance / year (%)'].toString());

    // Fill maintenance expenses if provided
    if (input['Maintenance Expenses / month']) await this.page.fill("//input[@id='maintenanceexpenses']", input['Maintenance Expenses / month'].toString());

    // After filling in all the details, click to trigger the calculation
    //  Click on the element with the ID 'exp' to start the calculation
    await this.page.click("//h3[@id='exp']");
  }

  //Extract the yearly breakdown of the home loan payments
  async extractYearlyBreakup(expectedRows) {

     // Locate all the rows containing the yearly payment breakdown
    const rows = await this.page.locator('.yearlypaymentdetails');

    //Get the total number of rows
    const count = await rows.count();

    // Define the column names to extract
    const columnNames = [

      // Column for the year
      "Year",

      //  Column for principal paid
      "Principal (A)",

      // Column for interest paid
      "Interest (B)",

      // Column for taxes, home insurance, and maintenance
      "Taxes, Home Insurance & Maintenance (C)",

      // Column for total payment (A + B + C)
      "Total Payment (A+B+C)",

      // Column for outstanding balance
      "Balance",

      // Column for total interest paid to date
      "Loan Paid to Date"
    ];
    
    // Initialize an array to  hold the results for each row
    const results = [];
    
    // Loop through each row up to the expected number of rows
    for (let i = 0; i < Math.min(count, expectedRows); i++) {

      // Get the current row
      const row = rows.nth(i);

      // Get all the text content from the cells in the row
      const cells = await row.locator('td').allTextContents();

      //Create an object to hold the data for this row
      const rowData = {};
      
      // Loop through each cell and map it to the corresponding column name
      for (let j = 0; j < columnNames.length; j++) {

        // Map cell data to column names, trimming any extra spaces
        rowData[columnNames[j]] = cells[j]?.trim() || '';
      }
       
      // Push the row data into the results array
      results.push(rowData);
    }
    
    // Return the array containing the yearly payment details
    return results;
  }
  
  // Validate if the total interest is visible on the page (this is used for validation in test cases)
  async validateTotalInterest() {
    
    // Return whether the total interest element is visible or not
    return await this.page.locator('#emitotalinterest').isVisible();
  }

  // Define an asynchronous method `checkUIElements` to verify visibility of UI elements on the page 
  async checkUIElements() {
    return {

      // Check if the loan amount input field is visible on the page
      loanAmountVisible: await this.page.locator(this.loanAmountInput).isVisible(),

      // Check if the interest rate input field is visible on the page
      interestRateVisible: await this.page.locator(this.interestRateInput).isVisible(),

      // Check if the tenure input field is visible on the page
      tenureVisible: await this.page.locator(this.tenureInput).isVisible()
    };
  }
}

// Export the HomeLoanPage class for use in other files
module.exports = { HomeLoanPage };
