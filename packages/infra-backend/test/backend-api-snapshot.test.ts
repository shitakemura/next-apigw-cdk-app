import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { BackendApiStack } from "../lib/backend-api-stack";

test("backend-api snapshot test", () => {
  const app = new cdk.App();
  const stack = new BackendApiStack(app, "BackendApiSnapshotTestStack");
  const template = Template.fromStack(stack);

  expect(template.toJSON()).toMatchSnapshot();
});
