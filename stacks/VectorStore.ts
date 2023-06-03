import { StackContext, Api } from "sst/constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Duration } from "aws-cdk-lib";

export function VectorStore({ stack }: StackContext) {
  new lambda.DockerImageFunction(stack, "VectorStore", {
    code: lambda.DockerImageCode.fromImageAsset("./packages/vectorstore"),
    memorySize: 1024,
    timeout: Duration.seconds(10),
  });
}
