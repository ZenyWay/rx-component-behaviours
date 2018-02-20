!function(){return function t(e,r,n){function o(s,c){if(!r[s]){if(!e[s]){var u="function"==typeof require&&require;if(!c&&u)return u(s,!0);if(i)return i(s,!0);var a=new Error("Cannot find module '"+s+"'");throw a.code="MODULE_NOT_FOUND",a}var p=r[s]={exports:{}};e[s][0].call(p.exports,function(t){var r=e[s][1][t];return o(r||t)},p,p.exports,t,e,r,n)}return r[s].exports}for(var i="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s]);return o}}()({1:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});const n=t(3);r.withEventHandler=n.default},{3:3}],3:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});const n=t(2),o=t(5),i=t(8);t(12),t(13),t(14),t(15),t(16),t(17),t(18),t(19),r.default=function(t){const e=t.toLowerCase(),r=`on${n.capitalize(t)}`;return function(t){const s=t.share(),c=new i.Subject,u=c.takeUntil(s.ignoreElements().defaultIfEmpty());return o.Observable.merge(s,u.withLatestFrom(s,n.shallowMerge)).map(function(t){return Object.assign({},t,{[r]:a})});function a(t){c.next({[e]:t})}}}},{12:12,13:13,14:14,15:15,16:16,17:17,18:18,19:19,2:2,5:5,8:8}],2:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.capitalize=function(t){return t[0].toUpperCase()+t.slice(1).toLowerCase()},r.shallowMerge=function(...t){return Object.assign({},...t)}},{}],5:[function(t,e,r){"use strict";var n=t(58),o=t(60),i=t(44),s=t(57),c=function(){function t(t){this._isScalar=!1,t&&(this._subscribe=t)}return t.prototype.lift=function(e){var r=new t;return r.source=this,r.operator=e,r},t.prototype.subscribe=function(t,e,r){var n=this.operator,i=o.toSubscriber(t,e,r);if(n?n.call(i,this.source):i.add(this.source||!i.syncErrorThrowable?this._subscribe(i):this._trySubscribe(i)),i.syncErrorThrowable&&(i.syncErrorThrowable=!1,i.syncErrorThrown))throw i.syncErrorValue;return i},t.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(e){t.syncErrorThrown=!0,t.syncErrorValue=e,t.error(e)}},t.prototype.forEach=function(t,e){var r=this;if(e||(n.root.Rx&&n.root.Rx.config&&n.root.Rx.config.Promise?e=n.root.Rx.config.Promise:n.root.Promise&&(e=n.root.Promise)),!e)throw new Error("no Promise impl found");return new e(function(e,n){var o;o=r.subscribe(function(e){if(o)try{t(e)}catch(t){n(t),o.unsubscribe()}else t(e)},n,e)})},t.prototype._subscribe=function(t){return this.source.subscribe(t)},t.prototype[i.observable]=function(){return this},t.prototype.pipe=function(){for(var t=[],e=0;e<arguments.length;e++)t[e-0]=arguments[e];return 0===t.length?this:s.pipeFromArray(t)(this)},t.prototype.toPromise=function(t){var e=this;if(t||(n.root.Rx&&n.root.Rx.config&&n.root.Rx.config.Promise?t=n.root.Rx.config.Promise:n.root.Promise&&(t=n.root.Promise)),!t)throw new Error("no Promise impl found");return new t(function(t,r){var n;e.subscribe(function(t){return n=t},function(t){return r(t)},function(){return t(n)})})},t.create=function(e){return new t(e)},t}();r.Observable=c},{44:44,57:57,58:58,60:60}],8:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);function n(){this.constructor=t}t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},o=t(5),i=t(10),s=t(11),c=t(46),u=t(9),a=t(45),p=function(t){function e(e){t.call(this,e),this.destination=e}return n(e,t),e}(i.Subscriber);r.SubjectSubscriber=p;var h=function(t){function e(){t.call(this),this.observers=[],this.closed=!1,this.isStopped=!1,this.hasError=!1,this.thrownError=null}return n(e,t),e.prototype[a.rxSubscriber]=function(){return new p(this)},e.prototype.lift=function(t){var e=new l(this,this);return e.operator=t,e},e.prototype.next=function(t){if(this.closed)throw new c.ObjectUnsubscribedError;if(!this.isStopped)for(var e=this.observers,r=e.length,n=e.slice(),o=0;o<r;o++)n[o].next(t)},e.prototype.error=function(t){if(this.closed)throw new c.ObjectUnsubscribedError;this.hasError=!0,this.thrownError=t,this.isStopped=!0;for(var e=this.observers,r=e.length,n=e.slice(),o=0;o<r;o++)n[o].error(t);this.observers.length=0},e.prototype.complete=function(){if(this.closed)throw new c.ObjectUnsubscribedError;this.isStopped=!0;for(var t=this.observers,e=t.length,r=t.slice(),n=0;n<e;n++)r[n].complete();this.observers.length=0},e.prototype.unsubscribe=function(){this.isStopped=!0,this.closed=!0,this.observers=null},e.prototype._trySubscribe=function(e){if(this.closed)throw new c.ObjectUnsubscribedError;return t.prototype._trySubscribe.call(this,e)},e.prototype._subscribe=function(t){if(this.closed)throw new c.ObjectUnsubscribedError;return this.hasError?(t.error(this.thrownError),s.Subscription.EMPTY):this.isStopped?(t.complete(),s.Subscription.EMPTY):(this.observers.push(t),new u.SubjectSubscription(this,t))},e.prototype.asObservable=function(){var t=new o.Observable;return t.source=this,t},e.create=function(t,e){return new l(t,e)},e}(o.Observable);r.Subject=h;var l=function(t){function e(e,r){t.call(this),this.destination=e,this.source=r}return n(e,t),e.prototype.next=function(t){var e=this.destination;e&&e.next&&e.next(t)},e.prototype.error=function(t){var e=this.destination;e&&e.error&&this.destination.error(t)},e.prototype.complete=function(){var t=this.destination;t&&t.complete&&this.destination.complete()},e.prototype._subscribe=function(t){return this.source?this.source.subscribe(t):s.Subscription.EMPTY},e}(h)},{10:10,11:11,45:45,46:46,5:5,9:9}],13:[function(t,e,r){"use strict";var n=t(5),o=t(25);n.Observable.prototype.defaultIfEmpty=o.defaultIfEmpty},{25:25,5:5}],14:[function(t,e,r){"use strict";var n=t(5),o=t(26);n.Observable.prototype.do=o._do,n.Observable.prototype._do=o._do},{26:26,5:5}],16:[function(t,e,r){"use strict";var n=t(5),o=t(28);n.Observable.prototype.map=o.map},{28:28,5:5}],15:[function(t,e,r){"use strict";var n=t(5),o=t(27);n.Observable.prototype.ignoreElements=o.ignoreElements},{27:27,5:5}],18:[function(t,e,r){"use strict";var n=t(5),o=t(30);n.Observable.prototype.takeUntil=o.takeUntil},{30:30,5:5}],12:[function(t,e,r){"use strict";var n=t(5),o=t(24);n.Observable.merge=o.merge},{24:24,5:5}],17:[function(t,e,r){"use strict";var n=t(5),o=t(29);n.Observable.prototype.share=o.share},{29:29,5:5}],19:[function(t,e,r){"use strict";var n=t(5),o=t(31);n.Observable.prototype.withLatestFrom=o.withLatestFrom},{31:31,5:5}],4:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);function n(){this.constructor=t}t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},o=function(t){function e(e,r,n){t.call(this),this.parent=e,this.outerValue=r,this.outerIndex=n,this.index=0}return n(e,t),e.prototype._next=function(t){this.parent.notifyNext(this.outerValue,t,this.outerIndex,this.index++,this)},e.prototype._error=function(t){this.parent.notifyError(t,this),this.unsubscribe()},e.prototype._complete=function(){this.parent.notifyComplete(this),this.unsubscribe()},e}(t(10).Subscriber);r.InnerSubscriber=o},{10:10}],10:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);function n(){this.constructor=t}t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},o=t(52),i=t(11),s=t(6),c=t(45),u=function(t){function e(r,n,o){switch(t.call(this),this.syncErrorValue=null,this.syncErrorThrown=!1,this.syncErrorThrowable=!1,this.isStopped=!1,arguments.length){case 0:this.destination=s.empty;break;case 1:if(!r){this.destination=s.empty;break}if("object"==typeof r){r instanceof e?(this.syncErrorThrowable=r.syncErrorThrowable,this.destination=r,this.destination.add(this)):(this.syncErrorThrowable=!0,this.destination=new a(this,r));break}default:this.syncErrorThrowable=!0,this.destination=new a(this,r,n,o)}}return n(e,t),e.prototype[c.rxSubscriber]=function(){return this},e.create=function(t,r,n){var o=new e(t,r,n);return o.syncErrorThrowable=!1,o},e.prototype.next=function(t){this.isStopped||this._next(t)},e.prototype.error=function(t){this.isStopped||(this.isStopped=!0,this._error(t))},e.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this))},e.prototype._next=function(t){this.destination.next(t)},e.prototype._error=function(t){this.destination.error(t),this.unsubscribe()},e.prototype._complete=function(){this.destination.complete(),this.unsubscribe()},e.prototype._unsubscribeAndRecycle=function(){var t=this._parent,e=this._parents;return this._parent=null,this._parents=null,this.unsubscribe(),this.closed=!1,this.isStopped=!1,this._parent=t,this._parents=e,this},e}(i.Subscription);r.Subscriber=u;var a=function(t){function e(e,r,n,i){var c;t.call(this),this._parentSubscriber=e;var u=this;o.isFunction(r)?c=r:r&&(c=r.next,n=r.error,i=r.complete,r!==s.empty&&(u=Object.create(r),o.isFunction(u.unsubscribe)&&this.add(u.unsubscribe.bind(u)),u.unsubscribe=this.unsubscribe.bind(this))),this._context=u,this._next=c,this._error=n,this._complete=i}return n(e,t),e.prototype.next=function(t){if(!this.isStopped&&this._next){var e=this._parentSubscriber;e.syncErrorThrowable?this.__tryOrSetError(e,this._next,t)&&this.unsubscribe():this.__tryOrUnsub(this._next,t)}},e.prototype.error=function(t){if(!this.isStopped){var e=this._parentSubscriber;if(this._error)e.syncErrorThrowable?(this.__tryOrSetError(e,this._error,t),this.unsubscribe()):(this.__tryOrUnsub(this._error,t),this.unsubscribe());else{if(!e.syncErrorThrowable)throw this.unsubscribe(),t;e.syncErrorValue=t,e.syncErrorThrown=!0,this.unsubscribe()}}},e.prototype.complete=function(){var t=this;if(!this.isStopped){var e=this._parentSubscriber;if(this._complete){var r=function(){return t._complete.call(t._context)};e.syncErrorThrowable?(this.__tryOrSetError(e,r),this.unsubscribe()):(this.__tryOrUnsub(r),this.unsubscribe())}else this.unsubscribe()}},e.prototype.__tryOrUnsub=function(t,e){try{t.call(this._context,e)}catch(t){throw this.unsubscribe(),t}},e.prototype.__tryOrSetError=function(t,e,r){try{e.call(this._context,r)}catch(e){return t.syncErrorValue=e,t.syncErrorThrown=!0,!0}return!1},e.prototype._unsubscribe=function(){var t=this._parentSubscriber;this._context=null,this._parentSubscriber=null,t.unsubscribe()},e}(u)},{11:11,45:45,52:52,6:6}],58:[function(t,e,r){(function(t){"use strict";var e="undefined"!=typeof window&&window,n="undefined"!=typeof self&&"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope&&self,o=e||void 0!==t&&t||n;r.root=o,function(){if(!o)throw new Error("RxJS could not find any global context (window, self, global)")}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],60:[function(t,e,r){"use strict";var n=t(10),o=t(45),i=t(6);r.toSubscriber=function(t,e,r){if(t){if(t instanceof n.Subscriber)return t;if(t[o.rxSubscriber])return t[o.rxSubscriber]()}return t||e||r?new n.Subscriber(t,e,r):new n.Subscriber(i.empty)}},{10:10,45:45,6:6}],44:[function(t,e,r){"use strict";var n=t(58);function o(t){var e,r=t.Symbol;return"function"==typeof r?r.observable?e=r.observable:(e=r("observable"),r.observable=e):e="@@observable",e}r.observable=o(n.root),r.observable},{58:58}],57:[function(t,e,r){"use strict";var n=t(56);function o(t){return t?1===t.length?t[0]:function(e){return t.reduce(function(t,e){return e(t)},e)}:n.noop}r.pipeFromArray=o},{56:56}],6:[function(t,e,r){"use strict";r.empty={closed:!0,next:function(t){},error:function(t){throw t},complete:function(){}}},{}],7:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);function n(){this.constructor=t}t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},o=function(t){function e(){t.apply(this,arguments)}return n(e,t),e.prototype.notifyNext=function(t,e,r,n,o){this.destination.next(e)},e.prototype.notifyError=function(t,e){this.destination.error(t)},e.prototype.notifyComplete=function(t){this.destination.complete()},e}(t(10).Subscriber);r.OuterSubscriber=o},{10:10}],46:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);function n(){this.constructor=t}t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},o=function(t){function e(){var e=t.call(this,"object unsubscribed");this.name=e.name="ObjectUnsubscribedError",this.stack=e.stack,this.message=e.message}return n(e,t),e}(Error);r.ObjectUnsubscribedError=o},{}],9:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);function n(){this.constructor=t}t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},o=function(t){function e(e,r){t.call(this),this.subject=e,this.subscriber=r,this.closed=!1}return n(e,t),e.prototype.unsubscribe=function(){if(!this.closed){this.closed=!0;var t=this.subject,e=t.observers;if(this.subject=null,e&&0!==e.length&&!t.isStopped&&!t.closed){var r=e.indexOf(this.subscriber);-1!==r&&e.splice(r,1)}}},e}(t(11).Subscription);r.SubjectSubscription=o},{11:11}],45:[function(t,e,r){"use strict";var n=t(58).root.Symbol;r.rxSubscriber="function"==typeof n&&"function"==typeof n.for?n.for("rxSubscriber"):"@@rxSubscriber",r.rxSubscriber},{58:58}],11:[function(t,e,r){"use strict";var n=t(50),o=t(53),i=t(52),s=t(61),c=t(48),u=t(47),a=function(){function t(t){this.closed=!1,this._parent=null,this._parents=null,this._subscriptions=null,t&&(this._unsubscribe=t)}var e;return t.prototype.unsubscribe=function(){var t,e=!1;if(!this.closed){var r=this._parent,a=this._parents,h=this._unsubscribe,l=this._subscriptions;this.closed=!0,this._parent=null,this._parents=null,this._subscriptions=null;for(var f=-1,b=a?a.length:0;r;)r.remove(this),r=++f<b&&a[f]||null;if(i.isFunction(h)&&s.tryCatch(h).call(this)===c.errorObject&&(e=!0,t=t||(c.errorObject.e instanceof u.UnsubscriptionError?p(c.errorObject.e.errors):[c.errorObject.e])),n.isArray(l))for(f=-1,b=l.length;++f<b;){var y=l[f];if(o.isObject(y)&&s.tryCatch(y.unsubscribe).call(y)===c.errorObject){e=!0,t=t||[];var v=c.errorObject.e;v instanceof u.UnsubscriptionError?t=t.concat(p(v.errors)):t.push(v)}}if(e)throw new u.UnsubscriptionError(t)}},t.prototype.add=function(e){if(!e||e===t.EMPTY)return t.EMPTY;if(e===this)return this;var r=e;switch(typeof e){case"function":r=new t(e);case"object":if(r.closed||"function"!=typeof r.unsubscribe)return r;if(this.closed)return r.unsubscribe(),r;if("function"!=typeof r._addParent){var n=r;(r=new t)._subscriptions=[n]}break;default:throw new Error("unrecognized teardown "+e+" added to Subscription.")}return(this._subscriptions||(this._subscriptions=[])).push(r),r._addParent(this),r},t.prototype.remove=function(t){var e=this._subscriptions;if(e){var r=e.indexOf(t);-1!==r&&e.splice(r,1)}},t.prototype._addParent=function(t){var e=this._parent,r=this._parents;e&&e!==t?r?-1===r.indexOf(t)&&r.push(t):this._parents=[t]:this._parent=t},t.EMPTY=((e=new t).closed=!0,e),t}();function p(t){return t.reduce(function(t,e){return t.concat(e instanceof u.UnsubscriptionError?e.errors:e)},[])}r.Subscription=a},{47:47,48:48,50:50,52:52,53:53,61:61}],52:[function(t,e,r){"use strict";r.isFunction=function(t){return"function"==typeof t}},{}],50:[function(t,e,r){"use strict";r.isArray=Array.isArray||function(t){return t&&"number"==typeof t.length}},{}],53:[function(t,e,r){"use strict";r.isObject=function(t){return null!=t&&"object"==typeof t}},{}],48:[function(t,e,r){"use strict";r.errorObject={e:{}}},{}],47:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);function n(){this.constructor=t}t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},o=function(t){function e(e){t.call(this),this.errors=e;var r=Error.call(this,e?e.length+" errors occurred during unsubscription:\n  "+e.map(function(t,e){return e+1+") "+t.toString()}).join("\n  "):"");this.name=r.name="UnsubscriptionError",this.stack=r.stack,this.message=r.message}return n(e,t),e}(Error);r.UnsubscriptionError=o},{}],61:[function(t,e,r){"use strict";var n,o=t(48);function i(){try{return n.apply(this,arguments)}catch(t){return o.errorObject.e=t,o.errorObject}}r.tryCatch=function(t){return n=t,i}},{48:48}],24:[function(t,e,r){"use strict";var n=t(5),o=t(20),i=t(55),s=t(35);r.merge=function(){for(var t=[],e=0;e<arguments.length;e++)t[e-0]=arguments[e];var r=Number.POSITIVE_INFINITY,c=null,u=t[t.length-1];return i.isScheduler(u)?(c=t.pop(),t.length>1&&"number"==typeof t[t.length-1]&&(r=t.pop())):"number"==typeof u&&(r=t.pop()),null===c&&1===t.length&&t[0]instanceof n.Observable?t[0]:s.mergeAll(r)(new o.ArrayObservable(t,c))}},{20:20,35:35,5:5,55:55}],25:[function(t,e,r){"use strict";var n=t(32);r.defaultIfEmpty=function(t){return void 0===t&&(t=null),n.defaultIfEmpty(t)(this)}},{32:32}],26:[function(t,e,r){"use strict";var n=t(41);r._do=function(t,e,r){return n.tap(t,e,r)(this)}},{41:41}],27:[function(t,e,r){"use strict";var n=t(33);r.ignoreElements=function(){return n.ignoreElements()(this)}},{33:33}],28:[function(t,e,r){"use strict";var n=t(34);r.map=function(t,e){return n.map(t,e)(this)}},{34:34}],29:[function(t,e,r){"use strict";var n=t(39);r.share=function(){return n.share()(this)}},{39:39}],30:[function(t,e,r){"use strict";var n=t(40);r.takeUntil=function(t){return n.takeUntil(t)(this)}},{40:40}],31:[function(t,e,r){"use strict";var n=t(42);r.withLatestFrom=function(){for(var t=[],e=0;e<arguments.length;e++)t[e-0]=arguments[e];return n.withLatestFrom.apply(void 0,t)(this)}},{42:42}],20:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);function n(){this.constructor=t}t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},o=t(5),i=t(23),s=t(22),c=t(55),u=function(t){function e(e,r){t.call(this),this.array=e,this.scheduler=r,r||1!==e.length||(this._isScalar=!0,this.value=e[0])}return n(e,t),e.create=function(t,r){return new e(t,r)},e.of=function(){for(var t=[],r=0;r<arguments.length;r++)t[r-0]=arguments[r];var n=t[t.length-1];c.isScheduler(n)?t.pop():n=null;var o=t.length;return o>1?new e(t,n):1===o?new i.ScalarObservable(t[0],n):new s.EmptyObservable(n)},e.dispatch=function(t){var e=t.array,r=t.index,n=t.count,o=t.subscriber;r>=n?o.complete():(o.next(e[r]),o.closed||(t.index=r+1,this.schedule(t)))},e.prototype._subscribe=function(t){var r=this.array,n=r.length,o=this.scheduler;if(o)return o.schedule(e.dispatch,0,{array:r,index:0,count:n,subscriber:t});for(var i=0;i<n&&!t.closed;i++)t.next(r[i]);t.complete()},e}(o.Observable);r.ArrayObservable=u},{22:22,23:23,5:5,55:55}],55:[function(t,e,r){"use strict";r.isScheduler=function(t){return t&&"function"==typeof t.schedule}},{}],23:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);function n(){this.constructor=t}t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},o=function(t){function e(e,r){t.call(this),this.value=e,this.scheduler=r,this._isScalar=!0,r&&(this._isScalar=!1)}return n(e,t),e.create=function(t,r){return new e(t,r)},e.dispatch=function(t){var e=t.done,r=t.value,n=t.subscriber;e?n.complete():(n.next(r),n.closed||(t.done=!0,this.schedule(t)))},e.prototype._subscribe=function(t){var r=this.value,n=this.scheduler;if(n)return n.schedule(e.dispatch,0,{done:!1,value:r,subscriber:t});t.next(r),t.closed||t.complete()},e}(t(5).Observable);r.ScalarObservable=o},{5:5}],22:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);function n(){this.constructor=t}t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},o=function(t){function e(e){t.call(this),this.scheduler=e}return n(e,t),e.create=function(t){return new e(t)},e.dispatch=function(t){t.subscriber.complete()},e.prototype._subscribe=function(t){var r=this.scheduler;if(r)return r.schedule(e.dispatch,0,{subscriber:t});t.complete()},e}(t(5).Observable);r.EmptyObservable=o},{5:5}],21:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);function n(){this.constructor=t}t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},o=t(8),i=t(5),s=t(10),c=t(11),u=t(38),a=function(t){function e(e,r){t.call(this),this.source=e,this.subjectFactory=r,this._refCount=0,this._isComplete=!1}return n(e,t),e.prototype._subscribe=function(t){return this.getSubject().subscribe(t)},e.prototype.getSubject=function(){var t=this._subject;return t&&!t.isStopped||(this._subject=this.subjectFactory()),this._subject},e.prototype.connect=function(){var t=this._connection;return t||(this._isComplete=!1,(t=this._connection=new c.Subscription).add(this.source.subscribe(new h(this.getSubject(),this))),t.closed?(this._connection=null,t=c.Subscription.EMPTY):this._connection=t),t},e.prototype.refCount=function(){return u.refCount()(this)},e}(i.Observable),p=a.prototype;r.connectableObservableDescriptor={operator:{value:null},_refCount:{value:0,writable:!0},_subject:{value:null,writable:!0},_connection:{value:null,writable:!0},_subscribe:{value:p._subscribe},_isComplete:{value:p._isComplete,writable:!0},getSubject:{value:p.getSubject},connect:{value:p.connect},refCount:{value:p.refCount}};var h=function(t){function e(e,r){t.call(this,e),this.connectable=r}return n(e,t),e.prototype._error=function(e){this._unsubscribe(),t.prototype._error.call(this,e)},e.prototype._complete=function(){this.connectable._isComplete=!0,this._unsubscribe(),t.prototype._complete.call(this)},e.prototype._unsubscribe=function(){var t=this.connectable;if(t){this.connectable=null;var e=t._connection;t._refCount=0,t._subject=null,t._connection=null,e&&e.unsubscribe()}},e}(o.SubjectSubscriber),l=(function(){function t(t){this.connectable=t}t.prototype.call=function(t,e){var r=this.connectable;r._refCount++;var n=new l(t,r),o=e.subscribe(n);return n.closed||(n.connection=r.connect()),o}}(),function(t){function e(e,r){t.call(this,e),this.connectable=r}return n(e,t),e.prototype._unsubscribe=function(){var t=this.connectable;if(t){this.connectable=null;var e=t._refCount;if(e<=0)this.connection=null;else if(t._refCount=e-1,e>1)this.connection=null;else{var r=this.connection,n=t._connection;this.connection=null,!n||r&&n!==r||n.unsubscribe()}}else this.connection=null},e}(s.Subscriber))},{10:10,11:11,38:38,5:5,8:8}],38:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);function n(){this.constructor=t}t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},o=t(10);r.refCount=function(){return function(t){return t.lift(new i(t))}};var i=function(){function t(t){this.connectable=t}return t.prototype.call=function(t,e){var r=this.connectable;r._refCount++;var n=new s(t,r),o=e.subscribe(n);return n.closed||(n.connection=r.connect()),o},t}(),s=function(t){function e(e,r){t.call(this,e),this.connectable=r}return n(e,t),e.prototype._unsubscribe=function(){var t=this.connectable;if(t){this.connectable=null;var e=t._refCount;if(e<=0)this.connection=null;else if(t._refCount=e-1,e>1)this.connection=null;else{var r=this.connection,n=t._connection;this.connection=null,!n||r&&n!==r||n.unsubscribe()}}else this.connection=null},e}(o.Subscriber)},{10:10}],35:[function(t,e,r){"use strict";var n=t(36),o=t(49);r.mergeAll=function(t){return void 0===t&&(t=Number.POSITIVE_INFINITY),n.mergeMap(o.identity,null,t)}},{36:36,49:49}],32:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);function n(){this.constructor=t}t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},o=t(10);r.defaultIfEmpty=function(t){return void 0===t&&(t=null),function(e){return e.lift(new i(t))}};var i=function(){function t(t){this.defaultValue=t}return t.prototype.call=function(t,e){return e.subscribe(new s(t,this.defaultValue))},t}(),s=function(t){function e(e,r){t.call(this,e),this.defaultValue=r,this.isEmpty=!0}return n(e,t),e.prototype._next=function(t){this.isEmpty=!1,this.destination.next(t)},e.prototype._complete=function(){this.isEmpty&&this.destination.next(this.defaultValue),this.destination.complete()},e}(o.Subscriber)},{10:10}],41:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);function n(){this.constructor=t}t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},o=t(10);r.tap=function(t,e,r){return function(n){return n.lift(new i(t,e,r))}};var i=function(){function t(t,e,r){this.nextOrObserver=t,this.error=e,this.complete=r}return t.prototype.call=function(t,e){return e.subscribe(new s(t,this.nextOrObserver,this.error,this.complete))},t}(),s=function(t){function e(e,r,n,i){t.call(this,e);var s=new o.Subscriber(r,n,i);s.syncErrorThrowable=!0,this.add(s),this.safeSubscriber=s}return n(e,t),e.prototype._next=function(t){var e=this.safeSubscriber;e.next(t),e.syncErrorThrown?this.destination.error(e.syncErrorValue):this.destination.next(t)},e.prototype._error=function(t){var e=this.safeSubscriber;e.error(t),e.syncErrorThrown?this.destination.error(e.syncErrorValue):this.destination.error(t)},e.prototype._complete=function(){var t=this.safeSubscriber;t.complete(),t.syncErrorThrown?this.destination.error(t.syncErrorValue):this.destination.complete()},e}(o.Subscriber)},{10:10}],33:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);function n(){this.constructor=t}t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},o=t(10),i=t(56);r.ignoreElements=function(){return function(t){return t.lift(new s)}};var s=function(){function t(){}return t.prototype.call=function(t,e){return e.subscribe(new c(t))},t}(),c=function(t){function e(){t.apply(this,arguments)}return n(e,t),e.prototype._next=function(t){i.noop()},e}(o.Subscriber)},{10:10,56:56}],34:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);function n(){this.constructor=t}t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},o=t(10);r.map=function(t,e){return function(r){if("function"!=typeof t)throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");return r.lift(new i(t,e))}};var i=function(){function t(t,e){this.project=t,this.thisArg=e}return t.prototype.call=function(t,e){return e.subscribe(new s(t,this.project,this.thisArg))},t}(),s=function(t){function e(e,r,n){t.call(this,e),this.project=r,this.count=0,this.thisArg=n||this}return n(e,t),e.prototype._next=function(t){var e;try{e=this.project.call(this.thisArg,t,this.count++)}catch(t){return void this.destination.error(t)}this.destination.next(e)},e}(o.Subscriber)},{10:10}],39:[function(t,e,r){"use strict";var n=t(37),o=t(38),i=t(8);function s(){return new i.Subject}r.share=function(){return function(t){return o.refCount()(n.multicast(s)(t))}}},{37:37,38:38,8:8}],40:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);function n(){this.constructor=t}t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},o=t(7),i=t(59);r.takeUntil=function(t){return function(e){return e.lift(new s(t))}};var s=function(){function t(t){this.notifier=t}return t.prototype.call=function(t,e){return e.subscribe(new c(t,this.notifier))},t}(),c=function(t){function e(e,r){t.call(this,e),this.notifier=r,this.add(i.subscribeToResult(this,r))}return n(e,t),e.prototype.notifyNext=function(t,e,r,n,o){this.complete()},e.prototype.notifyComplete=function(){},e}(o.OuterSubscriber)},{59:59,7:7}],42:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);function n(){this.constructor=t}t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},o=t(7),i=t(59);r.withLatestFrom=function(){for(var t=[],e=0;e<arguments.length;e++)t[e-0]=arguments[e];return function(e){var r;"function"==typeof t[t.length-1]&&(r=t.pop());var n=t;return e.lift(new s(n,r))}};var s=function(){function t(t,e){this.observables=t,this.project=e}return t.prototype.call=function(t,e){return e.subscribe(new c(t,this.observables,this.project))},t}(),c=function(t){function e(e,r,n){t.call(this,e),this.observables=r,this.project=n,this.toRespond=[];var o=r.length;this.values=new Array(o);for(var s=0;s<o;s++)this.toRespond.push(s);for(s=0;s<o;s++){var c=r[s];this.add(i.subscribeToResult(this,c,c,s))}}return n(e,t),e.prototype.notifyNext=function(t,e,r,n,o){this.values[r]=e;var i=this.toRespond;if(i.length>0){var s=i.indexOf(r);-1!==s&&i.splice(s,1)}},e.prototype.notifyComplete=function(){},e.prototype._next=function(t){if(0===this.toRespond.length){var e=[t].concat(this.values);this.project?this._tryProject(e):this.destination.next(e)}},e.prototype._tryProject=function(t){var e;try{e=this.project.apply(this,t)}catch(t){return void this.destination.error(t)}this.destination.next(e)},e}(o.OuterSubscriber)},{59:59,7:7}],56:[function(t,e,r){"use strict";r.noop=function(){}},{}],49:[function(t,e,r){"use strict";r.identity=function(t){return t}},{}],36:[function(t,e,r){"use strict";var n=this&&this.__extends||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);function n(){this.constructor=t}t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},o=t(59),i=t(7);r.mergeMap=function(t,e,r){return void 0===r&&(r=Number.POSITIVE_INFINITY),function(n){return"number"==typeof e&&(r=e,e=null),n.lift(new s(t,e,r))}};var s=function(){function t(t,e,r){void 0===r&&(r=Number.POSITIVE_INFINITY),this.project=t,this.resultSelector=e,this.concurrent=r}return t.prototype.call=function(t,e){return e.subscribe(new c(t,this.project,this.resultSelector,this.concurrent))},t}(),c=function(t){function e(e,r,n,o){void 0===o&&(o=Number.POSITIVE_INFINITY),t.call(this,e),this.project=r,this.resultSelector=n,this.concurrent=o,this.hasCompleted=!1,this.buffer=[],this.active=0,this.index=0}return n(e,t),e.prototype._next=function(t){this.active<this.concurrent?this._tryNext(t):this.buffer.push(t)},e.prototype._tryNext=function(t){var e,r=this.index++;try{e=this.project(t,r)}catch(t){return void this.destination.error(t)}this.active++,this._innerSub(e,t,r)},e.prototype._innerSub=function(t,e,r){this.add(o.subscribeToResult(this,t,e,r))},e.prototype._complete=function(){this.hasCompleted=!0,0===this.active&&0===this.buffer.length&&this.destination.complete()},e.prototype.notifyNext=function(t,e,r,n,o){this.resultSelector?this._notifyResultSelector(t,e,r,n):this.destination.next(e)},e.prototype._notifyResultSelector=function(t,e,r,n){var o;try{o=this.resultSelector(t,e,r,n)}catch(t){return void this.destination.error(t)}this.destination.next(o)},e.prototype.notifyComplete=function(t){var e=this.buffer;this.remove(t),this.active--,e.length>0?this._next(e.shift()):0===this.active&&this.hasCompleted&&this.destination.complete()},e}(i.OuterSubscriber)},{59:59,7:7}],59:[function(t,e,r){"use strict";var n=t(58),o=t(51),i=t(54),s=t(53),c=t(5),u=t(43),a=t(4),p=t(44);r.subscribeToResult=function(t,e,r,h){var l=new a.InnerSubscriber(t,r,h);if(l.closed)return null;if(e instanceof c.Observable)return e._isScalar?(l.next(e.value),l.complete(),null):(l.syncErrorThrowable=!0,e.subscribe(l));if(o.isArrayLike(e)){for(var f=0,b=e.length;f<b&&!l.closed;f++)l.next(e[f]);l.closed||l.complete()}else{if(i.isPromise(e))return e.then(function(t){l.closed||(l.next(t),l.complete())},function(t){return l.error(t)}).then(null,function(t){n.root.setTimeout(function(){throw t})}),l;if(e&&"function"==typeof e[u.iterator])for(var y=e[u.iterator]();;){var v=y.next();if(v.done){l.complete();break}if(l.next(v.value),l.closed)break}else if(e&&"function"==typeof e[p.observable]){var d=e[p.observable]();if("function"==typeof d.subscribe)return d.subscribe(new a.InnerSubscriber(t,r,h));l.error(new TypeError("Provided object does not correctly implement Symbol.observable"))}else{var _="You provided "+(s.isObject(e)?"an invalid object":"'"+e+"'")+" where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.";l.error(new TypeError(_))}}return null}},{4:4,43:43,44:44,5:5,51:51,53:53,54:54,58:58}],37:[function(t,e,r){"use strict";var n=t(21);r.multicast=function(t,e){return function(r){var i;if(i="function"==typeof t?t:function(){return t},"function"==typeof e)return r.lift(new o(i,e));var s=Object.create(r,n.connectableObservableDescriptor);return s.source=r,s.subjectFactory=i,s}};var o=function(){function t(t,e){this.subjectFactory=t,this.selector=e}return t.prototype.call=function(t,e){var r=this.selector,n=this.subjectFactory(),o=r(n).subscribe(t);return o.add(e.subscribe(n)),o},t}()},{21:21}],43:[function(t,e,r){"use strict";var n=t(58);function o(t){var e=t.Symbol;if("function"==typeof e)return e.iterator||(e.iterator=e("iterator polyfill")),e.iterator;var r=t.Set;if(r&&"function"==typeof(new r)["@@iterator"])return"@@iterator";var n=t.Map;if(n)for(var o=Object.getOwnPropertyNames(n.prototype),i=0;i<o.length;++i){var s=o[i];if("entries"!==s&&"size"!==s&&n.prototype[s]===n.prototype.entries)return s}return"@@iterator"}r.iterator=o(n.root),r.iterator},{58:58}],51:[function(t,e,r){"use strict";r.isArrayLike=function(t){return t&&"number"==typeof t.length}},{}],54:[function(t,e,r){"use strict";r.isPromise=function(t){return t&&"function"!=typeof t.subscribe&&"function"==typeof t.then}},{}],62:[function(t,e,r){"use strict";const n=t(1).withEventHandler,o=t(8).Subject;describe("withEventHandler",function(){describe("when given a string",function(){let t,e,r,i;beforeEach(function(){t=n("event"),e=new o;const s=jasmine.createSpy("next"),c=jasmine.createSpy("error"),u=jasmine.createSpy("complete");r=function(){i=t(e).subscribe(s,c,u)}}),it("returns an RxJS Operator",function(){expect(t).toEqual(jasmine.any(Function)),expect(r).not.toThrow(),expect(i).toBeDefined(),expect(i.unsubscribe).toEqual(jasmine.any(Function))})}),describe("when called without arguments",function(){it("throws an Error",function(){expect(n).toThrow()})}),describe("the returned RxJS Operator",function(){describe("when its input Observable emits an object",function(){let t,e,r;beforeEach(function(){t=jasmine.createSpy("next"),e=jasmine.createSpy("error"),r=jasmine.createSpy("complete");const i=n("event"),s=new o,c=i(s).subscribe(t,e,r);s.next({foo:"foo"}),s.next({bar:"bar"}),c.unsubscribe()}),it("its output Observable emits an object that extends the input object with an EventHandlerProp",function(){expect(t.calls.argsFor(0)).toEqual([{foo:"foo",onEvent:jasmine.any(Function)}]),expect(t.calls.argsFor(1)).toEqual([{bar:"bar",onEvent:jasmine.any(Function)}]),expect(e).not.toHaveBeenCalled(),expect(r).not.toHaveBeenCalled()})}),describe("when the handler from the EventHandlerProp is called",function(){let t,e,r;beforeEach(function(){t=jasmine.createSpy("next"),e=jasmine.createSpy("error"),r=jasmine.createSpy("complete");const i=n("event"),s=new o;let c;t.and.callFake(function(t){c=t.onEvent});const u=i(s).subscribe(t,e,r);s.next({foo:"foo"}),c("bar"),u.unsubscribe()}),it("its output Observable emits an object that extends the previously emitted input object with the EventHandlerProp and an EventProp",function(){expect(t.calls.argsFor(0)).toEqual([{foo:"foo",onEvent:jasmine.any(Function)}]),expect(t.calls.argsFor(1)).toEqual([{foo:"foo",onEvent:jasmine.any(Function),event:"bar"}])})}),describe("when the input observable completes with an error",function(){let t,e,r;beforeEach(function(){t=jasmine.createSpy("next"),e=jasmine.createSpy("error"),r=jasmine.createSpy("complete");const i=n("event"),s=new o,c=i(s).subscribe(t,e,r);s.error("boom"),c.unsubscribe()}),it("the output observable completes with that error",function(){expect(t).not.toHaveBeenCalled(),expect(r).not.toHaveBeenCalled(),expect(e).toHaveBeenCalledWith("boom")})}),describe("when the input observable completes",function(){let t,e,r;beforeEach(function(){t=jasmine.createSpy("next"),e=jasmine.createSpy("error"),r=jasmine.createSpy("complete");const i=n("event"),s=new o,c=i(s).subscribe(t,e,r);s.complete(),c.unsubscribe()}),it("the output observable completes",function(){expect(t).not.toHaveBeenCalled(),expect(e).not.toHaveBeenCalled(),expect(r).toHaveBeenCalled()})})})})},{1:1,8:8}]},{},[62]);
