import * as cdk from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3_deployment from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import * as path from "path";

type FrontendDeploymentStackProps = {
  envName: string;
  projectName: string;
} & cdk.StackProps;

export class FrontendDeploymentStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props: FrontendDeploymentStackProps
  ) {
    super(scope, id, props);

    const todoBucket = new s3.Bucket(this, `todo-bucket`, {
      websiteIndexDocument: "index.html",
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const todoOAI = new cloudfront.OriginAccessIdentity(this, `todo-oai`);
    todoBucket.grantRead(todoOAI);

    const todoWebDestribution = new cloudfront.CloudFrontWebDistribution(
      this,
      `todo-web-destribution`,
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

    new s3_deployment.BucketDeployment(this, `todo-bucket-deployment`, {
      sources: [
        s3_deployment.Source.asset(
          path.resolve(__dirname, "../../frontend/out")
        ),
      ],
      destinationBucket: todoBucket,
      distribution: todoWebDestribution,
      distributionPaths: ["/*"],
    });

    new cdk.CfnOutput(this, `todo-web-destribution name`, {
      value: todoWebDestribution.distributionDomainName,
    });
  }
}
