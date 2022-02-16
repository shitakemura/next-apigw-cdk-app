import { APIGatewayProxyEventV2WithJWTAuthorizer } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const docClient = new DynamoDB.DocumentClient();

export const handler = async (
  event: APIGatewayProxyEventV2WithJWTAuthorizer
) => {
  const userId = event.requestContext.authorizer.jwt.claims.sub as string;
  const id = event.pathParameters?.id;

  try {
    if (!process.env.TODO_TABLE) throw new Error("TODO_TABLE is not specified");
    if (!id) throw new Error("id is not specified");

    await docClient
      .delete({
        TableName: process.env.TODO_TABLE,
        Key: {
          userId,
          id,
        },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ userId, id }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
