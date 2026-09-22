const KEY='gg_school_submissions_v1';
const form=document.getElementById('gossipForm');
const inbox=document.getElementById('inbox');
const msg=document.getElementById('formMessage');
const clearBtn=document.getElementById('clearInbox');
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}}
function save(items){localStorage.setItem(KEY,JSON.stringify(items))}
function render(){const items=load();if(!items.length){inbox.innerHTML='<div class="submission"><small>No pending submissions yet. Your inbox is suspiciously quiet. 👀</small></div>';return}inbox.innerHTML=items.map((x,i)=>`<article class="submission"><span class="status">PENDING · ${new Date(x.time).toLocaleString()}</span><p>${escapeHtml(x.text)}</p><small>${x.anonymous?'Anonymous':escapeHtml(x.sender||'Name not provided')} · ${escapeHtml(x.classYear||'Class not provided')}</small></article>`).join('')}
function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
form.addEventListener('submit',e=>{e.preventDefault();const text=document.getElementById('gossip').value.trim();if(!text)return;const item={text,sender:document.getElementById('sender').value.trim(),classYear:document.getElementById('classYear').value.trim(),anonymous:document.getElementById('anonymous').checked,time:Date.now()};const items=load();items.unshift(item);save(items);form.reset();document.getElementById('anonymous').checked=true;msg.textContent='Received. It is now waiting in the private editorial inbox. XOXO ♡';render()});
clearBtn.addEventListener('click',()=>{if(confirm('Clear the local editorial inbox?')){localStorage.removeItem(KEY);render()}});render();
