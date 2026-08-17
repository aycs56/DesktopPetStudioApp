# Desktop Pet Studio 工作坊 JSON 創作者指南

版本：v1.2.0
適用內容：Steam 工作坊或手動放入的桌寵包、姿勢包

## Steam 工作坊發布流程

建立好包後，創作者可在程式的 **工作坊 > 創作者中心** 依序選擇「打包目前桌寵」或「打包目前選取姿勢」，再選擇「發布至 Steam 工作坊」。發布視窗會要求選取完整作品資料夾、Steam 封面圖、名稱、介紹、標籤與可見度，並上傳整個資料夾，因此 JSON、圖片和 WAV 音效都必須留在包內。

發布成功後程式會開啟 Steam 作品頁。請依 Steam 顯示內容接受 Workshop 創作者協議，並確認作品可見度。程式也會把 Steam 作品 ID 寫入 manifest 的 `steam_published_file_id`；下次選擇同一個資料夾發布時，會更新原本作品，不會另外建立新作品。玩家在 Steam 訂閱後，桌寵會從 Steam 安裝資料夾讀取相同 JSON 格式的內容。

## 1. 工作坊包基本結構

工作坊包是一個資料夾，至少包含：

```text
MyPosePack/
  desktop_pet_studio_workshop.json
  assets/
    frame_01.png
    frame_02.png
    wave.wav
```

`desktop_pet_studio_workshop.json` 是入口檔。圖片與音效建議放在 `assets/`，並用相對路徑引用，這樣其他玩家訂閱後才能正常載入。

也可以把單一 JSON manifest 直接放在工作坊掃描資料夾底下，例如：

```text
WorkshopLibrary/
  測試匯入姿勢.json
  assets/
    frame_01.png
    frame_02.png
    wave.wav
```

這種放法中，`assets/frame_01.png` 會相對於 `測試匯入姿勢.json` 所在資料夾解析，也就是上例的 `WorkshopLibrary/assets/frame_01.png`。如果 JSON 放在 `config/測試匯入姿勢.json`，素材就需要放在 `config/assets/`。

## 2. 單一姿勢包範例

```json
{
  "schema_version": 1,
  "id": "my-wave-pose",
  "title": "揮手打招呼",
  "type": "pose",
  "content_kind": "single_pose",
  "assets_mode": "bundled",
  "pose": {
    "name": "揮手打招呼",
    "category": "custom",
    "animation_paths": [
      "assets/frame_01.png",
      "assets/frame_02.png",
      "assets/frame_03.png",
      "assets/frame_04.png",
      "assets/frame_05.png",
      "assets/frame_06.png"
    ],
    "playback_speed": 1.25,
    "sound_path": "assets/wave.wav",
    "hotkey": "",
    "hotkey_enabled": true,
    "bubble_texts": ["嗨，我在這裡！", "今天也一起加油"],
    "bubble_interval_sec": 20,
    "enabled": true,
    "live_mode_disabled": false,
    "movement": {
      "enabled": true,
      "mode": "hop",
      "speed": 1.2,
      "distance_px": 160,
      "vertical_px": 36,
      "duration_sec": 2.4,
      "loop": false,
      "gravity": false
    }
  },
  "ai_asset_prompts": [
    {
      "id": "wave_ai_prompt",
      "name": "揮手姿勢 AI 說明",
      "pose_id": "wave",
      "zh": "請用我上傳的角色或風格參考圖，幫我製作桌寵揮手打招呼動畫。請直接輸出 1 張 3 x 2 的六宮格透明背景 PNG，內含 6 個完整動畫影格；不得拆成獨立檔案。每格 256 x 256 px，角色大小、鏡頭、中心點與底部中心定位完全一致，相鄰格子正好保留 5px 透明間距。每格外側邊框或留白處以 #0CB8EC（RGB 12, 184, 236；100% 不透明）加入細的裁切輔助虛線與 90 度直角角標；不可壓到角色、既有特徵、配件或動作內容。不要文字、格號或浮水印。",
      "zh_cn": "请用我上传的角色或风格参考图，帮我制作桌宠挥手打招呼动画。请直接输出 1 张 3 x 2 的六宫格透明背景 PNG，内含 6 个完整动画帧；不得拆成独立文件。每格 256 x 256 px，角色大小、镜头、中心点与底部中心定位必须完全一致，相邻格子正好保留 5px 透明间距。每格外侧边框或留白处以 #0CB8EC（RGB 12, 184, 236；100% 不透明）加入细的裁切辅助虚线与 90 度直角角标；不可压到角色、既有特征、配件或动作内容。不要文字、格号或水印。",
      "en": "Use my uploaded character or style reference to create a waving desktop pet animation. Output one transparent-background 3 x 2 six-panel PNG image containing six complete animation frames; do not split the frames into separate files. Every panel must be 256 x 256 px with identical character size, camera, center point, and bottom-center anchor, separated by exactly 5px of transparent spacing. In each panel's outer border or blank margin, add a thin #0CB8EC (RGB 12, 184, 236; 100% opacity) dashed crop guide with sharp 90-degree corner marks; it must not overlap the character, existing features, accessories, or motion content. No text, panel numbers, or watermark."
    }
  ]
}
```

