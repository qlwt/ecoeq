import { EFSandBox_Page } from "#src/client/component/feature/sandbox/element/page"
import st from "#src/client/component/root/app/style/view.module.scss"
import * as r from "react"
import * as rr from "react-router"

export const ER_AppView: r.FC = function() {
    return <div className={st.page}>
        <rr.Routes>
            <rr.Route path="/" element={<EFSandBox_Page />} />
        </rr.Routes>
    </div>
}
