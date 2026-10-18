"""Przycina fonty do potrzeb strony: przypina osie i zostawia tylko znaki
łacińskie z polskimi. Wynik trafia do app/fonts jako WOFF2.

Źródła (licencja SIL OFL 1.1, repozytorium google/fonts):
  ofl/fraunces/Fraunces[SOFT,WONK,opsz,wght].ttf          -> Fraunces-Roman.ttf
  ofl/fraunces/Fraunces-Italic[SOFT,WONK,opsz,wght].ttf   -> Fraunces-Italic.ttf
  ofl/schibstedgrotesk/SchibstedGrotesk[wght].ttf         -> SchibstedGrotesk.ttf

Użycie: pip install fonttools brotli
        python scripts/make-fonts.py <folder ze źródłami> app/fonts
"""
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

SRC = Path(sys.argv[1])
OUT = Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)

UNICODES = (
    list(range(0x20, 0x7F))
    + [0xA0, 0xA9, 0xAB, 0xB0, 0xB7, 0xBB, 0xD3, 0xD7, 0xF3]
    + [0x104, 0x105, 0x106, 0x107, 0x118, 0x119, 0x141, 0x142, 0x143, 0x144]
    + [0x15A, 0x15B, 0x179, 0x17A, 0x17B, 0x17C]
    + [0x2013, 0x2014, 0x2018, 0x2019, 0x201A, 0x201C, 0x201D, 0x201E, 0x2022, 0x2026]
)
FEATURES = ["kern", "liga", "clig", "calt", "locl", "lnum", "tnum", "pnum", "case", "mark", "mkmk", "ccmp"]

JOBS = [
    ("Fraunces-Roman.ttf", "Fraunces-Soft-Roman.woff2", {"SOFT": 100, "WONK": 0, "wght": (300, 420)}),
    ("Fraunces-Italic.ttf", "Fraunces-Soft-Italic.woff2", {"SOFT": 100, "WONK": 0, "wght": (300, 420)}),
    ("SchibstedGrotesk.ttf", "SchibstedGrotesk.woff2", {"wght": (400, 600)}),
]

for src, dst, axes in JOBS:
    font = TTFont(SRC / src, lazy=False)
    options = subset.Options()
    options.layout_features = FEATURES
    options.flavor = "woff2"
    options.name_IDs = ["*"]
    options.notdef_outline = True
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=UNICODES)
    subsetter.subset(font)
    font = instancer.instantiateVariableFont(font, axes)
    font.flavor = "woff2"
    font.save(OUT / dst)
    print(dst, round((OUT / dst).stat().st_size / 1024), "KB")
