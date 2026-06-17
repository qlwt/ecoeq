import st from "#client/component/feature/sandbox/style/controls.module.scss"
import { gv } from "@ecoeq/gstate"
import * as fas_industry from "@fortawesome/free-solid-svg-icons/faIndustry"
import * as fas_military from "@fortawesome/free-solid-svg-icons/faPersonRifle"
import * as faw from "@fortawesome/react-fontawesome"
import * as asr from "@qyu/atom-state-react"
import cl from "classnames"
import * as r from "react"

export type ELSandBox__Controls_Props = {
    readonly session_id: string
    readonly session_state: gv.GVSession_Node_State
}

export const ELSandBox_Controls: r.FC<ELSandBox__Controls_Props> = props => {
    const { dispatch } = asr.useStore()

    return <div className={st.root}>
        <div className={st.field}>
            <div className={cl(st.field__iconpair, st._big)}>
                <div className={cl(st.field__icon, st._style_company)}>
                    <faw.FontAwesomeIcon icon={fas_industry.faIndustry} />
                </div>

                <div className={st.field__text}>
                    {props.session_state.monopoly}%
                </div>

                <input
                    type={`range`}
                    className={st.in_line}

                    min={10}
                    max={90}
                    step={5}
                    value={props.session_state.monopoly}

                    onChange={ev => {
                        const value_parsed = Number.parseInt(ev.target.value)

                        if (!Number.isNaN(value_parsed)) {
                            dispatch(gv.session.act.patch_state({
                                graph_nosync: true,
                                index: { id: props.session_id, },

                                state: {
                                    monopoly: value_parsed,
                                },
                            }))
                        }
                    }}
                />
            </div>
        </div>

        <div className={st.field}>
            <div className={cl(st.field__iconpair, st._big)}>
                <div className={cl(st.field__icon, st._style_military)}>
                    <faw.FontAwesomeIcon icon={fas_military.faPersonRifle} />
                </div>

                <div className={st.field__text}>
                    {props.session_state.military}%
                </div>

                <input
                    type={`range`}
                    className={st.in_line}

                    min={10}
                    max={90}
                    step={5}
                    value={props.session_state.military}

                    onChange={ev => {
                        const value_parsed = Number.parseInt(ev.target.value)

                        if (!Number.isNaN(value_parsed)) {
                            dispatch(gv.session.act.patch_state({
                                graph_nosync: true,
                                index: { id: props.session_id, },

                                state: {
                                    military: value_parsed,
                                },
                            }))
                        }
                    }}
                />
            </div>
        </div>
    </div>
}

export default ELSandBox_Controls
