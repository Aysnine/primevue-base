declare module '*.vue' {
  import Vue, { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  const component: DefineComponent<{}, {}, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  export type PluginFunction<T> = (app: Vue.App, ...options: any[]) => any
  export default component
}
