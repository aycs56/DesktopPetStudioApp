# Desktop Pet Studio 工作坊 JSON 创作者指南

版本：v1.2.0
适用内容：Steam 工作坊或手动放入的桌宠包、姿势包

## Steam 工作坊发布流程

建立好包後，创作者可在程式的 **工作坊 > 创作者中心** 依序选择「打包目前桌宠」或「打包目前选取姿势」，再选择「发布至 Steam 工作坊」。发布视窗会要求选取完整作品资料夹、Steam 封面图、名称、介绍、标签与可见度，并上传整个资料夹，因此 JSON、图片和 WAV 音效都必须留在包内。

发布成功後程式会开启 Steam 作品页。请依 Steam 显示内容接受 Workshop 创作者协议，并确认作品可见度。程式也会把 Steam 作品 ID 写入 manifest 的 `steam_published_file_id`；下次选择同一个资料夹发布时，会更新原本作品，不会另外建立新作品。玩家在 Steam 订阅後，桌宠会从 Steam 安装资料夹读取相同 JSON 格式的内容。

## 自动生成倍率与镜像素材

使用「打包当前桌宠」、「打包当前选取姿势」或导出桌宠存档时，Desktop Pet Studio 会在复制原始素材后，自动准备可携的倍率影格。这个阶段会依序产出 `0.5x` 到 `4x` 的所有支持倍率；走动、拖拽等需要左右方向的姿势，也会一并产出镜像影格。

- 原始 PNG、GIF、PPM、PGM 仍是作品的来源素材；自动产生的影格只用于加快玩家端载入，不会取代原图。
- 包内会附上 `derived_frames/` 和验证 manifest。玩家导入或订阅后，程序会先确认素材的影格顺序、文件名、文件大小、修改时间与内容都相符，才会直接使用对应倍率；不相符时会安全地重新产生。
- 打包窗口会显示「准备各倍率动画素材」进度。这个步骤完成前，桌宠包不会标示为完成，因此请保留原始素材，并预留足够磁盘空间给多影格 GIF 或大型图片。
- 不需要手动把 `derived_frames/` 写入 JSON；使用程序内置打包功能时会自动处理。手动制作的工作坊包只需维持 JSON 与 `assets/` 的相对路径正确，玩家端会依需要建立自己的本机缓存。

## 1. 工作坊包基本结构

工作坊包是一个资料夹，至少包含：

```text
MyPosePack/
  desktop_pet_studio_workshop.json
  assets/
    frame_01.png
    frame_02.png
    wave.wav
```

`desktop_pet_studio_workshop.json` 是入口档。图片与音效建议放在 `assets/`，并用相对路径引用，这样其他玩家订阅後才能正常载入。

也可以把单一 JSON manifest 直接放在工作坊扫描资料夹底下，例如：

```text
WorkshopLibrary/
  测试汇入姿势.json
  assets/
    frame_01.png
    frame_02.png
    wave.wav
```

这种放法中，`assets/frame_01.png` 会相对於 `测试汇入姿势.json` 所在资料夹解析，也就是上例的 `WorkshopLibrary/assets/frame_01.png`。如果 JSON 放在 `config/测试汇入姿势.json`，素材就需要放在 `config/assets/`。

## 2. 单一姿势包范例

