// script video fullscreen iOS
function setVhUnit() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', setVhUnit);
window.addEventListener('orientationchange', setVhUnit);
setVhUnit();

function externalLinks() {
	for (var c = document.getElementsByTagName("a"), a = 0; a < c.length; a++) {
		var b = c[a];
		b.getAttribute("href") && b.hostname !== location.hostname && (b.target = "_blank")
	}
};
externalLinks();

// babi home

document.addEventListener("DOMContentLoaded", function () {
	const babiFixed = document.getElementById("babiFixed");

	// Verifica se o elemento babiFixed existe na página
	if (!babiFixed) {
		return;
	}

	const sections = document.querySelectorAll(".section-img");
	const mediaContainer = document.querySelector(".media-container");
	const isBehindSections = document.querySelectorAll(".isBehind");

	// Função para verificar se a metade de um elemento está no viewport
	function isElementHalfInViewport(el) {
		const rect = el.getBoundingClientRect();
		const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
		const elementTop = rect.top + rect.height / 2;
		return elementTop >= 0 && elementTop <= viewportHeight;
	}

	// Função para calcular a posição de fundo de forma suave
	function calculateBackgroundPosition(el) {
		const rect = el.getBoundingClientRect();
		const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
		const elementTop = rect.top + rect.height / 2;
		const percentage = Math.max(0, Math.min(100, ((elementTop / viewportHeight) * 100)));
		return `50% ${percentage}%`;
	}

	// Função para alterar a máscara e a imagem de fundo
	function changeMask() {
		let found = false;
		let backgroundImage = '';
		let maskImage = '';
		let backgroundPosition = '';
		let isAnyIsBehindVisible = false; // Flag to check if any isBehind section is in view

		sections.forEach(section => {
			const rect = section.getBoundingClientRect();
			const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

			if (rect.top < viewportHeight && rect.bottom > 0) {
				const img = section.querySelector('img');
				if (img) {
					//backgroundImage = `url('${img.src}')`;
					//maskImage = `url('images/babi.svg')`;
					//backgroundPosition = calculateBackgroundPosition(section); // Calcular a posição de fundo com base na seção atualmente visível
					//backgroundImage = 'none';
					found = true;
				} else if (section.classList.contains('no-image')) {
					backgroundImage = 'none';
					//maskImage = `url('images/babi.svg')`;
					found = true;
				}
			}
		});

		if (mediaContainer && isElementHalfInViewport(mediaContainer)) {
			backgroundImage = `url('images/4d375425-575a-4396-a7e8-6ccae514f2d2.png')`; // Remover o plano de fundo quando dentro de media-container
			babiFixed.style.backgroundColor = 'black';
			babiFixed.style.opacity = '1';
		} else {
			//babiFixed.style.backgroundColor = 'transparent';
			//babiFixed.style.backgroundColor = 'black';
			babiFixed.style.opacity = '1';
		}

		if (found) {
			babiFixed.style.backgroundImage = backgroundImage;
			//babiFixed.style.maskImage = maskImage;
			babiFixed.style.backgroundPosition = backgroundPosition; // Definir a posição de fundo calculada
		} else {
			// Mantém a imagem de fundo atual ao sair de uma seção sem redefinir para preto
			babiFixed.style.backgroundImage = backgroundImage;
			babiFixed.style.maskImage = maskImage;
		}

		// Verificar a proximidade com todas as sections isBehind
		isBehindSections.forEach(section => {
			const rect = section.getBoundingClientRect();
			const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

			// Verifica se a seção isBehind está consideravelmente dentro do viewport
			if (rect.top < viewportHeight * 0.65 && rect.bottom > viewportHeight * 0.25) {
				isAnyIsBehindVisible = true;
			}
		});

		if (isAnyIsBehindVisible) {
			babiFixed.style.opacity = '0.45'; // Ajusta a opacidade ao se aproximar
		} else {
			babiFixed.style.opacity = '1'; // Retorna à opacidade normal ao sair
		}
	}

	// Adiciona os event listeners para scroll e resize
	window.addEventListener("scroll", changeMask);
	window.addEventListener("resize", changeMask);
	changeMask();
});

