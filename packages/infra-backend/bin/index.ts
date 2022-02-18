#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { BackendApiStack } from "../lib/backend-api-stack";
import { FrontendDeploymentStack } from "../lib/frontend-deployment-stack";

const app = new cdk.App();

const projectName = app.node.tryGetContext("projectName");
const envKey = app.node.tryGetContext("environment");
const envValues = app.node.tryGetContext(envKey);

const prefix = `${envValues.envName}-${projectName}`;

new BackendApiStack(app, `${prefix}-backend-api-stack`, {
  env: envValues.env,
  envName: envValues.envName,
  projectName: projectName,
});

new FrontendDeploymentStack(app, `${prefix}-frontend-deployment-stack`, {
  env: envValues.env,
  envName: envValues.envName,
  projectName: projectName,
});
