document.querySelector('.menu-action').addEventListener("click", (event) => {
	event.preventDefault();
	document.querySelector('.site-main-menu').classList.add('active');
	document.body.classList.add('unscrollable');
});

document.querySelector('.menu-search').addEventListener("click", (event) => {
	event.preventDefault();
	document.querySelector('.site-main-search').classList.add('active');
	document.body.classList.add('unscrollable');
});

if (document.querySelector('.menu-login')) {
	document.querySelector('.menu-login').addEventListener("click", (event) => {
		event.preventDefault();
		document.querySelector('.site-main-login').classList.add('active');
		document.body.classList.add('unscrollable');
	});
}

document.querySelectorAll('.menu-action-close').forEach(action => action.addEventListener("click", (event) => {
	event.preventDefault();
	document.querySelector('.site-main-menu').classList.remove('active');
	document.querySelector('.site-main-search').classList.remove('active');
	if (document.querySelector('.site-main-login')) {
		document.querySelector('.site-main-login').classList.remove('active');
	}
	document.body.classList.remove('unscrollable');
}));

// BANNER
const sliderContainer = document.querySelector('.cd-slider-wrapper');

if( sliderContainer.length > 0 ) initBlockSlider();

const initBlockSlider = () => {
    const slides = sliderContainer.querySelectorAll('.cd-slider li'),
        sliderPagination = sliderContainer.querySelectorAll('.cd-slider-navigation li')

    sliderPagination.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            var index = indexInParent(event.target);
            updateSlider(index, sliderPagination, slides);
        });
    });

    slides.forEach((slide) => {
        var visibleSlides = sliderContainer.querySelectorAll('.is-visible'),
        visibleSlide = visibleSlides[visibleSlides.length - 1],
        visibleSlideIndex = indexInParent(visibleSlide);

        slide.addEventListener('swipeleft', () => {
            if(!visibleSlide == slides.lastChild) {
                updateSlider(visibleSlideIndex + 1, sliderPagination, slides);
            }
        })
        slide.addEventListener('swiperight', () => {
            if(!visibleSlide == slides.firstChild) {
                updateSlider(visibleSlideIndex - 1, sliderPagination, slides);
            }
            
        })
    });
}

const indexInParent = (node) => {
    var children = node.parentNode.childNodes;
    var num = 0;
    for (var i=0; i<children.length; i++) {
         if (children[i]==node) return num;
         if (children[i].nodeType==1) num++;
    }
    return -1;
}

const updateSlider = (n, navigation, slides) => {
    navigation.classList.remove('selected');
    navigation[n].classList.add('selected');
    slides[n].classList.add('is-visible');
    slides[n].classList.remove('covered');

    var prev = slides[n].previousElementSibling;
    while (prev) {
        prev.classList.add('is-visible covered');
        prev = prev.previousElementSibling;
    }

    var next = slides[n].nextElementSibling;
    while (next) {
        next.classList.remove('is-visible covered');
        next = next.nextElementSibling;
    }

    //fixes a bug on Firefox with ul.cd-slider-navigation z-index
    navigation.parentNode.classList.add('slider-animating')
    navigation.parentNode.addEventListener('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', (event) => {
        event.target.classList.remove('slider-animating');
    });
}

const enableSwipe = () => {
    return ( document.querySelectorAll('.touch').length > 0 );
}