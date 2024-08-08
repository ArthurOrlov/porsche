document.querySelector('.item__tech-btn').addEventListener('click', function(){
    document.querySelector('#characteristic').classList.toggle('is-active')
})
document.querySelector('.item__tech-btn-boxster').addEventListener('click', function(){
    document.querySelector('#characteristicBoxster').classList.toggle('is-active')
})
document.querySelector('.item__tech-btn-caymans').addEventListener('click', function(){
    document.querySelector('#characteristicCaymanS').classList.toggle('is-active')
})
document.querySelector('.item__tech-btn-boxsters').addEventListener('click', function(){
    document.querySelector('#characteristicBoxsterS').classList.toggle('is-active')
})

document.querySelector('#characteristic_close').addEventListener('click', function(){
    document.querySelector('#characteristic').classList.remove('is-active')
})
document.querySelector('#characteristic_close2').addEventListener('click', function(){
    document.querySelector('#characteristicBoxster').classList.remove('is-active')
})
document.querySelector('#characteristic_close3').addEventListener('click', function(){
    document.querySelector('#characteristicCaymanS').classList.remove('is-active')
})
document.querySelector('#characteristic_close4').addEventListener('click', function(){
    document.querySelector('#characteristicBoxsterS').classList.remove('is-active')
})

// Аккордион 

var containers;
function initDrawers() {
	containers = document.querySelectorAll(".container");
	setHeights();
	wireUpTriggers();
	window.addEventListener("resize", setHeights);
}

window.addEventListener("load", initDrawers);

function setHeights() {
	containers.forEach(container => {
		let content = container.querySelector(".content");
		content.removeAttribute("aria-hidden");
		let heightOfContent = content.getBoundingClientRect().height;
		container.style.setProperty("--containerHeight", `${heightOfContent}px`);
		setTimeout(e => {
			container.classList.add("height-is-set");
			content.setAttribute("aria-hidden", "true");
		}, 0);
	});
}

function wireUpTriggers() {
	containers.forEach(container => {
		let btn = container.querySelector(".trigger");
		let content = container.querySelector(".content");
		btn.addEventListener("click", () => {
			container.setAttribute(
				"data-drawer-showing",
				container.getAttribute("data-drawer-showing") === "true" ? "false" : "true"
			);
			content.setAttribute(
				"aria-hidden",
				content.getAttribute("aria-hidden") === "true" ? "false" : "true"
			);
		});
	});
}

// слайдер model

var testimonialItems = document.querySelectorAll(".item label");
var timer;
function cycleTestimonials(index) {
   timer = setTimeout(function() {
    var evt;
    if (document.createEvent){
      evt = document.createEvent('MouseEvent');
      evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    } else {
      evt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: 20
          });
    }
    var ele = "." + testimonialItems[index].className;
    var ele2 = document.querySelector(ele)
    ele2.dispatchEvent(evt);
    index++;
    if (index >= testimonialItems.length) {
      index = 0;
    }
    cycleTestimonials(index);
    document.querySelector(".testimonials").addEventListener("click", function() {
      clearTimeout(timer);
    });
  }, 3000); 
}

cycleTestimonials(0);

/* слайдер фото  */

var slider = document.getElementById('slider'),
    sliderItems = document.getElementById('items'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');
slide(slider, sliderItems, prev, next);
function slide(wrapper, items, prev, next) {
  var posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slides = items.getElementsByClassName('slide'),
      slidesLength = slides.length,
      slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
      firstSlide = slides[0],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0,
      allowShift = true;
  
  // Clone first and last slide
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  wrapper.classList.add('loaded');
  
  // Mouse and Touch events
  items.onmousedown = dragStart;
  
  // Touch events
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);
  
  // Click events
  prev.addEventListener('click', function () { shiftSlide(-1) });
  next.addEventListener('click', function () { shiftSlide(1) });
  
  // Transition events
  items.addEventListener('transitionend', checkIndex);
  
  function dragStart (e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;
    
    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }
  function dragAction (e) {
    e = e || window.event;
    
    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = (items.offsetLeft - posX2) + "px";
  }
  
  function dragEnd (e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      items.style.left = (posInitial) + "px";
    }
    document.onmouseup = null;
    document.onmousemove = null;
  }
  
  function shiftSlide(dir, action) {
    items.classList.add('shifting');
    
    if (allowShift) {
      if (!action) { posInitial = items.offsetLeft; }
      if (dir == 1) {
        items.style.left = (posInitial - slideSize) + "px";
        index++;      
      } else if (dir == -1) {
        items.style.left = (posInitial + slideSize) + "px";
        index--;      
      }
    };
    
    allowShift = false;
  }
    
  function checkIndex (){
    items.classList.remove('shifting');
    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }
    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }
    
    allowShift = true;
  }
}