玩家匯入後，`pose` 會變成右鍵呼叫姿勢。系統會重新產生本機姿勢 id，因此 `pose.id` 可省略。

## 3. 全桌寵包範例

全桌寵包用 manifest 指向 `pet_config.json`：

```json
{
  "schema_version": 1,
  "id": "my-complete-pet",
  "title": "小露娜桌寵",
  "type": "pet",
  "content_kind": "full_pet",
  "config_path": "pet_config.json",
  "assets_mode": "bundled"
}
```

`pet_config.json` 內容和玩家存檔格式一致，可以包含基礎姿勢、右鍵姿勢、提醒、免打擾與快捷鍵。分享全桌寵包時，Google OAuth/token 路徑與既有工作坊訂閱清單會被打包工具清除，避免分享本機私密資料。

全桌寵包可以選擇提供 `ai_asset_prompts`。若沒有提供，玩家掃描後仍會在 AI 素材助手看到此桌寵的預設 AI 素材說明，提示玩家先上傳角色或風格參考圖，再依照包內姿勢生成新素材。

## 4. Manifest 參數

| 參數 | 類型 | 必填 | 說明 |
| --- | --- | --- | --- |
| `schema_version` | number | 否 | 建議填 `1`，方便未來相容。 |
| `id` | string | 否 | 工作坊項目 id。Steam 上可填 published file id；未填時用資料夾名稱。 |
| `steam_published_file_id` | string | 否 | 首次從程式發布成功後自動寫入的 Steam 作品 ID。保留此欄位可在下次發布時更新原作品。 |
| `title` | string | 否 | 工作坊清單顯示名稱。 |
| `type` | string | 是 | `pose` 或 `pet`。 |
| `content_kind` | string | 否 | `single_pose` 或 `full_pet`，方便創作者辨識。 |
| `assets_mode` | string | 否 | 建議填 `bundled`，表示素材已放在包內。 |
| `config_path` | string | pet 必填 | 全桌寵包的設定檔路徑，例如 `pet_config.json`。 |
| `pose` | object | pose 建議 | 單一姿勢完整設定。 |
| `animation_paths` | array | 舊格式可用 | 舊版姿勢包可直接列動畫檔。新版建議放在 `pose.animation_paths`。 |
| `bubble_texts` | array | 否 | 舊版姿勢包可直接列氣泡文字。新版建議放在 `pose.bubble_texts`。 |
| `sound_path` | string | 否 | 舊版姿勢包可直接列 WAV 音效。新版建議放在 `pose.sound_path`。 |
| `ai_asset_prompts` | array | 否 | AI 素材助手 Prompt 模板。姿勢包會直接顯示；全桌寵包會以整包標題作為可展開群組。 |

## 5. AI 素材 Prompt 參數

`ai_asset_prompts` 讓創作者提供「玩家要如何用 AI 延伸這個作品」的說明。支援多語系欄位；玩家 UI 會優先顯示目前語言，沒有時 fallback 到中文或英文。

