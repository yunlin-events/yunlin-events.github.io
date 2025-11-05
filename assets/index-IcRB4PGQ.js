(function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))y(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&y(l)}).observe(document,{childList:!0,subtree:!0});function f(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function y(o){if(o.ep)return;o.ep=!0;const n=f(o);fetch(o.href,n)}})();document.addEventListener("DOMContentLoaded",()=>{
    
    // ===== 【這是我新加入的函式】 =====
    // 功能：將字串 (活動標題) 轉換為一組固定的 ID
    function simpleHash(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return 'evt-' + Math.abs(hash).toString(36);
    }
    // ===================================

const b=document.querySelectorAll(".tabs-input"),u=document.getElementById("reset-filters-label"),f=new Date,y=f.getFullYear(),o=String(f.getMonth()+1).padStart(2,"0"),n=String(f.getDate()).padStart(2,"0"),l=`${y}-${o}-${n}`;document.querySelectorAll(".grid[data-scope] .card").forEach((e,a)=>{
    
    // ===== 【我修改了這裡】 =====
    // 舊的 (用順序 a)： e.id=`event-card-${a}`;
    // 新的 (用標題)：
    const title = e.querySelector('.h').textContent.trim();
    e.id = simpleHash(title);
    // =============================
    
    const t=e.dataset.end;t&&t<l&&e.classList.add("expired-hidden")});function L(){const e=document.querySelectorAll(".grid[data-scope] .card:not(.expired-hidden)"),a=document.querySelector('input[name="date-filter"]:checked').value,t=document.querySelector('input[name="cats"]:checked').value,r=document.querySelector('input[name="region"]:checked').value;e.forEach(i=>{const I=i.dataset.cat||"",B=i.dataset.region||"";let v=!1;const x=i.dataset.start,D=i.dataset.end;a==="all"?v=!0:a==="today"&&(x&&D?l>=x&&l<=D&&(v=!0):x&&l===x&&(v=!0));const A=t==="all"||I.split(" ").includes(t);let S=!1;r==="all"?S=!0:S=B===r||B==="全縣",v&&A&&S?i.classList.remove("hidden"):i.classList.add("hidden")});const d=Array.from(e).filter(i=>!i.classList.contains("hidden")).length,E=document.getElementById("result-count"),m=document.getElementById("empty-state");E&&(E.textContent=`共 ${d} 筆`),m&&(m.style.display=d===0?"block":"none")}b.forEach(e=>{e.addEventListener("change",L)}),u&&u.addEventListener("click",e=>{document.getElementById("tab-date-all").checked=!0,document.getElementById("tab-all").checked=!0,document.getElementById("tab-loc-all").checked=!0,L(),window.scrollTo(0,0)}),L();
const themeSelect=document.getElementById("theme-select"),systemPref=window.matchMedia("(prefers-color-scheme: dark)");function applyTheme(e){e==="dark"?document.documentElement.setAttribute("data-theme","dark"):e==="light"?document.documentElement.removeAttribute("data-theme"):systemPref.matches?document.documentElement.setAttribute("data-theme","dark"):document.documentElement.removeAttribute("data-theme")}function handleThemeChange(){const e=themeSelect.value;localStorage.setItem("theme",e),applyTheme(e)}function handleSystemChange(e){"system"===(localStorage.getItem("theme")||"system")&&applyTheme("system")}themeSelect&&(themeSelect.value=localStorage.getItem("theme")||"system",applyTheme(themeSelect.value),themeSelect.addEventListener("change",handleThemeChange),systemPref.addEventListener("change",handleSystemChange));
const w="https://script.google.com/macros/s/AKfycbzznBEQ5n_QhBsSbeTEcyml5EmjVYT9Zxu7OVUOoARDRji2kMZZ8aOArrl7TaxdZLKSaA/exec",g=document.getElementById("counter-today"),p=document.getElementById("counter-total");g&&p&&fetch(w).then(e=>e.json()).then(e=>{e.result==="success"&&e.totalCount!==void 0&&e.todayCount!==void 0?(g.textContent=e.todayCount.toLocaleString(),p.textContent=e.totalCount.toLocaleString()):(g.textContent="N/A",p.textContent="N/A")}).catch(e=>{console.error("Counter Fetch Error:",e),g.textContent="無法載入",p.textContent="無法載入"}),document.querySelectorAll(".share-btn").forEach(e=>{e.addEventListener("click",async a=>{a.preventDefault(),a.stopPropagation();const t=a.target.closest(".card");if(!t||!t.id){console.error("Share button clicked on element without card ID.");return}const r=t.querySelector(".h").textContent.trim(),d=window.location.origin+window.location.pathname+"#"+t.id,E={title:r,text:`我想跟你分享這個雲林活動： ${r}`,url:d};
    
    // ===== 【這就是修正的地方】 =====
    if(navigator.share && /Mobi/i.test(navigator.userAgent)) try{ // 只在行動裝置上使用原生分享
        await navigator.share(E)
    }catch(m){
        console.error("Share failed:",m)
    }
    // ================================

    else try{ // 電腦版一律使用這個備案
        await navigator.clipboard.writeText(`${r}
${d}`),alert(`分享功能僅支援手機瀏覽器。\n活動資訊 (標題+連結) 已複製到您的剪貼簿！`)}catch(m){console.error("Clipboard copy failed:",m),alert("分享功能僅支援手機瀏覽-。")}})});
const C=document.getElementById("event-form"),s=document.getElementById("submit-button"),c=document.getElementById("form-status");let h=!1;C&&C.addEventListener("submit",e=>{if(e.preventDefault(),h){c.textContent="提交太頻繁，請於倒數結束後再試。",c.className="status-error";return}h=!0,s.classList.add("cooldown"),s.textContent="傳送中...",c.textContent="",c.className="";const a=new FormData(C);fetch(w,{method:"POST",body:a}).then(t=>t.json()).then(t=>{
    if(t.result==="success"){
        c.textContent = "感謝您的提交！我們將盡快審核並加入列表。";
        c.className = "status-success";
        C.reset(); // 清空表單
    } else {
        throw new Error(t.message || "後端腳本回報錯誤");
    }
}).catch(err => {
    c.textContent = `提交失敗：${err.message}`;
    c.className = "status-error";
}).finally(() => {
    s.textContent = "請於 30 秒後再試";
    let countdown = 30;
    const interval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            s.textContent = `請於 ${countdown} 秒後再試`;
        } else {
            clearInterval(interval);
            s.classList.remove("cooldown");
            s.textContent = "送出";
            h = false;
        }
    }, 1000);
});
});
});