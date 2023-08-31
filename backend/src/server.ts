import 'dotenv/config';
import app from './app';

const PORT = process.env.SERVER_PORT || 3071;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at http://localhost:${PORT}`);
});
