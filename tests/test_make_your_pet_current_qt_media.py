from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "make-your-pet.html"
ASSETS = ROOT / "assets" / "images" / "make-pet"


class MakeYourPetCurrentQtMediaTests(unittest.TestCase):
    def test_four_steps_reference_current_qt_screenshots(self) -> None:
        """The published guide names current Qt controls and its four images."""

        html = PAGE.read_text(encoding="utf-8")
        expected = {
            "step-1-qt-ai-helper-entry.png",
            "step-2-qt-prompt-output.png",
            "step-3-qt-inspect-crop.png",
            "step-4-qt-pose-assets.png",
        }
        for filename in expected:
            self.assertTrue((ASSETS / filename).is_file(), filename)
            self.assertIn(filename, html)

        for control in (
            "\u6b65\u9a5f 1\uff1a\u6e96\u5099\u89d2\u8272\u53c3\u8003\u7d20\u6750",
            "\u8907\u88fd Prompt",
            "\u6aa2\u67e5\u7d20\u6750\u53bb\u80cc",
            "\u7de8\u8f2f\u59ff\u52e2",
        ):
            self.assertIn(control, html)

        self.assertNotIn("step-1-reference.png", html)
        self.assertNotIn("step-2-prompt-output.png", html)
        self.assertNotIn("step-3-asset-check.png", html)
        self.assertNotIn("step-4-import-pose.png", html)
