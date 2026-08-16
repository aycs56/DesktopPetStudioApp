# Desktop Pet Studio Workshop JSON Creator Guide

Version: v1.2.0
Applies to: desktop pet packages and pose packages from Steam Workshop or manually added folders

## 1. Workshop Package Structure

A Workshop package is a folder that contains at least:

```text
MyPosePack/
  desktop_pet_studio_workshop.json
  assets/
    frame_01.png
    frame_02.png
    wave.wav
```

`desktop_pet_studio_workshop.json` is the entry file. Put images and sounds in `assets/` and reference them with relative paths so other players can load the package after subscribing.

You can also place a single JSON manifest directly inside the Workshop scan folder:

```text
WorkshopLibrary/
  test_pose.json
  assets/
    frame_01.png
    frame_02.png
    wave.wav
```

In this layout, `assets/frame_01.png` is resolved relative to the JSON file. If the JSON is stored at `config/test_pose.json`, the assets should be stored under `config/assets/`.

## 2. Single Pose Package Example

```json
{
  "schema_version": 1,
  "id": "my-wave-pose",
  "title": "Wave Hello",
  "type": "pose",
  "content_kind": "single_pose",
  "assets_mode": "bundled",
  "pose": {
    "name": "Wave Hello",
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
    "bubble_texts": ["Hi, I am here!", "Let's do our best today."],
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
      "name": "Wave Pose AI Guide",
      "pose_id": "wave",
      "zh": "請用我上傳的角色或風格參考圖，幫我製作桌寵揮手打招呼動畫。請輸出 6 張獨立透明背景 PNG，檔名 frame_01.png 到 frame_06.png；不要六宮格、不要 sprite sheet、不要文字、不要浮水印。",
      "en": "Use my uploaded character or style reference to create a waving desktop pet animation. Output six separate transparent-background PNG images named frame_01.png through frame_06.png; no grid, no sprite sheet, no text, no watermark."
    }
  ]
}
```

After import, `pose` becomes a custom right-click pose. The app generates a local pose id, so `pose.id` can be omitted.

## 3. Full Pet Package Example

A full pet package points the manifest to a saved `pet_config.json`:

```json
{
  "schema_version": 1,
  "id": "my-complete-pet",
  "title": "Luna Desktop Pet",
  "type": "pet",
  "content_kind": "full_pet",
  "config_path": "pet_config.json",
  "assets_mode": "bundled"
}
```

`pet_config.json` uses the same format as a player's saved pet profile. It may include base poses, right-click poses, reminders, Do Not Disturb settings, and hotkeys. The packaging tool removes Google OAuth/token paths and existing Workshop subscription records from shared full pet packages to avoid leaking local private settings.

A full pet package may provide `ai_asset_prompts`. If it does not, Desktop Pet Studio generates default AI Asset Guide entries from the poses in `pet_config.json`. The guide tells players to upload a character or style reference first, then generate matching pose assets.

## 4. Manifest Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `schema_version` | number | No | Recommended value: `1`, reserved for future compatibility. |
| `id` | string | No | Workshop item id. On Steam this may be the published file id. If omitted, the folder name is used. |
| `title` | string | No | Display name in the Workshop list. |
| `type` | string | Yes | `pose` or `pet`. |
| `content_kind` | string | No | `single_pose` or `full_pet`, useful for creator-side organization. |
| `assets_mode` | string | No | Recommended value: `bundled`, meaning the package includes its own assets. |
| `config_path` | string | Required for pet | Path to the full pet config, such as `pet_config.json`. |
| `pose` | object | Recommended for pose | Complete pose settings for a single pose package. |
| `animation_paths` | array | Legacy support | Older pose packages may list animation files at the manifest root. New packages should use `pose.animation_paths`. |
| `bubble_texts` | array | No | Older pose packages may list bubble lines at the manifest root. New packages should use `pose.bubble_texts`. |
| `sound_path` | string | No | Older pose packages may list a WAV sound at the manifest root. New packages should use `pose.sound_path`. |
| `ai_asset_prompts` | array | No | AI Asset Guide prompt templates. Pose packages appear directly; full pet packages appear as expandable groups. |

## 5. AI Asset Prompt Fields

`ai_asset_prompts` lets creators explain how players should use AI tools to extend the package. It supports multilingual fields. The player UI first uses the current language, then falls back to Chinese or English.

