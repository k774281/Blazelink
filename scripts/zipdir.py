"""Zips one folder with the folder itself at the top of the archive.

Used instead of Info-ZIP's zip because the column has posts with Chinese
slugs: Python marks non-ASCII names as UTF-8 in the archive, so WP File
Manager extracts them under the same names Apache looks for.

    python3 scripts/zipdir.py <parent dir> <folder name> <output.zip>
"""
import os
import sys
import zipfile

parent, name, out = sys.argv[1:4]
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(os.path.join(parent, name)):
        dirs.sort()
        rel = os.path.relpath(root, parent)
        zf.write(root, rel + "/")
        for f in sorted(files):
            if f == ".DS_Store":
                continue
            zf.write(os.path.join(root, f), os.path.join(rel, f))
