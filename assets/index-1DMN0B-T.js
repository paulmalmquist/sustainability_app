var e=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var t=e((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var ee=Array.isArray;function te(){}var C={H:null,A:null,T:null,S:null},w=Object.prototype.hasOwnProperty;function T(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function ne(e,t){return T(e.type,t,e.props)}function E(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function D(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var O=/\/+/g;function k(e,t){return typeof e==`object`&&e&&e.key!=null?D(``+e.key):t.toString(36)}function re(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(te,te):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function ie(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,ie(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+k(e,0):a,ee(o)?(i=``,c!=null&&(i=c.replace(O,`$&/`)+`/`),ie(o,r,i,``,function(e){return e})):o!=null&&(E(o)&&(o=ne(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(O,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(ee(e))for(var u=0;u<e.length;u++)a=e[u],s=l+k(a,u),c+=ie(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+k(a,u++),c+=ie(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return ie(re(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ae(e,t,n){if(e==null)return e;var r=[],i=0;return ie(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function A(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var oe=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function se(e){var t=C.T,n={};n.types=t===null?null:t.types,C.T=n;try{var r=e(),i=C.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(te,oe)}catch(e){oe(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),C.T=t}}function ce(e){var t=C.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else se(ce.bind(null,e))}var le={map:ae,forEach:function(e,t,n){ae(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ae(e,function(){t++}),t},toArray:function(e){return ae(e,function(e){return e})||[]},only:function(e){if(!E(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=le,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=C,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return C.H.useMemoCache(e)}},e.addTransitionType=ce,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!w.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return T(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)w.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return T(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=E,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:A}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=se,e.unstable_useCacheRefresh=function(){return C.H.useCacheRefresh()},e.use=function(e){return C.H.use(e)},e.useActionState=function(e,t,n){return C.H.useActionState(e,t,n)},e.useCallback=function(e,t){return C.H.useCallback(e,t)},e.useContext=function(e){return C.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return C.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return C.H.useEffect(e,t)},e.useEffectEvent=function(e){return C.H.useEffectEvent(e)},e.useId=function(){return C.H.useId()},e.useImperativeHandle=function(e,t,n){return C.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return C.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return C.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return C.H.useMemo(e,t)},e.useOptimistic=function(e,t){return C.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return C.H.useReducer(e,t,n)},e.useRef=function(e){return C.H.useRef(e)},e.useState=function(e){return C.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return C.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return C.H.useTransition()},e.version=`19.3.1`})),n=e(((e,n)=>{n.exports=t()})),r=e((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,ne());else{var t=n(l);t!==null&&O(x,t.startTime-e)}}}var S=!1,ee=-1,te=5,C=-1;function w(){return g?!0:!(e.unstable_now()-C<te)}function T(){if(g=!1,S){var t=e.unstable_now();C=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(ee),ee=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&w());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&O(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?ne():S=!1}}}var ne;if(typeof y==`function`)ne=function(){y(T)};else if(typeof MessageChannel<`u`){var E=new MessageChannel,D=E.port2;E.port1.onmessage=T,ne=function(){D.postMessage(null)}}else ne=function(){_(T,0)};function O(t,n){ee=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):te=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(ee),ee=-1):h=!0,O(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,ne()))),r},e.unstable_shouldYield=w,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),i=e(((e,t)=>{t.exports=r()})),a=e((e=>{var t=n();function r(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function i(){}var a={d:{f:i,r:function(){throw Error(r(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},o=Symbol.for(`react.portal`),s=Symbol.for(`react.recoverable`),c=Symbol.for(`react.optimistic_key`);function l(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:r==null?null:r===c?c:``+r,children:e,containerInfo:t,implementation:n}}var u=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,e.browser=function(e){return{$$typeof:s,_reason:e}},e.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(r(299));return l(e,t,null,n)},e.flushSync=function(e){var t=u.T,n=a.p;try{if(u.T=null,a.p=2,e)return e()}finally{u.T=t,a.p=n,a.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,a.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&a.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin),i=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?a.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:i,fetchPriority:o}):n===`script`&&a.d.X(e,{crossOrigin:r,integrity:i,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=d(t.as,t.crossOrigin);a.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??a.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin);a.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=d(t.as,t.crossOrigin);a.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else a.d.m(e)}},e.requestFormReset=function(e){a.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return u.H.useFormState(e,t,n)},e.useFormStatus=function(){return u.H.useHostTransitionStatus()},e.version=`19.3.1`})),o=e(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=a()})),s=e((e=>{var t=i(),r=n(),a=o();function s(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function c(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function l(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function u(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function d(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function f(e){if(l(e)!==e)throw Error(s(188))}function p(e){var t=e.alternate;if(!t){if(t=l(e),t===null)throw Error(s(188));return t===e?e:null}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var a=i.alternate;if(a===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===n)return f(i),e;if(a===r)return f(i),t;a=a.sibling}throw Error(s(188))}if(n.return!==r.return)n=i,r=a;else{for(var o=!1,c=i.child;c;){if(c===n){o=!0,n=i,r=a;break}if(c===r){o=!0,r=i,n=a;break}c=c.sibling}if(!o){for(c=a.child;c;){if(c===n){o=!0,n=a,r=i;break}if(c===r){o=!0,r=a,n=i;break}c=c.sibling}if(!o)throw Error(s(189))}}if(n.alternate!==r)throw Error(s(190))}if(n.tag!==3)throw Error(s(188));return n.stateNode.current===n?e:t}function m(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=m(e),t!==null)return t;e=e.sibling}return null}function h(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&h(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(s(559))}}var x=null,S=null;function ee(e,t,n){return e===n||e===t&&(x=e,!0)}function te(e,t,n){return e===n?(S=e,!1):e===t&&(S!==null&&(x=e),!0)}function C(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function w(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var T=Object.assign,ne=Symbol.for(`react.element`),E=Symbol.for(`react.transitional.element`),D=Symbol.for(`react.portal`),O=Symbol.for(`react.fragment`),k=Symbol.for(`react.strict_mode`),re=Symbol.for(`react.profiler`),ie=Symbol.for(`react.consumer`),ae=Symbol.for(`react.context`),A=Symbol.for(`react.forward_ref`),oe=Symbol.for(`react.suspense`),se=Symbol.for(`react.suspense_list`),ce=Symbol.for(`react.memo`),le=Symbol.for(`react.lazy`),ue=Symbol.for(`react.activity`),de=Symbol.for(`react.legacy_hidden`),fe=Symbol.for(`react.memo_cache_sentinel`),pe=Symbol.for(`react.view_transition`),me=Symbol.for(`react.recoverable`),he=Symbol.iterator;function ge(e){return typeof e!=`object`||!e?null:(e=he&&e[he]||e[`@@iterator`],typeof e==`function`?e:null)}var _e=Symbol.for(`react.client.reference`);function ve(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===_e?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case O:return`Fragment`;case re:return`Profiler`;case k:return`StrictMode`;case oe:return`Suspense`;case se:return`SuspenseList`;case ue:return`Activity`;case pe:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case D:return`Portal`;case ae:return e.displayName||`Context`;case ie:return(e._context.displayName||`Context`)+`.Consumer`;case A:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case ce:return t=e.displayName||null,t===null?ve(e.type)||`Memo`:t;case le:t=e._payload,e=e._init;try{return ve(e(t))}catch{}}return null}var ye=Array.isArray,j=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,M=a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,be={pending:!1,data:null,method:null,action:null},xe=[],Se=-1;function Ce(e){return{current:e}}function we(e){0>Se||(e.current=xe[Se],xe[Se]=null,Se--)}function N(e,t){Se++,xe[Se]=e.current,e.current=t}var Te=Ce(null),Ee=Ce(null),De=Ce(null),Oe=Ce(null);function ke(e,t){switch(N(De,t),N(Ee,e),N(Te,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?up(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=up(t),e=dp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}we(Te),N(Te,e)}function Ae(){we(Te),we(Ee),we(De)}function je(e){var t=e.memoizedState;t!==null&&(sh._currentValue=t.memoizedState,N(Oe,e)),t=Te.current;var n=dp(t,e.type);t!==n&&(N(Ee,e),N(Te,n))}function Me(e){Ee.current===e&&(we(Te),we(Ee)),Oe.current===e&&(we(Oe),sh._currentValue=be)}var Ne,Pe;function Fe(e){if(Ne===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Ne=t&&t[1]||``,Pe=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Ne+e+Pe}var Ie=!1;function Le(e,t){if(!e||Ie)return``;Ie=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Ie=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Fe(n):``}function Re(e,t){switch(e.tag){case 26:case 27:case 5:return Fe(e.type);case 16:return Fe(`Lazy`);case 13:return e.child!==t&&t!==null?Fe(`Suspense Fallback`):Fe(`Suspense`);case 19:return Fe(`SuspenseList`);case 0:case 15:return Le(e.type,!1);case 11:return Le(e.type.render,!1);case 1:return Le(e.type,!0);case 31:return Fe(`Activity`);case 30:return Fe(`ViewTransition`);default:return``}}function ze(e){try{var t=``,n=null;do t+=Re(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Be=Object.prototype.hasOwnProperty,Ve=t.unstable_scheduleCallback,He=t.unstable_cancelCallback,Ue=t.unstable_shouldYield,We=t.unstable_requestPaint,Ge=t.unstable_now,Ke=t.unstable_getCurrentPriorityLevel,qe=t.unstable_ImmediatePriority,Je=t.unstable_UserBlockingPriority,Ye=t.unstable_NormalPriority,Xe=t.unstable_LowPriority,Ze=t.unstable_IdlePriority,Qe=t.log,$e=t.unstable_setDisableYieldValue,et=null,tt=null;function nt(e){if(typeof Qe==`function`&&$e(e),tt&&typeof tt.setStrictMode==`function`)try{tt.setStrictMode(et,e)}catch{}}var rt=Math.clz32?Math.clz32:ot,it=Math.log,at=Math.LN2;function ot(e){return e>>>=0,e===0?32:31-(it(e)/at|0)|0}var st=256,ct=262144,lt=4194304;function ut(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function dt(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=ut(n))):i=ut(o):i=ut(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=ut(n))):i=ut(o)):i=ut(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function ft(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function pt(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-rt(n),i=1<<r;t|=e[r],n&=~i}return t}function mt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ht(){var e=lt;return lt<<=1,!(lt&62914560)&&(lt=4194304),e}function gt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function _t(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function vt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-rt(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&yt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function yt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-rt(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function bt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-rt(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function P(e,t){var n=t&-t;return n=n&42?1:xt(n),(n&(e.suspendedLanes|t))===0?n:0}function xt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function St(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function Ct(){var e=M.p;return e===0?(e=window.event,e===void 0?32:Ch(e.type)):e}function wt(e,t){var n=M.p;try{return M.p=e,t()}finally{M.p=n}}var Tt=Math.random().toString(36).slice(2),Et=`__reactFiber$`+Tt,Dt=`__reactProps$`+Tt,Ot=`__reactContainer$`+Tt,kt=`__reactEvents$`+Tt,At=`__reactListeners$`+Tt,jt=`__reactHandles$`+Tt,Mt=`__reactResources$`+Tt,Nt=`__reactMarker$`+Tt,Pt=`__reactLoad$`+Tt;function Ft(e){delete e[Et],delete e[Dt],delete e[At],delete e[jt]}function It(e){var t;if(t=e[Et])return t;for(var n=e.parentNode;n;){if(t=n[Ot]||n[Et]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=fm(e);e!==null;){if(n=e[Et])return n;e=fm(e)}return t}e=n,n=e.parentNode}return null}function Lt(e){if(e=e[Et]||e[Ot]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Rt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(s(33))}function zt(e){var t=e[Mt];return t||=e[Mt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Bt(e){e[Nt]=!0}function Vt(e){e[Pt]=void 0}var Ht=new Set,Ut={};function Wt(e,t){Gt(e,t),Gt(e+`Capture`,t)}function Gt(e,t){for(Ut[e]=t,e=0;e<t.length;e++)Ht.add(t[e])}var Kt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),qt={},Jt={};function Yt(e){return Be.call(Jt,e)?!0:Be.call(qt,e)?!1:Kt.test(e)?Jt[e]=!0:(qt[e]=!0,!1)}var F=!1;function Xt(){var e=F;return F=!1,e}function Zt(e,t,n){if(Yt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function Qt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function $t(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function en(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function tn(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function nn(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function rn(e){if(!e._valueTracker){var t=tn(e)?`checked`:`value`;e._valueTracker=nn(e,t,``+e[t])}}function an(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=tn(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var on=/[\n"\\]/g;function sn(e){return e.replace(on,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function cn(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+en(t)):e.value!==``+en(t)&&(e.value=``+en(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):un(e,en(n)):o===`number`&&e.value==t?un(e,en(e.value)):un(e,en(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+en(s):e.removeAttribute(`name`)}function ln(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){rn(e);return}n=n==null?``:``+en(n),t=t==null?n:``+en(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),rn(e)}function un(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function dn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+en(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function fn(e,t,n){t!=null&&(t=``+en(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+en(n)}function pn(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(s(92));if(ye(r)){if(1<r.length)throw Error(s(93));r=r[0]}n=r}n??=``,t=n}n=en(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),rn(e)}function mn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var hn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function gn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||hn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function _n(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(s(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,F=!0);for(var i in t)r=t[i],t.hasOwnProperty(i)&&n[i]!==r&&(gn(e,i,r),F=!0)}else for(var a in t)t.hasOwnProperty(a)&&gn(e,a,t[a])}function vn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var yn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),bn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function xn(e){return bn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function Sn(){}var Cn=null;function wn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Tn=null,En=null;function Dn(e){var t=Lt(e);if(t&&(e=t.stateNode)){var n=e[Dt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(cn(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+sn(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=r[Dt]||null;if(!i)throw Error(s(90));cn(r,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&an(r)}break a;case`textarea`:fn(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&dn(e,!!n.multiple,t,!1)}}}var On=!1;function kn(e,t,n){if(On)return e(t,n);On=!0;try{return e(t)}finally{if(On=!1,(Tn!==null||En!==null)&&(zd(),Tn&&(t=Tn,e=En,En=Tn=null,Dn(t),e)))for(t=0;t<e.length;t++)Dn(e[t])}}function An(e,t){var n=e.stateNode;if(n===null)return null;var r=n[Dt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(s(231,t,typeof n));return n}var jn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Mn=!1;if(jn)try{var Nn={};Object.defineProperty(Nn,"passive",{get:function(){Mn=!0}}),window.addEventListener(`test`,Nn,Nn),window.removeEventListener(`test`,Nn,Nn)}catch{Mn=!1}var Pn=null,Fn=null,In=null;function Ln(){if(In)return In;var e,t=Fn,n=t.length,r,i=`value`in Pn?Pn.value:Pn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return In=i.slice(e,1<r?1-r:void 0)}function Rn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function zn(){return!0}function Bn(){return!1}function Vn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?zn:Bn,this.isPropagationStopped=Bn,this}return T(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=zn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=zn)},persist:function(){},isPersistent:zn}),t}var Hn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Un=Vn(Hn),Wn=T({},Hn,{view:0,detail:0}),Gn=Vn(Wn),Kn,qn,Jn,Yn=T({},Wn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:or,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Jn&&(Jn&&e.type===`mousemove`?(Kn=e.screenX-Jn.screenX,qn=e.screenY-Jn.screenY):qn=Kn=0,Jn=e),Kn)},movementY:function(e){return`movementY`in e?e.movementY:qn}}),Xn=Vn(Yn),Zn=Vn(T({},Yn,{dataTransfer:0})),Qn=Vn(T({},Wn,{relatedTarget:0})),$n=Vn(T({},Hn,{animationName:0,elapsedTime:0,pseudoElement:0})),er=Vn(T({},Hn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),tr=Vn(T({},Hn,{data:0})),nr={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},rr={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},ir={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function ar(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=ir[e])?!!t[e]:!1}function or(){return ar}var sr=Vn(T({},Wn,{key:function(e){if(e.key){var t=nr[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Rn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?rr[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:or,charCode:function(e){return e.type===`keypress`?Rn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Rn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),cr=Vn(T({},Yn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),lr=Vn(T({},Hn,{submitter:0})),ur=Vn(T({},Wn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:or})),dr=Vn(T({},Hn,{propertyName:0,elapsedTime:0,pseudoElement:0})),fr=Vn(T({},Yn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),pr=Vn(T({},Hn,{newState:0,oldState:0,source:0})),mr=[9,13,27,32],hr=jn&&`CompositionEvent`in window,gr=null;jn&&`documentMode`in document&&(gr=document.documentMode);var _r=jn&&`TextEvent`in window&&!gr,vr=jn&&(!hr||gr&&8<gr&&11>=gr),yr=` `,br=!1;function xr(e,t){switch(e){case`keyup`:return mr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function Sr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var Cr=!1;function wr(e,t){switch(e){case`compositionend`:return Sr(t);case`keypress`:return t.which===32?(br=!0,yr):null;case`textInput`:return e=t.data,e===yr&&br?null:e;default:return null}}function Tr(e,t){if(Cr)return e===`compositionend`||!hr&&xr(e,t)?(e=Ln(),In=Fn=Pn=null,Cr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return vr&&t.locale!==`ko`?null:t.data;default:return null}}var Er={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Dr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!Er[e.type]:t===`textarea`}function Or(e,t,n,r){Tn?En?En.push(r):En=[r]:Tn=r,t=Jf(t,`onChange`),0<t.length&&(n=new Un(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var kr=null,Ar=null;function jr(e){Vf(e,0)}function Mr(e){if(an(Rt(e)))return e}function Nr(e,t){if(e===`change`)return t}var Pr=!1;if(jn){var Fr;if(jn){var Ir=`oninput`in document;if(!Ir){var Lr=document.createElement(`div`);Lr.setAttribute(`oninput`,`return;`),Ir=typeof Lr.oninput==`function`}Fr=Ir}else Fr=!1;Pr=Fr&&(!document.documentMode||9<document.documentMode)}function Rr(){kr&&(kr.detachEvent(`onpropertychange`,zr),Ar=kr=null)}function zr(e){if(e.propertyName===`value`&&Mr(Ar)){var t=[];Or(t,Ar,e,wn(e)),kn(jr,t)}}function Br(e,t,n){e===`focusin`?(Rr(),kr=t,Ar=n,kr.attachEvent(`onpropertychange`,zr)):e===`focusout`&&Rr()}function Vr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return Mr(Ar)}function Hr(e,t){if(e===`click`)return Mr(t)}function Ur(e,t){if(e===`input`||e===`change`)return Mr(t)}function Wr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Gr=typeof Object.is==`function`?Object.is:Wr;function Kr(e,t){if(Gr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Be.call(t,i)||!Gr(e[i],t[i]))return!1}return!0}function qr(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Jr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Yr(e,t){var n=Jr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Jr(n)}}function Xr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Xr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Zr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=qr(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=qr(e.document)}return t}function Qr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var $r=jn&&`documentMode`in document&&11>=document.documentMode,ei=null,ti=null,ni=null,ri=!1;function ii(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ri||ei==null||ei!==qr(r)||(r=ei,`selectionStart`in r&&Qr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ni&&Kr(ni,r)||(ni=r,r=Jf(ti,`onSelect`),0<r.length&&(t=new Un(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=ei)))}function ai(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var oi={animationend:ai(`Animation`,`AnimationEnd`),animationiteration:ai(`Animation`,`AnimationIteration`),animationstart:ai(`Animation`,`AnimationStart`),transitionrun:ai(`Transition`,`TransitionRun`),transitionstart:ai(`Transition`,`TransitionStart`),transitioncancel:ai(`Transition`,`TransitionCancel`),transitionend:ai(`Transition`,`TransitionEnd`)},si={},ci={};jn&&(ci=document.createElement(`div`).style,`AnimationEvent`in window||(delete oi.animationend.animation,delete oi.animationiteration.animation,delete oi.animationstart.animation),`TransitionEvent`in window||delete oi.transitionend.transition);function li(e){if(si[e])return si[e];if(!oi[e])return e;var t=oi[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ci)return si[e]=t[n];return e}var ui=li(`animationend`),di=li(`animationiteration`),fi=li(`animationstart`),pi=li(`transitionrun`),mi=li(`transitionstart`),hi=li(`transitioncancel`),gi=li(`transitionend`),_i=new Map,vi=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);vi.push(`scrollEnd`);function yi(e,t){_i.set(e,t),Wt(t,[e])}var bi=0;function xi(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=bd.identifierPrefix;var n=bi++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function Si(e){if(e==null||typeof e==`string`)return e;var t=null,n=Od;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function Ci(e,t){return e=Si(e),t=Si(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var wi=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},Ti=[],Ei=0,Di=0;function Oi(){for(var e=Ei,t=Di=Ei=0;t<e;){var n=Ti[t];Ti[t++]=null;var r=Ti[t];Ti[t++]=null;var i=Ti[t];Ti[t++]=null;var a=Ti[t];if(Ti[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&Mi(n,i,a)}}function ki(e,t,n,r){Ti[Ei++]=e,Ti[Ei++]=t,Ti[Ei++]=n,Ti[Ei++]=r,Di|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Ai(e,t,n,r){return ki(e,t,n,r),Ni(e)}function ji(e,t){return ki(e,null,null,t),Ni(e)}function Mi(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-rt(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function Ni(e){if(50<kd)throw kd=0,Ad=null,Error(s(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Pi={};function Fi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ii(e,t,n,r){return new Fi(e,t,n,r)}function Li(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ri(e,t){var n=e.alternate;return n===null?(n=Ii(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function zi(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Bi(e,t,n,r,i,a){var o=0;if(r=e,typeof r==`function`)Li(r)&&(o=1);else if(typeof r==`string`)o=qm(e,n,Te.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case ue:return e=Ii(31,n,t,i),e.elementType=ue,e.lanes=a,e;case O:return Vi(n.children,i,a,t);case k:o=8,i|=24;break;case re:return e=Ii(12,n,t,i|2),e.elementType=re,e.lanes=a,e;case oe:return e=Ii(13,n,t,i),e.elementType=oe,e.lanes=a,e;case se:return e=Ii(19,n,t,i),e.elementType=se,e.lanes=a,e;case de:case pe:return e=i|32,e=Ii(30,n,t,e),e.elementType=pe,e.lanes=a,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case ae:o=10;break a;case ie:o=9;break a;case A:o=11;break a;case ce:o=14;break a;case le:o=16,r=null;break a}o=29,n=Error(s(130,e===null?`null`:typeof e,``)),r=null}return t=Ii(o,n,t,i),t.elementType=e,t.type=r,t.lanes=a,t}function Vi(e,t,n,r){return e=Ii(7,e,r,t),e.lanes=n,e}function Hi(e,t,n){return e=Ii(6,e,null,t),e.lanes=n,e}function Ui(e){var t=Ii(18,null,null,0);return t.stateNode=e,t}function Wi(e,t,n){return t=Ii(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Gi=new WeakMap;function Ki(e,t){if(typeof e==`object`&&e){var n=Gi.get(e);return n===void 0?(t={value:e,source:t,stack:ze(t)},Gi.set(e,t),t):n}return{value:e,source:t,stack:ze(t)}}var qi=[],Ji=0,Yi=null,Xi=0,Zi=[],Qi=0,$i=null,ea=1,ta=``;function na(e,t){qi[Ji++]=Xi,qi[Ji++]=Yi,Yi=e,Xi=t}function ra(e,t,n){Zi[Qi++]=ea,Zi[Qi++]=ta,Zi[Qi++]=$i,$i=e;var r=ea;e=ta;var i=32-rt(r)-1;r&=~(1<<i),n+=1;var a=32-rt(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,ea=1<<32-rt(t)+i|n<<i|r,ta=a+e}else ea=1<<a|n<<i|r,ta=e}function ia(e){e.return!==null&&(na(e,1),ra(e,1,0))}function aa(e){for(;e===Yi;)Yi=qi[--Ji],qi[Ji]=null,Xi=qi[--Ji],qi[Ji]=null;for(;e===$i;)$i=Zi[--Qi],Zi[Qi]=null,ta=Zi[--Qi],Zi[Qi]=null,ea=Zi[--Qi],Zi[Qi]=null}function oa(e,t){Zi[Qi++]=ea,Zi[Qi++]=ta,Zi[Qi++]=$i,ea=t.id,ta=t.overflow,$i=e}var sa=null,I=null,L=!1,ca=null,la=!1,ua=Error(s(519));function da(e){throw _a(Ki(Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),ua}function fa(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[Et]=e,t[Dt]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<zf.length;n++)Q(zf[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),ln(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),pn(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||ep(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=Sn),t=!0):t=!1,t||da(e,!0)}function pa(e){for(sa=e.return;sa;)switch(sa.tag){case 5:case 31:case 13:la=!1;return;case 27:case 3:la=!0;return;default:sa=sa.return}}function ma(e){if(e!==sa)return!1;if(!L)return pa(e),L=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||pp(e.type,e.memoizedProps)),n=!n),n&&I&&da(e),pa(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(317));I=dm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(317));I=dm(e)}else t===27?(t=I,Sp(e.type)?(e=um,um=null,I=e):I=t):I=sa?lm(e.stateNode.nextSibling):null;return!0}function ha(){I=sa=null,L=!1}function ga(){var e=ca;return e!==null&&(pd===null?pd=e:pd.push.apply(pd,e),ca=null),e}function _a(e){ca===null?ca=[e]:ca.push(e)}var va=Ce(null),ya=null,ba=null;function xa(e,t,n){N(va,t._currentValue),t._currentValue=n}function Sa(e){e._currentValue=va.current,we(va)}function Ca(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function wa(e,t,n,r){var i=e.child;for(i!==null&&(i.return=e);i!==null;){var a=i.dependencies;if(a!==null){var o=i.child;a=a.firstContext;a:for(;a!==null;){var c=a;a=i;for(var l=0;l<t.length;l++)if(c.context===t[l]){a.lanes|=n,c=a.alternate,c!==null&&(c.lanes|=n),Ca(a.return,n,e),r||(o=null);break a}a=c.next}}else if(i.tag===18){if(o=i.return,o===null)throw Error(s(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Ca(o,n,e),o=null}else i.tag===13&&i.memoizedState!==null&&i.memoizedState.dehydrated===null?(i.lanes|=n,o=i.alternate,o!==null&&(o.lanes|=n),Ca(i.return,n,e),o=i.child,o=o===null?null:o.sibling):o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}}function Ta(e,t,n,r){e=null;for(var i=t,a=!1;i!==null;){if(!a){if(i.flags&524288)a=!0;else if(i.flags&262144)break}if(i.tag===10){var o=i.alternate;if(o===null)throw Error(s(387));if(o=o.memoizedProps,o!==null){var c=i.type;Gr(i.pendingProps.value,o.value)||(e===null?e=[c]:e.push(c))}}else if(i===Oe.current){if(o=i.alternate,o===null)throw Error(s(387));o.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(e===null?e=[sh]:e.push(sh))}i=i.return}return e!==null&&wa(t,e,n,r),t.flags|=262144,e!==null}function Ea(e){for(e=e.firstContext;e!==null;){if(!Gr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Da(e){ya=e,ba=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Oa(e){return Aa(ya,e)}function ka(e,t){return ya===null&&Da(e),Aa(e,t)}function Aa(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ba===null){if(e===null)throw Error(s(308));ba=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ba=ba.next=t;return n}var ja=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Ma=t.unstable_scheduleCallback,Na=t.unstable_NormalPriority,Pa={$$typeof:ae,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Fa(){return{controller:new ja,data:new Map,refCount:0}}function Ia(e){e.refCount--,e.refCount===0&&Ma(Na,function(){e.controller.abort()})}function La(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var Ra=null;function za(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Ba=null,Va=0,Ha=0,Ua=null;function Wa(e,t){if(Ba===null){var n=Ba=[];Va=0,Ha=Pf(),Ua={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return Va++,t.then(Ga,Ga),t}function Ga(){if(--Va===0&&(Ra=null,Ba!==null)){Ua!==null&&(Ua.status=`fulfilled`);var e=Ba;Ba=null,Ha=0,Ua=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Ka(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var qa=j.S;j.S=function(e,t){if(gd=Ge(),typeof t==`object`&&t&&typeof t.then==`function`&&Wa(e,t),Ra!==null)for(var n=bf;n!==null;)La(n,Ra),n=n.next;if(n=e.types,n!==null){for(var r=bf;r!==null;)La(r,n),r=r.next;if(Ha!==0){r=Ra,r===null&&(r=Ra=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}qa!==null&&qa(e,t)};var Ja=Ce(null);function Ya(){var e=Ja.current;return e===null?G.pooledCache:e}function Xa(e,t){t===null?N(Ja,Ja.current):N(Ja,t.pool)}function Za(){var e=Ya();return e===null?null:{parent:Pa._currentValue,pool:e}}var Qa=Error(s(460)),$a=Error(s(474)),eo=Error(s(542)),to={then:function(){}};function no(e){return e=e.status,e===`fulfilled`||e===`rejected`}function ro(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Sn,Sn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,so(e),e===void 0&&!(`reason`in t)?Error(s(600)):e;default:if(typeof t.status==`string`)t.then(Sn,Sn);else{if(e=G,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,so(e),e}throw ao=t,Qa}}function io(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(ao=e,Qa):e}}var ao=null;function oo(){if(ao===null)throw Error(s(459));var e=ao;return ao=null,e}function so(e){if(e===Qa||e===eo)throw Error(s(483))}var co=null,lo=0;function uo(e){var t=lo;return lo+=1,co===null&&(co=[]),ro(co,e,t)}function fo(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function po(e,t){throw t.$$typeof===ne?Error(s(525)):(e=Object.prototype.toString.call(t),Error(s(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function mo(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function i(e,t){return e=Ri(e,t),e.index=0,e.sibling=null,e}function a(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function o(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Hi(n,e.mode,r),t.return=e,t):(t=i(t,n),t.return=e,t)}function l(e,t,n,r){var a=n.type;return a===O?(e=d(e,t,n.props.children,r,n.key),fo(e,n),e):t!==null&&(t.elementType===a||typeof a==`object`&&a&&a.$$typeof===le&&io(a)===t.type)?(t=i(t,n.props),fo(t,n),t.return=e,t):(t=Bi(n.type,n.key,n.props,null,e.mode,r),fo(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Wi(n,e.mode,r),t.return=e,t):(t=i(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,a){return t===null||t.tag!==7?(t=Vi(n,e.mode,r,a),t.return=e,t):(t=i(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Hi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case E:return n=Bi(t.type,t.key,t.props,null,e.mode,n),fo(n,t),n.return=e,n;case D:return t=Wi(t,e.mode,n),t.return=e,t;case le:return t=io(t),f(e,t,n)}if(ye(t)||ge(t))return t=Vi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,uo(t),n);if(t.$$typeof===ae)return f(e,ka(e,t),n);po(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case E:return n.key===i?l(e,t,n,r):null;case D:return n.key===i?u(e,t,n,r):null;case le:return n=io(n),p(e,t,n,r)}if(ye(n)||ge(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,uo(n),r);if(n.$$typeof===ae)return p(e,t,ka(e,n),r);po(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case E:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case D:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case le:return r=io(r),m(e,t,n,r,i)}if(ye(r)||ge(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,uo(r),i);if(r.$$typeof===ae)return m(e,t,n,ka(t,r),i);po(t,r)}return null}function h(i,o,s,c){for(var l=null,u=null,d=o,h=o=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),o=a(_,o,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),L&&na(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(o=a(d,o,h),u===null?l=d:u.sibling=d,u=d);return L&&na(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),o=a(g,o,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),L&&na(i,h),l}function g(i,o,c,l){if(c==null)throw Error(s(151));for(var u=null,d=null,h=o,g=o=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(i,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(i,h),o=a(y,o,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(i,h),L&&na(i,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(i,v.value,l),v!==null&&(o=a(v,o,g),d===null?u=v:d.sibling=v,d=v);return L&&na(i,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,i,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),o=a(v,o,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(i,e)}),L&&na(i,g),u}function _(e,r,a,c){if(typeof a==`object`&&a&&a.type===O&&a.key===null&&a.props.ref===void 0&&(a=a.props.children),typeof a==`object`&&a){switch(a.$$typeof){case E:a:{for(var l=a.key;r!==null;){if(r.key===l){if(l=a.type,l===O){if(r.tag===7){n(e,r.sibling),c=i(r,a.props.children),fo(c,a),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===le&&io(l)===r.type){n(e,r.sibling),c=i(r,a.props),fo(c,a),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}a.type===O?(c=Vi(a.props.children,e.mode,c,a.key),fo(c,a),c.return=e,e=c):(c=Bi(a.type,a.key,a.props,null,e.mode,c),fo(c,a),c.return=e,e=c)}return o(e);case D:a:{for(l=a.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===a.containerInfo&&r.stateNode.implementation===a.implementation){n(e,r.sibling),c=i(r,a.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Wi(a,e.mode,c),c.return=e,e=c}return o(e);case le:return a=io(a),_(e,r,a,c)}if(ye(a))return h(e,r,a,c);if(ge(a)){if(l=ge(a),typeof l!=`function`)throw Error(s(150));return a=l.call(a),g(e,r,a,c)}if(typeof a.then==`function`)return _(e,r,uo(a),c);if(a.$$typeof===ae)return _(e,r,ka(e,a),c);po(e,a)}return typeof a==`string`&&a!==``||typeof a==`number`||typeof a==`bigint`?(a=``+a,r!==null&&r.tag===6?(n(e,r.sibling),c=i(r,a),c.return=e,e=c):(n(e,r),c=Hi(a,e.mode,c),c.return=e,e=c),o(e)):n(e,r)}return function(e,t,n,r){try{lo=0;var i=_(e,t,n,r);return co=null,i}catch(t){if(t===Qa||t===eo)throw t;var a=Ii(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var ho=mo(!0),go=mo(!1),_o=!1;function vo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function yo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function bo(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function xo(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,W&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=Ni(e),Mi(e,null,n),t}return ki(e,r,t,n),Ni(e)}function So(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,bt(e,n)}}function Co(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var wo=!1;function To(){if(wo){var e=Ua;if(e!==null)throw e}}function Eo(e,t,n,r){wo=!1;var i=e.updateQueue;_o=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(q&f)===f:(r&f)===f){f!==0&&f===Ha&&(wo=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=T({},d,f);break a;case 2:_o=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),sd|=o,e.lanes=o,e.memoizedState=d}}function Do(e,t){if(typeof e!=`function`)throw Error(s(191,e));e.call(t)}function Oo(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Do(n[e],t)}var ko=Ce(null),Ao=Ce(0);function jo(e,t){e=od,N(Ao,e),N(ko,t),od=e|t.baseLanes}function Mo(){N(Ao,od),N(ko,ko.current)}function No(){od=Ao.current,we(ko),we(Ao)}var Po=Ce(null),Fo=null;function Io(e){var t=e.alternate;N(Vo,Vo.current&1),N(Po,e),Fo===null&&(t===null||ko.current!==null||t.memoizedState!==null)&&(Fo=e)}function Lo(e){N(Vo,Vo.current),N(Po,e),Fo===null&&(Fo=e)}function Ro(e){e.tag===22?(N(Vo,Vo.current),N(Po,e),Fo===null&&(Fo=e)):zo()}function zo(){N(Vo,Vo.current),N(Po,Po.current)}function Bo(e){we(Po),Fo===e&&(Fo=null),we(Vo)}var Vo=Ce(0);function Ho(e,t){N(Po,Po.current),N(Vo,t)}function Uo(e){we(Vo),we(Po),Fo===e&&(Fo=null)}function Wo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||om(n)||sm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Go=0,R=null,z=null,Ko=null,qo=!1,Jo=!1,Yo=!1,Xo=0,Zo=0,Qo=null,$o=0;function B(){throw Error(s(321))}function es(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Gr(e[n],t[n]))return!1;return!0}function ts(e,t,n,r,i,a){return Go=a,R=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,j.H=e===null||e.memoizedState===null?vc:yc,Yo=!1,a=n(r,i),Yo=!1,Jo&&(a=rs(t,n,r,i)),ns(e),a}function ns(e){j.H=_c;var t=z!==null&&z.next!==null;if(Go=0,Ko=z=R=null,qo=!1,Zo=0,Qo=null,t)throw Error(s(300));e===null||Ic||(e=e.dependencies,e!==null&&Ea(e)&&(Ic=!0))}function rs(e,t,n,r){R=e;var i=0;do{if(Jo&&(Qo=null),Zo=0,Jo=!1,25<=i)throw Error(s(301));if(i+=1,Ko=z=null,e.updateQueue!=null){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,a.memoCache!=null&&(a.memoCache.index=0)}j.H=bc,a=t(n,r)}while(Jo);return a}function is(){var e=j.H,t=e.useState()[0];return t=typeof t.then==`function`?ds(t):t,e=e.useState()[0],(z===null?null:z.memoizedState)!==e&&(R.flags|=1024),t}function as(){var e=Xo!==0;return Xo=0,e}function os(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function ss(e){if(qo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}qo=!1}Go=0,Ko=z=R=null,Jo=!1,Zo=Xo=0,Qo=null}function cs(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ko===null?R.memoizedState=Ko=e:Ko=Ko.next=e,Ko}function ls(){if(z===null){var e=R.alternate;e=e===null?null:e.memoizedState}else e=z.next;var t=Ko===null?R.memoizedState:Ko.next;if(t!==null)Ko=t,z=e;else{if(e===null)throw R.alternate===null?Error(s(467)):Error(s(310));z=e,e={memoizedState:z.memoizedState,baseState:z.baseState,baseQueue:z.baseQueue,queue:z.queue,next:null},Ko===null?R.memoizedState=Ko=e:Ko=Ko.next=e}return Ko}function us(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ds(e){var t=Zo;return Zo+=1,Qo===null&&(Qo=[]),e=ro(Qo,e,t),t=R,(Ko===null?t.memoizedState:Ko.next)===null&&(t=t.alternate,j.H=t===null||t.memoizedState===null?vc:yc),e}function fs(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return ds(e);if(e.$$typeof===me)return;if(e.$$typeof===ae)return Oa(e)}throw Error(s(438,String(e)))}function ps(e){var t=null,n=R.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=R.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=us(),R.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=fe;return t.index++,n}function ms(e,t){return typeof t==`function`?t(e):t}function hs(e){return gs(ls(),z,e)}function gs(e,t,n){var r=e.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=n;var i=e.baseQueue,a=r.pending;if(a!==null){if(i!==null){var o=i.next;i.next=a.next,a.next=o}t.baseQueue=i=a,r.pending=null}if(a=e.baseState,i===null)e.memoizedState=a;else{t=i.next;var c=o=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Go&f)===f:(q&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===Ha&&(d=!0);else if((Go&p)===p){u=u.next,p===Ha&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,o=a):l=l.next=f,R.lanes|=p,sd|=p;f=u.action,Yo&&n(a,f),a=u.hasEagerState?u.eagerState:n(a,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,o=a):l=l.next=p,R.lanes|=f,sd|=f;u=u.next}while(u!==null&&u!==t);if(l===null?o=a:l.next=c,!Gr(a,e.memoizedState)&&(Ic=!0,d&&(n=Ua,n!==null)))throw n;e.memoizedState=a,e.baseState=o,e.baseQueue=l,r.lastRenderedState=a}return i===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function _s(e){var t=ls(),n=t.queue;if(n===null)throw Error(s(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,a=t.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do a=e(a,o.action),o=o.next;while(o!==i);Gr(a,t.memoizedState)||(Ic=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function vs(e,t,n){var r=R,i=ls(),a=L;if(a){if(n===void 0)throw Error(s(407));n=n()}else n=t();var o=!Gr((z||i).memoizedState,n);if(o&&(i.memoizedState=n,Ic=!0),i=i.queue,Us(xs.bind(null,r,i,e),[e]),e=i.getSnapshot!==t||o||Ko!==null&&!!(Ko.memoizedState.tag&1),Rs(e?9:8,{destroy:void 0},bs.bind(null,r,i,n,t),null),e){if(r.flags|=2048,G===null)throw Error(s(349));a||Go&127||ys(r,t,n)}return n}function ys(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=R.updateQueue,t===null?(t=us(),R.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function bs(e,t,n,r){t.value=n,t.getSnapshot=r,Ss(t)&&Cs(e)}function xs(e,t,n){return n(function(){Ss(t)&&Cs(e)})}function Ss(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Gr(e,n)}catch{return!0}}function Cs(e){var t=ji(e,2);t!==null&&Pd(t,e,2)}function ws(e){var t=cs();if(typeof e==`function`){var n=e;if(e=n(),Yo){nt(!0);try{n()}finally{nt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ms,lastRenderedState:e},t}function Ts(e,t,n,r){return e.baseState=n,gs(e,z,typeof r==`function`?r:ms)}function Es(e,t,n,r,i){if(mc(e))throw Error(s(485));if(e=t.action,e!==null){var a={payload:i,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){a.listeners.push(e)}};j.T===null?a.isTransition=!1:n(!0),r(a),n=t.pending,n===null?(a.next=t.pending=a,Ds(t,a)):(a.next=n.next,t.pending=n.next=a)}}function Ds(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=j.T,o={};o.types=a===null?null:a.types,j.T=o;try{var s=n(i,r),c=j.S;c!==null&&c(o,s),Os(e,t,s)}catch(n){As(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),j.T=a}}else try{a=n(i,r),Os(e,t,a)}catch(n){As(e,t,n)}}function Os(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){ks(e,t,n)},function(n){return As(e,t,n)}):ks(e,t,n)}function ks(e,t,n){t.status=`fulfilled`,t.value=n,js(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Ds(e,n)))}function As(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,js(t),t=t.next;while(t!==r)}e.action=null}function js(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Ms(e,t){return t}function Ns(e,t){if(L){var n=G.formState;if(n!==null){a:{var r=R;if(L){if(I){b:{for(var i=I,a=la;i.nodeType!==8;)if(!a||(i=lm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){I=lm(i.nextSibling),r=i.data===`F!`;break a}}da(r)}r=!1}r&&(t=n[0])}}return n=cs(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ms,lastRenderedState:t},n.queue=r,n=dc.bind(null,R,r),r.dispatch=n,r=ws(!1),a=pc.bind(null,R,!1,r.queue),r=cs(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Es.bind(null,R,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Ps(e){return Fs(ls(),z,e)}function Fs(e,t,n){if(t=gs(e,t,Ms)[0],e=hs(ms)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=ds(t)}catch(e){throw e===Qa?eo:e}else r=t;t=ls();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(R.flags|=2048,Rs(9,{destroy:void 0},Is.bind(null,i,n),null)),[r,a,e]}function Is(e,t){e.action=t}function Ls(e){var t=ls(),n=z;if(n!==null)return Fs(t,n,e);ls(),t=t.memoizedState,n=ls();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Rs(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=R.updateQueue,t===null&&(t=us(),R.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function zs(){return ls().memoizedState}function Bs(e,t,n,r){var i=cs();R.flags|=e,i.memoizedState=Rs(1|t,{destroy:void 0},n,r===void 0?null:r)}function Vs(e,t,n,r){var i=ls();r=r===void 0?null:r;var a=i.memoizedState.inst;z!==null&&r!==null&&es(r,z.memoizedState.deps)?i.memoizedState=Rs(t,a,n,r):(R.flags|=e,i.memoizedState=Rs(1|t,a,n,r))}function Hs(e,t){Bs(8390656,8,e,t)}function Us(e,t){Vs(2048,8,e,t)}function Ws(e){R.flags|=4;var t=R.updateQueue;if(t===null)t=us(),R.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Gs(e){var t=ls().memoizedState;return Ws({ref:t,nextImpl:e}),function(){if(W&2)throw Error(s(440));return t.impl.apply(void 0,arguments)}}function Ks(e,t){return Vs(4,2,e,t)}function qs(e,t){return Vs(4,4,e,t)}function Js(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ys(e,t,n){n=n==null?null:n.concat([e]),Vs(4,4,Js.bind(null,t,e),n)}function Xs(){}function Zs(e,t){var n=ls();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&es(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Qs(e,t){var n=ls();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&es(t,r[1]))return r[0];if(r=e(),Yo){nt(!0);try{e()}finally{nt(!1)}}return n.memoizedState=[r,t],r}function $s(e,t,n){return n===void 0||Go&1073741824&&!(q&261930)?e.memoizedState=t:(e.memoizedState=n,e=Md(),R.lanes|=e,sd|=e,n)}function ec(e,t,n,r){return Gr(n,t)?n:ko.current===null?!(Go&106)||Go&1073741824&&!(q&261930)?(Ic=!0,e.memoizedState=n):(e=Md(),R.lanes|=e,sd|=e,t):(e=$s(e,n,r),Gr(e,t)||(Ic=!0),e)}function tc(e,t,n,r,i){var a=M.p;M.p=a!==0&&8>a?a:8;var o=j.T,s={};s.types=o===null?null:o.types,j.T=s,pc(e,!1,t,n);try{var c=i(),l=j.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?fc(e,t,Ka(c,r),jd(e)):fc(e,t,r,jd(e))}catch(n){fc(e,t,{then:function(){},status:`rejected`,reason:n},jd())}finally{M.p=a,o!==null&&s.types!==null&&(o.types=s.types),j.T=o}}function nc(){}function rc(e,t,n,r){if(e.tag!==5)throw Error(s(476));var i=ic(e).queue;tc(e,i,t,be,n===null?nc:function(){return ac(e),n(r)})}function ic(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:be,baseState:be,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ms,lastRenderedState:be},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ms,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ac(e){var t=ic(e);t.next===null&&(t=e.alternate.memoizedState),fc(e,t.next.queue,{},jd())}function oc(){return Oa(sh)}function sc(){return ls().memoizedState}function cc(){return ls().memoizedState}function lc(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=jd();e=bo(n);var r=xo(t,e,n);r!==null&&(Pd(r,t,n),So(r,t,n)),t={cache:Fa()},e.payload=t;return}t=t.return}}function uc(e,t,n){var r=jd();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},mc(e)?hc(t,n):(n=Ai(e,t,n,r),n!==null&&(Pd(n,e,r),gc(n,t,r)))}function dc(e,t,n){fc(e,t,n,jd())}function fc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(mc(e))hc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Gr(s,o))return ki(e,t,i,0),G===null&&Oi(),!1}catch{}if(n=Ai(e,t,i,r),n!==null)return Pd(n,e,r),gc(n,t,r),!0}return!1}function pc(e,t,n,r){if(r={lane:2,revertLane:Pf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},mc(e)){if(t)throw Error(s(479))}else t=Ai(e,n,r,2),t!==null&&Pd(t,e,2)}function mc(e){var t=e.alternate;return e===R||t!==null&&t===R}function hc(e,t){Jo=qo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function gc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,bt(e,n)}}var _c={readContext:Oa,use:fs,useCallback:B,useContext:B,useEffect:B,useImperativeHandle:B,useLayoutEffect:B,useInsertionEffect:B,useMemo:B,useReducer:B,useRef:B,useState:B,useDebugValue:B,useDeferredValue:B,useTransition:B,useSyncExternalStore:B,useId:B,useHostTransitionStatus:B,useFormState:B,useActionState:B,useOptimistic:B,useMemoCache:B,useCacheRefresh:B,useEffectEvent:B},vc={readContext:Oa,use:fs,useCallback:function(e,t){return cs().memoizedState=[e,t===void 0?null:t],e},useContext:Oa,useEffect:Hs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Bs(4194308,4,Js.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Bs(4194308,4,e,t)},useInsertionEffect:function(e,t){Bs(4,2,e,t)},useMemo:function(e,t){var n=cs();t=t===void 0?null:t;var r=e();if(Yo){nt(!0);try{e()}finally{nt(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=cs();if(n!==void 0){var i=n(t);if(Yo){nt(!0);try{n(t)}finally{nt(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=uc.bind(null,R,e),[r.memoizedState,e]},useRef:function(e){var t=cs();return e={current:e},t.memoizedState=e},useState:function(e){e=ws(e);var t=e.queue,n=dc.bind(null,R,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Xs,useDeferredValue:function(e,t){return $s(cs(),e,t)},useTransition:function(){var e=ws(!1);return e=tc.bind(null,R,e.queue,!0,!1),cs().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=R,i=cs();if(L){if(n===void 0)throw Error(s(407));n=n()}else{if(n=t(),G===null)throw Error(s(349));q&127||ys(r,t,n)}i.memoizedState=n;var a={value:n,getSnapshot:t};return i.queue=a,Hs(xs.bind(null,r,a,e),[e]),r.flags|=2048,Rs(9,{destroy:void 0},bs.bind(null,r,a,n,t),null),n},useId:function(){var e=cs(),t=G.identifierPrefix;if(L){var n=ta,r=ea;n=(r&~(1<<32-rt(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Xo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=$o++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:oc,useFormState:Ns,useActionState:Ns,useOptimistic:function(e){var t=cs();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=pc.bind(null,R,!0,n),n.dispatch=t,[e,t]},useMemoCache:ps,useCacheRefresh:function(){return cs().memoizedState=lc.bind(null,R)},useEffectEvent:function(e){var t=cs(),n={impl:e};return t.memoizedState=n,function(){if(W&2)throw Error(s(440));return n.impl.apply(void 0,arguments)}}},yc={readContext:Oa,use:fs,useCallback:Zs,useContext:Oa,useEffect:Us,useImperativeHandle:Ys,useInsertionEffect:Ks,useLayoutEffect:qs,useMemo:Qs,useReducer:hs,useRef:zs,useState:function(){return hs(ms)},useDebugValue:Xs,useDeferredValue:function(e,t){return ec(ls(),z.memoizedState,e,t)},useTransition:function(){var e=hs(ms)[0],t=ls().memoizedState;return[typeof e==`boolean`?e:ds(e),t]},useSyncExternalStore:vs,useId:sc,useHostTransitionStatus:oc,useFormState:Ps,useActionState:Ps,useOptimistic:function(e,t){return Ts(ls(),z,e,t)},useMemoCache:ps,useCacheRefresh:cc,useEffectEvent:Gs},bc={readContext:Oa,use:fs,useCallback:Zs,useContext:Oa,useEffect:Us,useImperativeHandle:Ys,useInsertionEffect:Ks,useLayoutEffect:qs,useMemo:Qs,useReducer:_s,useRef:zs,useState:function(){return _s(ms)},useDebugValue:Xs,useDeferredValue:function(e,t){var n=ls();return z===null?$s(n,e,t):ec(n,z.memoizedState,e,t)},useTransition:function(){var e=_s(ms)[0],t=ls().memoizedState;return[typeof e==`boolean`?e:ds(e),t]},useSyncExternalStore:vs,useId:sc,useHostTransitionStatus:oc,useFormState:Ls,useActionState:Ls,useOptimistic:function(e,t){var n=ls();return z===null?(n.baseState=e,[e,n.queue.dispatch]):Ts(n,z,e,t)},useMemoCache:ps,useCacheRefresh:cc,useEffectEvent:Gs};function xc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:T({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Sc={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=jd(),i=bo(r);i.payload=t,n!=null&&(i.callback=n),t=xo(e,i,r),t!==null&&(Pd(t,e,r),So(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=jd(),i=bo(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=xo(e,i,r),t!==null&&(Pd(t,e,r),So(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=jd(),r=bo(n);r.tag=2,t!=null&&(r.callback=t),t=xo(e,r,n),t!==null&&(Pd(t,e,n),So(t,e,n))}};function Cc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Kr(n,r)||!Kr(i,a):!0}function wc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Sc.enqueueReplaceState(t,t.state,null)}function Tc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=T({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Ec(e){wi(e)}function Dc(e){console.error(e)}function Oc(e){wi(e)}function kc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Ac(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function jc(e,t,n){return n=bo(n),n.tag=3,n.payload={element:null},n.callback=function(){kc(e,t)},n}function Mc(e){return e=bo(e),e.tag=3,e}function Nc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Ac(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Ac(t,n,r),typeof i!=`function`&&(yd===null?yd=new Set([this]):yd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Pc(e,t,n,r,i){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Ta(t,n,i,!0),n=Po.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Fo===null?Kd():n.alternate===null&&Y===0&&(Y=3),n.flags&=-257,n.flags|=65536,n.lanes=i,r===to?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),mf(e,r,i)),!1;case 22:return n.flags|=65536,r===to?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),mf(e,r,i)),!1}throw Error(s(435,n.tag))}return mf(e,r,i),Kd(),!1}if(L)return t=Po.current,t===null?(r!==ua&&(t=Error(s(423),{cause:r}),_a(Ki(t,n))),e=e.current.alternate,e.flags|=65536,i&=-i,e.lanes|=i,r=Ki(r,n),i=jc(e.stateNode,r,i),Co(e,i),Y!==4&&(Y=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=i,r!==ua&&(e=Error(s(422),{cause:r}),_a(Ki(e,n)))),!1;var a=Error(s(520),{cause:r});if(a=Ki(a,n),fd===null?fd=[a]:fd.push(a),Y!==4&&(Y=2),t===null)return!0;r=Ki(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=i&-i,n.lanes|=e,e=jc(n.stateNode,r,e),Co(n,e),!1;case 1:if(t=n.type,a=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||a!==null&&typeof a.componentDidCatch==`function`&&(yd===null||!yd.has(a))))return n.flags|=65536,i&=-i,n.lanes|=i,i=Mc(i),Nc(i,e,n,r),Co(n,i),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Fc=Error(s(461)),Ic=!1;function Lc(e,t,n,r){t.child=e===null?go(t,null,n,r):ho(t,e.child,n,r)}function Rc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Da(t),r=ts(e,t,n,o,a,i),s=as(),e!==null&&!Ic?(os(e,t,i),fl(e,t,i)):(L&&s&&ia(t),t.flags|=1,Lc(e,t,r,i),t.child)}function zc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!Li(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Bc(e,t,a,r,i)):(e=Bi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!pl(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Kr:n,n(o,r)&&e.ref===t.ref)return fl(e,t,i)}return t.flags|=1,e=Ri(a,r),e.ref=t.ref,e.return=t,t.child=e}function Bc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Kr(a,r)&&e.ref===t.ref){if(Ic=!1,t.pendingProps=r=a,pl(e,i))e.flags&131072&&(Ic=!0);else return t.lanes=e.lanes,fl(e,t,i)}}return Jc(e,t,n,r,i)}function Vc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Uc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Xa(t,a===null?null:a.cachePool),a===null?Mo():jo(t,a),Ro(t);else return r=t.lanes=536870912,Uc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Xa(t,null),Mo(),zo()):(Xa(t,a.cachePool),jo(t,a),zo(),t.memoizedState=null);return Lc(e,t,i,n),t.child}function Hc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Uc(e,t,n,r,i){var a=Ya();return a=a===null?null:{parent:Pa._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Xa(t,null),Mo(),Ro(t),e!==null&&Ta(e,t,r,!0),t.childLanes=i,null}function Wc(e,t){return t=rl({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Gc(e,t,n){return ho(t,e.child,null,n),e=Wc(t,t.pendingProps),e.flags|=2,Bo(t),t.memoizedState=null,e}function Kc(e,t,n){var r=t.pendingProps,i=!!(t.flags&128);if(t.flags&=-129,e===null){if(L){if(r.mode===`hidden`)return e=Wc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Hc(null,e);if(Lo(t),(e=I)?(e=am(e,la),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:$i===null?null:{id:ea,overflow:ta},retryLane:536870912,hydrationErrors:null},n=Ui(e),n.return=t,t.child=n,sa=t,I=null)):e=null,e===null)throw da(t);return t.lanes=536870912,null}return Wc(t,r)}var a=e.memoizedState;if(a!==null){var o=a.dehydrated;if(Lo(t),i){if(t.flags&256)t.flags&=-257,t=Gc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(s(558))}else if(Ic||Ta(e,t,n,!1),i=(n&e.childLanes)!==0,Ic||i){if(ko.current===null){if(r=G,r!==null&&(o=P(r,n),o!==0&&o!==a.retryLane))throw a.retryLane=o,ji(e,o),Pd(r,e,o),Fc;Kd()}t=Gc(e,t,n)}else e=a.treeContext,I=lm(o.nextSibling),sa=t,L=!0,ca=null,la=!1,e!==null&&oa(t,e),t=Wc(t,r),t.flags|=134221824;return t}return e=Ri(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function qc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(s(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Jc(e,t,n,r,i){return Da(t),n=ts(e,t,n,r,void 0,i),r=as(),e!==null&&!Ic?(os(e,t,i),fl(e,t,i)):(L&&r&&ia(t),t.flags|=1,Lc(e,t,n,i),t.child)}function Yc(e,t,n,r,i,a){return Da(t),t.updateQueue=null,n=rs(t,r,n,i),ns(e),r=as(),e!==null&&!Ic?(os(e,t,a),fl(e,t,a)):(L&&r&&ia(t),t.flags|=1,Lc(e,t,n,a),t.child)}function Xc(e,t,n,r,i){if(Da(t),t.stateNode===null){var a=Pi,o=n.contextType;typeof o==`object`&&o&&(a=Oa(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Sc,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},vo(t),o=n.contextType,a.context=typeof o==`object`&&o?Oa(o):Pi,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(xc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Sc.enqueueReplaceState(a,a.state,null),Eo(t,r,a,i),To(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Tc(n,s);a.props=c;var l=a.context,u=n.contextType;o=Pi,typeof u==`object`&&u&&(o=Oa(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&wc(t,a,r,o),_o=!1;var f=t.memoizedState;a.state=f,Eo(t,r,a,i),To(),l=t.memoizedState,s||f!==l||_o?(typeof d==`function`&&(xc(t,n,d,r),l=t.memoizedState),(c=_o||Cc(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,yo(e,t),o=t.memoizedProps,u=Tc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=Pi,typeof l==`object`&&l&&(c=Oa(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&wc(t,a,r,c),_o=!1,f=t.memoizedState,a.state=f,Eo(t,r,a,i),To();var p=t.memoizedState;o!==d||f!==p||_o||e!==null&&e.dependencies!==null&&Ea(e.dependencies)?(typeof s==`function`&&(xc(t,n,s,r),p=t.memoizedState),(u=_o||Cc(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Ea(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,qc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=ho(t,e.child,null,i),t.child=ho(t,null,n,i)):Lc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=fl(e,t,i),e}function Zc(e,t,n,r){return ha(),t.flags|=256,Lc(e,t,n,r),t.child}var Qc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function $c(e){return{baseLanes:e,cachePool:Za()}}function el(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=ud),e}function tl(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Vo.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(L){if(i?Io(t):zo(),(e=I)?(e=am(e,la),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:$i===null?null:{id:ea,overflow:ta},retryLane:536870912,hydrationErrors:null},n=Ui(e),n.return=t,t.child=n,sa=t,I=null)):e=null,e===null)throw da(t);return t.lanes=sm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(zo(),i=t.mode,a=rl({mode:`hidden`,children:a},i),r=Vi(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=$c(n),r.childLanes=el(e,o,n),t.memoizedState=Qc,Hc(null,r)):(Io(t),nl(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return al(e,t,a,o,r,c,s,n)}return i?(zo(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Ri(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=Vi(i,a,n,null),i.flags|=2):i=Ri(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Hc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=$c(n):(a=i.cachePool,a===null?a=Za():(s=Pa._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=el(e,o,n),t.memoizedState=Qc,Hc(e.child,r)):(Io(t),n=e.child,e=n.sibling,n=Ri(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function nl(e,t){return t=rl({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function rl(e,t){return e=Ii(22,e,null,t),e.lanes=0,e}function il(e,t,n){return ho(t,e.child,null,n),e=nl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function al(e,t,n,r,i,a,o,c){if(n)return t.flags&256?(Io(t),t.flags&=-257,il(e,t,c)):t.memoizedState===null?(zo(),a=i.fallback,o=t.mode,i=rl({mode:`visible`,children:i.children},o),a=Vi(a,o,c,null),a.flags|=2,i.return=t,a.return=t,i.sibling=a,t.child=i,ho(t,e.child,null,c),i=t.child,i.memoizedState=$c(c),i.childLanes=el(e,r,c),t.memoizedState=Qc,Hc(null,i)):(zo(),t.child=e.child,t.flags|=128,null);if(Io(t),sm(a)){if(r=a.nextSibling&&a.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(i=Error(s(419)),i.stack=``,i.digest=r,_a({value:i,source:null,stack:null})),il(e,t,c)}if(Ic||Ta(e,t,c,!1),r=(c&e.childLanes)!==0,Ic||r){if(ko.current!==null)return il(e,t,c);if(r=G,r!==null&&(i=P(r,c),i!==0&&i!==o.retryLane))throw o.retryLane=i,ji(e,i),Pd(r,e,i),Fc;return om(a)||Kd(),il(e,t,c)}return om(a)?(t.flags|=192,t.child=e.child,null):(e=o.treeContext,I=lm(a.nextSibling),sa=t,L=!0,ca=null,la=!1,e!==null&&oa(t,e),t=nl(t,i.children),t.flags|=134221824,t)}function ol(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ca(e.return,t,n)}function sl(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Wo(n)===null&&(t=e),e=e.sibling}return t}function cl(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function ll(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function ul(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Vo.current;if(t.flags&128)return Ho(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Ho(t,o),i===`backwards`&&e!==null?(ll(e),Lc(e,t,r,n),ll(e)):Lc(e,t,r,n),r=L?Xi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ol(e,n,t);else if(e.tag===19)ol(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=sl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,ll(t)),cl(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Wo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}cl(t,!0,n,null,a,r);break;case`together`:cl(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=sl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),cl(t,!1,i,n,a,r)}return t.child}function dl(e,t,n){var r=t.pendingProps;return xa(t,t.type,r.value),Lc(e,t,r.children,n),t.child}function fl(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),sd|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(Ta(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(s(153));if(t.child!==null){for(e=t.child,n=Ri(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ri(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function pl(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&Ea(e)))}function ml(e,t,n){switch(t.tag){case 3:ke(t,t.stateNode.containerInfo),xa(t,Pa,e.memoizedState.cache),ha();break;case 27:case 5:je(t);break;case 4:ke(t,t.stateNode.containerInfo);break;case 10:xa(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Lo(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return Io(t),t.flags|=128,null;r=Ta(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?tl(e,t,n):(Io(t),e=fl(e,t,n),e===null?null:e.sibling)}Io(t);break;case 19:if(t.flags&128)return ul(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(Ta(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return ul(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Ho(t,Vo.current),r)break;return null;case 22:return t.lanes=0,Vc(e,t,n,t.pendingProps);case 24:xa(t,Pa,e.memoizedState.cache)}return fl(e,t,n)}function hl(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)Ic=!0;else{if(!pl(e,n)&&!(t.flags&128))return Ic=!1,ml(e,t,n);Ic=!!(e.flags&131072)}}else Ic=!1,L&&t.flags&1048576&&ra(t,Xi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=io(t.elementType),t.type=e,typeof e==`function`)Li(e)?(r=Tc(e,r),t.tag=1,t=Xc(null,t,e,r,n)):(t.tag=0,t=Jc(null,t,e,r,n));else{if(e!=null){var i=e.$$typeof;if(i===A){t.tag=11,t=Rc(null,t,e,r,n);break a}if(i===ce){t.tag=14,t=zc(null,t,e,r,n);break a}if(i===ae){t.tag=10,t.type=e,t=dl(null,t,n);break a}}throw t=ve(e)||e,Error(s(306,t,``))}}return t;case 0:return Jc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,i=Tc(r,t.pendingProps),Xc(e,t,r,i,n);case 3:a:{if(ke(t,t.stateNode.containerInfo),e===null)throw Error(s(387));r=t.pendingProps;var a=t.memoizedState;i=a.element,yo(e,t),Eo(t,r,null,n);var o=t.memoizedState;if(r=o.cache,xa(t,Pa,r),r!==a.cache&&wa(t,[Pa],n,!0),To(),r=o.element,a.isDehydrated){if(a={element:r,isDehydrated:!1,cache:o.cache},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){t=Zc(e,t,r,n);break a}if(r!==i){i=Ki(Error(s(424)),t),_a(i),t=Zc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(I=lm(e.firstChild),sa=t,L=!0,ca=null,la=!0,n=go(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(ha(),r===i){t=fl(e,t,n);break a}Lc(e,t,r,n)}t=t.child}return t;case 26:return qc(e,t),e===null?(n=Nm(t.type,null,t.pendingProps,null))?t.memoizedState=n:L||(t.stateNode=fp(t.type,t.pendingProps,De.current,t)):t.memoizedState=Nm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return je(t),e===null&&L&&(r=t.stateNode=hm(t.type,t.pendingProps,De.current),sa=t,la=!0,i=I,Sp(t.type)?(um=i,I=lm(r.firstChild)):I=i),Lc(e,t,t.pendingProps.children,n),qc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&L&&((i=r=I)&&(r=rm(r,t.type,t.pendingProps,la),r===null?i=!1:(t.stateNode=r,sa=t,I=lm(r.firstChild),la=!1,i=!0)),i||da(t)),je(t),i=t.type,a=t.pendingProps,o=e===null?null:e.memoizedProps,r=a.children,pp(i,a)?r=null:o!==null&&pp(i,o)&&(t.flags|=32),t.memoizedState!==null&&(i=ts(e,t,is,null,null,n),sh._currentValue=i),qc(e,t),Lc(e,t,r,n),t.child;case 6:return e===null&&L&&((e=n=I)&&(n=im(n,t.pendingProps,la),n===null?e=!1:(t.stateNode=n,sa=t,I=null,e=!0)),e||da(t)),null;case 13:return tl(e,t,n);case 4:return ke(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=ho(t,null,r,n):Lc(e,t,r,n),t.child;case 11:return Rc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,qc(e,t),Lc(e,t,r,n),t.child;case 8:return Lc(e,t,t.pendingProps.children,n),t.child;case 12:return Lc(e,t,t.pendingProps.children,n),t.child;case 10:return dl(e,t,n);case 9:return i=t.type._context,r=t.pendingProps.children,Da(t),i=Oa(i),r=r(i),t.flags|=1,Lc(e,t,r,n),t.child;case 14:return zc(e,t,t.type,t.pendingProps,n);case 15:return Bc(e,t,t.type,t.pendingProps,n);case 19:return ul(e,t,n);case 31:return Kc(e,t,n);case 22:return Vc(e,t,n,t.pendingProps);case 24:return Da(t),r=Oa(Pa),e===null?(i=Ya(),i===null&&(i=G,a=Fa(),i.pooledCache=a,a.refCount++,a!==null&&(i.pooledCacheLanes|=n),i=a),t.memoizedState={parent:r,cache:i},vo(t),xa(t,Pa,i)):((e.lanes&n)!==0&&(yo(e,t),Eo(t,null,null,n),To()),i=e.memoizedState,a=t.memoizedState,i.parent===r?(r=a.cache,xa(t,Pa,r),r!==i.cache&&wa(t,[Pa],n,!0)):(i={parent:r,cache:r},t.memoizedState=i,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=i),xa(t,Pa,r))),Lc(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:L&&ia(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:qc(e,t),Lc(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(s(156,t.tag))}function gl(e){e.flags|=4}function _l(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Jm(t,r):Jm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Ud())e.flags|=8192;else throw ao=to,$a}}else e.flags&=-16777217}function vl(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Ym(t)){if(Ud())e.flags|=8192;else throw ao=to,$a}}function yl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:ht(),e.lanes|=t,dd|=t)}function bl(e,t){if(!L)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function V(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function xl(e,t,n){var r=t.pendingProps;switch(aa(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return V(t),null;case 1:return V(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Sa(Pa),Ae(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(ma(t)?gl(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,ga())),V(t),null;case 26:var i=t.type,a=t.memoizedState;return e===null?(gl(t),a===null?(V(t),_l(t,i,null,r,n)):(V(t),vl(t,a))):a?a===e.memoizedState?(V(t),t.flags&=-16777217):(gl(t),V(t),vl(t,a)):(e=e.memoizedProps,e!==r&&gl(t),V(t),_l(t,i,e,r,n)),null;case 27:if(Me(t),n=De.current,i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&gl(t);else{if(!r){if(t.stateNode===null)throw Error(s(166));return V(t),t.subtreeFlags&=-33554433,null}e=Te.current,ma(t)?fa(t,e):(e=hm(i,r,n),t.stateNode=e,gl(t))}return V(t),t.subtreeFlags&=-33554433,null;case 5:if(Me(t),i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&gl(t);else{if(!r){if(t.stateNode===null)throw Error(s(166));return V(t),t.subtreeFlags&=-33554433,null}if(a=Te.current,ma(t))fa(t,a);else{var o=lp(De.current);switch(a){case 1:a=o.createElementNS(`http://www.w3.org/2000/svg`,i);break;case 2:a=o.createElementNS(`http://www.w3.org/1998/Math/MathML`,i);break;default:switch(i){case`svg`:a=o.createElementNS(`http://www.w3.org/2000/svg`,i);break;case`math`:a=o.createElementNS(`http://www.w3.org/1998/Math/MathML`,i);break;case`script`:a=o.createElement(`div`),a.innerHTML=`<script><\/script>`,a=a.removeChild(a.firstChild);break;case`select`:a=typeof r.is==`string`?o.createElement(`select`,{is:r.is}):o.createElement(`select`),r.multiple?a.multiple=!0:r.size&&(a.size=r.size);break;default:a=typeof r.is==`string`?o.createElement(i,{is:r.is}):o.createElement(i)}}a[Et]=t,a[Dt]=r;a:for(o=t.child;o!==null;){if(o.tag===5||o.tag===6)a.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===t)break a;for(;o.sibling===null;){if(o.return===null||o.return===t)break a;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=a;a:switch(np(a,i,r),i){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&gl(t)}}return V(t),t.subtreeFlags&=-33554433,_l(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&gl(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(s(166));if(e=De.current,ma(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,i=sa,i!==null)switch(i.tag){case 27:case 5:r=i.memoizedProps}e[Et]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||ep(e.nodeValue,n)),e||da(t,!0)}else e=lp(e).createTextNode(r),e[Et]=t,t.stateNode=e}return V(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=ma(t),n!==null){if(e===null){if(!r)throw Error(s(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(557));e[Et]=t}else ha(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;V(t),e=!1}else n=ga(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Bo(t),t):(Bo(t),null);if(t.flags&128)throw Error(s(558))}return V(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(i=ma(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(s(318));if(i=t.memoizedState,i=i===null?null:i.dehydrated,!i)throw Error(s(317));i[Et]=t}else ha(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;V(t),i=!1}else i=ga(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=i),i=!0;if(!i)return t.flags&256?(Bo(t),t):(Bo(t),null)}return Bo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,i=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(i=r.alternate.memoizedState.cachePool.pool),a=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(a=r.memoizedState.cachePool.pool),a!==i&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),yl(t,t.updateQueue),V(t),null);case 4:return Ae(),e===null&&Wf(t.stateNode.containerInfo),t.flags|=67108864,V(t),null;case 10:return Sa(t.type),V(t),null;case 19:if(Uo(t),r=t.memoizedState,r===null)return V(t),null;if(i=!!(t.flags&128),a=r.rendering,a===null){if(i)bl(r,!1);else{if(Y!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=Wo(e),a!==null){for(t.flags|=128,bl(r,!1),e=a.updateQueue,t.updateQueue=e,yl(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)zi(n,e),n=n.sibling;return Ho(t,Vo.current&1|2),L&&na(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Ge()>_d&&(t.flags|=128,i=!0,bl(r,!1),t.lanes=4194304)}}else{if(!i){if(e=Wo(a),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,yl(t,e),bl(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!a.alternate&&!L)return V(t),null}else 2*Ge()-r.renderingStartTime>_d&&n!==536870912&&(t.flags|=128,i=!0,bl(r,!1),t.lanes=4194304)}r.isBackwards?(a.sibling=t.child,t.child=a):(e=r.last,e===null?t.child=a:e.sibling=a,r.last=a)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ge(),e.sibling=null,a=Vo.current,a=i?a&1|2:a&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||L?Ho(t,a):(n=a,N(Po,t),N(Vo,n),Fo===null&&(Fo=t)),L&&na(t,r.treeForkCount),e}return V(t),null;case 22:case 23:return Bo(t),No(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(V(t),t.subtreeFlags&6&&(t.flags|=8192)):V(t),n=t.updateQueue,n!==null&&yl(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&we(Ja),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Sa(Pa),V(t),null;case 25:return null;case 30:return t.flags|=33554432,V(t),null}throw Error(s(156,t.tag))}function Sl(e,t){switch(aa(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Sa(Pa),Ae(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Me(t),null;case 31:if(t.memoizedState!==null){if(Bo(t),t.alternate===null)throw Error(s(340));ha()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Bo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(s(340));ha()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Uo(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Ae(),null;case 10:return Sa(t.type),null;case 22:case 23:return Bo(t),No(),e!==null&&we(Ja),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Sa(Pa),null;case 25:return null;default:return null}}function Cl(e,t){switch(aa(t),t.tag){case 3:Sa(Pa),Ae();break;case 26:case 27:case 5:Me(t);break;case 4:Ae();break;case 31:t.memoizedState!==null&&Bo(t);break;case 13:Bo(t);break;case 19:Uo(t);break;case 10:Sa(t.type);break;case 22:case 23:Bo(t),No(),e!==null&&we(Ja);break;case 24:Sa(Pa)}}function wl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Tl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function El(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Oo(t,n)}catch(t){Z(e,e.return,t)}}}function Dl(e,t,n){n.props=Tc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Ol(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=xi(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Pp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new Fp(e);h(e.child,!1,Qp,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function kl(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}}function Al(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)em(e.stateNode,t[n])}function jl(e){for(var t=e.return;t!==null&&(Pl(t)&&em(e.stateNode,t.stateNode),!Nl(t));)t=t.return}function Ml(e){for(var t=e.return;t!==null&&(Pl(t)&&tm(e.stateNode,t.stateNode),!Nl(t));)t=t.return}function Nl(e){return e.tag===5||e.tag===3||e.tag===27}function Pl(e){return e&&e.tag===7&&e.stateNode!==null}function Fl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Il(e,t,n){try{var r=e.stateNode;ip(r,e.type,n,t),r[Dt]=t}catch(t){Z(e,e.return,t)}}function Ll(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Sp(e.type)||e.tag===4}function Rl(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Ll(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Sp(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function zl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Sn)),Al(e,r),F=!0;else if(i!==4&&(i===27&&(Al(e,r),r=null,Sp(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(zl(e,t,n,r),e=e.sibling;e!==null;)zl(e,t,n,r),e=e.sibling}function Bl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),Al(e,r),F=!0;else if(i!==4&&(i===27&&(Al(e,r),r=null,Sp(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Bl(e,t,n,r),e=e.sibling;e!==null;)Bl(e,t,n,r),e=e.sibling}function Vl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);np(t,r,n),t[Et]=e,t[Dt]=n}catch(t){Z(e,e.return,t)}}var Hl=!1,Ul=null;function Wl(e){(e.tag===30||e.subtreeFlags&33554432)&&(Hl=!0)}var Gl=null;function Kl(){var e=Gl;return Gl=null,e}var ql=0;function Jl(e,t,n,r,i){return ql=0,Yl(e.child,t,n,r,i)}function Yl(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Op(o);r.push(s),s.view&&(a=!0)}else a||Op(o).view&&(a=!0);Hl=!0,Tp(o,ql===0?t:t+`_`+ql,n),ql++}else e.tag===22&&e.memoizedState!==null||e.tag===30&&i||Yl(e.child,t,n,r,i)&&(a=!0);e=e.sibling}return a}function Xl(e,t){for(;e!==null;)e.tag===5?Ep(e.stateNode,e.memoizedProps):e.tag===22&&e.memoizedState!==null||e.tag===30&&t||Xl(e.child,t),e=e.sibling}function Zl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Zl(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(s(544));var n=t.name;t=Ci(t.default,t.share),t!==`none`&&(Jl(e,n,t,null,!1)||Xl(e.child,!1))}e=e.sibling}}function Ql(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=xi(r,n),a=Ci(r.default,n.paired?r.share:r.enter);a===`none`?Zl(e):Jl(e,i,a,null,!1)?(Zl(e),n.paired||t||Nd(e,r.onEnter)):Xl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Ql(e,t),e=e.sibling;else Zl(e)}function $l(e){if(Ul!==null&&Ul.size!==0){var t=Ul;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=Ci(n.default,n.share);if(a!==`none`&&(Jl(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Nd(e,n.onShare)):Xl(e.child,!1)),t.delete(r),t.size===0)break}}}$l(e)}e=e.sibling}}}function eu(e){if(e.tag===30){var t=e.memoizedProps,n=xi(t,e.stateNode),r=Ul===null?void 0:Ul.get(n),i=Ci(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Jl(e,n,i,null,!1)?r===void 0?Nd(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,Ul.delete(n),Nd(e,t.onShare)):Xl(e.child,!1)),Ul!==null&&$l(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)eu(e),e=e.sibling;else Ul!==null&&$l(e)}function tu(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=xi(t,e.stateNode);t=Ci(t.default,t.update),e.flags&=-5,t!==`none`&&Jl(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&tu(e);e=e.sibling}}function nu(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Xl(e.child,!1))}nu(e)}e=e.sibling}}function ru(e){if(e.tag===30)e.stateNode.paired=null,Xl(e.child,!1),nu(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)ru(e),e=e.sibling;else nu(e)}function iu(e){for(e=e.child;e!==null;)e.tag===30?Xl(e.child,!1):e.subtreeFlags&33554432&&iu(e),e=e.sibling}function au(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&ql<a.length){var l=a[ql],u=Op(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&Tp(c,ql===0?n:n+`_`+ql,i),s&&e.flags&4||(Gl===null&&(Gl=[]),Gl.push(c,ql===0?r:r+`_`+ql,t.memoizedProps)),ql++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:au(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function ou(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=xi(n,r),a=Ci(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(kp)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;ql=0,i=au(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Nd(e,n.onUpdate))}else e.subtreeFlags&33554432&&ou(e,t);e=e.sibling}}var su=!1,H=!1,cu=!1,lu=!1,uu=typeof WeakSet==`function`?WeakSet:Set,du=null,fu=!1,pu=!1,mu=!1,hu=!1;function gu(e,t,n){if(e=e.containerInfo,sp=gh,e=Zr(e),Qr(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(cp={focusedElem:e,selectionRange:r},gh=!1,n=(n&335544064)===n,du=t,t=n?9270:1024;du!==null;){if(e=du,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&eu(r[a]);if(e.alternate===null&&e.flags&2)n&&Wl(e),_u(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&eu(r),_u(n);continue}if(r!==null&&r.memoizedState!==null){n&&Wl(e),_u(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,du=r):(n&&tu(e),_u(n))}}Ul=null}function _u(e){for(;du!==null;){var t=du,n=e,r=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(i&1024&&r!==null){n=void 0,i=r.memoizedProps,r=r.memoizedState;var a=t.stateNode;try{var o=Tc(t.type,i);n=a.getSnapshotBeforeUpdate(o,r),a.__reactInternalSnapshotBeforeUpdate=n}catch(e){Z(t,t.return,e)}}break;case 3:if(i&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)nm(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:nm(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=xi(r.memoizedProps,r.stateNode),i=t.memoizedProps,i=Ci(i.default,i.update),i!==`none`&&Jl(r,n,i,r.memoizedState=[],!0));break;default:if(i&1024)throw Error(s(163))}if(r=t.sibling,r!==null){r.return=t.return,du=r;break}du=t.return}}function vu(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Lu(e,n),r&4&&wl(5,n);break;case 1:if(Lu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Tc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}}r&64&&El(n),r&512&&Ol(n,n.return);break;case 3:if(Lu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Oo(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Vl(n);case 26:case 5:Lu(e,n),t===null&&r&4&&Fl(n),r&512&&Ol(n,n.return);break;case 12:Lu(e,n);break;case 31:Lu(e,n),r&4&&Eu(e,n);break;case 13:Lu(e,n),r&4&&Du(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=_f.bind(null,n),cm(e,n))));break;case 22:if(r=n.memoizedState!==null||su,!r){var a=t!==null&&t.memoizedState!==null||H;t=su,i=H,su=r,(H=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),zu(e,n,r)):Lu(e,n),su=t,H=i}break;case 30:Lu(e,n),r&512&&Ol(n,n.return);break;case 7:r&512&&Ol(n,n.return);default:Lu(e,n)}}function yu(e,t){for(e=e.child;e!==null;)bu(e,t),e=e.sibling}function bu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){Z(e,e.return,t)}xu(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,F=!0}catch(t){Z(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?wp(s,!0):wp(e.stateNode,!1)}catch(t){Z(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&yu(e,t);break;default:yu(e,t)}}function xu(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:bu(n,r);break a;case 22:n.memoizedState===null&&xu(n,r);break a;default:xu(n,r)}}e=e.sibling}}function Su(e){var t=e.alternate;t!==null&&(e.alternate=null,Su(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Ft(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var U=null,Cu=!1;function wu(e,t,n){for(n=n.child;n!==null;)Tu(e,t,n),n=n.sibling}function Tu(e,t,n){if(tt&&typeof tt.onCommitFiberUnmount==`function`)try{tt.onCommitFiberUnmount(et,n)}catch{}switch(n.tag){case 26:H||kl(n,t),wu(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!H&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:H||kl(n,t),Ml(n);var r=U,i=Cu;Sp(n.type)&&(U=n.stateNode,Cu=!1),wu(e,t,n),gm(n.stateNode,n.type,n.memoizedProps),U=r,Cu=i;break;case 5:H||kl(n,t),Ml(n);case 6:if(n.tag===6&&Ml(n),r=U,i=Cu,U=null,wu(e,t,n),U=r,Cu=i,U!==null){if(Cu)try{(U.nodeType===9?U.body:U.nodeName===`HTML`?U.ownerDocument.body:U).removeChild(n.stateNode),F=!0}catch(e){Z(n,t,e)}else try{U.removeChild(n.stateNode),F=!0}catch(e){Z(n,t,e)}}break;case 18:U!==null&&(Cu?(e=U,Cp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Hh(e)):Cp(U,n.stateNode));break;case 4:r=U,i=Cu,U=n.stateNode.containerInfo,Cu=!0,wu(e,t,n),U=r,Cu=i;break;case 0:case 11:case 14:case 15:Tl(2,n,t),H||Tl(4,n,t),wu(e,t,n);break;case 1:H||(kl(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Dl(n,t,r)),wu(e,t,n);break;case 21:wu(e,t,n);break;case 22:H=(r=H)||n.memoizedState!==null,wu(e,t,n),H=r;break;case 30:kl(n,t),wu(e,t,n);break;case 7:H||kl(n,t),wu(e,t,n);break;default:wu(e,t,n)}}function Eu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Hh(e)}catch(e){Z(t,t.return,e)}}}function Du(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Hh(e)}catch(e){Z(t,t.return,e)}}function Ou(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new uu),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new uu),t;default:throw Error(s(435,e.tag))}}function ku(e,t){var n=Ou(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=vf.bind(null,e,t);t.then(r,r)}})}function Au(e,t,n){var r=t.deletions;if(r!==null)for(var i=0;i<r.length;i++){var a=r[i],o=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Sp(l.type)){U=l.stateNode,Cu=!1;break a}break;case 5:U=l.stateNode,Cu=!1;break a;case 3:case 4:U=l.stateNode.containerInfo,Cu=!0;break a}l=l.return}if(U===null)throw Error(s(160));Tu(o,c,a),U=null,Cu=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Mu(t,e,n),t=t.sibling}var ju=null;function Mu(e,t,n){var r=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(i&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var a=0;a<r.length;a++){var o=r[a];o.ref.impl=o.nextImpl}Au(t,e,n),Nu(e),i&4&&(Tl(3,e,e.return),wl(3,e),Tl(5,e,e.return));break;case 1:Au(t,e,n),Nu(e),i&512&&(H||r===null||kl(r,r.return)),i&64&&su&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(a=ju,Au(t,e,n),Nu(e),i&512&&(H||r===null||kl(r,r.return)),i&4){if(i=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(su)e.stateNode=fp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,i=a.ownerDocument||a;b:switch(t){case`title`:r=i.getElementsByTagName(`title`)[0],(!r||r[Nt]||r[Et]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=i.createElement(t),i.head.insertBefore(r,i.querySelector(`head > title`))),np(r,t,n),r[Et]=e,Bt(r),t=r;break a;case`link`:if(a=Gm(`link`,`href`,i).get(t+(n.href||``))){for(o=0;o<a.length;o++)if(r=a[o],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){a.splice(o,1);break b}}r=i.createElement(t),np(r,t,n),i.head.appendChild(r);break;case`meta`:if(a=Gm(`meta`,`content`,i).get(t+(n.content||``))){for(o=0;o<a.length;o++)if(r=a[o],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){a.splice(o,1);break b}}r=i.createElement(t),np(r,t,n),i.head.appendChild(r);break;default:throw Error(s(468,t))}r[Et]=e,Bt(r),t=r}e.stateNode=t}}else su||Km(a,e.type,e.stateNode)}else e.stateNode=Bm(a,n,e.memoizedProps)}else i===n?n===null&&e.stateNode!==null&&Il(e,e.memoizedProps,r.memoizedProps):(i===null?(t=r.stateNode,t===null||H||t.parentNode.removeChild(t)):i.count--,n===null?su||Km(a,e.type,e.stateNode):Bm(a,n,e.memoizedProps))}break;case 27:Au(t,e,n),Nu(e),i&512&&(H||r===null||kl(r,r.return)),r!==null&&i&4&&Il(e,e.memoizedProps,r.memoizedProps);break;case 5:if(a=cu,cu=!1,Au(t,e,n),cu=a,Nu(e),i&512&&(H||r===null||kl(r,r.return)),e.flags&32){t=e.stateNode;try{mn(t,``),F=!0}catch(t){Z(e,e.return,t)}}i&4&&e.stateNode!=null&&(t=e.memoizedProps,Il(e,t,r===null?t:r.memoizedProps)),i&1024&&(lu=!0);break;case 6:if(Au(t,e,n),Nu(e),i&4){if(e.stateNode===null)throw Error(s(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,F=!0}catch(t){Z(e,e.return,t)}}break;case 3:if(F=!1,Wm=null,a=ju,ju=bm(t.containerInfo),Au(t,e,n),ju=a,Nu(e),i&4&&r!==null&&r.memoizedState.isDehydrated)try{Hh(t.containerInfo)}catch(t){Z(e,e.return,t)}lu&&(lu=!1,Pu(e)),F=!1;break;case 4:i=cu,cu=su,r=Xt(),a=ju,ju=bm(e.stateNode.containerInfo),Au(t,e,n),Nu(e),ju=a,F&&pu&&(mu=!0),F=r,cu=i;break;case 12:Au(t,e,n),Nu(e);break;case 31:Au(t,e,n),Nu(e),i&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 13:Au(t,e,n),Nu(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(hd=Ge()),i&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 22:a=e.memoizedState!==null,o=r!==null&&r.memoizedState!==null;var c=su,l=H,u=cu;su=c||a,cu=u||a,H=l||o,Au(t,e,n),H=l,cu=u,su=c,Nu(e),i&8192&&(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,!a||r===null||o||su||H||(t=o||H,n=su,r=H,su=a||su,H=t,Ru(e,2),su=n,H=r),!a&&cu||yu(e,a)),i&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,ku(e,n))));break;case 19:Au(t,e,n),Nu(e),i&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 30:i&512&&(H||r===null||kl(r,r.return)),i=Xt(),a=pu,o=(n&335544064)===n,c=e.memoizedProps,pu=o&&Ci(c.default,c.update)!==`none`,Au(t,e,n),Nu(e),o&&r!==null&&F&&(e.flags|=4),pu=a,F=i;break;case 21:break;case 7:i&512&&(H||r===null||kl(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:Au(t,e,n),Nu(e)}}function Nu(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Ll(r)){n=r;break}r=r.return}r=null;for(var i=e.return;i!==null;){if(Pl(i)){var a=i.stateNode;r===null?r=[a]:r.push(a)}if(Nl(i))break;i=i.return}var o=r;if(n==null)throw Error(s(160));switch(n.tag){case 27:var c=n.stateNode;Bl(e,Rl(e),c,o);break;case 5:var l=n.stateNode;n.flags&32&&(mn(l,``),n.flags&=-33),Bl(e,Rl(e),l,o);break;case 3:case 4:var u=n.stateNode.containerInfo;zl(e,Rl(e),u,o);break;default:throw Error(s(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Pu(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Pu(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,gh=!0,t.reset(),gh=!1),e=e.sibling}}function Fu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Iu(t,e),t=t.sibling;else ou(t,!1)}function Iu(e,t){var n=e.alternate;if(n===null)Ql(e,!1);else switch(e.tag){case 3:if(hu=fu=!1,Kl(),Fu(t,e),!fu&&!mu){if(e=Gl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Ep(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),hu=!0}Gl=null;break;case 5:Fu(t,e);break;case 4:r=fu,fu=!1,Fu(t,e),fu&&(mu=!0),fu=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Fu(t,e):Ql(e,!1));break;case 30:r=fu,i=Kl(),fu=!1,Fu(t,e),fu&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=xi(a,o),o=xi(n.memoizedProps,o);var s=Ci(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,ql=0,t=au(e,n,t,o,s,a,!0),ql!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Nd(e,e.memoizedProps.onUpdate),Gl=i):i!==null&&(i.push.apply(i,Gl),Gl=i),fu=e.flags&32?!0:r;break;default:Fu(t,e)}}function Lu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)vu(e,t.alternate,t),t=t.sibling}function Ru(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:Tl(4,n,n.return),Ru(n,r);break;case 1:kl(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&Dl(n,n.return,i),Ru(n,r);break;case 27:r&2&&gm(n.stateNode,n.type,n.memoizedProps);case 5:kl(n,n.return),n.tag!==5&&n.tag!==27||Ml(n),Ru(n,r);break;case 6:Ml(n);break;case 26:kl(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||H||i.parentNode.removeChild(i),Ru(n,r);break;case 22:n.memoizedState===null&&Ru(n,r);break;case 30:kl(n,n.return),Ru(n,r);break;case 7:kl(n,n.return);default:Ru(n,r)}e=e.sibling}}function zu(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:zu(i,a,n),wl(4,a);break;case 1:if(zu(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)Do(l[i],c)}catch(e){Z(r,r.return,e)}}s&&o&64&&El(a),Ol(a,a.return);break;case 27:n&2&&Vl(a);case 5:a.tag!==5&&a.tag!==27||jl(a),zu(i,a,n),s&&r===null&&o&4&&Fl(a),Ol(a,a.return);break;case 6:jl(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||su||Km(bm(c.ownerDocument),a.type,c),zu(i,a,n),s&&r===null&&o&4&&Fl(a),Ol(a,a.return);break;case 12:zu(i,a,n);break;case 31:zu(i,a,n),s&&o&4&&Eu(i,a);break;case 13:zu(i,a,n),s&&o&4&&Du(i,a);break;case 22:a.memoizedState===null&&zu(i,a,n),Ol(a,a.return);break;case 30:zu(i,a,n),Ol(a,a.return);break;case 7:Ol(a,a.return);default:zu(i,a,n)}t=t.sibling}}function Bu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Ia(n))}function Vu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Ia(e))}function Hu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Uu(e,t,n,r),t=t.sibling;else i&&iu(t)}function Uu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&ru(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Hu(e,t,n,r),a&2048&&wl(9,t);break;case 1:Hu(e,t,n,r);break;case 3:Hu(e,t,n,r),i&&hu&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&Ia(a)));break;case 12:if(a&2048){Hu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Hu(e,t,n,r);break;case 31:Hu(e,t,n,r);break;case 13:Hu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&ru(t),o._visibility&2?Hu(e,t,n,r):(o._visibility|=2,Wu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&ru(s),o._visibility&2?Hu(e,t,n,r):Gu(e,t)),a&2048&&Bu(s,t);break;case 24:Hu(e,t,n,r),a&2048&&Vu(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Xl(a.child,!0),Xl(t.child,!0))),Hu(e,t,n,r);break;default:Hu(e,t,n,r)}}function Wu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Wu(a,o,s,c,i),wl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Wu(a,o,s,c,i)):u._visibility&2?Wu(a,o,s,c,i):Gu(a,o),i&&l&2048&&Bu(o.alternate,o);break;case 24:Wu(a,o,s,c,i),i&&l&2048&&Vu(o.alternate,o);break;default:Wu(a,o,s,c,i)}t=t.sibling}}function Gu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Gu(n,r),i&2048&&Bu(r.alternate,r);break;case 24:Gu(n,r),i&2048&&Vu(r.alternate,r);break;default:Gu(n,r)}t=t.sibling}}var Ku=8192;function qu(e,t,n){if(e.subtreeFlags&Ku)for(e=e.child;e!==null;)Ju(e,t,n),e=e.sibling}function Ju(e,t,n){switch(e.tag){case 26:qu(e,t,n),e.flags&Ku&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&Zm(n,e)):Qm(n,ju,e.memoizedState,e.memoizedProps));break;case 5:qu(e,t,n),e.flags&Ku&&(e=e.stateNode,(t&335544128)===t&&Zm(n,e));break;case 3:case 4:var r=ju;ju=bm(e.stateNode.containerInfo),qu(e,t,n),ju=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Ku,Ku=16777216,qu(e,t,n),Ku=r):qu(e,t,n));break;case 30:if((e.flags&Ku)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,Ul===null&&(Ul=new Map),Ul.set(r,i)}qu(e,t,n);break;default:qu(e,t,n)}}function Yu(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Xu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];du=r,$u(r,e)}Yu(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Zu(e),e=e.sibling}function Zu(e){switch(e.tag){case 0:case 11:case 15:Xu(e),e.flags&2048&&Tl(9,e,e.return);break;case 3:Xu(e);break;case 12:Xu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Qu(e)):Xu(e);break;default:Xu(e)}}function Qu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];du=r,$u(r,e)}Yu(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Tl(8,t,t.return),Qu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Qu(t));break;default:Qu(t)}e=e.sibling}}function $u(e,t){for(;du!==null;){var n=du;switch(n.tag){case 0:case 11:case 15:Tl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Ia(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,du=r;else a:for(n=e;du!==null;){r=du;var i=r.sibling,a=r.return;if(Su(r),r===n){du=null;break a}if(i!==null){i.return=a,du=i;break a}du=a}}}var ed={getCacheForType:function(e){var t=Oa(Pa),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Oa(Pa).controller.signal}},td=typeof WeakMap==`function`?WeakMap:Map,W=0,G=null,K=null,q=0,J=0,nd=null,rd=!1,id=!1,ad=!1,od=0,Y=0,sd=0,cd=0,ld=0,ud=0,dd=0,fd=null,pd=null,md=!1,hd=0,gd=0,_d=1/0,vd=null,yd=null,X=0,bd=null,xd=null,Sd=0,Cd=0,wd=null,Td=null,Ed=null,Dd=null,Od=null,kd=0,Ad=null;function jd(){return W&2&&q!==0?q&-q:j.T===null?Ct():Pf()}function Md(){if(ud===0){if(!(q&536870912)||L){var e=ct;ct<<=1,!(ct&3932160)&&(ct=262144),ud=e}else ud=536870912}return e=Po.current,e!==null&&(e.flags|=32),ud}function Nd(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Pp(xi(e.memoizedProps,n))),Dd===null&&(Dd=[]),Dd.push(t.bind(null,r))}}function Pd(e,t,n){(e===G&&(J===2||J===9)||e.cancelPendingCommit!==null)&&(Vd(e,0),Rd(e,q,ud,!1)),_t(e,n),W&2&&e===G||(e===G&&(!(W&2)&&(cd|=n),Y===4&&Rd(e,q,ud,!1)),Ef(e))}function Fd(e,t,n){if(W&6)throw Error(s(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||ft(e,t),i=r?Yd(e,t):qd(e,t,!0),a=r;do{if(i===0){id&&!r&&Rd(e,t,0,!1);break}if(n=e.current.alternate,a&&!Ld(n))i=qd(e,t,!1),a=!1;else{if(i===2){if(a=t,e.errorRecoveryDisabledLanes&a)var o=0;else o=e.pendingLanes&-536870913,o=o===0?o&536870912?536870912:0:o;if(o!==0){t=o;a:{var c=e;i=fd;var l=c.current.memoizedState.isDehydrated;if(l&&(Vd(c,o).flags|=256),o=qd(c,o,!1),o!==2&&o!==6){if(ad&&!l){c.errorRecoveryDisabledLanes|=a,cd|=a,i=4;break a}a=pd,pd=i,a!==null&&(pd===null?pd=a:pd.push.apply(pd,a))}i=o}if(a=!1,i!==2)continue}}if(i===1){Vd(e,0),Rd(e,t,0,!0);break}a:{switch(r=e,a=i,a){case 0:case 1:throw Error(s(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Rd(r,t,ud,!rd);break a;case 2:pd=null;break;case 3:case 5:break;default:throw Error(s(329))}if((t&62914560)===t&&(i=hd+300-Ge(),10<i)){if(Rd(r,t,ud,!rd),dt(r,0,!0)!==0)break a;Sd=t,r.timeoutHandle=gp(Id.bind(null,r,n,pd,vd,md,t,ud,cd,dd,rd,a,`Throttled`,-0,0),i);break a}Id(r,n,pd,vd,md,t,ud,cd,dd,rd,a,null,-0,0)}break}}while(1);Ef(e)}function Id(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Sn},Ul=null,Ju(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=nh.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?hd-Ge():(a&4194048)===a?gd-Ge():0,m=eh(d,m),m!==null)?(Sd=a,e.cancelPendingCommit=m(nf.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Rd(e,a,o,!l)):nf(e,t,a,n,r,i,o,s,c,l,u,d)}function Ld(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Gr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Rd(e,t,n,r){t=pt(e,t),t&=~ld,t&=~cd,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-rt(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&yt(e,n,t)}function zd(){return W&6?!0:(Df(0,!1),!1)}function Bd(){if(K!==null){if(J===0)var e=K.return;else e=K,ba=ya=null,ss(e),co=null,lo=0,e=K;for(;e!==null;)Cl(e.alternate,e),e=e.return;K=null}}function Vd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,_p(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Sd=0,Bd(),G=e,K=n=Ri(e.current,null),q=t,J=0,nd=null,rd=!1,id=ft(e,t),ad=!1,dd=ud=ld=cd=sd=Y=0,pd=fd=null,md=!1,od=pt(e,t),Oi(),n}function Hd(e,t){R=null,j.H=_c,t===Qa||t===eo?(t=oo(),J=3):t===$a?(t=oo(),J=4):J=t===Fc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,nd=t,K===null&&(Y=1,kc(e,Ki(t,e.current)))}function Ud(){var e=Po.current;return e===null?!0:(q&4194048)===q?Fo===null:(q&62914560)===q||q&536870912?e===Fo:!1}function Wd(){var e=j.H;return j.H=_c,e===null?_c:e}function Gd(){var e=j.A;return j.A=ed,e}function Kd(){Y=4,rd||(q&4194048)!==q&&Po.current!==null||(id=!0),!(sd&134217727)&&!(cd&134217727)||G===null||Rd(G,q,ud,!1)}function qd(e,t,n){var r=W;W|=2;var i=Wd(),a=Gd();(G!==e||q!==t)&&(vd=null,Vd(e,t)),t=!1;var o=Y;a:do try{if(J!==0&&K!==null){var s=K,c=nd;switch(J){case 8:Bd(),o=6;break a;case 3:case 2:case 9:case 6:Po.current===null&&(t=!0);var l=J;if(J=0,nd=null,$d(e,s,c,l),n&&id){o=0;break a}break;default:l=J,J=0,nd=null,$d(e,s,c,l)}}Jd(),o=Y;break}catch(t){Hd(e,t)}while(1);return t&&e.shellSuspendCounter++,ba=ya=null,W=r,j.H=i,j.A=a,K===null&&(G=null,q=0,Oi()),o}function Jd(){for(;K!==null;)Zd(K)}function Yd(e,t){var n=W;W|=2;var r=Wd(),i=Gd();G!==e||q!==t?(vd=null,_d=Ge()+500,Vd(e,t)):id=ft(e,t);a:do try{if(J!==0&&K!==null){t=K;var a=nd;b:switch(J){case 1:J=0,nd=null,$d(e,t,a,1);break;case 2:case 9:if(no(a)){J=0,nd=null,Qd(t);break}t=function(){J!==2&&J!==9||G!==e||(J=7),Ef(e)},a.then(t,t);break a;case 3:J=7;break a;case 4:J=5;break a;case 7:no(a)?(J=0,nd=null,Qd(t)):(J=0,nd=null,$d(e,t,a,7));break;case 5:var o=null;switch(K.tag){case 26:o=K.memoizedState;case 5:case 27:var c=K;if(o?Ym(o):c.stateNode.complete){J=0,nd=null;var l=c.sibling;if(l!==null)K=l;else{var u=c.return;u===null?K=null:(K=u,ef(u))}break b}}J=0,nd=null,$d(e,t,a,5);break;case 6:J=0,nd=null,$d(e,t,a,6);break;case 8:Bd(),Y=6;break a;default:throw Error(s(462))}}Xd();break}catch(t){Hd(e,t)}while(1);return ba=ya=null,j.H=r,j.A=i,W=n,K===null?(G=null,q=0,Oi(),Y):0}function Xd(){for(;K!==null&&!Ue();)Zd(K)}function Zd(e){var t=hl(e.alternate,e,od);e.memoizedProps=e.pendingProps,t===null?ef(e):K=t}function Qd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Yc(n,t,t.pendingProps,t.type,void 0,q);break;case 11:t=Yc(n,t,t.pendingProps,t.type.render,t.ref,q);break;case 5:ss(t);var r=t;r===sa&&(L?(pa(r),r.tag===5&&r.stateNode!=null&&(I=r.stateNode)):(pa(r),L=!0));default:Cl(n,t),t=K=zi(t,od),t=hl(n,t,od)}e.memoizedProps=e.pendingProps,t===null?ef(e):K=t}function $d(e,t,n,r){ba=ya=null,ss(t),co=null,lo=0;var i=t.return;try{if(Pc(e,i,t,n,q)){Y=1,kc(e,Ki(n,e.current)),K=null;return}}catch(t){if(i!==null)throw K=i,t;Y=1,kc(e,Ki(n,e.current)),K=null;return}t.flags&32768?(L||r===1?e=!0:id||q&536870912?e=!1:(rd=e=!0,(r===2||r===9||r===3||r===6)&&(r=Po.current,r!==null&&r.tag===13&&(r.flags|=16384))),tf(t,e)):ef(t)}function ef(e){var t=e;do{if(t.flags&32768){tf(t,rd);return}e=t.return;var n=xl(t.alternate,t,od);if(n!==null){K=n;return}if(t=t.sibling,t!==null){K=t;return}K=t=e}while(t!==null);Y===0&&(Y=5)}function tf(e,t){do{var n=Sl(e.alternate,e);if(n!==null){n.flags&=32767,K=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){K=e;return}K=e=n}while(e!==null);Y=6,K=null}function nf(e,t,n,r,i,a,o,c,l,u,d,f){e.cancelPendingCommit=null;do df();while(X!==0);if(W&6)throw Error(s(327));if(t!==null){if(t===e.current)throw Error(s(177));e===G&&(K=G=null,q=0),xd=t,bd=e,Sd=n,wd=i,Td=r,rf(e,t,n,o,c,l,f)}}function rf(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(Cd=s,s|=Di,vt(e,n,s,r,i,a),Dd=null,(n&335544064)===n?(Od=za(e),r=10262):(Od=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,yf(Ye,function(){return ff(),null})):(e.callbackNode=null,e.callbackPriority=0),Hl=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=j.T,j.T=null,i=M.p,M.p=2,a=W,W|=4;try{gu(e,t,n)}finally{W=a,M.p=i,j.T=r}}X=1,Hl?Ed=Mp(o,e.containerInfo,Od,sf,cf,of,lf,ff,af,null,null):(sf(),cf(),lf())}function af(e){if(X!==0){var t=bd.onRecoverableError;t(e,{componentStack:null})}}function of(){X===3&&(X=0,Iu(xd,bd),X=4)}function sf(){if(X===1){X=0;var e=bd,t=xd,n=Sd,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=j.T,j.T=null;var i=M.p;M.p=2;var a=W;W|=4;try{pu=mu=!1,Mu(t,e,n),n=cp;var o=Zr(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&Xr(s.ownerDocument.documentElement,s)){if(c!==null&&Qr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Yr(s,h),v=Yr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}gh=!!sp,cp=sp=null}finally{W=a,M.p=i,j.T=r}}e.current=t,X=2}}function cf(){if(X===2){X=0;var e=bd,t=xd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=j.T,j.T=null;var r=M.p;M.p=2;var i=W;W|=4;try{vu(e,t.alternate,t)}finally{W=i,M.p=r,j.T=n}}X=3}}function lf(){if(X===4||X===3){X=0;var e=Ed;Ed=null,We();var t=bd,n=xd,r=Sd,i=Td,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?X=5:(X=0,xd=bd=null,uf(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(yd=null),St(r),n=n.stateNode,tt&&typeof tt.onCommitFiberRoot==`function`)try{tt.onCommitFiberRoot(et,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=j.T,a=M.p,M.p=2,j.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{j.T=n,M.p=a}}if(i=Dd,o=Od,Od=null,i!==null&&(Dd=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);Sd&3&&df(),Ef(t),a=t.pendingLanes,r&261930&&a&42?t===Ad?kd++:(kd=0,Ad=t):(kd=0,Ad=null),Df(0,!1)}}function uf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Ia(t)))}function df(){return Ed!==null&&(Ed.skipTransition(),Ed=null),sf(),cf(),lf(),ff()}function ff(){if(X!==5)return!1;var e=bd,t=Cd;Cd=0;var n=St(Sd),r=j.T,i=M.p;try{M.p=32>n?32:n,j.T=null,n=wd,wd=null;var a=bd,o=Sd;if(X=0,xd=bd=null,Sd=0,W&6)throw Error(s(331));var c=W;if(W|=4,Zu(a.current),Uu(a,a.current,o,n),W=c,Df(0,!1),tt&&typeof tt.onPostCommitFiberRoot==`function`)try{tt.onPostCommitFiberRoot(et,a)}catch{}return!0}finally{M.p=i,j.T=r,uf(e,t)}}function pf(e,t,n){t=Ki(n,t),t=jc(e.stateNode,t,2),e=xo(e,t,2),e!==null&&(_t(e,2),Ef(e))}function Z(e,t,n){if(e.tag===3)pf(e,e,n);else for(;t!==null;){if(t.tag===3){pf(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(yd===null||!yd.has(r))){e=Ki(n,e),n=Mc(2),r=xo(t,n,2),r!==null&&(Nc(n,r,t,e),_t(r,2),Ef(r));break}}t=t.return}}function mf(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new td;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(ad=!0,i.add(n),e=hf.bind(null,e,t,n),t.then(e,e))}function hf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,G===e&&(q&n)===n&&(Y===4||Y===3&&(q&62914560)===q&&300>Ge()-hd?W&2?ld|=n:Vd(e,0):ld|=n,dd===q&&(dd=0)),Ef(e)}function gf(e,t){t===0&&(t=ht()),e=ji(e,t),e!==null&&(_t(e,t),Ef(e))}function _f(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),gf(e,n)}function vf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(t),gf(e,n)}function yf(e,t){return Ve(e,t)}var bf=null,xf=null,Sf=!1,Cf=!1,wf=!1,Tf=0;function Ef(e){e!==xf&&e.next===null&&(xf===null?bf=xf=e:xf=xf.next=e),Cf=!0,Sf||(Sf=!0,Nf())}function Df(e,t){if(!wf&&Cf){wf=!0;do for(var n=!1,r=bf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-rt(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Mf(r,a))}else a=q,a=dt(r,r===G?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||ft(r,a)||(n=!0,Mf(r,a))}r=r.next}while(n);wf=!1}}function Of(){kf()}function kf(){Cf=Sf=!1;var e=0;Tf!==0&&hp()&&(e=Tf);for(var t=Ge(),n=null,r=bf;r!==null;){var i=r.next,a=Af(r,t);a===0?(r.next=null,n===null?bf=i:n.next=i,i===null&&(xf=n)):(n=r,(e!==0||a&3)&&(Cf=!0)),r=i}X!==0&&X!==5||Df(e,!1),Tf!==0&&(Tf=0)}function Af(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-rt(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=mt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=G,n=q,n=dt(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(J===2||J===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&He(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||ft(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&He(r),St(n)){case 2:case 8:n=Je;break;case 32:n=Ye;break;case 268435456:n=Ze;break;default:n=Ye}return r=jf.bind(null,e),n=Ve(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&He(r),e.callbackPriority=2,e.callbackNode=null,2}function jf(e,t){if(X!==0&&X!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(df()&&e.callbackNode!==n)return null;var r=q;return r=dt(e,e===G?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Fd(e,r,t),Af(e,Ge()),e.callbackNode!=null&&e.callbackNode===n?jf.bind(null,e):null)}function Mf(e,t){if(df())return null;Fd(e,t,!0)}function Nf(){bp(function(){W&6?Ve(qe,Of):kf()})}function Pf(){if(Tf===0){var e=Ha;e===0&&(e=st,st<<=1,!(st&261888)&&(st=256)),Tf=e}return Tf}function Ff(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:xn(e)}function If(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Ff((i[Dt]||null).action),o=r.submitter;o&&(t=(t=o[Dt]||null)?Ff(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Un(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Tf!==0){var e=new FormData(i,o);rc(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),rc(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Lf=0;Lf<vi.length;Lf++){var Rf=vi[Lf];yi(Rf.toLowerCase(),`on`+(Rf[0].toUpperCase()+Rf.slice(1)))}yi(ui,`onAnimationEnd`),yi(di,`onAnimationIteration`),yi(fi,`onAnimationStart`),yi(`dblclick`,`onDoubleClick`),yi(`focusin`,`onFocus`),yi(`focusout`,`onBlur`),yi(pi,`onTransitionRun`),yi(mi,`onTransitionStart`),yi(hi,`onTransitionCancel`),yi(gi,`onTransitionEnd`),Gt(`onMouseEnter`,[`mouseout`,`mouseover`]),Gt(`onMouseLeave`,[`mouseout`,`mouseover`]),Gt(`onPointerEnter`,[`pointerout`,`pointerover`]),Gt(`onPointerLeave`,[`pointerout`,`pointerover`]),Wt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Wt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Wt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Wt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Wt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Wt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var zf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Bf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(zf));function Vf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){wi(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){wi(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[kt];n===void 0&&(n=t[kt]=new Set);var r=e+`__bubble`;n.has(r)||(Gf(t,e,2,!1),n.add(r))}function Hf(e,t,n){var r=0;t&&(r|=4),Gf(n,e,r,t)}var Uf=`_reactListening`+Math.random().toString(36).slice(2);function Wf(e){if(!e[Uf]){e[Uf]=!0,Ht.forEach(function(t){t!==`selectionchange`&&(Bf.has(t)||Hf(t,!1,e),Hf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Uf]||(t[Uf]=!0,Hf(`selectionchange`,!1,t))}}function Gf(e,t,n,r){switch(Ch(t)){case 2:var i=_h;break;case 8:i=vh;break;default:i=yh}n=i.bind(null,t,n,e),i=void 0,!Mn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Kf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===i)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&o.stateNode.containerInfo===i)return;o=o.return}for(;s!==null;){if(o=It(s),o===null)return;if(c=o.tag,c===5||c===6||c===26||c===27){r=a=o;continue a}s=s.parentNode}}r=r.return}kn(function(){var r=a,i=wn(n),o=[];a:{var s=_i.get(e);if(s!==void 0){var c=Un,u=e;switch(e){case`keypress`:if(Rn(n)===0)break a;case`keydown`:case`keyup`:c=sr;break;case`focusin`:u=`focus`,c=Qn;break;case`focusout`:u=`blur`,c=Qn;break;case`beforeblur`:case`afterblur`:c=Qn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:c=Xn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:c=Zn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:c=ur;break;case ui:case di:case fi:c=$n;break;case gi:c=dr;break;case`scroll`:case`scrollend`:c=Gn;break;case`wheel`:c=fr;break;case`copy`:case`cut`:case`paste`:c=er;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:c=cr;break;case`submit`:c=lr;break;case`toggle`:case`beforetoggle`:c=pr}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?s===null?null:s+`Capture`:s;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=An(m,p),g!=null&&d.push(qf(m,g,h))),f)break;m=m.return}0<d.length&&(s=new c(s,u,null,n,i),o.push({event:s,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,s=e===`mouseout`||e===`pointerout`,c&&n!==Cn&&(u=n.relatedTarget||n.fromElement)&&(It(u)||u[Ot]))break a;(s||c)&&(u=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,s?(c=n.relatedTarget||n.toElement,s=r,c=c?It(c):null,c!==null&&(f=l(c),d=c.tag,c!==f||d!==5&&d!==27&&d!==6)&&(c=null)):(s=null,c=r),s!==c&&(d=Xn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=cr,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=s==null?u:Rt(s),h=c==null?u:Rt(c),u=new d(g,m+`leave`,s,n,i),u.target=f,u.relatedTarget=h,g=null,It(i)===r&&(d=new d(p,m+`enter`,c,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=s&&c?w(s,c,Yf):null,s!==null&&Xf(o,u,s,d,!1),c!==null&&f!==null&&Xf(o,f,c,d,!0)))}a:{if(s=r?Rt(r):window,c=s.nodeName&&s.nodeName.toLowerCase(),c===`select`||c===`input`&&s.type===`file`)var _=Nr;else if(Dr(s)){if(Pr)_=Ur;else{_=Vr;var v=Br}}else c=s.nodeName,!c||c.toLowerCase()!==`input`||s.type!==`checkbox`&&s.type!==`radio`?r&&vn(r.elementType)&&(_=Nr):_=Hr;if(_&&=_(e,r)){Or(o,_,n,i);break a}v&&v(e,s,r)}switch(v=r?Rt(r):window,e){case`focusin`:(Dr(v)||v.contentEditable===`true`)&&(ei=v,ti=r,ni=null);break;case`focusout`:ni=ti=ei=null;break;case`mousedown`:ri=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:ri=!1,ii(o,n,i);break;case`selectionchange`:if($r)break;case`keydown`:case`keyup`:ii(o,n,i)}var y;if(hr)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else Cr?xr(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(vr&&n.locale!==`ko`&&(Cr||b!==`onCompositionStart`?b===`onCompositionEnd`&&Cr&&(y=Ln()):(Pn=i,Fn=`value`in Pn?Pn.value:Pn.textContent,Cr=!0)),v=Jf(r,b),0<v.length&&(b=new tr(b,e,null,n,i),o.push({event:b,listeners:v}),y?b.data=y:(y=Sr(n),y!==null&&(b.data=y)))),(y=_r?wr(e,n):Tr(e,n))&&(b=Jf(r,`onBeforeInput`),0<b.length&&(v=new tr(`onBeforeInput`,`beforeinput`,null,n,i),o.push({event:v,listeners:b}),v.data=y)),If(o,e,r,n,i)}Vf(o,t)})}function qf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Jf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=An(e,n),i!=null&&r.unshift(qf(e,i,a)),i=An(e,t),i!=null&&r.push(qf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Yf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Xf(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=An(n,a),l!=null&&o.unshift(qf(n,l,c))):i||(l=An(n,a),l!=null&&o.push(qf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Zf=/\r\n?/g,Qf=/\u0000|\uFFFD/g;function $f(e){return(typeof e==`string`?e:``+e).replace(Zf,`
`).replace(Qf,``)}function ep(e,t){return t=$f(t),$f(e)===t}function $(e,t,n,r,i,a){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||mn(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&mn(e,``+r);else return;break;case`className`:Qt(e,`class`,r);break;case`tabIndex`:Qt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Qt(e,n,r);break;case`style`:_n(e,r,a);return;case`data`:if(t!==`object`){Qt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=xn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof a==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,i.name,i,null),$(e,t,`formEncType`,i.formEncType,i,null),$(e,t,`formMethod`,i.formMethod,i,null),$(e,t,`formTarget`,i.formTarget,i,null)):($(e,t,`encType`,i.encType,i,null),$(e,t,`method`,i.method,i,null),$(e,t,`target`,i.target,i,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=xn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=Sn);return;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(s(61));if(n=r.__html,n!=null){if(i.children!=null)throw Error(s(60));a?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=xn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Zt(e,`popover`,r);break;case`xlinkActuate`:$t(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:$t(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:$t(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:$t(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:$t(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:$t(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:$t(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:$t(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:$t(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Zt(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=yn.get(n)||n,Zt(e,n,r);else return}F=!0}function tp(e,t,n,r,i,a){switch(n){case`style`:_n(e,r,a);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(s(61));if(n=r.__html,n!=null){if(i.children!=null)throw Error(s(60));a?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)mn(e,r);else if(typeof r==`number`||typeof r==`bigint`)mn(e,``+r);else return;break;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=Sn);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!Ut.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(i=n.endsWith(`Capture`),a=n.slice(2,i?n.length-7:void 0),t=e[Dt]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(a,t,i),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(a,r,i);break a}F=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):Zt(e,n,r)}return}F=!0}function np(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,i=!1,a;for(a in n)if(n.hasOwnProperty(a)){var o=n[a];if(o!=null)switch(a){case`src`:r=!0;break;case`srcSet`:i=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(s(137,t));default:$(e,t,a,o,n,null)}}i&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=a=o=i=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:i=d;break;case`type`:o=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:a=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(s(137,t));break;default:$(e,t,r,d,n,null)}}ln(e,a,c,l,u,o,i,!1);return;case`select`:for(i in Q(`invalid`,e),r=o=a=null,n)if(n.hasOwnProperty(i)&&(c=n[i],c!=null))switch(i){case`value`:a=c;break;case`defaultValue`:o=c;break;case`multiple`:r=c;default:$(e,t,i,c,n,null)}t=a,n=o,e.multiple=!!r,t==null?n!=null&&dn(e,!!r,n,!0):dn(e,!!r,t,!1);return;case`textarea`:for(o in Q(`invalid`,e),a=i=r=null,n)if(n.hasOwnProperty(o)&&(c=n[o],c!=null))switch(o){case`value`:r=c;break;case`defaultValue`:i=c;break;case`children`:a=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(s(91));break;default:$(e,t,o,c,n,null)}pn(e,r,i,a);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<zf.length;r++)Q(zf[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(s(137,t));default:$(e,t,u,r,n,null)}return;default:if(vn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&tp(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}var rp={};function ip(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var i=null,a=null,o=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(F=!0),a=m;break;case`name`:m!==f&&(F=!0),i=m;break;case`checked`:m!==f&&(F=!0),u=m;break;case`defaultChecked`:m!==f&&(F=!0),d=m;break;case`value`:m!==f&&(F=!0),o=m;break;case`defaultValue`:m!==f&&(F=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(s(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}cn(e,o,c,l,u,d,a,i);return;case`select`:for(a in m=o=c=p=null,n)if(l=n[a],n.hasOwnProperty(a)&&l!=null)switch(a){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(a)||$(e,t,a,null,r,l)}for(i in r)if(a=r[i],l=n[i],r.hasOwnProperty(i)&&(a!=null||l!=null))switch(i){case`value`:a!==l&&(F=!0),p=a;break;case`defaultValue`:a!==l&&(F=!0),c=a;break;case`multiple`:a!==l&&(F=!0),o=a;default:a!==l&&$(e,t,i,a,r,l)}t=c,n=o,r=m,p==null?!!r!=!!n&&(t==null?dn(e,!!n,n?[]:``,!1):dn(e,!!n,t,!0)):dn(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(i=n[c],n.hasOwnProperty(c)&&i!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,i)}for(o in r)if(i=r[o],a=n[o],r.hasOwnProperty(o)&&(i!=null||a!=null))switch(o){case`value`:i!==a&&(F=!0),p=i;break;case`defaultValue`:i!==a&&(F=!0),m=i;break;case`children`:break;case`dangerouslySetInnerHTML`:if(i!=null)throw Error(s(91));break;default:i!==a&&$(e,t,o,i,r,a)}fn(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(F=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(s(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(vn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&tp(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||tp(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function ap(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function op(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&ap(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&ap(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var sp=null,cp=null;function lp(e){return e.nodeType===9?e:e.ownerDocument}function up(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function dp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function fp(e,t,n,r){return n=lp(n).createElement(e),n[Et]=r,n[Dt]=t,np(n,e,t),Bt(n),n}function pp(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var mp=null;function hp(){var e=window.event;return e&&e.type===`popstate`?e!==mp&&(mp=e,!0):(mp=null,!1)}var gp=typeof setTimeout==`function`?setTimeout:void 0,_p=typeof clearTimeout==`function`?clearTimeout:void 0,vp=typeof Promise==`function`?Promise:void 0,yp=typeof requestAnimationFrame==`function`?requestAnimationFrame:gp,bp=typeof queueMicrotask==`function`?queueMicrotask:vp===void 0?gp:function(e){return vp.resolve(null).then(e).catch(xp)};function xp(e){setTimeout(function(){throw e})}function Sp(e){return e===`head`}function Cp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Hh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)_m(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,_m(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Nt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&_m(e.ownerDocument.body)}n=i}while(n);Hh(t)}function wp(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function Tp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Ep(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function Dp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Op(e){return Dp(e.getBoundingClientRect(),getComputedStyle(e),e)}function kp(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return Dp(t,n,e)}function Ap(e){return e.documentElement.clientHeight}function jp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Mp(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Ap(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Xm(f),u>$m){s.length=o;break}f=new Promise(jp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Np(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Np.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:T({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Np.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Np.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Pp(e){return{name:e,group:new Np(`group`,e),imagePair:new Np(`image-pair`,e),old:new Np(`old`,e),new:new Np(`new`,e)}}function Fp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Fp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Bp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Rp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),h(this._fragmentFiber.child,!1,Ip,e,s,r)}this._eventListeners=a}};function Ip(e,t,n,r){return b(e).addEventListener(t,n,r),!1}Fp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Bp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Rp(i.optionsOrUseCapture),h(this._fragmentFiber.child,!1,Lp,e,n,i),r.splice(t,1),a!==null&&a()}};function Lp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Rp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function zp(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Bp(e,t,n,r){if(e.length===0)return-1;r=zp(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&zp(a.optionsOrUseCapture)===r)return i}return-1}Fp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},Fp.prototype.focus=function(e){h(this._fragmentFiber.child,!0,Vp,e,void 0,void 0)};function Vp(e,t){return e.tag!==6&&(e=b(e),pm(e,t))}Fp.prototype.focusLast=function(e){var t=[];h(this._fragmentFiber.child,!0,Hp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Vp(t[n],e);n--);};function Hp(e,t){return t.push(e),!1}Fp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=lp(e).activeElement,e!==null&&h(this._fragmentFiber.child,!1,Up,e,void 0,void 0))};function Up(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Fp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),h(this._fragmentFiber.child,!1,Wp,e,void 0,void 0)};function Wp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}Fp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),h(this._fragmentFiber.child,!1,Gp,e,void 0,void 0);for(var n=t=0;n<Kp.length;n++){var r=Kp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Kp[t++]=r}Kp.length=t}};function Gp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var Kp=[],qp=!1;function Jp(e,t,n){Kp.push({fragmentInstance:e,observer:t,instance:n}),qp||(qp=!0,mm(function(){qp=!1;var e=Kp;Kp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}Fp.prototype.getClientRects=function(){var e=[];return h(this._fragmentFiber.child,!1,Yp,e,void 0,void 0),e};function Yp(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}Fp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},Fp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];h(this._fragmentFiber.child,!1,Hp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||Xp(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function Xp(e,t,n,r,i){var a=It(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=w(n,a,C),t===null?t=!1:(h(t,!0,ee,a,n),a=x,x=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=w(r,a,C),t===null?t=!1:(h(t,!0,te,a,r),a=x,S=x=null,t=a!==null)),t):!1}function Zp(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Fp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(s(566));var t=[];h(this._fragmentFiber.child,!1,Hp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),Zp(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var i=t[r];i.tag===6?(i=b(i),Zp(i,n)):b(i).scrollIntoView(e),r+=n?-1:1}};function Qp(e,t){return e=b(e),$p(e,t),!1}function $p(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function em(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Kp.length;i++){var a=Kp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Kp[r++]=a)}Kp.length=r,n.observe(e)}),$p(e,t))}function tm(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Jp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function nm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:nm(n),Ft(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function rm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[Nt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=lm(e.nextSibling),e===null)break}return null}function im(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=lm(e.nextSibling),e===null))return null;return e}function am(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=lm(e.nextSibling),e===null))return null;return e}function om(e){return e.data===`$?`||e.data===`$~`}function sm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function cm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function lm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var um=null;function dm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return lm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function fm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function pm(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function mm(e){yp(function(){yp(function(t){return e(t)})})}function hm(e,t,n){switch(t=lp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(s(452));return e;case`head`:if(e=t.head,!e)throw Error(s(453));return e;case`body`:if(e=t.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function gm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&$(e,t,r,null,rp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===Sn&&(e.onclick=null),Ft(e)}function _m(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Ft(e)}var vm=new Map,ym=new Set;function bm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var xm=M.d;M.d={f:Sm,r:Cm,D:Em,C:Dm,L:Om,m:km,X:jm,S:Am,M:Mm};function Sm(){var e=xm.f(),t=zd();return e||t}function Cm(e){var t=Lt(e);t!==null&&t.tag===5&&t.type===`form`?ac(t):xm.r(e)}var wm=typeof document>`u`?null:document;function Tm(e,t,n){var r=wm;if(r&&typeof t==`string`&&t){var i=sn(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),ym.has(i)||(ym.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),np(t,`link`,e),Bt(t),r.head.appendChild(t)))}}function Em(e){xm.D(e),Tm(`dns-prefetch`,e,null)}function Dm(e,t){xm.C(e,t),Tm(`preconnect`,e,t)}function Om(e,t,n){xm.L(e,t,n);var r=wm;if(r&&e&&t){var i=`link[rel="preload"][as="`+sn(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+sn(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+sn(n.imageSizes)+`"]`)):i+=`[href="`+sn(e)+`"]`;var a=i;switch(t){case`style`:a=Pm(e);break;case`script`:a=Rm(e)}if(!(vm.has(a)||(e=T({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),vm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Fm(a))||t===`script`&&r.querySelector(zm(a))))){var o=r.createElement(`link`);np(o,`link`,e),t===`style`&&(o[Pt]=!0,o.onload=o.onerror=function(){Vt(o)}),Bt(o),r.head.appendChild(o)}}}function km(e,t){xm.m(e,t);var n=wm;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+sn(r)+`"][href="`+sn(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Rm(e)}if(!vm.has(a)&&(e=T({rel:`modulepreload`,href:e},t),vm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(zm(a)))return}r=n.createElement(`link`),np(r,`link`,e),Bt(r),n.head.appendChild(r)}}}function Am(e,t,n){xm.S(e,t,n);var r=wm;if(r&&e){var i=zt(r).hoistableStyles,a=Pm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Fm(a)))s.loading=5;else{e=T({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=vm.get(a))&&Hm(e,n);var c=o=r.createElement(`link`);Bt(c),np(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Vm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function jm(e,t){xm.X(e,t);var n=wm;if(n&&e){var r=zt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=T({src:e,async:!0},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Bt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Mm(e,t){xm.M(e,t);var n=wm;if(n&&e){var r=zt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=T({src:e,async:!0,type:`module`},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Bt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Nm(e,t,n,r){var i=(i=De.current)?bm(i):null;if(!i)throw Error(s(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Pm(n.href),t=zt(i).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Pm(n.href);var a=zt(i).hoistableStyles,o=a.get(e);if(o||(i=i.ownerDocument||i,o={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},a.set(e,o),(a=i.querySelector(Fm(e)))?a._p||(o.instance=a,o.state.loading=5):(a=vm.get(e),a||(a={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},vm.set(e,a)),Lm(i,e,a,o.state))),t&&r===null)throw Error(s(528,``));return o}if(t&&r!==null)throw Error(s(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Rm(n),t=zt(i).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(s(444,e))}}function Pm(e){return`href="`+sn(e)+`"`}function Fm(e){return`link[rel="stylesheet"][`+e+`]`}function Im(e){return T({},e,{"data-precedence":e.precedence,precedence:null})}function Lm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[Pt]){r.loading=1;return}}else t=e.createElement(`link`),t[Pt]=!0,t.onload=t.onerror=Vt.bind(null,t),np(t,`link`,n),Bt(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Rm(e){return`[src="`+sn(e)+`"]`}function zm(e){return`script[async]`+e}function Bm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+sn(n.href)+`"]`);if(r)return t.instance=r,Bt(r),r;var i=T({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Bt(r),np(r,`style`,i),Vm(r,n.precedence,e),t.instance=r;case`stylesheet`:i=Pm(n.href);var a=e.querySelector(Fm(i));if(a)return t.state.loading|=4,t.instance=a,Bt(a),a;r=Im(n),(i=vm.get(i))&&Hm(r,i),a=(e.ownerDocument||e).createElement(`link`),Bt(a);var o=a;return o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),np(a,`link`,r),t.state.loading|=4,Vm(a,n.precedence,e),t.instance=a;case`script`:return a=Rm(n.src),(i=e.querySelector(zm(a)))?(t.instance=i,Bt(i),i):(r=n,(i=vm.get(a))&&(r=T({},n),Um(r,i)),e=e.ownerDocument||e,i=e.createElement(`script`),Bt(i),np(i,`link`,r),e.head.appendChild(i),t.instance=i);case`void`:return null;default:throw Error(s(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Vm(r,n.precedence,e));return t.instance}function Vm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Hm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Um(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Wm=null;function Gm(e,t,n){if(Wm===null){var r=new Map,i=Wm=new Map;i.set(n,r)}else i=Wm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Nt]||a[Et]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Km(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function qm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Jm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Ym(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Xm(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function Zm(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Xm(t),e.suspenseyImages.push(t)),e=rh.bind(e),t.decode().then(e,e))}function Qm(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Pm(r.href),a=t.querySelector(Fm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=nh.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Bt(a);return}a=t.ownerDocument||t,r=Im(r),(i=vm.get(i))&&Hm(r,i),a=a.createElement(`link`),Bt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),np(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=nh.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var $m=0;function eh(e,t){return e.stylesheets&&e.count===0&&ah(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&$m===0&&($m=62500*op());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>$m?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function th(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)ah(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function nh(){this.count--,th(this)}function rh(){this.imgCount--,th(this)}var ih=null;function ah(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ih=new Map,t.forEach(oh,e),ih=null,nh.call(e))}function oh(e,t){if(!(t.state.loading&4)){var n=ih.get(e);if(n)var r=n.get(null);else{n=new Map,ih.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=nh.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var sh={$$typeof:ae,Provider:null,Consumer:null,_currentValue:be,_currentValue2:be,_threadCount:0};function ch(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=gt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=gt(0),this.hiddenUpdates=gt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function lh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new ch(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=Ii(3,null,null,t),e.current=a,a.stateNode=e,t=Fa(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},vo(a),e}function uh(e){return e?(e=Pi,e):Pi}function dh(e,t,n,r,i,a){i=uh(i),r.context===null?r.context=i:r.pendingContext=i,r=bo(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=xo(e,r,t),n!==null&&(Pd(n,e,t),So(n,e,t))}function fh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ph(e,t){fh(e,t),(e=e.alternate)&&fh(e,t)}function mh(e){if(e.tag===13||e.tag===31){var t=ji(e,67108864);t!==null&&Pd(t,e,67108864),ph(e,67108864)}}function hh(e){if(e.tag===13||e.tag===31){var t=jd();t=xt(t);var n=ji(e,t);n!==null&&Pd(n,e,t),ph(e,t)}}var gh=!0;function _h(e,t,n,r){var i=j.T;j.T=null;var a=M.p;try{M.p=2,yh(e,t,n,r)}finally{M.p=a,j.T=i}}function vh(e,t,n,r){var i=j.T;j.T=null;var a=M.p;try{M.p=8,yh(e,t,n,r)}finally{M.p=a,j.T=i}}function yh(e,t,n,r){if(gh){var i=bh(r);if(i===null)Kf(e,t,r,xh,n),Mh(e,r);else if(Ph(i,e,t,n,r))r.stopPropagation();else if(Mh(e,r),t&4&&-1<jh.indexOf(e)){for(;i!==null;){var a=Lt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=ut(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-rt(o);s.entanglements[1]|=c,o&=~c}Ef(a),!(W&6)&&(_d=Ge()+500,Df(0,!1))}}break;case 31:case 13:s=ji(a,2),s!==null&&Pd(s,a,2),zd(),ph(a,2)}if(a=bh(r),a===null&&Kf(e,t,r,xh,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Kf(e,t,r,null,n)}}function bh(e){return e=wn(e),Sh(e)}var xh=null;function Sh(e){if(xh=null,e=It(e),e!==null){var t=l(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=u(t),e!==null)return e;e=null}else if(n===31){if(e=d(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return xh=e,null}function Ch(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ke()){case qe:return 2;case Je:return 8;case Ye:case Xe:return 32;case Ze:return 268435456;default:return 32}default:return 32}}var wh=!1,Th=null,Eh=null,Dh=null,Oh=new Map,kh=new Map,Ah=[],jh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Mh(e,t){switch(e){case`focusin`:case`focusout`:Th=null;break;case`dragenter`:case`dragleave`:Eh=null;break;case`mouseover`:case`mouseout`:Dh=null;break;case`pointerover`:case`pointerout`:Oh.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:kh.delete(t.pointerId)}}function Nh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Lt(t),t!==null&&mh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ph(e,t,n,r,i){switch(t){case`focusin`:return Th=Nh(Th,e,t,n,r,i),!0;case`dragenter`:return Eh=Nh(Eh,e,t,n,r,i),!0;case`mouseover`:return Dh=Nh(Dh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Oh.set(a,Nh(Oh.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,kh.set(a,Nh(kh.get(a)||null,e,t,n,r,i)),!0}return!1}function Fh(e){var t=It(e.target);if(t!==null){var n=l(t);if(n!==null){if(t=n.tag,t===13){if(t=u(n),t!==null){e.blockedOn=t,wt(e.priority,function(){hh(n)});return}}else if(t===31){if(t=d(n),t!==null){e.blockedOn=t,wt(e.priority,function(){hh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ih(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Cn=r,n.target.dispatchEvent(r),Cn=null}else return t=Lt(n),t!==null&&mh(t),e.blockedOn=n,!1;t.shift()}return!0}function Lh(e,t,n){Ih(e)&&n.delete(t)}function Rh(){wh=!1,Th!==null&&Ih(Th)&&(Th=null),Eh!==null&&Ih(Eh)&&(Eh=null),Dh!==null&&Ih(Dh)&&(Dh=null),Oh.forEach(Lh),kh.forEach(Lh)}function zh(e,n){e.blockedOn===n&&(e.blockedOn=null,wh||(wh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Rh)))}var Bh=null;function Vh(e){Bh!==e&&(Bh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Bh===e&&(Bh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(Sh(r||n)===null)continue;break}var a=Lt(n);a!==null&&(e.splice(t,3),t-=3,rc(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Hh(e){function t(t){return zh(t,e)}Th!==null&&zh(Th,e),Eh!==null&&zh(Eh,e),Dh!==null&&zh(Dh,e),Oh.forEach(t),kh.forEach(t);for(var n=0;n<Ah.length;n++){var r=Ah[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Ah.length&&(n=Ah[0],n.blockedOn===null);)Fh(n),n.blockedOn===null&&Ah.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[Dt]||null;if(typeof a==`function`)o||Vh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[Dt]||null)s=o.formAction;else if(Sh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Vh(n)}}}function Uh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Wh(e){this._internalRoot=e}Gh.prototype.render=Wh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(s(409));var n=t.current;dh(n,jd(),e,t,null,null)},Gh.prototype.unmount=Wh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;dh(e.current,2,null,e,null,null),zd(),t[Ot]=null}};function Gh(e){this._internalRoot=e}Gh.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ct();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ah.length&&t!==0&&t<Ah[n].priority;n++);Ah.splice(n,0,e),n===0&&Fh(e)}};var Kh=r.version;if(Kh!==`19.3.1`)throw Error(s(527,Kh,`19.3.1`));M.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(s(188)):(e=Object.keys(e).join(`,`),Error(s(268,e)));return e=p(t),e=e===null?null:m(e),e=e===null?null:e.stateNode,e};var qh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:j,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Jh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jh.isDisabled&&Jh.supportsFiber)try{et=Jh.inject(qh),tt=Jh}catch{}}e.createRoot=function(e,t){if(!c(e))throw Error(s(299));var n=!1,r=``,i=Ec,a=Dc,o=Oc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(i=t.onUncaughtError),t.onCaughtError!==void 0&&(a=t.onCaughtError),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=lh(e,1,!1,null,null,n,r,null,i,a,o,Uh),e[Ot]=t.current,Wf(e),new Wh(t)}})),c=e(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=s()})),l=n(),u=c(),d={inflation:{breakeven10y:.0235,forward5y5y:.0231,cpiYoY:.0402,cpiYoYMonth:`2026-09`,cpiPeak2022:.0898,asOf:`2026-10-28`,source:`FRED: 10-year breakeven inflation (T10YIE), 5-year forward inflation expectation (T5YIFR), CPI (CPIAUCSL)`},rates:{treasury10y:.0516,baaCorporate:.0661,asOf:`2026-10-28`,source:`FRED: 10-year Treasury yield (DGS10), Moody's Baa corporate bond yield (DBAA)`},costOfCapital:{totalMarket:.0696,p10:.0521,median:.0709,p90:.0848,industries:94,asOf:`2026-01-05`,source:`Aswath Damodaran, NYU Stern: cost of capital by industry, US companies`},capacityFactors:{solar:.2398,wind:.3431,period:`2025-09 to 2026-08`,asOf:`2026-08`,source:`EIA Electric Power Monthly, Table 6.07.B (utility-scale fleet, trailing 12 months)`},onPeak:{CAISO:{hub:`SP15 EZ Gen DA LMP Peak`,onPeakPrice:27.91,days:220},PJM:{hub:`PJM WH Real Time Peak`,onPeakPrice:91.08,days:226},MISO:{hub:`Indiana Hub RT Peak`,onPeakPrice:92.31,days:46},"ISO-NE":{hub:`Nepool MH DA LMP Peak`,onPeakPrice:80.41,days:204}},markets:{ERCOT:{hub:`HB_NORTH`,atcPrice:34.8,negativeHourShare:.0072,hours:8734,period:`2025-10-26 to 2026-10-24`,solarCapture:.689,windCapture:.8859},CAISO:{hub:`TH_SP15_GEN-APND`,atcPrice:24.73,negativeHourShare:.1636,hours:648,period:`2025-10-26 to 2026-10-26`,solarCapture:.4333,windCapture:.9953},MISO:{hub:`INDIANA.HUB`,atcPrice:39.01,negativeHourShare:0,hours:648,period:`2025-10-26 to 2026-10-26`,solarCapture:.8705,windCapture:1.0077},SPP:{hub:`SPPSOUTH_HUB`,atcPrice:22.83,negativeHourShare:.1667,hours:648,period:`2025-10-26 to 2026-10-26`,solarCapture:1.6109,windCapture:.7264},NYISO:{hub:`CENTRL`,atcPrice:58.2,negativeHourShare:0,hours:648,period:`2025-10-26 to 2026-10-26`,windCapture:.9716},"ISO-NE":{hub:`.H.INTERNAL_HUB`,atcPrice:66.2,negativeHourShare:0,hours:648,period:`2025-10-26 to 2026-10-26`,solarCapture:.7481,windCapture:.9834}},window:{start:`2025-10-26`,end:`2026-10-25`,sampledEveryDays:14},generatedAt:`2026-10-29T21:02:44Z`,sources:[{id:`fred-inflation`,name:`Inflation expectations and CPI (FRED)`,url:`https://fred.stlouisfed.org/series/T10YIE`,status:`ok`},{id:`fred-rates`,name:`Treasury and corporate bond yields (FRED)`,url:`https://fred.stlouisfed.org/series/DGS10`,status:`ok`},{id:`damodaran`,name:`Cost of capital by industry (Damodaran, NYU Stern)`,url:`https://pages.stern.nyu.edu/~adamodar/`,status:`ok`},{id:`eia-capacity-factors`,name:`Fleet capacity factors (EIA Electric Power Monthly)`,url:`https://www.eia.gov/electricity/monthly/`,status:`ok`},{id:`eia-ice`,name:`On-peak hub prices (EIA wholesale market data)`,url:`https://www.eia.gov/electricity/wholesale/`,status:`ok`},{id:`nrel-pvwatts`,name:`Expected solar output by region (NREL PVWatts)`,url:`https://pvwatts.nrel.gov/`,status:`failed`,detail:`HTTPSConnectionPool(host='developer.nrel.gov', port=443): Max retries exceeded with url: /api/pvwatts/v8.json?api_key=DEMO_KEY&lat=31.99&lon=-102.08&system_capacity=1000&module_type=0&losses=14&array_type=2&tilt=0&azimuth=180&dc_ac_ratio=1.`},{id:`eia-930`,name:`Hourly solar and wind output by grid operator (EIA-930)`,url:`https://www.eia.gov/electricity/gridmonitor/`,status:`ok`},{id:`prices-ercot`,name:`Hourly day-ahead prices, ERCOT (HB_NORTH)`,url:``,status:`ok`},{id:`prices-caiso`,name:`Hourly day-ahead prices, CAISO (TH_SP15_GEN-APND)`,url:``,status:`ok`},{id:`prices-pjm`,name:`Hourly day-ahead prices, PJM (WESTERN HUB)`,url:``,status:`skipped`,detail:`skipped: set PJM_API_KEY (free from PJM Data Miner) to add hourly PJM prices`},{id:`prices-miso`,name:`Hourly day-ahead prices, MISO (INDIANA.HUB)`,url:``,status:`ok`},{id:`prices-spp`,name:`Hourly day-ahead prices, SPP (SPPSOUTH_HUB)`,url:``,status:`ok`},{id:`prices-nyiso`,name:`Hourly day-ahead prices, NYISO (CENTRL)`,url:``,status:`ok`},{id:`prices-iso-ne`,name:`Hourly day-ahead prices, ISO-NE (.H.INTERNAL_HUB)`,url:``,status:`ok`}]};function f(){return d}var p=e=>`${(e*100).toFixed(Math.abs(e)<.1?2:1).replace(/\.?0+$/,``)}%`,m=e=>e?e.slice(0,10):`n/a`;function h(e,t=d){let n={},r=t.markets?.[e.market];if(n.hasPriceData=!!r,t.inflation&&(n.expectedInflation=t.inflation.breakeven10y,n.escalationOverInflation=e.wholesaleEscalation-t.inflation.breakeven10y,n.recentInflation=t.inflation.cpiYoY,n.inflationPeak2022=t.inflation.cpiPeak2022),t.rates&&(n.treasury10y=t.rates.treasury10y,n.discountOverTreasury=e.discountRate-t.rates.treasury10y),t.costOfCapital&&(n.marketCostOfCapital=t.costOfCapital.totalMarket),r){n.marketHubPrice=r.atcPrice,r.atcPrice>0&&(n.hubPriceVsMarket=e.hubPrice/r.atcPrice),n.marketNegativeHourShare=r.negativeHourShare;let t=e.technology===`solar`?r.solarCapture:r.windCapture;t!==void 0&&(n.marketCaptureRate=t,n.captureRateVsMarket=e.captureRate-t)}n.expectedCaptureRate=n.marketCaptureRate??(e.technology===`solar`?.85:.9);let i=g(e,t);return i&&(n.expectedCapacityFactor=i.value,n.capacityFactorVsExpected=e.capacityFactor-i.value),n}function g(e,t){if(e.technology===`solar`){let n=t.solarSites?.[e.market];if(n)return{value:n.capacityFactorAC,label:`NREL PVWatts, single-axis tracker at a representative ${e.market} site`}}let n=t.capacityFactors;if(n)return{value:e.technology===`solar`?n.solar:n.wind,label:`US ${e.technology} fleet average, ${n.period} (EIA)`}}var _=(e,t)=>Math.round(e/t)*t;function v(e,t,n=d){if(!e.data)return e;let r=n.markets?.[t.market];switch(e.data){case`escalation`:{let t=n.inflation;if(!t)return e;let r=Math.min(.035,Math.max(.02,_(t.breakeven10y+.005,5e-4)));return{...e,value:r,label:`${p(r)}/yr: the ${p(t.breakeven10y)} inflation markets expect over 10 years (FRED, ${m(t.asOf)}) plus 0.5 points for load growth`}}case`hubPrice`:return r?{...e,value:r.atcPrice,label:`$${r.atcPrice.toFixed(2)}/MWh: average day-ahead price at ${r.hub}, ${r.period}`}:e;case`captureRate`:{let n=t.technology===`solar`?r?.solarCapture:r?.windCapture;return n===void 0||!r?e:{...e,value:n,label:`${p(n)}: what ${t.technology} output earned at ${r.hub} against the average price, ${r.period} (grid prices × EIA-930 output)`}}case`capacityFactor`:{let r=g(t,n);return r?{...e,value:r.value,label:`${p(r.value)}: ${r.label}`}:e}case`discountRate`:{let t=n.costOfCapital;return t?{...e,value:t.totalMarket,label:`${p(t.totalMarket)}: average US cost of capital (Damodaran, ${m(t.asOf)})`}:e}}return e}var y=8760;function b(e){let t=Math.max(1,Math.round(e.termYears)),n=e.capacityMW*y*e.capacityFactor,r=e.settlementPoint===`node`?e.basis:0,i=[],a=e.transactionCost,o=0,s=0,c=0;for(let l=1;l<=t;l++){let t=l-1,u=n*(1-e.degradation)**t,d=e.hubPrice*(1+e.wholesaleEscalation)**+t,f=d*e.captureRate+r,p=e.strikePrice*(1+e.strikeEscalation)**+t,m=(f-p)*u,h=e.recPrice*(1+e.recEscalation)**+t,g=Math.max(0,e.annualLoadMWh-u),_=Math.max(0,u-e.annualLoadMWh),v=-m+g*h,y=e.annualLoadMWh*h,b=1/(1+e.discountRate)**+l;i.push({year:l,generationMWh:u,hubPrice:d,settlementPrice:f,strikePrice:p,settlement:m,recPrice:h,topUpRecsMWh:g,excessRecsMWh:_,vppaCost:v,recCost:y,discountFactor:b}),a+=v*b,o+=y*b,s+=m,c+=m*b}let l=o-a;return{rows:i,npvVppaCost:a,npvRecCost:o,npvAdvantage:l,recommendation:l>0?`VPPA`:`RECs`,totalSettlement:s,npvSettlement:c}}function x(e,t,n){return{...e,[t]:n}}function S(e,t,n,r){let i=n=>b(x(e,t,n)).npvAdvantage,a=i(n),o=i(r);if(Number.isNaN(a)||Number.isNaN(o)||Math.sign(a)===Math.sign(o))return NaN;let s=n,c=r;for(let e=0;e<60;e++){let e=(s+c)/2,t=i(e);Math.sign(t)===Math.sign(a)?(s=e,a=t):c=e}return(s+c)/2}function ee(e){return S(e,`wholesaleEscalation`,-.05,.25)}function te(e){return S(e,`strikePrice`,0,300)}var C=[{key:`technology`,label:`Technology`,format:`text`,kind:`input`,help:`solar or wind`,options:[`solar`,`wind`],core:!0,source:`Term sheet`},{key:`market`,label:`Market`,format:`text`,kind:`input`,help:`ISO/RTO the project sits in`,options:[`ERCOT`,`PJM`,`MISO`,`SPP`,`CAISO`,`NYISO`,`ISO-NE`,`Other`],core:!0,source:`Term sheet (project location and settlement hub)`},{key:`capacityMW`,label:`Project size`,format:`mw`,kind:`input`,help:`Contracted capacity, MW AC`,range:[.1,5e3],core:!0,source:`Term sheet: contracted share, not the whole project`},{key:`capacityFactor`,label:`Capacity factor`,format:`pct`,kind:`input`,help:`Average output as a share of nameplate`,range:[.05,.7],core:!0,source:`Independent energy yield assessment (P50); developer estimates run high`},{key:`degradation`,label:`Output degradation`,format:`pct`,kind:`input`,help:`Annual loss of output`,range:[0,.05],source:`Energy yield assessment or module warranty`},{key:`termYears`,label:`Contract term`,format:`years`,kind:`input`,help:`VPPA length in years`,range:[1,35],core:!0,source:`Term sheet`},{key:`strikePrice`,label:`Strike price`,format:`perMWh`,kind:`input`,help:`Fixed VPPA price, year 1`,range:[1,300],core:!0,source:`Developer’s firm offer, dated; compare with the LevelTen P25 index`},{key:`strikeEscalation`,label:`Strike escalator`,format:`pct`,kind:`input`,help:`Annual increase in the strike price`,range:[-.05,.1],source:`Term sheet`},{key:`settlementPoint`,label:`Settlement point`,format:`text`,kind:`input`,help:`hub or node`,options:[`hub`,`node`],source:`Term sheet`},{key:`basis`,label:`Basis (node minus hub)`,format:`perMWh`,kind:`input`,help:`Applies only to node settlement`,range:[-100,100],source:`Node vs. hub price history from ISO data, weighted by the project’s output`},{key:`transactionCost`,label:`Transaction costs`,format:`usd`,kind:`input`,help:`One-time legal, advisory, and procurement costs`,range:[0,1e8],source:`Quotes from counsel and the procurement advisor`},{key:`hubPrice`,label:`Hub price, year 1`,format:`perMWh`,kind:`input`,help:`Around-the-clock wholesale price`,range:[1,500],core:!0,source:`Dated hub forward curve from a broker or the ISO; stale curves are common`},{key:`wholesaleEscalation`,label:`Wholesale price escalation`,format:`pct`,kind:`input`,help:`Annual growth in wholesale prices`,range:[-.05,.25],core:!0,source:`Advisor’s long-run fundamentals forecast; cross-check with EIA’s Annual Energy Outlook. A single year’s inflation is not a forecast`},{key:`captureRate`,label:`Capture rate`,format:`pct`,kind:`input`,help:`Project's generation-weighted price as a share of the around-the-clock price`,range:[-1.5,2.5],source:`Shape or capture study for the project’s location`},{key:`annualLoadMWh`,label:`Annual load`,format:`mwh`,kind:`input`,help:`Electricity use to be matched with RECs`,range:[1,1e9],core:!0,source:`Utility bills or the energy management system, for the sites the claim covers`},{key:`recPrice`,label:`REC price, year 1`,format:`perMWh`,kind:`input`,help:`Unbundled REC price`,range:[0,100],core:!0,source:`Broker quote for the exact product and vintage (national voluntary vs. state compliance)`},{key:`recEscalation`,label:`REC price escalation`,format:`pct`,kind:`input`,help:`Annual growth in REC prices`,range:[-.2,.5],source:`Broker view; voluntary REC prices have no steady trend`},{key:`discountRate`,label:`Discount rate`,format:`pct`,kind:`input`,help:`Rate used to discount future costs`,range:[0,.3],core:!0,source:`Treasury or finance (the company’s cost of capital)`},{key:`accountingReviewed`,label:`Derivative accounting reviewed`,format:`bool`,kind:`input`,help:`ASC 815 / IFRS 9 treatment confirmed`,source:`Controller’s group`},{key:`creditSupportReviewed`,label:`Credit support reviewed`,format:`bool`,kind:`input`,help:`Collateral or guarantee requirements known`,source:`Treasury and the term sheet`},{key:`negativePriceTermsReviewed`,label:`Negative-price terms reviewed`,format:`bool`,kind:`input`,help:`Floor or curtailment clause checked`,source:`The contract, reviewed by counsel`},{key:`marketBoundaryConfirmed`,label:`REC market boundary confirmed`,format:`bool`,kind:`input`,help:`RECs come from the same market as the load`,source:`REC tracking system records (e.g. M-RETS, PJM-GATS, ERCOT)`},{key:`scope2RevisionConsidered`,label:`Scope 2 revision considered`,format:`bool`,kind:`input`,help:`GHG Protocol Scope 2 proposals reviewed`,source:`Sustainability reporting lead`},{key:`year1GenerationMWh`,label:`Year-1 generation`,format:`mwh`,kind:`derived`,help:`Size x 8,760 h x capacity factor`},{key:`coverageRatio`,label:`Load covered by the project`,format:`pct`,kind:`derived`,help:`Year-1 generation / annual load`},{key:`year1SettlementPrice`,label:`Project market value, year 1`,format:`perMWh`,kind:`derived`,help:`Hub price x capture rate (+ basis at a node)`},{key:`year1SpreadToStrike`,label:`Year-1 market value minus strike`,format:`perMWh`,kind:`derived`,help:`Negative means the buyer pays in year 1`},{key:`finalYearHubPrice`,label:`Hub price in final year`,format:`perMWh`,kind:`derived`,help:`Year-1 hub price compounded over the term`},{key:`hubPriceMultiple`,label:`Final-year hub price vs. today`,format:`multiple`,kind:`derived`,help:`How many times today’s price the model assumes by the last year`},{key:`escalationMinusDiscount`,label:`Escalation minus discount rate`,format:`pct`,kind:`derived`,help:`Positive means distant years weigh as much as near ones`},{key:`npvAdvantage`,label:`VPPA advantage (NPV)`,format:`usd`,kind:`derived`,help:`REC strategy cost minus VPPA cost; positive favors the VPPA`},{key:`recommendsVppa`,label:`Result favors the VPPA`,format:`bool`,kind:`derived`,help:`true when the VPPA costs less`},{key:`breakEvenEscalation`,label:`Break-even escalation`,format:`pct`,kind:`derived`,help:`Escalation at which both options cost the same`},{key:`escalationCushion`,label:`Distance to break-even escalation`,format:`pct`,kind:`derived`,help:`Absolute gap between assumed and break-even escalation`},{key:`breakEvenStrike`,label:`Break-even strike price`,format:`perMWh`,kind:`derived`,help:`Strike at which both options cost the same`},{key:`lateValueShare`,label:`VPPA upside after year 10`,format:`pct`,kind:`derived`,help:`Share of discounted positive settlements that arrive after year 10`},{key:`firstPositiveYear`,label:`First year the VPPA pays out`,format:`year`,kind:`derived`,help:`0 when it never does`},{key:`expectedInflation`,label:`Inflation markets expect (10 yr)`,format:`pct`,kind:`derived`,help:`10-year breakeven inflation, FRED`},{key:`escalationOverInflation`,label:`Escalation above expected inflation`,format:`pct`,kind:`derived`,help:`Assumed wholesale escalation minus expected inflation`},{key:`recentInflation`,label:`Inflation, last 12 months`,format:`pct`,kind:`derived`,help:`CPI, FRED`},{key:`inflationPeak2022`,label:`Inflation peak in 2022`,format:`pct`,kind:`derived`,help:`Highest 12-month CPI change in 2022, FRED`},{key:`treasury10y`,label:`10-year Treasury yield`,format:`pct`,kind:`derived`,help:`Risk-free rate, FRED`},{key:`discountOverTreasury`,label:`Discount rate above Treasuries`,format:`pct`,kind:`derived`,help:`Discount rate minus the 10-year Treasury yield`},{key:`marketCostOfCapital`,label:`Average US cost of capital`,format:`pct`,kind:`derived`,help:`Damodaran, all US companies`},{key:`hasPriceData`,label:`Market price data available`,format:`bool`,kind:`derived`,help:`Hourly hub prices were fetched for this market`},{key:`marketHubPrice`,label:`Market average price, past year`,format:`perMWh`,kind:`derived`,help:`Average day-ahead price at the market’s main hub`},{key:`hubPriceVsMarket`,label:`Hub price vs. past year`,format:`multiple`,kind:`derived`,help:`Assumed year-1 hub price divided by the past year’s average`},{key:`marketNegativeHourShare`,label:`Hours with negative prices`,format:`pct`,kind:`derived`,help:`Share of day-ahead hours below $0 at the hub, past year`},{key:`marketCaptureRate`,label:`Capture rate in this market`,format:`pct`,kind:`derived`,help:`What solar or wind output earned vs. the average price, past year`},{key:`expectedCaptureRate`,label:`Expected capture rate`,format:`pct`,kind:`derived`,help:`Measured in this market when available; otherwise a planning default (solar 85%, wind 90%)`},{key:`captureRateVsMarket`,label:`Capture rate above market`,format:`pct`,kind:`derived`,help:`Assumed capture rate minus what the market delivered`},{key:`expectedCapacityFactor`,label:`Expected capacity factor`,format:`pct`,kind:`derived`,help:`NREL PVWatts for the region (solar) or the US fleet average (EIA)`},{key:`capacityFactorVsExpected`,label:`Capacity factor above expected`,format:`pct`,kind:`derived`,help:`Assumed capacity factor minus the expected one`}],w=Object.fromEntries(C.map(e=>[e.key,e]));function T(e,t=b(e)){let n={...e.diligence};for(let[t,r]of Object.entries(e))typeof r!=`object`&&(n[t]=r);let r=t.rows,i=r[0],a=r[r.length-1],o=0,s=0,c=0;for(let e of r)if(e.settlement>0){let t=e.settlement*e.discountFactor;o+=t,e.year>10&&(s+=t),c||=e.year}let l=ee(e);return{...n,year1GenerationMWh:i.generationMWh,coverageRatio:e.annualLoadMWh>0?i.generationMWh/e.annualLoadMWh:0,year1SettlementPrice:i.settlementPrice,year1SpreadToStrike:i.settlementPrice-i.strikePrice,finalYearHubPrice:a.hubPrice,hubPriceMultiple:e.hubPrice>0?a.hubPrice/e.hubPrice:0,escalationMinusDiscount:e.wholesaleEscalation-e.discountRate,npvAdvantage:t.npvAdvantage,recommendsVppa:t.recommendation===`VPPA`,breakEvenEscalation:l,escalationCushion:Math.abs(e.wholesaleEscalation-l),breakEvenStrike:te(e),lateValueShare:o>0?s/o:0,firstPositiveYear:c,...h(e)}}function ne(e){let t=[];for(let n of C){if(n.kind!==`input`||!n.range)continue;let r=e[n.key];if(typeof r!=`number`)continue;let[i,a]=n.range;(!Number.isFinite(r)||r<i||r>a)&&t.push({key:n.key,value:r,range:n.range,message:`${n.label} must be between ${E(n.format,i)} and ${E(n.format,a)}.`})}return t}function E(e,t){return e===`pct`?`${Math.round(t*1e3)/10}%`:e===`perMWh`?`$${t}/MWh`:e===`usd`?`$${t.toLocaleString(`en-US`)}`:t.toLocaleString(`en-US`)}function D(e,t={}){if(!Number.isFinite(e))return`—`;let n=e<0?`−`:t.sign&&e>0?`+`:``,r=Math.abs(e),i;return i=r>=1e9?`$${(r/1e9).toFixed(2)}B`:r>=1e6?`$${(r/1e6).toFixed(r>=1e8?0:r>=1e7?1:2)}M`:r>=1e3?`$${(r/1e3).toFixed(r>=1e5?0:1)}K`:`$${r.toFixed(0)}`,n+i}function O(e,t){if(!Number.isFinite(e))return`—`;let n=e*100,r=t??(Math.abs(n)<10&&Math.round(n*100)%100!=0?2:1);return`${ie(n.toFixed(r))}%`}function k(e){return Number.isFinite(e)?`${e<0?`−`:``}$${Math.abs(e).toFixed(2)}/MWh`:`—`}function re(e,t=0){return Number.isFinite(e)?e.toLocaleString(`en-US`,{maximumFractionDigits:t,minimumFractionDigits:0}):`—`}function ie(e){return e.includes(`.`)?e.replace(/\.?0+$/,``):e}function ae(e,t){if(e===void 0)return`—`;if(typeof e==`boolean`)return e?`yes`:`no`;if(typeof e==`string`)return e;switch(t){case`pct`:return O(e);case`usd`:return D(e);case`perMWh`:return k(e);case`mwh`:return`${re(e)} MWh`;case`mw`:return`${re(e,1)} MW`;case`years`:return`${re(e)} years`;case`year`:return e?`year ${re(e)}`:`never`;case`multiple`:return`${e.toFixed(2)}×`;default:return re(e,2)}}function A(e,t){return ae(t,w[e]?.format??`text`)}function oe(e,t){return e.replace(/\{(\w+)\}/g,(e,n)=>n in t?A(n,t[n]):e)}var se={">":`is above`,">=":`is at least`,"<":`is below`,"<=":`is at most`,"==":`is`,"!=":`is not`,outside:`is outside`,between:`is between`};function ce(e){let t=w[e.fact],n=t?.label??e.fact,r=t?.format??`text`,i=Array.isArray(e.value)?`${ae(e.value[0],r)} ${e.op===`between`?`and`:`to`} ${ae(e.value[1],r)}`:ae(e.value,r);return`${n} ${se[e.op]??e.op} ${i}`}function le(e,t){return t===`pct`?de(e*100,6):e}function ue(e,t){return t===`pct`?de(e/100,8):e}function de(e,t){let n=10**t;return Math.round(e*n)/n}var fe=[{id:`MKT-ESC-HIGH`,title:`Wholesale price escalation far above long-run norms`,category:`Market prices`,severity:`critical`,when:[{fact:`wholesaleEscalation`,op:`>`,value:.04}],message:`Wholesale prices are assumed to rise {wholesaleEscalation} a year. Compounded over {termYears}, that puts the hub price at {finalYearHubPrice} in the final year, {hubPriceMultiple} today’s level.`,why:`PPA models typically escalate wholesale prices 2.5–3% a year, roughly long-run inflation, because long-range forecasts show flat real power prices. A rate like 7.5% looks like one high-inflation year applied to the whole term. Higher escalation raises every future VPPA settlement, so it makes the VPPA look better than it is. Load growth from data centers has lifted near-term prices in some markets (PJM, for example). That can support a higher rate for the first few years, not for the full term.`,ask:`What is the source for this escalation rate, and why should it hold for every year of the contract?`,benchmark:{input:`wholesaleEscalation`,value:.0275,label:`2.75%/yr, the midpoint of the typical 2.5–3% range`,data:`escalation`},source:`Typical PPA modeling range; Federal Reserve 2% inflation target; EIA Annual Energy Outlook (roughly flat real wholesale prices)`,origin:`built-in`,lesson:`Added after a reviewer caught a VPPA vs. REC model that used 7.5%/yr wholesale price inflation for the whole term. It made the VPPA look favorable when it was not.`},{id:`MKT-ESC-ELEVATED`,title:`Wholesale price escalation at the high end`,category:`Market prices`,severity:`warning`,when:[{fact:`wholesaleEscalation`,op:`between`,value:[.0351,.04]}],message:`Wholesale prices rise {wholesaleEscalation} a year, above the typical 2.5–3% range.`,why:`Small differences in escalation compound over a long contract. Half a point above the norm can decide a close comparison.`,ask:`What market view supports escalation above 3.5% a year?`,benchmark:{input:`wholesaleEscalation`,value:.0275,label:`2.75%/yr`,data:`escalation`},source:`Typical PPA modeling range`,origin:`built-in`},{id:`MKT-ESC-VS-INFLATION`,title:`Escalation well above expected inflation`,category:`Market prices`,severity:`warning`,when:[{fact:`escalationOverInflation`,op:`>`,value:.01},{fact:`wholesaleEscalation`,op:`<`,value:.0351}],message:`Wholesale prices rise {wholesaleEscalation} a year, more than a point above the {expectedInflation} inflation bond markets expect over the next decade.`,why:`Long-run power prices tend to track general inflation. Assuming they outrun it every year for the whole term is a forecast that needs its own support.`,ask:`What makes power prices rise faster than inflation for the entire term?`,benchmark:{input:`wholesaleEscalation`,value:.0275,label:`2.75%/yr`,data:`escalation`},source:`FRED 10-year breakeven inflation (T10YIE), refreshed weekly`,origin:`built-in`},{id:`MKT-ESC-VS-DISCOUNT`,title:`Prices grow as fast as the discount rate`,category:`Market prices`,severity:`warning`,when:[{fact:`escalationMinusDiscount`,op:`>=`,value:0}],message:`Wholesale prices grow {wholesaleEscalation} a year, at or above the {discountRate} discount rate. The final years count as much as the first.`,why:`When escalation matches or beats the discount rate, distant settlements are not discounted away. The answer then rests on price forecasts 10 or more years out, which are the least reliable part of the model.`,ask:`Is the discount rate the company’s real cost of capital, and is escalation in the same nominal or real terms?`,source:`Basic discounting consistency`,origin:`built-in`},{id:`MKT-CAPTURE-SOLAR`,title:`Solar valued at the full around-the-clock price`,category:`Market prices`,severity:`warning`,when:[{fact:`technology`,op:`==`,value:`solar`},{fact:`captureRate`,op:`>=`,value:.98},{fact:`expectedCaptureRate`,op:`<`,value:.95}],message:`Solar output is valued at {captureRate} of the around-the-clock hub price; expect about {expectedCaptureRate} here.`,why:`Solar produces in midday hours, when prices are lowest, and the discount deepens as more solar is built. CAISO solar captured about 72% of the average price in 2021 and went negative in spring 2026. Pricing solar at 100% overstates the VPPA’s settlements every year.`,ask:`Is there a shape or capture-rate analysis for this project’s location?`,benchmark:{input:`captureRate`,value:.85,label:`85% (planning placeholder; replace with a market-specific shape study)`,data:`captureRate`},source:`Modo Energy, CAISO solar capture (spring 2026); Enverus; IER analysis of CAISO 2021`,origin:`built-in`},{id:`MKT-CAPTURE-VS-MARKET`,title:`Capture rate above what the market delivered`,category:`Market prices`,severity:`warning`,when:[{fact:`captureRateVsMarket`,op:`>`,value:.1},{fact:`captureRate`,op:`<`,value:.98}],message:`A {captureRate} capture rate is well above the {marketCaptureRate} that {technology} output actually earned in this market over the past year.`,why:`Capture rates move with how much solar and wind a market already has. Last year’s market-wide figure is the best public starting point; a project-specific shape study can justify a different number.`,ask:`What shape or capture study supports a higher capture rate than the market delivered?`,benchmark:{input:`captureRate`,value:.85,label:`market capture rate`,data:`captureRate`},source:`Grid operator day-ahead hub prices × EIA-930 hourly output, refreshed weekly`,origin:`built-in`},{id:`MKT-CAPTURE-WIND`,title:`Wind valued at the full around-the-clock price`,category:`Market prices`,severity:`info`,when:[{fact:`technology`,op:`==`,value:`wind`},{fact:`captureRate`,op:`>=`,value:.98},{fact:`expectedCaptureRate`,op:`<`,value:.95}],message:`Wind output is valued at {captureRate} of the around-the-clock hub price; expect about {expectedCaptureRate} here.`,why:`Wind often blows hardest at night and in shoulder seasons, when prices are lower, so its capture rate is usually below 100%.`,ask:`Is there a shape analysis for this wind project?`,benchmark:{input:`captureRate`,value:.9,label:`90% (placeholder)`,data:`captureRate`},source:`General market practice`,origin:`built-in`},{id:`MKT-NODE-BASIS`,title:`Node settlement with no basis`,category:`Market prices`,severity:`warning`,when:[{fact:`settlementPoint`,op:`==`,value:`node`},{fact:`basis`,op:`==`,value:0}],message:`The VPPA settles at the project node, but the model assumes the node price equals the hub price.`,why:`Nodes with a lot of renewable output often price below the hub when output is high, because of congestion. With node settlement the buyer carries that basis risk.`,ask:`What does the node’s price history show against the hub?`,benchmark:{input:`basis`,value:-3,label:`−$3/MWh (placeholder; use the node’s history)`},source:`General market practice`,origin:`built-in`},{id:`MKT-HUB-RANGE`,title:`Year-1 hub price outside recent ranges`,category:`Market prices`,severity:`info`,when:[{fact:`hubPrice`,op:`outside`,value:[20,100]}],message:`A year-1 hub price of {hubPrice} is outside the $20–$100/MWh band most US hubs have traded in recently.`,why:`The starting price sets the level for every year that follows. An old or mislabeled forward curve shifts the whole result.`,ask:`Which forward curve is this from, and what date?`,source:`General market practice`,origin:`built-in`},{id:`MKT-HUB-VS-MARKET`,title:`Year-1 hub price far from the past year`,category:`Market prices`,severity:`warning`,when:[{fact:`hubPriceVsMarket`,op:`outside`,value:[.8,1.25]}],message:`A year-1 hub price of {hubPrice} is {hubPriceVsMarket} the {marketHubPrice} average day-ahead price at this market’s main hub over the past year.`,why:`Next year’s prices can differ from last year’s, but a gap of more than 20–25% usually means an old curve, an on-peak price used as an around-the-clock one, or the wrong hub.`,ask:`Which forward curve and hub is this price from, and is it around-the-clock or on-peak?`,benchmark:{input:`hubPrice`,value:45,label:`past-year average`,data:`hubPrice`,auto:!1},source:`Grid operator day-ahead hub prices, refreshed weekly`,origin:`built-in`},{id:`PRJ-CF-SOLAR`,title:`Solar capacity factor outside the usual range`,category:`Project output`,severity:`warning`,when:[{fact:`technology`,op:`==`,value:`solar`},{fact:`capacityFactor`,op:`outside`,value:[.15,.33]}],message:`A {capacityFactor} capacity factor is outside the 15–33% range for utility-scale solar.`,why:`US utility-scale solar averages about 24%. Single-axis trackers in the Southwest reach the low 30s.`,ask:`Is this from an independent energy yield assessment (P50)?`,benchmark:{input:`capacityFactor`,value:.24,label:`24%, the US utility-scale average`,data:`capacityFactor`},source:`EIA Electric Power Monthly, capacity factors for utility-scale solar`,origin:`built-in`},{id:`PRJ-CF-WIND`,title:`Wind capacity factor outside the usual range`,category:`Project output`,severity:`warning`,when:[{fact:`technology`,op:`==`,value:`wind`},{fact:`capacityFactor`,op:`outside`,value:[.25,.5]}],message:`A {capacityFactor} capacity factor is outside the 25–50% range for US wind.`,why:`The US wind fleet averages roughly 35%; newer projects in strong wind regions reach the mid-40s.`,ask:`Is this from an independent energy yield assessment (P50)?`,benchmark:{input:`capacityFactor`,value:.36,label:`36%`,data:`capacityFactor`},source:`EIA Electric Power Monthly; LBNL Land-Based Wind Market Report`,origin:`built-in`},{id:`PRJ-CF-VS-EXPECTED`,title:`Capacity factor above what is expected here`,category:`Project output`,severity:`warning`,when:[{fact:`capacityFactorVsExpected`,op:`>`,value:.04}],message:`A {capacityFactor} capacity factor is more than 4 points above the {expectedCapacityFactor} expected for {technology} in this market.`,why:`Higher output means more MWh settling against the strike every year. Developer estimates often run high; an independent P50 assessment is the reliable number.`,ask:`Is this from an independent energy yield assessment (P50)?`,benchmark:{input:`capacityFactor`,value:.24,label:`expected capacity factor`,data:`capacityFactor`},source:`NREL PVWatts for the region (solar); EIA fleet average (wind); refreshed weekly`,origin:`built-in`},{id:`PRJ-NO-DEGRADATION`,title:`No output degradation`,category:`Project output`,severity:`warning`,when:[{fact:`degradation`,op:`<=`,value:0}],message:`The project produces the same amount every year for {termYears}.`,why:`Solar panels lose about 0.5% of output a year, and wind turbine output also declines with age. Ignoring this overstates generation and settlements in later years.`,ask:`What degradation rate does the developer’s yield assessment use?`,benchmark:{input:`degradation`,value:.005,label:`0.5%/yr`},source:`NREL photovoltaic degradation studies; LBNL wind performance studies`,origin:`built-in`},{id:`PRJ-OVERSIZED`,title:`Project larger than the load`,category:`Project output`,severity:`warning`,when:[{fact:`coverageRatio`,op:`>`,value:1.1}],message:`The project generates {coverageRatio} of annual load.`,why:`Surplus RECs have no value in this comparison unless you can resell them, and you carry price risk on volume you do not use.`,ask:`Is there a plan for the surplus RECs, or should the contracted share be smaller?`,source:`General procurement practice`,origin:`built-in`},{id:`CTR-STRIKE-SOLAR`,title:`Solar strike price far from current offers`,category:`Contract terms`,severity:`info`,when:[{fact:`technology`,op:`==`,value:`solar`},{fact:`strikePrice`,op:`outside`,value:[45,85]}],message:`A {strikePrice} strike is far from current North American solar offers (about $61–65/MWh in 2026).`,why:`A strike well below the market makes the VPPA look cheap; one well above it may signal a stale quote.`,ask:`Is this a firm offer, and from when?`,benchmark:{input:`strikePrice`,value:63,label:`$63/MWh, LevelTen P25 solar index, 2026`},source:`LevelTen Energy PPA Price Index, North America, Q1–Q3 2026`,origin:`built-in`},{id:`CTR-STRIKE-WIND`,title:`Wind strike price far from current offers`,category:`Contract terms`,severity:`info`,when:[{fact:`technology`,op:`==`,value:`wind`},{fact:`strikePrice`,op:`outside`,value:[55,100]}],message:`A {strikePrice} strike is far from current North American wind offers (about $68–80/MWh in 2026).`,why:`A strike well below the market makes the VPPA look cheap; one well above it may signal a stale quote.`,ask:`Is this a firm offer, and from when?`,benchmark:{input:`strikePrice`,value:72,label:`$72/MWh, LevelTen P25 wind index, 2026`},source:`LevelTen Energy PPA Price Index, North America, 2026`,origin:`built-in`},{id:`CTR-TERM`,title:`Unusual contract length`,category:`Contract terms`,severity:`info`,when:[{fact:`termYears`,op:`outside`,value:[8,20]}],message:`A {termYears} term is outside the usual 10–20 years for a VPPA.`,why:`Longer terms lean harder on long-range price forecasts; shorter ones are hard to get financed.`,source:`General market practice`,origin:`built-in`},{id:`CTR-NO-TXN-COST`,title:`No transaction costs`,category:`Contract terms`,severity:`info`,when:[{fact:`transactionCost`,op:`<=`,value:0}],message:`The VPPA carries no legal, advisory, or procurement costs.`,why:`Negotiating a VPPA usually involves outside counsel and an advisor. Buying unbundled RECs costs little to set up.`,ask:`What will counsel and the advisor charge for this deal?`,benchmark:{input:`transactionCost`,value:35e4,label:`$350K (placeholder)`},source:`General market practice`,origin:`built-in`},{id:`CTR-NEGATIVE-PRICES`,title:`Negative-price terms not reviewed`,category:`Contract terms`,severity:`warning`,when:[{fact:`negativePriceTermsReviewed`,op:`==`,value:!1},{fact:`hasPriceData`,op:`==`,value:!1}],message:`Nobody has confirmed how the VPPA settles when prices go negative.`,why:`In markets with frequent negative prices (ERCOT, SPP, CAISO), a VPPA with no price floor or curtailment clause can make the buyer pay the strike plus the negative price. This model uses annual averages and cannot show that cost.`,ask:`Does the contract include a floor at $0 or a curtailment right during negative prices?`,source:`General market practice`,origin:`built-in`},{id:`CTR-NEGATIVE-PRICES-FREQUENT`,title:`Frequent negative prices, terms not reviewed`,category:`Contract terms`,severity:`warning`,when:[{fact:`marketNegativeHourShare`,op:`>`,value:.02},{fact:`negativePriceTermsReviewed`,op:`==`,value:!1}],message:`Day-ahead prices at this market’s hub were negative in {marketNegativeHourShare} of hours over the past year, and nobody has confirmed how the VPPA settles then.`,why:`In those hours a VPPA with no price floor makes the buyer pay the strike plus the negative price. This model uses annual averages and cannot show that cost.`,ask:`Does the contract include a floor at $0 or a curtailment right during negative prices?`,source:`Grid operator day-ahead hub prices, refreshed weekly`,origin:`built-in`},{id:`FIN-DISCOUNT`,title:`Discount rate outside the usual corporate range`,category:`Finance & RECs`,severity:`warning`,when:[{fact:`discountRate`,op:`outside`,value:[.05,.12]}],message:`A {discountRate} discount rate is outside the 5–12% range typical for corporate cost of capital.`,why:`A low rate inflates the weight of distant years, where VPPA value usually sits.`,ask:`Did finance supply this rate?`,benchmark:{input:`discountRate`,value:.08,label:`8%`,data:`discountRate`},source:`General corporate finance practice`,origin:`built-in`},{id:`FIN-DISCOUNT-BELOW-TREASURY`,title:`Discount rate below the risk-free rate`,category:`Finance & RECs`,severity:`warning`,when:[{fact:`discountOverTreasury`,op:`<`,value:0}],message:`A {discountRate} discount rate is below the {treasury10y} yield on 10-year US Treasuries.`,why:`A company’s cost of capital is almost always above the risk-free rate. Discounting below it overweights distant years, where VPPA value usually sits.`,ask:`Did finance supply this rate, and is it current?`,benchmark:{input:`discountRate`,value:.08,label:`8%`,data:`discountRate`},source:`FRED 10-year Treasury yield (DGS10); Damodaran cost of capital; refreshed weekly`,origin:`built-in`},{id:`FIN-REC-COMPLIANCE-PRICE`,title:`REC price looks like a compliance-market price`,category:`Finance & RECs`,severity:`warning`,when:[{fact:`recPrice`,op:`>`,value:15}],message:`A REC price of {recPrice} is far above national voluntary RECs.`,why:`National voluntary wind RECs traded around $4–5/MWh for 2025 vintage. Prices above $15 look like state compliance RECs (New York Tier 1 sells for about $24–41/MWh). A high REC price makes the REC strategy look expensive and flatters the VPPA, which brings its own RECs.`,ask:`Which REC product and vintage is this price for?`,benchmark:{input:`recPrice`,value:5,label:`$5/MWh, national voluntary`},source:`S&P Global Platts assessments (2025); NYSERDA Tier 1 2026 pre-sale`,origin:`built-in`},{id:`FIN-REC-STALE-PRICE`,title:`REC price below recent levels`,category:`Finance & RECs`,severity:`info`,when:[{fact:`recPrice`,op:`<`,value:1}],message:`A REC price of {recPrice} matches pre-2020 levels.`,why:`Voluntary REC prices sat under $1/MWh through 2019, then rose. An old quote understates the REC strategy’s cost.`,benchmark:{input:`recPrice`,value:4.5,label:`$4.50/MWh, national voluntary wind, 2025 vintage`},source:`US EPA Landfill Methane Outreach Program; S&P Global Platts`,origin:`built-in`},{id:`FIN-REC-ESCALATION`,title:`REC prices assumed to climb quickly`,category:`Finance & RECs`,severity:`warning`,when:[{fact:`recEscalation`,op:`>`,value:.05}],message:`REC prices are assumed to rise {recEscalation} a year.`,why:`Voluntary REC prices have been low and volatile without a steady upward trend. Fast REC escalation inflates the REC strategy’s cost.`,ask:`What supports a steady rise in REC prices?`,benchmark:{input:`recEscalation`,value:.02,label:`2%/yr`},source:`General market practice`,origin:`built-in`},{id:`RES-LATE-VALUE`,title:`Most of the VPPA’s value arrives late`,category:`Result robustness`,severity:`warning`,when:[{fact:`lateValueShare`,op:`>`,value:.6}],message:`{lateValueShare} of the VPPA’s discounted upside arrives after year 10. It first pays out in {firstPositiveYear}.`,why:`Value that depends on prices a decade away is the least certain part of any forecast.`,ask:`How does the result look if prices stop rising after year 10?`,source:`Forecast uncertainty grows with time`,origin:`built-in`},{id:`RES-THIN-CUSHION`,title:`The answer flips with a small change in escalation`,category:`Result robustness`,severity:`warning`,when:[{fact:`escalationCushion`,op:`<`,value:.01}],message:`The two options cost the same at {breakEvenEscalation} escalation, within one point of the assumed {wholesaleEscalation}.`,why:`When a one-point change in a forecast flips the decision, the decision is a bet on that forecast.`,source:`Sensitivity analysis`,origin:`built-in`},{id:`ACC-DERIVATIVE`,title:`Derivative accounting not reviewed`,category:`Claims & accounting`,severity:`warning`,when:[{fact:`accountingReviewed`,op:`==`,value:!1}],message:`Accounting has not confirmed how the VPPA will be reported.`,why:`A VPPA can meet the definition of a derivative under ASC 815 (or IFRS 9). Mark-to-market treatment puts quarterly swings in reported earnings, which this cost comparison does not show.`,ask:`Has the controller’s group assessed ASC 815 treatment?`,source:`FASB ASC 815; IFRS 9`,origin:`built-in`},{id:`ACC-CREDIT`,title:`Credit support not reviewed`,category:`Claims & accounting`,severity:`info`,when:[{fact:`creditSupportReviewed`,op:`==`,value:!1}],message:`Collateral or guarantee requirements are not in the analysis.`,why:`Developers often require a parent guarantee or letter of credit. Collateral has a cost and uses credit capacity.`,ask:`What credit support will the developer require?`,source:`General market practice`,origin:`built-in`},{id:`CLM-MARKET-BOUNDARY`,title:`REC market boundary not confirmed`,category:`Claims & accounting`,severity:`warning`,when:[{fact:`marketBoundaryConfirmed`,op:`==`,value:!1}],message:`Nobody has confirmed that the RECs come from the same market as the load.`,why:`Under RE100 criteria and the GHG Protocol Scope 2 quality criteria, RECs must come from the same market as the electricity use they cover. The US and Canada count as one market.`,ask:`Where are the RECs generated, and where is the load?`,source:`RE100 technical criteria; GHG Protocol Scope 2 Guidance (2015)`,origin:`built-in`},{id:`CLM-SCOPE2-REVISION`,title:`Scope 2 revision not considered`,category:`Claims & accounting`,severity:`info`,when:[{fact:`scope2RevisionConsidered`,op:`==`,value:!1}],message:`The analysis does not consider the GHG Protocol’s Scope 2 revision.`,why:`The GHG Protocol is revising Scope 2. Proposals include hourly matching, deliverability, and incrementality, possibly as a stricter method alongside today’s rules. Annual unbundled RECs from outside your grid region would likely count for less. Nothing is final as of 2026; check the current status.`,ask:`How would each option count if hourly matching and deliverability are adopted?`,source:`GHG Protocol Scope 2 public consultation (Oct 2025–Jan 2026) and 2026 consultation summaries`,origin:`built-in`}],pe=[`ERCOT`,`PJM`,`MISO`,`SPP`,`CAISO`,`NYISO`,`ISO-NE`,`Other`],me=[`critical`,`warning`,`info`],he=[`Market prices`,`Project output`,`Contract terms`,`Finance & RECs`,`Result robustness`,`Claims & accounting`],ge=[`>`,`>=`,`<`,`<=`,`==`,`!=`,`outside`,`between`],_e=1e-9;function ve(e,t){let n=t[e.fact];if(n===void 0)return!1;if(e.op===`outside`||e.op===`between`){if(typeof n!=`number`||!Array.isArray(e.value)||Number.isNaN(n))return!1;let[t,r]=e.value,i=n>=t-_e&&n<=r+_e;return e.op===`between`?i:!i}let r=e.value;if(Array.isArray(r))return!1;if(typeof n==`number`){let t=typeof r==`number`?r:Number(r);if(Number.isNaN(n)||Number.isNaN(t))return!1;switch(e.op){case`>`:return n>t+_e;case`>=`:return n>=t-_e;case`<`:return n<t-_e;case`<=`:return n<=t+_e;case`==`:return Math.abs(n-t)<=_e;case`!=`:return Math.abs(n-t)>_e}}let i=String(n)===String(r);return e.op===`==`?i:e.op===`!=`&&!i}function ye(e,t){return e.when.length>0&&e.when.every(e=>ve(e,t))}var j={critical:0,warning:1,info:2};function M(e){return e.severity!==`info`}function be(e){return[...fe.map(t=>e.edits[t.id]??t),...e.custom]}function xe(e){let t=new Set(e.disabled);return be(e).filter(e=>!t.has(e.id))}function Se(e,t,n=b(e)){let r=T(e,n),i=[];for(let a of t){if(!ye(a,r))continue;let t=a.benchmark?{...a,benchmark:v(a.benchmark,e)}:a,o={rule:t,message:oe(t.message,r)};if(t.benchmark){let r=b(x(e,t.benchmark.input,t.benchmark.value));o.impact={benchmark:t.benchmark,advantageAfter:r.npvAdvantage,delta:r.npvAdvantage-n.npvAdvantage,flips:r.recommendation!==n.recommendation}}i.push(o)}return i.sort((e,t)=>j[e.rule.severity]-j[t.rule.severity]||Math.abs(t.impact?.delta??0)-Math.abs(e.impact?.delta??0))}function Ce(e){let t=new Set(e.map(e=>e.id)),n=e.filter(e=>e.origin===`team`).length+1;for(;t.has(`TEAM-${String(n).padStart(2,`0`)}`);)n++;return`TEAM-${String(n).padStart(2,`0`)}`}function we(e,t){if(!e||typeof e!=`object`)return null;let n=e;if(typeof n.id!=`string`||typeof n.title!=`string`||!Array.isArray(n.when))return null;let r=n.when.filter(e=>!!e&&typeof e==`object`&&typeof e.fact==`string`&&ge.includes(e.op));return r.length?{...n,id:n.id,title:n.title,when:r,severity:me.includes(n.severity)?n.severity:`warning`,category:he.includes(n.category)?n.category:`Result robustness`,message:typeof n.message==`string`&&n.message?n.message:`${n.title}.`,why:typeof n.why==`string`?n.why:``,origin:t}:null}function N(e){let t=Array.isArray(e)?{rules:e}:e??{},n=new Set(fe.map(e=>e.id)),r=(Array.isArray(t.custom)?t.custom:Array.isArray(t.rules)?t.rules:[]).map(e=>we(e,`team`)).filter(e=>e!==null&&!n.has(e.id)),i={};if(t.edits&&typeof t.edits==`object`)for(let[e,r]of Object.entries(t.edits)){let t=we(r,`built-in`);t&&n.has(e)&&t.id===e&&(i[e]=t)}let a=Array.isArray(t.disabled)?t.disabled.filter(e=>typeof e==`string`):[];if(!r.length&&!Object.keys(i).length&&!a.length)throw Error(`No checks found.`);return{custom:r,edits:i,disabled:a}}function Te(e,t){return{app:`ppa-preflight`,version:2,exportedOn:t,...e}}var Ee={disposition:`open`,note:``};function De(e,t){return e.decisions[t]??Ee}function Oe(e){return e.disposition===`open`?!1:e.disposition!==`accept`||e.note.trim().length>0}function ke(e,t){return e.filter(e=>M(e.rule)&&!Oe(De(t,e.rule.id)))}function Ae(e,t,n){let r=new Set,i=e;for(let e of t){let t=e.rule.benchmark;t&&!r.has(t.input)&&De(n,e.rule.id).disposition===`use-benchmark`&&(r.add(t.input),i=x(i,t.input,t.value))}return i}function je(e,t,n){let r=t.map(e=>{let t=De(n,e.rule.id);return[e.rule.id,t.disposition,t.note.trim()]}),i=JSON.stringify([e,r]),a=2166136261;for(let e=0;e<i.length;e++)a^=i.charCodeAt(e),a=Math.imul(a,16777619);return(a>>>0).toString(16).padStart(8,`0`)}function Me(e,t,n){return ke(t,n).length>0?`needs-review`:n.signOff?n.signOff.fingerprint===je(e,t,n)?`signed`:`stale`:`ready`}function Ne(e){return Math.abs(e)<.5?`by less than $1`:`${D(Math.abs(e))} toward ${e>0?`the VPPA`:`buying RECs`}`}function Pe(e){return`${e.recommendation===`VPPA`?`the VPPA`:`buying unbundled RECs`}, by ${D(Math.abs(e.npvAdvantage))} (net present value)`}function Fe(e){let{inputs:t,submitted:n,reviewed:r,findings:i,review:a}=e,o=`${t.termYears} years`,s=[],c=t.assumptionOwner.trim()||`team`;if(s.push(`Subject: Assumption questions on "${t.scenarioName}"`),s.push(``),s.push(`Hi ${c},`),s.push(``),s.push(`Before we rely on the VPPA vs. REC comparison, I'd like to resolve a few assumptions. As submitted, the model favors ${Pe(n)} over ${o} at a ${O(t.discountRate)} discount rate.`),n.npvAdvantage!==r.npvAdvantage){let e=n.recommendation!==r.recommendation;s.push(`With the benchmark values below, it favors ${Pe(r)}.${e?` The recommendation reverses.`:``}`)}Number.isFinite(e.breakEvenEscalation)&&s.push(`For reference, the two options cost the same at ${O(e.breakEvenEscalation)} annual wholesale price escalation (model assumes ${O(t.wholesaleEscalation)}).`),s.push(``);let l=i.filter(e=>{let t=De(a,e.rule.id).disposition;return e.rule.severity!==`info`&&(t===`send-back`||t===`use-benchmark`||t===`open`)}),u=i.filter(e=>e.rule.severity===`info`&&e.rule.ask);l.length&&(s.push(`Assumptions to resolve`),s.push(``),l.forEach((e,n)=>{let r=e.rule.benchmark?w[e.rule.benchmark.input]:void 0;if(s.push(`${n+1}. ${e.rule.title}`),s.push(`   ${e.message}`),e.impact&&r){let n=A(r.key,t[e.rule.benchmark.input]);s.push(`   Benchmark: ${e.rule.benchmark.label}. Using it instead of ${n} moves the result ${Ne(e.impact.delta)}${e.impact.flips?` and, on its own, reverses the recommendation`:``}.`)}s.push(`   Why it matters: ${e.rule.why}`),e.rule.ask&&s.push(`   Question: ${e.rule.ask}`);let i=De(a,e.rule.id).note.trim();i&&s.push(`   Reviewer note: ${i}`),e.rule.source&&s.push(`   Source: ${e.rule.source}`),s.push(``)}));let d=i.filter(e=>De(a,e.rule.id).disposition===`accept`);if(d.length){s.push(`Flagged but kept as submitted`),s.push(``);for(let e of d)s.push(`- ${e.rule.title}: ${De(a,e.rule.id).note.trim()}`);s.push(``)}if(u.length){s.push(`Smaller items`),s.push(``);for(let e of u)s.push(`- ${e.rule.title}. ${e.rule.ask}`);s.push(``)}return s.push(`Not captured in either number: the VPPA’s value as a price hedge, its derivative-accounting treatment, and the stronger impact claim that comes from helping finance a new project.`),s.push(``),s.push(`Thanks,`),s.push(e.reviewer.trim()||`[Reviewer]`),e.status===`signed`&&a.signOff&&(s.push(``),s.push(`Reviewed and signed off by ${a.signOff.by} on ${a.signOff.at.slice(0,10)}.`)),s.join(`
`)}var Ie=e=>t=>t*e,Le=(e,t=-1/0,n=1/0)=>r=>Math.min(n,Math.max(t,r+e)),Re=[{input:`wholesaleEscalation`,label:`Wholesale escalation`,low:()=>.015,high:()=>.04},{input:`hubPrice`,label:`Year-1 hub price`,low:Ie(.8),high:Ie(1.2)},{input:`captureRate`,label:`Capture rate`,low:Le(-.15,.3),high:Le(.05,0,1.1)},{input:`strikePrice`,label:`Strike price`,low:Ie(.9),high:Ie(1.1)},{input:`capacityFactor`,label:`Capacity factor`,low:Ie(.9),high:Ie(1.1)},{input:`discountRate`,label:`Discount rate`,low:Le(-.02,.01),high:Le(.02)},{input:`recPrice`,label:`REC price`,low:Ie(.5),high:Ie(2)},{input:`degradation`,label:`Degradation`,low:()=>0,high:()=>.01}];function ze(e){let t=b(e).npvAdvantage;return Re.map(n=>{let r=e[n.input],i=n.low(r),a=n.high(r),o=b(x(e,n.input,i)).npvAdvantage-t,s=b(x(e,n.input,a)).npvAdvantage-t;return{input:n.input,label:n.label,lowValue:i,highValue:a,lowDelta:o,highDelta:s,range:Math.abs(s-o)}}).sort((e,t)=>t.range-e.range)}function Be(e,t,n={}){let r=n.review??{decisions:{}},i=b(e),a=Se(e,t,i),o=[],s=[],c=[],l=new Set,u=e;for(let e of a){let t=De(r,e.rule.id).disposition;if(t===`accept`){c.push(e);continue}let n=e.rule.severity!==`info`&&e.rule.benchmark?.auto!==!1||t===`use-benchmark`;if(e.rule.benchmark&&n){if(l.has(e.rule.benchmark.input)){s.push(e);continue}l.add(e.rule.benchmark.input),u=x(u,e.rule.benchmark.input,e.rule.benchmark.value),o.push(e)}}let d=ne(e),f=b(u),p=new Set(c.map(e=>e.rule.id)),m=new Set(o.map(e=>e.rule.id)),h=a.filter(e=>e.rule.severity!==`info`&&!p.has(e.rule.id)&&(e.rule.ask||!m.has(e.rule.id))),g=a.filter(e=>(e.rule.severity===`info`||e.rule.benchmark?.auto===!1)&&!m.has(e.rule.id)&&!p.has(e.rule.id)),_=f.rows.reduce((e,t)=>e+t.generationMWh*t.discountFactor,0),v=_>0?-f.npvAdvantage/_:NaN,y=f.npvAdvantage,S=ze(u).filter(e=>Math.sign(y+e.lowDelta)!==Math.sign(y)||Math.sign(y+e.highDelta)!==Math.sign(y)),C=[...new Set([...n.assumed??[],...(n.rejected??[]).map(e=>e.key)])].filter(e=>w[e]?.core),T=d.length?`low`:S.length===0?`high`:S.length<=2?`medium`:`low`;T===`high`&&C.length&&(T=`medium`);let E=te(u),re=ee(u),ie=i.recommendation!==f.recommendation,ae=D(Math.abs(f.npvAdvantage)),A=k(e.strikePrice),oe;oe=f.recommendation===`RECs`?`Buy unbundled RECs. At ${A}, this VPPA costs ${ae} more over ${e.termYears} years.`:`Sign the VPPA. It beats unbundled RECs by ${ae} over ${e.termYears} years, even with realistic assumptions.`;let se=[];if(ie){let e=[...o].sort((e,t)=>Math.abs(t.impact?.delta??0)-Math.abs(e.impact?.delta??0))[0];se.push(`The model as submitted says the opposite (${i.recommendation===`VPPA`?`the VPPA`:`RECs`} by ${D(Math.abs(i.npvAdvantage))}), mainly because of one assumption: ${e?e.rule.title.toLowerCase():`the corrected values below`}.`)}else o.length&&se.push(`The model as submitted reaches the same answer, by ${D(Math.abs(i.npvAdvantage))}.`);return f.recommendation===`RECs`?(Number.isFinite(E)&&E>0&&se.push(`The VPPA only beats RECs at a strike below ${k(E)}.`),Number.isFinite(v)&&se.push(`At the offered price it costs about ${k(v)} more than RECs for each MWh the project produces. That premium buys a long-term price hedge and a stronger claim to adding new renewable capacity; pay it only if those are worth that much to you.`)):(Number.isFinite(E)&&se.push(`It stays ahead as long as the strike is below ${k(E)}.`),Number.isFinite(re)&&se.push(`It needs wholesale prices to rise at least ${O(re)} a year.`)),{inputs:e,assumed:n.assumed??[],findings:a,submitted:i,correctedInputs:u,corrected:f,corrections:o,superseded:s,problems:d,rejected:n.rejected??[],assumedCore:C,kept:c,questions:h,notes:g,reversed:ie,breakEvenStrike:E,breakEvenEscalation:re,premiumPerMWh:v,flips:S,confidence:T,headline:oe,summary:se.join(` `)}}var Ve={high:`High: no single assumption, moved across its plausible range, reverses this.`,medium:`Medium: one or two assumptions could reverse this if they land at the edge of their range.`,low:`Low: several assumptions could reverse this. Firm them up before deciding.`};function He(e){if(e.problems.length)return`Low: some inputs are outside their possible range, so the numbers can’t be trusted yet. Fix them first.`;if(!e.flips.length&&e.assumedCore.length){let t=e.assumedCore.map(e=>w[e]?.label??e).join(`; `);return`Medium: no single assumption reverses this, but ${e.assumedCore.length===1?`one needed input was`:`${e.assumedCore.length} needed inputs were`} filled in (${t}). Firm ${e.assumedCore.length===1?`it`:`them`} up to raise confidence.`}return e.flips.length?`${Ve[e.confidence]} Watch: ${e.flips.map(e=>e.label.toLowerCase()).join(`, `)}.`:Ve.high}function Ue(e){let t=[],n=e.corrected.recommendation===`RECs`;Number.isFinite(e.breakEvenStrike)&&e.breakEvenStrike>0&&t.push(`${n?`A strike below`:`A strike above`} ${k(e.breakEvenStrike)} (offered: ${k(e.inputs.strikePrice)}).`),Number.isFinite(e.breakEvenEscalation)&&t.push(`Wholesale prices rising ${n?`faster than`:`slower than`} ${O(e.breakEvenEscalation)} a year for the whole term (typical: 2.5–3%).`);for(let n of e.flips){let r=Math.sign(e.corrected.npvAdvantage+n.lowDelta)===Math.sign(e.corrected.npvAdvantage)?n.highValue:n.lowValue;t.push(`${n.label} at ${A(n.input,r)} instead of ${A(n.input,e.correctedInputs[n.input])}.`)}return t}function We(e){let t=[],n=e.inputs.assumptionOwner.trim();if(t.push(`# ${e.inputs.scenarioName}`),t.push(``),t.push(`**${e.headline}**`),t.push(``),e.summary&&(t.push(e.summary),t.push(``)),t.push(`**Confidence:** ${He(e)}`),t.push(``),e.problems.length){t.push(`## Fix these inputs first`),t.push(``);for(let n of e.problems)t.push(`- ${n.message} The model has ${A(n.key,n.value)}; check the units.`);t.push(``)}if(t.push(`| | As submitted | Corrected |`),t.push(`|---|---|---|`),t.push(`| Lower-cost option | ${e.submitted.recommendation} | ${e.corrected.recommendation} |`),t.push(`| VPPA advantage (NPV, ${e.inputs.termYears} yrs at ${O(e.inputs.discountRate)}) | ${D(e.submitted.npvAdvantage,{sign:!0})} | ${D(e.corrected.npvAdvantage,{sign:!0})} |`),t.push(`| Break-even strike | ${k(te(e.inputs))} | ${k(e.breakEvenStrike)} |`),t.push(`| Break-even wholesale escalation | ${O(ee(e.inputs))} | ${O(e.breakEvenEscalation)} |`),t.push(``),e.corrections.length){t.push(`## Assumptions corrected`),t.push(``),t.push(`| Assumption | Model | Used | Effect on its own |`),t.push(`|---|---|---|---|`);for(let n of e.corrections){let r=n.rule.benchmark,i=w[r.input]?.label??r.input;t.push(`| ${i} | ${A(r.input,e.inputs[r.input])} | ${A(r.input,r.value)} | ${Ne(n.impact?.delta??0)}${n.impact?.flips?` (reverses the answer)`:``} |`)}t.push(``);for(let n of e.corrections)t.push(`- **${n.rule.title}.** ${n.message} ${n.rule.why}${n.rule.source?` _Source: ${n.rule.source}._`:``}`);for(let n of e.superseded)t.push(`- _${n.rule.title} suggested ${A(n.rule.benchmark.input,n.rule.benchmark.value)}; the more serious check above takes precedence._`);t.push(``)}if(e.kept.length){t.push(`## Flagged but kept by the reviewer`),t.push(``);for(let n of e.kept)t.push(`- **${n.rule.title}.** ${n.message}`);t.push(``)}let r=Ue(e);if(r.length){t.push(`## What would change the answer`),t.push(``);for(let e of r)t.push(`- ${e}`);t.push(``)}if(e.questions.length&&(t.push(`## Questions for ${n||`whoever built the model`}`),t.push(``),e.questions.forEach((e,n)=>t.push(`${n+1}. ${e.rule.ask||e.message} _(${e.rule.title})_`)),t.push(``)),e.notes.length){t.push(`## Also worth checking`),t.push(``);for(let n of e.notes){let e=n.impact?` Using ${n.rule.benchmark.label} would move the result ${Ne(n.impact.delta)}.`:``;t.push(`- **${n.rule.title}.** ${n.message}${e}`)}t.push(``)}let i=Ge(e);if(i.length){t.push(`## Filled in for you`),t.push(``);for(let e of i)t.push(`- ${e}`);t.push(``)}return t.push(`## Not in the numbers`),t.push(``),t.push(`- The VPPA’s value as a long-term hedge against rising power prices.`),t.push(`- Earnings volatility if the VPPA is marked to market as a derivative.`),t.push(`- Impact: a VPPA for a new project can claim to add renewable capacity; unbundled RECs rarely can.`),t.push(``),t.join(`
`)}function Ge(e){let t=[];for(let n of e.rejected){let r=w[n.key];t.push(`${r?.label??n.key}: the source gave ${JSON.stringify(n.given)}, which is ${n.reason}, so ${A(n.key,e.inputs[n.key])} was used.${r?.source?` Get it from: ${r.source}.`:``}`)}let n=new Set(e.rejected.map(e=>e.key));for(let r of e.assumed){if(n.has(r))continue;let i=w[r];t.push(`${i?.label??r}: ${A(r,e.inputs[r])}.${i?.source?` Get it from: ${i.source}.`:``}`)}return t}var Ke={capacityFactor:.7,captureRate:1.5,degradation:.05,wholesaleEscalation:.25,strikeEscalation:.25,recEscalation:.5,discountRate:.3};function qe(e,t,n){return e in Ke&&(n||Math.abs(t)>Ke[e])?t/100:t}var Je=[`accountingReviewed`,`creditSupportReviewed`,`negativePriceTermsReviewed`,`marketBoundaryConfirmed`,`scope2RevisionConsidered`];function Ye(e){return{scenarioName:`VPPA vs. unbundled RECs`,assumptionOwner:``,technology:e,market:`Other`,capacityMW:100,capacityFactor:e===`wind`?.36:.24,degradation:0,termYears:15,strikePrice:e===`wind`?72:63,strikeEscalation:0,settlementPoint:`hub`,basis:0,transactionCost:0,hubPrice:45,wholesaleEscalation:.0275,captureRate:1,annualLoadMWh:0,recPrice:4.5,recEscalation:.02,discountRate:.08}}var Xe=new Set([...C.filter(e=>e.core).map(e=>e.key),`recEscalation`]);function Ze(e){if(typeof e==`number`)return Number.isFinite(e)?e:void 0;if(typeof e==`string`&&e.trim()){let t=Number(e.replace(/[,$%\s]/g,``));return Number.isFinite(t)?t:void 0}}function Qe(e){if(typeof e==`boolean`)return e;if(typeof e==`string`){if(/^(true|yes|y|done|1)$/i.test(e.trim()))return!0;if(/^(false|no|n|0)$/i.test(e.trim()))return!1}}function $e(e){let t={...e};t.diligence&&typeof t.diligence==`object`&&Object.assign(t,t.diligence);let n=Ye(String(t.technology??``).toLowerCase()===`wind`?`wind`:`solar`),r={accountingReviewed:!1,creditSupportReviewed:!1,negativePriceTermsReviewed:!1,marketBoundaryConfirmed:!1,scope2RevisionConsidered:!1},i={...n,diligence:r},a=[],o=new Set([...Object.keys(n),...Je,`diligence`,`annualGenerationMWh`]),s=Object.keys(e).filter(e=>!o.has(e)),c=[];/^(solar|wind)$/i.test(String(t.technology??``).trim())||a.push(`technology`),typeof t.scenarioName==`string`&&t.scenarioName.trim()&&(i.scenarioName=t.scenarioName.trim()),typeof t.assumptionOwner==`string`&&(i.assumptionOwner=t.assumptionOwner.trim());let l=pe.find(e=>e.toLowerCase()===String(t.market??``).toLowerCase().replace(/\s+/g,``));l?i.market=l:String(t.market??``).toLowerCase().replace(/[\s-]/g,``)===`isone`?i.market=`ISO-NE`:a.push(`market`),String(t.settlementPoint??``).toLowerCase().startsWith(`node`)&&(i.settlementPoint=`node`);for(let e of Object.keys(n)){if(w[e]?.format===`text`||e===`scenarioName`||e===`assumptionOwner`)continue;let n=Ze(t[e]),r=typeof t[e]==`string`&&t[e].includes(`%`),o=n===void 0?void 0:qe(e,n,r),s=w[e]?.range;o!==void 0&&s&&(o<s[0]||o>s[1])?(c.push({key:e,given:t[e],reason:`outside the possible range for ${w[e].label.toLowerCase()}`}),Xe.has(e)&&a.push(e)):o===void 0?Xe.has(e)&&a.push(e):i[e]=o}let u=Ze(t.annualGenerationMWh);if(u&&u>0){let e=!a.includes(`capacityMW`),t=!a.includes(`capacityFactor`);e&&!t?(i.capacityFactor=u/(i.capacityMW*8760),a.splice(a.indexOf(`capacityFactor`),1)):e||(i.capacityMW=u/(i.capacityFactor*8760),a.splice(a.indexOf(`capacityMW`),1))}(a.includes(`annualLoadMWh`)||i.annualLoadMWh<=0)&&(i.annualLoadMWh=Math.round(i.capacityMW*8760*i.capacityFactor),a.includes(`annualLoadMWh`)||a.push(`annualLoadMWh`));for(let e of Je){let n=Qe(t[e]);n!==void 0&&(i.diligence[e]=n)}return{inputs:i,assumed:a,ignored:s,rejected:c}}var et=[[/(strike|ppa|contract|vppa).*(escalat|escalator|indexation)/i,`strikeEscalation`],[/\brecs?\b.*(escalat|inflat|growth)|(certificate|credit).*(escalat|growth)/i,`recEscalation`],[/escalat|inflat|price growth|annual growth/i,`wholesaleEscalation`],[/capture|shape (factor|discount)|realization/i,`captureRate`],[/basis/i,`basis`],[/capacity factor|\bcf\b|net capacity|\bncf\b/i,`capacityFactor`],[/degradation/i,`degradation`],[/(annual )?(generation|production|output)\b/i,`annualGenerationMWh`],[/strike|ppa price|vppa price|contract price|fixed price|offer price/i,`strikePrice`],[/\brecs?\b|renewable energy (credit|certificate)|eac\b/i,`recPrice`],[/hub|market price|wholesale|power price|energy price|forward|merchant|lmp/i,`hubPrice`],[/term|tenor|contract length|duration|years/i,`termYears`],[/project size|nameplate|capacity|\bmw\b|size/i,`capacityMW`],[/load|consumption|usage|demand/i,`annualLoadMWh`],[/discount|wacc|hurdle|cost of capital/i,`discountRate`],[/transaction|legal|advisory|fees/i,`transactionCost`]];function tt(e){let t=e.match(/(-|−)?\s*\$?\s*(\d[\d,]*\.?\d*|\.\d+)\s*(%|k\b|m\b|mm\b|million|bn\b|gwh|mwh|twh)?/i);if(!t)return null;let n=Number(t[2].replace(/,/g,``));if(!Number.isFinite(n))return null;t[1]&&(n=-n);let r=(t[3]??``).toLowerCase();return r===`k`?n*=1e3:r===`m`||r===`mm`||r===`million`?n*=1e6:r===`bn`?n*=1e9:r===`gwh`?n*=1e3:r===`twh`&&(n*=1e6),{value:n,percent:r===`%`}}function nt(e){let t={},n=[];for(let r of e.split(/\r?\n/)){let e=r.trim().replace(/\b(year|yr)[\s-]*1\b/gi,`year-one`);if(!e)continue;let i=e.split(/\t|:\s+|\s{2,}|=\s*/).map(e=>e.trim()).filter(Boolean),a=i.length>1?i[0]:e.replace(/[-−$]?\s*[\d.,]+.*$/,``).trim(),o=i.length>1?i.slice(1).join(` `):e.slice(a.length),s=e.toLowerCase(),c=/\bwind\b/.test(s)?`wind`:/\bsolar|\bpv\b/.test(s)?`solar`:void 0,l=pe.find(t=>t!==`Other`&&RegExp(`\\b${t.replace(`-`,`[- ]?`)}\\b`,`i`).test(e));if(/^(technology|resource|type)/i.test(a)&&c){t.technology=c,n.push({text:e,key:`technology`,value:c});continue}if(/^(market|iso|rto|region)/i.test(a)&&l){t.market=l,n.push({text:e,key:`market`,value:l});continue}if(/settle/i.test(a)){let r=/node|busbar/i.test(o)?`node`:`hub`;t.settlementPoint=r,n.push({text:e,key:`settlementPoint`,value:r});continue}if(/^(scenario|project|project name|deal|name)$/i.test(a)&&o){t.scenarioName=o,n.push({text:e,key:`scenarioName`,value:o});continue}let u=et.find(([e])=>e.test(a)),d=tt(o||e);if(!u||!d){c&&!t.technology&&(t.technology=c),l&&!t.market&&(t.market=l),n.push({text:e});continue}let f=u[1];t[f]=d.percent?`${d.value}%`:d.value;let p=qe(f,d.value,d.percent);c&&!t.technology&&(t.technology=c),n.push({text:e,key:f,value:p})}return{values:t,lines:n}}var rt={scenarioName:`Example: 80 MW solar VPPA vs. unbundled RECs`,assumptionOwner:`Procurement advisor`,technology:`solar`,market:`PJM`,capacityMW:80,capacityFactor:.24,degradation:0,termYears:15,strikePrice:63,strikeEscalation:0,settlementPoint:`hub`,basis:0,transactionCost:0,hubPrice:48,wholesaleEscalation:.075,captureRate:1,annualLoadMWh:18e4,recPrice:4.5,recEscalation:.02,discountRate:.08,diligence:{accountingReviewed:!0,creditSupportReviewed:!0,negativePriceTermsReviewed:!1,marketBoundaryConfirmed:!0,scope2RevisionConsidered:!1}},it={...rt,scenarioName:`Example: same deal, benchmark assumptions`,degradation:.005,transactionCost:35e4,wholesaleEscalation:.0275,captureRate:.85,diligence:{accountingReviewed:!0,creditSupportReviewed:!0,negativePriceTermsReviewed:!0,marketBoundaryConfirmed:!0,scope2RevisionConsidered:!0}},at=C.filter(e=>e.kind===`input`&&e.format!==`text`&&e.format!==`bool`).map(e=>e.key);function ot(e,t,n,r){let i=new Set(n.map(e=>e.rule.id)),a=C.map(t=>`- ${t.key} = ${JSON.stringify(e[t.key])} (${t.label}; shown as ${A(t.key,e[t.key])})`),o=n.map(e=>`- [${e.rule.severity}] ${e.rule.title}: ${e.message}`),s=r.filter(e=>!i.has(e.id)).map(e=>`- ${e.title}`);return[`You are a senior reviewer of corporate renewable energy procurement: VPPAs, physical PPAs, and unbundled RECs.`,`A checklist has already reviewed the VPPA vs. unbundled REC model below. Find up to 5 problems the checklist did NOT catch: assumptions that look wrong, inconsistent with each other, missing, or risky for this specific deal.`,`Do not repeat anything already flagged. Do not state market figures you are unsure of; say what should be verified instead. Be specific to these numbers.`,``,`Model facts (key = machine value):`,...a,``,`Result: the model favors ${t.recommendation===`VPPA`?`the VPPA`:`buying RECs`} by ${D(Math.abs(t.npvAdvantage))} NPV.`,``,`Already flagged by the checklist:`,...o.length?o:[`- (nothing)`],``,`Checks that ran and did not fire:`,...s,``,`Where a problem can be written as a reusable check on the fact keys above, include it. Operators: > >= < <= == != outside between (outside/between take [low, high]). Use machine values: fractions for percentages (0.03 = 3%), $/MWh for prices, true/false for yes/no facts, and the exact strings shown for text facts. A benchmark may only set one of these inputs: `+at.join(`, `)+`.`,``,`Reply with only a JSON array, for example:`,`[{"title":"Strike escalator outpaces inflation","severity":"warning","why":"...","ask":"...","check":{"when":[{"fact":"strikeEscalation","op":">","value":0.025}],"benchmark":{"input":"strikeEscalation","value":0,"label":"flat strike"}}}]`,`severity is one of critical, warning, info. Use "check": null when the problem cannot be expressed with these facts.`].join(`
`)}function st(e){if(!e||typeof e!=`object`)return null;let{fact:t,op:n,value:r}=e;if(typeof t!=`string`||!w[t]||typeof n!=`string`||!ge.includes(n))return null;let i=w[t];if(n===`outside`||n===`between`){if(!Array.isArray(r)||r.length!==2)return null;let e=r.map(Number);return e.some(e=>!Number.isFinite(e))?null:{fact:t,op:n,value:[Math.min(e[0],e[1]),Math.max(e[0],e[1])]}}if(i.format===`bool`)return typeof r==`boolean`?{fact:t,op:n,value:r}:r===`true`||r===`false`?{fact:t,op:n,value:r===`true`}:null;if(i.format===`text`)return typeof r!=`string`||i.options&&!i.options.includes(r)?null:{fact:t,op:n,value:r};let a=Number(r);return Number.isFinite(a)?{fact:t,op:n,value:a}:null}function ct(e){if(!e||typeof e!=`object`)return;let{input:t,value:n,label:r}=e;if(typeof t!=`string`||!at.includes(t))return;let i=Number(n);if(Number.isFinite(i))return{input:t,value:i,label:typeof r==`string`&&r.trim()?r.trim():A(t,i)}}function lt(e){let t=Array.isArray(e)?e:e&&typeof e==`object`&&Array.isArray(e.suggestions)?e.suggestions:[],n=[];for(let e of t.slice(0,8)){if(!e||typeof e!=`object`)continue;let t=e;if(typeof t.title!=`string`||!t.title.trim())continue;let r=t.check&&typeof t.check==`object`?t.check:null,i=Array.isArray(r?.when)?r.when.map(st).filter(e=>e!==null):[];n.push({title:t.title.trim(),severity:me.includes(t.severity)?t.severity:`info`,why:typeof t.why==`string`?t.why.trim():``,ask:typeof t.ask==`string`?t.ask.trim():``,when:i,benchmark:i.length?ct(r?.benchmark):void 0})}return n}function ut(e){let t=[e.trim()],n=e.match(/```(?:json)?\s*([\s\S]*?)```/);n&&t.push(n[1].trim());let r=e.search(/[[{]/),i=Math.max(e.lastIndexOf(`]`),e.lastIndexOf(`}`));r>=0&&i>r&&t.push(e.slice(r,i+1));for(let e of t)try{return lt(JSON.parse(e))}catch{}throw Error(`No JSON found in that reply.`)}var dt=`ppa-preflight:v1:`;function ft(e,t){try{let n=localStorage.getItem(dt+e);return n?JSON.parse(n):t}catch{return t}}function pt(e,t){try{localStorage.setItem(dt+e,JSON.stringify(t))}catch{}}function mt(){let e=globalThis.claude;return e&&typeof e.use==`function`?e.use.bind(e):null}function ht(){return mt()!==null}async function gt(e){let t=mt();if(!t)return null;try{return await t(e)??null}catch{return null}}async function _t(e,t){let n=typeof t==`string`?new Blob([t],{type:`text/plain;charset=utf-8`}):new Blob([t],{type:`application/zip`});if(ht()){let r=await gt(`downloads`);if(!r)return`unavailable`;try{return await r.save({filename:e,data:typeof t==`string`?t:n}),`saved`}catch(e){return e.code===`declined`?`declined`:`unavailable`}}let r=URL.createObjectURL(n),i=document.createElement(`a`);return i.href=r,i.download=e,document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3),`saved`}var vt=(e,t)=>_t(e,t);async function yt(e){try{return await navigator.clipboard.writeText(e),!0}catch{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.append(t),t.select();let n=!1;try{n=document.execCommand(`copy`)}catch{n=!1}return t.remove(),n}}var bt=e((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),P=e(((e,t)=>{t.exports=bt()}))(),xt={critical:`Critical`,warning:`Warning`,info:`Note`};function St({severity:e}){return e===`critical`?(0,P.jsxs)(`svg`,{viewBox:`0 0 12 12`,"aria-hidden":`true`,children:[(0,P.jsx)(`path`,{d:`M6 1 11 10H1Z`,fill:`currentColor`,opacity:`0.25`}),(0,P.jsx)(`path`,{d:`M6 4v3M6 8.6v.1`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})]}):e===`warning`?(0,P.jsxs)(`svg`,{viewBox:`0 0 12 12`,"aria-hidden":`true`,children:[(0,P.jsx)(`circle`,{cx:`6`,cy:`6`,r:`5`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.4`}),(0,P.jsx)(`path`,{d:`M6 3.4v3.2M6 8.4v.1`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})]}):(0,P.jsxs)(`svg`,{viewBox:`0 0 12 12`,"aria-hidden":`true`,children:[(0,P.jsx)(`circle`,{cx:`6`,cy:`6`,r:`5`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.4`}),(0,P.jsx)(`path`,{d:`M6 5.4v3M6 3.4v.1`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})]})}function Ct({severity:e}){return(0,P.jsxs)(`span`,{className:`sev`,"data-sev":e,children:[(0,P.jsx)(St,{severity:e}),xt[e]]})}function wt(e,t){if(!Number.isFinite(e))return``;let n=t?Math.round(e*1e6)/1e4:e;return String(n)}function Tt({id:e,label:t,value:n,onChange:r,percent:i,prefix:a,suffix:o,step:s,help:c,flag:u,error:d}){let[f,p]=(0,l.useState)(wt(n,i)),m=(0,l.useRef)(!1);return(0,l.useEffect)(()=>{m.current||p(wt(n,i))},[n,i]),(0,P.jsxs)(`label`,{className:`field`,"data-flag":d?`critical`:u,htmlFor:e,children:[(0,P.jsxs)(`span`,{className:`field-label`,children:[t,u?(0,P.jsx)(`span`,{className:`flag-dot`,"data-sev":u,title:`Flagged: ${u}`}):null]}),(0,P.jsxs)(`span`,{className:`input-wrap`,children:[a?(0,P.jsx)(`span`,{className:`affix`,children:a}):null,(0,P.jsx)(`input`,{id:e,className:`input`,"aria-invalid":d?!0:void 0,"aria-describedby":d?`${e}-error`:void 0,inputMode:`decimal`,value:f,step:s,onFocus:()=>m.current=!0,onBlur:()=>{m.current=!1,p(wt(n,i))},onChange:e=>{p(e.target.value);let t=Number(e.target.value.replace(/[,$%\s]/g,``));e.target.value.trim()!==``&&Number.isFinite(t)&&r(i?t/100:t)}}),o?(0,P.jsx)(`span`,{className:`affix`,children:o}):null]}),d?(0,P.jsx)(`span`,{className:`field-error`,id:`${e}-error`,children:d}):c?(0,P.jsx)(`span`,{className:`field-help`,children:c}):null]})}function Et({value:e,options:t,onChange:n,label:r}){return(0,P.jsx)(`div`,{className:`segmented`,role:`group`,"aria-label":r,children:t.map(t=>(0,P.jsx)(`button`,{type:`button`,"aria-pressed":e===t.value,disabled:t.disabled,onClick:()=>n(t.value),children:t.label},t.value))})}function Dt({text:e,filename:t,copyLabel:n=`Copy`,children:r}){let[i,a]=(0,l.useState)(null),o=()=>typeof e==`function`?e():e;return(0,l.useEffect)(()=>{if(!i)return;let e=setTimeout(()=>a(null),4e3);return()=>clearTimeout(e)},[i]),(0,P.jsxs)(`div`,{className:`btn-row`,children:[(0,P.jsx)(`button`,{type:`button`,className:`btn`,onClick:async()=>a(await yt(o())?{text:`Copied`}:{text:`Copy failed. Select the text instead.`,tone:`warn`}),children:n}),t?(0,P.jsxs)(`button`,{type:`button`,className:`btn`,onClick:async()=>{let e=o(),n=await vt(t,e);if(n===`saved`)a({text:`Saved ${t}`});else if(n===`declined`)a(null);else{let t=await yt(e);a({text:t?`Downloads are off here, so it was copied instead`:`Downloads are off here. Use Copy.`,tone:`warn`})}},children:[`Download `,t.split(`.`).pop()?.toUpperCase()]}):null,r,i?(0,P.jsx)(`span`,{className:`toast`,"data-tone":i.tone,role:`status`,children:i.text}):null]})}function Ot(e=560){let t=(0,l.useRef)(null),[n,r]=(0,l.useState)(e);return(0,l.useEffect)(()=>{let e=t.current;if(!e)return;let n=()=>r(Math.max(260,Math.round(e.getBoundingClientRect().width)));n();let i=new ResizeObserver(n);return i.observe(e),()=>i.disconnect()},[]),[t,n]}var kt=`Paste the assumptions from your model, one per line. For example:

Technology	Solar
Market	PJM
Project size (MW)	80
Capacity factor	24%
PPA price ($/MWh)	63
Contract term	15 years
Year 1 hub price ($/MWh)	48
Wholesale price inflation	7.5%
REC price ($/MWh)	4.50
Annual load (MWh)	180,000
Discount rate	8%`;function At(e){return[`Extract the assumptions of a VPPA vs. unbundled REC financial model from the text below.`,`Reply with only one JSON object using any of these keys. Leave out keys the text does not state; do not guess.`,C.filter(e=>e.kind===`input`).map(e=>`- ${e.key}: ${e.label} (${e.format===`pct`?`fraction, 0.075 = 7.5%`:e.format===`bool`?`true/false`:e.options?e.options.join(` | `):e.format})`).join(`
`),`- annualGenerationMWh: annual generation in MWh, if given instead of a capacity factor`,`- scenarioName, assumptionOwner: text`,``,`Text:`,e.slice(0,2e4)].join(`
`)}function jt(e){return e.key?e.key===`annualGenerationMWh`?`Annual generation = ${Number(e.value).toLocaleString(`en-US`)} MWh`:`${w[e.key]?.label??e.key} = ${typeof e.value==`number`?A(e.key,e.value):String(e.value)}`:``}function Mt({advice:e,onRead:t,onExample:n,onOpenReview:r}){let[i,a]=(0,l.useState)(``),[o,s]=(0,l.useState)(null),[c,u]=(0,l.useState)(null),[d,p]=(0,l.useState)(!1),[m,h]=(0,l.useState)(``),g=(0,l.useRef)(null);(0,l.useEffect)(()=>{let e=!0;return ht()&&gt(`sample`).then(t=>e&&u(()=>t)),()=>{e=!1,g.current?.abort()}},[]);let _=()=>{let e=nt(i);e.lines.filter(e=>e.key).length?(h(``),s(e.lines),t(e.values)):(h(`No assumptions recognized. Put one per line, with the label first and the value after it.`),s(e.lines))},v=async()=>{if(c){g.current=new AbortController,p(!0),h(``);try{let e=await c.json(At(i),{signal:g.current.signal,cache:!1});if(!e||typeof e!=`object`||Array.isArray(e))throw{code:`invalid_json`};s(Object.entries(e).map(([e,t])=>({text:e,key:e,value:t}))),t(e)}catch(e){let t=e.code;(t===`not_granted`||t===`sampling_disabled`)&&u(null),t!==`cancelled`&&h(`Claude couldn’t read that. Try “Read assumptions” instead.`)}finally{p(!1)}}},y=e,b=y.inputs,x=y.corrected.recommendation===`RECs`,S=Ue(y),ee=b.assumptionOwner.trim();return(0,P.jsxs)(`div`,{className:`advice`,children:[(0,P.jsxs)(`section`,{className:`panel`,"aria-labelledby":`paste-title`,children:[(0,P.jsxs)(`div`,{className:`panel-head`,children:[(0,P.jsx)(`h2`,{id:`paste-title`,children:`Your model`}),(0,P.jsxs)(`span`,{className:`sub`,children:[b.scenarioName,` · `,b.technology,` · `,b.market,` · `,k(b.strikePrice),` strike · `,b.termYears,` years`]})]}),(0,P.jsxs)(`div`,{className:`panel-body`,children:[(0,P.jsxs)(`label`,{className:`field`,htmlFor:`paste-box`,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Paste assumptions from a spreadsheet, memo, or email`}),(0,P.jsx)(`textarea`,{id:`paste-box`,className:`textarea paste`,rows:6,value:i,placeholder:kt,onChange:e=>a(e.target.value)})]}),(0,P.jsxs)(`div`,{className:`btn-row`,children:[(0,P.jsx)(`button`,{type:`button`,className:`btn btn-primary`,disabled:!i.trim()||d,onClick:_,children:`Read assumptions`}),c?(0,P.jsx)(`button`,{type:`button`,className:`btn`,disabled:!i.trim()||d,onClick:v,children:d?`Reading…`:`Read with Claude`}):null,(0,P.jsx)(`button`,{type:`button`,className:`btn btn-quiet`,onClick:n,children:`Use the 7.5% example`})]}),m?(0,P.jsx)(`p`,{className:`small`,role:`alert`,children:m}):null,o?(0,P.jsxs)(`details`,{className:`disclosure`,open:o.some(e=>!e.key),children:[(0,P.jsxs)(`summary`,{children:[`Read `,o.filter(e=>e.key).length,` of `,o.length,` lines`]}),(0,P.jsx)(`ul`,{className:`read-lines`,children:o.map((e,t)=>(0,P.jsxs)(`li`,{"data-matched":!!e.key,children:[(0,P.jsx)(`span`,{className:`read-src`,children:e.text}),(0,P.jsx)(`span`,{className:`read-arrow`,"aria-hidden":`true`,children:`→`}),(0,P.jsx)(`span`,{children:e.key?jt(e):`not used`})]},t))}),(0,P.jsx)(`p`,{className:`small muted`,children:`Adjust any value in Detailed review.`})]}):null]})]}),(0,P.jsx)(`section`,{className:`panel advice-card`,"aria-labelledby":`advice-title`,children:(0,P.jsxs)(`div`,{className:`panel-body advice-body`,children:[(0,P.jsxs)(`div`,{className:`advice-eyebrow`,children:[(0,P.jsx)(`span`,{className:`hero-label`,children:`Advice`}),(0,P.jsx)(`span`,{className:`confidence`,"data-level":y.confidence,children:y.confidence===`high`?`High confidence`:y.confidence===`medium`?`Medium confidence`:`Low confidence`})]}),(0,P.jsx)(`h2`,{id:`advice-title`,className:`advice-headline`,children:y.headline}),y.summary?(0,P.jsx)(`p`,{className:`advice-summary`,children:y.summary}):null,(0,P.jsx)(`p`,{className:`small muted`,children:He(y)}),y.problems.length?(0,P.jsxs)(`div`,{className:`advice-section problems`,role:`alert`,children:[(0,P.jsx)(`h3`,{children:`Fix these inputs first`}),(0,P.jsx)(`ul`,{className:`advice-list`,children:y.problems.map(e=>(0,P.jsxs)(`li`,{children:[e.message,` The model has `,A(e.key,e.value),`; check the units.`]},e.key))})]}):null,(0,P.jsxs)(`div`,{className:`advice-figures`,children:[(0,P.jsxs)(`div`,{className:`stat`,children:[(0,P.jsx)(`span`,{className:`stat-label`,children:`Corrected result (NPV)`}),(0,P.jsxs)(`span`,{className:`stat-value`,children:[x?`RECs`:`VPPA`,` by `,D(Math.abs(y.corrected.npvAdvantage))]}),(0,P.jsxs)(`span`,{className:`stat-label`,children:[`As submitted: `,y.submitted.recommendation===`RECs`?`RECs`:`VPPA`,` by `,D(Math.abs(y.submitted.npvAdvantage))]})]}),(0,P.jsxs)(`div`,{className:`stat`,children:[(0,P.jsx)(`span`,{className:`stat-label`,children:x?`VPPA wins below`:`VPPA wins up to`}),(0,P.jsx)(`span`,{className:`stat-value`,children:Number.isFinite(y.breakEvenStrike)?k(y.breakEvenStrike):`—`}),(0,P.jsxs)(`span`,{className:`stat-label`,children:[`strike, offered `,k(b.strikePrice)]})]}),(0,P.jsxs)(`div`,{className:`stat`,children:[(0,P.jsx)(`span`,{className:`stat-label`,children:y.premiumPerMWh>0?`VPPA premium over RECs`:`VPPA saving over RECs`}),(0,P.jsx)(`span`,{className:`stat-value`,children:Number.isFinite(y.premiumPerMWh)?k(Math.abs(y.premiumPerMWh)):`—`}),(0,P.jsx)(`span`,{className:`stat-label`,children:`per MWh of project output`})]})]}),y.corrections.length?(0,P.jsxs)(`div`,{className:`advice-section`,children:[(0,P.jsx)(`h3`,{children:`Assumptions corrected`}),(0,P.jsx)(`div`,{className:`table-scroll`,children:(0,P.jsxs)(`table`,{className:`compare`,children:[(0,P.jsx)(`thead`,{children:(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`th`,{scope:`col`,children:`Assumption`}),(0,P.jsx)(`th`,{scope:`col`,children:`Model`}),(0,P.jsx)(`th`,{scope:`col`,children:`Used`}),(0,P.jsx)(`th`,{scope:`col`,children:`Effect on its own`})]})}),(0,P.jsx)(`tbody`,{children:y.corrections.map(e=>{let t=e.rule.benchmark;return(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`th`,{scope:`row`,children:w[t.input]?.label??t.input}),(0,P.jsx)(`td`,{className:`col-submitted`,children:A(t.input,b[t.input])}),(0,P.jsx)(`td`,{children:A(t.input,t.value)}),(0,P.jsxs)(`td`,{children:[Ne(e.impact?.delta??0),e.impact?.flips?(0,P.jsx)(`span`,{className:`flip`,children:` ⇄ reverses`}):null]})]},e.rule.id)})})]})}),(0,P.jsxs)(`ul`,{className:`advice-list`,children:[y.corrections.map(e=>(0,P.jsxs)(`li`,{children:[(0,P.jsxs)(`strong`,{children:[e.rule.title,`.`]}),` `,e.message,` `,(0,P.jsx)(`span`,{className:`muted`,children:e.rule.why})]},e.rule.id)),y.superseded.map(e=>(0,P.jsxs)(`li`,{className:`muted`,children:[e.rule.title,` suggested `,A(e.rule.benchmark.input,e.rule.benchmark.value),`; the more serious check above takes precedence.`]},e.rule.id))]})]}):(0,P.jsx)(`p`,{className:`advice-section`,children:`No assumption needed correcting. The model’s own numbers stand.`}),y.kept.length?(0,P.jsxs)(`div`,{className:`advice-section`,children:[(0,P.jsx)(`h3`,{children:`Flagged but kept by the reviewer`}),(0,P.jsx)(`ul`,{className:`advice-list`,children:y.kept.map(e=>(0,P.jsxs)(`li`,{children:[(0,P.jsxs)(`strong`,{children:[e.rule.title,`.`]}),` `,e.message]},e.rule.id))})]}):null,S.length?(0,P.jsxs)(`div`,{className:`advice-section`,children:[(0,P.jsx)(`h3`,{children:`What would change the answer`}),(0,P.jsx)(`ul`,{className:`advice-list`,children:S.map(e=>(0,P.jsx)(`li`,{children:e},e))})]}):null,y.questions.length?(0,P.jsxs)(`div`,{className:`advice-section`,children:[(0,P.jsxs)(`h3`,{children:[`Questions for `,ee||`whoever built the model`]}),(0,P.jsx)(`ol`,{className:`advice-list`,children:y.questions.map(e=>(0,P.jsxs)(`li`,{children:[e.rule.ask||e.message,` `,(0,P.jsxs)(`span`,{className:`muted`,children:[`(`,e.rule.title,`)`]})]},e.rule.id))})]}):null,y.notes.length?(0,P.jsxs)(`div`,{className:`advice-section`,children:[(0,P.jsx)(`h3`,{children:`Also worth checking`}),(0,P.jsx)(`ul`,{className:`advice-list`,children:y.notes.map(e=>(0,P.jsxs)(`li`,{children:[(0,P.jsxs)(`strong`,{children:[e.rule.title,`.`]}),` `,e.message,e.impact&&e.rule.benchmark?` Using ${e.rule.benchmark.label} would move the result ${Ne(e.impact.delta)}.`:``]},e.rule.id))})]}):null,y.assumed.length||y.rejected.length?(0,P.jsxs)(`div`,{className:`advice-section`,children:[(0,P.jsx)(`h3`,{children:`Filled in for you`}),(0,P.jsx)(`ul`,{className:`advice-list`,children:Ge(y).map(e=>(0,P.jsx)(`li`,{children:e},e))})]}):null,f().generatedAt?(0,P.jsxs)(`p`,{className:`small muted`,children:[`Benchmarks use public market data refreshed `,f().generatedAt.slice(0,10),` (inflation, interest rates, cost of capital, grid prices, solar and wind output). Sources are under How it works.`]}):null,(0,P.jsxs)(`p`,{className:`leaves-out`,children:[(0,P.jsx)(`strong`,{children:`Not in the numbers:`}),` the VPPA’s value as a long-term price hedge, earnings volatility if it is marked to market, and the stronger impact claim that comes from helping finance a new project.`]}),(0,P.jsx)(Dt,{text:()=>We(y),filename:`advice.md`,copyLabel:`Copy advice`,children:(0,P.jsx)(`button`,{type:`button`,className:`btn btn-quiet`,onClick:r,children:`Open the detailed review →`})})]})})]})}function Nt({submitted:e,reviewed:t}){let[n,r]=(0,l.useState)(`reviewed`),i=(n===`reviewed`?t:e).rows;return(0,P.jsxs)(`details`,{className:`disclosure`,children:[(0,P.jsx)(`summary`,{children:`Year-by-year table`}),(0,P.jsxs)(`div`,{style:{display:`grid`,gap:10},children:[(0,P.jsx)(Et,{label:`Scenario shown in the table`,value:n,onChange:r,options:[{value:`reviewed`,label:`After review`},{value:`submitted`,label:`As submitted`}]}),(0,P.jsx)(`div`,{className:`table-scroll`,style:{maxHeight:420},children:(0,P.jsxs)(`table`,{className:`data-table`,children:[(0,P.jsx)(`thead`,{children:(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`th`,{scope:`col`,children:`Year`}),(0,P.jsx)(`th`,{scope:`col`,children:`Generation (MWh)`}),(0,P.jsx)(`th`,{scope:`col`,children:`Hub ($/MWh)`}),(0,P.jsx)(`th`,{scope:`col`,children:`Project value ($/MWh)`}),(0,P.jsx)(`th`,{scope:`col`,children:`Strike ($/MWh)`}),(0,P.jsx)(`th`,{scope:`col`,children:`Settlement`}),(0,P.jsx)(`th`,{scope:`col`,children:`REC ($/MWh)`}),(0,P.jsx)(`th`,{scope:`col`,children:`VPPA path cost`}),(0,P.jsx)(`th`,{scope:`col`,children:`REC path cost`})]})}),(0,P.jsx)(`tbody`,{children:i.map(e=>(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{children:e.year}),(0,P.jsx)(`td`,{children:re(e.generationMWh)}),(0,P.jsx)(`td`,{children:e.hubPrice.toFixed(2)}),(0,P.jsx)(`td`,{children:e.settlementPrice.toFixed(2)}),(0,P.jsx)(`td`,{children:e.strikePrice.toFixed(2)}),(0,P.jsx)(`td`,{className:e.settlement<0?`neg`:void 0,children:D(e.settlement,{sign:!0})}),(0,P.jsx)(`td`,{children:e.recPrice.toFixed(2)}),(0,P.jsx)(`td`,{children:D(e.vppaCost)}),(0,P.jsx)(`td`,{children:D(e.recCost)})]},e.year))})]})}),(0,P.jsx)(`p`,{className:`small muted`,children:`VPPA path cost = payments to the developer (negative settlement) plus RECs bought for load the project does not cover. Transaction costs are counted at signing, outside this table.`})]})]})}var Pt=[{title:`Contract`,fields:[{key:`strikePrice`,label:`Strike price`,prefix:`$`,suffix:`/MWh`},{key:`strikeEscalation`,label:`Strike escalator`,percent:!0,suffix:`%/yr`},{key:`termYears`,label:`Term`,suffix:`years`},{key:`transactionCost`,label:`Transaction costs`,prefix:`$`}]},{title:`Project`,fields:[{key:`capacityMW`,label:`Size`,suffix:`MW`},{key:`capacityFactor`,label:`Capacity factor`,percent:!0,suffix:`%`},{key:`degradation`,label:`Degradation`,percent:!0,suffix:`%/yr`}]},{title:`Market`,fields:[{key:`hubPrice`,label:`Hub price, year 1`,prefix:`$`,suffix:`/MWh`,help:`Around-the-clock average`},{key:`wholesaleEscalation`,label:`Wholesale escalation`,percent:!0,suffix:`%/yr`},{key:`captureRate`,label:`Capture rate`,percent:!0,suffix:`%`,help:`Project’s output-weighted price vs. the average`}]},{title:`RECs, load & finance`,fields:[{key:`annualLoadMWh`,label:`Annual load`,suffix:`MWh`},{key:`recPrice`,label:`REC price, year 1`,prefix:`$`,suffix:`/MWh`},{key:`recEscalation`,label:`REC escalation`,percent:!0,suffix:`%/yr`},{key:`discountRate`,label:`Discount rate`,percent:!0,suffix:`%`}]}],Ft=[{key:`accountingReviewed`,label:`Accounting has assessed derivative treatment (ASC 815 / IFRS 9)`},{key:`creditSupportReviewed`,label:`Credit support or collateral terms are known`},{key:`negativePriceTermsReviewed`,label:`Negative-price and curtailment terms reviewed`},{key:`marketBoundaryConfirmed`,label:`RECs come from the same market as the load`},{key:`scope2RevisionConsidered`,label:`GHG Protocol Scope 2 revision considered`}];function It({inputs:e,onChange:t,flags:n,errors:r,onLoadExample:i}){let a=(n,r)=>t({...e,[n]:r}),o=t=>(0,P.jsx)(Tt,{id:`in-${t.key}`,label:t.label,value:e[t.key],percent:t.percent,prefix:t.prefix,suffix:t.suffix,help:t.help,flag:n[t.key],error:r[t.key],onChange:e=>a(t.key,e)},t.key);return(0,P.jsxs)(`section`,{className:`panel`,"aria-labelledby":`assumptions-title`,children:[(0,P.jsxs)(`div`,{className:`panel-head`,children:[(0,P.jsx)(`h2`,{id:`assumptions-title`,children:`Assumptions`}),(0,P.jsx)(`span`,{className:`sub`,children:`as submitted`})]}),(0,P.jsxs)(`div`,{className:`panel-body`,children:[(0,P.jsxs)(`div`,{className:`btn-row`,children:[(0,P.jsx)(`button`,{type:`button`,className:`btn`,onClick:()=>i(`example`),children:`Load the 7.5% example`}),(0,P.jsx)(`button`,{type:`button`,className:`btn btn-quiet`,onClick:()=>i(`benchmark`),children:`Load benchmark version`})]}),(0,P.jsxs)(`div`,{className:`ledger-group`,children:[(0,P.jsxs)(`label`,{className:`field`,htmlFor:`in-scenarioName`,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Scenario`}),(0,P.jsx)(`input`,{id:`in-scenarioName`,className:`input`,value:e.scenarioName,onChange:e=>a(`scenarioName`,e.target.value)})]}),(0,P.jsxs)(`label`,{className:`field`,htmlFor:`in-assumptionOwner`,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Assumptions supplied by`}),(0,P.jsx)(`input`,{id:`in-assumptionOwner`,className:`input`,value:e.assumptionOwner,placeholder:`Advisor, analyst, or team`,onChange:e=>a(`assumptionOwner`,e.target.value)})]}),(0,P.jsxs)(`div`,{className:`grid-2`,children:[(0,P.jsxs)(`label`,{className:`field`,htmlFor:`in-technology`,"data-flag":n.technology,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Technology`}),(0,P.jsxs)(`select`,{id:`in-technology`,className:`select`,value:e.technology,onChange:e=>a(`technology`,e.target.value),children:[(0,P.jsx)(`option`,{value:`solar`,children:`Solar`}),(0,P.jsx)(`option`,{value:`wind`,children:`Wind`})]})]}),(0,P.jsxs)(`label`,{className:`field`,htmlFor:`in-market`,"data-flag":n.market,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Market`}),(0,P.jsx)(`select`,{id:`in-market`,className:`select`,value:e.market,onChange:e=>a(`market`,e.target.value),children:pe.map(e=>(0,P.jsx)(`option`,{value:e,children:e},e))})]})]})]}),Pt.map(t=>(0,P.jsxs)(`div`,{className:`ledger-group`,children:[(0,P.jsx)(`div`,{className:`ledger-title`,children:t.title}),(0,P.jsxs)(`div`,{className:`grid-2`,children:[t.fields.map(o),t.title===`Contract`?(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)(`label`,{className:`field`,htmlFor:`in-settlementPoint`,"data-flag":n.settlementPoint,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Settles at`}),(0,P.jsxs)(`select`,{id:`in-settlementPoint`,className:`select`,value:e.settlementPoint,onChange:e=>a(`settlementPoint`,e.target.value),children:[(0,P.jsx)(`option`,{value:`hub`,children:`Hub`}),(0,P.jsx)(`option`,{value:`node`,children:`Project node`})]})]}),e.settlementPoint===`node`?o({key:`basis`,label:`Basis (node − hub)`,prefix:`$`,suffix:`/MWh`}):null]}):null]})]},t.title)),(0,P.jsxs)(`div`,{className:`ledger-group`,children:[(0,P.jsx)(`div`,{className:`ledger-title`,children:`Diligence`}),Ft.map(t=>(0,P.jsxs)(`label`,{className:`check`,htmlFor:`in-${t.key}`,children:[(0,P.jsx)(`input`,{id:`in-${t.key}`,type:`checkbox`,checked:e.diligence[t.key],onChange:n=>a(`diligence`,{...e.diligence,[t.key]:n.target.checked})}),(0,P.jsxs)(`span`,{children:[t.label,n[t.key]?(0,P.jsxs)(P.Fragment,{children:[` `,(0,P.jsx)(`span`,{className:`flag-dot`,"data-sev":n[t.key]})]}):null]})]},t.key))]})]})]})}var Lt={ok:`Updated`,stale:`Using last good copy`,failed:`Unavailable`,skipped:`Needs a free key`};function Rt(){let e=f(),t=pe.filter(t=>e.markets?.[t]||e.onPeak?.[t]||e.solarSites?.[t]);return(0,P.jsxs)(`section`,{className:`panel`,"aria-labelledby":`data-title`,children:[(0,P.jsxs)(`div`,{className:`panel-head`,children:[(0,P.jsx)(`h2`,{id:`data-title`,children:`Live market data`}),(0,P.jsx)(`span`,{className:`sub`,children:e.generatedAt?`refreshed ${e.generatedAt.slice(0,10)}, weekly`:`not yet refreshed`})]}),(0,P.jsxs)(`div`,{className:`panel-body`,children:[(0,P.jsx)(`p`,{className:`small`,children:`A weekly job pulls these public sources, and the checks compare each model against them. Strike and REC prices have no free public source; Claude looks those up on the web when it runs the skill.`}),(0,P.jsxs)(`div`,{className:`data-figures`,children:[e.inflation?(0,P.jsxs)(`div`,{className:`stat`,children:[(0,P.jsx)(`span`,{className:`stat-label`,children:`Inflation markets expect, 10 years`}),(0,P.jsx)(`span`,{className:`stat-value`,children:O(e.inflation.breakeven10y)}),(0,P.jsxs)(`span`,{className:`stat-label`,children:[`Last 12 months: `,O(e.inflation.cpiYoY),`. 2022 peak: `,O(e.inflation.cpiPeak2022),`.`]})]}):null,e.rates?(0,P.jsxs)(`div`,{className:`stat`,children:[(0,P.jsx)(`span`,{className:`stat-label`,children:`10-year Treasury yield`}),(0,P.jsx)(`span`,{className:`stat-value`,children:O(e.rates.treasury10y)}),(0,P.jsxs)(`span`,{className:`stat-label`,children:[`Baa corporate bonds: `,O(e.rates.baaCorporate)]})]}):null,e.costOfCapital?(0,P.jsxs)(`div`,{className:`stat`,children:[(0,P.jsx)(`span`,{className:`stat-label`,children:`US cost of capital`}),(0,P.jsx)(`span`,{className:`stat-value`,children:O(e.costOfCapital.totalMarket)}),(0,P.jsxs)(`span`,{className:`stat-label`,children:[`Industries: `,O(e.costOfCapital.p10),` to `,O(e.costOfCapital.p90)]})]}):null,e.capacityFactors?(0,P.jsxs)(`div`,{className:`stat`,children:[(0,P.jsx)(`span`,{className:`stat-label`,children:`US fleet capacity factor`}),(0,P.jsxs)(`span`,{className:`stat-value`,children:[O(e.capacityFactors.solar),` solar · `,O(e.capacityFactors.wind),` wind`]}),(0,P.jsx)(`span`,{className:`stat-label`,children:e.capacityFactors.period})]}):null]}),t.length?(0,P.jsx)(`div`,{className:`table-scroll`,children:(0,P.jsxs)(`table`,{className:`data-table`,children:[(0,P.jsx)(`thead`,{children:(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`th`,{scope:`col`,children:`Market`}),(0,P.jsx)(`th`,{scope:`col`,children:`Hub`}),(0,P.jsx)(`th`,{scope:`col`,children:`Avg price`}),(0,P.jsx)(`th`,{scope:`col`,children:`On-peak`}),(0,P.jsx)(`th`,{scope:`col`,children:`Negative hours`}),(0,P.jsx)(`th`,{scope:`col`,children:`Solar capture`}),(0,P.jsx)(`th`,{scope:`col`,children:`Wind capture`}),(0,P.jsx)(`th`,{scope:`col`,children:`Solar CF here`})]})}),(0,P.jsx)(`tbody`,{children:t.map(t=>{let n=e.markets?.[t];return(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{children:t}),(0,P.jsx)(`td`,{children:n?.hub??`—`}),(0,P.jsx)(`td`,{children:n?k(n.atcPrice):`—`}),(0,P.jsx)(`td`,{children:e.onPeak?.[t]?k(e.onPeak[t].onPeakPrice):`—`}),(0,P.jsx)(`td`,{children:n?O(n.negativeHourShare):`—`}),(0,P.jsx)(`td`,{children:n?.solarCapture===void 0?`—`:O(n.solarCapture)}),(0,P.jsx)(`td`,{children:n?.windCapture===void 0?`—`:O(n.windCapture)}),(0,P.jsx)(`td`,{children:e.solarSites?.[t]?O(e.solarSites[t].capacityFactorAC):`—`})]},t)})})]})}):null,e.window?(0,P.jsxs)(`p`,{className:`small muted`,children:[`Prices are day-ahead, `,e.window.start,` to `,e.window.end,`. Texas uses every hour; other markets use one day every`,` `,e.window.sampledEveryDays,` days. Capture rates weight each hour’s hub price by that market’s total solar or wind output (EIA-930), so a single project can differ.`]}):null,e.sources?.length?(0,P.jsx)(`ul`,{className:`sources`,children:e.sources.map(e=>(0,P.jsxs)(`li`,{children:[(0,P.jsx)(`span`,{className:`badge`,"data-kind":e.status===`ok`?`team`:void 0,children:Lt[e.status]}),` `,e.url?(0,P.jsx)(`a`,{href:e.url,target:`_blank`,rel:`noreferrer`,style:{color:`var(--accent)`},children:e.name}):e.name,e.status!==`ok`&&e.detail?(0,P.jsxs)(`span`,{className:`muted`,children:[` (`,e.detail,`)`]}):null]},e.id))}):null]})]})}var zt=[{label:`LevelTen Energy PPA Price Index, North America, Q1 2026 (solar P25 $64.49/MWh; wind $79.40/MWh), via pv magazine`,href:`https://pv-magazine-usa.com/2026/04/20/permitting-headwinds-and-geopolitics-drive-solar-ppa-prices-higher-in-q/`},{label:`LevelTen Energy, Q2 2026 North America report (solar market average $61.40/MWh), via TaiyangNews`,href:`https://taiyangnews.info/business/levelten-energy-q2-2026-report-for-north-america-europe`},{label:`Modo Energy: CAISO solar capture price and capture rate, spring 2026`,href:`https://modoenergy.com/research/en/caiso-solar-capture-price-capture-rate-spring-2026`},{label:`S&P Global: REC price assessments (NY Tier 1 $41/MWh for 2024; national wind RECs $4.50/MWh for 2025 vintage)`,href:`https://www.spglobal.com/commodity-insights/en/news-research/latest-news/energy-transition/080525-new-yorks-energy-transition-road-map-to-have-a-bullish-effect-on-rec-demand-prices`},{label:`US EPA: Unbundled RECs and historical voluntary REC prices`,href:`https://epa.gov/lmop/unbundle-electricity-and-renewable-energy-certificates`},{label:`GHG Protocol: Scope 2 revision, public consultation October 2025 to January 2026`,href:`https://ghgprotocol.org/`},{label:`EIA Electric Power Monthly (capacity factors); NREL photovoltaic degradation studies; RE100 technical criteria`}];function Bt({checkCount:e}){return(0,P.jsxs)(`div`,{className:`how`,children:[(0,P.jsx)(`section`,{className:`panel`,children:(0,P.jsxs)(`div`,{className:`panel-body`,style:{gap:18},children:[(0,P.jsx)(`p`,{className:`pull`,children:`Each catch only has to be made once.`}),(0,P.jsx)(`p`,{className:`lede`,children:`A good reviewer notices when a model quietly assumes something unrealistic, like wholesale power prices rising 7.5% a year for fifteen years. That knowledge usually lives in one person’s head and gets applied when they happen to look. This app writes it down as checks, runs them before any result is shown, and still leaves the final call to a named person.`}),(0,P.jsxs)(`div`,{className:`how-cols`,children:[(0,P.jsxs)(`div`,{style:{display:`grid`,gap:10},children:[(0,P.jsx)(`h3`,{children:`What the software does`}),(0,P.jsxs)(`ul`,{children:[(0,P.jsx)(`li`,{children:`Runs the VPPA vs. REC comparison on the assumptions as submitted.`}),(0,P.jsxs)(`li`,{children:[`Tests every assumption against the playbook (`,e,` checks) every time, in the same order.`]}),(0,P.jsx)(`li`,{children:`Prices each problem: how far the benchmark value moves the answer, and whether it reverses the recommendation.`}),(0,P.jsx)(`li`,{children:`Drafts the memo back to whoever supplied the assumptions, with sources and questions.`})]})]}),(0,P.jsxs)(`div`,{style:{display:`grid`,gap:10},children:[(0,P.jsx)(`h3`,{children:`What the reviewer does`}),(0,P.jsxs)(`ul`,{children:[(0,P.jsx)(`li`,{children:`Decides each flag. A flagged value can still be right because of a contract clause or a market event the model can’t see. Keeping it needs a written reason.`}),(0,P.jsx)(`li`,{children:`Signs the result. A name goes on it, and the sign-off goes out of date if anything changes afterwards.`}),(0,P.jsx)(`li`,{children:`Takes the argument back to the people who made the assumption.`}),(0,P.jsx)(`li`,{children:`Teaches the playbook. Anything the checks missed becomes a new check.`})]})]})]})]})}),(0,P.jsxs)(`section`,{className:`panel`,children:[(0,P.jsx)(`div`,{className:`panel-head`,children:(0,P.jsx)(`h2`,{children:`Skip the app: ask Claude`})}),(0,P.jsxs)(`div`,{className:`panel-body`,children:[(0,P.jsxs)(`ol`,{style:{margin:0,paddingLeft:`1.2em`,display:`grid`,gap:8},children:[(0,P.jsxs)(`li`,{children:[`In the Playbook tab, choose `,(0,P.jsx)(`strong`,{children:`Download skill (.zip)`}),`. It carries every check, including the ones your team added, and the same calculator this page uses.`]}),(0,P.jsx)(`li`,{children:`Upload the zip to Claude as a skill.`}),(0,P.jsx)(`li`,{children:`Give Claude the model in whatever form you have it (spreadsheet, PDF, slide, or pasted numbers) and ask which option is better.`})]}),(0,P.jsx)(`p`,{className:`small`,children:`Claude pulls out the assumptions, runs the checks and the calculator, and answers with the same advice as the Advice tab: the recommendation, how sure it is, what it corrected, what would change the answer, and the questions to send back. It then adds anything it noticed that the checks don’t cover yet.`})]})]}),(0,P.jsxs)(`section`,{className:`panel`,children:[(0,P.jsx)(`div`,{className:`panel-head`,children:(0,P.jsx)(`h2`,{children:`How a lesson becomes a check`})}),(0,P.jsx)(`div`,{className:`panel-body`,children:(0,P.jsxs)(`ol`,{style:{margin:0,paddingLeft:`1.2em`,display:`grid`,gap:8},children:[(0,P.jsx)(`li`,{children:`A review catches something new: say, a model that escalates wholesale prices at 7.5% a year.`}),(0,P.jsx)(`li`,{children:`The reviewer adds it in the Playbook tab: the condition, a benchmark (2.75%), why it matters, and the source.`}),(0,P.jsx)(`li`,{children:`From then on it runs on every scenario, and the exported Claude skill carries it too, so Claude raises it before presenting an analysis.`}),(0,P.jsx)(`li`,{children:`The reviewer’s attention moves to whatever no check covers yet. The second-look panel asks Claude for leads there, and a person decides which ones to keep.`})]})})]}),(0,P.jsx)(Rt,{}),(0,P.jsxs)(`section`,{className:`panel`,children:[(0,P.jsx)(`div`,{className:`panel-head`,children:(0,P.jsx)(`h2`,{children:`Other references`})}),(0,P.jsxs)(`div`,{className:`panel-body`,children:[(0,P.jsx)(`p`,{className:`small`,children:`Used for checks without a free data feed (strike and REC prices, degradation, Scope 2). Benchmarks are starting points with dates, not facts about your deal. Check them against your advisor’s data.`}),(0,P.jsx)(`ul`,{className:`sources`,children:zt.map(e=>(0,P.jsx)(`li`,{children:e.href?(0,P.jsx)(`a`,{href:e.href,target:`_blank`,rel:`noreferrer`,style:{color:`var(--accent)`},children:e.label}):e.label},e.label))})]})]})]})}var Vt=`vppa-rec-assumption-review`;function Ht(e,t={}){let n=[],r=e.filter(e=>e.origin===`team`);n.push(`---`),n.push(`name: ${Vt}`),n.push(`description: Give a clear recommendation on a VPPA vs. unbundled REC decision from whatever the user provides (spreadsheet, PDF, deck, email, or pasted numbers). Extracts the assumptions, corrects unrealistic ones against checks written by experienced reviewers, and reports the better option, how sure it is, what would change it, and what to ask the model’s owner. Use for any VPPA, virtual PPA, renewable PPA, or REC procurement analysis.`),n.push(`---`),n.push(``),n.push(`# VPPA vs. REC advisor`),n.push(``),n.push(`A procurement model can be arithmetically right and still give the wrong answer because one assumption is off, like wholesale prices rising 7.5% a year for fifteen years. This skill holds the checks experienced reviewers apply and a small calculator that runs them. The user should get one clear piece of advice, not a list of things to work out themselves.`),n.push(``),n.push(`## Procedure`),n.push(``),n.push('1. **Extract.** Read what the user gave you and write the assumptions to `inputs.json` using the keys in "Input keys" below. Convert units: percentages as fractions (7.5% → 0.075), prices in $/MWh, energy in MWh per year. If the source gives annual generation instead of a capacity factor, use `annualGenerationMWh`. Leave out anything the source doesn’t state; the calculator fills gaps and reports them.'),n.push("2. **Run.** From this skill’s folder: `node scripts/preflight.mjs inputs.json`. It runs every check below (plus any `team-checks.json` in this folder), replaces clearly unrealistic values with benchmarks, runs the cost model both ways, and prints the advice as Markdown. Add `--json` for structured output."),n.push(`3. **Advise.** Reply with the calculator’s advice: the recommendation and confidence first, then the assumptions it corrected and what each did to the answer, then what would change the answer, then the questions for whoever built the model. Use its numbers; don’t recompute them by hand.`),n.push(`4. **Add your own read.** After the advice, note anything in the source that the checks don’t cover (contract clauses, counterparty, location, market specifics), labeled as your observations. If one of them should be checked every time, propose it as a new check in the format below.`),n.push(`5. **Flag uncertain extraction.** If you had to guess a value (an unlabeled cell, an ambiguous unit), say so, re-run with the other reading, and report whether the recommendation changes.`),n.push(``),n.push(`If Node isn’t available, apply the checks by hand: evaluate each check’s conditions, swap in the benchmark for every critical or warning finding that has one, compare the corrected cost of each option, and present the result in the same order as step 3.`),n.push(``),n.push(`Benchmarks come from public market data refreshed weekly (see "Market data" below) or, where no free source exists, from dated defaults. Strike and REC prices have no free feed: search the web for the latest LevelTen PPA Price Index and a current REC quote for the right product, tell the user what you found, and compare them with the model.`),n.push(``),n.push(...Kt()),n.push(`## Input keys`),n.push(``),n.push(`Keys marked **needed** are the minimum for useful advice; anything missing is filled with a benchmark and listed so the user can firm it up. A value outside its valid range is rejected as an error (usually a unit mix-up) and replaced the same way. When you extract a number, note where it came from; the "Best source" column says what a reliable one looks like.`),n.push(``),n.push(`| Key | Meaning | Unit | Needed | Valid range | Best source | If missing |`),n.push(`|---|---|---|---|---|---|---|`);for(let e of C.filter(e=>e.kind===`input`)){let t=Ut[e.format]??(e.options?e.options.join(`, `):``),r=e.range?`${A(e.key,e.range[0])} to ${A(e.key,e.range[1])}`:``;n.push(`| \`${e.key}\` | ${e.label}: ${e.help} | ${t} | ${e.core?`needed`:``} | ${r} | ${e.source??``} | ${Wt[e.key]??`Benchmark, reported as assumed`} |`)}n.push("| `annualGenerationMWh` | Annual generation, in place of size or capacity factor | MWh per year | | | Energy yield assessment (P50) | Derived from size × capacity factor |"),n.push("| `scenarioName`, `assumptionOwner` | Name of the deal; who supplied the assumptions | text | | | | Generic name; questions addressed generically |"),n.push(``),n.push(`When two checks suggest different values for the same input, the more serious check wins (critical over warning, then the larger effect on the result). The calculator does this for you.`),n.push(``),n.push("See `example-inputs.json` for a complete example."),n.push(``),n.push(`## Checks (${e.length})`),r.length&&(n.push(``),n.push(`${r.length} of these were added by reviewers after real reviews.`));for(let t of he){let r=e.filter(e=>e.category===t);if(r.length){n.push(``),n.push(`### ${t}`);for(let e of r)n.push(``),n.push(`#### ${e.id}: ${e.title} (${e.severity})`),n.push(``),n.push(`- **Fires when:** ${e.when.map(ce).join(` AND `)}`),n.push(`- **Report:** ${e.message}`),n.push(`- **Why:** ${e.why}`),e.benchmark?.data?n.push(`- **Benchmark:** from current market data (see "Market data"); the calculator fills it in. Default when data is missing: ${e.benchmark.label} (\`${e.benchmark.input}\` = ${A(e.benchmark.input,e.benchmark.value)})`):e.benchmark&&n.push(`- **Benchmark:** ${e.benchmark.label} (set \`${e.benchmark.input}\` = ${A(e.benchmark.input,e.benchmark.value)})`),e.ask&&n.push(`- **Ask:** ${e.ask}`),e.source&&n.push(`- **Source:** ${e.source}`),e.lesson&&n.push(`- **Origin:** ${e.lesson}`),e.origin===`team`&&n.push(`- **Added by:** ${e.addedBy||`a reviewer`}${e.addedOn?`, ${e.addedOn}`:``}`)}}n.push(``),n.push(`## Fact reference`),n.push(``),n.push(`Every value a check can test, including calculated ones. Use these names when proposing a new check. Rates are fractions (0.075 = 7.5%); prices are $/MWh.`),n.push(``),n.push(`| Fact | Meaning | Kind |`),n.push(`|---|---|---|`);for(let e of C)n.push(`| \`${e.key}\` | ${e.label}: ${e.help} | ${e.kind} |`);return n.push(``),n.push(`## Machine-readable checks`),n.push(``),n.push("```json"),n.push(JSON.stringify(e.map(Gt),null,2)),n.push("```"),t.generatedOn&&(n.push(``),n.push(`_Generated by PPA Preflight on ${t.generatedOn}._`)),n.push(``),n.join(`
`)}var Ut={pct:`fraction (0.075 = 7.5%)`,perMWh:`$/MWh`,usd:`$`,mwh:`MWh per year`,mw:`MW (AC)`,years:`years`,bool:`true / false`},Wt={technology:`solar`,market:`Other`,settlementPoint:`hub`,degradation:`Treated as not modeled (0), so the check fires`,captureRate:`Treated as not modeled (100%), so the check fires`,transactionCost:`Treated as not modeled ($0), so the check fires`,basis:`0`,strikeEscalation:`0 (flat strike)`,annualLoadMWh:`Year-1 generation (project sized to load), reported as assumed`,accountingReviewed:`false (unknown), so it becomes a question`,creditSupportReviewed:`false (unknown), so it becomes a question`,negativePriceTermsReviewed:`false (unknown), so it becomes a question`,marketBoundaryConfirmed:`false (unknown), so it becomes a question`,scope2RevisionConsidered:`false (unknown), so it becomes a question`};function Gt(e){let{id:t,title:n,severity:r,category:i,when:a,benchmark:o}=e;return{id:t,title:n,severity:r,category:i,when:a,...o?{benchmark:{input:o.input,value:o.value}}:{}}}function Kt(){let e=f();if(!e.generatedAt)return[];let t=[`## Market data (refreshed ${e.generatedAt.slice(0,10)})`,``];t.push(`The calculator already uses these. Quote them when you explain a correction.`),t.push(``),e.inflation&&t.push(`- Inflation bond markets expect over 10 years: ${O(e.inflation.breakeven10y)}. Last 12 months (CPI, ${e.inflation.cpiYoYMonth}): ${O(e.inflation.cpiYoY)}. 2022 peak: ${O(e.inflation.cpiPeak2022)}. _(${e.inflation.source}, ${e.inflation.asOf})_`),e.rates&&t.push(`- 10-year Treasury: ${O(e.rates.treasury10y)}; Baa corporate bonds: ${O(e.rates.baaCorporate)}. _(${e.rates.source}, ${e.rates.asOf})_`),e.costOfCapital&&t.push(`- US cost of capital: ${O(e.costOfCapital.totalMarket)} overall; ${O(e.costOfCapital.p10)} to ${O(e.costOfCapital.p90)} across ${e.costOfCapital.industries} industries. _(${e.costOfCapital.source}, ${e.costOfCapital.asOf})_`),e.capacityFactors&&t.push(`- US fleet capacity factors: solar ${O(e.capacityFactors.solar)}, wind ${O(e.capacityFactors.wind)}, ${e.capacityFactors.period}. _(${e.capacityFactors.source})_`);let n=Object.entries(e.markets??{});if(n.length){t.push(``),t.push(`| Market | Hub | Avg day-ahead price | Negative-price hours | Solar capture | Wind capture | Period |`),t.push(`|---|---|---|---|---|---|---|`);for(let[e,r]of n)r&&t.push(`| ${e} | ${r.hub} | ${k(r.atcPrice)} | ${O(r.negativeHourShare)} | ${r.solarCapture===void 0?`n/a`:O(r.solarCapture)} | ${r.windCapture===void 0?`n/a`:O(r.windCapture)} | ${r.period} |`)}let r=(e.sources??[]).filter(e=>e.status!==`ok`);return r.length&&(t.push(``),t.push(`Not refreshed this time: ${r.map(e=>`${e.name} (${e.status})`).join(`; `)}.`)),t.push(``),t}var qt=`{
  "scenarioName": "Example: 80 MW solar VPPA vs. unbundled RECs",
  "assumptionOwner": "Procurement advisor",
  "technology": "solar",
  "market": "PJM",
  "capacityMW": 80,
  "capacityFactor": 0.24,
  "degradation": 0,
  "termYears": 15,
  "strikePrice": 63,
  "strikeEscalation": 0,
  "settlementPoint": "hub",
  "transactionCost": 0,
  "hubPrice": 48,
  "wholesaleEscalation": 0.075,
  "captureRate": 1,
  "annualLoadMWh": 180000,
  "recPrice": 4.5,
  "recEscalation": 0.02,
  "discountRate": 0.08,
  "accountingReviewed": true,
  "creditSupportReviewed": true,
  "negativePriceTermsReviewed": false,
  "marketBoundaryConfirmed": true,
  "scope2RevisionConsidered": false
}
`,Jt=`// Generated from src/engine by \`npm run build:skill\`. Do not edit by hand.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
// src/engine/marketData.ts
var current = {
	inflation: {
		"breakeven10y": .0235,
		"forward5y5y": .0231,
		"cpiYoY": .0402,
		"cpiYoYMonth": "2026-09",
		"cpiPeak2022": .0898,
		"asOf": "2026-10-28",
		"source": "FRED: 10-year breakeven inflation (T10YIE), 5-year forward inflation expectation (T5YIFR), CPI (CPIAUCSL)"
	},
	rates: {
		"treasury10y": .0516,
		"baaCorporate": .0661,
		"asOf": "2026-10-28",
		"source": "FRED: 10-year Treasury yield (DGS10), Moody's Baa corporate bond yield (DBAA)"
	},
	costOfCapital: {
		"totalMarket": .0696,
		"p10": .0521,
		"median": .0709,
		"p90": .0848,
		"industries": 94,
		"asOf": "2026-01-05",
		"source": "Aswath Damodaran, NYU Stern: cost of capital by industry, US companies"
	},
	capacityFactors: {
		"solar": .2398,
		"wind": .3431,
		"period": "2025-09 to 2026-08",
		"asOf": "2026-08",
		"source": "EIA Electric Power Monthly, Table 6.07.B (utility-scale fleet, trailing 12 months)"
	},
	onPeak: {
		"CAISO": {
			"hub": "SP15 EZ Gen DA LMP Peak",
			"onPeakPrice": 27.91,
			"days": 220
		},
		"PJM": {
			"hub": "PJM WH Real Time Peak",
			"onPeakPrice": 91.08,
			"days": 226
		},
		"MISO": {
			"hub": "Indiana Hub RT Peak",
			"onPeakPrice": 92.31,
			"days": 46
		},
		"ISO-NE": {
			"hub": "Nepool MH DA LMP Peak",
			"onPeakPrice": 80.41,
			"days": 204
		}
	},
	markets: {
		"ERCOT": {
			"hub": "HB_NORTH",
			"atcPrice": 34.8,
			"negativeHourShare": .0072,
			"hours": 8734,
			"period": "2025-10-26 to 2026-10-24",
			"solarCapture": .689,
			"windCapture": .8859
		},
		"CAISO": {
			"hub": "TH_SP15_GEN-APND",
			"atcPrice": 24.73,
			"negativeHourShare": .1636,
			"hours": 648,
			"period": "2025-10-26 to 2026-10-26",
			"solarCapture": .4333,
			"windCapture": .9953
		},
		"MISO": {
			"hub": "INDIANA.HUB",
			"atcPrice": 39.01,
			"negativeHourShare": 0,
			"hours": 648,
			"period": "2025-10-26 to 2026-10-26",
			"solarCapture": .8705,
			"windCapture": 1.0077
		},
		"SPP": {
			"hub": "SPPSOUTH_HUB",
			"atcPrice": 22.83,
			"negativeHourShare": .1667,
			"hours": 648,
			"period": "2025-10-26 to 2026-10-26",
			"solarCapture": 1.6109,
			"windCapture": .7264
		},
		"NYISO": {
			"hub": "CENTRL",
			"atcPrice": 58.2,
			"negativeHourShare": 0,
			"hours": 648,
			"period": "2025-10-26 to 2026-10-26",
			"windCapture": .9716
		},
		"ISO-NE": {
			"hub": ".H.INTERNAL_HUB",
			"atcPrice": 66.2,
			"negativeHourShare": 0,
			"hours": 648,
			"period": "2025-10-26 to 2026-10-26",
			"solarCapture": .7481,
			"windCapture": .9834
		}
	},
	window: {
		"start": "2025-10-26",
		"end": "2026-10-25",
		"sampledEveryDays": 14
	},
	generatedAt: "2026-10-29T21:02:44Z",
	sources: [
		{
			"id": "fred-inflation",
			"name": "Inflation expectations and CPI (FRED)",
			"url": "https://fred.stlouisfed.org/series/T10YIE",
			"status": "ok"
		},
		{
			"id": "fred-rates",
			"name": "Treasury and corporate bond yields (FRED)",
			"url": "https://fred.stlouisfed.org/series/DGS10",
			"status": "ok"
		},
		{
			"id": "damodaran",
			"name": "Cost of capital by industry (Damodaran, NYU Stern)",
			"url": "https://pages.stern.nyu.edu/~adamodar/",
			"status": "ok"
		},
		{
			"id": "eia-capacity-factors",
			"name": "Fleet capacity factors (EIA Electric Power Monthly)",
			"url": "https://www.eia.gov/electricity/monthly/",
			"status": "ok"
		},
		{
			"id": "eia-ice",
			"name": "On-peak hub prices (EIA wholesale market data)",
			"url": "https://www.eia.gov/electricity/wholesale/",
			"status": "ok"
		},
		{
			"id": "nrel-pvwatts",
			"name": "Expected solar output by region (NREL PVWatts)",
			"url": "https://pvwatts.nrel.gov/",
			"status": "failed",
			"detail": "HTTPSConnectionPool(host='developer.nrel.gov', port=443): Max retries exceeded with url: /api/pvwatts/v8.json?api_key=DEMO_KEY&lat=31.99&lon=-102.08&system_capacity=1000&module_type=0&losses=14&array_type=2&tilt=0&azimuth=180&dc_ac_ratio=1."
		},
		{
			"id": "eia-930",
			"name": "Hourly solar and wind output by grid operator (EIA-930)",
			"url": "https://www.eia.gov/electricity/gridmonitor/",
			"status": "ok"
		},
		{
			"id": "prices-ercot",
			"name": "Hourly day-ahead prices, ERCOT (HB_NORTH)",
			"url": "",
			"status": "ok"
		},
		{
			"id": "prices-caiso",
			"name": "Hourly day-ahead prices, CAISO (TH_SP15_GEN-APND)",
			"url": "",
			"status": "ok"
		},
		{
			"id": "prices-pjm",
			"name": "Hourly day-ahead prices, PJM (WESTERN HUB)",
			"url": "",
			"status": "skipped",
			"detail": "skipped: set PJM_API_KEY (free from PJM Data Miner) to add hourly PJM prices"
		},
		{
			"id": "prices-miso",
			"name": "Hourly day-ahead prices, MISO (INDIANA.HUB)",
			"url": "",
			"status": "ok"
		},
		{
			"id": "prices-spp",
			"name": "Hourly day-ahead prices, SPP (SPPSOUTH_HUB)",
			"url": "",
			"status": "ok"
		},
		{
			"id": "prices-nyiso",
			"name": "Hourly day-ahead prices, NYISO (CENTRL)",
			"url": "",
			"status": "ok"
		},
		{
			"id": "prices-iso-ne",
			"name": "Hourly day-ahead prices, ISO-NE (.H.INTERNAL_HUB)",
			"url": "",
			"status": "ok"
		}
	]
};
/** 0.0235 → "2.35%", 0.24 → "24%". */
var pct = (v) => \`\${(v * 100).toFixed(Math.abs(v) < .1 ? 2 : 1).replace(/\\.?0+$/, "")}%\`;
var day = (iso) => iso ? iso.slice(0, 10) : "n/a";
/** Facts that compare the scenario with public market data. Absent when the data is. */
function dataFacts(inputs, data = current) {
	const f = {};
	const m = data.markets?.[inputs.market];
	f.hasPriceData = !!m;
	if (data.inflation) {
		f.expectedInflation = data.inflation.breakeven10y;
		f.escalationOverInflation = inputs.wholesaleEscalation - data.inflation.breakeven10y;
		f.recentInflation = data.inflation.cpiYoY;
		f.inflationPeak2022 = data.inflation.cpiPeak2022;
	}
	if (data.rates) {
		f.treasury10y = data.rates.treasury10y;
		f.discountOverTreasury = inputs.discountRate - data.rates.treasury10y;
	}
	if (data.costOfCapital) f.marketCostOfCapital = data.costOfCapital.totalMarket;
	if (m) {
		f.marketHubPrice = m.atcPrice;
		if (m.atcPrice > 0) f.hubPriceVsMarket = inputs.hubPrice / m.atcPrice;
		f.marketNegativeHourShare = m.negativeHourShare;
		const capture = inputs.technology === "solar" ? m.solarCapture : m.windCapture;
		if (capture !== void 0) {
			f.marketCaptureRate = capture;
			f.captureRateVsMarket = inputs.captureRate - capture;
		}
	}
	f.expectedCaptureRate = f.marketCaptureRate ?? (inputs.technology === "solar" ? .85 : .9);
	const expectedCF = expectedCapacityFactor(inputs, data);
	if (expectedCF) {
		f.expectedCapacityFactor = expectedCF.value;
		f.capacityFactorVsExpected = inputs.capacityFactor - expectedCF.value;
	}
	return f;
}
function expectedCapacityFactor(inputs, data) {
	if (inputs.technology === "solar") {
		const site = data.solarSites?.[inputs.market];
		if (site) return {
			value: site.capacityFactorAC,
			label: \`NREL PVWatts, single-axis tracker at a representative \${inputs.market} site\`
		};
	}
	const fleet = data.capacityFactors;
	if (!fleet) return void 0;
	return {
		value: inputs.technology === "solar" ? fleet.solar : fleet.wind,
		label: \`US \${inputs.technology} fleet average, \${fleet.period} (EIA)\`
	};
}
var round = (v, step) => Math.round(v / step) * step;
/**
* A benchmark backed by current public data, when the check asks for one and
* the data exists; otherwise the check's own default.
*/
function resolveBenchmark(b, inputs, data = current) {
	if (!b.data) return b;
	const m = data.markets?.[inputs.market];
	switch (b.data) {
		case "escalation": {
			const inf = data.inflation;
			if (!inf) return b;
			const value = Math.min(.035, Math.max(.02, round(inf.breakeven10y + .005, 5e-4)));
			return {
				...b,
				value,
				label: \`\${pct(value)}/yr: the \${pct(inf.breakeven10y)} inflation markets expect over 10 years (FRED, \${day(inf.asOf)}) plus 0.5 points for load growth\`
			};
		}
		case "hubPrice":
			if (!m) return b;
			return {
				...b,
				value: m.atcPrice,
				label: \`$\${m.atcPrice.toFixed(2)}/MWh: average day-ahead price at \${m.hub}, \${m.period}\`
			};
		case "captureRate": {
			const capture = inputs.technology === "solar" ? m?.solarCapture : m?.windCapture;
			if (capture === void 0 || !m) return b;
			return {
				...b,
				value: capture,
				label: \`\${pct(capture)}: what \${inputs.technology} output earned at \${m.hub} against the average price, \${m.period} (grid prices × EIA-930 output)\`
			};
		}
		case "capacityFactor": {
			const cf = expectedCapacityFactor(inputs, data);
			if (!cf) return b;
			return {
				...b,
				value: cf.value,
				label: \`\${pct(cf.value)}: \${cf.label}\`
			};
		}
		case "discountRate": {
			const c = data.costOfCapital;
			if (!c) return b;
			return {
				...b,
				value: c.totalMarket,
				label: \`\${pct(c.totalMarket)}: average US cost of capital (Damodaran, \${day(c.asOf)})\`
			};
		}
	}
	return b;
}
// src/engine/model.ts
var HOURS_PER_YEAR = 8760;
/**
* Compares two ways to cover a company's load with renewable attributes:
*
*  - VPPA: a fixed-for-floating swap. Each year the buyer receives
*    (market price - strike) x generation, which is negative when market
*    prices sit below the strike. The buyer keeps the project's RECs and
*    buys unbundled RECs for any load the project doesn't cover.
*  - RECs: buy unbundled RECs for the full load every year.
*
* Cash flows are annual, discounted at year end. Transaction costs land
* at year 0. Surplus RECs (generation above load) are given no value.
*/
function runModel(inputs) {
	const term = Math.max(1, Math.round(inputs.termYears));
	const year1Generation = inputs.capacityMW * HOURS_PER_YEAR * inputs.capacityFactor;
	const basis = inputs.settlementPoint === "node" ? inputs.basis : 0;
	const rows = [];
	let npvVppaCost = inputs.transactionCost;
	let npvRecCost = 0;
	let totalSettlement = 0;
	let npvSettlement = 0;
	for (let year = 1; year <= term; year++) {
		const t = year - 1;
		const generationMWh = year1Generation * Math.pow(1 - inputs.degradation, t);
		const hubPrice = inputs.hubPrice * Math.pow(1 + inputs.wholesaleEscalation, t);
		const settlementPrice = hubPrice * inputs.captureRate + basis;
		const strikePrice = inputs.strikePrice * Math.pow(1 + inputs.strikeEscalation, t);
		const settlement = (settlementPrice - strikePrice) * generationMWh;
		const recPrice = inputs.recPrice * Math.pow(1 + inputs.recEscalation, t);
		const topUpRecsMWh = Math.max(0, inputs.annualLoadMWh - generationMWh);
		const excessRecsMWh = Math.max(0, generationMWh - inputs.annualLoadMWh);
		const vppaCost = -settlement + topUpRecsMWh * recPrice;
		const recCost = inputs.annualLoadMWh * recPrice;
		const discountFactor = 1 / Math.pow(1 + inputs.discountRate, year);
		rows.push({
			year,
			generationMWh,
			hubPrice,
			settlementPrice,
			strikePrice,
			settlement,
			recPrice,
			topUpRecsMWh,
			excessRecsMWh,
			vppaCost,
			recCost,
			discountFactor
		});
		npvVppaCost += vppaCost * discountFactor;
		npvRecCost += recCost * discountFactor;
		totalSettlement += settlement;
		npvSettlement += settlement * discountFactor;
	}
	const npvAdvantage = npvRecCost - npvVppaCost;
	return {
		rows,
		npvVppaCost,
		npvRecCost,
		npvAdvantage,
		recommendation: npvAdvantage > 0 ? "VPPA" : "RECs",
		totalSettlement,
		npvSettlement
	};
}
function withInput(inputs, key, value) {
	return {
		...inputs,
		[key]: value
	};
}
/**
* The value of \`key\` at which the VPPA and the REC strategy cost the same,
* found by bisection. The advantage must be monotonic in \`key\` across
* [lo, hi]; returns NaN when there is no crossing in that range.
*/
function breakEven(inputs, key, lo, hi) {
	const f = (x) => runModel(withInput(inputs, key, x)).npvAdvantage;
	let fLo = f(lo);
	const fHi = f(hi);
	if (Number.isNaN(fLo) || Number.isNaN(fHi) || Math.sign(fLo) === Math.sign(fHi)) return NaN;
	let a = lo;
	let b = hi;
	for (let i = 0; i < 60; i++) {
		const mid = (a + b) / 2;
		const fMid = f(mid);
		if (Math.sign(fMid) === Math.sign(fLo)) {
			a = mid;
			fLo = fMid;
		} else b = mid;
	}
	return (a + b) / 2;
}
function breakEvenEscalation(inputs) {
	return breakEven(inputs, "wholesaleEscalation", -.05, .25);
}
function breakEvenStrike(inputs) {
	return breakEven(inputs, "strikePrice", 0, 300);
}
// src/engine/facts.ts
/**
* Every value a check can test. Inputs come straight from the form; derived
* facts are computed from the model so checks can look at consequences
* (e.g. "what hub price does this escalation imply in the final year?").
*/
var FACTS = [
	{
		key: "technology",
		label: "Technology",
		format: "text",
		kind: "input",
		help: "solar or wind",
		options: ["solar", "wind"],
		core: true,
		source: "Term sheet"
	},
	{
		key: "market",
		label: "Market",
		format: "text",
		kind: "input",
		help: "ISO/RTO the project sits in",
		options: [
			"ERCOT",
			"PJM",
			"MISO",
			"SPP",
			"CAISO",
			"NYISO",
			"ISO-NE",
			"Other"
		],
		core: true,
		source: "Term sheet (project location and settlement hub)"
	},
	{
		key: "capacityMW",
		label: "Project size",
		format: "mw",
		kind: "input",
		help: "Contracted capacity, MW AC",
		range: [.1, 5e3],
		core: true,
		source: "Term sheet: contracted share, not the whole project"
	},
	{
		key: "capacityFactor",
		label: "Capacity factor",
		format: "pct",
		kind: "input",
		help: "Average output as a share of nameplate",
		range: [.05, .7],
		core: true,
		source: "Independent energy yield assessment (P50); developer estimates run high"
	},
	{
		key: "degradation",
		label: "Output degradation",
		format: "pct",
		kind: "input",
		help: "Annual loss of output",
		range: [0, .05],
		source: "Energy yield assessment or module warranty"
	},
	{
		key: "termYears",
		label: "Contract term",
		format: "years",
		kind: "input",
		help: "VPPA length in years",
		range: [1, 35],
		core: true,
		source: "Term sheet"
	},
	{
		key: "strikePrice",
		label: "Strike price",
		format: "perMWh",
		kind: "input",
		help: "Fixed VPPA price, year 1",
		range: [1, 300],
		core: true,
		source: "Developer’s firm offer, dated; compare with the LevelTen P25 index"
	},
	{
		key: "strikeEscalation",
		label: "Strike escalator",
		format: "pct",
		kind: "input",
		help: "Annual increase in the strike price",
		range: [-.05, .1],
		source: "Term sheet"
	},
	{
		key: "settlementPoint",
		label: "Settlement point",
		format: "text",
		kind: "input",
		help: "hub or node",
		options: ["hub", "node"],
		source: "Term sheet"
	},
	{
		key: "basis",
		label: "Basis (node minus hub)",
		format: "perMWh",
		kind: "input",
		help: "Applies only to node settlement",
		range: [-100, 100],
		source: "Node vs. hub price history from ISO data, weighted by the project’s output"
	},
	{
		key: "transactionCost",
		label: "Transaction costs",
		format: "usd",
		kind: "input",
		help: "One-time legal, advisory, and procurement costs",
		range: [0, 1e8],
		source: "Quotes from counsel and the procurement advisor"
	},
	{
		key: "hubPrice",
		label: "Hub price, year 1",
		format: "perMWh",
		kind: "input",
		help: "Around-the-clock wholesale price",
		range: [1, 500],
		core: true,
		source: "Dated hub forward curve from a broker or the ISO; stale curves are common"
	},
	{
		key: "wholesaleEscalation",
		label: "Wholesale price escalation",
		format: "pct",
		kind: "input",
		help: "Annual growth in wholesale prices",
		range: [-.05, .25],
		core: true,
		source: "Advisor’s long-run fundamentals forecast; cross-check with EIA’s Annual Energy Outlook. A single year’s inflation is not a forecast"
	},
	{
		key: "captureRate",
		label: "Capture rate",
		format: "pct",
		kind: "input",
		help: "Project's generation-weighted price as a share of the around-the-clock price",
		range: [-1.5, 2.5],
		source: "Shape or capture study for the project’s location"
	},
	{
		key: "annualLoadMWh",
		label: "Annual load",
		format: "mwh",
		kind: "input",
		help: "Electricity use to be matched with RECs",
		range: [1, 1e9],
		core: true,
		source: "Utility bills or the energy management system, for the sites the claim covers"
	},
	{
		key: "recPrice",
		label: "REC price, year 1",
		format: "perMWh",
		kind: "input",
		help: "Unbundled REC price",
		range: [0, 100],
		core: true,
		source: "Broker quote for the exact product and vintage (national voluntary vs. state compliance)"
	},
	{
		key: "recEscalation",
		label: "REC price escalation",
		format: "pct",
		kind: "input",
		help: "Annual growth in REC prices",
		range: [-.2, .5],
		source: "Broker view; voluntary REC prices have no steady trend"
	},
	{
		key: "discountRate",
		label: "Discount rate",
		format: "pct",
		kind: "input",
		help: "Rate used to discount future costs",
		range: [0, .3],
		core: true,
		source: "Treasury or finance (the company’s cost of capital)"
	},
	{
		key: "accountingReviewed",
		label: "Derivative accounting reviewed",
		format: "bool",
		kind: "input",
		help: "ASC 815 / IFRS 9 treatment confirmed",
		source: "Controller’s group"
	},
	{
		key: "creditSupportReviewed",
		label: "Credit support reviewed",
		format: "bool",
		kind: "input",
		help: "Collateral or guarantee requirements known",
		source: "Treasury and the term sheet"
	},
	{
		key: "negativePriceTermsReviewed",
		label: "Negative-price terms reviewed",
		format: "bool",
		kind: "input",
		help: "Floor or curtailment clause checked",
		source: "The contract, reviewed by counsel"
	},
	{
		key: "marketBoundaryConfirmed",
		label: "REC market boundary confirmed",
		format: "bool",
		kind: "input",
		help: "RECs come from the same market as the load",
		source: "REC tracking system records (e.g. M-RETS, PJM-GATS, ERCOT)"
	},
	{
		key: "scope2RevisionConsidered",
		label: "Scope 2 revision considered",
		format: "bool",
		kind: "input",
		help: "GHG Protocol Scope 2 proposals reviewed",
		source: "Sustainability reporting lead"
	},
	{
		key: "year1GenerationMWh",
		label: "Year-1 generation",
		format: "mwh",
		kind: "derived",
		help: "Size x 8,760 h x capacity factor"
	},
	{
		key: "coverageRatio",
		label: "Load covered by the project",
		format: "pct",
		kind: "derived",
		help: "Year-1 generation / annual load"
	},
	{
		key: "year1SettlementPrice",
		label: "Project market value, year 1",
		format: "perMWh",
		kind: "derived",
		help: "Hub price x capture rate (+ basis at a node)"
	},
	{
		key: "year1SpreadToStrike",
		label: "Year-1 market value minus strike",
		format: "perMWh",
		kind: "derived",
		help: "Negative means the buyer pays in year 1"
	},
	{
		key: "finalYearHubPrice",
		label: "Hub price in final year",
		format: "perMWh",
		kind: "derived",
		help: "Year-1 hub price compounded over the term"
	},
	{
		key: "hubPriceMultiple",
		label: "Final-year hub price vs. today",
		format: "multiple",
		kind: "derived",
		help: "How many times today’s price the model assumes by the last year"
	},
	{
		key: "escalationMinusDiscount",
		label: "Escalation minus discount rate",
		format: "pct",
		kind: "derived",
		help: "Positive means distant years weigh as much as near ones"
	},
	{
		key: "npvAdvantage",
		label: "VPPA advantage (NPV)",
		format: "usd",
		kind: "derived",
		help: "REC strategy cost minus VPPA cost; positive favors the VPPA"
	},
	{
		key: "recommendsVppa",
		label: "Result favors the VPPA",
		format: "bool",
		kind: "derived",
		help: "true when the VPPA costs less"
	},
	{
		key: "breakEvenEscalation",
		label: "Break-even escalation",
		format: "pct",
		kind: "derived",
		help: "Escalation at which both options cost the same"
	},
	{
		key: "escalationCushion",
		label: "Distance to break-even escalation",
		format: "pct",
		kind: "derived",
		help: "Absolute gap between assumed and break-even escalation"
	},
	{
		key: "breakEvenStrike",
		label: "Break-even strike price",
		format: "perMWh",
		kind: "derived",
		help: "Strike at which both options cost the same"
	},
	{
		key: "lateValueShare",
		label: "VPPA upside after year 10",
		format: "pct",
		kind: "derived",
		help: "Share of discounted positive settlements that arrive after year 10"
	},
	{
		key: "firstPositiveYear",
		label: "First year the VPPA pays out",
		format: "year",
		kind: "derived",
		help: "0 when it never does"
	},
	{
		key: "expectedInflation",
		label: "Inflation markets expect (10 yr)",
		format: "pct",
		kind: "derived",
		help: "10-year breakeven inflation, FRED"
	},
	{
		key: "escalationOverInflation",
		label: "Escalation above expected inflation",
		format: "pct",
		kind: "derived",
		help: "Assumed wholesale escalation minus expected inflation"
	},
	{
		key: "recentInflation",
		label: "Inflation, last 12 months",
		format: "pct",
		kind: "derived",
		help: "CPI, FRED"
	},
	{
		key: "inflationPeak2022",
		label: "Inflation peak in 2022",
		format: "pct",
		kind: "derived",
		help: "Highest 12-month CPI change in 2022, FRED"
	},
	{
		key: "treasury10y",
		label: "10-year Treasury yield",
		format: "pct",
		kind: "derived",
		help: "Risk-free rate, FRED"
	},
	{
		key: "discountOverTreasury",
		label: "Discount rate above Treasuries",
		format: "pct",
		kind: "derived",
		help: "Discount rate minus the 10-year Treasury yield"
	},
	{
		key: "marketCostOfCapital",
		label: "Average US cost of capital",
		format: "pct",
		kind: "derived",
		help: "Damodaran, all US companies"
	},
	{
		key: "hasPriceData",
		label: "Market price data available",
		format: "bool",
		kind: "derived",
		help: "Hourly hub prices were fetched for this market"
	},
	{
		key: "marketHubPrice",
		label: "Market average price, past year",
		format: "perMWh",
		kind: "derived",
		help: "Average day-ahead price at the market’s main hub"
	},
	{
		key: "hubPriceVsMarket",
		label: "Hub price vs. past year",
		format: "multiple",
		kind: "derived",
		help: "Assumed year-1 hub price divided by the past year’s average"
	},
	{
		key: "marketNegativeHourShare",
		label: "Hours with negative prices",
		format: "pct",
		kind: "derived",
		help: "Share of day-ahead hours below $0 at the hub, past year"
	},
	{
		key: "marketCaptureRate",
		label: "Capture rate in this market",
		format: "pct",
		kind: "derived",
		help: "What solar or wind output earned vs. the average price, past year"
	},
	{
		key: "expectedCaptureRate",
		label: "Expected capture rate",
		format: "pct",
		kind: "derived",
		help: "Measured in this market when available; otherwise a planning default (solar 85%, wind 90%)"
	},
	{
		key: "captureRateVsMarket",
		label: "Capture rate above market",
		format: "pct",
		kind: "derived",
		help: "Assumed capture rate minus what the market delivered"
	},
	{
		key: "expectedCapacityFactor",
		label: "Expected capacity factor",
		format: "pct",
		kind: "derived",
		help: "NREL PVWatts for the region (solar) or the US fleet average (EIA)"
	},
	{
		key: "capacityFactorVsExpected",
		label: "Capacity factor above expected",
		format: "pct",
		kind: "derived",
		help: "Assumed capacity factor minus the expected one"
	}
];
var FACT_BY_KEY = Object.fromEntries(FACTS.map((f) => [f.key, f]));
function deriveFacts(inputs, result = runModel(inputs)) {
	const plain = { ...inputs.diligence };
	for (const [key, value] of Object.entries(inputs)) if (typeof value !== "object") plain[key] = value;
	const rows = result.rows;
	const year1 = rows[0];
	const last = rows[rows.length - 1];
	let positive = 0;
	let positiveLate = 0;
	let firstPositiveYear = 0;
	for (const row of rows) if (row.settlement > 0) {
		const pv = row.settlement * row.discountFactor;
		positive += pv;
		if (row.year > 10) positiveLate += pv;
		if (!firstPositiveYear) firstPositiveYear = row.year;
	}
	const beEsc = breakEvenEscalation(inputs);
	return {
		...plain,
		year1GenerationMWh: year1.generationMWh,
		coverageRatio: inputs.annualLoadMWh > 0 ? year1.generationMWh / inputs.annualLoadMWh : 0,
		year1SettlementPrice: year1.settlementPrice,
		year1SpreadToStrike: year1.settlementPrice - year1.strikePrice,
		finalYearHubPrice: last.hubPrice,
		hubPriceMultiple: inputs.hubPrice > 0 ? last.hubPrice / inputs.hubPrice : 0,
		escalationMinusDiscount: inputs.wholesaleEscalation - inputs.discountRate,
		npvAdvantage: result.npvAdvantage,
		recommendsVppa: result.recommendation === "VPPA",
		breakEvenEscalation: beEsc,
		escalationCushion: Math.abs(inputs.wholesaleEscalation - beEsc),
		breakEvenStrike: breakEvenStrike(inputs),
		lateValueShare: positive > 0 ? positiveLate / positive : 0,
		firstPositiveYear,
		...dataFacts(inputs)
	};
}
/**
* Values that cannot be right, as opposed to values that are merely
* aggressive (those are the checks' job). Usually a unit mix-up, such as a
* capacity factor of 24 meant as 24%.
*/
function validateInputs(inputs) {
	const problems = [];
	for (const f of FACTS) {
		if (f.kind !== "input" || !f.range) continue;
		const value = inputs[f.key];
		if (typeof value !== "number") continue;
		const [lo, hi] = f.range;
		if (!Number.isFinite(value) || value < lo || value > hi) problems.push({
			key: f.key,
			value,
			range: f.range,
			message: \`\${f.label} must be between \${fmtRange(f.format, lo)} and \${fmtRange(f.format, hi)}.\`
		});
	}
	return problems;
}
function fmtRange(format, v) {
	if (format === "pct") return \`\${Math.round(v * 1e3) / 10}%\`;
	if (format === "perMWh") return \`$\${v}/MWh\`;
	if (format === "usd") return \`$\${v.toLocaleString("en-US")}\`;
	return v.toLocaleString("en-US");
}
// src/engine/format.ts
function fmtUSD(value, opts = {}) {
	if (!Number.isFinite(value)) return "—";
	const sign = value < 0 ? "−" : opts.sign && value > 0 ? "+" : "";
	const abs = Math.abs(value);
	let body;
	if (abs >= 1e9) body = \`$\${(abs / 1e9).toFixed(2)}B\`;
	else if (abs >= 1e6) body = \`$\${(abs / 1e6).toFixed(abs >= 1e8 ? 0 : abs >= 1e7 ? 1 : 2)}M\`;
	else if (abs >= 1e3) body = \`$\${(abs / 1e3).toFixed(abs >= 1e5 ? 0 : 1)}K\`;
	else body = \`$\${abs.toFixed(0)}\`;
	return sign + body;
}
function fmtPct(value, digits) {
	if (!Number.isFinite(value)) return "—";
	const pct = value * 100;
	const d = digits ?? (Math.abs(pct) < 10 && Math.round(pct * 100) % 100 !== 0 ? 2 : 1);
	return \`\${trimZeros(pct.toFixed(d))}%\`;
}
function fmtPerMWh(value) {
	if (!Number.isFinite(value)) return "—";
	return \`\${value < 0 ? "−" : ""}$\${Math.abs(value).toFixed(2)}/MWh\`;
}
function fmtNumber(value, digits = 0) {
	if (!Number.isFinite(value)) return "—";
	return value.toLocaleString("en-US", {
		maximumFractionDigits: digits,
		minimumFractionDigits: 0
	});
}
function trimZeros(s) {
	return s.includes(".") ? s.replace(/\\.?0+$/, "") : s;
}
function formatValue(value, format) {
	if (value === void 0) return "—";
	if (typeof value === "boolean") return value ? "yes" : "no";
	if (typeof value === "string") return value;
	switch (format) {
		case "pct": return fmtPct(value);
		case "usd": return fmtUSD(value);
		case "perMWh": return fmtPerMWh(value);
		case "mwh": return \`\${fmtNumber(value)} MWh\`;
		case "mw": return \`\${fmtNumber(value, 1)} MW\`;
		case "years": return \`\${fmtNumber(value)} years\`;
		case "year": return value ? \`year \${fmtNumber(value)}\` : "never";
		case "multiple": return \`\${value.toFixed(2)}×\`;
		default: return fmtNumber(value, 2);
	}
}
function formatFact(key, value) {
	return formatValue(value, FACT_BY_KEY[key]?.format ?? "text");
}
/** Replaces \`{factKey}\` placeholders with formatted fact values. */
function renderTemplate(template, facts) {
	return template.replace(/\\{(\\w+)\\}/g, (match, key) => key in facts ? formatFact(key, facts[key]) : match);
}
// src/engine/builtinRules.ts
/**
* The starter playbook. Every threshold and benchmark here is a default a
* reviewer can edit in the app; sources and dates are listed so people can
* tell when a number has gone stale.
*/
var BUILT_IN_RULES = [
	{
		id: "MKT-ESC-HIGH",
		title: "Wholesale price escalation far above long-run norms",
		category: "Market prices",
		severity: "critical",
		when: [{
			fact: "wholesaleEscalation",
			op: ">",
			value: .04
		}],
		message: "Wholesale prices are assumed to rise {wholesaleEscalation} a year. Compounded over {termYears}, that puts the hub price at {finalYearHubPrice} in the final year, {hubPriceMultiple} today’s level.",
		why: "PPA models typically escalate wholesale prices 2.5–3% a year, roughly long-run inflation, because long-range forecasts show flat real power prices. A rate like 7.5% looks like one high-inflation year applied to the whole term. Higher escalation raises every future VPPA settlement, so it makes the VPPA look better than it is. Load growth from data centers has lifted near-term prices in some markets (PJM, for example). That can support a higher rate for the first few years, not for the full term.",
		ask: "What is the source for this escalation rate, and why should it hold for every year of the contract?",
		benchmark: {
			input: "wholesaleEscalation",
			value: .0275,
			label: "2.75%/yr, the midpoint of the typical 2.5–3% range",
			data: "escalation"
		},
		source: "Typical PPA modeling range; Federal Reserve 2% inflation target; EIA Annual Energy Outlook (roughly flat real wholesale prices)",
		origin: "built-in",
		lesson: "Added after a reviewer caught a VPPA vs. REC model that used 7.5%/yr wholesale price inflation for the whole term. It made the VPPA look favorable when it was not."
	},
	{
		id: "MKT-ESC-ELEVATED",
		title: "Wholesale price escalation at the high end",
		category: "Market prices",
		severity: "warning",
		when: [{
			fact: "wholesaleEscalation",
			op: "between",
			value: [.0351, .04]
		}],
		message: "Wholesale prices rise {wholesaleEscalation} a year, above the typical 2.5–3% range.",
		why: "Small differences in escalation compound over a long contract. Half a point above the norm can decide a close comparison.",
		ask: "What market view supports escalation above 3.5% a year?",
		benchmark: {
			input: "wholesaleEscalation",
			value: .0275,
			label: "2.75%/yr",
			data: "escalation"
		},
		source: "Typical PPA modeling range",
		origin: "built-in"
	},
	{
		id: "MKT-ESC-VS-INFLATION",
		title: "Escalation well above expected inflation",
		category: "Market prices",
		severity: "warning",
		when: [{
			fact: "escalationOverInflation",
			op: ">",
			value: .01
		}, {
			fact: "wholesaleEscalation",
			op: "<",
			value: .0351
		}],
		message: "Wholesale prices rise {wholesaleEscalation} a year, more than a point above the {expectedInflation} inflation bond markets expect over the next decade.",
		why: "Long-run power prices tend to track general inflation. Assuming they outrun it every year for the whole term is a forecast that needs its own support.",
		ask: "What makes power prices rise faster than inflation for the entire term?",
		benchmark: {
			input: "wholesaleEscalation",
			value: .0275,
			label: "2.75%/yr",
			data: "escalation"
		},
		source: "FRED 10-year breakeven inflation (T10YIE), refreshed weekly",
		origin: "built-in"
	},
	{
		id: "MKT-ESC-VS-DISCOUNT",
		title: "Prices grow as fast as the discount rate",
		category: "Market prices",
		severity: "warning",
		when: [{
			fact: "escalationMinusDiscount",
			op: ">=",
			value: 0
		}],
		message: "Wholesale prices grow {wholesaleEscalation} a year, at or above the {discountRate} discount rate. The final years count as much as the first.",
		why: "When escalation matches or beats the discount rate, distant settlements are not discounted away. The answer then rests on price forecasts 10 or more years out, which are the least reliable part of the model.",
		ask: "Is the discount rate the company’s real cost of capital, and is escalation in the same nominal or real terms?",
		source: "Basic discounting consistency",
		origin: "built-in"
	},
	{
		id: "MKT-CAPTURE-SOLAR",
		title: "Solar valued at the full around-the-clock price",
		category: "Market prices",
		severity: "warning",
		when: [
			{
				fact: "technology",
				op: "==",
				value: "solar"
			},
			{
				fact: "captureRate",
				op: ">=",
				value: .98
			},
			{
				fact: "expectedCaptureRate",
				op: "<",
				value: .95
			}
		],
		message: "Solar output is valued at {captureRate} of the around-the-clock hub price; expect about {expectedCaptureRate} here.",
		why: "Solar produces in midday hours, when prices are lowest, and the discount deepens as more solar is built. CAISO solar captured about 72% of the average price in 2021 and went negative in spring 2026. Pricing solar at 100% overstates the VPPA’s settlements every year.",
		ask: "Is there a shape or capture-rate analysis for this project’s location?",
		benchmark: {
			input: "captureRate",
			value: .85,
			label: "85% (planning placeholder; replace with a market-specific shape study)",
			data: "captureRate"
		},
		source: "Modo Energy, CAISO solar capture (spring 2026); Enverus; IER analysis of CAISO 2021",
		origin: "built-in"
	},
	{
		id: "MKT-CAPTURE-VS-MARKET",
		title: "Capture rate above what the market delivered",
		category: "Market prices",
		severity: "warning",
		when: [{
			fact: "captureRateVsMarket",
			op: ">",
			value: .1
		}, {
			fact: "captureRate",
			op: "<",
			value: .98
		}],
		message: "A {captureRate} capture rate is well above the {marketCaptureRate} that {technology} output actually earned in this market over the past year.",
		why: "Capture rates move with how much solar and wind a market already has. Last year’s market-wide figure is the best public starting point; a project-specific shape study can justify a different number.",
		ask: "What shape or capture study supports a higher capture rate than the market delivered?",
		benchmark: {
			input: "captureRate",
			value: .85,
			label: "market capture rate",
			data: "captureRate"
		},
		source: "Grid operator day-ahead hub prices × EIA-930 hourly output, refreshed weekly",
		origin: "built-in"
	},
	{
		id: "MKT-CAPTURE-WIND",
		title: "Wind valued at the full around-the-clock price",
		category: "Market prices",
		severity: "info",
		when: [
			{
				fact: "technology",
				op: "==",
				value: "wind"
			},
			{
				fact: "captureRate",
				op: ">=",
				value: .98
			},
			{
				fact: "expectedCaptureRate",
				op: "<",
				value: .95
			}
		],
		message: "Wind output is valued at {captureRate} of the around-the-clock hub price; expect about {expectedCaptureRate} here.",
		why: "Wind often blows hardest at night and in shoulder seasons, when prices are lower, so its capture rate is usually below 100%.",
		ask: "Is there a shape analysis for this wind project?",
		benchmark: {
			input: "captureRate",
			value: .9,
			label: "90% (placeholder)",
			data: "captureRate"
		},
		source: "General market practice",
		origin: "built-in"
	},
	{
		id: "MKT-NODE-BASIS",
		title: "Node settlement with no basis",
		category: "Market prices",
		severity: "warning",
		when: [{
			fact: "settlementPoint",
			op: "==",
			value: "node"
		}, {
			fact: "basis",
			op: "==",
			value: 0
		}],
		message: "The VPPA settles at the project node, but the model assumes the node price equals the hub price.",
		why: "Nodes with a lot of renewable output often price below the hub when output is high, because of congestion. With node settlement the buyer carries that basis risk.",
		ask: "What does the node’s price history show against the hub?",
		benchmark: {
			input: "basis",
			value: -3,
			label: "−$3/MWh (placeholder; use the node’s history)"
		},
		source: "General market practice",
		origin: "built-in"
	},
	{
		id: "MKT-HUB-RANGE",
		title: "Year-1 hub price outside recent ranges",
		category: "Market prices",
		severity: "info",
		when: [{
			fact: "hubPrice",
			op: "outside",
			value: [20, 100]
		}],
		message: "A year-1 hub price of {hubPrice} is outside the $20–$100/MWh band most US hubs have traded in recently.",
		why: "The starting price sets the level for every year that follows. An old or mislabeled forward curve shifts the whole result.",
		ask: "Which forward curve is this from, and what date?",
		source: "General market practice",
		origin: "built-in"
	},
	{
		id: "MKT-HUB-VS-MARKET",
		title: "Year-1 hub price far from the past year",
		category: "Market prices",
		severity: "warning",
		when: [{
			fact: "hubPriceVsMarket",
			op: "outside",
			value: [.8, 1.25]
		}],
		message: "A year-1 hub price of {hubPrice} is {hubPriceVsMarket} the {marketHubPrice} average day-ahead price at this market’s main hub over the past year.",
		why: "Next year’s prices can differ from last year’s, but a gap of more than 20–25% usually means an old curve, an on-peak price used as an around-the-clock one, or the wrong hub.",
		ask: "Which forward curve and hub is this price from, and is it around-the-clock or on-peak?",
		benchmark: {
			input: "hubPrice",
			value: 45,
			label: "past-year average",
			data: "hubPrice",
			auto: false
		},
		source: "Grid operator day-ahead hub prices, refreshed weekly",
		origin: "built-in"
	},
	{
		id: "PRJ-CF-SOLAR",
		title: "Solar capacity factor outside the usual range",
		category: "Project output",
		severity: "warning",
		when: [{
			fact: "technology",
			op: "==",
			value: "solar"
		}, {
			fact: "capacityFactor",
			op: "outside",
			value: [.15, .33]
		}],
		message: "A {capacityFactor} capacity factor is outside the 15–33% range for utility-scale solar.",
		why: "US utility-scale solar averages about 24%. Single-axis trackers in the Southwest reach the low 30s.",
		ask: "Is this from an independent energy yield assessment (P50)?",
		benchmark: {
			input: "capacityFactor",
			value: .24,
			label: "24%, the US utility-scale average",
			data: "capacityFactor"
		},
		source: "EIA Electric Power Monthly, capacity factors for utility-scale solar",
		origin: "built-in"
	},
	{
		id: "PRJ-CF-WIND",
		title: "Wind capacity factor outside the usual range",
		category: "Project output",
		severity: "warning",
		when: [{
			fact: "technology",
			op: "==",
			value: "wind"
		}, {
			fact: "capacityFactor",
			op: "outside",
			value: [.25, .5]
		}],
		message: "A {capacityFactor} capacity factor is outside the 25–50% range for US wind.",
		why: "The US wind fleet averages roughly 35%; newer projects in strong wind regions reach the mid-40s.",
		ask: "Is this from an independent energy yield assessment (P50)?",
		benchmark: {
			input: "capacityFactor",
			value: .36,
			label: "36%",
			data: "capacityFactor"
		},
		source: "EIA Electric Power Monthly; LBNL Land-Based Wind Market Report",
		origin: "built-in"
	},
	{
		id: "PRJ-CF-VS-EXPECTED",
		title: "Capacity factor above what is expected here",
		category: "Project output",
		severity: "warning",
		when: [{
			fact: "capacityFactorVsExpected",
			op: ">",
			value: .04
		}],
		message: "A {capacityFactor} capacity factor is more than 4 points above the {expectedCapacityFactor} expected for {technology} in this market.",
		why: "Higher output means more MWh settling against the strike every year. Developer estimates often run high; an independent P50 assessment is the reliable number.",
		ask: "Is this from an independent energy yield assessment (P50)?",
		benchmark: {
			input: "capacityFactor",
			value: .24,
			label: "expected capacity factor",
			data: "capacityFactor"
		},
		source: "NREL PVWatts for the region (solar); EIA fleet average (wind); refreshed weekly",
		origin: "built-in"
	},
	{
		id: "PRJ-NO-DEGRADATION",
		title: "No output degradation",
		category: "Project output",
		severity: "warning",
		when: [{
			fact: "degradation",
			op: "<=",
			value: 0
		}],
		message: "The project produces the same amount every year for {termYears}.",
		why: "Solar panels lose about 0.5% of output a year, and wind turbine output also declines with age. Ignoring this overstates generation and settlements in later years.",
		ask: "What degradation rate does the developer’s yield assessment use?",
		benchmark: {
			input: "degradation",
			value: .005,
			label: "0.5%/yr"
		},
		source: "NREL photovoltaic degradation studies; LBNL wind performance studies",
		origin: "built-in"
	},
	{
		id: "PRJ-OVERSIZED",
		title: "Project larger than the load",
		category: "Project output",
		severity: "warning",
		when: [{
			fact: "coverageRatio",
			op: ">",
			value: 1.1
		}],
		message: "The project generates {coverageRatio} of annual load.",
		why: "Surplus RECs have no value in this comparison unless you can resell them, and you carry price risk on volume you do not use.",
		ask: "Is there a plan for the surplus RECs, or should the contracted share be smaller?",
		source: "General procurement practice",
		origin: "built-in"
	},
	{
		id: "CTR-STRIKE-SOLAR",
		title: "Solar strike price far from current offers",
		category: "Contract terms",
		severity: "info",
		when: [{
			fact: "technology",
			op: "==",
			value: "solar"
		}, {
			fact: "strikePrice",
			op: "outside",
			value: [45, 85]
		}],
		message: "A {strikePrice} strike is far from current North American solar offers (about $61–65/MWh in 2026).",
		why: "A strike well below the market makes the VPPA look cheap; one well above it may signal a stale quote.",
		ask: "Is this a firm offer, and from when?",
		benchmark: {
			input: "strikePrice",
			value: 63,
			label: "$63/MWh, LevelTen P25 solar index, 2026"
		},
		source: "LevelTen Energy PPA Price Index, North America, Q1–Q3 2026",
		origin: "built-in"
	},
	{
		id: "CTR-STRIKE-WIND",
		title: "Wind strike price far from current offers",
		category: "Contract terms",
		severity: "info",
		when: [{
			fact: "technology",
			op: "==",
			value: "wind"
		}, {
			fact: "strikePrice",
			op: "outside",
			value: [55, 100]
		}],
		message: "A {strikePrice} strike is far from current North American wind offers (about $68–80/MWh in 2026).",
		why: "A strike well below the market makes the VPPA look cheap; one well above it may signal a stale quote.",
		ask: "Is this a firm offer, and from when?",
		benchmark: {
			input: "strikePrice",
			value: 72,
			label: "$72/MWh, LevelTen P25 wind index, 2026"
		},
		source: "LevelTen Energy PPA Price Index, North America, 2026",
		origin: "built-in"
	},
	{
		id: "CTR-TERM",
		title: "Unusual contract length",
		category: "Contract terms",
		severity: "info",
		when: [{
			fact: "termYears",
			op: "outside",
			value: [8, 20]
		}],
		message: "A {termYears} term is outside the usual 10–20 years for a VPPA.",
		why: "Longer terms lean harder on long-range price forecasts; shorter ones are hard to get financed.",
		source: "General market practice",
		origin: "built-in"
	},
	{
		id: "CTR-NO-TXN-COST",
		title: "No transaction costs",
		category: "Contract terms",
		severity: "info",
		when: [{
			fact: "transactionCost",
			op: "<=",
			value: 0
		}],
		message: "The VPPA carries no legal, advisory, or procurement costs.",
		why: "Negotiating a VPPA usually involves outside counsel and an advisor. Buying unbundled RECs costs little to set up.",
		ask: "What will counsel and the advisor charge for this deal?",
		benchmark: {
			input: "transactionCost",
			value: 35e4,
			label: "$350K (placeholder)"
		},
		source: "General market practice",
		origin: "built-in"
	},
	{
		id: "CTR-NEGATIVE-PRICES",
		title: "Negative-price terms not reviewed",
		category: "Contract terms",
		severity: "warning",
		when: [{
			fact: "negativePriceTermsReviewed",
			op: "==",
			value: false
		}, {
			fact: "hasPriceData",
			op: "==",
			value: false
		}],
		message: "Nobody has confirmed how the VPPA settles when prices go negative.",
		why: "In markets with frequent negative prices (ERCOT, SPP, CAISO), a VPPA with no price floor or curtailment clause can make the buyer pay the strike plus the negative price. This model uses annual averages and cannot show that cost.",
		ask: "Does the contract include a floor at $0 or a curtailment right during negative prices?",
		source: "General market practice",
		origin: "built-in"
	},
	{
		id: "CTR-NEGATIVE-PRICES-FREQUENT",
		title: "Frequent negative prices, terms not reviewed",
		category: "Contract terms",
		severity: "warning",
		when: [{
			fact: "marketNegativeHourShare",
			op: ">",
			value: .02
		}, {
			fact: "negativePriceTermsReviewed",
			op: "==",
			value: false
		}],
		message: "Day-ahead prices at this market’s hub were negative in {marketNegativeHourShare} of hours over the past year, and nobody has confirmed how the VPPA settles then.",
		why: "In those hours a VPPA with no price floor makes the buyer pay the strike plus the negative price. This model uses annual averages and cannot show that cost.",
		ask: "Does the contract include a floor at $0 or a curtailment right during negative prices?",
		source: "Grid operator day-ahead hub prices, refreshed weekly",
		origin: "built-in"
	},
	{
		id: "FIN-DISCOUNT",
		title: "Discount rate outside the usual corporate range",
		category: "Finance & RECs",
		severity: "warning",
		when: [{
			fact: "discountRate",
			op: "outside",
			value: [.05, .12]
		}],
		message: "A {discountRate} discount rate is outside the 5–12% range typical for corporate cost of capital.",
		why: "A low rate inflates the weight of distant years, where VPPA value usually sits.",
		ask: "Did finance supply this rate?",
		benchmark: {
			input: "discountRate",
			value: .08,
			label: "8%",
			data: "discountRate"
		},
		source: "General corporate finance practice",
		origin: "built-in"
	},
	{
		id: "FIN-DISCOUNT-BELOW-TREASURY",
		title: "Discount rate below the risk-free rate",
		category: "Finance & RECs",
		severity: "warning",
		when: [{
			fact: "discountOverTreasury",
			op: "<",
			value: 0
		}],
		message: "A {discountRate} discount rate is below the {treasury10y} yield on 10-year US Treasuries.",
		why: "A company’s cost of capital is almost always above the risk-free rate. Discounting below it overweights distant years, where VPPA value usually sits.",
		ask: "Did finance supply this rate, and is it current?",
		benchmark: {
			input: "discountRate",
			value: .08,
			label: "8%",
			data: "discountRate"
		},
		source: "FRED 10-year Treasury yield (DGS10); Damodaran cost of capital; refreshed weekly",
		origin: "built-in"
	},
	{
		id: "FIN-REC-COMPLIANCE-PRICE",
		title: "REC price looks like a compliance-market price",
		category: "Finance & RECs",
		severity: "warning",
		when: [{
			fact: "recPrice",
			op: ">",
			value: 15
		}],
		message: "A REC price of {recPrice} is far above national voluntary RECs.",
		why: "National voluntary wind RECs traded around $4–5/MWh for 2025 vintage. Prices above $15 look like state compliance RECs (New York Tier 1 sells for about $24–41/MWh). A high REC price makes the REC strategy look expensive and flatters the VPPA, which brings its own RECs.",
		ask: "Which REC product and vintage is this price for?",
		benchmark: {
			input: "recPrice",
			value: 5,
			label: "$5/MWh, national voluntary"
		},
		source: "S&P Global Platts assessments (2025); NYSERDA Tier 1 2026 pre-sale",
		origin: "built-in"
	},
	{
		id: "FIN-REC-STALE-PRICE",
		title: "REC price below recent levels",
		category: "Finance & RECs",
		severity: "info",
		when: [{
			fact: "recPrice",
			op: "<",
			value: 1
		}],
		message: "A REC price of {recPrice} matches pre-2020 levels.",
		why: "Voluntary REC prices sat under $1/MWh through 2019, then rose. An old quote understates the REC strategy’s cost.",
		benchmark: {
			input: "recPrice",
			value: 4.5,
			label: "$4.50/MWh, national voluntary wind, 2025 vintage"
		},
		source: "US EPA Landfill Methane Outreach Program; S&P Global Platts",
		origin: "built-in"
	},
	{
		id: "FIN-REC-ESCALATION",
		title: "REC prices assumed to climb quickly",
		category: "Finance & RECs",
		severity: "warning",
		when: [{
			fact: "recEscalation",
			op: ">",
			value: .05
		}],
		message: "REC prices are assumed to rise {recEscalation} a year.",
		why: "Voluntary REC prices have been low and volatile without a steady upward trend. Fast REC escalation inflates the REC strategy’s cost.",
		ask: "What supports a steady rise in REC prices?",
		benchmark: {
			input: "recEscalation",
			value: .02,
			label: "2%/yr"
		},
		source: "General market practice",
		origin: "built-in"
	},
	{
		id: "RES-LATE-VALUE",
		title: "Most of the VPPA’s value arrives late",
		category: "Result robustness",
		severity: "warning",
		when: [{
			fact: "lateValueShare",
			op: ">",
			value: .6
		}],
		message: "{lateValueShare} of the VPPA’s discounted upside arrives after year 10. It first pays out in {firstPositiveYear}.",
		why: "Value that depends on prices a decade away is the least certain part of any forecast.",
		ask: "How does the result look if prices stop rising after year 10?",
		source: "Forecast uncertainty grows with time",
		origin: "built-in"
	},
	{
		id: "RES-THIN-CUSHION",
		title: "The answer flips with a small change in escalation",
		category: "Result robustness",
		severity: "warning",
		when: [{
			fact: "escalationCushion",
			op: "<",
			value: .01
		}],
		message: "The two options cost the same at {breakEvenEscalation} escalation, within one point of the assumed {wholesaleEscalation}.",
		why: "When a one-point change in a forecast flips the decision, the decision is a bet on that forecast.",
		source: "Sensitivity analysis",
		origin: "built-in"
	},
	{
		id: "ACC-DERIVATIVE",
		title: "Derivative accounting not reviewed",
		category: "Claims & accounting",
		severity: "warning",
		when: [{
			fact: "accountingReviewed",
			op: "==",
			value: false
		}],
		message: "Accounting has not confirmed how the VPPA will be reported.",
		why: "A VPPA can meet the definition of a derivative under ASC 815 (or IFRS 9). Mark-to-market treatment puts quarterly swings in reported earnings, which this cost comparison does not show.",
		ask: "Has the controller’s group assessed ASC 815 treatment?",
		source: "FASB ASC 815; IFRS 9",
		origin: "built-in"
	},
	{
		id: "ACC-CREDIT",
		title: "Credit support not reviewed",
		category: "Claims & accounting",
		severity: "info",
		when: [{
			fact: "creditSupportReviewed",
			op: "==",
			value: false
		}],
		message: "Collateral or guarantee requirements are not in the analysis.",
		why: "Developers often require a parent guarantee or letter of credit. Collateral has a cost and uses credit capacity.",
		ask: "What credit support will the developer require?",
		source: "General market practice",
		origin: "built-in"
	},
	{
		id: "CLM-MARKET-BOUNDARY",
		title: "REC market boundary not confirmed",
		category: "Claims & accounting",
		severity: "warning",
		when: [{
			fact: "marketBoundaryConfirmed",
			op: "==",
			value: false
		}],
		message: "Nobody has confirmed that the RECs come from the same market as the load.",
		why: "Under RE100 criteria and the GHG Protocol Scope 2 quality criteria, RECs must come from the same market as the electricity use they cover. The US and Canada count as one market.",
		ask: "Where are the RECs generated, and where is the load?",
		source: "RE100 technical criteria; GHG Protocol Scope 2 Guidance (2015)",
		origin: "built-in"
	},
	{
		id: "CLM-SCOPE2-REVISION",
		title: "Scope 2 revision not considered",
		category: "Claims & accounting",
		severity: "info",
		when: [{
			fact: "scope2RevisionConsidered",
			op: "==",
			value: false
		}],
		message: "The analysis does not consider the GHG Protocol’s Scope 2 revision.",
		why: "The GHG Protocol is revising Scope 2. Proposals include hourly matching, deliverability, and incrementality, possibly as a stricter method alongside today’s rules. Annual unbundled RECs from outside your grid region would likely count for less. Nothing is final as of 2026; check the current status.",
		ask: "How would each option count if hourly matching and deliverability are adopted?",
		source: "GHG Protocol Scope 2 public consultation (Oct 2025–Jan 2026) and 2026 consultation summaries",
		origin: "built-in"
	}
];
// src/engine/types.ts
var MARKETS = [
	"ERCOT",
	"PJM",
	"MISO",
	"SPP",
	"CAISO",
	"NYISO",
	"ISO-NE",
	"Other"
];
var SEVERITIES = [
	"critical",
	"warning",
	"info"
];
var CATEGORIES = [
	"Market prices",
	"Project output",
	"Contract terms",
	"Finance & RECs",
	"Result robustness",
	"Claims & accounting"
];
var OPERATORS = [
	">",
	">=",
	"<",
	"<=",
	"==",
	"!=",
	"outside",
	"between"
];
// src/engine/rules.ts
var EPSILON = 1e-9;
function evaluateCondition(c, facts) {
	const actual = facts[c.fact];
	if (actual === void 0) return false;
	if (c.op === "outside" || c.op === "between") {
		if (typeof actual !== "number" || !Array.isArray(c.value) || Number.isNaN(actual)) return false;
		const [lo, hi] = c.value;
		const inside = actual >= lo - EPSILON && actual <= hi + EPSILON;
		return c.op === "between" ? inside : !inside;
	}
	const expected = c.value;
	if (Array.isArray(expected)) return false;
	if (typeof actual === "number") {
		const n = typeof expected === "number" ? expected : Number(expected);
		if (Number.isNaN(actual) || Number.isNaN(n)) return false;
		switch (c.op) {
			case ">": return actual > n + EPSILON;
			case ">=": return actual >= n - EPSILON;
			case "<": return actual < n - EPSILON;
			case "<=": return actual <= n + EPSILON;
			case "==": return Math.abs(actual - n) <= EPSILON;
			case "!=": return Math.abs(actual - n) > EPSILON;
		}
	}
	const same = String(actual) === String(expected);
	if (c.op === "==") return same;
	if (c.op === "!=") return !same;
	return false;
}
function ruleFires(rule, facts) {
	return rule.when.length > 0 && rule.when.every((c) => evaluateCondition(c, facts));
}
var SEVERITY_RANK = {
	critical: 0,
	warning: 1,
	info: 2
};
/** Built-in checks (with any local edits) followed by checks reviewers added. */
function effectiveRules(playbook) {
	return [...BUILT_IN_RULES.map((r) => playbook.edits[r.id] ?? r), ...playbook.custom];
}
function activeRules(playbook) {
	const disabled = new Set(playbook.disabled);
	return effectiveRules(playbook).filter((r) => !disabled.has(r.id));
}
/**
* Runs every active check against the scenario. For checks that carry a
* benchmark, re-runs the model with only that one value swapped so the
* reviewer sees how much each assumption moves the answer on its own.
*/
function runPreflight(inputs, rules, base = runModel(inputs)) {
	const facts = deriveFacts(inputs, base);
	const findings = [];
	for (const original of rules) {
		if (!ruleFires(original, facts)) continue;
		const rule = original.benchmark ? {
			...original,
			benchmark: resolveBenchmark(original.benchmark, inputs)
		} : original;
		const finding = {
			rule,
			message: renderTemplate(rule.message, facts)
		};
		if (rule.benchmark) {
			const after = runModel(withInput(inputs, rule.benchmark.input, rule.benchmark.value));
			finding.impact = {
				benchmark: rule.benchmark,
				advantageAfter: after.npvAdvantage,
				delta: after.npvAdvantage - base.npvAdvantage,
				flips: after.recommendation !== base.recommendation
			};
		}
		findings.push(finding);
	}
	return findings.sort((a, b) => SEVERITY_RANK[a.rule.severity] - SEVERITY_RANK[b.rule.severity] || Math.abs(b.impact?.delta ?? 0) - Math.abs(a.impact?.delta ?? 0));
}
function asRule(raw, origin) {
	if (!raw || typeof raw !== "object") return null;
	const r = raw;
	if (typeof r.id !== "string" || typeof r.title !== "string" || !Array.isArray(r.when)) return null;
	const when = r.when.filter((c) => !!c && typeof c === "object" && typeof c.fact === "string" && OPERATORS.includes(c.op));
	if (!when.length) return null;
	return {
		...r,
		id: r.id,
		title: r.title,
		when,
		severity: SEVERITIES.includes(r.severity) ? r.severity : "warning",
		category: CATEGORIES.includes(r.category) ? r.category : "Result robustness",
		message: typeof r.message === "string" && r.message ? r.message : \`\${r.title}.\`,
		why: typeof r.why === "string" ? r.why : "",
		origin
	};
}
/**
* Reads a shared playbook file: the current format ({custom, edits,
* disabled}), the earlier {rules: [...]} export, or a bare array of checks.
*/
function parsePlaybook(data) {
	const obj = Array.isArray(data) ? { rules: data } : data ?? {};
	const builtInIds = new Set(BUILT_IN_RULES.map((r) => r.id));
	const custom = (Array.isArray(obj.custom) ? obj.custom : Array.isArray(obj.rules) ? obj.rules : []).map((r) => asRule(r, "team")).filter((r) => r !== null && !builtInIds.has(r.id));
	const edits = {};
	if (obj.edits && typeof obj.edits === "object") for (const [id, r] of Object.entries(obj.edits)) {
		const rule = asRule(r, "built-in");
		if (rule && builtInIds.has(id) && rule.id === id) edits[id] = rule;
	}
	const disabled = Array.isArray(obj.disabled) ? obj.disabled.filter((d) => typeof d === "string") : [];
	if (!custom.length && !Object.keys(edits).length && !disabled.length) throw new Error("No checks found.");
	return {
		custom,
		edits,
		disabled
	};
}
// src/engine/review.ts
var OPEN = {
	disposition: "open",
	note: ""
};
function decisionFor(review, ruleId) {
	return review.decisions[ruleId] ?? OPEN;
}
// src/engine/memo.ts
/** "$41.2M toward RECs" — which way, and how far, a change pushes the answer. */
function shift(delta) {
	if (Math.abs(delta) < .5) return "by less than $1";
	return \`\${fmtUSD(Math.abs(delta))} toward \${delta > 0 ? "the VPPA" : "buying RECs"}\`;
}
// src/engine/sensitivity.ts
var relative = (f) => (v) => v * f;
var offset = (d, min = -Infinity, max = Infinity) => (v) => Math.min(max, Math.max(min, v + d));
/** Plausible low/high values for each driver, relative to the scenario. */
var SWINGS = [
	{
		input: "wholesaleEscalation",
		label: "Wholesale escalation",
		low: () => .015,
		high: () => .04
	},
	{
		input: "hubPrice",
		label: "Year-1 hub price",
		low: relative(.8),
		high: relative(1.2)
	},
	{
		input: "captureRate",
		label: "Capture rate",
		low: offset(-.15, .3),
		high: offset(.05, 0, 1.1)
	},
	{
		input: "strikePrice",
		label: "Strike price",
		low: relative(.9),
		high: relative(1.1)
	},
	{
		input: "capacityFactor",
		label: "Capacity factor",
		low: relative(.9),
		high: relative(1.1)
	},
	{
		input: "discountRate",
		label: "Discount rate",
		low: offset(-.02, .01),
		high: offset(.02)
	},
	{
		input: "recPrice",
		label: "REC price",
		low: relative(.5),
		high: relative(2)
	},
	{
		input: "degradation",
		label: "Degradation",
		low: () => 0,
		high: () => .01
	}
];
/** One-at-a-time sensitivity of the VPPA advantage, widest swing first. */
function sensitivity(inputs) {
	const base = runModel(inputs).npvAdvantage;
	return SWINGS.map((s) => {
		const current = inputs[s.input];
		const lowValue = s.low(current);
		const highValue = s.high(current);
		const lowDelta = runModel(withInput(inputs, s.input, lowValue)).npvAdvantage - base;
		const highDelta = runModel(withInput(inputs, s.input, highValue)).npvAdvantage - base;
		return {
			input: s.input,
			label: s.label,
			lowValue,
			highValue,
			lowDelta,
			highDelta,
			range: Math.abs(highDelta - lowDelta)
		};
	}).sort((a, b) => b.range - a.range);
}
// src/engine/advice.ts
/**
* Turns a scenario into a single recommendation. Critical and warning
* findings that carry a benchmark are corrected automatically, unless a
* reviewer has decided otherwise; the advice then reports the corrected
* answer, how sure it is, and what would change it.
*/
function advise(inputs, rules, opts = {}) {
	const review = opts.review ?? { decisions: {} };
	const submitted = runModel(inputs);
	const findings = runPreflight(inputs, rules, submitted);
	const corrections = [];
	const superseded = [];
	const kept = [];
	const correctedKeys = /* @__PURE__ */ new Set();
	let correctedInputs = inputs;
	for (const f of findings) {
		const d = decisionFor(review, f.rule.id).disposition;
		if (d === "accept") {
			kept.push(f);
			continue;
		}
		const auto = f.rule.severity !== "info" && f.rule.benchmark?.auto !== false || d === "use-benchmark";
		if (f.rule.benchmark && auto) {
			if (correctedKeys.has(f.rule.benchmark.input)) {
				superseded.push(f);
				continue;
			}
			correctedKeys.add(f.rule.benchmark.input);
			correctedInputs = withInput(correctedInputs, f.rule.benchmark.input, f.rule.benchmark.value);
			corrections.push(f);
		}
	}
	const problems = validateInputs(inputs);
	const corrected = runModel(correctedInputs);
	const keptIds = new Set(kept.map((f) => f.rule.id));
	const correctedIds = new Set(corrections.map((f) => f.rule.id));
	const questions = findings.filter((f) => f.rule.severity !== "info" && !keptIds.has(f.rule.id) && (f.rule.ask || !correctedIds.has(f.rule.id)));
	const notes = findings.filter((f) => (f.rule.severity === "info" || f.rule.benchmark?.auto === false) && !correctedIds.has(f.rule.id) && !keptIds.has(f.rule.id));
	const discountedMWh = corrected.rows.reduce((sum, r) => sum + r.generationMWh * r.discountFactor, 0);
	const premiumPerMWh = discountedMWh > 0 ? -corrected.npvAdvantage / discountedMWh : NaN;
	const base = corrected.npvAdvantage;
	const flips = sensitivity(correctedInputs).filter((s) => Math.sign(base + s.lowDelta) !== Math.sign(base) || Math.sign(base + s.highDelta) !== Math.sign(base));
	const assumedCore = [.../* @__PURE__ */ new Set([...opts.assumed ?? [], ...(opts.rejected ?? []).map((r) => r.key)])].filter((k) => FACT_BY_KEY[k]?.core);
	let confidence = problems.length ? "low" : flips.length === 0 ? "high" : flips.length <= 2 ? "medium" : "low";
	if (confidence === "high" && assumedCore.length) confidence = "medium";
	const beStrike = breakEvenStrike(correctedInputs);
	const beEsc = breakEvenEscalation(correctedInputs);
	const reversed = submitted.recommendation !== corrected.recommendation;
	const savings = fmtUSD(Math.abs(corrected.npvAdvantage));
	const strike = fmtPerMWh(inputs.strikePrice);
	let headline;
	if (corrected.recommendation === "RECs") headline = \`Buy unbundled RECs. At \${strike}, this VPPA costs \${savings} more over \${inputs.termYears} years.\`;
	else headline = \`Sign the VPPA. It beats unbundled RECs by \${savings} over \${inputs.termYears} years, even with realistic assumptions.\`;
	const parts = [];
	if (reversed) {
		const top = [...corrections].sort((a, b) => Math.abs(b.impact?.delta ?? 0) - Math.abs(a.impact?.delta ?? 0))[0];
		parts.push(\`The model as submitted says the opposite (\${submitted.recommendation === "VPPA" ? "the VPPA" : "RECs"} by \${fmtUSD(Math.abs(submitted.npvAdvantage))}), mainly because of one assumption: \${top ? top.rule.title.toLowerCase() : "the corrected values below"}.\`);
	} else if (corrections.length) parts.push(\`The model as submitted reaches the same answer, by \${fmtUSD(Math.abs(submitted.npvAdvantage))}.\`);
	if (corrected.recommendation === "RECs") {
		if (Number.isFinite(beStrike) && beStrike > 0) parts.push(\`The VPPA only beats RECs at a strike below \${fmtPerMWh(beStrike)}.\`);
		if (Number.isFinite(premiumPerMWh)) parts.push(\`At the offered price it costs about \${fmtPerMWh(premiumPerMWh)} more than RECs for each MWh the project produces. That premium buys a long-term price hedge and a stronger claim to adding new renewable capacity; pay it only if those are worth that much to you.\`);
	} else {
		if (Number.isFinite(beStrike)) parts.push(\`It stays ahead as long as the strike is below \${fmtPerMWh(beStrike)}.\`);
		if (Number.isFinite(beEsc)) parts.push(\`It needs wholesale prices to rise at least \${fmtPct(beEsc)} a year.\`);
	}
	return {
		inputs,
		assumed: opts.assumed ?? [],
		findings,
		submitted,
		correctedInputs,
		corrected,
		corrections,
		superseded,
		problems,
		rejected: opts.rejected ?? [],
		assumedCore,
		kept,
		questions,
		notes,
		reversed,
		breakEvenStrike: beStrike,
		breakEvenEscalation: beEsc,
		premiumPerMWh,
		flips,
		confidence,
		headline,
		summary: parts.join(" ")
	};
}
var CONFIDENCE_TEXT = {
	high: "High: no single assumption, moved across its plausible range, reverses this.",
	medium: "Medium: one or two assumptions could reverse this if they land at the edge of their range.",
	low: "Low: several assumptions could reverse this. Firm them up before deciding."
};
function confidenceText(a) {
	if (a.problems.length) return "Low: some inputs are outside their possible range, so the numbers can’t be trusted yet. Fix them first.";
	if (!a.flips.length && a.assumedCore.length) {
		const names = a.assumedCore.map((k) => FACT_BY_KEY[k]?.label ?? k).join("; ");
		return \`Medium: no single assumption reverses this, but \${a.assumedCore.length === 1 ? "one needed input was" : \`\${a.assumedCore.length} needed inputs were\`} filled in (\${names}). Firm \${a.assumedCore.length === 1 ? "it" : "them"} up to raise confidence.\`;
	}
	if (!a.flips.length) return CONFIDENCE_TEXT.high;
	return \`\${CONFIDENCE_TEXT[a.confidence]} Watch: \${a.flips.map((s) => s.label.toLowerCase()).join(", ")}.\`;
}
/** What would have to be true for the answer to change. */
function changeConditions(a) {
	const out = [];
	const recs = a.corrected.recommendation === "RECs";
	if (Number.isFinite(a.breakEvenStrike) && a.breakEvenStrike > 0) out.push(\`\${recs ? "A strike below" : "A strike above"} \${fmtPerMWh(a.breakEvenStrike)} (offered: \${fmtPerMWh(a.inputs.strikePrice)}).\`);
	if (Number.isFinite(a.breakEvenEscalation)) out.push(\`Wholesale prices rising \${recs ? "faster than" : "slower than"} \${fmtPct(a.breakEvenEscalation)} a year for the whole term (typical: 2.5–3%).\`);
	for (const s of a.flips) {
		const value = Math.sign(a.corrected.npvAdvantage + s.lowDelta) !== Math.sign(a.corrected.npvAdvantage) ? s.lowValue : s.highValue;
		out.push(\`\${s.label} at \${formatFact(s.input, value)} instead of \${formatFact(s.input, a.correctedInputs[s.input])}.\`);
	}
	return out;
}
/** The advice as Markdown, for Claude to relay or for a person to paste into an email. */
function renderAdvice(a) {
	const L = [];
	const owner = a.inputs.assumptionOwner.trim();
	L.push(\`# \${a.inputs.scenarioName}\`);
	L.push("");
	L.push(\`**\${a.headline}**\`);
	L.push("");
	if (a.summary) {
		L.push(a.summary);
		L.push("");
	}
	L.push(\`**Confidence:** \${confidenceText(a)}\`);
	L.push("");
	if (a.problems.length) {
		L.push("## Fix these inputs first");
		L.push("");
		for (const p of a.problems) L.push(\`- \${p.message} The model has \${formatFact(p.key, p.value)}; check the units.\`);
		L.push("");
	}
	L.push("| | As submitted | Corrected |");
	L.push("|---|---|---|");
	L.push(\`| Lower-cost option | \${a.submitted.recommendation} | \${a.corrected.recommendation} |\`);
	L.push(\`| VPPA advantage (NPV, \${a.inputs.termYears} yrs at \${fmtPct(a.inputs.discountRate)}) | \${fmtUSD(a.submitted.npvAdvantage, { sign: true })} | \${fmtUSD(a.corrected.npvAdvantage, { sign: true })} |\`);
	L.push(\`| Break-even strike | \${fmtPerMWh(breakEvenStrike(a.inputs))} | \${fmtPerMWh(a.breakEvenStrike)} |\`);
	L.push(\`| Break-even wholesale escalation | \${fmtPct(breakEvenEscalation(a.inputs))} | \${fmtPct(a.breakEvenEscalation)} |\`);
	L.push("");
	if (a.corrections.length) {
		L.push("## Assumptions corrected");
		L.push("");
		L.push("| Assumption | Model | Used | Effect on its own |");
		L.push("|---|---|---|---|");
		for (const f of a.corrections) {
			const b = f.rule.benchmark;
			const label = FACT_BY_KEY[b.input]?.label ?? b.input;
			L.push(\`| \${label} | \${formatFact(b.input, a.inputs[b.input])} | \${formatFact(b.input, b.value)} | \${shift(f.impact?.delta ?? 0)}\${f.impact?.flips ? " (reverses the answer)" : ""} |\`);
		}
		L.push("");
		for (const f of a.corrections) L.push(\`- **\${f.rule.title}.** \${f.message} \${f.rule.why}\${f.rule.source ? \` _Source: \${f.rule.source}._\` : ""}\`);
		for (const f of a.superseded) L.push(\`- _\${f.rule.title} suggested \${formatFact(f.rule.benchmark.input, f.rule.benchmark.value)}; the more serious check above takes precedence._\`);
		L.push("");
	}
	if (a.kept.length) {
		L.push("## Flagged but kept by the reviewer");
		L.push("");
		for (const f of a.kept) L.push(\`- **\${f.rule.title}.** \${f.message}\`);
		L.push("");
	}
	const change = changeConditions(a);
	if (change.length) {
		L.push("## What would change the answer");
		L.push("");
		for (const c of change) L.push(\`- \${c}\`);
		L.push("");
	}
	if (a.questions.length) {
		L.push(\`## Questions for \${owner || "whoever built the model"}\`);
		L.push("");
		a.questions.forEach((f, i) => L.push(\`\${i + 1}. \${f.rule.ask || f.message} _(\${f.rule.title})_\`));
		L.push("");
	}
	if (a.notes.length) {
		L.push("## Also worth checking");
		L.push("");
		for (const f of a.notes) {
			const impact = f.impact ? \` Using \${f.rule.benchmark.label} would move the result \${shift(f.impact.delta)}.\` : "";
			L.push(\`- **\${f.rule.title}.** \${f.message}\${impact}\`);
		}
		L.push("");
	}
	const firmUp = firmUpList(a);
	if (firmUp.length) {
		L.push("## Filled in for you");
		L.push("");
		for (const item of firmUp) L.push(\`- \${item}\`);
		L.push("");
	}
	L.push("## Not in the numbers");
	L.push("");
	L.push("- The VPPA’s value as a long-term hedge against rising power prices.");
	L.push("- Earnings volatility if the VPPA is marked to market as a derivative.");
	L.push("- Impact: a VPPA for a new project can claim to add renewable capacity; unbundled RECs rarely can.");
	L.push("");
	return L.join("\\n");
}
/** A compact, JSON-safe summary for tools and scripts. */
function adviceSummary(a) {
	const brief = (f) => ({
		id: f.rule.id,
		severity: f.rule.severity,
		title: f.rule.title,
		message: f.message,
		ask: f.rule.ask,
		benchmark: f.rule.benchmark ? {
			input: f.rule.benchmark.input,
			value: f.rule.benchmark.value,
			label: f.rule.benchmark.label
		} : void 0,
		impact: f.impact ? {
			delta: Math.round(f.impact.delta),
			reverses: f.impact.flips
		} : void 0
	});
	return {
		headline: a.headline,
		summary: a.summary,
		confidence: a.confidence,
		confidenceText: confidenceText(a),
		recommendation: {
			submitted: a.submitted.recommendation,
			corrected: a.corrected.recommendation
		},
		npvAdvantage: {
			submitted: Math.round(a.submitted.npvAdvantage),
			corrected: Math.round(a.corrected.npvAdvantage)
		},
		breakEvenStrike: Number.isFinite(a.breakEvenStrike) ? Math.round(a.breakEvenStrike * 100) / 100 : null,
		breakEvenEscalation: Number.isFinite(a.breakEvenEscalation) ? Math.round(a.breakEvenEscalation * 1e4) / 1e4 : null,
		premiumPerMWh: Number.isFinite(a.premiumPerMWh) ? Math.round(a.premiumPerMWh * 100) / 100 : null,
		inputProblems: a.problems.map((p) => p.message),
		rejected: a.rejected,
		corrections: a.corrections.map(brief),
		superseded: a.superseded.map(brief),
		questions: a.questions.map(brief),
		notes: a.notes.map(brief),
		changeConditions: changeConditions(a),
		assumed: a.assumed,
		inputs: a.inputs,
		correctedInputs: a.correctedInputs
	};
}
/** Assumed or rejected inputs, each with where to get a reliable number. */
function firmUpList(a) {
	const out = [];
	for (const r of a.rejected) {
		const def = FACT_BY_KEY[r.key];
		out.push(\`\${def?.label ?? r.key}: the source gave \${JSON.stringify(r.given)}, which is \${r.reason}, so \${formatFact(r.key, a.inputs[r.key])} was used.\${def?.source ? \` Get it from: \${def.source}.\` : ""}\`);
	}
	const rejectedKeys = new Set(a.rejected.map((r) => r.key));
	for (const k of a.assumed) {
		if (rejectedKeys.has(k)) continue;
		const def = FACT_BY_KEY[k];
		out.push(\`\${def?.label ?? k}: \${formatFact(k, a.inputs[k])}.\${def?.source ? \` Get it from: \${def.source}.\` : ""}\`);
	}
	return out;
}
// src/engine/inputs.ts
/** For percentage fields given without a % sign: values above this are read as percents. */
var MAX_FRACTION = {
	capacityFactor: .7,
	captureRate: 1.5,
	degradation: .05,
	wholesaleEscalation: .25,
	strikeEscalation: .25,
	recEscalation: .5,
	discountRate: .3
};
/** Reads 7.5, "7.5%", and 0.075 all as 7.5% for percentage fields. */
function asFraction(key, value, hadPercentSign) {
	if (!(key in MAX_FRACTION)) return value;
	return hadPercentSign || Math.abs(value) > MAX_FRACTION[key] ? value / 100 : value;
}
var DILIGENCE_KEYS = [
	"accountingReviewed",
	"creditSupportReviewed",
	"negativePriceTermsReviewed",
	"marketBoundaryConfirmed",
	"scope2RevisionConsidered"
];
/**
* What to use when a model doesn't state a value. Core economics get a
* benchmark and are reported as assumed. Refinements a model can silently
* leave out (degradation, capture rate, transaction costs, basis) default to
* "not modeled", so the checks that look for those gaps still fire.
*/
function defaultsFor(technology) {
	return {
		scenarioName: "VPPA vs. unbundled RECs",
		assumptionOwner: "",
		technology,
		market: "Other",
		capacityMW: 100,
		capacityFactor: technology === "wind" ? .36 : .24,
		degradation: 0,
		termYears: 15,
		strikePrice: technology === "wind" ? 72 : 63,
		strikeEscalation: 0,
		settlementPoint: "hub",
		basis: 0,
		transactionCost: 0,
		hubPrice: 45,
		wholesaleEscalation: .0275,
		captureRate: 1,
		annualLoadMWh: 0,
		recPrice: 4.5,
		recEscalation: .02,
		discountRate: .08
	};
}
/** Defaults that stand in for a missing number rather than a missing refinement. */
var ASSUMED_WHEN_MISSING = /* @__PURE__ */ new Set([...FACTS.filter((f) => f.core).map((f) => f.key), "recEscalation"]);
function toNumber(v) {
	if (typeof v === "number") return Number.isFinite(v) ? v : void 0;
	if (typeof v === "string" && v.trim()) {
		const n = Number(v.replace(/[,$%\\s]/g, ""));
		return Number.isFinite(n) ? n : void 0;
	}
}
function toBool(v) {
	if (typeof v === "boolean") return v;
	if (typeof v === "string") {
		if (/^(true|yes|y|done|1)$/i.test(v.trim())) return true;
		if (/^(false|no|n|0)$/i.test(v.trim())) return false;
	}
}
/**
* Turns a partial, loosely typed set of assumptions (from a pasted table, a
* JSON file Claude wrote, or a form) into a full scenario, and records which
* values were filled in so the advice can say so.
*/
function completeInputs(partial) {
	const src = { ...partial };
	if (src.diligence && typeof src.diligence === "object") Object.assign(src, src.diligence);
	const base = defaultsFor(String(src.technology ?? "").toLowerCase() === "wind" ? "wind" : "solar");
	const diligence = {
		accountingReviewed: false,
		creditSupportReviewed: false,
		negativePriceTermsReviewed: false,
		marketBoundaryConfirmed: false,
		scope2RevisionConsidered: false
	};
	const inputs = {
		...base,
		diligence
	};
	const assumed = [];
	const known = /* @__PURE__ */ new Set([
		...Object.keys(base),
		...DILIGENCE_KEYS,
		"diligence",
		"annualGenerationMWh"
	]);
	const ignored = Object.keys(partial).filter((k) => !known.has(k));
	const rejected = [];
	if (!/^(solar|wind)$/i.test(String(src.technology ?? "").trim())) assumed.push("technology");
	if (typeof src.scenarioName === "string" && src.scenarioName.trim()) inputs.scenarioName = src.scenarioName.trim();
	if (typeof src.assumptionOwner === "string") inputs.assumptionOwner = src.assumptionOwner.trim();
	const market = MARKETS.find((m) => m.toLowerCase() === String(src.market ?? "").toLowerCase().replace(/\\s+/g, ""));
	if (market) inputs.market = market;
	else if (String(src.market ?? "").toLowerCase().replace(/[\\s-]/g, "") === "isone") inputs.market = "ISO-NE";
	else assumed.push("market");
	if (String(src.settlementPoint ?? "").toLowerCase().startsWith("node")) inputs.settlementPoint = "node";
	for (const key of Object.keys(base)) {
		if (FACT_BY_KEY[key]?.format === "text" || key === "scenarioName" || key === "assumptionOwner") continue;
		const n = toNumber(src[key]);
		const percentSign = typeof src[key] === "string" && src[key].includes("%");
		const value = n === void 0 ? void 0 : asFraction(key, n, percentSign);
		const range = FACT_BY_KEY[key]?.range;
		if (value !== void 0 && range && (value < range[0] || value > range[1])) {
			rejected.push({
				key,
				given: src[key],
				reason: \`outside the possible range for \${FACT_BY_KEY[key].label.toLowerCase()}\`
			});
			if (ASSUMED_WHEN_MISSING.has(key)) assumed.push(key);
		} else if (value !== void 0) inputs[key] = value;
		else if (ASSUMED_WHEN_MISSING.has(key)) assumed.push(key);
	}
	const generation = toNumber(src.annualGenerationMWh);
	if (generation && generation > 0) {
		const hasMW = !assumed.includes("capacityMW");
		const hasCF = !assumed.includes("capacityFactor");
		if (hasMW && !hasCF) {
			inputs.capacityFactor = generation / (inputs.capacityMW * 8760);
			assumed.splice(assumed.indexOf("capacityFactor"), 1);
		} else if (!hasMW) {
			inputs.capacityMW = generation / (inputs.capacityFactor * 8760);
			assumed.splice(assumed.indexOf("capacityMW"), 1);
		}
	}
	if (assumed.includes("annualLoadMWh") || inputs.annualLoadMWh <= 0) {
		inputs.annualLoadMWh = Math.round(inputs.capacityMW * 8760 * inputs.capacityFactor);
		if (!assumed.includes("annualLoadMWh")) assumed.push("annualLoadMWh");
	}
	for (const k of DILIGENCE_KEYS) {
		const b = toBool(src[k]);
		if (b !== void 0) inputs.diligence[k] = b;
	}
	return {
		inputs,
		assumed,
		ignored,
		rejected
	};
}
// scripts/preflight-cli.ts
function fail(message) {
	process.stderr.write(\`\${message}\\n\\nUsage: node preflight.mjs inputs.json [--checks team-checks.json] [--json]\\n\`);
	process.exit(1);
}
var args = process.argv.slice(2);
var json = args.includes("--json");
var checksAt = args.indexOf("--checks");
var checksPath = checksAt >= 0 ? args[checksAt + 1] : void 0;
var file = args.find((a, i) => (a === "-" || !a.startsWith("-")) && (checksAt < 0 || i !== checksAt + 1));
if (!file) fail("Give the path to an inputs JSON file, or - to read from stdin.");
var raw;
try {
	raw = JSON.parse(readFileSync(file === "-" ? 0 : file, "utf8"));
} catch (e) {
	fail(\`Could not read \${file} as JSON: \${e.message}\`);
}
if (!raw || typeof raw !== "object" || Array.isArray(raw)) fail("The inputs file must contain one JSON object.");
var playbook = {
	custom: [],
	edits: {},
	disabled: []
};
var here = dirname(fileURLToPath(import.meta.url));
var teamFile = checksPath ?? [join(here, "..", "team-checks.json"), join(here, "team-checks.json")].find((p) => existsSync(p));
if (teamFile) try {
	playbook = parsePlaybook(JSON.parse(readFileSync(teamFile, "utf8")));
} catch (e) {
	fail(\`Could not read team checks from \${teamFile}: \${e.message}\`);
}
var { inputs, assumed, ignored, rejected } = completeInputs(raw);
var advice = advise(inputs, activeRules(playbook), {
	assumed,
	rejected
});
if (json) process.stdout.write(\`\${JSON.stringify({
	...adviceSummary(advice),
	ignoredKeys: ignored,
	teamChecks: playbook.custom.length,
	markdown: renderAdvice(advice)
}, null, 2)}\\n\`);
else {
	process.stdout.write(renderAdvice(advice));
	if (ignored.length) process.stdout.write(\`\\n_Ignored unknown keys: \${ignored.join(", ")}._\\n\`);
}
export {};
`;function Yt(e,t){let n=[{path:`${Vt}/SKILL.md`,content:Ht(xe(e),{generatedOn:t})},{path:`${Vt}/scripts/preflight.mjs`,content:Jt},{path:`${Vt}/example-inputs.json`,content:qt}];return(e.custom.length||Object.keys(e.edits).length||e.disabled.length)&&n.push({path:`${Vt}/team-checks.json`,content:`${JSON.stringify(Te(e,t),null,2)}\n`}),n}var F=(()=>{let e=new Uint32Array(256);for(let t=0;t<256;t++){let n=t;for(let e=0;e<8;e++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n>>>0}return e})();function Xt(e){let t=4294967295;for(let n of e)t=F[(t^n)&255]^t>>>8;return(t^4294967295)>>>0}var Zt=33,Qt=2048;function $t(e){let t=new TextEncoder,n=[],r=[],i=0;for(let a of e){let e=t.encode(a.path),o=t.encode(a.content),s=Xt(o),c=new Uint8Array(30+e.length),l=new DataView(c.buffer);l.setUint32(0,67324752,!0),l.setUint16(4,20,!0),l.setUint16(6,Qt,!0),l.setUint16(12,Zt,!0),l.setUint32(14,s,!0),l.setUint32(18,o.length,!0),l.setUint32(22,o.length,!0),l.setUint16(26,e.length,!0),c.set(e,30),n.push(c,o);let u=new Uint8Array(46+e.length),d=new DataView(u.buffer);d.setUint32(0,33639248,!0),d.setUint16(4,20,!0),d.setUint16(6,20,!0),d.setUint16(8,Qt,!0),d.setUint16(14,Zt,!0),d.setUint32(16,s,!0),d.setUint32(20,o.length,!0),d.setUint32(24,o.length,!0),d.setUint16(28,e.length,!0),d.setUint32(42,i,!0),u.set(e,46),r.push(u),i+=c.length+o.length}let a=r.reduce((e,t)=>e+t.length,0),o=new Uint8Array(22),s=new DataView(o.buffer);s.setUint32(0,101010256,!0),s.setUint16(8,e.length,!0),s.setUint16(10,e.length,!0),s.setUint32(12,a,!0),s.setUint32(16,i,!0);let c=[...n,...r,o],l=new Uint8Array(c.reduce((e,t)=>e+t.length,0)),u=0;for(let e of c)l.set(e,u),u+=e.length;return l}function en({playbook:e,facts:t,onEdit:n,onAdd:r,onToggle:i,onDelete:a,onReset:o,onImport:s,editor:c}){let u=be(e),d=new Set(e.disabled),f=u.filter(e=>e.origin===`team`),p=Object.keys(e.edits).length,m=u.filter(e=>!d.has(e.id)&&ye(e,t)).length,h=(0,l.useRef)(null),[g,_]=(0,l.useState)(``),[v,y]=(0,l.useState)(null),[b,x]=(0,l.useState)(``),S=new Date().toISOString().slice(0,10),ee=u.filter(e=>!d.has(e.id)),te=()=>Ht(ee,{generatedOn:S}),C=()=>JSON.stringify(Te(e,S),null,2),w=async()=>{let t=await _t(`${Vt}.zip`,$t(Yt(e,S)));if(t===`saved`)x(`Saved ${Vt}.zip`);else if(t===`unavailable`){let e=await yt(te());x(e?`Downloads are off here, so SKILL.md was copied instead.`:`Downloads are off here. Use Copy SKILL.md.`)}},T=e=>{let t=new FileReader;t.onload=()=>{try{_(s(JSON.parse(String(t.result))))}catch{_(`That file isn’t a PPA Preflight playbook export.`)}},t.readAsText(e)};return(0,P.jsxs)(`div`,{className:`col`,children:[(0,P.jsxs)(`section`,{className:`panel`,"aria-labelledby":`playbook-title`,children:[(0,P.jsxs)(`div`,{className:`panel-head`,children:[(0,P.jsx)(`h2`,{id:`playbook-title`,children:`Playbook`}),(0,P.jsx)(`span`,{className:`sub`,children:`every check runs on every analysis, before the result is shown`})]}),(0,P.jsxs)(`div`,{className:`panel-body`,children:[(0,P.jsxs)(`div`,{className:`playbook-stats`,children:[(0,P.jsxs)(`div`,{className:`stat`,children:[(0,P.jsx)(`span`,{className:`stat-value`,children:u.length-d.size}),(0,P.jsx)(`span`,{className:`stat-label`,children:`active checks`})]}),(0,P.jsxs)(`div`,{className:`stat`,children:[(0,P.jsx)(`span`,{className:`stat-value`,children:f.length}),(0,P.jsx)(`span`,{className:`stat-label`,children:`added by reviewers`})]}),(0,P.jsxs)(`div`,{className:`stat`,children:[(0,P.jsx)(`span`,{className:`stat-value`,children:p}),(0,P.jsx)(`span`,{className:`stat-label`,children:`built-ins recalibrated`})]}),(0,P.jsxs)(`div`,{className:`stat`,children:[(0,P.jsx)(`span`,{className:`stat-value`,children:m}),(0,P.jsx)(`span`,{className:`stat-label`,children:`firing on this scenario`})]})]}),(0,P.jsx)(`p`,{className:`lede`,children:`When a review catches something no check covers, add it here. From then on it runs automatically, on every scenario, for everyone you share the playbook with. Export it as a Claude skill and Claude applies the same checks, before it presents an analysis.`}),(0,P.jsx)(`div`,{className:`btn-row`,children:(0,P.jsx)(`button`,{type:`button`,className:`btn btn-primary`,onClick:r,children:`Add a check`})}),(0,P.jsxs)(`div`,{className:`grid-2`,children:[(0,P.jsxs)(`div`,{className:`field`,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Claude skill`}),(0,P.jsxs)(`div`,{className:`btn-row`,children:[(0,P.jsx)(`button`,{type:`button`,className:`btn btn-primary`,onClick:w,children:`Download skill (.zip)`}),(0,P.jsx)(Dt,{text:te,copyLabel:`Copy SKILL.md`})]}),(0,P.jsx)(`span`,{className:`field-help`,role:`status`,children:b||`Includes every active check above, your team’s additions, and the calculator. Upload the zip to Claude as a skill, then give Claude any VPPA model and ask for advice.`})]}),(0,P.jsxs)(`div`,{className:`field`,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Share with colleagues`}),(0,P.jsx)(Dt,{text:C,filename:`team-checks.json`,copyLabel:`Copy JSON`,children:(0,P.jsx)(`button`,{type:`button`,className:`btn`,onClick:()=>h.current?.click(),children:`Import JSON`})}),(0,P.jsx)(`input`,{ref:h,type:`file`,accept:`application/json,.json`,hidden:!0,onChange:e=>{let t=e.target.files?.[0];t&&T(t),e.target.value=``}}),(0,P.jsx)(`span`,{className:`field-help`,children:g||`Exports your added, recalibrated, and turned-off checks. Import merges by ID.`})]})]})]})]}),c,(0,P.jsx)(`section`,{className:`panel`,"aria-label":`All checks`,children:(0,P.jsxs)(`div`,{className:`panel-body`,style:{paddingTop:0},children:[he.map(r=>{let s=u.filter(e=>e.category===r);return s.length?(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`category-head`,children:r}),(0,P.jsx)(`ul`,{className:`rule-list`,children:s.map(r=>{let s=d.has(r.id),c=r.origin===`built-in`&&e.edits[r.id]!==void 0;return(0,P.jsxs)(`li`,{className:`rule-row`,"data-disabled":s,children:[(0,P.jsxs)(`div`,{className:`rule-main`,children:[(0,P.jsxs)(`div`,{className:`rule-line`,children:[(0,P.jsx)(Ct,{severity:r.severity}),(0,P.jsx)(`span`,{className:`rule-title`,children:r.title}),(0,P.jsx)(`span`,{className:`rule-id`,children:r.id}),r.origin===`team`?(0,P.jsxs)(`span`,{className:`badge`,"data-kind":`team`,children:[`Added by `,r.addedBy||`a reviewer`,r.addedOn?` · ${r.addedOn}`:``]}):null,c?(0,P.jsx)(`span`,{className:`badge`,children:`Recalibrated`}):null,!s&&ye(r,t)?(0,P.jsx)(`span`,{className:`badge`,"data-kind":`fires`,children:`Firing now`}):null,s?(0,P.jsx)(`span`,{className:`badge`,children:`Off`}):null]}),(0,P.jsxs)(`span`,{className:`rule-meta`,children:[`Fires when `,r.when.map(ce).join(` and `),`.`]}),r.benchmark?(0,P.jsxs)(`span`,{className:`rule-meta`,children:[`Benchmark: `,r.benchmark.data?`refreshed weekly from public market data (default `:``,r.benchmark.label,r.benchmark.data?`)`:``]}):null,r.source?(0,P.jsxs)(`span`,{className:`rule-meta muted`,children:[`Source: `,r.source]}):null,r.lesson?(0,P.jsx)(`span`,{className:`lesson`,children:r.lesson}):null]}),(0,P.jsxs)(`div`,{className:`rule-actions`,children:[(0,P.jsx)(`button`,{type:`button`,className:`btn btn-quiet`,onClick:()=>n(r),children:`Edit`}),(0,P.jsx)(`button`,{type:`button`,className:`btn btn-quiet`,onClick:()=>i(r.id),children:s?`Turn on`:`Turn off`}),c?(0,P.jsx)(`button`,{type:`button`,className:`btn btn-quiet`,onClick:()=>o(r.id),children:`Reset`}):null,r.origin===`team`?v===r.id?(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`button`,{type:`button`,className:`btn`,onClick:()=>{a(r.id),y(null)},children:`Delete for good`}),(0,P.jsx)(`button`,{type:`button`,className:`btn btn-quiet`,onClick:()=>y(null),children:`Keep`})]}):(0,P.jsx)(`button`,{type:`button`,className:`btn btn-quiet`,onClick:()=>y(r.id),children:`Delete`}):null]})]},r.id)})})]},r):null}),(0,P.jsxs)(`p`,{className:`small muted`,style:{paddingTop:14},children:[fe.length,` checks ship with the app. Thresholds and benchmarks are defaults with sources; recalibrate them when the market moves.`]})]})})]})}var tn={open:``,"use-benchmark":`Using benchmark`,accept:`Kept, with reason`,"send-back":`Sent to owner`};function nn({finding:e,inputs:t,decision:n,onDecide:r}){let{rule:i,impact:a}=e,o=M(i),s=Oe(n),c=i.benchmark?.input,l=c?A(c,t[c]):``,u=i.benchmark?A(i.benchmark.input,i.benchmark.value):``,d=[...i.benchmark?[{value:`use-benchmark`,label:`Use ${u}`}]:[],{value:`accept`,label:`Keep, with reason`},{value:`send-back`,label:`Ask owner`}];return(0,P.jsxs)(`li`,{className:`finding`,"data-sev":i.severity,"data-decided":s,children:[(0,P.jsxs)(`div`,{className:`finding-head`,children:[(0,P.jsx)(Ct,{severity:i.severity}),(0,P.jsx)(`span`,{className:`finding-title`,children:i.title}),(0,P.jsx)(`span`,{className:`decision-tag`,"data-open":!s,children:s?`✓ ${tn[n.disposition]}`:o?`Needs a decision`:`Optional`})]}),(0,P.jsx)(`p`,{children:e.message}),a&&i.benchmark?(0,P.jsxs)(`div`,{className:`impact`,children:[(0,P.jsxs)(`span`,{children:[w[i.benchmark.input]?.label??i.benchmark.input,`: `,(0,P.jsx)(`strong`,{children:l}),` → benchmark `,(0,P.jsx)(`strong`,{children:u})]}),(0,P.jsxs)(`span`,{children:[`On its own, this moves the result `,(0,P.jsx)(`strong`,{children:Ne(a.delta)}),`.`,a.flips?(0,P.jsx)(`span`,{className:`flip`,children:` ⇄ The recommendation reverses.`}):null]})]}):null,(0,P.jsxs)(`details`,{className:`why`,children:[(0,P.jsx)(`summary`,{children:`Why this matters`}),(0,P.jsx)(`p`,{children:i.why}),(0,P.jsxs)(`dl`,{children:[i.benchmark?(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`dt`,{children:`Benchmark`}),(0,P.jsx)(`dd`,{children:i.benchmark.label})]}):null,i.ask?(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`dt`,{children:`Ask`}),(0,P.jsx)(`dd`,{children:i.ask})]}):null,i.source?(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`dt`,{children:`Source`}),(0,P.jsx)(`dd`,{children:i.source})]}):null,i.lesson?(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`dt`,{children:`Origin`}),(0,P.jsx)(`dd`,{children:i.lesson})]}):null,(0,P.jsx)(`dt`,{children:`Check`}),(0,P.jsxs)(`dd`,{children:[(0,P.jsx)(`span`,{className:`rule-id`,children:i.id}),i.origin===`team`&&i.addedBy?` · added by ${i.addedBy}`:``]})]})]}),(0,P.jsxs)(`div`,{className:`decision`,children:[(0,P.jsx)(Et,{label:`Decision for ${i.title}`,value:n.disposition,options:d,onChange:e=>r({...n,disposition:n.disposition===e?`open`:e})}),n.disposition===`accept`||n.disposition===`send-back`?(0,P.jsxs)(`label`,{className:`field`,htmlFor:`note-${i.id}`,children:[(0,P.jsx)(`span`,{className:`field-label`,children:n.disposition===`accept`?`Why is the submitted value right? (required)`:`Note for the assumption owner (optional)`}),(0,P.jsx)(`textarea`,{id:`note-${i.id}`,className:`textarea`,rows:2,value:n.note,placeholder:n.disposition===`accept`?`e.g. Contract has a 2.5% annual escalator, so the gap is smaller than shown.`:``,onChange:e=>r({...n,note:e.target.value})})]}):null]})]})}function rn({inputs:e,findings:t,review:n,checksRun:r,onDecide:i}){let a=e=>t.filter(t=>t.rule.severity===e).length,o=t.filter(e=>M(e.rule)&&!Oe(De(n,e.rule.id))).length;return(0,P.jsxs)(`section`,{className:`panel`,"aria-labelledby":`preflight-title`,children:[(0,P.jsxs)(`div`,{className:`panel-head`,children:[(0,P.jsx)(`h2`,{id:`preflight-title`,children:`Preflight`}),(0,P.jsxs)(`span`,{className:`sub`,children:[r,` checks ran before the result was shown`]})]}),(0,P.jsxs)(`div`,{className:`panel-body`,children:[(0,P.jsxs)(`div`,{className:`tally`,"aria-live":`polite`,children:[(0,P.jsxs)(`span`,{children:[(0,P.jsx)(`strong`,{children:a(`critical`)}),` critical`]}),(0,P.jsxs)(`span`,{children:[(0,P.jsx)(`strong`,{children:a(`warning`)}),` warnings`]}),(0,P.jsxs)(`span`,{children:[(0,P.jsx)(`strong`,{children:a(`info`)}),` notes`]}),(0,P.jsxs)(`span`,{children:[(0,P.jsx)(`strong`,{children:o}),` `,o===1?`decision`:`decisions`,` open`]})]}),t.length?(0,P.jsx)(`ul`,{className:`findings`,children:t.map(t=>(0,P.jsx)(nn,{finding:t,inputs:e,decision:De(n,t.rule.id),onDecide:e=>i(t.rule.id,e)},t.rule.id))}):(0,P.jsx)(`p`,{className:`empty`,children:`Every check passed. The result below can go straight to sign-off.`})]})]})}var an=e=>e.recommendation===`VPPA`?`VPPA`:`Unbundled RECs`;function on(e,t,n){switch(e){case`needs-review`:return`Draft. ${t} flagged ${t===1?`assumption needs`:`assumptions need`} a decision before this result can be signed.`;case`ready`:return`All flags decided. Ready for sign-off.`;case`stale`:return`Assumptions or decisions changed after sign-off. Sign again to confirm.`;case`signed`:return`Signed off by ${n.signOff?.by} on ${n.signOff?.at.slice(0,10)}.`}}function sn({inputs:e,submitted:t,reviewed:n,status:r,openCount:i,review:a,breakEven:o}){let s=t.recommendation!==n.recommendation,c=Math.abs(t.npvAdvantage-n.npvAdvantage)<1,l=Math.abs(n.npvAdvantage);return(0,P.jsxs)(`section`,{className:`panel`,"aria-labelledby":`result-title`,children:[(0,P.jsxs)(`div`,{className:`panel-head`,children:[(0,P.jsx)(`h2`,{id:`result-title`,children:`Result`}),(0,P.jsxs)(`span`,{className:`sub`,children:[`NPV over `,e.termYears,` years at `,O(e.discountRate)]})]}),(0,P.jsxs)(`div`,{className:`panel-body`,children:[(0,P.jsx)(`div`,{className:`result-banner`,"data-status":r,role:`status`,children:on(r,i,a)}),(0,P.jsxs)(`div`,{className:`hero`,children:[(0,P.jsx)(`span`,{className:`hero-label`,children:c?r===`needs-review`?`Lower-cost option, as submitted (unreviewed)`:`Lower-cost option`:`After review, lower-cost option`}),(0,P.jsxs)(`span`,{className:`hero-figure`,children:[an(n),` by `,D(l)]}),(0,P.jsx)(`p`,{className:`hero-sub`,children:s?`As submitted, the model favored the ${t.recommendation===`VPPA`?`VPPA`:`REC purchase`} by ${D(Math.abs(t.npvAdvantage))}. The benchmark choices you made reverse it.`:c?`No benchmark values have been applied yet. Decide the flags above to see the reviewed result.`:`As submitted: ${an(t)} by ${D(Math.abs(t.npvAdvantage))}.`})]}),(0,P.jsx)(`div`,{className:`table-scroll`,children:(0,P.jsxs)(`table`,{className:`compare`,children:[(0,P.jsx)(`thead`,{children:(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`th`,{scope:`col`}),(0,P.jsx)(`th`,{scope:`col`,children:`As submitted`}),(0,P.jsx)(`th`,{scope:`col`,children:`After review`})]})}),(0,P.jsxs)(`tbody`,{children:[(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`th`,{scope:`row`,children:`Lower-cost option`}),(0,P.jsx)(`td`,{className:`col-submitted`,children:an(t)}),(0,P.jsx)(`td`,{className:`winner`,children:an(n)})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`th`,{scope:`row`,children:`VPPA advantage (NPV)`}),(0,P.jsx)(`td`,{className:`col-submitted`,children:D(t.npvAdvantage,{sign:!0})}),(0,P.jsx)(`td`,{children:D(n.npvAdvantage,{sign:!0})})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`th`,{scope:`row`,children:`VPPA net cost (NPV)`}),(0,P.jsx)(`td`,{className:`col-submitted`,children:D(t.npvVppaCost)}),(0,P.jsx)(`td`,{children:D(n.npvVppaCost)})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`th`,{scope:`row`,children:`REC purchases (NPV)`}),(0,P.jsx)(`td`,{className:`col-submitted`,children:D(t.npvRecCost)}),(0,P.jsx)(`td`,{children:D(n.npvRecCost)})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`th`,{scope:`row`,children:`VPPA settlements, total`}),(0,P.jsx)(`td`,{className:`col-submitted`,children:D(t.totalSettlement,{sign:!0})}),(0,P.jsx)(`td`,{children:D(n.totalSettlement,{sign:!0})})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`th`,{scope:`row`,children:`Break-even wholesale escalation`}),(0,P.jsx)(`td`,{className:`col-submitted`,children:O(o.submittedEsc)}),(0,P.jsx)(`td`,{children:O(o.reviewedEsc)})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`th`,{scope:`row`,children:`Break-even strike price`}),(0,P.jsx)(`td`,{className:`col-submitted`,children:k(o.submittedStrike)}),(0,P.jsx)(`td`,{children:k(o.reviewedStrike)})]})]})]})}),(0,P.jsxs)(`p`,{className:`leaves-out`,children:[(0,P.jsx)(`strong`,{children:`Not in these numbers:`}),` the VPPA’s value as a long-term price hedge, earnings volatility if it is marked to market, and the stronger impact claim that comes from helping finance a new project. Unbundled RECs rarely add new renewable capacity.`]})]})]})}var cn=[`>`,`>=`,`<`,`<=`,`==`,`!=`,`outside`,`between`],ln=[`==`,`!=`],un={">":`is above`,">=":`is at least`,"<":`is below`,"<=":`is at most`,"==":`is`,"!=":`is not`,outside:`is outside`,between:`is between`};function dn(e){let t=w[e]?.format;return t===`pct`?`%`:t===`perMWh`?`$/MWh`:t===`usd`?`$`:t===`mwh`?`MWh`:t===`mw`?`MW`:t===`years`?`yrs`:``}function fn(e,t){let n=w[e],r=t[e];return n.format===`bool`?{fact:e,op:`==`,value:!1}:n.format===`text`?{fact:e,op:`==`,value:n.options?.[0]??``}:{fact:e,op:`>`,value:typeof r==`number`&&Number.isFinite(r)?r:0}}function pn({id:e,value:t,format:n,onChange:r,label:i}){let[a,o]=(0,l.useState)(String(le(t,n)));return(0,P.jsx)(`input`,{id:e,"aria-label":i,className:`input`,inputMode:`decimal`,value:a,onChange:e=>{o(e.target.value);let t=Number(e.target.value.replace(/[,$%\s]/g,``));e.target.value.trim()&&Number.isFinite(t)&&r(ue(t,n))}})}function mn({initial:e,facts:t,isNew:n,onSave:r,onCancel:i}){let[a,o]=(0,l.useState)(e),[s,c]=(0,l.useState)(!1),u=(e,t)=>o(n=>({...n,[e]:t})),d=(e,t)=>u(`when`,a.when.map((n,r)=>r===e?t:n)),f=(0,l.useMemo)(()=>ye(a,t),[a,t]),p=[!a.title.trim()&&`Give the check a title.`,!a.when.length&&`Add at least one condition.`,!a.why.trim()&&`Say why it matters, so the next reviewer understands it.`].filter(Boolean);return(0,P.jsxs)(`section`,{className:`panel editor`,"aria-labelledby":`editor-title`,children:[(0,P.jsxs)(`div`,{className:`panel-head`,children:[(0,P.jsx)(`h2`,{id:`editor-title`,children:n?`Add a check`:`Edit ${a.id}`}),(0,P.jsx)(`span`,{className:`sub`,children:a.origin===`built-in`?`Changes apply in this browser; reset any time.`:`Saved to this browser’s playbook.`})]}),(0,P.jsxs)(`form`,{className:`panel-body`,onSubmit:e=>{e.preventDefault(),c(!0),p.length||r({...a,title:a.title.trim(),why:a.why.trim(),message:a.message.trim()||`${a.title.trim()}.`})},children:[(0,P.jsxs)(`div`,{className:`grid-2`,children:[(0,P.jsxs)(`label`,{className:`field`,htmlFor:`r-title`,style:{gridColumn:`1 / -1`},children:[(0,P.jsx)(`span`,{className:`field-label`,children:`What to check`}),(0,P.jsx)(`input`,{id:`r-title`,className:`input`,value:a.title,placeholder:`e.g. Strike escalator above inflation`,onChange:e=>u(`title`,e.target.value)})]}),(0,P.jsxs)(`label`,{className:`field`,htmlFor:`r-sev`,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Severity`}),(0,P.jsx)(`select`,{id:`r-sev`,className:`select`,value:a.severity,onChange:e=>u(`severity`,e.target.value),children:me.map(e=>(0,P.jsx)(`option`,{value:e,children:e===`critical`?`Critical: blocks sign-off until decided`:e===`warning`?`Warning: needs a decision`:`Note: informational`},e))})]}),(0,P.jsxs)(`label`,{className:`field`,htmlFor:`r-cat`,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Category`}),(0,P.jsx)(`select`,{id:`r-cat`,className:`select`,value:a.category,onChange:e=>u(`category`,e.target.value),children:he.map(e=>(0,P.jsx)(`option`,{value:e,children:e},e))})]})]}),(0,P.jsxs)(`fieldset`,{className:`field`,style:{border:0,padding:0,margin:0,display:`grid`,gap:8},children:[(0,P.jsx)(`legend`,{className:`field-label`,style:{marginBottom:6},children:`Fires when all of these are true`}),a.when.map((e,n)=>{let r=w[e.fact],i=r?.format===`bool`||r?.format===`text`?ln:cn,o=e.op===`outside`||e.op===`between`;return(0,P.jsxs)(`div`,{className:`cond-row`,children:[(0,P.jsxs)(`label`,{className:`field`,htmlFor:`c-fact-${n}`,children:[(0,P.jsxs)(`span`,{className:`field-help`,children:[`Value (now `,A(e.fact,t[e.fact]),`)`]}),(0,P.jsxs)(`select`,{id:`c-fact-${n}`,className:`select`,value:e.fact,onChange:e=>d(n,fn(e.target.value,t)),children:[(0,P.jsx)(`optgroup`,{label:`Assumptions`,children:C.filter(e=>e.kind===`input`).map(e=>(0,P.jsx)(`option`,{value:e.key,children:e.label},e.key))}),(0,P.jsx)(`optgroup`,{label:`Calculated`,children:C.filter(e=>e.kind===`derived`).map(e=>(0,P.jsx)(`option`,{value:e.key,children:e.label},e.key))})]})]}),(0,P.jsxs)(`label`,{className:`field`,htmlFor:`c-op-${n}`,children:[(0,P.jsx)(`span`,{className:`field-help`,children:`Test`}),(0,P.jsx)(`select`,{id:`c-op-${n}`,className:`select`,value:e.op,onChange:r=>{let i=r.target.value,a=typeof t[e.fact]==`number`?t[e.fact]:0,o=i===`outside`||i===`between`?Array.isArray(e.value)?e.value:[a,a]:Array.isArray(e.value)?e.value[0]:e.value;d(n,{...e,op:i,value:o})},children:i.map(e=>(0,P.jsx)(`option`,{value:e,children:un[e]},e))})]}),(0,P.jsxs)(`div`,{className:`field`,children:[(0,P.jsxs)(`span`,{className:`field-help`,children:[`Threshold `,dn(e.fact)?`(${dn(e.fact)})`:``]}),r?.format===`bool`?(0,P.jsxs)(`select`,{"aria-label":`Threshold`,className:`select`,value:String(e.value),onChange:t=>d(n,{...e,value:t.target.value===`true`}),children:[(0,P.jsx)(`option`,{value:`false`,children:`no`}),(0,P.jsx)(`option`,{value:`true`,children:`yes`})]}):r?.format===`text`?(0,P.jsx)(`select`,{"aria-label":`Threshold`,className:`select`,value:String(e.value),onChange:t=>d(n,{...e,value:t.target.value}),children:r.options?.map(e=>(0,P.jsx)(`option`,{value:e,children:e},e))}):o&&Array.isArray(e.value)?(0,P.jsxs)(`div`,{className:`grid-2`,children:[(0,P.jsx)(pn,{id:`c-lo-${n}`,label:`Low`,value:e.value[0],format:r.format,onChange:t=>d(n,{...e,value:[t,e.value[1]]})}),(0,P.jsx)(pn,{id:`c-hi-${n}`,label:`High`,value:e.value[1],format:r.format,onChange:t=>d(n,{...e,value:[e.value[0],t]})})]},`${e.fact}-${e.op}`):(0,P.jsx)(pn,{id:`c-val-${n}`,label:`Threshold`,value:Number(e.value),format:r?.format??`usd`,onChange:t=>d(n,{...e,value:t})},`${e.fact}-${e.op}`)]}),(0,P.jsx)(`button`,{type:`button`,className:`btn btn-quiet`,"aria-label":`Remove condition`,onClick:()=>u(`when`,a.when.filter((e,t)=>t!==n)),children:`Remove`})]},n)}),(0,P.jsx)(`div`,{children:(0,P.jsx)(`button`,{type:`button`,className:`btn`,onClick:()=>u(`when`,[...a.when,fn(`wholesaleEscalation`,t)]),children:`Add condition`})})]}),(0,P.jsx)(`p`,{className:`preview-line`,role:`status`,children:a.when.length?(0,P.jsxs)(P.Fragment,{children:[a.when.map(ce).join(` and `),`.`,` `,(0,P.jsx)(`strong`,{children:f?`This check fires on the current scenario.`:`It does not fire on the current scenario.`})]}):`No conditions yet.`}),(0,P.jsxs)(`label`,{className:`field`,htmlFor:`r-message`,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Message when it fires`}),(0,P.jsx)(`input`,{id:`r-message`,className:`input`,value:a.message,onChange:e=>u(`message`,e.target.value)}),(0,P.jsxs)(`span`,{className:`field-help`,children:[`Use `,`{factName}`,` to insert a value, e.g. `,`{strikeEscalation}`,`.`]})]}),(0,P.jsxs)(`label`,{className:`field`,htmlFor:`r-why`,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Why it matters`}),(0,P.jsx)(`textarea`,{id:`r-why`,className:`textarea`,rows:3,value:a.why,onChange:e=>u(`why`,e.target.value)})]}),(0,P.jsxs)(`label`,{className:`field`,htmlFor:`r-ask`,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Question for the assumption owner`}),(0,P.jsx)(`input`,{id:`r-ask`,className:`input`,value:a.ask??``,onChange:e=>u(`ask`,e.target.value)})]}),(0,P.jsxs)(`div`,{className:`grid-2`,children:[(0,P.jsxs)(`label`,{className:`field`,htmlFor:`r-bench-input`,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Benchmark to test against (optional)`}),(0,P.jsxs)(`select`,{id:`r-bench-input`,className:`select`,value:a.benchmark?.input??``,onChange:e=>{let n=e.target.value;u(`benchmark`,n?{input:n,value:typeof t[n]==`number`?t[n]:0,label:``}:void 0)},children:[(0,P.jsx)(`option`,{value:``,children:`None`}),at.map(e=>(0,P.jsx)(`option`,{value:e,children:w[e].label},e))]})]}),a.benchmark?(0,P.jsxs)(`div`,{className:`field`,children:[(0,P.jsxs)(`span`,{className:`field-label`,children:[`Benchmark value `,dn(a.benchmark.input)?`(${dn(a.benchmark.input)})`:``]}),(0,P.jsx)(pn,{id:`r-bench-value`,label:`Benchmark value`,value:a.benchmark.value,format:w[a.benchmark.input].format,onChange:e=>a.benchmark&&u(`benchmark`,{...a.benchmark,value:e})},a.benchmark.input)]}):null,a.benchmark?(0,P.jsxs)(`label`,{className:`field`,htmlFor:`r-bench-label`,style:{gridColumn:`1 / -1`},children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Benchmark description`}),(0,P.jsx)(`input`,{id:`r-bench-label`,className:`input`,value:a.benchmark.label,placeholder:`e.g. Flat strike, as in most current offers`,onChange:e=>a.benchmark&&u(`benchmark`,{...a.benchmark,label:e.target.value})})]}):null]}),(0,P.jsxs)(`div`,{className:`grid-2`,children:[(0,P.jsxs)(`label`,{className:`field`,htmlFor:`r-source`,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Source`}),(0,P.jsx)(`input`,{id:`r-source`,className:`input`,value:a.source??``,placeholder:`Report, index, or ‘reviewer judgment’`,onChange:e=>u(`source`,e.target.value)})]}),(0,P.jsxs)(`label`,{className:`field`,htmlFor:`r-by`,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Added by`}),(0,P.jsx)(`input`,{id:`r-by`,className:`input`,value:a.addedBy??``,onChange:e=>u(`addedBy`,e.target.value)})]})]}),(0,P.jsxs)(`label`,{className:`field`,htmlFor:`r-lesson`,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`What happened (optional)`}),(0,P.jsx)(`textarea`,{id:`r-lesson`,className:`textarea`,rows:2,value:a.lesson??``,placeholder:`The review where this was caught, so the next person knows why the check exists.`,onChange:e=>u(`lesson`,e.target.value)})]}),s&&p.length?(0,P.jsx)(`ul`,{className:`small`,role:`alert`,style:{margin:0,color:`var(--critical)`},children:p.map(e=>(0,P.jsx)(`li`,{children:e},e))}):null,(0,P.jsxs)(`div`,{className:`btn-row`,children:[(0,P.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:n?`Add to playbook`:`Save check`}),(0,P.jsx)(`button`,{type:`button`,className:`btn`,onClick:i,children:`Cancel`})]})]})]})}var hn={not_granted:`Claude access was declined for this page. Use the copy-and-paste option below instead.`,sampling_disabled:`Claude isn’t available on this account. Use the copy-and-paste option below instead.`,rate_limited:`Too many requests right now. Wait a minute and try again.`,invalid_json:`Claude’s reply wasn’t in the expected format. Try again.`,refused:`Claude declined this request.`,session_expired:`Your session expired. Sign in again and retry.`};function gn({prompt:e,onPromote:t}){let[n,r]=(0,l.useState)(null),[i,a]=(0,l.useState)(!1),[o,s]=(0,l.useState)(``),[c,u]=(0,l.useState)(null),[d,f]=(0,l.useState)(``),p=(0,l.useRef)(null);return(0,l.useEffect)(()=>{let e=!0;return ht()&&gt(`sample`).then(t=>e&&r(()=>t)),()=>{e=!1,p.current?.abort()}},[]),(0,P.jsxs)(`section`,{className:`panel`,"aria-labelledby":`second-look-title`,children:[(0,P.jsxs)(`div`,{className:`panel-head`,children:[(0,P.jsx)(`h2`,{id:`second-look-title`,children:`Second look`}),(0,P.jsx)(`span`,{className:`sub`,children:`for what the checks don’t cover yet`})]}),(0,P.jsxs)(`div`,{className:`panel-body`,children:[(0,P.jsx)(`p`,{className:`lede small`,children:`The checklist only knows what reviewers have taught it. Claude can suggest other issues for this deal. Treat them as leads: a person verifies each one before it becomes a check.`}),n?(0,P.jsxs)(`div`,{className:`btn-row`,children:[(0,P.jsx)(`button`,{type:`button`,className:`btn btn-primary`,onClick:async()=>{if(n){p.current=new AbortController,a(!0),s(``);try{let t=await n.json(e,{signal:p.current.signal,cache:!1});u(lt(t))}catch(e){let t=e.code??`upstream_error`;(t===`not_granted`||t===`sampling_disabled`||t===`capability_disabled`||t===`not_declared`)&&r(null),t!==`cancelled`&&s(hn[t]??`Something went wrong reaching Claude. Try again.`)}finally{a(!1)}}},disabled:i,children:i?`Thinking…`:c?`Ask Claude again`:`Ask Claude what the checks missed`}),i?(0,P.jsx)(`button`,{type:`button`,className:`btn`,onClick:()=>p.current?.abort(),children:`Stop`}):null]}):null,(0,P.jsxs)(`details`,{className:`disclosure`,children:[(0,P.jsx)(`summary`,{children:n?`Or use Claude in another window`:`Ask Claude in another window`}),(0,P.jsxs)(`div`,{style:{display:`grid`,gap:10},children:[(0,P.jsx)(`p`,{className:`small`,children:`Copy the prompt (it includes this scenario and the checks that already ran), paste it into Claude, then paste the reply here.`}),(0,P.jsx)(Dt,{text:e,copyLabel:`Copy prompt for Claude`}),(0,P.jsxs)(`label`,{className:`field`,htmlFor:`pasted-reply`,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Claude’s reply`}),(0,P.jsx)(`textarea`,{id:`pasted-reply`,className:`textarea`,rows:3,value:d,onChange:e=>f(e.target.value)})]}),(0,P.jsx)(`div`,{children:(0,P.jsx)(`button`,{type:`button`,className:`btn`,disabled:!d.trim(),onClick:()=>{try{u(ut(d)),s(``)}catch{s(`That reply has no JSON in it. Paste Claude’s whole answer.`)}},children:`Read reply`})})]})]}),o?(0,P.jsx)(`p`,{className:`small`,role:`alert`,children:o}):null,c?c.length?(0,P.jsx)(`ul`,{className:`suggestions`,children:c.map((e,n)=>(0,P.jsxs)(`li`,{className:`suggestion`,children:[(0,P.jsxs)(`div`,{className:`finding-head`,children:[(0,P.jsx)(Ct,{severity:e.severity}),(0,P.jsx)(`span`,{className:`finding-title`,children:e.title}),(0,P.jsx)(`span`,{className:`unverified`,children:`Unverified`})]}),e.why?(0,P.jsx)(`p`,{className:`small`,children:e.why}):null,e.ask?(0,P.jsxs)(`p`,{className:`small`,children:[(0,P.jsx)(`strong`,{children:`Ask:`}),` `,e.ask]}):null,(0,P.jsx)(`p`,{className:`small muted`,children:e.when.length?`Proposed check: fires when ${e.when.map(ce).join(` and `)}.`:`No automatic check proposed; this one needs judgment each time.`}),(0,P.jsxs)(`div`,{className:`btn-row`,children:[(0,P.jsx)(`button`,{type:`button`,className:`btn`,onClick:()=>t(e),children:`Turn into a check`}),(0,P.jsx)(`button`,{type:`button`,className:`btn btn-quiet`,onClick:()=>u(c.filter((e,t)=>t!==n)),children:`Dismiss`})]})]},`${e.title}-${n}`))}):(0,P.jsx)(`p`,{className:`empty`,children:`No new issues suggested.`}):null]})]})}var _n=240,vn={top:12,right:16,bottom:28,left:52};function yn(e,t){let n=e/t,r=10**Math.floor(Math.log10(n)),i=n/r;return(i<1.5?1:i<3?2:i<7?5:10)*r}function bn({submitted:e,reviewed:t,showReviewed:n}){let[r,i]=Ot(),[a,o]=(0,l.useState)(null),s=e.rows.map(e=>e.settlement),c=t.rows.map(e=>e.settlement),u=n?[...s,...c,0]:[...s,0],d=yn(Math.max(...u)-Math.min(...u)||1,5),f=Math.floor(Math.min(...u)/d)*d,p=Math.ceil(Math.max(...u)/d)*d,m=s.length,h=i-vn.left-vn.right,g=_n-vn.top-vn.bottom,_=e=>vn.left+(m===1?h/2:e/(m-1)*h),v=e=>vn.top+(1-(e-f)/(p-f||1))*g,y=e=>e.map((e,t)=>`${t?`L`:`M`}${_(t).toFixed(1)},${v(e).toFixed(1)}`).join(``),b=[];for(let e=f;e<=p+d/2;e+=d)b.push(e);let x=m>12?i<420?5:2:1,S=(e,t)=>{let n=(e-t.left)/t.width*i,r=Math.round((n-vn.left)/h*(m-1));o(Math.max(0,Math.min(m-1,r)))},ee=a===null?0:Math.min(Math.max(_(a)+12,0),i-170);return(0,P.jsxs)(`figure`,{className:`chart`,style:{margin:0},children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`chart-title`,children:`Annual VPPA settlement`}),(0,P.jsx)(`div`,{className:`chart-sub`,children:`Above zero, the developer pays you. Below zero, you pay the developer.`})]}),(0,P.jsxs)(`div`,{className:`legend`,children:[(0,P.jsxs)(`span`,{children:[(0,P.jsx)(`span`,{className:`key-line`,style:{background:`var(--series-muted)`}}),` As submitted`]}),n?(0,P.jsxs)(`span`,{children:[(0,P.jsx)(`span`,{className:`key-line`,style:{background:`var(--series-a)`}}),` After review`]}):null]}),(0,P.jsxs)(`div`,{ref:r,style:{position:`relative`},children:[(0,P.jsxs)(`svg`,{viewBox:`0 0 ${i} ${_n}`,role:`img`,"aria-label":`Line chart of annual VPPA settlement by contract year, as submitted and after review. Values are in the year-by-year table.`,onPointerMove:e=>S(e.clientX,e.currentTarget.getBoundingClientRect()),onPointerLeave:()=>o(null),children:[b.map(e=>(0,P.jsxs)(`g`,{children:[(0,P.jsx)(`line`,{x1:vn.left,x2:i-vn.right,y1:v(e),y2:v(e),stroke:e===0?`var(--axis)`:`var(--grid)`,strokeWidth:1}),(0,P.jsx)(`text`,{x:vn.left-8,y:v(e)+4,textAnchor:`end`,className:e===0?`strong`:void 0,children:e===0?`$0`:D(e)})]},e)),s.map((e,t)=>t%x===0||t===m-1?(0,P.jsx)(`text`,{x:_(t),y:232,textAnchor:`middle`,children:t===0?`Yr 1`:t+1},t):null),(0,P.jsx)(`path`,{d:y(s),fill:`none`,stroke:`var(--series-muted)`,strokeWidth:2,strokeLinejoin:`round`,strokeLinecap:`round`}),n?(0,P.jsx)(`path`,{d:y(c),fill:`none`,stroke:`var(--series-a)`,strokeWidth:2,strokeLinejoin:`round`,strokeLinecap:`round`}):null,(0,P.jsx)(`circle`,{cx:_(m-1),cy:v(s[m-1]),r:4,fill:`var(--series-muted)`,stroke:`var(--surface)`,strokeWidth:2}),n?(0,P.jsx)(`circle`,{cx:_(m-1),cy:v(c[m-1]),r:4,fill:`var(--series-a)`,stroke:`var(--surface)`,strokeWidth:2}):null,a===null?null:(0,P.jsxs)(`g`,{children:[(0,P.jsx)(`line`,{x1:_(a),x2:_(a),y1:vn.top,y2:_n-vn.bottom,stroke:`var(--axis)`,strokeWidth:1}),(0,P.jsx)(`circle`,{cx:_(a),cy:v(s[a]),r:4,fill:`var(--series-muted)`,stroke:`var(--surface)`,strokeWidth:2}),n?(0,P.jsx)(`circle`,{cx:_(a),cy:v(c[a]),r:4,fill:`var(--series-a)`,stroke:`var(--surface)`,strokeWidth:2}):null]})]}),a===null?null:(0,P.jsxs)(`div`,{className:`tooltip`,style:{left:ee,top:8},children:[(0,P.jsxs)(`span`,{className:`tooltip-head`,children:[`Year `,a+1]}),(0,P.jsxs)(`span`,{className:`tooltip-row`,children:[(0,P.jsx)(`span`,{className:`key-line`,style:{background:`var(--series-muted)`}}),(0,P.jsx)(`strong`,{children:D(s[a],{sign:!0})}),` as submitted`]}),n?(0,P.jsxs)(`span`,{className:`tooltip-row`,children:[(0,P.jsx)(`span`,{className:`key-line`,style:{background:`var(--series-a)`}}),(0,P.jsx)(`strong`,{children:D(c[a],{sign:!0})}),` after review`]}):null]})]})]})}function xn({status:e,openCount:t,review:n,reviewer:r,onReviewer:i,onSign:a,onUnsign:o,memo:s}){let c=(e===`ready`||e===`stale`)&&r.trim().length>0;return(0,P.jsxs)(`section`,{className:`panel`,"aria-labelledby":`signoff-title`,children:[(0,P.jsx)(`div`,{className:`panel-head`,children:(0,P.jsx)(`h2`,{id:`signoff-title`,children:`Sign-off & pushback memo`})}),(0,P.jsxs)(`div`,{className:`panel-body`,children:[(0,P.jsx)(`p`,{className:`lede small`,children:`The checks find and price the problems. A named reviewer decides what to do about each one and owns the result.`}),(0,P.jsxs)(`div`,{className:`signoff`,children:[(0,P.jsxs)(`label`,{className:`field`,htmlFor:`reviewer-name`,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Reviewer`}),(0,P.jsx)(`input`,{id:`reviewer-name`,className:`input`,value:r,placeholder:`Your name`,onChange:e=>i(e.target.value)})]}),e===`signed`?(0,P.jsx)(`button`,{type:`button`,className:`btn`,onClick:o,children:`Withdraw sign-off`}):(0,P.jsx)(`button`,{type:`button`,className:`btn btn-primary`,disabled:!c,onClick:a,children:e===`stale`?`Sign again`:`Sign off on this result`})]}),(0,P.jsx)(`p`,{className:`small muted`,role:`status`,children:e===`needs-review`?`Sign-off unlocks when all ${t} open ${t===1?`decision is`:`decisions are`} made. Keeping a flagged value needs a written reason.`:e===`signed`?`Signed by ${n.signOff?.by} on ${n.signOff?.at.slice(0,10)}. Changing any assumption or decision marks this sign-off as out of date.`:e===`stale`?`Something changed after the last sign-off.`:r.trim()?`Ready.`:`Enter your name to sign.`}),(0,P.jsxs)(`div`,{className:`field`,children:[(0,P.jsx)(`span`,{className:`field-label`,children:`Memo to the assumption owner`}),(0,P.jsx)(`pre`,{className:`memo`,tabIndex:0,children:s})]}),(0,P.jsx)(Dt,{text:s,filename:`assumption-questions.md`,copyLabel:`Copy memo`})]})]})}var Sn=40,Cn=(e,t)=>w[e]?.format===`perMWh`?`$${t.toFixed(t<10?2:0)}`:A(e,t),wn=12,Tn=4,En=24;function Dn({swings:e}){let[t,n]=Ot(),[r,i]=(0,l.useState)(null),a=Math.min(170,Math.round(n*.38)),o=n-a-8,s=Math.max(1,...e.flatMap(e=>[Math.abs(e.lowDelta),Math.abs(e.highDelta)])),c=e=>a+(e+s)/(2*s)*o,u=Tn+e.length*Sn+En,d=(e,t,n)=>{let s=n===`low`?e.lowDelta:e.highDelta,l=Tn+t*Sn+(n===`low`?7:21),u=Math.min(c(0),c(s)),d=Math.max(1,Math.abs(c(s)-c(0))),f=Math.min(4,d/2),p=s>=0,m=p?`M${u},${l}h${d-f}a${f},${f} 0 0 1 ${f},${f}v${wn-2*f}a${f},${f} 0 0 1 -${f},${f}h-${d-f}Z`:`M${u+d},${l}h-${d-f}a${f},${f} 0 0 0 -${f},${f}v${wn-2*f}a${f},${f} 0 0 0 ${f},${f}h${d-f}Z`,h=r?.i===t&&r.which===n;return(0,P.jsxs)(`g`,{children:[(0,P.jsx)(`path`,{d:m,fill:p?`var(--series-a)`:`var(--series-b)`,opacity:r&&!h?.55:1}),(0,P.jsx)(`rect`,{x:a,y:l-1,width:o,height:14,fill:`transparent`,tabIndex:0,"aria-label":`${e.label} at ${A(e.input,n===`low`?e.lowValue:e.highValue)}: ${D(s,{sign:!0})}`,onPointerEnter:()=>i({i:t,which:n}),onPointerLeave:()=>i(null),onFocus:()=>i({i:t,which:n}),onBlur:()=>i(null)})]},n)},f=r?e[r.i]:null,p=f&&r?r.which===`low`?f.lowDelta:f.highDelta:0;return(0,P.jsxs)(`figure`,{className:`chart`,style:{margin:0},children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`chart-title`,children:`What the answer depends on`}),(0,P.jsx)(`div`,{className:`chart-sub`,children:`Change in the VPPA’s advantage when one assumption moves to a low (top bar) or high (bottom bar) value.`})]}),(0,P.jsxs)(`div`,{className:`legend`,children:[(0,P.jsxs)(`span`,{children:[(0,P.jsx)(`span`,{className:`key-rect`,style:{background:`var(--series-a)`}}),` Toward the VPPA`]}),(0,P.jsxs)(`span`,{children:[(0,P.jsx)(`span`,{className:`key-rect`,style:{background:`var(--series-b)`}}),` Toward RECs`]})]}),(0,P.jsxs)(`div`,{ref:t,style:{position:`relative`},children:[(0,P.jsxs)(`svg`,{viewBox:`0 0 ${n} ${u}`,role:`img`,"aria-label":`Sensitivity of the VPPA advantage to each assumption`,children:[(0,P.jsx)(`line`,{x1:c(0),x2:c(0),y1:Tn,y2:Tn+e.length*Sn,stroke:`var(--axis)`,strokeWidth:1}),e.map((e,t)=>(0,P.jsxs)(`g`,{children:[(0,P.jsx)(`text`,{x:0,y:Tn+t*Sn+16,className:`label`,children:e.label}),(0,P.jsxs)(`text`,{x:0,y:Tn+t*Sn+31,children:[Cn(e.input,e.lowValue),` → `,Cn(e.input,e.highValue)]}),d(e,t,`low`),d(e,t,`high`)]},e.input)),(0,P.jsx)(`text`,{x:a,y:u-6,textAnchor:`start`,children:D(-s)}),(0,P.jsx)(`text`,{x:c(0),y:u-6,textAnchor:`middle`,className:`strong`,children:`$0`}),(0,P.jsx)(`text`,{x:n-8,y:u-6,textAnchor:`end`,children:D(s,{sign:!0})})]}),f&&r?(0,P.jsxs)(`div`,{className:`tooltip`,style:{left:Math.min(Math.max(a,c(p)-80),n-180),top:Tn+r.i*Sn+Sn},children:[(0,P.jsxs)(`span`,{className:`tooltip-head`,children:[f.label,` at `,A(f.input,r.which===`low`?f.lowValue:f.highValue)]}),(0,P.jsxs)(`span`,{className:`tooltip-row`,children:[(0,P.jsx)(`strong`,{children:D(p,{sign:!0})}),` `,p>=0?`toward the VPPA`:`toward RECs`]})]}):null]})]})}var On=[{id:`advice`,label:`Advice`},{id:`analysis`,label:`Detailed review`},{id:`playbook`,label:`Playbook`},{id:`how`,label:`How it works`}],kn={custom:[],edits:{},disabled:[]},An={decisions:{}};function jn(){let e=ft(`inputs`,{});return{...rt,...e,diligence:{...rt.diligence,...e.diligence}}}function Mn(){let e=typeof location>`u`?``:location.hash.slice(1);return On.some(t=>t.id===e)?e:`advice`}var Nn={"needs-review":e=>`Draft · ${e} open`,ready:()=>`Ready to sign`,signed:()=>`✓ Signed off`,stale:()=>`Changed since sign-off`};function Pn(e){return/^(strike|term|transaction|settlement|basis|negativePrice)/.test(e)?`Contract terms`:/^(capacity|degradation|coverage|year1Generation)/.test(e)?`Project output`:/^(hub|wholesale|capture|market|technology|finalYear|escalationMinus|year1S)/.test(e)?`Market prices`:/^(rec|discount|annualLoad)/.test(e)?`Finance & RECs`:/Reviewed$|Confirmed$|Considered$/.test(e)?`Claims & accounting`:`Result robustness`}function Fn(e,t){return{id:e,title:``,category:`Market prices`,severity:`warning`,when:[{fact:`strikeEscalation`,op:`>`,value:.02}],message:``,why:``,ask:``,source:`Reviewer judgment`,origin:`team`,addedBy:t}}function In(){let[e,t]=(0,l.useState)(jn),[n,r]=(0,l.useState)(()=>ft(`assumed`,[])),[i,a]=(0,l.useState)(()=>ft(`rejected`,[])),[o,s]=(0,l.useState)(()=>({...kn,...ft(`playbook`,kn)})),[c,u]=(0,l.useState)(()=>ft(`review`,An)),[d,f]=(0,l.useState)(()=>ft(`reviewer`,``)),[p,m]=(0,l.useState)(Mn),[h,g]=(0,l.useState)(null);(0,l.useEffect)(()=>pt(`inputs`,e),[e]),(0,l.useEffect)(()=>pt(`assumed`,n),[n]),(0,l.useEffect)(()=>pt(`rejected`,i),[i]),(0,l.useEffect)(()=>pt(`playbook`,o),[o]),(0,l.useEffect)(()=>pt(`review`,c),[c]),(0,l.useEffect)(()=>pt(`reviewer`,d),[d]),(0,l.useEffect)(()=>{let e=()=>m(Mn());return window.addEventListener(`hashchange`,e),()=>window.removeEventListener(`hashchange`,e)},[]);let _=e=>{m(e);try{history.replaceState(null,``,`#${e}`)}catch{}window.scrollTo({top:0})},v=n=>{let i=Object.keys(n).filter(t=>n[t]!==e[t]);i.length&&(r(e=>e.filter(e=>!i.includes(e))),a(e=>e.filter(e=>!i.includes(e.key)))),t(n)},y=(0,l.useMemo)(()=>xe(o),[o]),x=(0,l.useMemo)(()=>b(e),[e]),S=(0,l.useMemo)(()=>T(e,x),[e,x]),C=(0,l.useMemo)(()=>Se(e,y,x),[e,y,x]),ne=(0,l.useMemo)(()=>Ae(e,C,c),[e,C,c]),E=(0,l.useMemo)(()=>b(ne),[ne]),D=Me(e,C,c),O=ke(C,c).length,k=(0,l.useMemo)(()=>ze(ne),[ne]),re=(0,l.useMemo)(()=>({submittedEsc:S.breakEvenEscalation,reviewedEsc:ee(ne),submittedStrike:S.breakEvenStrike,reviewedStrike:te(ne)}),[S,ne]),ie=Fe({inputs:e,submitted:x,reviewed:E,findings:C,review:c,status:D,breakEvenEscalation:re.submittedEsc,reviewer:d}),ae=(0,l.useMemo)(()=>ot(S,x,C,y),[S,x,C,y]),A=(0,l.useMemo)(()=>{let e={};for(let t of C){let n=new Set(t.rule.when.map(e=>e.fact).filter(e=>w[e]?.kind===`input`&&w[e]?.format!==`text`));t.rule.benchmark&&n.add(t.rule.benchmark.input);for(let r of n){let n=e[r];(!n||j[t.rule.severity]<j[n])&&(e[r]=t.rule.severity)}}return e},[C]),oe=(e,t)=>u(n=>({...n,decisions:{...n.decisions,[e]:t}})),se=(0,l.useMemo)(()=>Be(e,y,{assumed:n,rejected:i,review:c}),[e,y,n,i,c]),ce=e=>{t(e===`example`?rt:it),r([]),a([]),u(An)},le=e=>{let n=$e(e);t(n.inputs),r(n.assumed),a(n.rejected),u(An)},ue=e=>{s(t=>{if(e.origin===`built-in`)return{...t,edits:{...t.edits,[e.id]:e}};let n=t.custom.some(t=>t.id===e.id);return{...t,custom:n?t.custom.map(t=>t.id===e.id?e:t):[...t.custom,e]}}),g(null)},de=e=>{let t;try{t=N(e)}catch{return`No checks found in that file.`}s(e=>{let n=new Map(e.custom.map(e=>[e.id,e]));for(let e of t.custom)n.set(e.id,e);return{custom:[...n.values()],edits:{...e.edits,...t.edits},disabled:[...new Set([...e.disabled,...t.disabled])]}});let n=t.custom.length+Object.keys(t.edits).length;return`Imported ${n} ${n===1?`check`:`checks`}${t.disabled.length?` and ${t.disabled.length} turned off`:``}.`},fe=e=>{let t=Fn(Ce(be(o)),d),n=e?{...t,title:e.title,severity:e.severity,category:e.when[0]?Pn(e.when[0].fact):`Result robustness`,when:e.when.length?e.when:t.when,message:e.title+`.`,why:e.why,ask:e.ask,benchmark:e.benchmark,source:`Suggested by Claude; verified by reviewer`}:t;g({rule:{...n,addedOn:new Date().toISOString().slice(0,10)},isNew:!0}),_(`playbook`)},pe=h?(0,P.jsx)(mn,{initial:h.rule,isNew:h.isNew,facts:S,onSave:ue,onCancel:()=>g(null)},h.rule.id):null,me=Math.abs(E.npvAdvantage-x.npvAdvantage)>=1;return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`header`,{className:`topbar`,children:(0,P.jsxs)(`div`,{className:`topbar-inner gutter`,children:[(0,P.jsxs)(`div`,{className:`brand`,children:[(0,P.jsx)(`span`,{className:`brand-mark`,children:`PPA Preflight`}),(0,P.jsx)(`span`,{className:`brand-tag`,children:`VPPA vs. REC analysis with an assumption check`})]}),(0,P.jsx)(`nav`,{className:`tabs`,role:`tablist`,"aria-label":`Views`,children:On.map(e=>(0,P.jsxs)(`button`,{type:`button`,role:`tab`,className:`tab`,"aria-selected":p===e.id,onClick:()=>_(e.id),children:[e.label,e.id===`playbook`?` (${y.length})`:``]},e.id))}),p===`analysis`?(0,P.jsx)(`span`,{className:`status-pill`,"data-status":D,title:`Review status of the current analysis`,children:Nn[D](O)}):null]})}),(0,P.jsx)(`main`,{className:`page gutter`,children:p===`advice`?(0,P.jsx)(Mt,{advice:se,onRead:le,onExample:()=>ce(`example`),onOpenReview:()=>_(`analysis`)}):p===`analysis`?(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)(`ol`,{className:`loop`,"aria-label":`How a result gets signed`,style:{listStyle:`none`,margin:0,padding:0},children:[(0,P.jsxs)(`li`,{className:`loop-step`,children:[(0,P.jsx)(`span`,{className:`loop-num`,children:`1`}),(0,P.jsxs)(`span`,{className:`loop-title`,children:[`Model`,(0,P.jsx)(`span`,{className:`who`,children:`software`})]}),(0,P.jsx)(`span`,{className:`loop-text`,children:`Runs on the assumptions as submitted.`})]}),(0,P.jsxs)(`li`,{className:`loop-step`,children:[(0,P.jsx)(`span`,{className:`loop-num`,children:`2`}),(0,P.jsxs)(`span`,{className:`loop-title`,children:[`Preflight`,(0,P.jsx)(`span`,{className:`who`,children:`software`})]}),(0,P.jsxs)(`span`,{className:`loop-text`,children:[y.length,` checks test every assumption and price each problem.`]})]}),(0,P.jsxs)(`li`,{className:`loop-step`,"data-who":`person`,children:[(0,P.jsx)(`span`,{className:`loop-num`,children:`3`}),(0,P.jsxs)(`span`,{className:`loop-title`,children:[`Decide & sign`,(0,P.jsx)(`span`,{className:`who`,children:`reviewer`})]}),(0,P.jsx)(`span`,{className:`loop-text`,children:`A named person rules on each flag and owns the result.`})]}),(0,P.jsxs)(`li`,{className:`loop-step`,"data-who":`person`,children:[(0,P.jsx)(`span`,{className:`loop-num`,children:`4`}),(0,P.jsxs)(`span`,{className:`loop-title`,children:[`Teach`,(0,P.jsx)(`span`,{className:`who`,children:`reviewer`})]}),(0,P.jsx)(`span`,{className:`loop-text`,children:`Anything the checks missed becomes a new check.`})]})]}),(0,P.jsxs)(`div`,{className:`desk`,children:[(0,P.jsx)(It,{inputs:e,onChange:v,flags:A,errors:Object.fromEntries(se.problems.map(e=>[e.key,e.message])),onLoadExample:ce}),(0,P.jsxs)(`div`,{className:`col`,children:[(0,P.jsx)(rn,{inputs:e,findings:C,review:c,checksRun:y.length,onDecide:oe}),(0,P.jsx)(sn,{inputs:e,submitted:x,reviewed:E,status:D,openCount:O,review:c,breakEven:re}),(0,P.jsx)(`section`,{className:`panel`,"aria-label":`Charts`,children:(0,P.jsxs)(`div`,{className:`panel-body`,children:[(0,P.jsxs)(`div`,{className:`chart-grid`,children:[(0,P.jsx)(bn,{submitted:x,reviewed:E,showReviewed:me}),(0,P.jsx)(Dn,{swings:k})]}),(0,P.jsx)(Nt,{submitted:x,reviewed:E})]})}),(0,P.jsx)(gn,{prompt:ae,onPromote:fe}),(0,P.jsx)(xn,{status:D,openCount:O,review:c,reviewer:d,onReviewer:f,memo:ie,onSign:()=>u(t=>({...t,signOff:{by:d.trim(),at:new Date().toISOString(),fingerprint:je(e,C,t)}})),onUnsign:()=>u(e=>({decisions:e.decisions}))})]})]})]}):p===`playbook`?(0,P.jsx)(en,{playbook:o,facts:S,editor:pe,onAdd:()=>fe(),onEdit:e=>g({rule:e,isNew:!1}),onToggle:e=>s(t=>({...t,disabled:t.disabled.includes(e)?t.disabled.filter(t=>t!==e):[...t.disabled,e]})),onDelete:e=>s(t=>({...t,custom:t.custom.filter(t=>t.id!==e),disabled:t.disabled.filter(t=>t!==e)})),onReset:e=>s(t=>{let n={...t.edits};return delete n[e],{...t,edits:n}}),onImport:de}):(0,P.jsx)(Bt,{checkCount:y.length})})]})}(0,u.createRoot)(document.getElementById(`root`)).render((0,P.jsx)(l.StrictMode,{children:(0,P.jsx)(In,{})}));