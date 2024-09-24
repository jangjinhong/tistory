import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/** 
 * README.MD 
 */

// README 파일 경로
const readmePath = './README.md';

// RSS 파서 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    },
});

// README 업데이트 함수
const updateReadme = async () => {
    let text = '# Hi there 👋\n---\n## 📕 Latest Blog Posts\n';
    
    try {
        // RSS 피드 읽기
        const feed = await parser.parseURL('https://honge1122.tistory.com/rss');

        // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
        for (let i = 0; i < Math.min(5, feed.items.length); i++) {
            const { title, link } = feed.items[i];
            readmeContent += '- [📖 ${title}](${link})\n';
        }

        // 업데이트 시간 추가
        text += '\n---\n*업데이트 완료: ${new Date().toLocaleString()}*'; 
        
        // README.md 파일 업데이트
        writeFileSync('README.md', text, 'utf8');
        console.log('업데이트 완료');
    } catch(error) {
        console.error("Error updating README:", error);
    }
};

// 실행
updateReadme();
