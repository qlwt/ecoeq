import "./index.scss"

import * as asc from "@qyu/atom-state-core"
import * as asr from "@qyu/atom-state-react"
import { ER_AppView } from "#src/client/component/root/app/element/view"
import { domroot_app } from "#src/client/cst/domroot"
import * as r from "react"
import * as rr from "react-router"
import * as rdom from "react-dom/client"

document.body.append(domroot_app)

const root = rdom.createRoot(domroot_app)

const store = asc.store_new()

root.render(
    <r.StrictMode>
        <asr.StoreContext value={store}>
            <rr.BrowserRouter>
                <ER_AppView />
            </rr.BrowserRouter>
        </asr.StoreContext>
    </r.StrictMode>
)
