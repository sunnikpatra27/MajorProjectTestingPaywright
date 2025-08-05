  // CarLoanPage class to interact with the car loan EMI calculator webpage
class CarLoanPage {
  // Constructor method, initializes selectors for various elements on the page
  constructor(page) {

    // The page object provided by the testing library
    this.page = page;

    // Selectors for various elements on the car loan tab on the webpage
    this.loanTab = '#car-loan';

    //  Selector for the loan amount input field
    this.loanAmountInput = '#loanamount';

    // Selector for the interest rate input field
    this.interestRateInput = '#loaninterest';

    // Selector for the loan tenure input field
    this.loanTenureInput = '#loanterm';

    // Selector for the trigger area to calculate EMI
    this.triggerArea = "//label[@for='emischeme']";

    // Selector for the year dropdown to select the year for EMI breakup
    this.clickYear = '//*[@id="year2025"]';

    // Selector for the EMI breakup table
    this.amortizationTable = '#emibreakup tbody tr';
  }

  // Method to navigate to the car loan page and click the loan tab
  async navigate() {

     // Navigates to the car loan calculator website
    await this.page.goto('https://emicalculator.net');

     // Click on the "Car Loan" tab to navigate to the car loan section
    await this.page.click(this.loanTab);
  }

  // Method to fill in the loan details and trigger the calculation
  async fillLoanDetails({ loanAmount, interestRate, tenure }) {
    
    // Fill in the loan amount in the respective input field
   await this.page.fill(this.loanAmountInput, loanAmount.toString());


    // Fill in the interest rate in the respective input field
    await this.page.fill(this.interestRateInput, interestRate.toString());

    // Fill in the loan tenure in the respective input field
    await this.page.fill(this.loanTenureInput, tenure.toString());

    // Click on the trigger area to initiate the EMI calculation
    await this.page.click(this.triggerArea); // Trigger calculation
  }

    // Method to retrieve the breakup of the first month's EMI
   async getFirstMonthBreakup() {

    // Click on the year 2025 to view the breakdown for that year
    await this.page.click(this.clickYear);

    // Return an object containing the month, principal, and interest breakup for the first month (July in this case)
    return {

      // Extract the month name (expected to be "Jul" in this case)
      Month: await this.page.locator("//td[normalize-space()='Jul']").first().textContent(),

      // Extract the principal amount for the first month
      Principal: await this.page.locator('//*[@id="monthyear2025"]/td/div/table/tbody/tr[1]/td[2]').textContent(),

      // Extract the interest amount for the first month
      Interest: await this.page.locator('//*[@id="monthyear2025"]/td/div/table/tbody/tr[1]/td[3]').textContent()
    };
  }

   // Method to validate if the EMI calculation result is visible on the page
  async validateEMICalculation() {

    // Wait for the selector of the total EMI amount to be visible (indicating the calculation is done)
    await this.page.waitForSelector('#emitotalamount');

    // Return true if the EMI total amount is visible, otherwise false
    return await this.page.locator('#emitotalamount').isVisible();
  }

  // Method to check if the necessary UI elements (inputs) are visible
  async checkUIElements() {

   
    return {

       // Check if the loan amount input is visible on the page
      loanAmountVisible: await  this.page.locator(this.loanAmountInput).isVisible(),

      // Check if the interest rate input is visible on the page  
      interestRateVisible: await this.page.locator(this.interestRateInput).isVisible(),

      // Check if the tenure input is visible on the page
      tenureVisible: await this.page.locator(this.loanTenureInput).isVisible()
    };
  }

}

// Export the class so it can be used in other parts of the application
module.exports = { CarLoanPage };
