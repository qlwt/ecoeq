export const float_new_round = function(src: number, depth: number) {
    const power = 10 ** Math.trunc(depth)

    return Math.round(src * power) / power
}
