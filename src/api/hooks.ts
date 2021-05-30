import { ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useAsyncApi<T>(
  fn: (...args: unknown[]) => Promise<T>,
  initialData: T
) {
  const data = ref<T>(initialData)
  const error = ref<Error | null>()
  const pending = ref<boolean>(false)
  const ready = ref<boolean>(false)

  const execute = async (...args: unknown[]) => {
    pending.value = true
    error.value = null
    ready.value = false
    try {
      const currentData = await fn(...args)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data.value = currentData
      ready.value = true
    } catch (currentError) {
      error.value = currentError
      throw currentError
    } finally {
      pending.value = false
    }
  }

  execute()

  return {
    data,
    error,
    ready,
    pending,
    execute
  }
}
