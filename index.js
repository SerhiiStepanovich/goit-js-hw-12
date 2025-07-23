import{a as m,S as y,i as a}from"./assets/vendor-Dy2ZTtfi.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const g="51388045-e31683e898f5abc4ca9ab64e0",h="https://pixabay.com/api/";async function L(n){const r={key:g,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await m.get(h,{params:r})).data}const l=document.querySelector(".gallery"),u=document.querySelector(".loader");let b=new y(".gallery a",{captionsData:"alt",captionDelay:250});function w(n){const r=n.map(({webformatURL:o,largeImageURL:s,tags:e,likes:t,views:i,comments:d,downloads:f})=>`
      <li class="gallery-item">
        <a href="${s}">
          <img src="${o}" alt="${e}" />
        </a>
        <div class="info">
          <p>Likes: ${t}</p>
          <p>Views: ${i}</p>
          <p>Comments: ${d}</p>
          <p>Downloads: ${f}</p>
        </div>
      </li>`).join("");l.insertAdjacentHTML("beforeend",r),b.refresh()}function S(){l.innerHTML=""}function q(){u.classList.remove("hidden")}function c(){u.classList.add("hidden")}const p=document.querySelector(".form"),v=p.querySelector('input[name="search-text"]');p.addEventListener("submit",async n=>{n.preventDefault();const r=v.value.trim();if(r===""){a.warning({message:"Please enter a search term!",position:"topRight"});return}S(),q();try{const o=await L(r);if(c(),o.hits.length===0){a.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}w(o.hits)}catch(o){c(),a.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(o)}});
//# sourceMappingURL=index.js.map
