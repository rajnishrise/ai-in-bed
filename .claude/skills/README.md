# Video skills

Skills Claude loads when it makes videos (Instagram reels) for AI in Bed. They change nothing on the website.

| Skill | What it covers | Source | License |
|---|---|---|---|
| remotion-markup | Animation, transitions, effects, audio, fonts, timing in Remotion | [remotion-dev/skills](https://github.com/remotion-dev/skills) @ 30d4553 (maps sub-skill left out) | Remotion's terms, see https://remotion.dev/license |
| remotion-create | Scaffolding a Remotion project, video layout rules | same | same |
| remotion-captions | Caption JSON, transcribing, animated captions | same | same |
| remotion-render | Rendering videos and stills | same | same |
| remotion-toolkit | Motion craft rules, custom transitions (glitch, light leak, zoom blur, ...) in `transitions/` | [digitalsamba/claude-code-video-toolkit](https://github.com/digitalsamba/claude-code-video-toolkit) @ 29995dc | MIT |
| ffmpeg | FFmpeg recipes for prep and platform export | same | MIT |

Remotion is free for individuals and companies with up to 3 employees; larger companies need a company license.

To update, re-copy from the upstream repos (`npx skills add remotion-dev/skills` gets the latest official skills).
