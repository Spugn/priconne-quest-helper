import{e as c}from"./equipment.api-81ca0e51.js";const y=(()=>{function o(r,t,f,e={}){if(!c.isFullItem(r)&&!c.isFragment(r)||t<=0)return{};if(f||(f="JP"),c.isFragment(r))return e[c.getRarityFromID(r)]?{}:{[r]:t};const n=c.get(r),i=c.recipe(r,f);let s={};if(!e[n.rarity]&&i.required_pieces>0){const u=c.hasFragment(r)?n.fragment.id:n.id;s[u]=i.required_pieces*t}if(!e[n.rarity])for(const u of i.required_items)s=p(s,o(u,t,f,e));return s}function p(...r){return r.reduce((t,f)=>{for(let e in f)f.hasOwnProperty(e)&&(t[e]=(t[e]||0)+f[e]);return t},{})}return{build:o,merge:p}})();export{y as r};