import os
import subprocess
import sys

import imageio_ffmpeg


ROOT = r"C:\Users\Administrator\Documents\作品集\public"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

VIDEO_TARGETS = [
    (r"videos\hero-background.mp4", 1280),
    (r"videos\kv1.mp4", 720),
    (r"videos\kv2.mp4", 720),
    (r"videos\aigc\aigc-product.mp4", 720),
    (r"videos\live\kangaroo-study.mp4", 720),
    (r"videos\live\kangaroo-skateboard.mp4", 720),
    (r"videos\live\kangaroo-badminton.mp4", 720),
    (r"videos\live\kangaroo-pencil.mp4", 720),
    (r"videos\live\room-toothpaste.mp4", 720),
    (r"videos\live\room-birdsnest.mp4", 720),
    (r"videos\live\room-sunscreen.mp4", 720),
]


def compress_video(relative_path: str, max_width: int) -> None:
    src = os.path.join(ROOT, relative_path)
    if not os.path.exists(src):
        print(f"missing {relative_path}")
        return
    temp = src + ".tmp.mp4"
    old_size = os.path.getsize(src)
    cmd = [
        FFMPEG,
        "-y",
        "-i",
        src,
        "-vf",
        f"scale={max_width}:-2",
        "-c:v",
        "libx264",
        "-preset",
        "veryfast",
        "-crf",
        "27",
        "-an",
        "-movflags",
        "+faststart",
        temp,
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0 or not os.path.exists(temp):
        print(f"failed {relative_path}: {result.stderr[-500:]}")
        return
    new_size = os.path.getsize(temp)
    os.replace(temp, src)
    print(
        f"{relative_path} {old_size/1024/1024:.2f}MB -> {new_size/1024/1024:.2f}MB"
    )


def make_detail_marquee_thumbs() -> None:
    for index in range(1, 9):
        src = os.path.join(ROOT, rf"images\detail\detail-{index:02d}.jpg")
        dst = os.path.join(ROOT, rf"images\detail\detail-thumb-{index:02d}.webp")
        if not os.path.exists(src):
            print(f"missing {src}")
            continue
        if os.path.exists(dst):
            continue
        cmd = [
            FFMPEG,
            "-y",
            "-i",
            src,
            "-vf",
            "crop=750:482:0:(ih-482)/2,scale=420:270",
            "-c:v",
            "libwebp",
            "-quality",
            "82",
            "-compression_level",
            "6",
            "-preset",
            "picture",
            dst,
        ]
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0 or not os.path.exists(dst):
            print(f"failed {dst}: {result.stderr[-500:]}")
            continue
        print(
            f"{os.path.basename(dst)} {os.path.getsize(dst)/1024:.1f}KB"
        )


def make_detail_card_thumbs() -> None:
    for index in range(1, 9):
        src = os.path.join(ROOT, rf"images\detail\detail-{index:02d}.jpg")
        dst = os.path.join(ROOT, rf"images\detail\detail-card-thumb-{index:02d}.webp")
        if not os.path.exists(src):
            print(f"missing {src}")
            continue
        if os.path.exists(dst):
            continue
        cmd = [
            FFMPEG,
            "-y",
            "-i",
            src,
            "-vf",
            "crop=750:1333:0:0,scale=420:746",
            "-c:v",
            "libwebp",
            "-quality",
            "82",
            "-compression_level",
            "6",
            "-preset",
            "picture",
            dst,
        ]
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0 or not os.path.exists(dst):
            print(f"failed {dst}: {result.stderr[-500:]}")
            continue
        print(
            f"{os.path.basename(dst)} {os.path.getsize(dst)/1024:.1f}KB"
        )


def make_aigc_webp() -> None:
    src = os.path.join(ROOT, r"images\aigc\aigc-02.jpg")
    dst = os.path.join(ROOT, r"images\aigc\aigc-02.webp")
    if not os.path.exists(src):
        print(f"missing {src}")
        return
    if os.path.exists(dst):
        return
    old_size = os.path.getsize(src)
    cmd = [
        FFMPEG,
        "-y",
        "-i",
        src,
        "-c:v",
        "libwebp",
        "-quality",
        "82",
        "-compression_level",
        "6",
        "-preset",
        "picture",
        dst,
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0 or not os.path.exists(dst):
        print(f"failed {dst}: {result.stderr[-500:]}")
        return
    new_size = os.path.getsize(dst)
    print(f"aigc-02.webp {old_size/1024/1024:.2f}MB -> {new_size/1024/1024:.2f}MB")


IMAGES_ONLY = "--images-only" in sys.argv

if not IMAGES_ONLY:
    for relative_path, max_width in VIDEO_TARGETS:
        compress_video(relative_path, max_width)

make_detail_marquee_thumbs()
make_detail_card_thumbs()
make_aigc_webp()
