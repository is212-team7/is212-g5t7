type Config = {
  port: number;
  isProduction: boolean;
  databaseFolder: string;
};

type EnvironmentValue = string | undefined;
type Environment = { [key: string]: EnvironmentValue };

export const config = (env: Environment): Config => {
  const isProduction = env.NODE_ENV === 'production';

  const config: Config = {
    port: env.PORT ? parseInt(env.PORT) : 3000,
    databaseFolder: '~/.is212-g5t7',
    isProduction,
  };

  return config;
};

export default config(process.env);