```json
{
  "schema_version": 1,
  "id": "my-wave-pose",
  "title": "挥手打招呼",
  "type": "pose",
  "content_kind": "single_pose",
  "assets_mode": "bundled",
  "pose": {
    "name": "挥手打招呼",
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
    "bubble_texts": ["嗨，我在这里！", "今天也一起加油"],
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
      "name": "挥手姿势 AI 说明",
      "pose_id": "wave",
      "zh": "请用我上传的角色或风格参考图，帮我制作桌宠挥手打招呼动画。请直接输出 1 张 3 x 2 的六宫格透明背景 PNG，内含 6 个完整动画影格；不得拆成独立档案。每格 256 x 256 px，角色大小、镜头、中心点与底部中心定位完全一致，相邻格子正好保留 5px 透明间距。每格外侧边框或留白处以 #0CB8EC（RGB 12, 184, 236；100% 不透明）加入细的裁切辅助虚线与 90 度直角角标；不可压到角色、既有特徵、配件或动作内容。不要文字、格号或浮水印。",
      "zh_cn": "请用我上传的角色或风格参考图，帮我制作桌宠挥手打招呼动画。请直接输出 1 张 3 x 2 的六宫格透明背景 PNG，内含 6 个完整动画帧；不得拆成独立文件。每格 256 x 256 px，角色大小、镜头、中心点与底部中心定位必须完全一致，相邻格子正好保留 5px 透明间距。每格外侧边框或留白处以 #0CB8EC（RGB 12, 184, 236；100% 不透明）加入细的裁切辅助虚线与 90 度直角角标；不可压到角色、既有特征、配件或动作内容。不要文字、格号或水印。",
      "en": "Use my uploaded character or style reference to create a waving desktop pet animation. Output one transparent-background 3 x 2 six-panel PNG image containing six complete animation frames; do not split the frames into separate files. Every panel must be 256 x 256 px with identical character size, camera, center point, and bottom-center anchor, separated by exactly 5px of transparent spacing. In each panel's outer border or blank margin, add a thin #0CB8EC (RGB 12, 184, 236; 100% opacity) dashed crop guide with sharp 90-degree corner marks; it must not overlap the character, existing features, accessories, or motion content. No text, panel numbers, or watermark."
    }
  ]
}
```

玩家汇入後，`pose` 会变成右键呼叫姿势。系统会重新产生本机姿势 id，因此 `pose.id` 可省略。

## 3. 全桌宠包范例

全桌宠包用 manifest 指向 `pet_config.json`：

```json
{
  "schema_version": 1,
  "id": "my-complete-pet",
  "title": "小露娜桌宠",
  "type": "pet",
  "content_kind": "full_pet",
  "config_path": "pet_config.json",
  "assets_mode": "bundled"
}
```

`pet_config.json` 内容和玩家存档格式一致，可以包含基础姿势、右键姿势、提醒、免打扰与快捷键。分享全桌宠包时，Google OAuth/token 路径与既有工作坊订阅清单会被打包工具清除，避免分享本机私密资料。

全桌宠包可以选择提供 `ai_asset_prompts`。若没有提供，玩家扫描後仍会在 AI 素材助手看到此桌宠的预设 AI 素材说明，提示玩家先上传角色或风格参考图，再依照包内姿势生成新素材。

## 4. Manifest 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `schema_version` | number | 否 | 建议填 `1`，方便未来相容。 |
| `id` | string | 否 | 工作坊项目 id。Steam 上可填 published file id；未填时用资料夹名称。 |
| `steam_published_file_id` | string | 否 | 首次从程式发布成功後自动写入的 Steam 作品 ID。保留此栏位可在下次发布时更新原作品。 |
| `title` | string | 否 | 工作坊清单显示名称。 |
| `type` | string | 是 | `pose` 或 `pet`。 |
| `content_kind` | string | 否 | `single_pose` 或 `full_pet`，方便创作者辨识。 |
| `assets_mode` | string | 否 | 建议填 `bundled`，表示素材已放在包内。 |
| `config_path` | string | pet 必填 | 全桌宠包的设定档路径，例如 `pet_config.json`。 |
| `pose` | object | pose 建议 | 单一姿势完整设定。 |
| `animation_paths` | array | 旧格式可用 | 旧版姿势包可直接列动画档。新版建议放在 `pose.animation_paths`。 |
| `bubble_texts` | array | 否 | 旧版姿势包可直接列气泡文字。新版建议放在 `pose.bubble_texts`。 |
| `sound_path` | string | 否 | 旧版姿势包可直接列 WAV 音效。新版建议放在 `pose.sound_path`。 |
| `ai_asset_prompts` | array | 否 | AI 素材助手 Prompt 模板。姿势包会直接显示；全桌宠包会以整包标题作为可展开群组。 |

