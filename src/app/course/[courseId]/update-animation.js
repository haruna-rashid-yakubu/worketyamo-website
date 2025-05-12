const fs = require('fs');
const path = require('path');

// Read the file
const filePath = path.join(__dirname, 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Update opacity animation timing to make highlights disappear earlier
content = content.replace(
  /times: \[0, 0\.1, 1\],\s+duration: 1\.8,/g, 
  'times: [0, 0.1, 0.7], // Make it disappear earlier\n              duration: 1.5,'
);

// Update the bottom flowing highlight to match the top one's animation style
content = content.replace(
  /\/\* Flowing highlight effect for bottom border \*\/\s+<motion\.div\s+className="absolute w-1 h-12 bg-gradient-to-b from-transparent via-white to-transparent rounded-full opacity-70"\s+initial={\{ top: "-48px" \}}\s+animate={isInView \? {\s+top: "100%",\s+transition: {\s+delay: 1\.2,\s+duration: 1\.5,\s+ease: "easeInOut"\s+}\s+} : { top: "-48px" }}/g,
  '/* Flowing highlight effect for bottom border with auto-fade */\n        <motion.div \n          className="absolute w-1 h-12 bg-gradient-to-b from-transparent via-white to-transparent rounded-full"\n          initial={{ top: "-48px", opacity: 0 }}\n          animate={{\n            top: isInView ? "100%" : "-48px",\n            opacity: isInView ? [0, 0.7, 0] : 0,\n          }}\n          transition={{\n            top: { delay: 1.2, duration: 1.5, ease: "easeInOut" },\n            opacity: { \n              times: [0, 0.1, 0.7], // Make it disappear earlier\n              duration: 1.2,\n              delay: 1.2,\n              ease: "easeInOut" \n            }\n          }}'
);

// Write the updated content back to the file
fs.writeFileSync(filePath, content, 'utf8');

console.log('Animation timing updated successfully!');
