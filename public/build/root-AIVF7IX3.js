import{a as b,b as k,c as M,d as O,e as L,g as j}from"/build/_shared/chunk-LGCNW3DX.js";import{a as P,b as G,c as _,d as A,e as T,g as w,h as s,i as h}from"/build/_shared/chunk-2ADOHOB6.js";var U={};_(U,{DEFAULT_ID:()=>C,Loader:()=>c,LoaderStatus:()=>u});var K,C,u,c,D=P(()=>{h();K=function i(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var n,r,a;if(Array.isArray(e)){if(n=e.length,n!=t.length)return!1;for(r=n;r--!==0;)if(!i(e[r],t[r]))return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();if(a=Object.keys(e),n=a.length,n!==Object.keys(t).length)return!1;for(r=n;r--!==0;)if(!Object.prototype.hasOwnProperty.call(t,a[r]))return!1;for(r=n;r--!==0;){var o=a[r];if(!i(e[o],t[o]))return!1}return!0}return e!==e&&t!==t},C="__googleMapsScriptId";(function(i){i[i.INITIALIZED=0]="INITIALIZED",i[i.LOADING=1]="LOADING",i[i.SUCCESS=2]="SUCCESS",i[i.FAILURE=3]="FAILURE"})(u||(u={}));c=class{constructor({apiKey:e,authReferrerPolicy:t,channel:n,client:r,id:a=C,language:o,libraries:p=[],mapIds:d,nonce:E,region:g,retries:I=3,url:m="https://maps.googleapis.com/maps/api/js",version:f}){if(this.CALLBACK="__googleMapsCallback",this.callbacks=[],this.done=!1,this.loading=!1,this.errors=[],this.apiKey=e,this.authReferrerPolicy=t,this.channel=n,this.client=r,this.id=a||C,this.language=o,this.libraries=p,this.mapIds=d,this.nonce=E,this.region=g,this.retries=I,this.url=m,this.version=f,c.instance){if(!K(this.options,c.instance.options))throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(c.instance.options)}`);return c.instance}c.instance=this}get options(){return{version:this.version,apiKey:this.apiKey,channel:this.channel,client:this.client,id:this.id,libraries:this.libraries,language:this.language,region:this.region,mapIds:this.mapIds,nonce:this.nonce,url:this.url,authReferrerPolicy:this.authReferrerPolicy}}get status(){return this.errors.length?u.FAILURE:this.done?u.SUCCESS:this.loading?u.LOADING:u.INITIALIZED}get failed(){return this.done&&!this.loading&&this.errors.length>=this.retries+1}createUrl(){let e=this.url;return e+=`?callback=${this.CALLBACK}`,this.apiKey&&(e+=`&key=${this.apiKey}`),this.channel&&(e+=`&channel=${this.channel}`),this.client&&(e+=`&client=${this.client}`),this.libraries.length>0&&(e+=`&libraries=${this.libraries.join(",")}`),this.language&&(e+=`&language=${this.language}`),this.region&&(e+=`&region=${this.region}`),this.version&&(e+=`&v=${this.version}`),this.mapIds&&(e+=`&map_ids=${this.mapIds.join(",")}`),this.authReferrerPolicy&&(e+=`&auth_referrer_policy=${this.authReferrerPolicy}`),e}deleteScript(){let e=document.getElementById(this.id);e&&e.remove()}load(){return this.loadPromise()}loadPromise(){return new Promise((e,t)=>{this.loadCallback(n=>{n?t(n.error):e(window.google)})})}loadCallback(e){this.callbacks.push(e),this.execute()}setScript(){if(document.getElementById(this.id)){this.callback();return}let e=this.createUrl(),t=document.createElement("script");t.id=this.id,t.type="text/javascript",t.src=e,t.onerror=this.loadErrorCallback.bind(this),t.defer=!0,t.async=!0,this.nonce&&(t.nonce=this.nonce),document.head.appendChild(t)}reset(){this.deleteScript(),this.done=!1,this.loading=!1,this.errors=[],this.onerrorEvent=null}resetIfRetryingFailed(){this.failed&&this.reset()}loadErrorCallback(e){if(this.errors.push(e),this.errors.length<=this.retries){let t=this.errors.length*Math.pow(2,this.errors.length);console.log(`Failed to load Google Maps script, retrying in ${t} ms.`),setTimeout(()=>{this.deleteScript(),this.setScript()},t)}else this.onerrorEvent=e,this.callback()}setCallback(){window.__googleMapsCallback=this.callback.bind(this)}callback(){this.done=!0,this.loading=!1,this.callbacks.forEach(e=>{e(this.onerrorEvent)}),this.callbacks=[]}execute(){if(this.resetIfRetryingFailed(),this.done)this.callback();else{if(window.google&&window.google.maps&&window.google.maps.version){console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match."),this.callback();return}this.loading||(this.loading=!0,this.setCallback(),this.setScript())}}}});var N=G((y,F)=>{h();(function(i,e){typeof y=="object"&&typeof F<"u"?e(y,(D(),T(U)),w()):typeof define=="function"&&define.amd?define(["exports","@googlemaps/js-api-loader","react"],e):(i=typeof globalThis<"u"?globalThis:i||self,e(i.Loader={},i.jsApiLoader,i.React))})(y,function(i,e,t){"use strict";function n(o){return o&&typeof o=="object"&&"default"in o?o:{default:o}}var r=n(t);i.Status=void 0,function(o){o.LOADING="LOADING",o.FAILURE="FAILURE",o.SUCCESS="SUCCESS"}(i.Status||(i.Status={}));let a=({children:o,render:p,callback:d,...E})=>{let[g,I]=t.useState(i.Status.LOADING);return t.useEffect(()=>{let m=new e.Loader(E),f=v=>{d&&d(v,m),I(v)};f(i.Status.LOADING),m.load().then(()=>f(i.Status.SUCCESS),()=>f(i.Status.FAILURE))},[]),g===i.Status.SUCCESS&&o?r.default.createElement(r.default.Fragment,null,o):p?p(g):r.default.createElement(r.default.Fragment,null)};i.Wrapper=a,Object.defineProperty(i,"__esModule",{value:!0})})});h();h();var S=A(N()),l=A(w()),q=()=>({charset:"utf-8",title:"New Remix App",viewport:"width=device-width,initial-scale=1"}),B=i=>i===S.Status.FAILURE?s.createElement("p",null,"Error"):s.createElement("p",null,"spinner"),R=({children:i})=>{let e=(0,l.useRef)(null),[t,n]=(0,l.useState)();return(0,l.useEffect)(()=>{if(e.current&&!t){var r=new google.maps.LatLng(-34.397,150.644);n(new window.google.maps.Map(e.current,{zoom:8,center:r}))}},[e,t]),s.createElement(s.Fragment,null,s.createElement("div",{ref:e,style:{width:800,height:600}}),l.Children.map(i,r=>{if((0,l.isValidElement)(r))return(0,l.cloneElement)(r,{map:t})}))},x=i=>{let[e,t]=(0,l.useState)();return(0,l.useEffect)(()=>(e||t(new google.maps.Marker),()=>{e&&e.setMap(null)}),[e]),(0,l.useEffect)(()=>{if(e){let n=new google.maps.LatLng(-34.397,150.644),r={};r=Object.assign(r,i,{position:n}),e.setOptions(r)}},[e,i]),null};function $(){return s.createElement("html",{lang:"en"},s.createElement("head",null,s.createElement(M,null),s.createElement(k,null)),s.createElement("body",null,s.createElement(S.Wrapper,{apiKey:"AIzaSyAnOd-ezmIIpuGq1QUyPkMBD0Omsx6qy60",render:B},s.createElement(R,null,s.createElement(x,null))),s.createElement(b,null),s.createElement(j,null),s.createElement(O,null),s.createElement(L,null)))}export{$ as default,q as meta};
