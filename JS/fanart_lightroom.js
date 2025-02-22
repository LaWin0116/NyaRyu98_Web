// TODO: 라이트룸 형식으로 팬아트 볼 수 있게 만들기. 모을 팬아트 개수: 24~32
let pics = document.querySelectorAll('.pic');
let lightbox = document.querySelector('#lightbox');
let lightboxImage = document.querySelector('#lightboxImage');

for (let i = 0; i < pics.length; i++) {
    pics[i].addEventListener('click', showLightbox);
}

function showLightbox() {
    let bigLocation = this.dataset.src;
    lightboxImage.src = bigLocation;
    lightbox.style.display = 'block';
    document.body.classList.add('lightroom-active'); // 라이트룸 모드 활성화
}

lightbox.onclick = function () {
    lightbox.style.display = 'none';
    document.body.classList.remove('lightroom-active'); // 라이트룸 모드 비활성화
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
