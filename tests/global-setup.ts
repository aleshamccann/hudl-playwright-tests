import * as dotenv from "dotenv";

const getEnv = () => {
  dotenv.config({
    override: true,
    path: `tests/env/credentials.env`,
  });
};

async function globalSetup() {
  getEnv();
}

export default globalSetup;