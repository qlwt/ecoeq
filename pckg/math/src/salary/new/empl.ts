import type { EcoDef } from "#src/type/ecodef"

export const salary_new_empl = function(def: EcoDef): number {
    if (def.balance.monopoly >= 1 || def.balance.loyalty >= 1) {
        return 0
    }

    return Math.max(
        0,
        def.cst.money - (def.balance.loyalty * def.cst.money) / (1 - def.balance.monopoly)
    )
}

