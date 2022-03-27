export interface ContextProp<T> {
  value: T | undefined
  setValue: (value: T) => void
}
