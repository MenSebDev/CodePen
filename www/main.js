/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/checks.ts":
/*!***********************!*\
  !*** ./src/checks.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAttributeName: () => (/* binding */ isAttributeName),
/* harmony export */   isAttributeValue: () => (/* binding */ isAttributeValue),
/* harmony export */   isChild: () => (/* binding */ isChild),
/* harmony export */   isChildren: () => (/* binding */ isChildren),
/* harmony export */   isEventCallback: () => (/* binding */ isEventCallback),
/* harmony export */   isEventType: () => (/* binding */ isEventType),
/* harmony export */   isFloat: () => (/* binding */ isFloat),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isProperty: () => (/* binding */ isProperty),
/* harmony export */   isVariable: () => (/* binding */ isVariable),
/* harmony export */   isVariables: () => (/* binding */ isVariables)
/* harmony export */ });
function isFloat(value) {
    return value !== Math.floor(value);
}
function isObject(obj) {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}
function isProperty(obj, key) {
    return isObject(obj) && Object.prototype.hasOwnProperty.call(obj, key);
}
function isVariable(value) {
    return (typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean');
}
function isVariables(obj) {
    if (!isObject(obj))
        return false;
    for (const key of Object.keys(obj)) {
        const value = obj[key];
        if (!(isVariable(value) || isVariables(value)))
            return false;
    }
    return true;
}
function isAttributeName(name, element) {
    return typeof name === 'string' && name in element;
}
function isAttributeValue(value) {
    return (typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean');
}
function isEventType(type, element) {
    return (typeof type === 'string' &&
        type.startsWith('on') &&
        type.slice(2).toLowerCase() in element);
}
function isEventCallback(callback) {
    return typeof callback === 'function';
}
function isChild(child) {
    return child instanceof Node || typeof child === 'string';
}
function isChildren(name, children) {
    return (name === 'children' &&
        (Array.isArray(children) ? children.every(isChild) : isChild(children)));
}


/***/ }),

/***/ "./src/utilities.ts":
/*!**************************!*\
  !*** ./src/utilities.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createClone: () => (/* binding */ createClone),
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   createElements: () => (/* binding */ createElements),
/* harmony export */   cssVariables: () => (/* binding */ cssVariables),
/* harmony export */   entries: () => (/* binding */ entries),
/* harmony export */   keys: () => (/* binding */ keys),
/* harmony export */   values: () => (/* binding */ values)
/* harmony export */ });
/* harmony import */ var _checks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checks */ "./src/checks.ts");

function createClone(element, index = 0, deep = true) {
    const node = typeof element === 'function' ? element(index) : element;
    return node.cloneNode(deep);
}
function createElement(props = {}) {
    const { tag = 'div', ...rest } = props;
    const attributes = rest;
    const element = document.createElement(tag);
    for (const name of keys(attributes)) {
        if (!(0,_checks__WEBPACK_IMPORTED_MODULE_0__.isProperty)(attributes, name))
            continue;
        const value = attributes[name];
        if ((0,_checks__WEBPACK_IMPORTED_MODULE_0__.isEventType)(name, element)) {
            const type = name.slice(2).toLowerCase();
            if ((0,_checks__WEBPACK_IMPORTED_MODULE_0__.isEventCallback)(value)) {
                element.addEventListener(type, value);
            }
        }
        else if ((0,_checks__WEBPACK_IMPORTED_MODULE_0__.isChildren)(name, value)) {
            const children = Array.isArray(value) ? value : [value];
            element.append(...children);
        }
        else if ((0,_checks__WEBPACK_IMPORTED_MODULE_0__.isAttributeName)(name, element) && (0,_checks__WEBPACK_IMPORTED_MODULE_0__.isAttributeValue)(value)) {
            element.setAttribute(name === 'className' ? 'class' : name, value);
        }
    }
    return element;
}
function createElements(length = 1, element = createElement(), deep = true) {
    return Array.from({ length: length < 1 ? 1 : length }, (_, index) => createClone(element, index, deep));
}
function cssVariables(variables, prefix = '') {
    const result = [];
    for (const [key, value] of Object.entries(variables)) {
        const variable = prefix === '' ? key : `${prefix}-${key}`;
        if ((0,_checks__WEBPACK_IMPORTED_MODULE_0__.isAttributeValue)(value)) {
            result.push(`--${variable}:${value.toString()}`);
        }
        else if ((0,_checks__WEBPACK_IMPORTED_MODULE_0__.isObject)(value)) {
            result.push(cssVariables(value, variable));
        }
    }
    return result.join(';');
}
function keys(obj) {
    return Object.keys(obj);
}
function values(obj) {
    return Object.values(obj);
}
function entries(obj) {
    return Object.entries(obj);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./src/utilities.ts");

const el = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    children: [
        (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.createElement)({
            className: 'child',
        }),
    ],
    className: 'test',
});
document.body.appendChild(el);

})();

/******/ })()
;
//# sourceMappingURL=main.js.map