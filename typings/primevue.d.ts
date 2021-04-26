import Vue from 'vue'
declare module 'vue' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  export type PluginFunction<T> = (app: Vue.App, ...options: any[]) => any
}
