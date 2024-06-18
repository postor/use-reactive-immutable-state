import { useCallback, useRef, useState } from "react"
import { NestedData } from "./def"
import { XProxy } from "./XProxy"

/**
 * seemless immuteable state
 * @param defaultValue 
 * @returns 
 */
export function useReactiveImmutableState<T = NestedData>(defaultValue: T) {
  const ref = useRef(new XProxy(defaultValue))
  const [state, _setState] = useState(ref.current.proxy)
  ref.current.onUpdate = data => _setState(data)
  const setState = useCallback((value: T) => {
    ref.current = new XProxy(value, undefined, (data) => _setState(data))
    _setState(ref.current.proxy)
  }, [])
  return [state, setState] as [T, (v: T) => void]
}