```json
"ai_asset_prompts": [
  {
    "id": "idle_prompt",
    "name": "原地休息姿勢",
    "pose_id": "idle",
    "description": "延伸這個桌寵的休息姿勢素材",
    "zh": "請用我上傳的角色圖，製作原地休息姿勢。請直接輸出 1 張 3 x 2 的六宮格透明背景 PNG，內含 6 個完整動畫影格；不得拆成獨立檔案。每格 256 x 256 px，角色大小、鏡頭、中心點與底部中心定位完全一致，相鄰格子正好保留 5px 透明間距。每格外側邊框或留白處以 #0CB8EC（RGB 12, 184, 236；100% 不透明）加入細的裁切輔助虛線與 90 度直角角標；不可壓到角色、既有特徵、配件或動作內容。不要文字、格號或浮水印。",
    "zh_cn": "请用我上传的角色图，制作原地休息姿势。请直接输出 1 张 3 x 2 的六宫格透明背景 PNG，内含 6 个完整动画帧；不得拆成独立文件。每格 256 x 256 px，角色大小、镜头、中心点与底部中心定位必须完全一致，相邻格子正好保留 5px 透明间距。每格外侧边框或留白处以 #0CB8EC（RGB 12, 184, 236；100% 不透明）加入细的裁切辅助虚线与 90 度直角角标；不可压到角色、既有特征、配件或动作内容。不要文字、格号或水印。",
    "en": "Use my uploaded character reference to create an idle resting pose. Output one transparent-background 3 x 2 six-panel PNG image containing six complete animation frames; do not split the frames into separate files. Every panel must be 256 x 256 px with identical character size, camera, center point, and bottom-center anchor, separated by exactly 5px of transparent spacing. In each panel's outer border or blank margin, add a thin #0CB8EC (RGB 12, 184, 236; 100% opacity) dashed crop guide with sharp 90-degree corner marks; it must not overlap the character, existing features, accessories, or motion content. No text, panel numbers, or watermark.",
    "ja": "アップロードしたキャラクター画像を使い、待機ポーズを作成してください。6コマを含む3列 x 2行の透過PNGを1枚だけ出力し、別々の6ファイルには分けないでください。各コマは256 x 256 px、キャラクターの大きさ・カメラ・中心点・下中央アンカーはすべて同じにし、コマ間は正確に5pxの透明な間隔を取ってください。各コマの外枠または余白には #0CB8EC（RGB 12, 184, 236、100%不透明）の細い裁切補助破線と90度の直角コーナーガイドを置き、キャラクター、既存の特徴、アクセサリー、動作内容には重ねないでください。文字、番号、透かしは不要です。"
  }
]
```

| 參數 | 類型 | 必填 | 說明 |
| --- | --- | --- | --- |
| `id` | string | 否 | Prompt 模板 id。未填時系統會自動生成。 |
| `name` | string | 建議 | AI 素材助手清單顯示名稱。建議使用姿勢名稱。 |
| `pose_id` | string | 否 | 對應姿勢 id，方便創作者管理。 |
| `description` | string | 否 | 給創作者或玩家看的短說明。 |
| `zh`、`zh_cn`、`en`、`ja`、`fr`、`de`、`es`、`ru`、`pt`、`ko` | string | 至少一個 | 多語 Prompt 文案。 |

注意事項：

- 單一姿勢包若有 `ai_asset_prompts`，會在 AI 素材助手頂層直接顯示。
- 全桌寵包若有 `ai_asset_prompts`，AI 素材助手會顯示可展開群組：整包標題在上層，底下是各姿勢 Prompt。
- 全桌寵包若沒有 `ai_asset_prompts`，系統會依 `pet_config.json` 裡的姿勢名稱產生預設 AI 素材說明。
- 工作坊頁的「AI素材說明」欄會依是否有可用 Prompt 顯示「前往說明」或「無說明」。
- Prompt 內建議明確要求：輸出 `1 張 3 x 2 六宮格透明背景 PNG`，內含六個完整影格；每格 `256 x 256 px`、六格使用相同畫布與底部中心定位、相鄰格子正好保留 `5px` 透明間距，並在外側邊框或留白處使用 `#0CB8EC`（RGB `12, 184, 236`）細虛線與 `90 度` 直角角標。輔助線不可壓到角色或配件；不要文字、格號或浮水印。玩家可在 AI 素材助手的「宮格圖片裁切」工具依這些輔助線輸出為個別動畫影格，再加入 `animation_paths`。

