declare namespace NodeJS {
  interface ProcessEnv {
    Agnes_api_key: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
