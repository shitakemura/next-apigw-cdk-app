import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { FrontendDeploymentStack } from "../lib/frontend-deployment-stack";

test("frontend-deployment snapshot test", () => {
  const app = new cdk.App();
  const stack = new FrontendDeploymentStack(
    app,
    "FrontendDeploymentSnapshotTestStack"
  );
  const template = Template.fromStack(stack);

  expect(template.toJSON()).toMatchSnapshot();
});