## 6. Pose 參數

| 參數 | 類型 | 預設 | 效果 |
| --- | --- | --- | --- |
| `name` | string | `未命名姿勢` | 匯入後在右鍵選單與姿勢清單顯示的名稱。 |
| `category` | string | `custom` | 工作坊匯入姿勢會轉成 `custom`。 |
| `animation_paths` | array | `[]` | PNG/GIF/PPM/PGM 動畫路徑。建議使用 `assets/frame_01.png` 這種相對路徑。 |
| `playback_speed` | number | `1.0` | 動畫播放倍率，支援 `0.25` 到 `4.0`。 |
| `sound_path` | string | `""` | 右鍵呼叫時播放的 WAV 音效。 |
| `hotkey` | string | `""` | 可提供建議快捷鍵，例如 `F6` 或 `Ctrl+Alt+K`。玩家仍可自行修改。 |
| `hotkey_enabled` | boolean | `true` | 是否啟用該姿勢快捷鍵。 |
| `bubble_texts` | array | `[]` | 此姿勢可能顯示的氣泡文字，系統會隨機挑選。 |
| `bubble_interval_sec` | number | `45` | 氣泡自動出現間隔秒數，最小 `1`。 |
| `enabled` | boolean | `true` | 匯入後是否預設啟用。 |
| `live_mode_disabled` | boolean | `false` | 開啟 OBS 專用擷取時是否停用這個姿勢。`false` 會播放，`true` 不播放；關閉 OBS 專用擷取後，仍只依 `enabled` 決定是否播放。 |
| `movement` | object | disabled | 自訂寵物移動方式。詳見下一節。 |
| `twitch_trigger` | object | disabled | 選用的 Twitch Bits 直播觸發規則。詳見下方說明。 |
| `focus_key_speed_enabled` | boolean | `false` | 僅供 `focus` 基礎姿勢使用；啟用時，玩家按鍵會顯示兩次按下之間的毫秒數氣泡。 |
| `focus_key_speed_prefix` | string | `按鍵速度 ` | 僅供 `focus` 使用；顯示數值與內建 `ms` 前的文字。 |
| `focus_key_speed_suffix` | string | `，主人手速快到出現殘影!!` | 僅供 `focus` 使用；顯示數值與內建 `ms` 後的文字。 |

### 固定專注遊戲模式

完整桌寵包可在 `poses.focus` 定義固定專注遊戲模式。玩家從姿勢工作台或桌寵右鍵選單的原地休息旁啟用後，桌寵會停在啟用當下的位置，不觸發走動、攀附或下墜；玩家仍可左鍵拖曳重新擺位，放開後會以新位置繼續固定。每次按鍵都會重新播放這個姿勢的動畫；內建預設氣泡間隔為 60 秒。請提供中心點一致的 6 張獨立透明背景 PNG，避免鎖定位置時畫面晃動。

```json
"focus": {
  "animation_paths": [
    "assets/focus_01.png",
    "assets/focus_02.png",
    "assets/focus_03.png",
    "assets/focus_04.png",
    "assets/focus_05.png",
    "assets/focus_06.png"
  ],
  "playback_speed": 1.0,
  "focus_key_speed_enabled": true,
  "focus_key_speed_prefix": "按鍵速度 ",
  "focus_key_speed_suffix": "，主人手速快到出現殘影!!"
}
```

系統只使用按下事件之間的時間差來計算毫秒數，不會儲存、分享或寫入玩家實際按下的按鍵內容。

### Twitch Bits 直播姿勢規則

創作者可在任何基礎或自訂姿勢加入 `twitch_trigger`，讓玩家連接自己的 Twitch 後，以 Bits 金額觸發這個姿勢。這是可安全分享的創作設定，不包含 Twitch 帳號、授權碼或權杖。

```json
"twitch_trigger": {
  "enabled": true,
  "min_bits": 100,
  "max_bits": 499,
  "duration_sec": 8,
  "bubble_texts": [
    "謝謝 {viewer_name} 的 {amount} {currency}！",
    "{viewer_name} 說：{viewer_message}"
  ]
}
```

