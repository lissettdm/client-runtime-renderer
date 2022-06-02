import { MISSING_JS, TAG } from '../constants';
import ILoader from '../interfaces/ILoader';
import IRenderInput from '../interfaces/IRenderInput';
import { concatRoute, replaceContent } from '../utils';

class Loader implements ILoader {
  async render(input: IRenderInput) {
    const {manifest, root, url, props, notify }  = input;
    let renderPath = manifest.jsFile;
    if(!renderPath) throw Error(MISSING_JS);
    let stylesPath = manifest.cssFile;
    const module = await import(concatRoute(url, renderPath));
    const content = document.createElement(TAG);
    replaceContent(root, content);
    root.insertBefore(
      this.getStyleLink(concatRoute(url,stylesPath)),
      content
    );
    module.default({
      content,
      root: root,
      props: props,
      notify: notify,
    });
  }

  private getStyleLink(href: string) {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', href);
    return link;
  }
}


export default Loader