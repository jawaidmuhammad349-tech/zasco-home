"""Print helpers for the Cobalt Edition brand guide (called by build.js).

  python3 print_tools.py fonts            static font instances -> fonts/
  python3 print_tools.py finish PDF MM    set PDF metadata, and TrimBox/BleedBox
                                          when the file has MM millimetres of bleed

Needs: pip install fonttools brotli pypdf

Why static fonts: Chromium embeds variable fonts in a PDF as Type 3 fonts,
which print-shop preflight checks often reject. Pinning each weight to a
static instance makes Chromium embed normal TrueType subsets instead.
"""

import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SITE_FONTS = HERE.parent.parent / "web-cobalt" / "app" / "fonts"
OUT_FONTS = HERE / "fonts"

# family file prefix, source variable font, optical size, weights used by the guide
INSTANCES = [
    ("Bricolage", "bricolage-grotesque-latin-opsz-normal.woff2", 96, [500, 600, 700, 800]),
    ("DMSans", "dm-sans-latin-opsz-normal.woff2", 14, [400, 500, 600, 700]),
]


def fonts():
    from fontTools.ttLib import TTFont
    from fontTools.varLib import instancer

    OUT_FONTS.mkdir(exist_ok=True)
    for prefix, src, opsz, weights in INSTANCES:
        for w in weights:
            out = OUT_FONTS / f"{prefix}-{w}.ttf"
            if out.exists():
                continue
            font = TTFont(SITE_FONTS / src)
            try:
                inst = instancer.instantiateVariableFont(font, {"opsz": opsz, "wght": w}, updateFontNames=True)
            except Exception:
                inst = instancer.instantiateVariableFont(TTFont(SITE_FONTS / src), {"opsz": opsz, "wght": w})
            inst.flavor = None
            inst.save(out)
            print(f"  font {out.name}")


def finish(pdf_path, bleed_mm):
    from pypdf import PdfReader, PdfWriter
    from pypdf.generic import RectangleObject

    pt = 72 / 25.4
    bleed = float(bleed_mm) * pt
    tw, th = 297 * pt, 210 * pt  # A4 landscape trim
    reader = PdfReader(pdf_path)
    writer = PdfWriter(clone_from=reader)
    for page in writer.pages:
        # Chromium rounds the paper size up by up to 1 pt, leaving a hairline at
        # the right and bottom edges. Content starts at the top-left corner, so
        # cut the page back to the exact size from there.
        x0, _, _, y1 = (float(v) for v in page.mediabox)
        media = RectangleObject([x0, y1 - th - 2 * bleed, x0 + tw + 2 * bleed, y1])
        trim = RectangleObject([x0 + bleed, y1 - th - bleed, x0 + bleed + tw, y1 - bleed])
        page.mediabox = media
        page.cropbox = media
        page.bleedbox = media
        page.trimbox = trim
        page.artbox = trim
    writer.add_metadata({
        "/Title": "Zasco Home Brand Guidelines, Cobalt Edition (US)",
        "/Author": "Zasco Home",
        "/Subject": "Brand guidelines, A4 landscape" + (f", {bleed_mm} mm bleed" if bleed else ""),
    })
    with open(pdf_path, "wb") as f:
        writer.write(f)
    print(f"  finished {Path(pdf_path).name}" + (f" (trim box set, {bleed_mm} mm bleed)" if bleed else ""))


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "fonts":
        fonts()
    elif cmd == "finish":
        finish(sys.argv[2], sys.argv[3])
    else:
        sys.exit(__doc__)