| 參數 | 類型 | 預設 | 效果 |
| --- | --- | --- | --- |
| `enabled` | boolean | `false` | 匯入後是否啟用這個 Bits 規則。 |
| `min_bits` | number | `1` | 觸發所需的最低 Bits，最小為 `1`。 |
| `max_bits` | number | `0` | 觸發上限；填 `0` 代表不設上限。不可小於 `min_bits`。 |
| `duration_sec` | number | `8` | `1` 到 `60` 秒。直播姿勢播放多久後自動回到觸發前的動作。 |
| `bubble_texts` | array | `[]` | 命中後隨機顯示一則專用氣泡。 |

氣泡可使用 `{viewer_name}`、`{viewer_message}`、`{amount}`、`{currency}`、`{platform}`、`{event_type}`。多個姿勢的金額範圍重疊時，系統會選擇範圍較精準的規則。訂閱者必須在「直播主模式」連接自己的 Twitch；工作坊 JSON 不應也無法放入任何 Twitch 私人授權資料。

## 7. Movement 參數

`movement` 讓創作者用 JSON 定義姿勢期間的桌寵移動方式。系統只接受白名單參數，不會執行任何程式碼。

水平移動中的姿勢會依實際行進方向自動鏡像。創作者只需要提供「面向右方」的 PNG 或 GIF；`wander`、`patrol`、`hop`、`drift` 與含有水平位移的 `sequence` 在向左移動時會由程式即時翻轉素材。`shake`、靜止、依附與下墜姿勢不會自動翻轉。

| 參數 | 類型 | 預設 | 範圍 | 效果 |
| --- | --- | --- | --- | --- |
| `enabled` | boolean | `false` | true/false | 是否啟用這組移動。 |
| `mode` | string | `none` | 見下表 | 移動模式。 |
| `speed` | number | `1.0` | `0.1` 到 `4.0` | 移動速度倍率。 |
| `distance_px` | number | `180` | `0` 到 `2400` | 水平移動距離或震動幅度。 |
| `vertical_px` | number | `32` | `-1200` 到 `1200` | 垂直移動距離或跳躍高度。負數可用於向上漂移。 |
| `duration_sec` | number | `8.0` | `0.1` 到 `120.0` | 曲線移動或 sequence 的參考時長。 |
| `loop` | boolean | `false` | true/false | 是否循環。 |
| `gravity` | boolean | `true` | true/false | `false` 時姿勢期間不會進入自然下墜流程。 |
| `steps` | array | `[]` | sequence 使用 | 多段 keyframe。 |

### Movement 模式

| `mode` | 效果 | 適合用途 |
| --- | --- | --- |
| `none` | 不移動。 | 純表情、待機。 |
| `wander` | 隨機選擇左右目標移動，有時接近螢幕邊界。 | 活潑走動、探索。 |
| `patrol` | 以觸發位置為中心左右巡邏。 | 守衛、巡邏、來回走。 |
| `hop` | 水平前進並做拋物線跳躍。 | 跳出來打招呼、興奮。 |
| `shake` | 在原地快速抖動。 | 驚訝、生氣、提醒。 |
| `drift` | 平滑漂移。 | 飄浮、魔法、幽靈感。 |
| `sequence` | 依 `steps` 逐段移動。 | 客製化演出、跳躍後滑行、先退後衝刺。 |

## 8. Sequence steps

`sequence` 用多段 keyframe 定義動作。每個 step 都是「相對上一段終點」的位移。

```json
"movement": {
  "enabled": true,
  "mode": "sequence",
  "loop": false,
  "gravity": false,
  "steps": [
    {"dx": 0, "dy": -36, "duration_ms": 220, "easing": "ease_out"},
    {"dx": 140, "dy": 22, "duration_ms": 520, "easing": "ease_in_out"},
    {"dx": -70, "dy": 0, "duration_ms": 360, "easing": "linear"}
  ]
}
```

### Step 參數

| 參數 | 類型 | 預設 | 範圍 | 效果 |
| --- | --- | --- | --- | --- |
| `dx` | number | `0` | `-2000` 到 `2000` | 這一段水平位移。正數往右，負數往左。 |
| `dy` | number | `0` | `-1200` 到 `1200` | 這一段垂直位移。負數往上，正數往下。 |
| `duration_ms` | number | `300` | `30` 到 `30000` | 這一段持續時間。 |
| `easing` | string | `linear` | 見下表 | 位移速度曲線。 |

