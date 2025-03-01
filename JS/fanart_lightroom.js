let pics = document.querySelectorAll('.pic');
let lightbox = document.querySelector('#lightbox');
let lightboxImage = document.querySelector('#lightboxImage');

// 이미지 설명을 위한 태그 생성
let lightboxCaption = document.createElement('p');
lightboxCaption.id = 'lightboxCaption';
lightbox.appendChild(lightboxCaption);
if (lightbox.style.display !== 'none') {
    lightbox.style.display = 'none';
}

for (let i = 0; i < pics.length; i++) {
    pics[i].addEventListener('click', showLightbox);
}

function showLightbox() {
    let bigLocation = this.dataset.src;
    let captionText = this.dataset.caption || ''; // 설명이 없으면 빈 문자열

    lightboxImage.src = bigLocation;
    lightboxCaption.textContent = captionText; // 설명 추가

    // 이미지가 로드된 후 높이에 따라 캡션 위치 조정
    lightboxImage.onload = function () {
        let imgRect = lightboxImage.getBoundingClientRect();
        let windowHeight = window.innerHeight;

        // 이미지 아래에 캡션 배치
        lightboxCaption.style.top = `${imgRect.bottom + 5}px`;

        // // 이미지 크기가 작으면 약간 아래로 이동 (기본 중앙 위치에서 보정)
        // let offset = Math.max(0, (windowHeight - imgRect.height) / 4);
        // lightboxImage.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
    };

    lightbox.style.display = 'block';
    document.body.classList.add('lightroom-active');
}

lightbox.onclick = function () {
    lightbox.style.display = 'none';
    document.body.classList.remove('lightroom-active');
}

// 라이트룸 모드에서 이미지 외 요소 클릭/선택 방지
document.addEventListener('click', function (event) {
    if (document.body.classList.contains('lightroom-active')) {
        let isLightboxImage = event.target === lightboxImage;
        if (!isLightboxImage) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
}, true);