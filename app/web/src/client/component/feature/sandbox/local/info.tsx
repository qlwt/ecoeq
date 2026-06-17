import st from "#client/component/feature/sandbox/style/info.module.scss"
import { useStateCache } from "#src/client/util/state/cache"
import * as math from "@ecoeq/math"
import * as fas_car from "@fortawesome/free-solid-svg-icons/faCar"
import * as fas_research from "@fortawesome/free-solid-svg-icons/faFlask"
import * as fas_service from "@fortawesome/free-solid-svg-icons/faGem"
import * as fas_empl from "@fortawesome/free-solid-svg-icons/faHelmetSafety"
import * as fas_plane from "@fortawesome/free-solid-svg-icons/faPlane"
import * as fas_boat from "@fortawesome/free-solid-svg-icons/faSailboat"
import * as fas_farm from "@fortawesome/free-solid-svg-icons/faSeedling"
import * as fas_head from "@fortawesome/free-solid-svg-icons/faUserGraduate"
import * as faw from "@fortawesome/react-fontawesome"
import * as ar from "@qyu/anim-react"
import cl from "classnames"
import * as r from "react"

type RunnerSnapshot = {
    readonly state: number
}

export type ELSandBox__Info_Props = {
    readonly eco: math.EcoDef
    readonly wf_eco: math.WFEco

    readonly event_next?: () => void
}

