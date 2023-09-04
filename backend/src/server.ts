import 'dotenv/config';
// import app from './app';
import App from './app';

const PORT = process.env.SERVER_PORT || 3071;

new App().start(PORT);