## 5. AI 素材 Prompt 参数

`ai_asset_prompts` 让创作者提供「玩家要如何用 AI 延伸这个作品」的说明。支援多语系栏位；玩家 UI 会优先显示目前语言，没有时 fallback 到中文或英文。

```json
"ai_asset_prompts": [
  {
    "id": "idle_prompt",
    "name": "原地休息姿势",
    "pose_id": "idle",
    "description": "延伸这个桌宠的休息姿势素材",
    "zh": "请用我上传的角色图，制作原地休息姿势。请直接输出 1 张 3 x 2 的六宫格透明背景 PNG，内含 6 个完整动画影格；不得拆成独立档案。每格 256 x 256 px，角色大小、镜头、中心点与底部中心定位完全一致，相邻格子正好保留 5px 透明间距。每格外侧边框或留白处以 #0CB8EC（RGB 12, 184, 236；100% 不透明）加入细的裁切辅助虚线与 90 度直角角标；不可压到角色、既有特徵、配件或动作内容。不要文字、格号或浮水印。",
    "zh_cn": "请用我上传的角色图，制作原地休息姿势。请直接输出 1 张 3 x 2 的六宫格透明背景 PNG，内含 6 个完整动画帧；不得拆成独立文件。每格 256 x 256 px，角色大小、镜头、中心点与底部中心定位必须完全一致，相邻格子正好保留 5px 透明间距。每格外侧边框或留白处以 #0CB8EC（RGB 12, 184, 236；100% 不透明）加入细的裁切辅助虚线与 90 度直角角标；不可压到角色、既有特征、配件或动作内容。不要文字、格号或水印。",
    "en": "Use my uploaded character reference to create an idle resting pose. Output one transparent-background 3 x 2 six-panel PNG image containing six complete animation frames; do not split the frames into separate files. Every panel must be 256 x 256 px with identical character size, camera, center point, and bottom-center anchor, separated by exactly 5px of transparent spacing. In each panel's outer border or blank margin, add a thin #0CB8EC (RGB 12, 184, 236; 100% opacity) dashed crop guide with sharp 90-degree corner marks; it must not overlap the character, existing features, accessories, or motion content. No text, panel numbers, or watermark.",
    "ja": "アップロードしたキャラクター画像を使い、待机ポーズを作成してください。6コマを含む3列 x 2行の透过PNGを1枚だけ出力し、别々の6ファイルには分けないでください。各コマは256 x 256 px、キャラクターの大きさ・カメラ・中心点・下中央アンカーはすべて同じにし、コマ间は正确に5pxの透明な间隔を取ってください。各コマの外枠または余白には #0CB8EC（RGB 12, 184, 236、100%不透明）の细い裁切补助破线と90度の直角コーナーガイドを置き、キャラクター、既存の特徴、アクセサリー、动作内容には重ねないでください。文字、番号、透かしは不要です。"
  }
]
```

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 否 | Prompt 模板 id。未填时系统会自动生成。 |
| `name` | string | 建议 | AI 素材助手清单显示名称。建议使用姿势名称。 |
| `pose_id` | string | 否 | 对应姿势 id，方便创作者管理。 |
| `description` | string | 否 | 给创作者或玩家看的短说明。 |
| `zh`、`zh_cn`、`en`、`ja`、`fr`、`de`、`es`、`ru`、`pt`、`ko` | string | 至少一个 | 多语 Prompt 文案。 |

注意事项：

