from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]
HOME = ROOT / "index.html"
STREAMER_PAGE = ROOT / "streamer-mode.html"
STYLES = ROOT / "assets" / "css" / "site.css"


class StreamerSceneLayoutTests(unittest.TestCase):
    def test_traditional_chinese_homepage_uses_a_localized_subscription_chip(self) -> None:
        html = HOME.read_text(encoding="utf-8")
        start = html.index('data-lang-content="zh-Hant"', html.index('id="streamer-mode"'))
        end = html.index('data-lang-content="zh-Hans"', start)
        traditional_chinese = html[start:end]

        self.assertIn('streamer-chip-sub">訂閱 T1</span>', traditional_chinese)
        self.assertNotIn('streamer-chip-sub">SUB T1</span>', traditional_chinese)

    def test_shared_streamer_scene_places_bubble_above_and_pet_closer_to_center(self) -> None:
        css = STYLES.read_text(encoding="utf-8")
        streamer_html = STREAMER_PAGE.read_text(encoding="utf-8")

        self.assertIn('class="streamer-scene streamer-hero-scene"', streamer_html)
        self.assertRegex(
            css,
            re.compile(r"\.streamer-pet\s*\{[^}]*right:\s*28%;[^}]*bottom:\s*9%", re.DOTALL),
        )
        self.assertRegex(
            css,
            re.compile(r"\.streamer-bubble\s*\{[^}]*top:\s*15%;", re.DOTALL),
        )
        self.assertRegex(
            css,
            re.compile(r"\.streamer-pet\s*\{[^}]*right:\s*26%;[^}]*width:\s*152px", re.DOTALL),
        )
        self.assertRegex(
            css,
            re.compile(
                r"\.streamer-hero-scene\s+\.streamer-bubble\s*\{[^}]*top:\s*15%;",
                re.DOTALL,
            ),
        )


if __name__ == "__main__":
    unittest.main()
