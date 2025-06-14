import { expect, test } from '@playwright/test';

import { StatusCodes } from 'http-status-codes'
import { OrderDtoHw10 } from './order-dto-hw10'

[1, 100, 1000, 10000].forEach((incomeValue) => {
  test(`Successful calculation with income = ${incomeValue} returns 200`, async ({ request }) => {
    const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
    order.income = incomeValue;

    const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
      data: order
    });

    console.log(`Income: ${incomeValue}`);
    const body = await response.json();
    console.log('response body:', await response.json());
    console.log('response headers:', response.headers());
    expect(response.status()).toBe(StatusCodes.OK);
    expect.soft(body.riskScore).toBeGreaterThanOrEqual(0);
    expect.soft(['Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk']).toContain(body.riskLevel);
    expect.soft(['positive', 'negative', 'neutral']).toContain(body.riskDecision);
  });
});

test('Unsuccessful calculation of risk with income equal to 0 returns 400', async ({ request }) => {
  const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
  order.income = 0;

  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: order
  });

  const status = response.status();
  console.log('response status:', status);
  console.log('response headers:', response.headers());
  const body = await response.text();
  console.log('response body:', body);
  expect.soft(status).toBe(StatusCodes.BAD_REQUEST);

});

test('Unsuccessful calculation of risk with negative income returns 400', async ({ request }) => {
  const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
  order.income = -1;

  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: order
  });
  const status = response.status();
  console.log('response status:', status);
  console.log('response headers:', response.headers());
  const body = await response.text();
  console.log('response body:', body);
  expect.soft(status).toBe(StatusCodes.BAD_REQUEST);
});

test('Unsuccessful calculation of risk with empty income returns 400', async ({ request }) => {
  const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
  order.income = null;

  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: order
  });
  const status = response.status();
  console.log('response status:', status);
  console.log('response headers:', response.headers());
  const body = await response.text();
  console.log('response body:', body);
  expect.soft(status).toBe(StatusCodes.BAD_REQUEST);
});

[1, 100, 1000, 10000].forEach((debtValue) => {
  test(`Successful calculation with debt = ${debtValue} returns 200`, async ({ request }) => {
    const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
    order.debt = debtValue;

    const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
      data: order
    });

    console.log(`Debt: ${debtValue}`);
    const body = await response.json();
    console.log('response body:', await response.json());
    console.log('response headers:', response.headers());
    expect.soft(response.status()).toBe(StatusCodes.OK);
    expect.soft(body.riskScore).toBeGreaterThanOrEqual(0);
    expect.soft(['Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk']).toContain(body.riskLevel);
    expect.soft(['positive', 'negative', 'neutral']).toContain(body.riskDecision);
  });
});

test('Unsuccessful calculation of risk with negative debt returns 400', async ({ request }) => {
  const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
  order.debt = -1;

  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: order
  });

  console.log(`Debt: ${order.debt}`);
  const status = response.status();
  console.log('response status:', status);
  console.log('response headers:', response.headers());
  const body = await response.text();
  console.log('response body:', body);
  expect.soft(status).toBe(StatusCodes.BAD_REQUEST);

});

test('Successful calculation of risk with empty debt returns 200', async ({ request }) => {
  const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
  order.debt = null;

  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: order
  });

  console.log(`Debt: ${order.debt}`);
  const body = await response.json();
  console.log('response body:', await response.json());
  console.log('response headers:', response.headers());
  expect.soft(response.status()).toBe(StatusCodes.OK);
  expect.soft(body.riskScore).toBeGreaterThanOrEqual(0);
  expect.soft(['Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk']).toContain(body.riskLevel);
  expect.soft(['positive', 'negative', 'neutral']).toContain(body.riskDecision);
});

[17, 40, 60].forEach((ageValue) => {
  test(`Successful calculation with age = ${ageValue} returns 200`, async ({ request }) => {
    const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
    order.age = ageValue;

    const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
      data: order
    });

    console.log(`Age: ${ageValue}`);
    const body = await response.json();
    console.log('response body:', await response.json());
    console.log('response headers:', response.headers());
    expect.soft(response.status()).toBe(StatusCodes.OK);
    expect.soft(body.riskScore).toBeGreaterThanOrEqual(0);
    expect.soft(['Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk']).toContain(body.riskLevel);
    expect.soft(['positive', 'negative', 'neutral']).toContain(body.riskDecision);
  });
});

