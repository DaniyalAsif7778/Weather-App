/// <reference types="vite/client" />

interface ImportMetaEnv {
 
 readonly  VITE_API_KEY :string
  // Add your custom variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
