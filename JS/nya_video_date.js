async function fetchLatestLongFormVideo(channelId) {
    const proxyUrls = [
        "https://api.allorigins.win/get?url=",
        "https://thingproxy.freeboard.io/fetch/"
    ];
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    let response, data;
    for (let proxy of proxyUrls) {
        try {
            response = await fetch(proxy + encodeURIComponent(rssUrl));
            data = await response.json();
            if (data.contents) break; // 성공하면 반복 종료
        } catch (error) {
            console.error(`프록시 ${proxy} 실패, 다른 프록시 시도 중...`);
        }
    }

    if (!data || !data.contents) {
        console.error("모든 프록시 요청이 실패했습니다.");
        return;
    }

    // XML 파싱
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "text/xml");

    // 최신 동영상 찾기
    const entries = xml.querySelectorAll("entry");
    for (let entry of entries) {
        const title = entry.querySelector("title").textContent;
        const link = entry.querySelector("link").getAttribute("href");

        // 쇼츠 제외
        if (!link.includes("/shorts/")) {
            const videoId = new URL(link).searchParams.get("v");
            document.getElementById("video").innerHTML = `
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                <a href="${link}" style="text-decoration: none; cursor: default;">
                    <h3>${title}</h3>
                </a>
            `;
            return;
        }
    }

    document.getElementById("video").innerHTML = `<p>롱폼 동영상을 찾을 수 없습니다.</p>`;
}

// 유튜브 채널 ID 설정 후 실행
fetchLatestLongFormVideo("UCsu6EA4DWm5nFGMkXHxt2vw");