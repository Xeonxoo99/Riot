//! 스크롤 시 header 숨김 처리
/* 
    [ DOMContentLoaded ] 

    - HTML 문서의 모든 요소가 로드된 후 실행되는 이벤트
    - HTML 파싱이 끝나고 JS가 안전하게 DOM을 조작할 수 있는 시점에 실행
    
    [ load ]

    - 실행시점 : 페이지의 모든 리소스(이미지, CSS, iframe 등)가 다 로드된 후
 */
document.addEventListener("DOMContentLoaded", function () {
    let scrollTimeout;
    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {
        // 스크롤이 발생하면 header 숨기기
        header.style.opacity = "0";
        header.style.transform = "translateY(-20px)";

        // 기존 타이머 삭제하고 새 타이머 설정
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            header.style.opacity = "1";
            header.style.transform = "translateY(0)";
        }, 200); // 200ms 동안 추가 스크롤 없으면 다시 나타남
    });
});

//! 슬로건이 비디오 컨테이너 영역을 벗어날 때까지 fixed?

/*
    [ 슬로건 영역 스크롤 시 fix & video 영역 벗어날 시 fix 해제]

    
*/

//? gsap
gsap.registerPlugin(ScrollTrigger)

//! 슬로건 고정
gsap.to(".slogan", {
    scrollTrigger: {
        trigger: ".video_container",
        start: "top top",  // 비디오 영역이 화면의 top에 닿을 때
        end: "bottom top",  // 비디오 영역이 화면의 top을 벗어날 때
        scrub: true,
        pin: true,  // 슬로건을 고정시킴
        markers: true,
    },
});

//! 비디오 크기 커지기
gsap.to(".video_container .content video", {
    scale: 1.5,  // 비디오 크기를 1.5배로 확대
    scrollTrigger: {
        trigger: ".video_container",
        start: "top bottom",  // 비디오 컨테이너의 top이 화면 bottom에 닿을 때
        end: "bottom top",    // 비디오 컨테이너의 bottom이 화면 top에 닿을 때
        scrub: true,
        markers: true,
    },
    width: '100%'
});