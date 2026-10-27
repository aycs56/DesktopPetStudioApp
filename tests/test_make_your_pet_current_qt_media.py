from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "make-your-pet.html"
ASSETS = ROOT / "assets" / "images" / "make-pet" / "v1.3.0"
LANGUAGES = ("zh-Hant", "zh-Hans", "en")
SCREENSHOTS = (
    "step-1-qt-ai-helper-entry",
    "step-2-qt-prompt-output",
    "step-3-qt-inspect-crop",
    "step-4-qt-pose-assets",
)


class MakeYourPetCurrentQtMediaTests(unittest.TestCase):
    def test_four_steps_reference_current_qt_screenshots(self) -> None:
        """The published guide names current Qt controls and its four images."""

        html = PAGE.read_text(encoding="utf-8")
        expected = {
            f"{screenshot}-{language}.png"
            for screenshot in SCREENSHOTS
            for language in LANGUAGES
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

    def test_all_steps_use_matching_app_screenshots_per_language(self) -> None:
        """Every step must show the current UI in the reader's language."""

        html = PAGE.read_text(encoding="utf-8")
        flow = html[html.index('<section class="section make-pet-flow"'):]
        for language in LANGUAGES:
            start = flow.index(f'data-lang-content="{language}"')
            end = flow.find("data-lang-content=", start + 1)
            section = flow[start:] if end == -1 else flow[start:end]
            for screenshot in SCREENSHOTS:
                self.assertIn(f"assets/images/make-pet/v1.3.0/{screenshot}-{language}.png", section, language)

        self.assertNotIn("step-1-reference.png", html)
        self.assertNotIn("step-2-prompt-output.png", html)
        self.assertNotIn("step-3-asset-check.png", html)
        self.assertNotIn("step-4-import-pose.png", html)
        self.assertNotIn("step-4-qt-pose-assets.png", html)
