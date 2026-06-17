import * as r from "react"

export const useGhostValue = function <T>(value: T, filter: (value: T) => boolean): T {
    const last = r.useRef<T>(value)

    return r.useMemo(() => {
        if (filter(value)) {
            last.current = value

            return value
        }

        return last.current
    }, [value, filter])
}
