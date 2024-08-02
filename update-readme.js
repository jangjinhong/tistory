import { writeFileSync } from 'fs';

// README 파일 경로
const readmePath = './README.md';

// README 업데이트 로직
const updateReadme = () => {
  const newContent = '# Updated README\n\nThis is an updated README file.';
  writeFileSync(readmePath, newContent, 'utf8');
  console.log('README.md has been updated');
};

updateReadme();