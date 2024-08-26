import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef } from "react"
import { v4 as uuidv4 } from "uuid"

import { useMessage } from "@plasmohq/messaging/hook"
import { useStorage } from "@plasmohq/storage/hook"

import { saveHtml, setIcon } from "~tools"

export const config: PlasmoCSConfig = {
  matches: ["https://*.cnblogs.com/*"],
  all_frames: true
}

export default function cnblogs() {
  const [copyCode] = useStorage<boolean>("cnblogs-copyCode")
  const [history, setHistory] = useStorage<any[]>("codebox-history")
  const [closeLog] = useStorage("config-closeLog", true)

  useEffect(() => {
    closeLog || console.log("cnblogs copyCode", copyCode)
    copyCode && copyCodeFunc()
    setIcon(copyCode)
  }, [copyCode])

  useMessage(async (req, res) => {
    if (req.name == "cnblogs-isShow") {
      res.send({ isShow: true })
    }
    if (req.name == "cnblogs-downloadMarkdown") {
    }
    if (req.name == "cnblogs-downloadHtml") {
      downloadHtml()
    }
  })

  // 功能一： 修改复制按钮，支持一键复制
  function copyCodeFunc() {
    const toolbars = document.querySelectorAll<HTMLElement>(
      ".cnblogs_code_toolbar"
    )

    toolbars.forEach((toolbar) => {
      const button = document.createElement("button")
      button.innerText = "复制"
      button.style.float = "right"
      button.title = "一键复制代码"
      button.classList.add("copy-btn")

      toolbar.appendChild(button)
    })

    const buttons = document.querySelectorAll<HTMLElement>(
      ".cnblogs_code_toolbar .copy-btn"
    )

    buttons.forEach((btn) => {
      // 移除点击事件
      btn.setAttribute("onclick", "")

      // 克隆按钮
      var elClone = btn.cloneNode(true)

      // 替回按钮
      btn.parentNode.replaceChild(elClone, btn)

      // 重新添加点击事件
      elClone.addEventListener("click", (e) => {
        // 实现复制
        const target = e.target as HTMLElement
        const parentPreBlock = target.closest(".cnblogs_code")
        const codeBlock = parentPreBlock.querySelector<HTMLElement>("pre")

        navigator.clipboard.writeText(codeBlock.innerText)
        setHistory((prevData) =>
          prevData
            ? [
                {
                  id: uuidv4(),
                  value: codeBlock.innerText,
                  createdAt: new Date(),
                  from: "博客园",
                  link: location.href,
                  tags: [],
                  remark: ""
                },
                ...prevData
              ]
            : [
                {
                  id: uuidv4(),
                  value: codeBlock.innerText,
                  createdAt: new Date(),
                  from: "博客园",
                  link: location.href,
                  tags: [],
                  remark: ""
                }
              ]
        )
        target.innerText = "复制成功"
        setTimeout(() => {
          target.innerText = "复制"
        }, 1000)
        e.stopPropagation()
        e.preventDefault()
      })
    })
  }

  function downloadHtml() {
    const dom = document.querySelector("#post_detail")
    saveHtml(dom)
  }

  return <div style={{ display: "none" }}></div>
}
