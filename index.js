import express from 'express';
import bodyParser from 'body-parser';
import { executeTrade } from './binance.js';
import { logSignal } from './logger.js';

const app = express();
app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const signal = req.body;
  logSignal(signal);
  try {
    const result = await executeTrade(signal);
    res.status(200).send({ status: 'executed', result });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 SignalRelay activo en puerto ${PORT}`));
