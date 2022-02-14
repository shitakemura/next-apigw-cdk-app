import * as cdk from "aws-cdk-lib";
import * as cloudFront from "aws-cdk-lib/aws-cloudfront";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class FrontendDeploymentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const todoBucket = new s3.Bucket(this, "TodoBucket", {
      websiteIndexDocument: "index.html",
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const todoOAI = new cloudFront.OriginAccessIdentity(this, "TodoOAI");
    todoBucket.grantRead(todoOAI);

    const todoWebDestribution = new cloudFront.CloudFrontWebDistribution(
      this,
      "TodoWebDestribution",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: todoBucket,
              originAccessIdentity: todoOAI,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      }
    );

    new cdk.CfnOutput(this, "TodoWebDestributionName", {
      value: todoWebDestribution.distributionDomainName,
    });
  }
}
