import IManifest from "./IManifest";

interface IRenderInput {
  url: string;
  props: Object;
  root: ShadowRoot;
  manifest: IManifest;
  notify: Function;
}

export default IRenderInput;
