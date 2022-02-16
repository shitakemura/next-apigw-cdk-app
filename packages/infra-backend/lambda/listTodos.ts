import { DynamoDB } from "aws-sdk";
import {
  APIGatewayProxyEventV2WithJWTAuthorizer,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import { Todo } from "../../shared/models";

const docClient = new DynamoDB.DocumentClient();

export const handler = async (
  event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<APIGatewayProxyResultV2> => {
  try {
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;
    const data = await docClient
      .query({
        TableName: process.env.TODO_TABLE ?? "",
        KeyConditionExpression: "userId = :u",
        ExpressionAttributeValues: {
          ":u": userId,
        },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items as Todo[]),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
