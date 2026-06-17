import { cache_schedule_inst } from "#src/cache/schedule/inst"
import { cache_schedule_use_pack } from "#src/cache/schedule/use/pack"

const cleanup_tick = function() {
    cache_schedule_use_pack(10)

    if (cache_schedule_inst.payload_map.size >= 1) {
        cache_schedule_inst.update_id = setTimeout(cleanup_tick, 50)
    }
}

export const cache_schedule_set = function(key: string, payload_new: () => string): void {
    cache_schedule_inst.payload_map.set(key, payload_new)

    if (cache_schedule_inst.update_id === null) {
        cache_schedule_inst.update_id = setTimeout(cleanup_tick, 50)
    }
}
