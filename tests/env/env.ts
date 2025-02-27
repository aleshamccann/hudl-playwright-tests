import * as dotenv from "dotenv";

export const getEnv = () => {
  dotenv.config({
    override: true,
    path: `tests/env/credentials.env`,
  });
};
