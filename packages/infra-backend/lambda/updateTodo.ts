import { APIGatewayProxyEventV2WithJWTAuthorizer } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const docClient = new DynamoDB.DocumentClient();

export const handler = async (
  event: APIGatewayProxyEventV2WithJWTAuthorizer
) => {
  const userId = event.requestContext.authorizer.jwt.claims.sub as string;
  const id = event.pathParameters?.id;
  const body = event.body ? JSON.parse(event.body) : undefined;

  try {
    if (!process.env.TODO_TABLE) throw new Error("TODO_TABLE is not specified");
    if (!id) return new Error("id is not specified");
    if (!body) throw new Error("request body is undefined");

    const data = await docClient
      .update({
        TableName: process.env.TODO_TABLE,
        Key: {
          userId: userId,
          id,
        },
        UpdateExpression: "SET completed = :completed",
        ExpressionAttributeValues: {
          ":completed": body.completed,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
