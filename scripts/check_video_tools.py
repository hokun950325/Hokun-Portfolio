import importlib.util

print("imageio_ffmpeg", bool(importlib.util.find_spec("imageio_ffmpeg")))
print("ffmpeg", bool(importlib.util.find_spec("ffmpeg")))
