import { StackContext } from "sst/constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as ssm from "aws-cdk-lib/aws-ssm";
import { Duration } from "aws-cdk-lib";

export function VectorStore({ stack }: StackContext) {
  const vectorStoreUrl =
    ssm.StringParameter.fromSecureStringParameterAttributes(
      stack,
      "VectorStoreParam",
      {
        parameterName: "maple/prod/vectorstoreurl",
      }
    );

  const openaiApiKey = ssm.StringParameter.fromSecureStringParameterAttributes(
    stack,
    "VectorStoreParam",
    {
      parameterName: "maple/prod/openaiapikey",
    }
  );

  const vectorStoreLambda = new lambda.DockerImageFunction(
    stack,
    "VectorStore",
    {
      code: lambda.DockerImageCode.fromImageAsset("./packages/vectorstore"),
      memorySize: 1024,
      timeout: Duration.seconds(10),
      architecture: lambda.Architecture.ARM_64,
    }
  );

  vectorStoreLambda.addEnvironment(
    "VECTOR_STORE_URL_PARAMETER_NAME",
    vectorStoreUrl.parameterName
  );

  vectorStoreUrl.grantRead(vectorStoreLambda);
}
