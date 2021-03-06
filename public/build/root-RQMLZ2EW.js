import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "/build/_shared/chunk-KZIW5VEW.js";
import {
  React,
  __commonJS,
  __esm,
  __export,
  __toCommonJS,
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-XV23MX66.js";

// node_modules/@googlemaps/js-api-loader/dist/index.esm.js
var index_esm_exports = {};
__export(index_esm_exports, {
  DEFAULT_ID: () => DEFAULT_ID,
  Loader: () => Loader,
  LoaderStatus: () => LoaderStatus
});
var fastDeepEqual, DEFAULT_ID, LoaderStatus, Loader;
var init_index_esm = __esm({
  "node_modules/@googlemaps/js-api-loader/dist/index.esm.js"() {
    init_react();
    fastDeepEqual = function equal(a, b) {
      if (a === b)
        return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor)
          return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i]))
              return false;
          return true;
        }
        if (a.constructor === RegExp)
          return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf)
          return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString)
          return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length)
          return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
            return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key]))
            return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
    DEFAULT_ID = "__googleMapsScriptId";
    (function(LoaderStatus2) {
      LoaderStatus2[LoaderStatus2["INITIALIZED"] = 0] = "INITIALIZED";
      LoaderStatus2[LoaderStatus2["LOADING"] = 1] = "LOADING";
      LoaderStatus2[LoaderStatus2["SUCCESS"] = 2] = "SUCCESS";
      LoaderStatus2[LoaderStatus2["FAILURE"] = 3] = "FAILURE";
    })(LoaderStatus || (LoaderStatus = {}));
    Loader = class {
      constructor({ apiKey, authReferrerPolicy, channel, client, id = DEFAULT_ID, language, libraries = [], mapIds, nonce, region, retries = 3, url = "https://maps.googleapis.com/maps/api/js", version }) {
        this.CALLBACK = "__googleMapsCallback";
        this.callbacks = [];
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.apiKey = apiKey;
        this.authReferrerPolicy = authReferrerPolicy;
        this.channel = channel;
        this.client = client;
        this.id = id || DEFAULT_ID;
        this.language = language;
        this.libraries = libraries;
        this.mapIds = mapIds;
        this.nonce = nonce;
        this.region = region;
        this.retries = retries;
        this.url = url;
        this.version = version;
        if (Loader.instance) {
          if (!fastDeepEqual(this.options, Loader.instance.options)) {
            throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Loader.instance.options)}`);
          }
          return Loader.instance;
        }
        Loader.instance = this;
      }
      get options() {
        return {
          version: this.version,
          apiKey: this.apiKey,
          channel: this.channel,
          client: this.client,
          id: this.id,
          libraries: this.libraries,
          language: this.language,
          region: this.region,
          mapIds: this.mapIds,
          nonce: this.nonce,
          url: this.url,
          authReferrerPolicy: this.authReferrerPolicy
        };
      }
      get status() {
        if (this.errors.length) {
          return LoaderStatus.FAILURE;
        }
        if (this.done) {
          return LoaderStatus.SUCCESS;
        }
        if (this.loading) {
          return LoaderStatus.LOADING;
        }
        return LoaderStatus.INITIALIZED;
      }
      get failed() {
        return this.done && !this.loading && this.errors.length >= this.retries + 1;
      }
      createUrl() {
        let url = this.url;
        url += `?callback=${this.CALLBACK}`;
        if (this.apiKey) {
          url += `&key=${this.apiKey}`;
        }
        if (this.channel) {
          url += `&channel=${this.channel}`;
        }
        if (this.client) {
          url += `&client=${this.client}`;
        }
        if (this.libraries.length > 0) {
          url += `&libraries=${this.libraries.join(",")}`;
        }
        if (this.language) {
          url += `&language=${this.language}`;
        }
        if (this.region) {
          url += `&region=${this.region}`;
        }
        if (this.version) {
          url += `&v=${this.version}`;
        }
        if (this.mapIds) {
          url += `&map_ids=${this.mapIds.join(",")}`;
        }
        if (this.authReferrerPolicy) {
          url += `&auth_referrer_policy=${this.authReferrerPolicy}`;
        }
        return url;
      }
      deleteScript() {
        const script = document.getElementById(this.id);
        if (script) {
          script.remove();
        }
      }
      load() {
        return this.loadPromise();
      }
      loadPromise() {
        return new Promise((resolve, reject) => {
          this.loadCallback((err) => {
            if (!err) {
              resolve(window.google);
            } else {
              reject(err.error);
            }
          });
        });
      }
      loadCallback(fn) {
        this.callbacks.push(fn);
        this.execute();
      }
      setScript() {
        if (document.getElementById(this.id)) {
          this.callback();
          return;
        }
        const url = this.createUrl();
        const script = document.createElement("script");
        script.id = this.id;
        script.type = "text/javascript";
        script.src = url;
        script.onerror = this.loadErrorCallback.bind(this);
        script.defer = true;
        script.async = true;
        if (this.nonce) {
          script.nonce = this.nonce;
        }
        document.head.appendChild(script);
      }
      reset() {
        this.deleteScript();
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.onerrorEvent = null;
      }
      resetIfRetryingFailed() {
        if (this.failed) {
          this.reset();
        }
      }
      loadErrorCallback(e) {
        this.errors.push(e);
        if (this.errors.length <= this.retries) {
          const delay = this.errors.length * Math.pow(2, this.errors.length);
          console.log(`Failed to load Google Maps script, retrying in ${delay} ms.`);
          setTimeout(() => {
            this.deleteScript();
            this.setScript();
          }, delay);
        } else {
          this.onerrorEvent = e;
          this.callback();
        }
      }
      setCallback() {
        window.__googleMapsCallback = this.callback.bind(this);
      }
      callback() {
        this.done = true;
        this.loading = false;
        this.callbacks.forEach((cb) => {
          cb(this.onerrorEvent);
        });
        this.callbacks = [];
      }
      execute() {
        this.resetIfRetryingFailed();
        if (this.done) {
          this.callback();
        } else {
          if (window.google && window.google.maps && window.google.maps.version) {
            console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match.");
            this.callback();
            return;
          }
          if (this.loading)
            ;
          else {
            this.loading = true;
            this.setCallback();
            this.setScript();
          }
        }
      }
    };
  }
});

// node_modules/@googlemaps/react-wrapper/dist/index.umd.js
var require_index_umd = __commonJS({
  "node_modules/@googlemaps/react-wrapper/dist/index.umd.js"(exports, module) {
    init_react();
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, (init_index_esm(), __toCommonJS(index_esm_exports)), require_react()) : typeof define === "function" && define.amd ? define(["exports", "@googlemaps/js-api-loader", "react"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.Loader = {}, global.jsApiLoader, global.React));
    })(exports, function(exports2, jsApiLoader, React2) {
      "use strict";
      function _interopDefaultLegacy(e) {
        return e && typeof e === "object" && "default" in e ? e : { "default": e };
      }
      var React__default = /* @__PURE__ */ _interopDefaultLegacy(React2);
      exports2.Status = void 0;
      (function(Status2) {
        Status2["LOADING"] = "LOADING";
        Status2["FAILURE"] = "FAILURE";
        Status2["SUCCESS"] = "SUCCESS";
      })(exports2.Status || (exports2.Status = {}));
      const Wrapper2 = ({ children, render, callback, ...options }) => {
        const [status, setStatus] = React2.useState(exports2.Status.LOADING);
        React2.useEffect(() => {
          const loader = new jsApiLoader.Loader(options);
          const setStatusAndExecuteCallback = (status2) => {
            if (callback)
              callback(status2, loader);
            setStatus(status2);
          };
          setStatusAndExecuteCallback(exports2.Status.LOADING);
          loader.load().then(() => setStatusAndExecuteCallback(exports2.Status.SUCCESS), () => setStatusAndExecuteCallback(exports2.Status.FAILURE));
        }, []);
        if (status === exports2.Status.SUCCESS && children)
          return React__default["default"].createElement(React__default["default"].Fragment, null, children);
        if (render)
          return render(status);
        return React__default["default"].createElement(React__default["default"].Fragment, null);
      };
      exports2.Wrapper = Wrapper2;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// browser-route-module:/Users/seathomp1/Documents/diser/app/root.tsx?browser
init_react();

// app/root.tsx
init_react();
var import_react_wrapper = __toESM(require_index_umd());
var import_react2 = __toESM(require_react());

// node_modules/@googlemaps/markerclusterer/dist/index.esm.js
init_react();

// node_modules/supercluster/index.js
init_react();

// node_modules/kdbush/src/index.js
init_react();

// node_modules/kdbush/src/sort.js
init_react();

// node_modules/kdbush/src/range.js
init_react();

// node_modules/kdbush/src/within.js
init_react();

// node_modules/supercluster/index.js
var fround = Math.fround || ((tmp) => (x) => {
  tmp[0] = +x;
  return tmp[0];
})(new Float32Array(1));

// node_modules/@googlemaps/markerclusterer/dist/index.esm.js
var MarkerClustererEvents;
(function(MarkerClustererEvents2) {
  MarkerClustererEvents2["CLUSTERING_BEGIN"] = "clusteringbegin";
  MarkerClustererEvents2["CLUSTERING_END"] = "clusteringend";
  MarkerClustererEvents2["CLUSTER_CLICK"] = "click";
})(MarkerClustererEvents || (MarkerClustererEvents = {}));

// app/root.tsx
var meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1"
});
var renderMappy = (status) => {
  if (status === import_react_wrapper.Status.FAILURE)
    return /* @__PURE__ */ React.createElement("p", null, "Error");
  return /* @__PURE__ */ React.createElement("p", null, "spinner");
};
var MyMapComponent = ({ children }) => {
  const ref = (0, import_react2.useRef)(null);
  const [map2, setMap] = (0, import_react2.useState)();
  (0, import_react2.useEffect)(() => {
    if (ref.current && !map2) {
      var latlng = new google.maps.LatLng(-34.397, 150.644);
      setMap(new window.google.maps.Map(ref.current, { zoom: 8, center: latlng }));
    }
  }, [ref, map2]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    ref,
    style: { width: 800, height: 600 }
  }), import_react2.Children.map(children, (child) => {
    if ((0, import_react2.isValidElement)(child)) {
      return (0, import_react2.cloneElement)(child, { map: map2 });
    }
  }));
};
var Marker = (options) => {
  const [marker, setMarker] = (0, import_react2.useState)();
  (0, import_react2.useEffect)(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);
  (0, import_react2.useEffect)(() => {
    if (marker) {
      const latlng = new google.maps.LatLng(-34.397, 150.644);
      let floptions = {};
      floptions = Object.assign(floptions, options, { position: latlng });
      marker.setOptions(floptions);
    }
  }, [marker, options]);
  return null;
};
function App() {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(Meta, null), /* @__PURE__ */ React.createElement(Links, null)), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement(import_react_wrapper.Wrapper, {
    apiKey: "AIzaSyBvgHxoy6xYPJbq_q9_0fe8LvNiGXfLOjo",
    render: renderMappy
  }, /* @__PURE__ */ React.createElement(MyMapComponent, null, /* @__PURE__ */ React.createElement(Marker, null))), /* @__PURE__ */ React.createElement(Outlet, null), /* @__PURE__ */ React.createElement(ScrollRestoration, null), /* @__PURE__ */ React.createElement(Scripts, null), /* @__PURE__ */ React.createElement(LiveReload, null)));
}
export {
  App as default,
  meta
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
//# sourceMappingURL=/build/root-RQMLZ2EW.js.map
