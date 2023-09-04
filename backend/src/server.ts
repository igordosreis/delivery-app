import 'dotenv/config';
// import app from './app';
import App from './app';

const PORT = Number(process.env.SERVER_PORT) || 3071;

new App().start(PORT);
