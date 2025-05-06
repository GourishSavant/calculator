

import React, { useState } from "react";
import { Card, CardContent } from "../Utils/card.jsx";
import { Button } from "../Utils/button.jsx";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(12000);
  const [interestRate, setInterestRate] = useState(8);
  const [termYears, setTermYears] = useState(5);
  const [showTable, setShowTable] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [currency, setCurrency] = useState("CAD");

  const [loanAmountError, setLoanAmountError] = useState('');
  const [interestRateError, setInterestRateError] = useState('');
  const [termYearsError, setTermYearsError] = useState('');

  const validateNumberInput = (value) => {
    if (value.trim() === '') {
      return 'Required';
    }
    if (!/^\d+(\.\d+)?$/.test(value)) {
      return 'amount must be a `number` type, but the final value was: `NaN`.';
    }
    return '';
  };

  const fetchExchangeRates = async (baseCurrency) => {
    try {
      const response = await fetch(
        `https://open.er-api.com/v6/latest/${baseCurrency}`
      );
      const data = await response.json();
      if (data.result === "success") {
        return data.rates;
      } else {
        throw new Error("Failed to fetch exchange rates");
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      return null;
    }
  };

  const calculateEMI = async () => {
    const loanError = validateNumberInput(loanAmount);
    const interestError = validateNumberInput(interestRate);
    const termError = validateNumberInput(termYears);

    setLoanAmountError(loanError);
    setInterestRateError(interestError);
    setTermYearsError(termError);

    if (loanError || interestError || termError) {
      alert("Please correct the input errors before calculating EMI.");
      return;
    }

    const principal = Number(loanAmount);
    const annualRate = Number(interestRate) / 100;
    const months = Number(termYears) * 12;
    const monthlyRate = annualRate / 12;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const rates = await fetchExchangeRates("USD");
    if (!rates || !rates[currency]) {
      alert("Failed to fetch exchange rates.");
      return;
    }

    const conversionRate = rates[currency];
    const convertedEMI = emi * conversionRate;

    setMonthlyEMI(convertedEMI.toFixed(2));

    const table = [];
    let balance = principal;
    for (let i = 1; i <= months; i++) {
      const interest = balance * monthlyRate;
      const principalPaid = emi - interest;
      balance -= principalPaid;
      table.push({
        month: i,
        principal: (principalPaid * conversionRate).toFixed(2),
        interest: (interest * conversionRate).toFixed(2),
        balance: (balance * conversionRate).toFixed(2),
      });
    }
    setSchedule(table);
    setShowTable(true);
  };

  const resetTable = () => {
    setShowTable(false);
    setSchedule([]);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">

      <div className="pt-5 w-full">
        <h1 className="text-3xl md:text-5xl font-semibold mb-6 text-left">
          Loan Calculator Dashboard
        </h1>

        <div className="flex flex-col lg:flex-row flex-wrap gap-5 pt-5">
        <Box
  component="form"
  sx={{
    '& .MuiTextField-root': {
      m: 2,
      width: {
        xs: '100%',  
        sm: '45ch',  
        md: '30ch', 
      },
      height: '80px',
    },
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 3,
    pt: 5,
  }}
  noValidate
  autoComplete="off"
>
  {/* Loan Amount */}
  <TextField
    label="Loan Amount"
    variant="outlined"
    value={loanAmount}
    onChange={(e) => {
      const value = e.target.value;
      setLoanAmount(value);
      setLoanAmountError(validateNumberInput(value));
    }}
    error={Boolean(loanAmountError)}
    helperText={loanAmountError || ' '}
    InputLabelProps={{ style: { color: 'inherit' } }}
    InputProps={{
      style: {
        color: 'inherit',
        backgroundColor: 'transparent',
        height: '64px',
        fontSize: '1.25rem',
        
      },
    }}
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: 'gray', borderWidth: '2px' },
        '&:hover fieldset': { borderColor: 'black' },
        '&.Mui-focused fieldset': { borderColor: 'grey' },
      },
      '& .MuiInputLabel-root': {
        color: 'inherit',
      },
    }}
  />

  {/* Interest Rate */}
  <TextField
    label="Interest Rate (%)"
    variant="outlined"
    value={interestRate}
    onChange={(e) => {
      const value = e.target.value;
      setInterestRate(value);
      setInterestRateError(validateNumberInput(value));
    }}
    error={Boolean(interestRateError)}
    helperText={interestRateError || ' '}
    InputLabelProps={{ style: { color: 'inherit' } }}
    InputProps={{
      style: {
        color: 'inherit',
        backgroundColor: 'transparent',
        height: '64px',
        fontSize: '1.25rem',
      },
    }}
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: 'gray', borderWidth: '2px' },
        '&:hover fieldset': { borderColor: 'black' },
        '&.Mui-focused fieldset': { borderColor: 'grey' },
      },
      '& .MuiInputLabel-root': {
        color: 'inherit',
      },
    }}
  />

  {/* Term (Years) */}
  <TextField
    label="Term (Years)"
    variant="outlined"
    value={termYears}
    onChange={(e) => {
      const value = e.target.value;
      setTermYears(value);
      setTermYearsError(validateNumberInput(value));
    }}
    error={Boolean(termYearsError)}
    helperText={termYearsError || ' '}
    InputLabelProps={{ style: { color: 'inherit' } }}
    InputProps={{
      style: {
        color: 'inherit',
        backgroundColor: 'transparent',
        height: '64px',
        fontSize: '1.25rem',
      },
    }}
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: 'gray', borderWidth: '2px' },
        '&:hover fieldset': { borderColor: 'black' },
        '&.Mui-focused fieldset': { borderColor: 'grey' },
      },
      '& .MuiInputLabel-root': {
        color: 'inherit',
      },
    }}
  />
