import fs from 'fs';
import path from 'path';

export function logSignal(signal) {
  const file = path.join('logs', `${signal.pair}.log`);
  const entry = `[${new Date().toISOString()}] ${JSON.stringify(signal)}\n`;
  fs.appendFileSync(file, entry);
}
