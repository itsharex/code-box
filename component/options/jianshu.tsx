import { useStorage } from "@plasmohq/storage/hook"

import DownloadHtml from "~component/items/downloadHtml"
import DownloadMarkdown from "~component/items/downloadMarkdown"
import EditMarkdown from "~component/items/editMarkdown"
import { i18n } from "~tools"

export default function Jianshu() {
  const [closeLoginModal, setCloseLoginModal] = useStorage(
    "jianshu-closeLoginModal",
    (v) => (v === undefined ? true : v)
  )
  const [autoOpenCode, setAutoOpenCode] = useStorage(
    "jianshu-autoOpenCode",
    (v) => (v === undefined ? true : v)
  )

  return (
    <fieldset>
      <legend>{i18n("jianshuConfig")}</legend>
      <div className="item">
        <span>{i18n("jianshuCloseLoginModal")}</span>
        <input
          type="checkbox"
          id="jianshu-closeLoginModal"
          name="jianshu-closeLoginModal"
          className="codebox-offscreen"
          checked={closeLoginModal}
          onChange={(e) => setCloseLoginModal(e.target.checked)}
        />
        <label
          className="codebox-switch"
          htmlFor="jianshu-closeLoginModal"></label>
      </div>
      <div className="item">
        <span>{i18n("jianshuAutoOpenCode")}</span>
        <input
          type="checkbox"
          id="jianshu-autoOpenCode"
          name="jianshu-autoOpenCode"
          className="codebox-offscreen"
          checked={autoOpenCode}
          onChange={(e) => setAutoOpenCode(e.target.checked)}
        />
        <label
          className="codebox-switch"
          htmlFor="jianshu-autoOpenCode"></label>
      </div>
      <EditMarkdown name="jianshu"></EditMarkdown>
      <DownloadMarkdown name="jianshu"></DownloadMarkdown>
      <DownloadHtml name="jianshu"></DownloadHtml>
    </fieldset>
  )
}
