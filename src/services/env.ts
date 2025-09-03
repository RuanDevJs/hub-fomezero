const ENV = {
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_PORT: process.env.MONGO_PORT,
  MONGO_HOST: process.env.MONGO_HOST,
  MONGO_DATABASE: process.env.MONGO_DATABASE,
  DATABSE_URI: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
}

export default ENV;
