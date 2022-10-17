type Config = {
    port: number;
    isProduction: boolean;
    databaseFolder: string;
    databaseName: string;
};

type EnvironmentValue = string | undefined;
type Environment = { [key: string]: EnvironmentValue };

export const config = (env: Environment): Config => {
    const isProduction = env.NODE_ENV === 'production';

    const config: Config = {
        port: env.PORT ? parseInt(env.PORT) : 3001,
        databaseFolder: '~/.is212-g5t7',
        isProduction,
        databaseName: 'learning_journey_db',
    };

    return config;
};

export default config(process.env);