### Easing

| `easing` | 效果 |
| --- | --- |
| `linear` | 等速移動。 |
| `ease_in` | 慢慢開始，越來越快。 |
| `ease_out` | 一開始快，結尾放慢。 |
| `ease_in_out` | 開頭與結尾較慢，中段較快。 |

## 9. 常用 movement 範例

### 活潑巡遊

```json
"movement": {
  "enabled": true,
  "mode": "wander",
  "speed": 1.4,
  "distance_px": 420,
  "gravity": true
}
```

### 原地驚訝抖動

```json
"movement": {
  "enabled": true,
  "mode": "shake",
  "speed": 1.8,
  "distance_px": 10,
  "vertical_px": 4,
  "duration_sec": 1.2,
  "loop": false,
  "gravity": false
}
```

### 漂浮角色

```json
"movement": {
  "enabled": true,
  "mode": "drift",
  "speed": 0.8,
  "distance_px": 120,
  "vertical_px": -20,
  "duration_sec": 5,
  "loop": true,
  "gravity": false
}
```

### 小範圍巡邏

```json
"movement": {
  "enabled": true,
  "mode": "patrol",
  "speed": 1.0,
  "distance_px": 260,
  "gravity": true
}
```

## 10. 建議值

- 大部分姿勢的 `playback_speed` 建議在 `0.75` 到 `1.5`。
- 右鍵呼叫姿勢的 `movement.duration_sec` 建議 `1` 到 `4` 秒，太長可能讓玩家以為操作沒有結束。
- `shake.distance_px` 建議 `4` 到 `16`，太大會像瞬移。
- `hop.vertical_px` 建議 `24` 到 `80`。
- `sequence` 的單段 `duration_ms` 建議不要低於 `120`，否則可能看起來太突然。
- 想讓桌寵暫時漂浮或跳在半空，將 `gravity` 設為 `false`。

## 11. 常見錯誤

- 路徑使用 `C:\...` 本機絕對路徑：其他玩家訂閱後會找不到素材。請改用 `assets/frame_01.png`。
- 單一 JSON manifest 放在掃描資料夾時，`assets` 必須和該 JSON 同層；若沒有 `assets/frame_01.png`，匯入後會只剩 fallback 外觀。
- 圖片被做成單張六宮格：Desktop Pet Studio 需要多張獨立 PNG 或 GIF，不會自動切 sprite sheet。
- `mode` 拼錯：不認得的 mode 會回到 `none`。
- `easing` 拼錯：不認得的 easing 會回到 `linear`。
- `distance_px` 太大：桌寵會被限制在螢幕內，但視覺上可能像突然貼邊。
- `gravity` 沒關：跳躍或漂浮動作期間可能進入下墜姿勢，並被自然下墜流程拉回工作列上方。

## 12. 養成內容 JSON（v1.1）

創作者可獨立分享商城商品、工作與事件，也可以將它們放進完整桌寵包的 `pet_config.json` 的 `care` 區塊。獨立養成包使用 `type: "care"`；玩家會在工作坊頁的「養成內容」欄位看到可匯入狀態，按「匯入養成」後加入目前開啟的桌寵存檔。

