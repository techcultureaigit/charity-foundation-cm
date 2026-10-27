from PIL import Image
import os

# Re-copy originals from assets first if needed — we overwrite uploads.
# Prefer latest uploads; crop deeper into rounded-card content.

dir_path = r"d:\sewa-sankalp-foundation\sewa-sankalp\website\public\uploads"
asset_map = {
    "focus-card-women.png": r"C:\Users\owner\.cursor\projects\d-sewa-sankalp-foundation\assets\gemini_generated_image_cckfpycckfpycckf_1024-5ced67e7-21ee-4e54-9d97-7c37457c64d0.png",
    "focus-card-child.png": r"C:\Users\owner\.cursor\projects\d-sewa-sankalp-foundation\assets\gemini_generated_image_iconfaiconfaicon_1024-262d24ab-9549-44f5-91da-37c924baf863.png",
    "focus-card-education.png": r"C:\Users\owner\.cursor\projects\d-sewa-sankalp-foundation\assets\gemini_generated_image_m3aie5m3aie5m3ai_1024-f0feb381-4cea-4ade-ab90-43754bd7cdbd.png",
    "focus-card-welfare.png": r"C:\Users\owner\.cursor\projects\d-sewa-sankalp-foundation\assets\gemini_generated_image_7rz4vq7rz4vq7rz4_1024-baebf15e-e527-42f3-9af8-8bb7c51678cb.png",
}


def crop_card(im: Image.Image) -> Image.Image:
    rgba = im.convert("RGBA")
    w, h = rgba.size
    px = rgba.load()
    corners = [px[2, 2], px[w - 3, 2], px[2, h - 3], px[w - 3, h - 3]]
    bg = tuple(sum(c[i] for c in corners) // 4 for i in range(4))

    def is_bg(p, tol=22):
        return all(abs(p[i] - bg[i]) <= tol for i in range(3))

    top = 0
    while top < h and all(is_bg(px[x, top]) for x in range(0, w, 3)):
        top += 1
    bottom = h - 1
    while bottom > top and all(is_bg(px[x, bottom]) for x in range(0, w, 3)):
        bottom -= 1
    left = 0
    while left < w and all(is_bg(px[left, y]) for y in range(top, bottom + 1, 3)):
        left += 1
    right = w - 1
    while right > left and all(is_bg(px[right, y]) for y in range(top, bottom + 1, 3)):
        right -= 1

    # Deep inset past rounded corners + soft shadow (~4–5% each side)
    inset_x = max(14, int((right - left) * 0.035))
    inset_y = max(12, int((bottom - top) * 0.045))
    left = left + inset_x
    top = top + inset_y
    right = right - inset_x
    bottom = bottom - inset_y

    return rgba.crop((left, top, right + 1, bottom + 1)).convert("RGB")


for name, asset in asset_map.items():
    src_im = Image.open(asset)
    out = crop_card(src_im)
    out_path = os.path.join(dir_path, name)
    out.save(out_path, "PNG", optimize=True)
    print(f"{name}: {src_im.size} -> {out.size}")
    w, h = out.size
    print(
        "  corners",
        out.getpixel((3, 3)),
        out.getpixel((w - 4, 3)),
        out.getpixel((w - 4, h - 4)),
    )
