export {};

// Fix for environments where TrustedHTML is not defined
declare type TrustedHTML = string;
declare type TrustedScript = string;

declare global {
  type HTMLWebViewElement = HTMLElement;
  type TrustedHTML = string;
  type TrustedScript = string;

  namespace React {
    // Fake type to satisfy lucid-react until they update
    type ReactSVG = unknown;
  }
}
