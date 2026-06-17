import st from "#client/component/feature/sandbox/style/page.module.scss"
import ELSandBox_Header from "#src/client/component/feature/sandbox/local/header"
import ELSandBox_Instruction from "#src/client/component/feature/sandbox/local/instruction"
import ELSandBox_Main from "#src/client/component/feature/sandbox/local/main"
import { useStateCache } from "#src/client/util/state/cache"
import { gv } from "@ecoeq/gstate"
import * as asr from "@qyu/atom-state-react"
import * as rfl from "@qyu/reactcmp-flow-control"
import * as sc from "@qyu/signal-core"
import * as r from "react"

export type EFSandBox__Page_Props = {

}

export const EFSandBox_Page: r.FC<EFSandBox__Page_Props> = props => {
    const session_list = asr.useStateOutput(r.useCallback(
        ({ reg }) => {
            return sc.osignal_new_memo(
                sc.osignal_new_pipeflat(
                    sc.osignal_new_listpipe(
                        reg(gv.session.state.reflist),
                        index => {
                            return reg(gv.session.state.register).reg(index)
                        }
                    ),
                    reflist_s => sc.osignal_new_merge(reflist_s)
                ),
                null
            )
        },
        []
    ))

    const [session_selection, session_selection_set] = useStateCache<gv.GVSession_Index | null>(
        "EFSandBox_Page::session_selection",
        () => null

    )

    const session_active = r.useMemo(() => {
        if (session_selection === null) {
            return session_list.at(-1) ?? null
        }

        for (const session_node of session_list) {
            if (session_node.id === session_selection.id) {
                return session_node
            }
        }

        return session_list.at(-1) ?? null
    }, [session_list, session_selection])

    return <div className={st.root}>
        <ELSandBox_Header
            session_list={session_list}
            session_active={session_active}
            session_selection_set={session_selection_set}
        />

        <rfl.CmpRequire
            key={session_active?.id}
            value={[session_active] as const}

            fallback={() => {
                return <ELSandBox_Instruction />
            }}
        >
            {([session_active]) => {
                return <>
                    <ELSandBox_Main
                        session_id={session_active.id}
                        session_state={session_active.state}
                    />

                    {/* <ELSandBox_Graph */}
                    {/*     width={800} */}
                    {/*     height={200} */}
                    {/*     session_node={session_active} */}
                    {/* /> */}
                </>
            }}
        </rfl.CmpRequire>
    </div>
}

export default EFSandBox_Page
