import { AdapterPool, AdapterSpecific } from "./types";
declare const connect: (
  pool: AdapterPool,
  specific: AdapterSpecific
) => Promise<any>;
export default connect;
