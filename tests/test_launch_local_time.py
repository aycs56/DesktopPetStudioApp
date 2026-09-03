import json
import re
import subprocess
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "assets" / "js" / "site.js"
HOME = ROOT / "index.html"


class LaunchLocalTimeTests(unittest.TestCase):
    def test_prelaunch_banner_uses_the_rescheduled_date_before_the_offer_begins(self) -> None:
        """A 9/4 Taipei visitor must not see the offer countdown for a 9/8 launch."""
        node_program = r'''
const fs = require("fs");
const vm = require("vm");

const source = fs.readFileSync("assets/js/site.js", "utf8");
const instrumented = source.replace(
  "  function setupLaunchCountdown() {",
  "  window.__updateLaunchCountdownForTest = updateLaunchCountdown;\n\n  function setupLaunchCountdown() {"
);
if (instrumented === source) throw new Error("Could not expose launch updater for test");

const states = ["zh-Hant", "zh-Hans", "en"].map((language) => ({
  dataset: { langContent: language },
  textContent: "",
}));
const document = {
  querySelectorAll(selector) {
    if (selector === "[data-launch-state]") return states;
    if (selector === ".hero-launch-strip") return [{ classList: { toggle() {} } }];
    return [];
  },
  addEventListener() {},
};
const TestDate = Date;
TestDate.now = () => Date.parse("2026-09-04T12:00:00+08:00");
const window = {};
vm.runInNewContext(instrumented, { window, document, Date: TestDate, Intl });
window.__updateLaunchCountdownForTest();
process.stdout.write(JSON.stringify(states.map((element) => element.textContent)));
'''

        result = subprocess.run(
            ["node", "-e", node_program],
            cwd=ROOT,
            check=True,
            capture_output=True,
        )
        copy = json.loads(result.stdout.decode("utf-8"))

        self.assertIn("09 / 08", copy[0])
        self.assertIn("09 / 08", copy[1])
        self.assertEqual(copy[2], "Planned Steam release: 09 / 08")
        self.assertNotIn("Launch offer ends in", copy[2])

    def test_no_javascript_fallback_labels_use_the_rescheduled_date(self) -> None:
        html = HOME.read_text(encoding="utf-8")

        fallback_labels = re.findall(
            r'<span class="hero-launch-date" data-launch-state[^>]*>([^<]+)</span>',
            html,
        )

        self.assertEqual(len(fallback_labels), 3)
        self.assertTrue(all("09 / 08" in label for label in fallback_labels))

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
