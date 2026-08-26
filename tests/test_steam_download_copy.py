from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
HOME = ROOT / "index.html"


class SteamDownloadCopyTests(unittest.TestCase):
    def test_homepage_does_not_repeat_steam_price_or_discount_copy_below_the_widget(self) -> None:
        html = HOME.read_text(encoding="utf-8")

        self.assertNotIn("steam-download-note", html)
        self.assertNotIn("價格、首發優惠與可用狀態會由 Steam 即時顯示。", html)


if __name__ == "__main__":
    unittest.main()
