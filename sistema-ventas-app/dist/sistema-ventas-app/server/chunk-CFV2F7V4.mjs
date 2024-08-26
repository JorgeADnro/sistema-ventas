import './polyfills.server.mjs';
import{a as x}from"./chunk-WIDYL2KY.mjs";import{e as v}from"./chunk-OGFG3ZOU.mjs";import{a as T,o as E}from"./chunk-DHBMMFJW.mjs";import{$ as g,A as w,Ea as k,Rc as u,Y as l,ba as s,g as c,m as f,p as m}from"./chunk-LE6A4EOQ.mjs";import{d as p}from"./chunk-NDYDZJSS.mjs";var b=new g("JWT_OPTIONS"),I=(()=>{class o{constructor(t=null){this.tokenGetter=t&&t.tokenGetter||function(){}}urlBase64Decode(t){let e=t.replace(/-/g,"+").replace(/_/g,"/");switch(e.length%4){case 0:break;case 2:{e+="==";break}case 3:{e+="=";break}default:throw new Error("Illegal base64url string!")}return this.b64DecodeUnicode(e)}b64decode(t){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r="";if(t=String(t).replace(/=+$/,""),t.length%4===1)throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");for(let a=0,h,i,d=0;i=t.charAt(d++);~i&&(h=a%4?h*64+i:i,a++%4)?r+=String.fromCharCode(255&h>>(-2*a&6)):0)i=e.indexOf(i);return r}b64DecodeUnicode(t){return decodeURIComponent(Array.prototype.map.call(this.b64decode(t),e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)).join(""))}decodeToken(t=this.tokenGetter()){return t instanceof Promise?t.then(e=>this._decodeToken(e)):this._decodeToken(t)}_decodeToken(t){if(!t||t==="")return null;let e=t.split(".");if(e.length!==3)throw new Error("The inspected token doesn't appear to be a JWT. Check to make sure it has three parts and see https://jwt.io for more.");let r=this.urlBase64Decode(e[1]);if(!r)throw new Error("Cannot decode the token.");return JSON.parse(r)}getTokenExpirationDate(t=this.tokenGetter()){return t instanceof Promise?t.then(e=>this._getTokenExpirationDate(e)):this._getTokenExpirationDate(t)}_getTokenExpirationDate(t){let e;if(e=this.decodeToken(t),!e||!e.hasOwnProperty("exp"))return null;let r=new Date(0);return r.setUTCSeconds(e.exp),r}isTokenExpired(t=this.tokenGetter(),e){return t instanceof Promise?t.then(r=>this._isTokenExpired(r,e)):this._isTokenExpired(t,e)}_isTokenExpired(t,e){if(!t||t==="")return!0;let r=this.getTokenExpirationDate(t);return e=e||0,r===null?!1:!(r.valueOf()>new Date().valueOf()+e*1e3)}getAuthScheme(t,e){return typeof t=="function"?t(e):t}}return o.\u0275fac=function(t){return new(t||o)(s(b))},o.\u0275prov=l({token:o,factory:o.\u0275fac}),o})();var D=new I,V=(()=>{let n=class n{constructor(e,r,a,h){this.router=e,this.http=r,this.snackBar=a,this.platformId=h,this.token=new c(""),this.tokenData=new c({}),this.isLogged=new c(!1),this.checkToken()}get token$(){return this.token.asObservable()}get tokenValue(){return this.token.getValue()}get tokenData$(){return this.tokenData.asObservable()}get isLogged$(){return this.isLogged.asObservable()}login(e){return this.http.post(`${x.API_URL}/auth`,e).pipe(m(r=>(r.token&&(this.saveLocalStorage(r.token),this.token.next(r.token),this.isLogged.next(!0),this.checkToken(),this.router.navigate(["/home"])),r)),w(r=>this.handlerError(r)))}saveLocalStorage(e){localStorage.setItem("jwt",e)}logout(){u(this.platformId)&&localStorage.removeItem("jwt"),this.token.next(""),this.tokenData.next(null),this.isLogged.next(!1),this.router.navigate(["/home"])}checkToken(){var e="";if(u(this.platformId)&&(e=localStorage.getItem("jwt")),e)if(D.isTokenExpired(e))this.logout();else{this.token.next(e);let r=D.decodeToken(e),{iat:h,exp:i}=r,d=p(r,["iat","exp"]);this.tokenData.next(d),this.isLogged.next(!0)}else this.logout()}handlerError(e){var r="";return e.error&&(e.error.message?r=e.error.message:r="Ocurri\xF3 un error"),this.snackBar.open(r,"",{duration:3e3}),f(()=>Error(r))}};n.\u0275fac=function(r){return new(r||n)(s(E),s(T),s(v),s(k))},n.\u0275prov=l({token:n,factory:n.\u0275fac,providedIn:"root"});let o=n;return o})();export{V as a};
