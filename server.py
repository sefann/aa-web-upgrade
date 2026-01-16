#!/usr/bin/env python3
"""
Simple HTTP server with routing support for HTML files.
Handles routes like /about -> about.html, /services -> services.html, etc.
"""
import http.server
import socketserver
import os
import urllib.parse

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers if needed
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()
    
    def do_GET(self):
        # Parse the path
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path
        
        # Remove leading slash
        if path.startswith('/'):
            path = path[1:]
        
        # If path is empty or just '/', serve index.html
        if path == '' or path == '/':
            path = 'index.html'
        
        # Check if it's a directory (ends with /)
        if path.endswith('/'):
            path = path[:-1]
        
        # List of known routes and their corresponding HTML files
        routes = {
            'about': 'about.html',
            'services': 'services.html',
            'contact': 'contact.html',
            'education': 'education.html',
            'update-hub': 'update-hub.html',
            'blog': 'blog.html',
            'consultation': 'consultation.html',
            'privacy': 'privacy.html',
            'terms': 'terms.html',
        }
        
        # Check if path matches a route
        if path in routes:
            file_path = routes[path]
            if os.path.exists(file_path):
                self.path = '/' + file_path
            else:
                self.send_error(404, f"File not found: {file_path}")
                return
        # Check if it's already a file with extension
        elif not path.endswith('.html') and not '.' in path.split('/')[-1]:
            # Try adding .html extension
            html_path = path + '.html'
            if os.path.exists(html_path):
                self.path = '/' + html_path
            else:
                # Check if it's a route
                if path in routes:
                    file_path = routes[path]
                    if os.path.exists(file_path):
                        self.path = '/' + file_path
                    else:
                        self.send_error(404, f"File not found: {file_path}")
                        return
                else:
                    self.send_error(404, f"File not found: {path}")
                    return
        
        # Call parent class to serve the file
        return super().do_GET()

def run(port=8000):
    """Run the server on the specified port."""
    handler = CustomHTTPRequestHandler
    
    with socketserver.TCPServer(("", port), handler) as httpd:
        print(f"Server running at http://localhost:{port}/")
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == "__main__":
    import sys
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("Invalid port number. Using default port 8000.")
    
    run(port)
