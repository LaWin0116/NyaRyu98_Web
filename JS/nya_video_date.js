// document.addEventListener("DOMContentLoaded", () => {
//     const API_KEY = "AIzaSyCuksRkUaXItB8C3k8Ma3mcVcUgVrEoOQo";
//     const CHANNEL_ID = "UCsu6EA4DWm5nFGMkXHxt2vw";
//     const MAX_RESULTS = 1;

//     async function fetchVideos() {
//         const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=${MAX_RESULTS}&type=video&videoDuration=medium`;

//         const response = await fetch(url);
//         const data = await response.json();

//         const videoContainer = document.getElementById("video");

//         if (!videoContainer) {
//             console.error("ERROR: html에서 id=\"video\" 요소를 찾을 수 없습니다");
//             return;
//         }

//         videoContainer.innerHTML = "";

//         data.items.forEach(item => {
//             const videoId = item.id.videoId;
//             const title = item.snippet.title;

//             // 🎬 iframe을 사용해서 동영상을 직접 삽입
//             const videoElement = `
//                 <div>
//                     <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
//                     <h3 style="text-align: center;">${title}</h3>
//                 </div>
//             `;

//             videoContainer.innerHTML += videoElement;
//         });
//     }
//     fetchVideos();
// });

document.addEventListener("DOMContentLoaded", async () => {
    const API_KEY = "AIzaSyAK3xkVwjB4ALo_phCCw5nuXGE8CLPrWQs";
    const CHANNEL_ID = "UCsu6EA4DWm5nFGMkXHxt2vw";
    const MAX_RESULTS = 1;

    async function fetchVideos() {
        const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=${MAX_RESULTS}&type=video&videoDuration=medium`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            if (!data.items) {
                console.error("API 응답에 'items'가 없습니다.", data);
                return;
            }

            const videoContainer = document.getElementById("video");
            if (!videoContainer) {
                console.error("ERROR: HTML에서 id='video' 요소를 찾을 수 없습니다.");
                return;
            }

            videoContainer.innerHTML = "";

            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const title = item.snippet.title;

                const videoElement = `
                    <div>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                        <h3>${title}</h3>
                    </div>
                `;
                videoContainer.innerHTML += videoElement;
            });

        } catch (error) {
            console.error("YouTube API 요청 중 오류 발생:", error);
        }
    }
    fetchVideos();
});
