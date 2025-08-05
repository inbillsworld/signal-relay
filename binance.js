import axios from 'axios';
import crypto from 'crypto';

const API_KEY = process.env.BINANCE_API_KEY;
const SECRET_KEY = process.env.BINANCE_SECRET_KEY;

function sign(query) {
  return crypto.createHmac('sha256', SECRET_KEY).update(query).digest('hex');
}

function toQuery(params) {
  return Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&');
}

export async function executeTrade({ pair, side, size }) {
  const params = {
    symbol: pair.replace('.P', ''),
    side: side === 'LONG' ? 'BUY' : 'SELL',
    type: 'MARKET',
    quantity: size,
    timestamp: Date.now(),
  };

  const query = toQuery(params);
  const signature = sign(query);

  const url = `https://fapi.binance.com/fapi/v1/order?${query}&signature=${signature}`;
  const headers = { 'X-MBX-APIKEY': API_KEY };

  const response = await axios.post(url, null, { headers });
  return response.data;
}