```json
{
  "schema_version": 1,
  "id": "orange-cat-care-pack",
  "title": "橘貓午茶工作包",
  "type": "care",
  "content_kind": "care",
  "assets_mode": "bundled",
  "shop_items": [
    {
      "id": "tuna_cookie",
      "name": "鮪魚小餅乾",
      "description": "補充飽食度的小點心。",
      "category": "food",
      "rarity": "common",
      "price": 18,
      "hunger_delta": 20,
      "affinity_delta": 2,
      "mood_delta": 4,
      "coin_delta": 0,
      "icon_path": "assets/tuna_cookie.png",
      "sound_path": "assets/crunch.wav",
      "bubble_texts": ["酥酥的，好喜歡！"],
      "affinity_bubble_rules": [
        {
          "id": "tuna_cookie_trusted",
          "name": "熟悉的點心",
          "min_affinity": 80,
          "max_affinity": 100,
          "bubble_texts": ["你又記得我最愛吃這個了！"]
        }
      ],
      "enabled": true,
      "stock": 3,
      "refresh_stock": 3,
      "refresh_group": "daily_snacks",
      "sort_order": 10
    }
  ],
  "work_jobs": [
    {
      "id": "tea_shop_helper",
      "name": "幫忙顧茶點",
      "description": "短時間整理茶點區。",
      "duration_minutes": 5,
      "coin_reward": 35,
      "hunger_cost": 6,
      "affinity_delta": 2,
      "mood_delta": -6,
      "mood_risk_percent": 45,
      "bubble_texts": ["茶點區整理好了！"],
      "enabled": true,
      "sort_order": 10
    }
  ],
  "care_events": [
    {
      "id": "hungry_nudge",
      "name": "肚子餓提醒",
      "trigger": "hunger_low",
      "min_hunger": 0,
      "max_hunger": 20,
      "min_affinity": 0,
      "max_affinity": 100,
      "min_mood": 0,
      "max_mood": 100,
      "hunger_delta": 0,
      "affinity_delta": 0,
      "mood_delta": 0,
      "coin_delta": 0,
      "bubble_texts": ["有沒有小點心呢？"],
      "cooldown_minutes": 30,
      "enabled": true
    }
  ],
  "mood_settings": {
    "low_hunger_threshold": 20,
    "low_hunger_delay_minutes": 60,
    "low_hunger_check_minutes": 60,
    "low_hunger_drop_chance": 45,
    "low_hunger_drop_min": 3,
    "low_hunger_drop_max": 8
  },
  "refresh_settings": {
    "work_daily_limit": 3,
    "shop_daily_limit": 3,
    "work_offer_count": 3,
    "shop_offer_count": 6
  },
  "mood_bubble_rules": [
    {
      "id": "content_cat_happy",
      "name": "心情愉快",
      "min_hunger": 80,
      "max_hunger": 100,
      "min_affinity": 80,
      "max_affinity": 100,
      "min_mood": 70,
      "max_mood": 100,
      "bubble_texts": ["今天也想和你一起玩！", "心情很好，想聽你說說話。"],
      "bubble_interval_sec": 180,
      "enabled": true
    }
  ]
}
```

### 可用欄位與限制

