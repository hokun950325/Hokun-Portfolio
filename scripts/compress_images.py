from pathlib import Path
import os

from PIL import Image


ROOT = Path(r"C:\Users\Administrator\Documents\骗作品集\public")


def process(src, dst, max_width, quality, fmt, keep_original=False):
    image = Image.open(src)
    if image.width > max_width:
        height = round(image.height * max_width / image.width)
        image = image.resize((max_width, height), Image.LANCZOS)
    if image.mode not in ("RGB", "L"):
        image = image.convert("RGB")

    save_kwargs = {"quality": quality, "optimize": True}
    if fmt == "JPEG":
        save_kwargs["progressive"] = True
    image.save(dst, format=fmt, **save_kwargs)

    print(f"{dst} {os.path.getsize(dst) / 1024:.0f}KB")
    if not keep_original and Path(src).resolve() != Path(dst).resolve():
        os.remove(src)


detail_dir = ROOT / "images" / "detail"
for index in range(1, 9):
    src = detail_dir / f"detail-{index:02d}.jpg"
    if src.exists():
        process(src, src, 750, 70, "JPEG", keep_original=True)

ambassador_dir = ROOT / "images" / "ambassador"
conversions = [
    ("ambassador-cover-1.jpg", "ambassador-cover-1.webp", 900, 82),
    ("ambassador-cover-2.jpg", "ambassador-cover-2.webp", 1200, 82),
    ("ambassador-main-template.jpg", "ambassador-main-template.webp", 900, 82),
    ("ambassador-live.jpg", "ambassador-live.webp", 1600, 82),
    ("ambassador-banner.jpg", "ambassador-banner.webp", 1600, 80),
]
for old_name, new_name, max_width, quality in conversions:
    src = ambassador_dir / old_name
    dst = ambassador_dir / new_name
    if src.exists():
        process(src, dst, max_width, quality, "WEBP")

hero = ROOT / "images" / "hero-character.jpg"
hero_webp = ROOT / "images" / "hero-character.webp"
if hero.exists():
    process(hero, hero_webp, 1200, 85, "WEBP")

live_dir = ROOT / "images" / "live"
for index in range(1, 4):
    src = live_dir / f"live-room-{index:02d}.jpg"
    dst = live_dir / f"live-room-{index:02d}.webp"
    if src.exists():
        process(src, dst, 900, 82, "WEBP")

old_png = ROOT / "images" / "hero-character.png"
if old_png.exists():
    os.remove(old_png)
    print(f"removed {old_png}")
