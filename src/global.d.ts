//Fix for environments where TrustedHTML is not defined

declare type TrustedHTML = string;
declare type TrustedScript = string;

//FIx for environments where HTMLWebViewElement is not defined
interface HTMLWebViewElement extends HTMLElement {}

// Temp fix for lucide-react with React 19
declare namespace React {
  interface ReactSVG {}
}