// img half

function adjustHeight() {
	const imageContainers = document.querySelectorAll('.image-half');

	// Verifica se existem elementos com a classe 'image-half' na página
	if (imageContainers.length === 0) {
		return; // Se não existirem, interrompe a execução da função
	}

	if (window.innerWidth > 778) {
		imageContainers.forEach(function (imageContainer) {
			const img = imageContainer.querySelector('img');
			if (img) {
				const imageHeight = img.offsetHeight;
				const scHalf = imageContainer.closest('.sc-half');
				if (scHalf) {
					scHalf.style.height = imageHeight + 'px';
					const container = scHalf.querySelector('.container');
					const flexContent = scHalf.querySelector('.flex-content');
					if (container) container.style.height = imageHeight + 'px';
					if (flexContent) flexContent.style.height = imageHeight + 'px';
				}
			}
		});
	} else {
		const scHalfElements = document.querySelectorAll('.sc-half');
		scHalfElements.forEach(function (scHalf) {
			scHalf.style.height = 'auto';
			const container = scHalf.querySelector('.container');
			const flexContent = scHalf.querySelector('.flex-content');
			if (container) container.style.height = 'auto';
			if (flexContent) flexContent.style.height = 'auto';
		});
	}
}

window.addEventListener('load', adjustHeight);
window.addEventListener('resize', adjustHeight);

// back to top

document.addEventListener('DOMContentLoaded', function () {
	var backTopButton = document.querySelector('.backTop');
	backTopButton.addEventListener('click', function () {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
});

// menu

document.querySelector('.toggle-btn').addEventListener('click', function () {
	document.querySelector('.sidebar').classList.toggle('is-active');
	document.getElementsByTagName("html")[0].classList.toggle('is-overflow')
	document.querySelector('.overlay-nav').classList.toggle('over-active');
})

document.querySelector('.sidebar .close').addEventListener('click', function () {
	document.querySelector('.sidebar').classList.remove('is-active');
	document.getElementsByTagName("html")[0].classList.remove('is-overflow')
	document.querySelector('.overlay-nav').classList.remove('over-active');
})

document.querySelector('.overlay-nav').addEventListener('click', function () {
	document.querySelector('.sidebar').classList.remove('is-active');
	document.getElementsByTagName("html")[0].classList.remove('is-overflow')
	document.querySelector('.overlay-nav').classList.remove('over-active');
})

// marquee

function Marquee(selector, speed) {
	const parentSelector = document.querySelector(selector);
	const clone = parentSelector.innerHTML;
	const firstElement = parentSelector.children[0];
	let i = 0;
	let intervalId;

	parentSelector.insertAdjacentHTML('beforeend', clone);
	parentSelector.insertAdjacentHTML('beforeend', clone);

	function startAnimation() {
		intervalId = setInterval(function () {
			firstElement.style.marginLeft = `-${i}px`;
			if (i > firstElement.clientWidth) {
				i = 0;
			}
			i = i + speed;
		}, 0);
	}

	function stopAnimation() {
		clearInterval(intervalId);
	}

	parentSelector.addEventListener('mouseover', stopAnimation);
	parentSelector.addEventListener('mouseout', startAnimation);

	startAnimation(); // Inicia a animação quando a página carrega
}

window.addEventListener('load', function () {
	Marquee('.marquee', 0.5);
});

// letras babi

document.addEventListener('DOMContentLoaded', () => {
	const blockBabi = document.querySelector('.block-babi');

	if (!blockBabi) {
		return;
	}

	const letters = document.querySelectorAll('.letter');

	// Posições iniciais das letras (relativas ao contêiner .letters)
	const initialPositions = [
		{ top: -180, left: -25 }, // Ajuste conforme necessário
		{ top: -110, left: 60 },
		{ top: -25, left: -90 },
		{ top: 5, left: 90 },
	];

	// Define as posições iniciais no carregamento
	letters.forEach((letter, index) => {
		const initialTop = initialPositions[index].top;
		const initialLeft = initialPositions[index].left;
		letter.style.top = `${initialTop}%`;
		letter.style.left = `${initialLeft}%`;
		letter.dataset.initialTop = initialTop;
		letter.dataset.initialLeft = initialLeft;
	});

	// Remove a transição para definir as posições iniciais sem animação
	letters.forEach(letter => {
		letter.style.transition = 'none';
	});

	// Adiciona a transição após o carregamento inicial
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			letters.forEach(letter => {
				letter.style.transition = 'top 1s, left 1s'; // Ajuste o tempo de transição conforme necessário
			});
		});
	});
});

