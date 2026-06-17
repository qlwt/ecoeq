import { cache_schedule_inst } from "#src/cache/schedule/inst"

export const cache_schedule_use_full = function(): void {
    for (const [key, payload_new] of cache_schedule_inst.payload_map) {
        try {
            localStorage.setItem(key, payload_new())
        } catch (error) {
            console.error(error)
        }
    }

    cache_schedule_inst.payload_map.clear()

    cache_schedule_inst.update_id = null
}
