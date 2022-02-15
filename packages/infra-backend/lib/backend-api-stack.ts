import * as cdk from "aws-cdk-lib";
import * as lambda_nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as apigatewayv2_alpha from "@aws-cdk/aws-apigatewayv2-alpha";
import * as apigatewayv2_integrations_alpha from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import { Construct } from "constructs";
import * as path from "path";

export class BackendApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB
    const todoTable = new dynamodb.Table(this, "TodoTable", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      partitionKey: { name: "userId", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "id", type: dynamodb.AttributeType.STRING },
    });

    // Lambda
    const listTodosLambda = new lambda_nodejs.NodejsFunction(
      this,
      "listTodosHandler",
      {
        entry: path.join(__dirname, "../lambda/listTodos.ts"),
        handler: "handler",
        environment: {
          TODO_TABLE: todoTable.tableName,
        },
      }
    );

    todoTable.grantReadData(listTodosLambda);

    // Http Api
    const todoHttpApi = new apigatewayv2_alpha.HttpApi(this, "TodoHttpApi", {
      corsPreflight: {
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: [
          apigatewayv2_alpha.CorsHttpMethod.OPTIONS,
          apigatewayv2_alpha.CorsHttpMethod.GET,
        ],
        allowOrigins: [
          "http://localhost:3000",
          "https://d1ga29t5ymw1db.cloudfront.net",
        ],
      },
    });

    // Http Lambda Integration
    const listTodosIntegration =
      new apigatewayv2_integrations_alpha.HttpLambdaIntegration(
        "listTodosIntegration",
        listTodosLambda
      );

    // Api routes
    todoHttpApi.addRoutes({
      path: "/todos",
      methods: [apigatewayv2_alpha.HttpMethod.GET],
      integration: listTodosIntegration,
    });

    // CrnOutput
    new cdk.CfnOutput(this, "TodoHttpApi Endpoint", {
      value: todoHttpApi.apiEndpoint,
    });
  }
}
