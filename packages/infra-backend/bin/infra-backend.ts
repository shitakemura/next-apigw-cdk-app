#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { InfraBackendStack } from "../lib/infra-backend-stack";

const app = new cdk.App();
new InfraBackendStack(app, "InfraBackendStack", {
  env: { region: "ap-northeast-1" },
});
