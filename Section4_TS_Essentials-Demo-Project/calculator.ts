// data:
// initial amount
// annual contribution
// expected return
// duration

// object type not object value
type InvestmentData = {
  initialAmout: number;
  annualContribution: number;
  expectedReturn: number;
  duration: number;
};

type InvestmentResult = {
  year: string;
  totalAmount: number;
  totalContributions: number;
  totalInterestEarned: number;
};

type CalculationResult = InvestmentResult[] | string;

function calculateInvestment(data: InvestmentData): CalculationResult {
  const { initialAmout, annualContribution, expectedReturn, duration } = data;

  if (initialAmout < 0) {
    return "Initial Investment amount must be at least zero";
  }

  if (duration <= 0) {
    return "No valid amount of years provided";
  }

  if (expectedReturn < 0) {
    return "Expected return must be at least zero";
  }

  let total = initialAmout;
  let totalContributions = 0;
  let totalInterestEarned = 0;

  const annualResults: InvestmentResult[] = [];

  for (let i = 0; i < duration; i++) {
    total = total * (1 + expectedReturn); // 0.08
    totalInterestEarned = total - totalContributions - initialAmout;
    totalContributions = totalContributions + annualContribution;
    total = total + annualContribution;

    annualResults.push({
      year: `Year ${i + 1}`,
      totalAmount: total,
      totalInterestEarned,
      totalContributions,
    });
  }

  return annualResults;
} // => result[]

function printResults(results: CalculationResult) {
  // print(output) the result data
  if (typeof results === "string") {
    console.log(results);
    return;
  }

  for (const yearEndResult of results) {
    console.log(yearEndResult.year);
    console.log(`Total: ${yearEndResult.totalAmount.toFixed(0)}`);
    console.log(
      `Total Contributions: ${yearEndResult.totalContributions.toFixed(0)}`,
    );
    console.log(
      `Total Interest Earned: ${yearEndResult.totalInterestEarned.toFixed(0)}`,
    );
    console.log("-----------------");
  }
}

const InvestmentData: InvestmentData = {
  initialAmout: 5000,
  annualContribution: 500,
  expectedReturn: 0.08,
  duration: 10,
};

const results = calculateInvestment(InvestmentData);

printResults(results);
