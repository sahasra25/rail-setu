"""
RAILSETU Portable Exporter
Packages the entire project into standalone distribution zip files.
"""

import os
import shutil
import zipfile

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# Target zip destinations
DESTINATIONS = [
    os.path.join(CURRENT_DIR, "railsetu-portable.zip"),
    os.path.join("C:\\Users\\laksh\\OneDrive\\Desktop", "RAILSETU-export.zip"),
    os.path.join("C:\\Users\\laksh\\Downloads", "RAILSETU-export.zip")
]

# Files/folders to include in portable bundle
INCLUDE_PATHS = [
    "index.html",
    "standalone.html",
    "server.py",
    "start.bat",
    "start.sh",
    "README.md",
    "package.json",
    "vite.config.ts",
    "tsconfig.json",
    "tailwind.config.js",
    "postcss.config.js",
    "vercel.json",
    ".vercelignore",
    ".gitignore",
    "public",
    "src"
]

def make_export():
    temp_zip = os.path.join(CURRENT_DIR, "_temp_export.zip")
    if os.path.exists(temp_zip):
        os.remove(temp_zip)

    print("[*] Creating portable ZIP archive...")
    with zipfile.ZipFile(temp_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for item in INCLUDE_PATHS:
            full_path = os.path.join(CURRENT_DIR, item)
            if os.path.isfile(full_path):
                zipf.write(full_path, arcname=f"railsetu/{item}")
                print(f"  + Added file: {item}")
            elif os.path.isdir(full_path):
                for root, dirs, files in os.walk(full_path):
                    for file in files:
                        fp = os.path.join(root, file)
                        rel_path = os.path.relpath(fp, CURRENT_DIR)
                        zipf.write(fp, arcname=f"railsetu/{rel_path}")
                        print(f"  + Added file: {rel_path}")

    # Copy temp zip to destinations
    for dest in DESTINATIONS:
        try:
            dest_dir = os.path.dirname(dest)
            if os.path.exists(dest_dir):
                shutil.copy2(temp_zip, dest)
                size_kb = os.path.getsize(dest) / 1024
                print(f"[SUCCESS] Exported to: {dest} ({size_kb:.1f} KB)")
        except Exception as e:
            print(f"[!] Warning copying to {dest}: {e}")

    if os.path.exists(temp_zip):
        os.remove(temp_zip)

if __name__ == '__main__':
    make_export()
