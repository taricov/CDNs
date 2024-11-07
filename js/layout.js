// Immediately Invoked Function Expression (IIFE) to encapsulate the code and avoid polluting the global scope
(function (global, factory) {
  if (typeof exports === "object" && typeof module === "object") {
    // Export as a module if possible (Node.js/CommonJS)
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    // Define as an AMD module if applicable
    define([], factory);
  } else {
    // Otherwise, attach to the global object (e.g., window in browsers)
    var moduleExports = factory();
    for (var key in moduleExports) {
      (typeof exports === "object" ? exports : global)[key] = moduleExports[key];
    }
  }
})(self, function () {
  "use strict";

  // Module setup
  var __webpack_exports__ = {};

  // Helper function to mark the module as ES Module
  function __setModuleDefault(exports) {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  }

  // Set up exports
  __setModuleDefault(__webpack_exports__);

  // Utility function for type-checking with Symbol support
  function getType(value) {
    return typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
      ? typeof value
      : value && typeof Symbol === "function" && value.constructor === Symbol && value !== Symbol.prototype
        ? "symbol"
        : typeof value;
  }

  // Helper function to define properties
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, toPrimitive(descriptor.key), descriptor);
    }
  }

  // Helper function for primitive conversion
  function toPrimitive(input) {
    var key = (input, "string");
    return typeof Symbol === "function" && getType(input) === "symbol"
      ? input
      : input + "";
  }

  // Class definition with methods
  var LayoutManager = (function () {
    function LayoutManager() {
      if (!(this instanceof LayoutManager)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var protoProps = [
      {
        key: "_isSidebarCollapse",
        value: function () {
          return document.body.classList.contains("sidebar-collapse");
        }
      },
      {
        key: "_handleMegaMenu",
        value: function () {
          var megaMenu = document.querySelector("#mega_menu");
          if (megaMenu) {
            var menuInstance = KTMenu.getInstance(megaMenu);
            menuInstance.disable();
            setTimeout(function () {
              menuInstance.enable();
            }, 500);
          }
        }
      },
      {
        key: "_handleSidebar",
        value: function () {
          var self = this;
          var toggleInstance = KTToggle.getInstance(this.sidebarToggleEl);
          if (toggleInstance) {
            toggleInstance.on("toggle", function () {
              self.sidebarEl.classList.add("animating");
              self._handleMegaMenu();
              KTDom.transitionEnd(self.sidebarEl, function () {
                self.sidebarEl.classList.remove("animating");
              });
            });
          }
        }
      },
      {
        key: "_handleSidebarMenu",
        value: function () {
          var sidebarMenu = document.querySelector("#sidebar_menu");
          var sidebarScrollable = document.querySelector("#sidebar_scrollable");
          var activeItem = sidebarMenu.querySelector(".menu-item.active");

          if (activeItem && !KTDom.isVisibleInParent(activeItem, sidebarScrollable)) {
            sidebarScrollable.scroll({
              top: KTDom.getRelativeTopPosition(activeItem, sidebarScrollable) - 100,
              behavior: "instant"
            });
          }
        }
      },
      {
        key: "init",
        value: function () {
          this.sidebarEl = document.querySelector("#sidebar");
          this.sidebarWrapperEl = document.querySelector("#sidebar_wrapper");
          this.headerEl = document.querySelector("#header");
          this.sidebarToggleEl = document.querySelector("#sidebar_toggle");

          if (this.sidebarEl && this.sidebarToggleEl) {
            this._handleSidebar();
            this._handleSidebarMenu();
          }
        }
      },
      {
        key: "isSidebarCollapse",
        value: function () {
          return this._isSidebarCollapse();
        }
      }
    ];

    defineProperties(LayoutManager.prototype, protoProps);

    // Mark class prototype as non-writable
    Object.defineProperty(LayoutManager, "prototype", { writable: false });

    return LayoutManager;
  })();

  // Initialize the layout manager when the DOM is ready
  KTDom.ready(function () {
    LayoutManager.init();
  });

  // Export the default instance
  __webpack_exports__.default = LayoutManager;

  return __webpack_exports__;
});
