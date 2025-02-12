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
        // markers: true,
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
        // markers: true,
    },
    width: '100%'
});


//! info pin
gsap.to(".video_container", {
    scrollTrigger: {
        trigger: ".info",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: '.info',
        // markers: true,
    },
});

//! info 스크롤 마다 글자 색 변경
const elements = document.querySelectorAll(".content_text, .info_icon");

elements.forEach((el, index) => {
    gsap.to(el, {
        color: "rgb(209, 54, 57)",
        stagger: 0.9,  // 글자 색 변경이 조금 더 순차적으로 발생하도록 설정
        trigger: ".spacer",  // 트리거 요소를 spacer로 설정
        scrollTrigger: {
            trigger: el,
            start: "top center",  // `top center`로 설정하여 조금 더 긴 구간에서 색이 변경되게
            end: "bottom center",  // 스크롤이 끝날 때까지 진행되도록 설정
            scrub: 1,  // scrub을 1로 설정하여 스크롤에 맞춰서 애니메이션이 부드럽게 진행되도록 설정
            toggleActions: "play none none reverse",  // 색이 변경되었다가 다시 돌아가는 동작을 reverse로 설정
            // markers: true,
        }
    });
});

//! work_with_us hover 시 문구 나타나게 하기

let learn_box = document.querySelector('.learn_box');
let text_area = document.querySelector('.text_area');

document.querySelectorAll('.learn_box').forEach(box => {
    box.addEventListener('mouseover', (e) => {
        let textArea = box.querySelector('.text_area'); // 현재 box 내부의 text_area만 선택
        box.style.height = '300px';
        box.style.backgroundColor = '#fff';
        box.style.color = '#000';
        textArea.style.display = 'flex'; // 텍스트 영역 보이게 함
    });

    box.addEventListener('mouseout', (e) => {
        let textArea = box.querySelector('.text_area');
        box.style.height = ''; // 원래 높이로 복귀
        box.style.backgroundColor = 'rgb(25, 25, 25)';
        box.style.color = '#fff';
        textArea.style.display = 'none'; // 다시 숨김
    });
});

//! game_info / pin & 가로 스크롤
let sections = gsap.utils.toArray(".game_card");

gsap.to(sections, {
    xPercent: -100 * (sections.length - 2),
    ease: "none",
    scrollTrigger: {
        trigger: ".game_info",
        pin: true,
        scrub: 2, // 부드러운 스크롤 적용
        end: "+=6000",
    }
});

//! esports 효과

let lol = document.querySelector('.lol_esports')
let riot = document.querySelector('.riot_logo h1 img')
let val = document.querySelector('.val_esports')

// 롤
lol.addEventListener('mousemove', (e) => {
    let cardRect = lol.getBoundingClientRect(); // 카드 위치 정보 가져오기
    let centerX = cardRect.left + cardRect.width / 2; // 카드 중심 X 좌표
    let centerY = cardRect.top + cardRect.height / 2; // 카드 중심 Y 좌표

    let deltaX = e.clientX - centerX; // 마우스 위치와 중심 X 차이
    let deltaY = e.clientY - centerY; // 마우스 위치와 중심 Y 차이

    let rotateX = (deltaY / cardRect.height) * 60; // 위아래 기울기 (최대 15도)
    let rotateY = -(deltaX / cardRect.width) * 60; // 좌우 기울기 (최대 15도)

    lol.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

lol.addEventListener('mouseleave', () => {
    lol.style.transform = 'rotateX(0deg) rotateY(0deg)'; // 마우스 벗어나면 원래대로
});

// 라이엇

riot.addEventListener('mouseover', ()=>{
    riot.style.transformOrigin = 'center'
    riot.style.transition = 'all 1s ease'
    riot.style.transform = 'scale(1.1)'
})

riot.addEventListener('mouseout', ()=>{
    riot.style.transition = 'all 1s ease'
    riot.style.transform = 'scale(1)'
})


// 발로
val.addEventListener('mousemove', (e) => {
    let cardRect = val.getBoundingClientRect(); // 카드 위치 정보 가져오기
    let centerX = cardRect.left + cardRect.width / 2; // 카드 중심 X 좌표
    let centerY = cardRect.top + cardRect.height / 2; // 카드 중심 Y 좌표

    let deltaX = e.clientX - centerX; // 마우스 위치와 중심 X 차이
    let deltaY = e.clientY - centerY; // 마우스 위치와 중심 Y 차이

    let rotateX = (deltaY / cardRect.height) * 60; // 위아래 기울기 (최대 15도)
    let rotateY = -(deltaX / cardRect.width) * 60; // 좌우 기울기 (최대 15도)

    val.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

val.addEventListener('mouseleave', () => {
    val.style.transform = 'rotateX(0deg) rotateY(0deg)'; // 마우스 벗어나면 원래대로
});

//! 스크롤 부드럽게?

// gsap.registerPlugin(ScrollSmoother);

// ScrollSmoother.create({
//     smooth: 2, // 값이 클수록 더 부드럽게 (기본값: 1)
//     effects: true // 스크롤 효과 활성화 (선택 사항)
// });

//! hover 시 밑줄 생성
//? js에서는 :after 등을 사용 할 수 없어, class를 추가하는 방식으로 진행해야함

// li요소
document.querySelectorAll('.pack_down ul li').forEach(li => {
    li.addEventListener('mouseover', () => {
        li.classList.add('underline');
    });
    li.addEventListener('mouseout', () => {
        li.classList.remove('underline');
    });
});

// a요소
document.querySelectorAll('.footer_menu a').forEach(a => {
    a.addEventListener('mouseover', () => {
        a.classList.add('underline');
    });
    a.addEventListener('mouseout', () => {
        a.classList.remove('underline');
    });
});

//! top 이동
//? offsetY를 활용하여 0일 때 gototop opacity:0으로 만들기
document.addEventListener("DOMContentLoaded", function () {
    let scrollTimeout;

    const top = document.querySelector('.go_to_top')
    window.addEventListener("scroll", function () {
        let offsetY = window.scrollY
        // 스크롤이 발생하면 header 숨기기
        top.style.opacity = "0"
        top.style.transform = "translateY(0px)";
        // console.log(offsetY)
        // 기존 타이머 삭제하고 새 타이머 설정
        clearTimeout(scrollTimeout);

        if(offsetY == "0"){
            top.style.opacity = "0"
            top.style.transform = "translateY(0px)";
        }else{
            scrollTimeout = setTimeout(() => {
                top.style.opacity = "1"
                top.style.transform = "translateY(-20px)";
            }, 200); // 200ms 동안 추가 스크롤 없으면 다시 나타남
        }
    });
});
