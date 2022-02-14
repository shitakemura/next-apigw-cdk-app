import * as cdk from "aws-cdk-lib";
import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as dynamoDb from "aws-cdk-lib/aws-dynamodb";
import * as apiGw from "@aws-cdk/aws-apigatewayv2-alpha";
import * as apiGwIntegrations from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import { Construct } from "constructs";
import * as path from "path";

export class BackendApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB
    const todoTable = new dynamoDb.Table(this, "TodoTable", {
      billingMode: dynamoDb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      partitionKey: { name: "userId", type: dynamoDb.AttributeType.STRING },
      sortKey: { name: "id", type: dynamoDb.AttributeType.STRING },
    });

    // Lambda
    const listTodosLambda = new lambdaNodejs.NodejsFunction(
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
    const todoHttpApi = new apiGw.HttpApi(this, "TodoHttpApi", {
      corsPreflight: {
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: [apiGw.CorsHttpMethod.OPTIONS, apiGw.CorsHttpMethod.GET],
      },
    });

    // Http Lambda Integration
    const listTodosIntegration = new apiGwIntegrations.HttpLambdaIntegration(
      "listTodosIntegration",
      listTodosLambda
    );

    // Api routes
    todoHttpApi.addRoutes({
      path: "/todos",
      methods: [apiGw.HttpMethod.GET],
      integration: listTodosIntegration,
    });

    // CrnOutput
    new cdk.CfnOutput(this, "TodoHttpApi Endpoint", {
      value: todoHttpApi.apiEndpoint,
    });
  }
}
