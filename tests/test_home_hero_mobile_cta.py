from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
HOME = ROOT / "index.html"
STYLESHEET = ROOT / "assets" / "css" / "site.css"


class HomeHeroMobileCtaTests(unittest.TestCase):
    def test_homepage_hero_steam_cta_is_hidden_in_mobile_styles(self) -> None:
        html = HOME.read_text(encoding="utf-8")
        css = STYLESHEET.read_text(encoding="utf-8")

        self.assertEqual(3, html.count('class="button button-steam"'))
        mobile_start = css.index("@media (max-width: 600px)")
        next_media = css.find("@media", mobile_start + 1)
        mobile_styles = css[mobile_start : next_media if next_media != -1 else len(css)]

        self.assertIn(".hero-actions .button-steam { display: none; }", mobile_styles)


if __name__ == "__main__":
    unittest.main()
