from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]
STYLESHEET = ROOT / "assets" / "css" / "site.css"


def mobile_media_block(css: str) -> str:
    start = css.index("@media (max-width: 600px)")
    next_media = css.find("@media", start + 1)
    return css[start : next_media if next_media != -1 else len(css)]


class MobileHeaderFixedTests(unittest.TestCase):
    def test_mobile_header_stays_fixed_without_covering_the_page_start(self) -> None:
        css = STYLESHEET.read_text(encoding="utf-8")
        mobile_styles = mobile_media_block(css)

        self.assertRegex(mobile_styles, re.compile(r"body\s*\{\s*padding-top:\s*64px;\s*\}"))
        self.assertRegex(
            mobile_styles,
            re.compile(
                r"\.site-header\s*\{[^}]*position:\s*fixed;[^}]*top:\s*0;[^}]*right:\s*0;[^}]*left:\s*0;[^}]*width:\s*100%;",
                re.DOTALL,
            ),
        )


if __name__ == "__main__":
    unittest.main()
