#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { BackendApiStack } from "../lib/backend-api-stack";
import { FrontendDeploymentStack } from "../lib/frontend-deployment-stack";

const app = new cdk.App();
new BackendApiStack(app, "BackendApiStack", {
  env: { region: "ap-northeast-1" },
});
new FrontendDeploymentStack(app, "FrontendDeploymentStack", {
  env: { region: "ap-northeast-1" },
});
