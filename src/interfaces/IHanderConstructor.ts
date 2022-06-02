import IHandler from './IHandler';
import IHandlerOptions from './IHandlerOptions';

interface IHandlerConstructor {
  new (
    url: string,
    props: Object,
    container: HTMLElement,
    options?: IHandlerOptions
  ): IHandler;
}
export default IHandlerConstructor;
