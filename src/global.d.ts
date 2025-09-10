export {};

declare global {
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  interface HTMLWebViewElement extends HTMLElement {}
  /* eslint-enable @typescript-eslint/no-empty-object-type */

  // Fix for environments where TrustedHTML is not defined
  type TrustedHTML = string;
  type TrustedScript = string;

  namespace React {
    // Fake type to satisfy lucid-react until they update
    type ReactSVG = unknown;
  }
}
