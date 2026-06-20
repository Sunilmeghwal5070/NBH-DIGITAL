const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/Chittorgarh/g, 'Nimbahera');
      content = content.replace(/चित्तौड़गढ़/g, 'निम्बाहेड़ा');
      fs.writeFileSync(fullPath, content);
    }
  }
}

replaceInDir('./src');
console.log('Replacement complete.');