</Box>
        </div>
        <div className="flex flex-wrap pt-10 md:pt-16 mb-6">
          <Button onClick={calculateEMI} className="w-full sm:w-48 h-14 md:h-16 text-xl md:text-2xl px-6 py-3">
            CALCULATE
          </Button>
        </div>

        {showTable && (
          <>
            <div className="">
              <p className="text-2xl md:text-3xl pt-10 font-semibold mb-2">
                Monthly EMI: ${monthlyEMI}
              </p>
              <div className="pt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-5">
                <div className="relative w-full sm:w-[9rem] h-16 md:h-20">
                  <label className="absolute -top-2 left-3 bg-white dark:bg-gray-900 px-1 text-lg md:text-xl text-gray-600 dark:text-gray-300">
                    Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="border border-black p-4 md:p-6 rounded w-full h-full text-lg md:text-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="INR">INR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                    <option value="CAD">CAD</option>
                  </select>
                </div>

                <Button
                  variant="outline"
                  onClick={resetTable}
                  className="text-purple-600 h-14 md:h-16 w-full sm:w-40 text-lg md:text-xl"
                >
                  RESET TABLE
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="w-full pt-10 bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
                <div className="overflow-x-auto overflow-y-auto max-h-[600px] border rounded dark:border-gray-700">
                  <h2 className="text-2xl md:text-3xl pt-10 font-semibold mb-4">
                    Amortization Schedule ({currency})
                  </h2>
                  <table className="min-w-full table-fixed text-left border-collapse">
                    <thead className="sticky top-0 z-20 bg-white dark:bg-gray-900">
                      <tr>
                        {["Month", "Principal", "Interest", "Remaining Balance"].map((heading, i) => (
                          <th
                            key={i}
                            className="w-1/4 p-4 text-lg md:text-2xl border-b border-gray-300 dark:border-gray-600 sticky top-0 bg-white dark:bg-gray-900 z-20"
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((row, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-300 text-base md:text-xl h-20 md:h-24"
                        >
                          <td className="w-1/4 p-3">{row.month}</td>
                          <td className="w-1/4 p-3">{row.principal} {currency}</td>
                          <td className="w-1/4 p-3">{row.interest} {currency}</td>
                          <td className="w-1/4 p-3">{row.balance} {currency}</td>
                        </tr>
                      ))}

                      {schedule.length < 8 &&
                        Array.from({ length: 8 - schedule.length }).map((_, idx) => (
                          <tr
                            key={`empty-${idx}`}
                            className="border-b border-gray-300 text-base md:text-xl h-20 md:h-24"
                          >
                            <td className="w-1/4 p-3 text-gray-400">—</td>
                            <td className="w-1/4 p-3 text-gray-400">—</td>
                            <td className="w-1/4 p-3 text-gray-400">—</td>
                            <td className="w-1/4 p-3 text-gray-400">—</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
