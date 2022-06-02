import {MANIFEST, NOTIFY_EVENT} from '../constants';
import IHandler from '../interfaces/IHandler';
import IHandlerOptions from '../interfaces/IHandlerOptions';
import IManifest from '../interfaces/IManifest';
import LoaderFactory from '../loaders/factory';
import {concatRoute, replaceContent} from '../utils';

class ComponentHandler implements IHandler {
  url: string;
  props: Object;
  container: HTMLElement;
  root: ShadowRoot;
  loadingContent?: HTMLElement | null;
  errorContent?: HTMLElement | null;

  constructor(
    url: string,
    props: Object,
    container: HTMLElement,
    options: IHandlerOptions | undefined
  ) {
    this.url = url;
    this.props = props;
    this.container = container;
    this.root = this.container.attachShadow({mode: 'open'});
    this.loadingContent = options?.loadingContent;
    this.errorContent = options?.errorContent;
    this.render();
  }

  private notify(payload: any) {
    this.container.dispatchEvent(
      new CustomEvent(NOTIFY_EVENT, {detail: payload})
    );
  }

  private getManifest(): Promise<IManifest> {
    let manifestPath = concatRoute(this.url, MANIFEST);
    return fetch(manifestPath).then(response => response.json());
  }

  private render(): void {
    replaceContent(this.root, this.loadingContent);
    this.getManifest()
      .then(async (manifest: IManifest) => {
        const loader = LoaderFactory.create(manifest.loader);
        const input = {
          manifest,
          root: this.root,
          url: this.url,
          props: this.props,
          notify: this.notify,
        };
        loader.render(input);
      })
      .catch(_ => {
        replaceContent(this.root, this.errorContent);
      });
  }
}

export default ComponentHandler;
