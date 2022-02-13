import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { InfraBackendStack } from "../lib/infra-backend-stack";

test("snapshot test", () => {
  const app = new cdk.App();
  const stack = new InfraBackendStack(app, "InfraBackendTestStack");
  const template = Template.fromStack(stack);

  expect(template.toJSON()).toMatchSnapshot();
});