export const ELSandBox_Info: r.FC<ELSandBox__Info_Props> = props => {
    const ptr_runner_snapshot = r.useRef<RunnerSnapshot>({ state: 0, })
    const ref_actrun = r.useRef<HTMLButtonElement | null>(null)

    const research_next = math.research_next_new(props.eco, props.wf_eco)

    const mul_food_now = math.research_mul_new_food(props.eco)
    const mul_serv_now = math.research_mul_new_serv(props.eco)
    const mul_food_next = math.research_mul_new_raw(props.eco, research_next.food)
    const mul_serv_next = math.research_mul_new_raw(props.eco, research_next.serv)

    const view_mul_food_now = math.float_new_round(mul_food_now, 2)
    const view_mul_food_diff = math.float_new_round(mul_food_next - mul_food_now, 2)
    const view_mul_serv_now = math.float_new_round(mul_serv_now, 2)
    const view_mul_serv_diff = math.float_new_round(mul_serv_next - mul_serv_now, 2)

    const prod_empl_food = props.wf_eco.empl.food_industry * math.output_new_food(props.eco)
    const prod_empl_serv = props.wf_eco.empl.serv_industry * math.output_new_serv(props.eco)
    const prod_head_food = props.wf_eco.head.food_industry * math.output_new_food(props.eco)
    const prod_head_serv = props.wf_eco.head.serv_industry * math.output_new_serv(props.eco)

    const distr_empl_food = Math.min(
        prod_empl_food,
        math.output_new_food(props.eco) * props.eco.cst.pop_empl - props.wf_eco.unemployed
    )

    const distr_empl_serv = Math.min(
        prod_empl_serv,
        math.output_new_serv(props.eco) * props.eco.cst.pop_empl - props.wf_eco.unemployed
    )

    // const distr_unempl_food = prod_empl_food - distr_empl_food
    // const distr_unempl_serv = prod_empl_serv - distr_empl_serv

    const cons_empl_food = distr_empl_food / props.eco.cst.pop_empl
    const cons_empl_serv = distr_empl_serv / props.eco.cst.pop_empl
    const cons_head_food = prod_head_food / props.eco.cst.pop_head
    const cons_head_serv = prod_head_serv / props.eco.cst.pop_head

    const view_cons_empl_food = math.float_new_round(cons_empl_food, 2)
    const view_cons_empl_serv = math.float_new_round(cons_empl_serv, 2)
    const view_cons_head_food = math.float_new_round(cons_head_food, 2)
    const view_cons_head_serv = math.float_new_round(cons_head_serv, 2)

    const [runer_status, runner_status_set] = r.useState(false)
    const [runner_speed, runner_speed_set] = useStateCache("ELSandBox_Info::runner_speed", 1)

    ar.useRunAnimInterval({
        src: ar.useAnimLine({
            init: ar.useInputConstant({
                state: 0,
            }),

            config: ar.useInputDynamicSet({
                target: Number.MAX_SAFE_INTEGER,
                velocity: runer_status ? 5e-3 * runner_speed : 0,

                effect: state => {
                    ref_actrun.current?.style.setProperty(
                        `--efsandbox__run_progress`,
                        math.float_new_round(state % 1, 2).toString()
                    )

                    const state_intdiff = Math.trunc(state) - Math.trunc(ptr_runner_snapshot.current.state)

                    for (let i = 0; i < state_intdiff; ++i) {
                        props.event_next?.()
                    }

                    ptr_runner_snapshot.current = {
                        state
                    }
                },
            }),
        })
    })

    return <div className={st.root}>
        <div className={st.infolist}>
            <div className={st.field}>
                <div className={cl(st.field__icon, st._style_food)}>
                    <faw.FontAwesomeIcon icon={fas_farm.faSeedling} />
                </div>

                <div className={st.field__text}>
                    <span>{view_mul_food_now.toFixed(2)}x</span>

                    &nbsp;{Math.sign(view_mul_food_diff) >= 0 ? "+" : "-"}&nbsp;

                    <div className={st.field__ilterm}>
                        <div className={st.field__text}>
                            {Math.abs(view_mul_food_diff).toFixed(2)}x
                        </div>

                        <div className={cl(st.field__icon, st._small, st._style_research)}>
                            <faw.FontAwesomeIcon icon={fas_research.faFlask} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={st.field}>
                <div className={cl(st.field__icon, st._big, st._style_serv)}>
                    <faw.FontAwesomeIcon icon={fas_service.faGem} />
                </div>

                <div className={st.field__text}>
                    <span>{view_mul_serv_now.toFixed(2)}x</span>

                    &nbsp;{Math.sign(view_mul_serv_diff) >= 0 ? "+" : "-"}&nbsp;

                    <div className={cl(st.field__ilterm)}>
                        <div className={st.field__text}>
                            {Math.abs(view_mul_serv_diff).toFixed(2)}x
                        </div>

                        <div className={cl(st.field__icon, st._small, st._style_research)}>
                            <faw.FontAwesomeIcon icon={fas_research.faFlask} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={st.field}>
                <div className={cl(st.field__icon, st._big, st._style_maintenance)}>
                    <faw.FontAwesomeIcon icon={fas_empl.faHelmetSafety} />
                </div>

                <div className={st.field__text}>
                    <div className={st.field__ilterm}>
                        <div className={st.field__text}>
                            {view_cons_empl_food.toFixed(2)}
                        </div>

                        <div className={cl(st.field__icon, st._small, st._style_food)}>
                            <faw.FontAwesomeIcon icon={fas_farm.faSeedling} />
                        </div>
                    </div>

                    &nbsp;+&nbsp;

                    <div className={st.field__ilterm}>
                        <div className={st.field__text}>
                            {view_cons_empl_serv.toFixed(2)}
                        </div>

                        <div className={cl(st.field__icon, st._small, st._style_serv)}>
                            <faw.FontAwesomeIcon icon={fas_service.faGem} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={st.field}>
                <div className={cl(st.field__icon, st._big, st._style_serv)}>
                    <faw.FontAwesomeIcon icon={fas_head.faUserGraduate} />
                </div>

                <div className={st.field__text}>
                    <div className={st.field__ilterm}>
                        <div className={st.field__text}>
                            {view_cons_head_food.toFixed(2)}
                        </div>

                        <div className={cl(st.field__icon, st._small, st._style_food)}>
                            <faw.FontAwesomeIcon icon={fas_farm.faSeedling} />
                        </div>
                    </div>

                    &nbsp;+&nbsp;

                    <div className={st.field__ilterm}>
                        <div className={st.field__text}>
                            {view_cons_head_serv.toFixed(2)}
                        </div>

                        <div className={cl(st.field__icon, st._small, st._style_serv)}>
                            <faw.FontAwesomeIcon icon={fas_service.faGem} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className={st.actlist}>
            <div className={cl(st.act, st._runner)}>
                <button
                    ref={ref_actrun}
                    className={cl(st.act__btn)}

                    onClick={() => {
                        runner_status_set(n => !n)
                    }}
                >
                    <div className={st.stabiliser}>
                        <div className={cl(st.stabiliser__node, !runer_status && st._hidden)}>
                            Stop
                        </div>

                        <div className={cl(st.stabiliser__node, runer_status && st._hidden)}>
                            Start
                        </div>
                    </div>
                </button>

                <div className={st.act__speedswitch}>
                    <button
                        disabled={runner_speed === 3.0}
                        className={cl(st.act__speedcase, runner_speed === 3.0 && st._active)}

                        onClick={() => {
                            runner_speed_set(3.0)
                        }}
                    >
                        <faw.FontAwesomeIcon icon={fas_plane.faPlane} />
                    </button>

                    <button
                        disabled={runner_speed === 1.0}
                        className={cl(st.act__speedcase, runner_speed === 1.0 && st._active)}

                        onClick={() => {
                            runner_speed_set(1.0)
                        }}
                    >
                        <faw.FontAwesomeIcon icon={fas_car.faCar} />
                    </button>

                    <button
                        disabled={runner_speed === 0.5}
                        className={cl(st.act__speedcase, runner_speed === 0.5 && st._active)}

                        onClick={() => {
                            runner_speed_set(0.5)
                        }}
                    >
                        <faw.FontAwesomeIcon icon={fas_boat.faSailboat} />
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default ELSandBox_Info
