import { cache_schedule_inst } from "#src/cache/schedule/inst"

export const cache_schedule_use_item = function(key: string): void {
    const payload_new = cache_schedule_inst.payload_map.get(key)

    if (payload_new) {
        try {
            localStorage.setItem(key, payload_new())
        } catch (error) {
            console.error(error)
        }

        cache_schedule_inst.payload_map.delete(key)
    }
}
