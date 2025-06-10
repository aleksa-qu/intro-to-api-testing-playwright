import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

test('get order with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(200)
})

test('post order with correct data should receive code 201', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('get order with orderId 0 should receive code 400', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/0')
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('get order with orderId 11 should receive code 400', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/11')
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('get order with orderId = NULL should receive code 500', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/')
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})

test('get order with orderId = test should receive code 400', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/test')
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('post order with incorrect data should receive code 415', async ({ request }) => {
  // prepare request body

  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: 'test',
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.UNSUPPORTED_MEDIA_TYPE)
})
//HW09 tests
//PUT
test('change an order with correct id 1 should receive code 200', async ({ request }) => {
    const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }

  const requestHeaders: {api_key: string} = {'api_key': '1234567890123456'};
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    data: requestBody,
    headers: requestHeaders,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('change an order with correct id 5 should receive code 200', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }

  const requestHeaders: {api_key: string} = {'api_key': '1234567890123456'};
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/5', {
    data: requestBody,
    headers: requestHeaders,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('change an order with correct id 10 should receive code 200', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }

  const requestHeaders: {api_key: string} = {'api_key': '1234567890123456'};
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/10', {
    data: requestBody,
    headers: requestHeaders,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('change an order with incorrect id 0 should receive code 400', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }

  const requestHeaders: {api_key: string} = {'api_key': '1234567890123456'};
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/0', {
    data: requestBody,
    headers: requestHeaders,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('change an order with incorrect id 11 should receive code 400', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }

  const requestHeaders: {api_key: string} = {'api_key': '1234567890123456'};
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/11', {
    data: requestBody,
    headers: requestHeaders,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('change an order with missing id should receive code 405', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }

  const requestHeaders: {api_key: string} = {'api_key': '1234567890123456'};
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/', {
    data: requestBody,
    headers: requestHeaders,
  })

  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('change an order with incorrect id as string should receive code 400', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }

  const requestHeaders: { api_key: string } = { 'api_key': '1234567890123456' };
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/test', {
    data: requestBody,
    headers: requestHeaders,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
//DELETE
test('delete order with correct id 1 should receive code 204', async ({ request }) => {
  const requestHeaders: { api_key: string } = { 'api_key': '1234567890123456' };
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
  })
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('delete order with correct id 5 should receive code 204', async ({ request }) => {
  const requestHeaders: { api_key: string } = { 'api_key': '1234567890123456' };
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/5', {
    headers: requestHeaders,
  })
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})
test('delete order with correct id 10 should receive code 204', async ({ request }) => {
  const requestHeaders: { api_key: string } = { 'api_key': '1234567890123456' };
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/10', {
    headers: requestHeaders,
  })
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})
test('delete order with incorrect id 0 should receive code 400', async ({ request }) => {
  const requestHeaders: { api_key: string } = { 'api_key': '1234567890123456' };
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/0', {
    headers: requestHeaders,
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('delete order with incorrect id 11 should receive code 400', async ({ request }) => {
  const requestHeaders: { api_key: string } = { 'api_key': '1234567890123456' };
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/11', {
    headers: requestHeaders,
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('delete order with missing id should receive code 405', async ({ request }) => {
  const requestHeaders: { api_key: string } = { 'api_key': '1234567890123456' };
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/', {
    headers: requestHeaders,
  })
  expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})
test('delete order with incorrect id as string should receive code 400', async ({ request }) => {
  const requestHeaders: { api_key: string } = { 'api_key': '1234567890123456' };
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/test', {
    headers: requestHeaders,
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
//GET
test('get authentication of a user with username and password as string should receive code 200', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders?username=test&password=test')
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('get authentication of a user with missing username and password should receive code 500', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders')
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})
