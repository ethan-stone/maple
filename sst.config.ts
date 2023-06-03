import { SSTConfig } from "sst";
import { VectorStore } from "./stacks/VectorStore";

export default {
  config(_input) {
    return {
      name: "maple",
      region: "us-east-1",
      profile: "admin-personal",
    };
  },
  stacks(app) {
    app.stack(VectorStore);
  },
} satisfies SSTConfig;
