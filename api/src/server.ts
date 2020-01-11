import app from './app';
import validateEnv from './utils/validateEnv';

const port = process.env.PORT || 3000;

validateEnv();

app.listen(port, () => {
  console.log(`🚀 App listening on the port ${port}`);
});