- 单一姿势包若有 `ai_asset_prompts`，会在 AI 素材助手顶层直接显示。
- 全桌宠包若有 `ai_asset_prompts`，AI 素材助手会显示可展开群组：整包标题在上层，底下是各姿势 Prompt。
- 全桌宠包若没有 `ai_asset_prompts`，系统会依 `pet_config.json` 里的姿势名称产生预设 AI 素材说明。
- 工作坊页的「AI素材说明」栏会依是否有可用 Prompt 显示「前往说明」或「无说明」。
- Prompt 内建议明确要求：输出 `1 张 3 x 2 六宫格透明背景 PNG`，内含六个完整影格；每格 `256 x 256 px`、六格使用相同画布与底部中心定位、相邻格子正好保留 `5px` 透明间距，并在外侧边框或留白处使用 `#0CB8EC`（RGB `12, 184, 236`）细虚线与 `90 度` 直角角标。辅助线不可压到角色或配件；不要文字、格号或浮水印。玩家可在 AI 素材助手的「宫格图片裁切」工具依这些辅助线输出为个别动画影格，再加入 `animation_paths`。

## 6. Pose 参数

| 参数 | 类型 | 预设 | 效果 |
| --- | --- | --- | --- |
| `name` | string | `未命名姿势` | 汇入後在右键选单与姿势清单显示的名称。 |
| `category` | string | `custom` | 工作坊汇入姿势会转成 `custom`。 |
| `animation_paths` | array | `[]` | PNG/GIF/PPM/PGM 动画路径。建议使用 `assets/frame_01.png` 这种相对路径。 |
| `playback_speed` | number | `1.0` | 动画播放倍率，支援 `0.25` 到 `4.0`。 |
| `sound_path` | string | `""` | 右键呼叫时播放的 WAV 音效。 |
| `hotkey` | string | `""` | 可提供建议快捷键，例如 `F6` 或 `Ctrl+Alt+K`。玩家仍可自行修改。 |
| `hotkey_enabled` | boolean | `true` | 是否启用该姿势快捷键。 |
| `bubble_texts` | array | `[]` | 此姿势可能显示的气泡文字，系统会随机挑选。 |
| `bubble_interval_sec` | number | `45` | 气泡自动出现间隔秒数，最小 `1`。 |
| `enabled` | boolean | `true` | 汇入後是否预设启用。 |
| `live_mode_disabled` | boolean | `false` | 储存用的反向栏位，对应 UI 的「直播模式显示」。开启 OBS 专用撷取时，`false` 代表显示并可播放，`true` 代表不显示；关闭 OBS 专用撷取後，仍只依 `enabled` 决定是否播放。 |
| `movement` | object | disabled | 自订宠物移动方式。详见下一节。 |
| `twitch_trigger` | object | disabled | 选用的 Twitch 直播触发规则，支持 Bits、普通订阅与赠送订阅。详见下方说明。 |
| `focus_key_speed_enabled` | boolean | `false` | 仅供 `focus` 基础姿势使用；启用时，玩家按键会显示两次按下之间的毫秒数气泡。 |
| `focus_key_speed_prefix` | string | `按键速度 ` | 仅供 `focus` 使用；显示数值与内建 `ms` 前的文字。 |
| `focus_key_speed_suffix` | string | `，主人手速快到出现残影!!` | 仅供 `focus` 使用；显示数值与内建 `ms` 後的文字。 |

### 固定专注游戏模式

