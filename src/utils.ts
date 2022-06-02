export function clearHTMLContent(node: any) {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
}

export function concatRoute(url: string, path: string) {
  return `${url}/${path}`;
}

export function replaceContent(
  parent: Node | HTMLElement | ShadowRoot,
  node?: Node | HTMLElement | null
) {
  clearHTMLContent(parent);
  if (node) parent.appendChild(node);
}
