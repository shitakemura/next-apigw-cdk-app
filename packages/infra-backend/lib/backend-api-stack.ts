import * as cdk from "aws-cdk-lib";
import * as lambda_nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as apigatewayv2_alpha from "@aws-cdk/aws-apigatewayv2-alpha";
import * as apigatewayv2_authorizers_alpha from "@aws-cdk/aws-apigatewayv2-authorizers-alpha";
import * as apigatewayv2_integrations_alpha from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import { Construct } from "constructs";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config();

type BackendApiStackProps = {
  envName: string;
  projectName: string;
} & cdk.StackProps;
export class BackendApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BackendApiStackProps) {
    super(scope, id, props);

    // DynamoDB
    const todoTable = new dynamodb.Table(this, `todo-table`, {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      partitionKey: { name: "userId", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "id", type: dynamodb.AttributeType.STRING },
    });

    // Lambda
    const commonLambdaProps: Omit<lambda_nodejs.NodejsFunctionProps, "entry"> =
      {
        handler: "handler",
        environment: {
          TODO_TABLE: todoTable.tableName,
        },
      };

    const listTodosLambda = new lambda_nodejs.NodejsFunction(
      this,
      `list-todos-lambda`,
      {
        entry: path.join(__dirname, "../lambda/listTodos.ts"),
        ...commonLambdaProps,
      }
    );

    const createTodoLambda = new lambda_nodejs.NodejsFunction(
      this,
      `create-todo-lambda`,
      {
        entry: path.join(__dirname, "../lambda/createTodo.ts"),
        ...commonLambdaProps,
      }
    );

    const updateTodoLambda = new lambda_nodejs.NodejsFunction(
      this,
      `update-todo-lambda`,
      {
        entry: path.join(__dirname, "../lambda/updateTodo.ts"),
        ...commonLambdaProps,
      }
    );

    const deleteTodoLambda = new lambda_nodejs.NodejsFunction(
      this,
      `delete-todo-lambda`,
      {
        entry: path.join(__dirname, "../lambda/deleteTodo.ts"),
        ...commonLambdaProps,
      }
    );

    todoTable.grantReadData(listTodosLambda);
    todoTable.grantReadWriteData(createTodoLambda);
    todoTable.grantReadWriteData(updateTodoLambda);
    todoTable.grantReadWriteData(deleteTodoLambda);

    // Http Api Gateway
    const todoHttpApi = new apigatewayv2_alpha.HttpApi(this, `todo-http-api`, {
      corsPreflight: {
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: [
          apigatewayv2_alpha.CorsHttpMethod.OPTIONS,
          apigatewayv2_alpha.CorsHttpMethod.GET,
          apigatewayv2_alpha.CorsHttpMethod.POST,
          apigatewayv2_alpha.CorsHttpMethod.PUT,
          apigatewayv2_alpha.CorsHttpMethod.DELETE,
        ],
        allowOrigins: [
          "http://localhost:3000",
          "https://dnnkr3krcvgjq.cloudfront.net",
        ],
      },
    });

    // Jwt Authorizer
    const issuer = `${process.env.AUTH0_DOMAIN}/`;
    const authorizer = new apigatewayv2_authorizers_alpha.HttpJwtAuthorizer(
      `todo-jwt-authorizer`,
      issuer,
      {
        jwtAudience: [process.env.AUTH0_API_AUDIENCE ?? ""],
      }
    );

    // Http Lambda Integration
    const listTodosIntegration =
      new apigatewayv2_integrations_alpha.HttpLambdaIntegration(
        `list-todos-integration`,
        listTodosLambda
      );

    const createTodoIntegration =
      new apigatewayv2_integrations_alpha.HttpLambdaIntegration(
        `create-todo-integration`,
        createTodoLambda
      );

    const updateTodoIntegration =
      new apigatewayv2_integrations_alpha.HttpLambdaIntegration(
        `update-todo-integration`,
        updateTodoLambda
      );

    const deleteTodoIntegration =
      new apigatewayv2_integrations_alpha.HttpLambdaIntegration(
        `delete-todo-integration`,
        deleteTodoLambda
      );

    // Api routes
    todoHttpApi.addRoutes({
      path: "/todos",
      methods: [apigatewayv2_alpha.HttpMethod.GET],
      authorizer,
      integration: listTodosIntegration,
    });

    todoHttpApi.addRoutes({
      path: "/todos",
      methods: [apigatewayv2_alpha.HttpMethod.POST],
      authorizer,
      integration: createTodoIntegration,
    });

    todoHttpApi.addRoutes({
      path: "/todos/{id}",
      methods: [apigatewayv2_alpha.HttpMethod.PUT],
      authorizer,
      integration: updateTodoIntegration,
    });

    todoHttpApi.addRoutes({
      path: "/todos/{id}",
      methods: [apigatewayv2_alpha.HttpMethod.DELETE],
      authorizer,
      integration: deleteTodoIntegration,
    });

    // CrnOutput
    new cdk.CfnOutput(this, `todo-http-api endpoint`, {
      value: todoHttpApi.apiEndpoint,
    });
  }
}
