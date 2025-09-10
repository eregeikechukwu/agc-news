export {};

declare global {
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  interface HTMLWebViewElement extends HTMLElement {}
  /* eslint-enable @typescript-eslint/no-empty-object-type */

  // Fix for environments where TrustedHTML is not defined

  /* eslint-disable @typescript-eslint/no-empty-object-type */
  interface TrustedHTML {}
  interface TrustedScriptURL {}
  interface TrustedTypePolicyOptions {}
  /* eslint-enable @typescript-eslint/no-empty-object-type */

  namespace React {
    // Fake type to satisfy lucid-react until they update
    type ReactSVG = unknown;
  }
}
