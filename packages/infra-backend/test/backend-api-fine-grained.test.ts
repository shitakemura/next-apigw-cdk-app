import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { BackendApiStack } from "../lib/backend-api-stack";

test("backend-api fine grained assertions test", () => {
  const app = new cdk.App();
  const stack = new BackendApiStack(app, "BackendApiFineGraindTestStack");
  const template = Template.fromStack(stack);

  // Http API Gateway
  template.resourceCountIs("AWS::ApiGatewayV2::Api", 1);

  // Lambda
  template.resourceCountIs("AWS::Lambda::Function", 1);
});