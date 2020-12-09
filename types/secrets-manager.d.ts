import { SecretsManager } from "resolve-core";
import { AdapterPool } from "./types";
declare const getSecretsManager: (pool: AdapterPool) => SecretsManager;
export default getSecretsManager;
