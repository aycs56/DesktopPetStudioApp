from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "creator-json.html"
STYLES = ROOT / "assets" / "css" / "site.css"


class CreatorPackAlignmentTests(unittest.TestCase):
    def test_pack_card_identity_content_is_centered_without_centering_copy(self) -> None:
        """Each language shares centered card art, labels, and headings."""

        html = PAGE.read_text(encoding="utf-8")
        css = STYLES.read_text(encoding="utf-8")

        for language in ("zh-Hant", "zh-Hans", "en"):
            section_start = html.index(f'data-lang-content="{language}"', html.index('id="creator-capabilities"'))
            next_section = html.find('data-lang-content=', section_start + 1)
            section = html[section_start:] if next_section == -1 else html[section_start:next_section]
            self.assertEqual(section.count('creator-pack-card'), 5, language)

        self.assertRegex(
            css,
            re.compile(r"\.creator-pack-art\s*\{[^}]*margin:\s*0\s+auto\s+16px", re.DOTALL),
        )
        self.assertRegex(
            css,
            re.compile(
                r"\.creator-pack-card\s*>\s*\.creator-card-kicker\s*,\s*"
                r"\.creator-pack-card\s*>\s*h3\s*\{[^}]*text-align:\s*center",
                re.DOTALL,
            ),
        )
        self.assertRegex(
            css,
            re.compile(
                r"\.creator-pack-card\s*>\s*p:not\(\.creator-card-kicker\)\s*\{[^}]*text-align:\s*left",
                re.DOTALL,
            ),
        )

    def test_creator_tip_image_is_centered_in_each_language_panel(self) -> None:
        """The decorative tip pet stays centered without affecting sidebar copy."""

        html = PAGE.read_text(encoding="utf-8")
        css = STYLES.read_text(encoding="utf-8")

        self.assertEqual(html.count('<aside class="creator-aside"'), 3)
        self.assertEqual(html.count('src="assets/images/cat-ribbon.png"'), 3)
        self.assertRegex(
            css,
            re.compile(
                r"\.creator-aside\s*>\s*img\s*\{[^}]*display:\s*block;[^}]*margin:\s*0\s+auto",
                re.DOTALL,
            ),
        )
