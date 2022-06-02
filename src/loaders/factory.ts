import ILoader from '../interfaces/ILoader';
import ILoaderConstructor from '../interfaces/ILoaderConstructor';
import {LoaderType} from '../types';
import Loader from './loader';

const REGISTER = {
  default: Loader,
};

export function createLoader(creator: ILoaderConstructor): ILoader {
  return new creator();
}

export class LoaderFactory {
  public static create(type: LoaderType = "default"): ILoader {
    const {[type]: Loader} = REGISTER;
    return createLoader(Loader);
  }
}

export default LoaderFactory;
