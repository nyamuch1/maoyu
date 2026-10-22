"""把各页面截图拼成 light / dark 两张总览图。"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SHOTS = ROOT / "shots"

PAGES = ["tokens", "buttons", "selection", "form", "table", "feedback"]
COL_W = 620
GAP = 14
PAD = 14
BG = (244, 241, 255)


def grid(theme: str, name: str) -> None:
    tiles: list[Image.Image] = []
    for slug in PAGES:
        image = Image.open(SHOTS / f"page-{theme}-{slug}.png").convert("RGB")
        # 去掉顶部的吸顶导航与底部页脚，只留页面内容
        image = image.crop((0, 64, image.width, max(200, image.height - 72)))
        ratio = COL_W / image.width
        tiles.append(image.resize((COL_W, round(image.height * ratio)), Image.LANCZOS))

    columns = 2
    rows = [tiles[i : i + columns] for i in range(0, len(tiles), columns)]
    row_heights = [max(tile.height for tile in row) for row in rows]

    width = PAD * 2 + columns * COL_W + (columns - 1) * GAP
    height = PAD * 2 + sum(row_heights) + (len(rows) - 1) * GAP

    sheet = Image.new("RGB", (width, height), BG)
    y = PAD
    for row, row_height in zip(rows, row_heights):
        x = PAD
        for tile in row:
            sheet.paste(tile, (x, y))
            x += COL_W + GAP
        y += row_height + GAP

    sheet.save(SHOTS / name, optimize=True)
    print(f"{name} -> {sheet.width}x{sheet.height}")


for theme in ("light", "dark"):
    grid(theme, f"preview-{theme}.png")
