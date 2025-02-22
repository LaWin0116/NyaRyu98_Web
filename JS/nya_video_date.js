document.addEventListener("DOMContentLoaded", async () => {
    const API_KEY = "AIzaSyCMzZWqzt6MINnIFh2xbXFrEGAzzb3mqbg";
    const CHANNEL_ID = "UCsu6EA4DWm5nFGMkXHxt2vw";
    const MAX_RESULTS = 1;

    async function fetchLatestVideoId() {
        const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=id&order=date&maxResults=${MAX_RESULTS}&type=video&videoDuration=medium`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            if (!data.items || data.items.length === 0) {
                console.error("최신 영상을 찾을 수 없습니다.", data);
                return null;
            }

            return data.items[0].id.videoId;  // 가장 최신 영상 ID 반환
        } catch (error) {
            console.error("최신 영상 ID를 가져오는 중 오류 발생:", error);
            return null;
        }
    }

    async function fetchVideoDetails(videoId) {
        if (!videoId) return;

        const url = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=snippet,contentDetails,statistics`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            if (!data.items || data.items.length === 0) {
                console.error("영상 정보를 찾을 수 없습니다.", data);
                return;
            }

            const video = data.items[0];
            const title = video.snippet.title;

            const videoContainer = document.getElementById("video");
            if (!videoContainer) {
                console.error("ERROR: id='video' 요소를 찾을 수 없습니다.");
                return;
            }

            videoContainer.innerHTML = `
                <div>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                    <h3 style="text-align: center;">${title}</h3>
                </div>
            `;

        } catch (error) {
            console.error("영상 정보를 가져오는 중 오류 발생:", error);
        }
    }

    const latestVideoId = await fetchLatestVideoId();
    await fetchVideoDetails(latestVideoId);
});