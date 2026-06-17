export type CacheSchedule = {
    readonly payload_map: Map<string, () => string>
    
    update_id: number | null
}
