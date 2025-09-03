#!/bin/bash

# Input HTML file
INPUT="portfolio.html"   # change this to your original file name
HTML_OUT="index.html"
CSS_OUT="style.css"
JS_OUT="script.js"

# Extract CSS between <style>...</style>
sed -n '/<style>/,/<\/style>/p' "$INPUT" | sed '1d;$d' > "$CSS_OUT"

# Extract JS between <script>...</script>
# (ignores <script src=...> in header)
sed -n '/<script>/,/<\/script>/p' "$INPUT" | grep -v "<script>" | grep -v "</script>" > "$JS_OUT"

# Create new HTML file:
# Remove inline <style>...</style> and <script>...</script>,
# then insert link/script tags for external files
sed '/<style>/,/<\/style>/d' "$INPUT" | \
sed '/<script>/,/<\/script>/d' | \
sed "s@</head>@    <link rel=\"stylesheet\" href=\"style.css\" />\n</head>@" | \
sed "s@</body>@    <script src=\"script.js\"></script>\n</body>@" \
> "$HTML_OUT"

echo "✅ Files created:"
echo " - $HTML_OUT"
echo " - $CSS_OUT"
echo " - $JS_OUT"
