from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "assets" / "js" / "site.js"


class LaunchLocalTimeTests(unittest.TestCase):
    def test_prelaunch_copy_formats_the_release_date_in_the_viewers_timezone(self) -> None:
        script = SCRIPT.read_text(encoding="utf-8")

        self.assertIn("function formatLocalLaunchDate(", script)
        self.assertRegex(script, re.compile(r"planned:\s*\(localTime\)\s*=>"))
        self.assertIn("copy.planned(formatLocalLaunchDate())", script)

    def test_prelaunch_date_uses_a_zero_padded_month_and_day_without_the_year(self) -> None:
        script = SCRIPT.read_text(encoding="utf-8")
        formatter = script[
            script.index("function formatLocalLaunchDate(") : script.index("const launchCopy")
        ]

        self.assertIn('month: "2-digit"', formatter)
        self.assertIn('day: "2-digit"', formatter)
        self.assertIn('month + " / " + day', formatter)
        self.assertNotIn('year: "numeric"', formatter)
        self.assertNotIn('hour: "numeric"', formatter)
        self.assertNotIn('timeZoneName:', formatter)


if __name__ == "__main__":
    unittest.main()
