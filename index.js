import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";
import cron from 'node-cron';  // cron 모듈 추가

/**
 * README.MD
 */
 
let text = `# Hi there 👋

## 이런 환경에 익숙해요✍🏼

## 📕 Latest Blog Posts

`;

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }
});


// README 업데이트 로직을 함수로 정의
const updateReadme = async () => {
    // 피드 목록
    const feed = await parser.parseURL('https://honge1122.tistory.com/rss');

    // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
    for (let i = 0; i < 5; i++) {
        const { title, link } = feed.items[i];
        console.log(`${i + 1}번째 게시물`);
        console.log(`추가될 제목: ${title}`);
        console.log(`추가될 링크: ${link}`);
        text += `<a href=${link}>${title}</a></br>`;
    }

    // README.md 파일 작성
    writeFileSync('README.md', text, 'utf8');
    console.log('업데이트 완료');
};

// 처음 실행 시 README 업데이트
updateReadme();

// cron 스케줄링: 하루에 4번 (6시간 간격으로 실행)
cron.schedule('0 */6 * * *', () => {
    console.log('업데이트 작업 실행 중...');
    updateReadme();
});