import { APIGatewayProxyEventV2WithJWTAuthorizer } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../../shared/models";

const docClient = new DynamoDB.DocumentClient();

export const handler = async (
  event: APIGatewayProxyEventV2WithJWTAuthorizer
) => {
  const userId = event.requestContext.authorizer.jwt.claims.sub as string;
  const id = uuidv4();
  const body = event.body ? JSON.parse(event.body) : { title: "" };

  try {
    if (!process.env.TODO_TABLE) {
      throw new Error("TODO_TABLE is not specified");
    }

    const putItem: Todo = {
      userId,
      id,
      ...body,
      completed: false,
      createdAt: Date.now(),
    };

    await docClient
      .put({
        TableName: process.env.TODO_TABLE ?? "",
        Item: putItem,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(putItem),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
