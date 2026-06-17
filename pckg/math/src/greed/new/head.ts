import type { EcoDef } from "#src/type/ecodef";

export const greed_new_head = function(eco: EcoDef, greed_value: number): number {
    const monopoly_ratio = Math.min(1, eco.balance.monopoly / (1 - eco.balance.loyalty))

    return 1 - monopoly_ratio * (1 - greed_value)
}