document.addEventListener('scroll', () => {
	const blockBabi = document.querySelector('.block-babi');

	if (!blockBabi) {
		return;
	}

	const scrollTop = window.scrollY;
	const windowHeight = window.innerHeight;
	const totalAnimationScroll = windowHeight / 3; // Ajusta a altura da janela para a animação completa

	const letters = document.querySelectorAll('.letter');

	// Posições finais das letras (relativas ao contêiner .letters)
	const finalPositions = [
		{ top: 0, left: 0 },
		{ top: 0, left: 47 },
		{ top: 53, left: 0 },
		{ top: 53, left: 88 },
	];

	const scrollFactor = Math.min(scrollTop / totalAnimationScroll, 1);
	const speedFactor = 2; // Fator de aceleração reduzido

	// Atualiza posições dinamicamente
	letters.forEach((letter, index) => {
		const initialTop = parseFloat(letter.dataset.initialTop);
		const initialLeft = parseFloat(letter.dataset.initialLeft);
		const finalTop = finalPositions[index].top;
		const finalLeft = finalPositions[index].left;

		const newTop = initialTop + (finalTop - initialTop) * Math.min(scrollFactor * speedFactor, 1);
		const newLeft = initialLeft + (finalLeft - initialLeft) * Math.min(scrollFactor * speedFactor, 1);

		letter.style.top = `${newTop}%`;
		letter.style.left = `${newLeft}%`;
	});
});


document.addEventListener('DOMContentLoaded', function () {
	var aside = document.getElementById('sticky-aside');

	// Verifica se o elemento existe antes de continuar
	if (aside) {
		var stickyOffset = aside.offsetTop;

		window.addEventListener('scroll', function () {
			var scrollY = window.scrollY;
			var scrollHeight = document.documentElement.scrollHeight;
			var clientHeight = document.documentElement.clientHeight;

			if (scrollY > stickyOffset && scrollY + clientHeight + 40 >= scrollHeight) {
				aside.classList.add('hidden');
			} else {
				aside.classList.remove('hidden');
			}

			if (scrollY > stickyOffset && scrollY + clientHeight < scrollHeight) {
				aside.classList.add('fixed');
			} else {
				aside.classList.remove('fixed');
			}
		});
	}
});

let backButton = document.querySelector('.btn-back');
if (backButton) {

	function getBlogSection() {
		return document.querySelector(".section-itens");
	}

	function setScrollPosition() {
		let blogSection = getBlogSection();
		if (blogSection) {
			let scrollPositionBlog = blogSection.scrollTop;
			localStorage.setItem("scrollPositionBlog", scrollPositionBlog);
		}
	}

	function restoreScrollPosition() {
		let scrollPositionBlog = localStorage.getItem("scrollPositionBlog");
		if (scrollPositionBlog !== null) {
			let blogSection = getBlogSection();
			if (blogSection) {
				blogSection.scrollTop = parseInt(scrollPositionBlog, 10);
			}
		}
	}

	backButton.addEventListener('click', function (e) {
		e.preventDefault();
		setScrollPosition();
		window.history.back();
	});

	window.addEventListener('load', restoreScrollPosition);
}

