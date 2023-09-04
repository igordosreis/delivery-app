import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import router from './routes';
import httpErrorMiddleware from './middlewares/httpError.middleware';

// const app = express();
// app.use('/images', express.static(`${__dirname}/images`));
// app.use(cors());
// app.use(express.json());

// export default app;

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/images', express.static(`${__dirname}/images`));
    this.app.use(router);
    this.app.use(httpErrorMiddleware);
  }

  public start(PORT: string | number): void {
    this.app.listen(
      PORT,
      () =>
        // eslint-disable-next-line no-console
        console.log(`Server is running at http://localhost:${PORT}`),
      // eslint-disable-next-line function-paren-newline
    );
  }
}

export default App;
