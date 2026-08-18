/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ENABLE_ANALYTICS: string;
 readonly  VITE_API_KEY :string
  // Add your custom variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
