#!/usr/bin/env python3
"""Small dependency-free release check for the Desktop Pet Studio static site."""

from __future__ import annotations

import argparse
import re
import sys
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
PAGES = ("index.html", "creator-json.html", "privacy.html", "terms.html", "support.html", "404.html")
PUBLIC_DOCUMENTS = (
    "docs/workshop-creator-json-guide.zh-Hant.md",
    "docs/workshop-creator-json-guide.en.md",
)
REQUIRED_ASSETS = (
    "assets/css/site.css",
    "assets/js/site.js",
    "assets/images/hero-pixel-studio.png",
    "assets/images/app-icon.png",
    "sitemap.xml",
)
FORBIDDEN_SECRET_MARKERS = ("GOCSPX-", "client_secret", "oauth_client.json", "refresh_token")


class AssetReferenceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.sources: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for name, value in attrs:
            if name == "src" and value:
                self.sources.append(value)


def fail(errors: list[str], message: str) -> None:
    errors.append(message)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--require-publish-config", action="store_true")
    parser.add_argument("--require-oauth-config", action="store_true")
    args = parser.parse_args()
    errors: list[str] = []

    for relative_path in (*PAGES, *PUBLIC_DOCUMENTS, *REQUIRED_ASSETS, "site.config.js"):
        if not (ROOT / relative_path).is_file():
            fail(errors, f"Missing required file: {relative_path}")

    if errors:
        print("Site validation failed:")
        print("\n".join(f"- {error}" for error in errors))
        return 1

    page_text = {page: (ROOT / page).read_text(encoding="utf-8") for page in PAGES}
    for page, text in page_text.items():
        for token in ("privacy.html", "terms.html", "support.html", "site.js", "site.css"):
            if token not in text:
                fail(errors, f"{page} does not reference {token}")
        for language in ("zh-Hant", "zh-Hans", "en"):
            if f'data-lang-content="{language}"' not in text:
                fail(errors, f"{page} is missing {language} content")
        parser = AssetReferenceParser()
        parser.feed(text)
        for source in parser.sources:
            if source.startswith(("https://", "http://", "data:")):
                continue
            if not ((ROOT / page).parent / source).is_file():
                fail(errors, f"{page} references a missing asset: {source}")

    stylesheet = (ROOT / "assets/css/site.css").read_text(encoding="utf-8")
    for source in re.findall(r"url\((?:['\"])?([^'\")]+)", stylesheet):
        if source.startswith("data:"):
            continue
        if not ((ROOT / "assets/css") / source).resolve().is_file():
            fail(errors, f"site.css references a missing asset: {source}")

    homepage = page_text["index.html"]
    purpose_statements = (
        "DesktopPetStudio 是 Windows 桌面寵物應用程式。",
        "DesktopPetStudio 是 Windows 桌面宠物应用程序。",
        "DesktopPetStudio is a Windows desktop-pet app.",
    )
    if not all(statement in homepage for statement in purpose_statements):
        fail(errors, "index.html must clearly state the DesktopPetStudio application purpose")
    if "Desktop Pet Studio" in homepage:
        fail(errors, "index.html uses a brand name that differs from the OAuth application name")

    privacy = page_text["privacy.html"]
    for token in ("calendar.events.readonly", "Windows DPAPI", "Google", "local"):
        if token not in privacy:
            fail(errors, f"privacy.html is missing expected OAuth disclosure: {token}")

    all_text = "\n".join((ROOT / path).read_text(encoding="utf-8", errors="ignore") for path in PAGES + PUBLIC_DOCUMENTS + ("site.config.js",))
    for marker in FORBIDDEN_SECRET_MARKERS:
        if marker.lower() in all_text.lower():
            fail(errors, f"Potential secret marker found in public site: {marker}")

    if args.require_publish_config or args.require_oauth_config:
        config = (ROOT / "site.config.js").read_text(encoding="utf-8")
        required_keys = ("publisherName", "supportUrl", "githubRepository", "publicSiteUrl")
        if args.require_oauth_config:
            required_keys += ("supportEmail", "customDomain")
        for key in required_keys:
            match = re.search(rf'{key}:\s*"([^"]*)"', config)
            if not match or not match.group(1) or "REPLACE_WITH_" in match.group(1):
                fail(errors, f"Set a real public value for site.config.js:{key} before deployment")
        email = re.search(r'supportEmail:\s*"([^"]*)"', config)
        domain = re.search(r'customDomain:\s*"([^"]*)"', config)
        repository = re.search(r'githubRepository:\s*"([^"]*)"', config)
        public_site_url = re.search(r'publicSiteUrl:\s*"([^"]*)"', config)
        support_url = re.search(r'supportUrl:\s*"([^"]*)"', config)
        if args.require_oauth_config and email and "@" not in email.group(1):
            fail(errors, "supportEmail must be a valid public email address")
        if args.require_oauth_config and domain and "." not in domain.group(1):
            fail(errors, "customDomain must be a domain name")
        if repository and not re.fullmatch(r"[^/\s]+/[^/\s]+", repository.group(1)):
            fail(errors, "githubRepository must use owner/repository format")
        if public_site_url and not re.fullmatch(r"https://[^\s]+", public_site_url.group(1)):
            fail(errors, "publicSiteUrl must be an HTTPS URL")
        if support_url and not re.fullmatch(r"https://[^\s]+", support_url.group(1)):
            fail(errors, "supportUrl must be an HTTPS URL")
        for filename in ("robots.txt", "sitemap.xml"):
            if "REPLACE_WITH_" in (ROOT / filename).read_text(encoding="utf-8"):
                fail(errors, f"Replace the placeholder domain in {filename} before deployment")

    if errors:
        print("Site validation failed:")
        print("\n".join(f"- {error}" for error in errors))
        return 1

    print("Site validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
