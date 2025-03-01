// const toggleInput = document.getElementById('dark-mode-toggle');
//         toggleInput.addEventListener('change', () => {
//             document.body.classList.toggle('dark-mode', toggleInput.checked);
//             localStorage.setItem('darkMode', toggleInput.checked);
//         });

//         // 페이지 로드 시 다크모드 상태 유지
//         if (localStorage.getItem('darkMode') === 'true') {
//             document.body.classList.add('dark-mode');
//             toggleInput.checked = true;
//         }
const toggleInput = document.getElementById('dark-mode-toggle');
const toggleLabel = document.querySelector('.toggle-label');
const toggleIcon = document.querySelector('.toggle-icon');
const header = document.querySelector('.head-menu-div');

toggleInput.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', toggleInput.checked);
    localStorage.setItem('darkMode', toggleInput.checked);
    toggleLabel.textContent = toggleInput.checked ? '🌙' : '☀️';
    toggleIcon.style.transform = toggleInput.checked ? 'translateX(-15px)' : 'translateX(15px)';

    // 헤더 애니메이션 트리거
    // header.classList.add('header-animate');
    // setTimeout(() => {
    //     header.classList.remove('header-animate');
    // }, 500);

    // 헤더 애니메이션 적용
    header.style.backgroundPosition = toggleInput.checked ? "100% 0" : "0 0";
});

    // 페이지 로드 시 다크모드 상태 유지
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        toggleInput.checked = true;
        toggleLabel.textContent = '🌙';
    }