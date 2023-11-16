/*
전체 작업 흐름
1.동적으로 200개의 img DOM생성
2.마우스무브시 포인터의 가로 좌표값을 200분율로 변환
3.200분율중 현재 마우스 포인터 위치순번에 따른 이미지만 보임처리
4.이미지돔이 생성되고 이미지소스가 로딩될떄마다 로딩순번을 100분율처리
5.이미지생성시 해당이미지에 에러발생히 대체이미지 처리
6.이미지소스가 모두 로딩되기 전까지는 마스크화면으로 가려주면서 로딩상황 100분율을 출력
7.모든 이미지소스 로딩 완료시 마스크제거
*/

const frame = document.querySelector('figure');
const mask = document.querySelector('.mask');
const countEl = mask.querySelector('span');
const imgNum = 200;
let count = 0;

const imgs = createImgs(frame, imgNum);
imgLoadedCheck(imgs);

frame.addEventListener('mousemove', (e) => {
	const { pageX } = e;
	const percent = parseInt((pageX / window.innerWidth) * imgNum);
	imgs.forEach((img) => (img.style.visibility = 'hidden'));
	imgs[percent].style.visibility = 'visible';
});
//동적 이미지 생성함수 분리 (돔생성하자 마자 바로 리턴해서 활용가능하록 처리)
function createImgs(frame, imgNum, imgName = 'pic') {
	let tags = '';
	for (let i = 0; i < imgNum; i++) tags += `<img src='img/${imgName}${i}.jpg' />`;
	frame.innerHTML = tags;
	return frame.querySelectorAll('img');
}

//이미지소스 로딩유무 체크함수
function imgLoadedCheck(imgs) {
	imgs.forEach((img) => {
		img.addEventListener('error', (e) => {
			e.currentTarget.setAttribute('src', 'img/logo.png');
		});
		img.addEventListener('load', () => {
			countEl.innerText = parseInt((count / imgNum) * 100) + 1;
			count++;
			if (count === imgNum) mask.remove();
		});
	});
}
