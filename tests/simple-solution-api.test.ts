//extra
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { expect, test } from '@playwright/test';
//PUT
test('change an order with correct id 1 should receive code 200', async () => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  };

  const requestHeaders = {
    api_key: '1234567890123456',
  };

  const response = await axios.put(
    'https://backend.tallinn-learning.ee/test-orders/1',
    requestBody,
    { headers: requestHeaders },
  );

  console.log('response status:', response.status);
  console.log('response body:', response.data);

  expect(response.status).toBe(StatusCodes.OK);
});
//DELETE
test('delete order with correct id 1 should receive code 204', async () => {
  const requestHeaders: { api_key: string } = { api_key: '1234567890123456' };
  const response = await axios.delete('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
  });
  expect(response.status).toBe(StatusCodes.NO_CONTENT);
});
//GET
test('get authentication of a user with username and password as string should receive code 200', async () => {
  const response = await axios.get(
    'https://backend.tallinn-learning.ee/test-orders?username=test&password=test',
  );
  console.log('response body:', await response.data);
  console.log('response headers:', response.headers);
  expect(response.status).toBe(StatusCodes.OK);
});
