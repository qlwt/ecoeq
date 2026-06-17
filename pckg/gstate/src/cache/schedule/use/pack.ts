import { cache_schedule_inst } from "#src/cache/schedule/inst"

export const cache_schedule_use_pack = function(length: number): void {
    let i = 0

    if (i >= length) {
        return
    }

    for (const [key, payload_new] of cache_schedule_inst.payload_map) {
        try {
            localStorage.setItem(key, payload_new())
        } catch (error) {
            console.error(error)
        }

        cache_schedule_inst.payload_map.delete(key)

        if (++i >= length) {
            break
        }
    }

    cache_schedule_inst.update_id = null
}
