from pathlib import Path
from PIL import Image

src = Path(
    r"C:\Users\owner\.cursor\projects\d-sewa-sankalp-foundation\assets\image-64debced-220b-47aa-8a56-de9ece27fb02.png"
)
im = Image.open(src).convert("RGB")
w, h = im.size

out = Path(r"d:\sewa-sankalp-foundation\sewa-sankalp\admin-upload-photos\from-design")
out.mkdir(parents=True, exist_ok=True)

# Tighter crop — only the portrait area on the right of each card
cards = {
    "01-women-empowerment-design": (0.00, 0.00, 0.495, 0.495),
    "02-child-development-design": (0.505, 0.00, 1.00, 0.495),
    "03-education-health-design": (0.00, 0.505, 0.495, 1.00),
    "04-social-welfare-design": (0.505, 0.505, 1.00, 1.00),
}

for name, (x0, y0, x1, y1) in cards.items():
    card = im.crop((int(x0 * w), int(y0 * h), int(x1 * w), int(y1 * h)))
    cw, ch = card.size
    # Start further right so text/icon are excluded
    photo = card.crop((int(cw * 0.58), int(ch * 0.04), int(cw * 0.985), int(ch * 0.96)))
    target_w = 800
    ratio = target_w / max(1, photo.width)
    photo_up = photo.resize(
        (target_w, max(1, int(photo.height * ratio))),
        Image.Resampling.LANCZOS,
    )
    path = out / f"{name}.jpg"
    photo_up.save(path, "JPEG", quality=90, optimize=True)
    print(name, photo.size, "->", photo_up.size)

print("DONE", out)
