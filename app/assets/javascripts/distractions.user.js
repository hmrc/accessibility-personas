// ==UserScript==
// @name         Distractions
// @namespace    https://github.com/alphagov/accessibility-personas
// @version      1.0.0
// @license      ISC
// @author       Metamatrix AB [https://github.com/Metamatrix/web-disability-simulator] and Crown Copyright (Government Digital Service)
// @description  Clutter the screen with various distractions to simulate finding it hard to concentrate; has to be used together with distractions.user.css to work
// @homepageURL  https://alphagov.github.io/accessibility-personas/
// @include      *
// @grant        none
// @nocompat     Chrome
// ==/UserScript==

//dom elements to apply animations on
const h2 = "h2";
const p = "p";
const img = "img";

//dom elements to be created
const imgEl_0 = ".wds-img-element";
const textEl_0 = ".wds-text-element-0";
const textEl_1 = ".wds-text-element-1";
const textEl_2 = ".wds-text-element-2";
const textEl_3 = ".wds-text-element-3";
const textEl_4 = ".wds-text-element-4";

//classes for css animations
const paragraphAnimation = "wds-paragraph-animation";
const headingAnimation = "wds-heading-animation";
const imgAnimation_0 = "wds-img-animation-0";
const imgAnimation_1 = "wds-img-animation-1";
const textAnimation_0 = "wds-text-animation-0";
const textAnimation_1 = "wds-text-animation-1";
const textAnimation_2 = "wds-text-animation-2";
const textAnimation_3 = "wds-text-animation-3";
const textAnimation_4 = "wds-text-animation-4";

(function() {

  'use strict';

  function createElement(element, classname, textNode) {
    const el = document.createElement(element);
    el.setAttribute('class', classname);
    document.body.appendChild(el);
    if(textNode){
      el.appendChild(document.createTextNode(textNode));
    }
  }

  createElement('div', 'wds-img-element');

  function createTextElements(text, index) {
    createElement('span', `wds-text-element-${index}`, text);
  }

  const texts = ['Did I eat lunch?',
  'I have to get back to work soon...',
  'The ventilation sounds a lot today. bzzzzzz',
  'Should I answer that text message?',
  'Must concentrate, must concentrate, must concentrate'];

  texts.forEach(createTextElements);


  function addClass(element, classname) {
    const el = document.querySelectorAll(element);

    for (let i = 0; i < el.length; i++) {
        el[i].classList.toggle(classname);
    }

  }

  function removeClass(element, classname) {
    const el = document.querySelectorAll(element);

    for (let i = 0; i < el.length; i++) {
        el[i].classList.remove(classname);
    }

  }

  //add and remove animation classes, then loop

  function loopAnimations(){

    setTimeout(() => {
        addClass(p, paragraphAnimation);
        addClass(imgEl_0, imgAnimation_0);
        addClass(img, imgAnimation_1);
        addClass(h2, headingAnimation);
    }, 500);

    setTimeout(() => {
        removeClass(imgEl_0, imgAnimation_0);
        addClass(textEl_0 , textAnimation_0);
    }, 5000);

    setTimeout(() => {
      removeClass(textEl_0, textAnimation_0);
    }, 10000);

    setTimeout(() => {
        addClass(textEl_1, textAnimation_1);
    }, 15000);

    setTimeout(() => {
      removeClass(textEl_1, textAnimation_1);
    }, 20000);

    setTimeout(() => {
        addClass(textEl_2, textAnimation_2);
    }, 25000);

    setTimeout(() => {
      removeClass(textEl_2, textAnimation_2);
    }, 30000);

    setTimeout(() => {
        addClass(textEl_3, textAnimation_3);
    }, 35000);

    setTimeout(() => {
        removeClass(textEl_3, textAnimation_3);
    }, 40000);

    setTimeout(() => {
      addClass(textEl_4, textAnimation_4);
    }, 45000);

    setTimeout(() => {
        removeClass(textEl_4, textAnimation_4);
        removeClass(p, paragraphAnimation);
        removeClass(img, imgAnimation_1);
        removeClass(h2, headingAnimation);
        loopAnimations();
    }, 50000);

  }
  loopAnimations();

})();
