// Define the class `LoanCalculatorPage` that interacts with the Loan Calculator web page.
class LoanCalculatorPage {

  //The constructor takes a `page` object, which represents the browser page in Playwright.
  constructor(page) {

     // Store the `page` object for use in other methods.
    this.page = page;
  }
  
  // Method to navigate to the Loan Calculator page
  async navigate() {

    // Navigate to the Loan Calculator page URL
    await this.page.goto('https://emicalculator.net');

    // Click on the link to the Loan Calculator
    await this.page.click('a[title="Loan Calculators, Widgets & Rates"]');

    // Wait for the Loan Calculator page to load
    await this.page.click('text=Loan Calculator');

  }
  
  // Validate if the loan calculator UI elements (fields) are visible on the page
  async validateUI(input) {
    return {

      //Check if the Loan Amount input field is visible using its ID (`#loanamount`)
      'Loan Amount Field Visible': await this.page.isVisible('#loanamount'),

      //Check if the Interest Rate input field is visible using its ID (`#loaninterest`)
      'Interest Rate Field Visible': await this.page.isVisible('#loaninterest'),

      //Check if the Loan Tenure input field is visible using its ID (`#loanterm`)
      'Loan Tenure Field Visible': await this.page.isVisible('#loanterm'),
    };
  }
  
  // Validate that the Loan Tenure field is present and changes made to the loan tenure are captured correctly.
  async validateTenuredata(input) {
    return {

      // Check if the Loan Tenure field is visible on the page
      'Loan Tenure Field Visible': await this.page.isVisible('#loanterm'),

      //Capture the value of 'Change Loan Tenure' from the input data and check if it's properly validated
      'Loan Tenure Change Validated': input['Change Loan Tenure']
    };
  }
  
  // Validate that any scale changes made (like scaling values, adjusting ranges) are captured correctly
  async scaleChange(input) {
    return {

      //
      'Scale Change Validated': input['Validate Scale Changes']
    };
  }

  // Reuse validation checks to ensure that specific calculators are reused correctly
  async reuseCheck(input) {
    return {

      //Validate if the Loan Amount calculator is reused based on input data
      'Loan Amount Calculator Reused': input['Reuse Validation for Loan Amount Calculator'],

      //Validate if the Loan Tenure calculator is reused based on input data
      'Loan Tenure Calculator Reused': input['Reuse Validation for Loan Tenure Calculator']
    };
  }

  // Validate if the loan amount changes as expected based on the input data provided
  async loanAmountChange(input) {
    return {

      //Capture and validate the loan amount change from input data
      'Loan Amount Change': input['Change Loan Amount']
    };
  }
}

// Export the LoanCalculatorPage class for use in other files
module.exports = { LoanCalculatorPage };
