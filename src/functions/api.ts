import { APIGatewayEvent, APIGatewayEventRequestContext } from "aws-lambda";
const serverless = require("serverless-http");
const { app } = require("../app");

const api = serverless(app);

export const handler = async (
  event: APIGatewayEvent,
  context: APIGatewayEventRequestContext
) => {
  return await api(event, context);
};