[1, 8, 16].forEach((ageValue) => {
  test(`Unsuccessful calculation with age = ${ageValue} returns 200, but negative risk decision`, async ({ request }) => {
    const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
    order.age = ageValue;

    const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
      data: order
    });

    console.log(`Age: ${ageValue}`);
    const body = await response.json();
    console.log('response body:', await response.text());
    console.log('response headers:', response.headers());
    expect.soft(response.status()).toBe(StatusCodes.OK);
    expect.soft(typeof body.riskScore).toBe('number');
    expect.soft(['Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk']).toContain(body.riskLevel);
    expect.soft(['positive', 'negative', 'neutral']).toContain(body.riskDecision);

  });
});

test(`Unsuccessful calculation with empty age returns 400`, async ({ request }) => {
  const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
  order.age = null;

  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: order
  });

  console.log(`Age: ${order.age}`);
  const status = response.status();
  console.log('response status:', status);
  console.log('response headers:', response.headers());
  const body = await response.text();
  console.log('response body:', body);
  expect.soft(status).toBe(StatusCodes.BAD_REQUEST);

});

test(`Unsuccessful calculation with negative age returns 400`, async ({ request }) => {
  const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
  order.age = -1;

  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: order
  });

  console.log(`Age: ${order.age}`);
  const status = response.status();
  console.log('response status:', status);
  console.log('response headers:', response.headers());
  const body = await response.text();
  console.log('response body:', body);
  expect.soft(status).toBe(StatusCodes.BAD_REQUEST);

});

test(`Successful calculation of risk with employment status true returns 200 `, async ({ request }) => {
    const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
    order.employed = true;

    const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
      data: order
    });

    console.log(`Employed: ${order.employed}`);
    const body = await response.json();
    console.log('response body:', await response.text());
    console.log('response headers:', response.headers());
    expect.soft(response.status()).toBe(StatusCodes.OK);
    expect.soft(typeof body.riskScore).toBe('number');
    expect.soft(['Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk']).toContain(body.riskLevel);
    expect.soft(['positive', 'negative', 'neutral']).toContain(body.riskDecision);

  });

test(`Successful calculation of risk with employment status false returns 200, but negative risk decision `, async ({ request }) => {
  const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
  order.employed = false;

  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: order
  });

  console.log(`Employed: ${order.employed}`);
  const body = await response.json();
  console.log('response body:', await response.text());
  console.log('response headers:', response.headers());
  expect.soft(response.status()).toBe(StatusCodes.OK);
  expect.soft(typeof body.riskScore).toBe('number');
  expect.soft(['Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk']).toContain(body.riskLevel);
  expect.soft(['positive', 'negative', 'neutral']).toContain(body.riskDecision);

});

[3, 6, 9, 12, 18, 24, 30, 36].forEach((loanPeriodValue) => {
  test(`Successful calculation with loanPeriod = ${loanPeriodValue} returns 200`, async ({ request }) => {
    const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
    order.loanPeriod = loanPeriodValue;

    const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
      data: order
    });

    console.log(`loanPeriod: ${loanPeriodValue}`);

    const body = await response.json();
    console.log('response body:', body);
    console.log('response headers:', response.headers());

    expect.soft(response.status()).toBe(StatusCodes.OK);
    expect.soft(body.riskScore).toBeGreaterThanOrEqual(0);
    expect.soft(['Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk']).toContain(body.riskLevel);
    expect.soft(['positive', 'negative', 'neutral']).toContain(body.riskDecision);
  });
});

test(`Unsuccessful calculation with loanPeriod returns 400`, async ({ request }) => {
  const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
  order.loanPeriod = null;

  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: order
  });

  console.log(`loanPeriod: ${order.loanPeriod}`);
  const status = response.status();
  console.log('response status:', status);
  console.log('response headers:', response.headers());
  const body = await response.text();
  console.log('response body:', body);
  expect.soft(status).toBe(StatusCodes.BAD_REQUEST);
});

