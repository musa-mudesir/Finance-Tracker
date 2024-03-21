const loginButton = document.getElementById("btnLogin");

if (loginButton) {
  loginButton.addEventListener("click", toggleLoginForm);
} else {
  console.error("Login button not found!");
}

function toggleLoginForm() {
  const loginForm = document.getElementById("LoginForm");
  loginForm.style.display =
    loginForm.style.display === "none" || loginForm.style.display === ""
      ? "block"
      : "none";
}

function addTransaction() {
  // Get input values
  const date = document.querySelector("#dateInput").value;
  const description = document.querySelector("#descriptionInput").value;
  const category = document.querySelector("#categoryInput").value;
  const withdrawal = document.querySelector("#withdrawalInput").value;
  const deposit = document.querySelector("#depositInput").value;
  const balance = document.querySelector("#balanceInput").value;

  // Create a new row
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
          <td>${date}</td>
          <td>${description}</td>
          <td>${category}</td>
          <td>${withdrawal}</td>
          <td>${deposit}</td>
          <td>${balance}</td>
      `;

  // Append the new row to the table body
  document.querySelector("#transactionsTable tbody").appendChild(newRow);

  // Clear input values for the next entry
  document
    .querySelectorAll(
      "#dateInput, #descriptionInput, #categoryInput, #withdrawalInput, #depositInput, #balanceInput"
    )
    .forEach((input) => {
      input.value = "";
    });
}

function calculateTotalBalance() {
  let totalBalance = 0;

  let balanceInputs = document.querySelectorAll("#balanceInput");

  balanceInputs.forEach((input) => {
    const balanceValue = parseFloat(input.value);
    if (!isNaN(balanceValue)) {
      totalBalance += balanceValue;
    }
  });

  return totalBalance;
}

function updateTotalBalance() {
  const totalBalance = calculateTotalBalance();
  document.getElementById("totalBalanceDisplay").textContent =
    "Total balance: " + totalBalance;
}

document.addEventListener("DOMContentLoaded", function () {
  updateTotalBalance(); // Calculate total balance initially

  const balanceInputs = document.querySelectorAll(".balanceInput");

  balanceInputs.forEach((input) => {
    input.addEventListener("input", updateTotalBalance); // Update total balance whenever a balance input changes
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const budgetForm = document.querySelector("#budgetForm");

  budgetForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    calculateSavingsPlan(); // Call the function to calculate savings goal
  });
});

function calculateSavingsPlan() {
  const income = parseFloat(document.querySelector("#income").value) || 0;
  const expenses = parseFloat(document.querySelector("#expenses").value) || 0;
  const savingsGoal = parseFloat(document.querySelector("#savings").value) || 0;
  const timeFrame = parseFloat(document.querySelector("#timeFrame").value) * 12;

  // Calculate the amount available for savings
  const availableForSavings = income - expenses;

  // Calculate the percentage of income allocated for savings
  const savingsPercentage = (availableForSavings / income) * 100;

  // Calculate the timeframe

  // Calculate the monthly savings needed to reach the savings goal in one year
  const monthlySavingsNeeded = savingsGoal / timeFrame;

  // Display the savings plan
  const savingsPlanMessage = `
        With your current income and expenses:
        - You have $${availableForSavings} available for savings each month.
        - This is ${savingsPercentage.toFixed(2)}% of your income.
        - To reach your savings goal of $${savingsGoal} in ${
    timeFrame / 12
  } years, you need to save approximately $${monthlySavingsNeeded.toFixed(
    2
  )} per month.
      `;

  // Display the savings plan message
  document.querySelector("#savingsPlanMessage").textContent =
    savingsPlanMessage;
}

// Add event listener to the form submission
document
  .getElementById("budgetForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    calculateSavingsPlan(); // Call the function to calculate the savings plan
  });
