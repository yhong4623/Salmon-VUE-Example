# FiveM與Vue.js整合專案

本專案展示了如何將現代前端框架Vue.js與FiveM遊戲修改版整合，創建動態且高效的使用者介面。

## 專案概述

FiveM Vue Example專案提供了一個完整的架構，讓開發者能夠使用Vue.js的強大功能來建立FiveM資源的UI部分，同時保持與遊戲客戶端的無縫通訊。

## 目錄結構

```
vue-fivem-project/
│
├─vue-example/                # Vue前端專案
│  │  index.html              # HTML入口文件
│  │  jsconfig.json           # VSCode配置
│  │  vite.config.js          # Vite建構工具配置
│  │  package.json            # 專案依賴描述
│  │  README.md               # 前端專案說明
│  │
│  ├─public/                  # 靜態資源
│  │  └─ favicon.ico          # 網站圖示
│  │
│  └─src/                     # 原始碼
│     │  App.vue              # 主要Vue元件
│     │  main.js              # 應用程式入口點
│     │
│     └─assets/               # 資源文件
│        ├─ base.css          # 基礎樣式
│        ├─ main.css          # 主要樣式
│        └─ logo.svg          # 專案標誌
│
└─script-example/             # FiveM資源
   │  fxmanifest.lua          # FiveM資源宣告
   │
   ├─client/                  # 客戶端腳本
   │  └─ main.lua             # 客戶端主要腳本
   │
   └─dist/                    # Vue構建輸出(從vue-example/dist複製)
      │  index.html
      └─ assets/
```

## 技術要求

- Node.js (v16或更高版本)
- FiveM伺服器或本地環境
- 基本的Vue.js和HTML/CSS知識
- 基本的Lua腳本知識

## 快速開始

### 1. 克隆專案

```bash
git clone https://github.com/yhong4623/Salmon-VUE-Example.git
cd Salmon-VUE-Example
```

### 2. 設定Vue前端

```bash
cd vue-example

# 安裝依賴
npm install

# 開發模式
npm run dev

# 或構建生產版本
npm run build
```

### 3. 整合到FiveM

- 將Vue構建後的`dist`目錄(來自`vue-example/dist`)複製到`script-example`資源目錄中
- 確保`fxmanifest.lua`包含正確的UI頁面和檔案路徑
- 將資源放入FiveM伺服器的`resources`目錄

### 4. 啟動和測試

- 在FiveM伺服器的`server.cfg`中添加`ensure script-example`
- 啟動伺服器或使用`refresh`和`start script-example`命令
- 使用配置的指令(如`/showui`)或按鍵來測試UI

## 通訊機制

### FiveM到Vue的資料流

FiveM客戶端腳本可以使用`SendNUIMessage`函數向Vue應用發送資料：

```lua
SendNUIMessage({
    type = "updateData",  -- 自定義事件類型
    data = {
        playerName = GetPlayerName(PlayerId()),
        health = GetEntityHealth(PlayerPedId())
    }
})
```

### Vue到FiveM的資料流

Vue應用可以使用`fetch` API向FiveM發送資料和指令：

```javascript
fetch(`https://${GetParentResourceName()}/actionName`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        message: "來自UI的資料"
    })
}).then(resp => resp.json())
  .then(resp => console.log('伺服器回應:', resp));
```

### 在Vue中監聽FiveM訊息

```javascript
window.addEventListener('message', (event) => {
    const data = event.data;
    
    if (data.type === 'updateData') {
        // 處理收到的資料
        console.log('從FiveM收到資料:', data.data);
        // 更新Vue狀態...
    }
});
```

### 註冊FiveM回調

在FiveM客戶端腳本中註冊回調以處理來自Vue的請求：

```lua
RegisterNUICallback("actionName", function(data, cb)
    -- 處理來自UI的資料
    print("收到UI資料: " .. json.encode(data))
    
    -- 執行遊戲內操作...
    
    -- 回傳結果到UI
    cb({
        status = "success",
        message = "操作完成"
    })
end)
```

## 開發技巧

### 調試Vue前端

1. 在開發模式下(`npm run dev`)，可以使用瀏覽器的開發者工具調試UI
2. 添加`console.log`語句來追蹤資料流和組件狀態

### 調試FiveM整合

1. 使用FiveM的開發者控制台(`F8`鍵)查看腳本錯誤和輸出
2. 在Lua腳本中添加`print`語句來記錄執行流程
3. 檢查資源是否正確啟動和加載

### 常見問題解決

**問題**: UI不顯示
- 確認資源已正確啟動
- 檢查`fxmanifest.lua`中的UI頁面路徑
- 確認指令或按鍵綁定正常工作

**問題**: UI顯示但無法與FiveM通訊
- 確認NUI回調名稱與Vue中的請求名稱匹配
- 檢查網絡請求路徑是否正確(`GetParentResourceName()`)
- 檢查資料格式(JSON)是否正確

**問題**: 滑鼠焦點問題
- 確保在開關UI時正確設置`SetNuiFocus`
- 確保UI關閉時重置焦點

## 最佳實踐

1. **保持模組化**: 將UI功能分離為獨立元件
2. **事件命名一致**: 建立清晰的事件命名約定
3. **錯誤處理**: 在兩側實現適當的錯誤處理
4. **效能優化**: 避免頻繁更新和大量資料傳輸
5. **響應式設計**: 確保UI在不同解析度下適當顯示

## 許可證

本專案採用MIT許可證。詳情請參閱LICENSE檔案。

## 貢獻指南

歡迎提交問題報告和改進建議。請遵循以下步驟:
1. Fork專案
2. 創建功能分支
3. 提交更改
4. 推送到分支
5. 創建Pull Request

## 參考資源

- [FiveM NUI開發文檔](https://docs.fivem.net/docs/scripting-manual/nui-development/)
- [Vue.js官方文檔](https://vuejs.org/guide/introduction.html)
- [Vite構建工具](https://vitejs.dev/guide/)
