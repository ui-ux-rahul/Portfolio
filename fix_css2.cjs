const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.split('.text-\\[\\#1A1A1A\\]').join('.text-\\[\\#1A1A1A\\]'); // wait, the original was .text-\\[\\#1A1A1A\\] in the output of grep

// Let me just replace the exact strings
css = css.replace('.dark .admin-dashboard-container .text-\\[\\#1A1A1A\\],', '.dark .admin-dashboard-container .text-\\[\\#1A1A1A\\],');

fs.writeFileSync('src/index.css', css);