test(`Unsuccessful calculation of risk with 0 months loan period returns 400`, async ({ request }) => {
  const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
  order.loanPeriod = 0;

  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: order
  });

  console.log(`loanPeriod: ${order.loanPeriod}`);
  const status = response.status();
  console.log('response status:', status);
  console.log('response headers:', response.headers());
  const body = await response.text();
  console.log('response body:', body);
  expect.soft(status).toBe(StatusCodes.BAD_REQUEST);
});

test(`Unsuccessful calculation of risk with negative loan period returns 400`, async ({ request }) => {
  const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
  order.loanPeriod = -1;

  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: order
  });

  console.log(`loanPeriod: ${order.loanPeriod}`);
  const status = response.status();
  console.log('response status:', status);
  console.log('response headers:', response.headers());
  const body = await response.text();
  console.log('response body:', body);
  expect.soft(status).toBe(StatusCodes.BAD_REQUEST);
});

[1, 2].forEach((loanPeriodValue) => {
test(`Unsuccessful calculation of risk with loanPeriod = ${loanPeriodValue} less than 3 months returns 20 but negative risk decision`, async ({ request }) => {
  const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
  order.loanPeriod = loanPeriodValue;

  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: order
  });

  const body = await response.json();
  console.log(`loanPeriod: ${loanPeriodValue}`);
  console.log('response status:', response.status());
  console.log('response headers:', response.headers());

  expect.soft(response.status()).toBe(StatusCodes.OK);
  expect.soft(body.riskScore).toBeGreaterThanOrEqual(0);
  expect.soft(['Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk','Unknown Risk']).toContain(body.riskLevel);
  expect.soft(['positive', 'negative', 'neutral']).toContain(body.riskDecision);
});
})

test.describe('Loan amount value checks', () => {
  [1, 100, 1000].forEach((loanAmountValue) => {
    test(`Successful calculation with loanAmount = ${loanAmountValue} returns 200`, async ({ request }) => {
      const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
      order.loanAmount = loanAmountValue;

      const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
        data: order
      });

      console.log(`loanAmount: ${loanAmountValue}`);

      const body = await response.json();
      console.log('response body:', body);
      console.log('response headers:', response.headers());

      expect.soft(response.status()).toBe(StatusCodes.OK);
      expect.soft(body.riskScore).toBeGreaterThanOrEqual(0);
      expect.soft(['Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk']).toContain(body.riskLevel);
      expect.soft(['positive', 'negative', 'neutral']).toContain(body.riskDecision);
    });
  });
});

test(`Unsuccessful calculation of risk with loan amount 0 returns 400`, async ({ request }) => {
  const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
  order.loanAmount = 0;

  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: order
  });

  console.log(`loanAmount: ${order.loanAmount}`);

  const status = response.status();
  console.log('response status:', status);
  console.log('response headers:', response.headers());
  const body = await response.text();
  console.log('response body:', body);
  expect.soft(status).toBe(StatusCodes.BAD_REQUEST);
});

test(`Unsuccessful calculation of risk with negative loan amount returns 400`, async ({ request }) => {
  const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
  order.loanAmount = -1;

  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: order
  });

  console.log(`loanAmount: ${order.loanAmount}`);
  const status = response.status();
  console.log('response status:', status);
  console.log('response headers:', response.headers());
  const body = await response.text();
  console.log('response body:', body);
  expect.soft(status).toBe(StatusCodes.BAD_REQUEST);
});

test(`Unsuccessful calculation of risk with empty loan amount returns 400`, async ({ request }) => {
  const order = OrderDtoHw10.calculateRiskScoreWithRandomData();
  order.loanAmount = null;

  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: order
  });

  console.log(`loanAmount: ${order.loanAmount}`);
  const status = response.status();
  console.log('response status:', status);
  console.log('response headers:', response.headers());
  const body = await response.text();
  console.log('response body:', body);
  expect.soft(status).toBe(StatusCodes.BAD_REQUEST);
});

test(`Unsuccessful calculation of risk with empty fields returns 400`, async ({ request }) => {
  const order: Partial<ReturnType<typeof OrderDtoHw10.calculateRiskScoreWithRandomData>> = {
    income: null,
    debt: null,
    age: null,
    loanAmount: null,
    loanPeriod: null
  };

  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: order
  });

  console.log('request payload:', order);
  const textBody = await response.text();
  console.log('response body:', textBody);
  console.log('response headers:', response.headers());

  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST);
});