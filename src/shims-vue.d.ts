declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  const component: DefineComponent<{}, {}, unknown>;
  export default component;
}

declare module 'babel-preset-minify' {
  const preset: (api: unknown, options?: Record<string, unknown>) => { plugins: unknown[] };
  export default preset;
}