完整桌宠包可在 `poses.focus` 定义固定专注游戏模式。玩家从姿势工作台或桌宠右键选单的原地休息旁启用後，桌宠会停在启用当下的位置，不触发走动、攀附或下坠；玩家仍可左键拖曳重新摆位，放开後会以新位置继续固定。每次按键都会重新播放这个姿势的动画；内建预设气泡间隔为 60 秒。请提供中心点一致的 6 张独立透明背景 PNG，避免锁定位置时画面晃动。

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
  "focus_key_speed_prefix": "按键速度 ",
  "focus_key_speed_suffix": "，主人手速快到出现残影!!"
}
```

系统只使用按下事件之间的时间差来计算毫秒数，不会储存、分享或写入玩家实际按下的按键内容。

### Twitch 直播姿势规则

创作者可在任何基础或自订姿势加入 `twitch_trigger`，让玩家连接自己的 Twitch 後，以 Bits 金额、普通订阅或赠送订阅触发这个姿势。这是可安全分享的创作设定，不包含 Twitch 帐号、授权码或权杖。

```json
"twitch_trigger": {
  "enabled": true,
  "subscription_enabled": true,
  "gift_subscription_enabled": true,
  "min_bits": 100,
  "max_bits": 499,
  "duration_sec": 8,
  "bubble_texts": [
    "谢谢 {viewer_name} 的 {amount} {currency}！",
    "{viewer_name} 说：{viewer_message}"
  ]
}
```

| 参数 | 类型 | 预设 | 效果 |
| --- | --- | --- | --- |
| `enabled` | boolean | `false` | 汇入後是否启用这个 Bits 规则。 |
| `subscription_enabled` | boolean | `false` | 汇入後是否让普通订阅触发这个姿势。 |
| `gift_subscription_enabled` | boolean | `false` | 汇入後是否让赠送订阅触发这个姿势。 |
| `min_bits` | number | `1` | 触发所需的最低 Bits，最小为 `1`。 |
| `max_bits` | number | `0` | 触发上限；填 `0` 代表不设上限。不可小於 `min_bits`。 |
| `duration_sec` | number | `8` | `1` 到 `60` 秒。直播姿势播放多久後自动回到触发前的动作。 |
| `bubble_texts` | array | `[]` | 命中後随机显示一则专用气泡。 |

气泡可使用 `{viewer_name}`、`{viewer_message}`、`{amount}`、`{currency}`、`{platform}`、`{event_type}`、`{tier}`；Bits 使用 `{amount}`／`{currency}`，订阅使用 `{tier}`。多个姿势的 Bits 金额范围重叠时，系统会选择范围较精准的规则。玩家必须在「直播模式」连接自己的 Twitch，并授权读取订阅事件；工作坊 JSON 不应也无法放入任何 Twitch 私人授权资料。

## 7. Movement 参数

`movement` 让创作者用 JSON 定义姿势期间的桌宠移动方式。系统只接受白名单参数，不会执行任何程式码。

水平移动中的姿势会依实际行进方向自动镜像。创作者只需要提供「面向右方」的 PNG 或 GIF；`wander`、`patrol`、`hop`、`drift` 与含有水平位移的 `sequence` 在向左移动时会由程式即时翻转素材。`shake`、静止、依附与下坠姿势不会自动翻转。

| 参数 | 类型 | 预设 | 范围 | 效果 |
| --- | --- | --- | --- | --- |
| `enabled` | boolean | `false` | true/false | 是否启用这组移动。 |
| `mode` | string | `none` | 见下表 | 移动模式。 |
| `speed` | number | `1.0` | `0.1` 到 `4.0` | 移动速度倍率。 |
| `distance_px` | number | `180` | `0` 到 `2400` | 水平移动距离或震动幅度。 |
| `vertical_px` | number | `32` | `-1200` 到 `1200` | 垂直移动距离或跳跃高度。负数可用於向上漂移。 |
| `duration_sec` | number | `8.0` | `0.1` 到 `120.0` | 曲线移动或 sequence 的参考时长。 |
| `loop` | boolean | `false` | true/false | 是否循环。 |
| `gravity` | boolean | `true` | true/false | `false` 时姿势期间不会进入自然下坠流程。 |
| `steps` | array | `[]` | sequence 使用 | 多段 keyframe。 |

### Movement 模式

| `mode` | 效果 | 适合用途 |
| --- | --- | --- |
| `none` | 不移动。 | 纯表情、待机。 |
| `wander` | 随机选择左右目标移动，有时接近萤幕边界。 | 活泼走动、探索。 |
| `patrol` | 以触发位置为中心左右巡逻。 | 守卫、巡逻、来回走。 |
| `hop` | 水平前进并做抛物线跳跃。 | 跳出来打招呼、兴奋。 |
| `shake` | 在原地快速抖动。 | 惊讶、生气、提醒。 |
| `drift` | 平滑漂移。 | 飘浮、魔法、幽灵感。 |
| `sequence` | 依 `steps` 逐段移动。 | 客制化演出、跳跃後滑行、先退後冲刺。 |

## 8. Sequence steps

`sequence` 用多段 keyframe 定义动作。每个 step 都是「相对上一段终点」的位移。

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

### Step 参数

| 参数 | 类型 | 预设 | 范围 | 效果 |
| --- | --- | --- | --- | --- |
| `dx` | number | `0` | `-2000` 到 `2000` | 这一段水平位移。正数往右，负数往左。 |
| `dy` | number | `0` | `-1200` 到 `1200` | 这一段垂直位移。负数往上，正数往下。 |
| `duration_ms` | number | `300` | `30` 到 `30000` | 这一段持续时间。 |
| `easing` | string | `linear` | 见下表 | 位移速度曲线。 |

### Easing

| `easing` | 效果 |
| --- | --- |
| `linear` | 等速移动。 |
| `ease_in` | 慢慢开始，越来越快。 |
| `ease_out` | 一开始快，结尾放慢。 |
| `ease_in_out` | 开头与结尾较慢，中段较快。 |

## 9. 常用 movement 范例

### 活泼巡游

```json
"movement": {
  "enabled": true,
  "mode": "wander",
  "speed": 1.4,
  "distance_px": 420,
  "gravity": true
}
```

### 原地惊讶抖动

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

### 小范围巡逻

```json
"movement": {
  "enabled": true,
  "mode": "patrol",
  "speed": 1.0,
  "distance_px": 260,
  "gravity": true
}
```

## 10. 建议值

- 大部分姿势的 `playback_speed` 建议在 `0.75` 到 `1.5`。
- 右键呼叫姿势的 `movement.duration_sec` 建议 `1` 到 `4` 秒，太长可能让玩家以为操作没有结束。
- `shake.distance_px` 建议 `4` 到 `16`，太大会像瞬移。
- `hop.vertical_px` 建议 `24` 到 `80`。
- `sequence` 的单段 `duration_ms` 建议不要低於 `120`，否则可能看起来太突然。
- 想让桌宠暂时漂浮或跳在半空，将 `gravity` 设为 `false`。

## 11. 常见错误

- 路径使用 `C:\...` 本机绝对路径：其他玩家订阅後会找不到素材。请改用 `assets/frame_01.png`。
- 单一 JSON manifest 放在扫描资料夹时，`assets` 必须和该 JSON 同层；若没有 `assets/frame_01.png`，汇入後会只剩 fallback 外观。
- 图片被做成单张六宫格：Desktop Pet Studio 需要多张独立 PNG 或 GIF，不会自动切 sprite sheet。
- `mode` 拼错：不认得的 mode 会回到 `none`。
- `easing` 拼错：不认得的 easing 会回到 `linear`。
- `distance_px` 太大：桌宠会被限制在萤幕内，但视觉上可能像突然贴边。
- `gravity` 没关：跳跃或漂浮动作期间可能进入下坠姿势，并被自然下坠流程拉回工作列上方。

## 12. 养成内容 JSON（v1.1）

创作者可独立分享商城商品、工作与事件，也可以将它们放进完整桌宠包的 `pet_config.json` 的 `care` 区块。独立养成包使用 `type: "care"`；玩家会在工作坊页的「养成内容」栏位看到可汇入状态，按「汇入养成」後加入目前开启的桌宠存档。

```json
{
  "schema_version": 1,
  "id": "orange-cat-care-pack",
  "title": "橘猫午茶工作包",
  "type": "care",
  "content_kind": "care",
  "assets_mode": "bundled",
  "shop_items": [
    {
      "id": "tuna_cookie",
      "name": "鲔鱼小饼乾",
      "description": "补充饱食度的小点心。",
      "category": "food",
      "rarity": "common",
      "price": 18,
      "hunger_delta": 20,
      "affinity_delta": 2,
      "mood_delta": 4,
      "coin_delta": 0,
      "icon_path": "assets/tuna_cookie.png",
      "sound_path": "assets/crunch.wav",
      "bubble_texts": ["酥酥的，好喜欢！"],
      "affinity_bubble_rules": [
        {
          "id": "tuna_cookie_trusted",
          "name": "熟悉的点心",
          "min_affinity": 80,
          "max_affinity": 100,
          "bubble_texts": ["你又记得我最爱吃这个了！"]
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
      "name": "帮忙顾茶点",
      "description": "短时间整理茶点区。",
      "duration_minutes": 5,
      "coin_reward": 35,
      "hunger_cost": 6,
      "affinity_delta": 2,
      "mood_delta": -6,
      "mood_risk_percent": 45,
      "bubble_texts": ["茶点区整理好了！"],
      "enabled": true,
      "sort_order": 10
    }
  ],
  "care_events": [
    {
      "id": "hungry_nudge",
      "name": "肚子饿提醒",
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
      "bubble_texts": ["有没有小点心呢？"],
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
      "bubble_texts": ["今天也想和你一起玩！", "心情很好，想听你说说话。"],
      "bubble_interval_sec": 180,
      "enabled": true
    }
  ]
}
```

### 可用栏位与限制

| 区块 | 栏位 | 说明与范围 |
| --- | --- | --- |
| `shop_items` | `id`、`name`、`description` | 商品唯一识别与玩家可见文字。相同 `id` 汇入时会更新既有商品。 |
| `shop_items` | `category` | `food`、`gift`、`collectible`；未知值会回退为 `food`。 |
| `shop_items` | `rarity` | `common`、`uncommon`、`rare`、`epic`；未知值回退为 `common`。 |
| `shop_items` | `price` | `0` 到 `999999` 个游戏内金币。不是现实金流。 |
| `shop_items` | `hunger_delta`、`affinity_delta`、`mood_delta` | `-100` 到 `100`。使用物品时套用，最终状态仍会限制在 0 到 100。 |
| `shop_items` | `coin_delta` | `-999999` 到 `999999`。使用物品时套用。 |
| `shop_items` | `icon_path`、`sound_path` | 相对於 manifest 的路径；图示只接受 PNG/GIF/PPM/PGM，音效只接受 WAV。 |
| `shop_items` | `bubble_texts`、`affinity_bubble_rules`、`enabled`、`stock`、`refresh_stock`、`refresh_group`、`sort_order` | `affinity_bubble_rules` 是条件式亲合回应；使用物品後，符合范围的文字会优先显示。`stock: -1` 代表无限库存，`0` 代表售完；`refresh_stock` 是按商城刷新後回补的有限库存，范围为 `-1..9999`。未填时沿用 `stock`。排序可使用 `-9999` 到 `9999`。 |
| `work_jobs` | `id`、`name`、`description` | 工作唯一识别与玩家可见文字。相同 `id` 汇入时会更新既有工作。 |
| `work_jobs` | `duration_minutes` | `1` 到 `480` 分钟。 |
| `work_jobs` | `coin_reward`、`hunger_cost`、`affinity_delta`、`mood_delta`、`mood_risk_percent` | 分别为 `0..99999`、`0..100`、`-100..100`、`-100..100`、`0..100`。负心情效果会依 `mood_risk_percent` 机率套用，适合高强度工作。 |
| `work_jobs` | `bubble_texts`、`enabled`、`sort_order` | 工作开始与完成时可显示文字气泡。 |
| `care_events` | `id`、`name`、`trigger` | 事件唯一识别、名称与触发时机。可用 `startup`、`hunger_low`、`hunger_high`、`affinity_low`、`affinity_high`、`mood_low`、`mood_high`、`work_complete`、`item_used`。 |
| `care_events` | `min_hunger`、`max_hunger`、`min_affinity`、`max_affinity`、`min_mood`、`max_mood` | 皆为 `0` 到 `100`；系统只会在所有门槛都符合时触发。 |
| `care_events` | `hunger_delta`、`affinity_delta`、`mood_delta`、`coin_delta` | 事件触发後套用的数值效果。 |
| `care_events` | `bubble_texts`、`cooldown_minutes`、`enabled` | `cooldown_minutes` 为 `0` 到 `1440`，避免 15 秒 tick 重复刷出相同事件。 |
| `mood_settings` | `low_hunger_threshold`、`low_hunger_delay_minutes`、`low_hunger_check_minutes` | 长时间低饱食的心情风险门槛。数值范围依序为 `0..100`、`1..1440`、`1..1440`。 |
| `mood_settings` | `low_hunger_drop_chance`、`low_hunger_drop_min`、`low_hunger_drop_max` | 每次检查的下降机率与幅度：机率 `0..100`，幅度 `1..100`。 |
| `refresh_settings` | `work_daily_limit`、`shop_daily_limit` | 玩家每天可刷新工作与商城的上限，各自计算，范围为 `0..99`；每天本机日期变更时归零。 |
| `refresh_settings` | `work_offer_count`、`shop_offer_count` | 工作与商城一次显示的可用项目数，范围分别为 `1..24`、`1..48`。刷新会从已启用内容重新挑选可显示项目。 |
| `mood_bubble_rules` | `id`、`name`、`min_hunger/max_hunger`、`min_affinity/max_affinity`、`min_mood/max_mood` | 符合全部范围时才有资格被随机挑选；所有范围皆为 `0..100`。 |
| `mood_bubble_rules` | `bubble_texts`、`bubble_interval_sec`、`enabled` | `bubble_texts` 可放多则文字，系统随机选取；每条规则独立以 `15..86400` 秒间隔计时。 |

### 亲合回应与心情对话规则

- `affinity_bubble_rules` 与 `mood_bubble_rules` 使用相同的条件栏位格式；前者在玩家从背包使用该商品後检查，後者在日常 tick 中随机检查。
- 道具亲合回应会先套用商品数值，再判断亲合范围。因此想做「亲合度升到 80 後才说的话」，应在规则内设定 `min_affinity: 80`。
- 同时符合多个日常规则时，系统只随机选一条；每条规则的 `bubble_interval_sec` 互不影响。
- `mood_settings` 会取代玩家目前的低饱食心情风险设定；只在需要提供完整玩法规则时放入。单纯新增对话文字时，可省略这个区块。
- `refresh_settings` 会取代玩家目前的刷新规则；请只在内容包确实有设计工作或商城轮替平衡时提供。工作与商城的每日上限会分开计算，商城刷新同时会将有限库存回补到商品的 `refresh_stock`。

### 打包与安全规则

- 将养成包 manifest 和 `assets/` 放在同一资料夹。不要使用 `C:\...` 等绝对路径。
- 完整桌宠包可在 `pet_config.json` 的 `care` 中保存 `state`、`shop_items`、`inventory`、`work_jobs`、`events`、`mood_settings`、`refresh_settings` 与 `mood_bubble_rules`；内建打包会把引用的商品图示与 WAV 音效复制到包内 `assets/`。
- 汇入时，系统只解析白名单 JSON 资料与允许的素材副档名；JSON 不会被当成程式码执行。
- `source`、`source_id`、`last_triggered_at` 由玩家端管理，不需要在创作者 manifest 中填写。
