import st from "#client/component/feature/sandbox/style/main.module.scss"
import ELSandBox_Controls from "#src/client/component/feature/sandbox/local/controls"
import ELSandBox_Info from "#src/client/component/feature/sandbox/local/info"
import { ELSandBox_PopView } from "#src/client/component/feature/sandbox/local/popview"
import { ecodef_new } from "#src/client/util/ecodef/new"
import { gv } from "@ecoeq/gstate"
import * as math from "@ecoeq/math"
import * as asr from "@qyu/atom-state-react"
import * as r from "react"

export type ELSandBox__Main_Props = {
    readonly session_id: string
    readonly session_state: gv.GVSession_Node_State
}

export const ELSandBox_Main: r.FC<ELSandBox__Main_Props> = props => {
    const { dispatch, } = asr.useStore()

    const eco = r.useMemo(() => ecodef_new(props.session_state), [props.session_state])
    const wf_eco = r.useMemo(() => math.wf_new_eco(eco), [eco])

    return <main className={st.root}>
        <div className={st.list}>
            <ELSandBox_Controls
                session_id={props.session_id}
                session_state={props.session_state}
            />

            <ELSandBox_Info
                eco={eco}
                wf_eco={wf_eco}

                event_next={() => {
                    const research_next = math.research_next_new(eco, wf_eco)

                    dispatch(gv.session.act.patch_state({
                        index: { id: props.session_id, },

                        state: {
                            research_food: research_next.food,
                            research_serv: research_next.serv,
                        },
                    }))
                }}
            />

            <ELSandBox_PopView eco={eco} wf_eco={wf_eco} />
        </div>
    </main>
}

export default ELSandBox_Main
