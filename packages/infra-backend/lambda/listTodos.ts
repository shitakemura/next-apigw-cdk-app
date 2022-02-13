import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { Todo } from "../../shared/models";

const docClient = new DynamoDB.DocumentClient();

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    const data = await docClient
      .query({
        TableName: process.env.TODO_TABLE ?? "",
        KeyConditionExpression: "userId = :u",
        ExpressionAttributeValues: {
          ":u": "user001",
        },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items as Todo[]),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ err }),
    };
  }
};
