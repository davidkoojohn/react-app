import fetchJSON from "./fetchJSON";
import { SuspendedValue } from "./SuspendedValue";

const cache: {
  [key: string]: SuspendedValue<any>
} = {}

export function useResource<T>(url: string): T {
  if (!(url in cache)) {
    cache[url] = new SuspendedValue<T>(fetchJSON(url))
  }
  return cache[url].getValueOrThrow()
}
