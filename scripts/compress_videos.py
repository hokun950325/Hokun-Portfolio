import os
import subprocess

import imageio_ffmpeg


ROOT = r"C:\Users\Administrator\Documents\作品集\public\videos"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

TARGETS = [
    ROOT + r"\kv1.mp4",
    ROOT + r"\kv2.mp4",
    ROOT + r"\aigc\aigc-product.mp4",
]

for src in TARGETS:
    if not os.path.exists(src):
        print(f"missing {src}")
        continue
    temp = src + ".tmp.mp4"
    old_size = os.path.getsize(src)
    cmd = [
        FFMPEG,
        "-y",
        "-i",
        src,
        "-c:v",
        "libx264",
        "-preset",
        "veryfast",
        "-crf",
        "28",
        "-c:a",
        "aac",
        "-b:a",
        "96k",
        "-movflags",
        "+faststart",
        temp,
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0 or not os.path.exists(temp):
        print(f"failed {src}: {result.stderr[-500:]}")
        continue
    new_size = os.path.getsize(temp)
    os.replace(temp, src)
    print(
        f"{os.path.basename(src)} {old_size/1024/1024:.1f}MB -> {new_size/1024/1024:.1f}MB"
    )
