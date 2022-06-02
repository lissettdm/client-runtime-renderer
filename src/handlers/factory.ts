import ComponentHandler from '.';
import IHandlerConstructor from '../interfaces/IHanderConstructor';
import IHandler from '../interfaces/IHandler';
import IHandlerOptions from '../interfaces/IHandlerOptions';
import { HandlerType } from '../types';

export function createHandler(
  creator: IHandlerConstructor,
  url: string,
  props: Object,
  container: HTMLElement,
  options: IHandlerOptions
): IHandler {
  return new creator(url, props, container, options);
}

export class HandlerFactory {
  public static create(
    type: HandlerType,
    url: string,
    props: string,
    container: HTMLElement,
    options: IHandlerOptions
  ): IHandler {
    return createHandler(ComponentHandler, url, props, container, options);
  }
}
export default HandlerFactory;
