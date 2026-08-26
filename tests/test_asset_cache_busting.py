from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
PAGES = (
    "404.html",
    "creator-json.html",
    "index.html",
    "make-your-pet.html",
    "privacy.html",
    "streamer-mode.html",
    "support.html",
    "terms.html",
)
CURRENT_CSS_URL = "assets/css/site.css?v=20260826-03"


class AssetCacheBustingTests(unittest.TestCase):
    def test_every_page_uses_the_current_stylesheet_cache_key(self) -> None:
        for page in PAGES:
            with self.subTest(page=page):
                html = (ROOT / page).read_text(encoding="utf-8")
                self.assertIn(CURRENT_CSS_URL, html)
                self.assertNotIn("assets/css/site.css?v=20260817-02", html)


if __name__ == "__main__":
    unittest.main()
