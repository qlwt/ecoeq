import { cache_schedule_clear } from "#src/cache/schedule/clear"

export const cache_node_clear = function (key: string) {
    localStorage.removeItem(key)

    cache_schedule_clear(key)
}
