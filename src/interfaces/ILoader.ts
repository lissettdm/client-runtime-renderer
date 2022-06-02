import IManifest from './IManifest';
import IRenderInput from './IRenderInput';

interface ILoader {
  render(input: IRenderInput): void;
}

export default ILoader;