```json
"ai_asset_prompts": [
  {
    "id": "idle_prompt",
    "name": "Idle Rest Pose",
    "pose_id": "idle",
    "description": "Generate extra idle pose assets for this pet.",
    "zh": "請用我上傳的角色圖，製作原地休息姿勢。請輸出 6 張獨立透明背景 PNG，檔名 frame_01.png 到 frame_06.png；不要六宮格、不要 sprite sheet。",
    "zh_cn": "请用我上传的角色图，制作原地休息姿势。请输出 6 张独立透明背景 PNG，文件名 frame_01.png 到 frame_06.png；不要六宫格、不要 sprite sheet。",
    "en": "Use my uploaded character reference to create an idle resting pose. Output six separate transparent-background PNG images named frame_01.png through frame_06.png; no grid and no sprite sheet.",
    "ja": "アップロードしたキャラクター画像を使い、待機ポーズを作成してください。6枚の独立した透過PNGとして出力し、sprite sheetにはしないでください。"
  }
]
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | No | Prompt template id. The app generates one if omitted. |
| `name` | string | Recommended | Display name in the AI Asset Guide list. Using the pose name is recommended. |
| `pose_id` | string | No | Related pose id, useful for creator organization. |
| `description` | string | No | Short note for creators or players. |
| `zh`, `zh_cn`, `en`, `ja`, `fr`, `de`, `es`, `ru`, `pt`, `ko` | string | At least one | Multilingual prompt text. |

Notes:

- If a single pose package has `ai_asset_prompts`, the templates appear directly in the AI Asset Guide.
- If a full pet package has `ai_asset_prompts`, the AI Asset Guide shows an expandable group with the package title, then the pose prompts underneath it.
- If a full pet package does not have `ai_asset_prompts`, the app generates default prompts from the pose names in `pet_config.json`.
- The Workshop tab shows `Go to Guide` when prompts are available and `No Guide` when they are not.
- Prompt text should clearly request `six separate transparent-background PNG images`, a `256 x 256 px` canvas for every frame, the same canvas and bottom-center anchor across all six frames, `frame_01.png` through `frame_06.png`, no grid, no sprite sheet, no text, and no watermark.

## 6. Pose Fields

| Field | Type | Default | Effect |
| --- | --- | --- | --- |
| `name` | string | `Untitled Pose` | Name shown in the right-click menu and pose list after import. |
| `category` | string | `custom` | Workshop-imported poses are treated as `custom`. |
| `animation_paths` | array | `[]` | PNG/GIF/PPM/PGM animation paths. Relative paths such as `assets/frame_01.png` are recommended. |
| `playback_speed` | number | `1.0` | Animation playback multiplier, clamped from `0.25` to `4.0`. |
| `sound_path` | string | `""` | Optional WAV sound played when the right-click pose is called. |
| `hotkey` | string | `""` | Optional suggested hotkey, such as `F6` or `Ctrl+Alt+K`. Players can change it. |
| `hotkey_enabled` | boolean | `true` | Whether the suggested pose hotkey starts enabled. |
| `bubble_texts` | array | `[]` | Bubble text lines for this pose. The app chooses one randomly. |
| `bubble_interval_sec` | number | `45` | Auto bubble interval in seconds, minimum `1`. |
| `enabled` | boolean | `true` | Whether the pose starts enabled after import. |
| `live_mode_disabled` | boolean | `false` | Whether OBS dedicated capture excludes this pose. With OBS capture on, `false` plays and `true` skips it; when OBS capture is off, only `enabled` controls playback. |
| `movement` | object | disabled | Custom desktop pet movement. See the next section. |
| `twitch_trigger` | object | disabled | Optional Twitch Bits live trigger rule. See below. |
| `focus_key_speed_enabled` | boolean | `false` | Used by the `focus` base pose only. When enabled, a bubble shows the milliseconds between key presses. |
| `focus_key_speed_prefix` | string | `按鍵速度 ` | Used by `focus` only. Text before the calculated value and built-in `ms`. |
| `focus_key_speed_suffix` | string | `，主人手速快到出現殘影!!` | Used by `focus` only. Text after the calculated value and built-in `ms`. |

### Fixed Focus Game Mode

Full pet packages may define Fixed Focus Game Mode in `poses.focus`. When a player enables it from the pose workspace or beside Idle in the pet right-click menu, the pet stays at the position where it was enabled and does not walk, attach, or fall. Players can still left-drag it to a preferred position; after release, that new position remains fixed. Each key press restarts this pose animation. The bundled default bubble interval is 60 seconds. Supply six separate transparent PNG frames with a stable center point so the locked pet does not appear to shake.

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
  "focus_key_speed_prefix": "Key speed ",
  "focus_key_speed_suffix": ", that was fast!"
}
```

