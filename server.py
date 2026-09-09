"""
RAILSETU Local & Network Server Runner
Serves the RAILSETU Hackathon Prototype web application locally and across your Wi-Fi/LAN network.
Zero external dependencies required.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import socket

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def get_local_ip():
    """Retrieve the primary local LAN IP address of this machine."""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        serve_dir = os.path.join(DIRECTORY, "dist") if os.path.exists(os.path.join(DIRECTORY, "dist", "index.html")) else DIRECTORY
        super().__init__(*args, directory=serve_dir, **kwargs)

    def do_GET(self):
        # If running without a build, fallback root requests to standalone.html for instant preview
        if not os.path.exists(os.path.join(DIRECTORY, "dist", "index.html")) and (self.path == "/" or self.path == "/index.html"):
            if os.path.exists(os.path.join(DIRECTORY, "standalone.html")):
                self.path = "/standalone.html"
        return super().do_GET()

    def log_message(self, format, *args):
        sys.stderr.write(f"[RAILSETU SERVER] {self.address_string()} - {format%args}\n")

def run():
    os.chdir(DIRECTORY)
    port = PORT
    max_attempts = 10
    local_ip = get_local_ip()

    for attempt in range(max_attempts):
        try:
            # Bind to 0.0.0.0 so other devices on the same Wi-Fi can connect
            with socketserver.TCPServer(("", port), Handler) as httpd:
                local_url = f"http://localhost:{port}"
                network_url = f"http://{local_ip}:{port}"

                print("=" * 68)
                print("   RAILSETU - AI-POWERED AUTOMATIC BLOCK PLANNING PROTOTYPE")
                print("   Indian Railways Operations Command Center")
                print("=" * 68)
                print(f"\n[+] This Device (Local):         {local_url}")
                print(f"[+] OTHER DEVICES on Same Wi-Fi: {network_url}")
                print("\n" + "-" * 68)
                print(">>> TO ACCESS FROM ANOTHER DEVICE (Phone, Tablet, Laptop):")
                print("   1. Connect both devices to the same Wi-Fi network.")
                print(f"   2. On the other device, open any browser and go to: {network_url}")
                print("-" * 68)
                print(f"\n[i] Directory: {DIRECTORY}")
                print("[i] Press CTRL+C to stop the server.\n")

                try:
                    webbrowser.open(local_url)
                except Exception:
                    pass

                httpd.serve_forever()
                break
        except OSError as e:
            if "Address already in use" in str(e) or e.errno == 10048:
                port += 1
                continue
            else:
                raise

if __name__ == '__main__':
    try:
        run()
    except KeyboardInterrupt:
        print("\n[!] RAILSETU Server stopped safely.")
        sys.exit(0)