// $(document).ready(function () {
// 	var $gallery = $('#justified-gallery');
// 	var $images = $gallery.find('img');
// 	var loadedImages = 0;

// 	function checkImagesLoaded() {
// 		if (loadedImages === $images.length) {
// 			$gallery.show().justifiedGallery({
// 				rowHeight: 400,
// 				margins: 25,
// 				lastRow: 'justify',
// 				//captions: true
// 			});
// 		}
// 	}

// 	$images.each(function () {
// 		var img = new Image();
// 		img.src = $(this).attr('src');
// 		img.onload = function () {
// 			loadedImages++;
// 			checkImagesLoaded();
// 		};
// 		img.onerror = function () {
// 			loadedImages++;
// 			checkImagesLoaded();
// 		};
// 	});
// });

// fade in right

(function () {
	var elements;
	var windowHeight;

	function init() {
		elements = document.querySelectorAll('.hide');
		windowHeight = window.innerHeight;
	}

	function checkPosition() {
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			var positionFromTop = elements[i].getBoundingClientRect().top;

			if (positionFromTop - windowHeight <= 10) {
				element.classList.add('fade-in');
				element.classList.remove('hidden');
			}
		}
	}

	window.addEventListener('scroll', checkPosition);
	window.addEventListener('resize', init);

	init();
	checkPosition();
})();

// marquee images

const wrapper = document.querySelector(".wrapper");
const boxes = gsap.utils.toArray(".box");

if (typeof (boxes) != 'undefined' && boxes != null && boxes.length > 0) {
	const loop = horizontalLoop(boxes, { repeat: -1, speed: .85 });

	function horizontalLoop(items, config) {
		items = gsap.utils.toArray(items);
		config = config || {};
		let tl = gsap.timeline({ repeat: config.repeat, paused: config.paused, defaults: { ease: "none" }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100) }),
			length = items.length,
			startX = items[0].offsetLeft,
			times = [],
			widths = [],
			xPercents = [],
			curIndex = 0,
			pixelsPerSecond = (config.speed || 1) * 100,
			snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
			totalWidth, curX, distanceToStart, distanceToLoop, item, i;

		// Verifica se os itens são válidos
		items = items.filter(item => item && item.offsetLeft !== undefined);

		if (items.length === 0) {
			console.error("No valid items found.");
			return;
		}

		gsap.set(items, {
			xPercent: (i, el) => {
				let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
				xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
				return xPercents[i];
			}
		});
		gsap.set(items, { x: 0 });

		totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0);
		for (i = 0; i < length; i++) {
			item = items[i];
			curX = xPercents[i] / 100 * widths[i];
			distanceToStart = item.offsetLeft + curX - startX;
			distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
			tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
				.fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
				.add("label" + i, distanceToStart / pixelsPerSecond);
			times[i] = distanceToStart / pixelsPerSecond;
		}

		function toIndex(index, vars) {
			vars = vars || {};
			(Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
			let newIndex = gsap.utils.wrap(0, length, index),
				time = times[newIndex];
			if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
				vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
				time += tl.duration() * (index > curIndex ? 1 : -1);
			}
			curIndex = newIndex;
			vars.overwrite = true;
			return tl.tweenTo(time, vars);
		}

		tl.next = vars => toIndex(curIndex + 1, vars);
		tl.previous = vars => toIndex(curIndex - 1, vars);
		tl.current = () => curIndex;
		tl.toIndex = (index, vars) => toIndex(index, vars);
		tl.times = times;
		tl.progress(1, true).progress(0, true); // pre-render for performance

		if (config.reversed) {
			tl.vars.onReverseComplete();
			tl.reverse();
		}

		return tl;
	}
}