The app calculates only the time gap between key-down events. It never stores, shares, or writes the actual keys a player presses.

### Twitch Bits Live Pose Rules

Creators can add `twitch_trigger` to any base or custom pose. Once a player connects their own Twitch account, Bits in the configured range can trigger that pose. This is safe creator content: it never contains a Twitch account, authorization code, or token.

```json
"twitch_trigger": {
  "enabled": true,
  "min_bits": 100,
  "max_bits": 499,
  "duration_sec": 8,
  "bubble_texts": [
    "Thank you, {viewer_name}, for {amount} {currency}!",
    "{viewer_name} says: {viewer_message}"
  ]
}
```

| Field | Type | Default | Effect |
| --- | --- | --- | --- |
| `enabled` | boolean | `false` | Enables this Bits rule after import. |
| `min_bits` | number | `1` | Minimum Bits needed to trigger, at least `1`. |
| `max_bits` | number | `0` | Maximum Bits; use `0` for no upper limit. It cannot be lower than `min_bits`. |
| `duration_sec` | number | `8` | `1` to `60` seconds. How long the live pose plays before the pet returns to its previous action. |
| `bubble_texts` | array | `[]` | Dedicated lines; the app randomly picks one after a match. |

Bubble templates support `{viewer_name}`, `{viewer_message}`, `{amount}`, `{currency}`, `{platform}`, and `{event_type}`. If several rules overlap, the narrowest matching range wins. Subscribers must connect their own Twitch account in Streamer Mode; Workshop JSON must not and cannot include private Twitch authorization data.

## 7. Movement Fields

`movement` lets creators define how the desktop pet moves during a pose. Desktop Pet Studio accepts only allowlisted JSON fields and never executes code from Workshop packages.

Poses with horizontal movement automatically mirror to match the actual travel direction. Creators only need to provide PNG or GIF art facing right: `wander`, `patrol`, `hop`, `drift`, and `sequence` steps with horizontal movement are flipped at runtime while moving left. `shake`, idle, attached, and falling poses are not flipped automatically.

| Field | Type | Default | Range | Effect |
| --- | --- | --- | --- | --- |
| `enabled` | boolean | `false` | true/false | Enables this movement definition. |
| `mode` | string | `none` | See below | Movement mode. |
| `speed` | number | `1.0` | `0.1` to `4.0` | Movement speed multiplier. |
| `distance_px` | number | `180` | `0` to `2400` | Horizontal travel distance or shake strength. |
| `vertical_px` | number | `32` | `-1200` to `1200` | Vertical travel distance or jump height. Negative values can drift upward. |
| `duration_sec` | number | `8.0` | `0.1` to `120.0` | Reference duration for curved movement or sequences. |
| `loop` | boolean | `false` | true/false | Whether the movement repeats. |
| `gravity` | boolean | `true` | true/false | If `false`, natural falling is paused while this pose movement runs. |
| `steps` | array | `[]` | sequence only | Multi-step keyframes. |

### Movement Modes

| `mode` | Effect | Good for |
| --- | --- | --- |
| `none` | No movement. | Expressions and idle poses. |
| `wander` | Randomly chooses left or right targets and may move near screen edges. | Lively walking and exploration. |
| `patrol` | Moves left and right around the trigger position. | Guarding, patrolling, back-and-forth walking. |
| `hop` | Moves horizontally with a small arc. | Greeting, excitement, popping into view. |
| `shake` | Rapidly shakes in place. | Surprise, anger, reminders. |
| `drift` | Smoothly floats or glides. | Floating, magic, ghost-like motion. |
| `sequence` | Follows the `steps` keyframes. | Custom performances, jumps, slides, windups, and dashes. |

## 8. Sequence Steps

`sequence` defines movement with multiple keyframes. Each step is relative to the end of the previous step.

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

| Field | Type | Default | Range | Effect |
| --- | --- | --- | --- | --- |
| `dx` | number | `0` | `-2000` to `2000` | Horizontal offset for this step. Positive moves right; negative moves left. |
| `dy` | number | `0` | `-1200` to `1200` | Vertical offset for this step. Negative moves up; positive moves down. |
| `duration_ms` | number | `300` | `30` to `30000` | Step duration. |
| `easing` | string | `linear` | See below | Movement timing curve. |

### Easing

| `easing` | Effect |
| --- | --- |
| `linear` | Constant speed. |
| `ease_in` | Starts slowly and gets faster. |
| `ease_out` | Starts quickly and slows near the end. |
| `ease_in_out` | Slow at the start and end, faster in the middle. |

## 9. Common Movement Examples

### Lively Wander

