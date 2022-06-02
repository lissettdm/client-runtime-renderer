import IHandlerOptions from "./IHandlerOptions";

interface IHandler {
  url: string;
  props: Object;
  container: HTMLElement;
  options?: IHandlerOptions;
}

export default IHandler;
