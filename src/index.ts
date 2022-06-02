import {
  ATTR_PROPS,
  ATTR_URL,
  COMPONENT_TAG,
  ERROR_TAG,
  LOADING_TAG,
} from './constants';
import {HandlerFactory} from './handlers/factory';
import {clearHTMLContent} from './utils';

class WebComponent extends HTMLElement {
  stageLoading?: HTMLElement | null;
  stageError?: HTMLElement | null;
  constructor() {
    super();
    this.stageLoading = this.querySelector(LOADING_TAG);
    this.stageError = this.querySelector(ERROR_TAG);
    clearHTMLContent(this);
  }

  getURL() {
    return this.getAttribute(ATTR_URL) || '';
  }

  getProps() {
    try {
      return JSON.parse(this.getAttribute(ATTR_PROPS) || '{}');
    } catch (error) {
      return {};
    }
  }

  render() {
    HandlerFactory.create('default', this.getURL(), this.getProps(), this, {
      loadingContent: this.stageLoading,
      errorContent: this.stageError,
    });
  }

  static get observedAttributes() {
    return [ATTR_PROPS, ATTR_URL];
  }

  onConnectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

window.customElements.define(COMPONENT_TAG, WebComponent);

export default WebComponent;
