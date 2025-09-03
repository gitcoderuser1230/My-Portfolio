#!/bin/bash

# Input HTML file
INPUT="portfolio.html"

# Output files
HTML_OUT="index.html"
CSS_OUT="style.css"
JS_OUT="script.js"

# Extract CSS from <style> tags
sed -n '/<style[^>]*>/,/<\/style>/p' "$INPUT" | sed '1d;$d'> "$CSS_OUT"

# Extract JS from <script> tags (only inline scripts)
sed -n '/<script[^>]*>/,/<\/script>/p' "$INPUT" | sed '1d;$d'> "$JS_OUT"

# Create cleaned HTML with external links
sed '/<style[^>]*>/,/<\/style>/d' "$INPUT" | \
sed '/<script[^>]*>/,/<\/script>/d' | \
sed '/<\/head>/i <link rel="stylesheet" href="style.css">' | \
sed '/<\/body>/i <script src="script.js"></script>'> "$HTML_OUT"

echo "✅ Split complete:"
echo "- HTML: $HTML_OUT"
echo "- CSS: $CSS_OUT"
echo "- JS: $JS_OUT"