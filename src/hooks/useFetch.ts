import fetchJSON from "../utils/fetchJSON";
import { PromiseState } from "../utils/PromiseState"
import {useEffect, useState} from "react";

export default function useFetch<T>(url: string): PromiseState<T> {
  const [state, setState] = useState<PromiseState<T>>({ type: "pending" })

  useEffect(() => {
    let isStale = false

    async function getInfo() {
      try {
        const data = await fetchJSON<T>(url)
        if (isStale) return
        setState({ type: "success", value: data })
      } catch (e) {
        if (isStale) return
        setState({ type: "failure", value: e } as PromiseState<T>)
      }
    }

    getInfo()

    return () => {
      isStale = true
    }
  }, [url])

  return state
}