```json
"movement": {
  "enabled": true,
  "mode": "wander",
  "speed": 1.4,
  "distance_px": 420,
  "gravity": true
}
```

### Surprised Shake

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

### Floating Character

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

### Short Patrol

```json
"movement": {
  "enabled": true,
  "mode": "patrol",
  "speed": 1.0,
  "distance_px": 260,
  "gravity": true
}
```

## 10. Recommended Values

- Most pose `playback_speed` values work well between `0.75` and `1.5`.
- Right-click pose `movement.duration_sec` is usually best from `1` to `4` seconds; longer actions may feel unresponsive.
- `shake.distance_px` usually looks best from `4` to `16`; larger values may look like teleporting.
- `hop.vertical_px` usually works well from `24` to `80`.
- `sequence` steps should usually be at least `120` ms to avoid abrupt motion.
- To make a pet float or jump without falling immediately, set `gravity` to `false`.

## 11. Common Mistakes

- Using local absolute paths such as `C:\...`: other players will not have those files. Use relative paths such as `assets/frame_01.png`.
- Placing a single JSON manifest in the scan folder but putting `assets` somewhere else: `assets` should be beside that JSON file.
- Exporting one six-panel image: Desktop Pet Studio needs separate PNG frames or a GIF. It does not cut sprite sheets automatically.
- Misspelling `mode`: unknown movement modes fall back to `none`.
- Misspelling `easing`: unknown easing values fall back to `linear`.
- Setting `distance_px` too high: the app keeps the pet on screen, but the motion may look like it snapped to an edge.
- Forgetting to turn off `gravity`: jump or float actions may switch into the falling pose and return to the area above the taskbar.

## 12. Care Content JSON (v1.1)

Creators can share shop items, work jobs, and events as a separate package, or include them in the `care` section of `pet_config.json` in a full pet package. A separate care package uses `type: "care"`. Players see its import availability in the Workshop list and use **Import Care** to add it to the currently open pet profile.

```json
{
  "schema_version": 1,
  "id": "orange-cat-care-pack",
  "title": "Orange Cat Tea-Time Jobs",
  "type": "care",
  "content_kind": "care",
  "assets_mode": "bundled",
  "shop_items": [
    {
      "id": "tuna_cookie",
      "name": "Tuna Cookie",
      "description": "A small snack that restores hunger.",
      "category": "food",
      "rarity": "common",
      "price": 18,
      "hunger_delta": 20,
      "affinity_delta": 2,
      "mood_delta": 4,
      "coin_delta": 0,
      "icon_path": "assets/tuna_cookie.png",
      "sound_path": "assets/crunch.wav",
      "bubble_texts": ["Crunchy, I love it!"],
      "affinity_bubble_rules": [
        {
          "id": "tuna_cookie_trusted",
          "name": "Trusted Treat",
          "min_affinity": 80,
          "max_affinity": 100,
          "bubble_texts": ["You remembered my favorite again!"]
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
      "name": "Tea Shop Helper",
      "description": "Tidy the tea counter for a short shift.",
      "duration_minutes": 5,
      "coin_reward": 35,
      "hunger_cost": 6,
      "affinity_delta": 2,
      "mood_delta": -6,
      "mood_risk_percent": 45,
      "bubble_texts": ["The tea counter is tidy!"],
      "enabled": true,
      "sort_order": 10
    }
  ],
  "care_events": [
    {
      "id": "hungry_nudge",
      "name": "Hungry Nudge",
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
      "bubble_texts": ["Do you have a little snack?"],
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
      "name": "Happy Mood",
      "min_hunger": 80,
      "max_hunger": 100,
      "min_affinity": 80,
      "max_affinity": 100,
      "min_mood": 70,
      "max_mood": 100,
      "bubble_texts": ["I want to play with you today!", "I'm in a great mood. Tell me about your day."],
      "bubble_interval_sec": 180,
      "enabled": true
    }
  ]
}
```

### Supported Fields and Bounds

