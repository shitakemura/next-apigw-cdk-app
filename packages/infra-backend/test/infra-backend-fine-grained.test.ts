import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { InfraBackendStack } from "../lib/infra-backend-stack";

test("infra-backend fine grained assertions test", () => {
  const app = new cdk.App();
  const stack = new InfraBackendStack(app, "InfraBackendFineGraindTestStack");
  const template = Template.fromStack(stack);

  // Http API Gateway
  template.resourceCountIs("AWS::ApiGatewayV2::Api", 1);

  // Lambda
  template.resourceCountIs("AWS::Lambda::Function", 1);
});
