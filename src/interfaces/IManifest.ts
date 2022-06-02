import { LoaderType } from "../types";

interface IManifest {
  jsFile: string;
  cssFile: string;
  loader?: LoaderType;
  format?: string;
}

export default IManifest;
