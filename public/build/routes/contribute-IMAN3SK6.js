import {
  Box_default,
  Button_default,
  Header,
  require_createSvgIcon,
  require_interopRequireDefault,
  require_jsx_runtime
} from "/build/_shared/chunk-X2JWR37W.js";
import "/build/_shared/chunk-LYBWQ6RX.js";
import {
  React,
  __commonJS,
  __toESM,
  init_react
} from "/build/_shared/chunk-JMDK7EPH.js";

// node_modules/@mui/icons-material/Add.js
var require_Add = __commonJS({
  "node_modules/@mui/icons-material/Add.js"(exports) {
    "use strict";
    init_react();
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _createSvgIcon = _interopRequireDefault(require_createSvgIcon());
    var _jsxRuntime = require_jsx_runtime();
    var _default = (0, _createSvgIcon.default)(/* @__PURE__ */ (0, _jsxRuntime.jsx)("path", {
      d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
    }), "Add");
    exports.default = _default;
  }
});

// browser-route-module:/Users/seathomp1/Documents/diser/app/routes/contribute.tsx?browser
init_react();

// app/routes/contribute.tsx
init_react();

// app/components/FileUpload.tsx
init_react();
var import_Add = __toESM(require_Add());
var FileUpload = () => {
  const setFile = (file) => {
    console.log(file);
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "App"
  }, /* @__PURE__ */ React.createElement(Button_default, {
    variant: "contained",
    component: "label",
    color: "primary"
  }, " ", /* @__PURE__ */ React.createElement(import_Add.default, null), " Upload a file", /* @__PURE__ */ React.createElement("input", {
    type: "file",
    hidden: true,
    onChange: setFile
  })));
};

// app/routes/contribute.tsx
function Contribute() {
  return /* @__PURE__ */ React.createElement("div", {
    style: { fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }
  }, /* @__PURE__ */ React.createElement(Header, null), /* @__PURE__ */ React.createElement(Box_default, {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh"
  }, /* @__PURE__ */ React.createElement(FileUpload, null)));
}
export {
  Contribute as default
};
//# sourceMappingURL=/build/routes/contribute-IMAN3SK6.js.map
