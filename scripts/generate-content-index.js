const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, '..', 'src', 'content');

function scanMarkdownFiles(dir) {
  const items = [];
  if (!fs.existsSync(dir)) return items;

  const langs = fs.readdirSync(dir).filter(f =>
    fs.statSync(path.join(dir, f)).isDirectory()
  );

  for (const lang of langs) {
    const langDir = path.join(dir, lang);
    const files = fs.readdirSync(langDir).filter(f => f.endsWith('.md'));

    for (const file of files) {
      const filePath = path.join(langDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);

      items.push({
        slug: data.slug || file.replace('.md', ''),
        title: data.title || '',
        date: data.date || '',
        description: data.description || '',
        tags: data.tags || [],
        techStack: data.techStack || [],
        github: data.github || '',
        demo: data.demo || '',
        featured: data.featured || false,
        lang: data.lang || lang
      });
    }
  }

  return items;
}

// Generate blog index
const blogItems = scanMarkdownFiles(path.join(contentDir, 'blog'));
fs.writeFileSync(
  path.join(contentDir, 'blog-index.json'),
  JSON.stringify({ items: blogItems }, null, 2)
);
console.log(`Generated blog-index.json with ${blogItems.length} items`);

// Generate projects index
const projectItems = scanMarkdownFiles(path.join(contentDir, 'projects'));
fs.writeFileSync(
  path.join(contentDir, 'projects-index.json'),
  JSON.stringify({ items: projectItems }, null, 2)
);
console.log(`Generated projects-index.json with ${projectItems.length} items`);