| Section | Fields | Behavior and bounds |
| --- | --- | --- |
| `shop_items` | `id`, `name`, `description` | A unique item identifier and player-facing text. Importing the same `id` updates the existing item. |
| `shop_items` | `category`, `rarity` | Categories: `food`, `gift`, `collectible`. Rarities: `common`, `uncommon`, `rare`, `epic`. Unknown values use the safe defaults. |
| `shop_items` | `price`, `hunger_delta`, `affinity_delta`, `mood_delta`, `coin_delta` | Price: `0..999999`; hunger, affinity, and mood: `-100..100`; coins: `-999999..999999`. Coins are in-game only. |
| `shop_items` | `icon_path`, `sound_path` | Paths are relative to the manifest. Icons accept PNG/GIF/PPM/PGM; sounds accept WAV only. |
| `shop_items` | `bubble_texts`, `affinity_bubble_rules`, `enabled`, `stock`, `refresh_stock`, `refresh_group`, `sort_order` | `affinity_bubble_rules` is a conditional post-use response. A matching reaction bubble takes priority. `stock: -1` means unlimited and `0` means sold out. `refresh_stock` is the finite stock restored by a Shop refresh, bounded by `-1..9999`; when omitted, it uses `stock`. Sorting accepts `-9999..9999`. |
| `work_jobs` | `id`, `name`, `description` | A unique job identifier and player-facing text. Importing the same `id` updates the existing job. |
| `work_jobs` | `duration_minutes`, `coin_reward`, `hunger_cost`, `affinity_delta`, `mood_delta`, `mood_risk_percent` | Bounds: `1..480`, `0..99999`, `0..100`, `-100..100`, `-100..100`, and `0..100`. Negative mood effects apply according to `mood_risk_percent`, useful for demanding work. |
| `work_jobs` | `bubble_texts`, `enabled`, `sort_order` | Work can display a bubble when it starts or completes. |
| `care_events` | `id`, `name`, `trigger` | Supported triggers: `startup`, `hunger_low`, `hunger_high`, `affinity_low`, `affinity_high`, `mood_low`, `mood_high`, `work_complete`, `item_used`. |
| `care_events` | `min_hunger`, `max_hunger`, `min_affinity`, `max_affinity`, `min_mood`, `max_mood` | Each is `0..100`; every threshold must match before an event triggers. |
| `care_events` | `hunger_delta`, `affinity_delta`, `mood_delta`, `coin_delta`, `bubble_texts`, `cooldown_minutes`, `enabled` | Effects apply when triggered. `cooldown_minutes` is `0..1440` to prevent repeated events every 15-second tick. |
| `mood_settings` | `low_hunger_threshold`, `low_hunger_delay_minutes`, `low_hunger_check_minutes` | Controls prolonged-hunger mood risk. Bounds: `0..100`, `1..1440`, and `1..1440`. |
| `mood_settings` | `low_hunger_drop_chance`, `low_hunger_drop_min`, `low_hunger_drop_max` | Per-check chance and loss amount. Chance is `0..100`; loss values are `1..100`. |
| `refresh_settings` | `work_daily_limit`, `shop_daily_limit` | Separate daily refresh limits for Work and Shop, each bounded by `0..99`; they reset when the local date changes. |
| `refresh_settings` | `work_offer_count`, `shop_offer_count` | Visible offer counts for Work and Shop, bounded by `1..24` and `1..48`. Refresh picks again from enabled content. |
| `mood_bubble_rules` | `id`, `name`, `min_hunger/max_hunger`, `min_affinity/max_affinity`, `min_mood/max_mood` | A rule is eligible only when all `0..100` ranges match. |
| `mood_bubble_rules` | `bubble_texts`, `bubble_interval_sec`, `enabled` | The app randomly chooses from the text lines. Each rule has its own `15..86400` second interval. |

### Affinity Reactions and Mood Dialogue Rules

- `affinity_bubble_rules` and `mood_bubble_rules` share the same conditional range format. The former is checked after that item is used; the latter is checked during the regular care tick.
- An item applies its stat changes before its affinity reaction is checked. To make a line unlock at affinity 80, set `min_affinity` to `80`.
- If several everyday dialogue rules match, the app randomly selects one. Their `bubble_interval_sec` timers are independent.
- `mood_settings` replaces the player's current prolonged-hunger risk settings. Omit it when your package only adds dialogue text.
- `refresh_settings` replaces the player's current refresh rules. Include it only when your package intentionally defines Work or Shop rotation and balance. Work and Shop use separate daily allowances, and Shop refresh restores finite stock to each item's `refresh_stock`.

### Packaging and Safety

- Keep the care manifest and its `assets/` directory together. Never use absolute paths such as `C:\...`.
- A full pet package may keep `state`, `shop_items`, `inventory`, `work_jobs`, `events`, `mood_settings`, `refresh_settings`, and `mood_bubble_rules` inside `care` in `pet_config.json`. Built-in full-pet export copies referenced care icons and WAV files into its `assets/` directory.
- The app parses only allowlisted JSON data and allowed asset extensions. It never executes JSON as code.
- `source`, `source_id`, and `last_triggered_at` are maintained by the player's local profile and should be omitted from creator manifests.
