/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/shopee-link/edit.js":
/*!*********************************!*\
  !*** ./src/shopee-link/edit.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTemplate: function() { return /* binding */ getTemplate; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _template_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./template.json */ "./src/shopee-link/template.json");









const getTemplate = ({
  image = 'http://placehold.it/80x100?text=img',
  url = '',
  message = 'Your message go here',
  variations = false
}) => {
  let templateString = JSON.stringify(_template_json__WEBPACK_IMPORTED_MODULE_7__);
  let title = message;
  if (variations && variations.length > 0) {
    variations[0].options.forEach(item => {
      if (!!item.selected) {
        title += ` (${item.name})`;
      }
    });
  }
  templateString = templateString.replaceAll('{{link}}', url).replaceAll('{{message}}', title).replaceAll('{{image}}', image);
  return JSON.parse(templateString);
};
const ChildBlocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.withSelect)((select, ownProps) => {
  const blocks = select('core/block-editor').getBlocks(ownProps.clientId);
  let image = '';
  let message = '';
  const getBlockValue = (block, name, field) => {
    let value = false;
    block.innerBlocks.forEach(child => {
      if (value) return; // Skip
      if (child.name === name) {
        value = child.attributes[field];
      } else if (!!child.innerBlocks && child.innerBlocks.length > 0) {
        value = getBlockValue(child, name, field);
      }
    });
    return value;
  };
  if (blocks.length > 0) {
    // Just get innerBlock data
    image = getBlockValue(blocks[0], 'core/image', 'url');
    message = getBlockValue(blocks[0], 'core/navigation-link', 'label');
  }
  return {
    image,
    message
  };
})(({
  attributes,
  clientId,
  onChange,
  image,
  message
}) => {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useEffect)(() => {
    if (!image || !message) return;
    if (typeof onChange === 'function' && (image != attributes.image || message != attributes.message)) {
      onChange({
        image,
        message
      });
    }
  }, [image, message]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InnerBlocks, {
    template: getTemplate(attributes)
  });
});
const Edit = ({
  clientId,
  attributes,
  setAttributes
}) => {
  const {
    replaceInnerBlocks
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.store);
  const [variation, selectVariation] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)(attributes?.image);
  const updateBlockAttrs = async attrs => {
    const {
      url = false
    } = attrs;
    if (!!url && (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.isURL)(url)) {
      const response = await fetch(window.wpApiSettings.root + 'rb-blocks/v1/shopee?link=' + url, {
        headers: {
          'X-WP-Nonce': wpApiSettings.nonce
        }
      }).then(data => data.json());
      if (response.status === 'success') {
        if (!!response?.data?.name) {
          attrs.message = response.data.name;
        }
        if (!!response?.data?.images) {
          attrs.image = response?.data?.images[0];
        }
        if (!!response?.data?.variations) {
          attrs.variations = response?.data?.variations;
        }
      }
      attrs.url = url;
    }

    // Rerender blocks
    !!window.timeoutRenderBlocks && clearTimeout(window.timeoutRenderBlocks);
    window.timeoutRenderBlocks = setTimeout(() => {
      setAttributes(attrs);
      replaceInnerBlocks(clientId, (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__.createBlocksFromInnerBlocksTemplate)(getTemplate({
        ...attributes,
        ...attrs
      })));
      window.timeoutRenderBlocks = false;
    }, 1000);
  };
  const changeHandle = (newValue = '') => {
    updateBlockAttrs({
      url: newValue
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: 'Settings'
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalInputControl, {
    label: "Product Link",
    value: attributes.url,
    onChange: changeHandle
  }), !!attributes.variations && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: `Options ${attributes.variations[0].title}`,
    value: variation,
    options: attributes.variations[0].options.map(item => ({
      label: item.name,
      value: item.image || false
    })),
    onChange: value => {
      if ((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.isURL)(value)) {
        selectVariation(value);
        attributes.variations[0].options.map(item => {
          item.selected = item.image === value;
          return item;
        });
        console.log(attributes.variations);
        updateBlockAttrs({
          image: value,
          variations: attributes.variations
        });
      }
    },
    __nextHasNoMarginBottom: true
  }))), !!attributes.url && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ChildBlocks, {
    clientId: clientId,
    attributes: attributes,
    onChange: attrs => {
      setAttributes(attrs);
    }
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (Edit);

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ (function(module) {

module.exports = window["wp"]["url"];

/***/ }),

/***/ "./src/shopee-link/block.json":
/*!************************************!*\
  !*** ./src/shopee-link/block.json ***!
  \************************************/
/***/ (function(module) {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"rb-blocks/shopee-link","version":"0.1.0","title":"RB Embed Shopee Link","category":"common","icon":"smiley","description":"A block to quick share shopee link with auto generate thumbnail and description.","supports":{"html":true},"attributes":{"url":{"type":"string"},"image":{"type":"string"},"message":{"type":"string"},"variations":{"type":"array"}},"textdomain":"rb-blocks","editorScript":"file:./index.js"}');

/***/ }),

/***/ "./src/shopee-link/template.json":
/*!***************************************!*\
  !*** ./src/shopee-link/template.json ***!
  \***************************************/
/***/ (function(module) {

module.exports = JSON.parse('[["core/group",{"layout":{"type":"flex","orientation":"horizontal","justifyContent":"stretch","flexWrap":"nowrap","allowSizingOnChildren":true},"style":{"spacing":{"padding":{"top":"12px","bottom":"12px","left":"12px","right":"12px"},"blockGap":"12px"},"border":{"radius":"12px"},"alignItems":"stretch"},"backgroundColor":"base","lock":"all","allowedBlocks":["core/image","core/group","core/button","core/buttons","core/navigation-link"]},[["core/image",{"url":"{{image}}","width":"80px","href":"{{link}}","linkTarget":"_blank","rel":"noreferrer","aspectRatio":"0.75","object-fit":"cover","style":{"border":{"radius":"12px"}},"scale":"cover"}],["core/group",{"layout":{"type":"flex","orientation":"vertical","justifyContent":"stretch","flexWrap":"wrap","allowSizingOnChildren":true,"verticalAlignment":"space-between"},"style":{"layout":{"selfStretch":"fill"}}},[["core/navigation-link",{"url":"{{link}}","linkTarget":"_blank","label":"{{message}}","rel":"noreferrer","title":"{{message}}"}],["core/buttons",{"layout":{"type":"flex","justifyContent":"right"}},[["core/button",{"text":"xem","url":"{{link}}","fontSize":"small","style":{"border":{"radius":"4px"}}}]]]]]]]]');

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************************!*\
  !*** ./src/shopee-link/index.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./src/shopee-link/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/shopee-link/edit.js");



// Register the block
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_1__, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: () => null // Nil becuz this is dynamic block
});
}();
/******/ })()
;
//# sourceMappingURL=index.js.map