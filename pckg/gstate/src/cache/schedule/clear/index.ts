import { cache_schedule_inst } from "#src/cache/schedule/inst"

export const cache_schedule_clear = function(key: string): void {
    cache_schedule_inst.payload_map.delete(key)
}