| 區塊 | 欄位 | 說明與範圍 |
| --- | --- | --- |
| `shop_items` | `id`、`name`、`description` | 商品唯一識別與玩家可見文字。相同 `id` 匯入時會更新既有商品。 |
| `shop_items` | `category` | `food`、`gift`、`collectible`；未知值會回退為 `food`。 |
| `shop_items` | `rarity` | `common`、`uncommon`、`rare`、`epic`；未知值回退為 `common`。 |
| `shop_items` | `price` | `0` 到 `999999` 個遊戲內金幣。不是現實金流。 |
| `shop_items` | `hunger_delta`、`affinity_delta`、`mood_delta` | `-100` 到 `100`。使用物品時套用，最終狀態仍會限制在 0 到 100。 |
| `shop_items` | `coin_delta` | `-999999` 到 `999999`。使用物品時套用。 |
| `shop_items` | `icon_path`、`sound_path` | 相對於 manifest 的路徑；圖示只接受 PNG/GIF/PPM/PGM，音效只接受 WAV。 |
| `shop_items` | `bubble_texts`、`affinity_bubble_rules`、`enabled`、`stock`、`refresh_stock`、`refresh_group`、`sort_order` | `affinity_bubble_rules` 是條件式親合回應；使用物品後，符合範圍的文字會優先顯示。`stock: -1` 代表無限庫存，`0` 代表售完；`refresh_stock` 是按商城刷新後回補的有限庫存，範圍為 `-1..9999`。未填時沿用 `stock`。排序可使用 `-9999` 到 `9999`。 |
| `work_jobs` | `id`、`name`、`description` | 工作唯一識別與玩家可見文字。相同 `id` 匯入時會更新既有工作。 |
| `work_jobs` | `duration_minutes` | `1` 到 `480` 分鐘。 |
| `work_jobs` | `coin_reward`、`hunger_cost`、`affinity_delta`、`mood_delta`、`mood_risk_percent` | 分別為 `0..99999`、`0..100`、`-100..100`、`-100..100`、`0..100`。負心情效果會依 `mood_risk_percent` 機率套用，適合高強度工作。 |
| `work_jobs` | `bubble_texts`、`enabled`、`sort_order` | 工作開始與完成時可顯示文字氣泡。 |
| `care_events` | `id`、`name`、`trigger` | 事件唯一識別、名稱與觸發時機。可用 `startup`、`hunger_low`、`hunger_high`、`affinity_low`、`affinity_high`、`mood_low`、`mood_high`、`work_complete`、`item_used`。 |
| `care_events` | `min_hunger`、`max_hunger`、`min_affinity`、`max_affinity`、`min_mood`、`max_mood` | 皆為 `0` 到 `100`；系統只會在所有門檻都符合時觸發。 |
| `care_events` | `hunger_delta`、`affinity_delta`、`mood_delta`、`coin_delta` | 事件觸發後套用的數值效果。 |
| `care_events` | `bubble_texts`、`cooldown_minutes`、`enabled` | `cooldown_minutes` 為 `0` 到 `1440`，避免 15 秒 tick 重複刷出相同事件。 |
| `mood_settings` | `low_hunger_threshold`、`low_hunger_delay_minutes`、`low_hunger_check_minutes` | 長時間低飽食的心情風險門檻。數值範圍依序為 `0..100`、`1..1440`、`1..1440`。 |
| `mood_settings` | `low_hunger_drop_chance`、`low_hunger_drop_min`、`low_hunger_drop_max` | 每次檢查的下降機率與幅度：機率 `0..100`，幅度 `1..100`。 |
| `refresh_settings` | `work_daily_limit`、`shop_daily_limit` | 玩家每天可刷新工作與商城的上限，各自計算，範圍為 `0..99`；每天本機日期變更時歸零。 |
| `refresh_settings` | `work_offer_count`、`shop_offer_count` | 工作與商城一次顯示的可用項目數，範圍分別為 `1..24`、`1..48`。刷新會從已啟用內容重新挑選可顯示項目。 |
| `mood_bubble_rules` | `id`、`name`、`min_hunger/max_hunger`、`min_affinity/max_affinity`、`min_mood/max_mood` | 符合全部範圍時才有資格被隨機挑選；所有範圍皆為 `0..100`。 |
| `mood_bubble_rules` | `bubble_texts`、`bubble_interval_sec`、`enabled` | `bubble_texts` 可放多則文字，系統隨機選取；每條規則獨立以 `15..86400` 秒間隔計時。 |

### 親合回應與心情對話規則

- `affinity_bubble_rules` 與 `mood_bubble_rules` 使用相同的條件欄位格式；前者在玩家從背包使用該商品後檢查，後者在日常 tick 中隨機檢查。
- 道具親合回應會先套用商品數值，再判斷親合範圍。因此想做「親合度升到 80 後才說的話」，應在規則內設定 `min_affinity: 80`。
- 同時符合多個日常規則時，系統只隨機選一條；每條規則的 `bubble_interval_sec` 互不影響。
- `mood_settings` 會取代玩家目前的低飽食心情風險設定；只在需要提供完整玩法規則時放入。單純新增對話文字時，可省略這個區塊。
- `refresh_settings` 會取代玩家目前的刷新規則；請只在內容包確實有設計工作或商城輪替平衡時提供。工作與商城的每日上限會分開計算，商城刷新同時會將有限庫存回補到商品的 `refresh_stock`。

### 打包與安全規則

- 將養成包 manifest 和 `assets/` 放在同一資料夾。不要使用 `C:\...` 等絕對路徑。
- 完整桌寵包可在 `pet_config.json` 的 `care` 中保存 `state`、`shop_items`、`inventory`、`work_jobs`、`events`、`mood_settings`、`refresh_settings` 與 `mood_bubble_rules`；內建打包會把引用的商品圖示與 WAV 音效複製到包內 `assets/`。
- 匯入時，系統只解析白名單 JSON 資料與允許的素材副檔名；JSON 不會被當成程式碼執行。
- `source`、`source_id`、`last_triggered_at` 由玩家端管理，不需要在創作者 manifest 中填寫。
