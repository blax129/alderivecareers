'use strict';
const $ = s => document.querySelector(s);
const email = 'careersalderiveproperties@gmail.com';
const steps = [
 {title:'Contact details',short:'Contact',description:'Tell us how to address you and reach you about your application. Updates will be sent by text, so please provide a mobile number that can receive messages.',fields:[{name:'name',label:'Full name',type:'text',autocomplete:'name'},{name:'email',label:'Email address',type:'email',autocomplete:'email'},{name:'phone',label:'Mobile number (for application updates by text)',type:'tel',autocomplete:'tel'},{name:'usLocation',label:'Are you currently located in the United States?',options:['Yes','No']},{name:'state',label:'What state do you currently live in? (If outside the U.S., enter your region and country.)',type:'text',autocomplete:'address-level1'},{name:'age18',label:'Are you at least 18 years old?',options:['Yes','No']}]},
 {title:'Facebook experience',short:'Facebook',description:'We welcome different experience levels. Tell us how you use Facebook.',fields:[{name:'experience',label:'How familiar are you with Facebook groups?',options:['I regularly join groups and create posts','I have used groups a little','I am new to Facebook groups']},{name:'posting',label:'How often do you post in Facebook groups?',options:['Daily','Several times a week','About once a week','Less than once a week','I have not posted in groups before']},{name:'rules',label:'How comfortable are you following group posting rules?',options:['Comfortable independently','Comfortable with initial guidance','I would need training']},{name:'skills',label:'Can you add photos, format a post, edit it, and copy its link?',options:['Yes, I can do all of these','I can do some and would like guidance','I would need help learning these tasks']},{name:'referral',label:'Where did you hear about this opportunity?',options:['Facebook group','Facebook post or advertisement','Referral','Another website or platform','Other']}]},
 {title:'Availability & work',short:'Availability',description:'Daily work is required Monday through Sunday, including weekends. Hours are flexible within each day, with no scheduled days off.',fields:[{name:'daily',label:'Can you meet the seven-day schedule?',options:['Yes, I can meet this schedule','No, I cannot work every day','I need to discuss my availability']},{name:'hours',label:'How much time can you set aside each day?',options:['Less than 1 hour','1–2 hours','2–4 hours','More than 4 hours']},{name:'start',label:'When can you start if approved?',options:['Immediately after approval','Within one week','Within two weeks','I need to agree on a start date']},{name:'workload',label:'Can you manage approximately 10–12 listings each day?',options:['Yes','Yes, with initial guidance','I would like to discuss the workload']},{name:'commitments',label:'How would this role fit around other commitments? (optional)',type:'textarea',optional:true}]},
 {title:'Work setup & approach',short:'Work setup',description:'Tell us about your tools and how you would approach the day-to-day work.',fields:[{name:'device',label:'What device will you use?',options:['Phone','Computer','Phone and computer']},{name:'internet',label:'Do you have reliable internet access?',options:['Yes, consistently','Usually, with occasional interruptions','Not consistently']},{name:'updates',label:'How often can you check assignment updates?',options:['Several times during my working hours','At the beginning and end of my working hours','Once a day','I need to agree on a check-in schedule']},{name:'motivation',label:'Why are you interested in this role?',type:'textarea'},{name:'candidateQuestions',label:'Questions for the Alderive team (optional)',type:'textarea',optional:true}]},
 {title:'Pay & temporary role',short:'Pay & role',description:'The ongoing role pays $500–$800 per week, depending on workload, accuracy, consistency, and reliability. Your first payday is seven days after starting the ongoing role, then weekly.',fields:[{name:'terms',label:'Do you understand the $500–$800 weekly pay range, which depends on workload, accuracy, consistency, and reliability, the pay schedule, and the temporary nature of this role?',options:['Yes, I understand','I would like to clarify the terms with the team']}]}];
const answers={};let step=0;let consent=false;
let submitting=false;let submitted=false;let submissionMessage='';
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function updateTheme(){const dark=document.documentElement.dataset.theme==='dark';$('#theme').setAttribute('aria-pressed',String(!dark));$('#theme').setAttribute('aria-label',`Switch to ${dark?'light':'dark'} mode`);}
$('#theme').addEventListener('click',()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('alderive-theme',document.documentElement.dataset.theme)}catch(e){}updateTheme()});updateTheme();
$('#year').textContent=new Date().getFullYear();
let photo=0;const photos=[['community.jpg','Alderive Properties team at a community gathering'],['team.jpg','Alderive Properties team collaborating together'],['advocates.jpg','Alderive Properties team at a community advocacy event']];
function changePhoto(delta){photo=(photo+delta+photos.length)%photos.length;$('#team-photo').src=`assets/${photos[photo][0]}`;$('#team-photo').alt=photos[photo][1];}
const photoMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let photoTimer;
function advancePhoto(delta) {
  changePhoto(delta);
  if (!photoMotion.matches) $('#team-photo').animate([
    {opacity: .3, transform: `translateX(${delta > 0 ? 14 : -14}px)`},
    {opacity: 1, transform: 'translateX(0)'}
  ], {duration: 450, easing: 'ease-out'});
}
function schedulePhotos() {
  clearInterval(photoTimer);
  if (photoMotion.matches || document.hidden || location.hash === '#apply') return;
  photoTimer = setInterval(() => advancePhoto(1), 2000);
}
document.addEventListener('visibilitychange', schedulePhotos);
window.addEventListener('hashchange', () => setTimeout(schedulePhotos, 0));
photoMotion.addEventListener('change', schedulePhotos);
photos.forEach(([file]) => { const preload = new Image(); preload.src = `assets/${file}`; });
schedulePhotos();

function route(){const applying=location.hash==='#apply';$('#landing').hidden=applying;$('#application').hidden=!applying;$('#floating-apply').hidden=applying;document.title=applying?'Apply · Alderive Properties':'Careers · Alderive Properties';if(applying){render();window.scrollTo(0,0)}else if(location.hash&&$(location.hash)){$(location.hash).scrollIntoView()}else{window.scrollTo(0,0)}}
window.addEventListener('hashchange',route);
function fieldHTML(f){const attrs=`id="${f.name}" name="${f.name}" ${f.optional?'':'required'}`;let input;if(f.options){input=`<select ${attrs}><option value="">Select an option</option>${f.options.map(o=>`<option ${answers[f.name]===o?'selected':''}>${escapeHTML(o)}</option>`).join('')}</select>`}else if(f.type==='textarea'){input=`<textarea ${attrs} maxlength="1500" rows="4">${escapeHTML(answers[f.name]||'')}</textarea>`}else{input=`<input ${attrs} type="${f.type}" maxlength="200" autocomplete="${f.autocomplete||'off'}" value="${escapeHTML(answers[f.name]||'')}">`}return `<label class="field" for="${f.name}">${f.label}${input}</label>`;}
function render(){if(submitted){renderConfirmation();return;}const review=step===steps.length;$('#step-count').textContent=`STEP ${step+1} OF 6 · ${review?'REVIEW':steps[step].short.toUpperCase()}`;$('#progress').innerHTML=[...steps.map(s=>s.short),'Review'].map((s,i)=>`<li class="${i<=step?'active':''}" ${i===step?'aria-current="step"':''}>${i<step?'✓':i+1} ${s}</li>`).join('');$('#fields').innerHTML=review?`<h2 tabindex="-1">Review your application</h2><p>Check your answers before submitting your application to the Alderive team.</p>${steps.map((s,i)=>`<section class="review-group"><h3>${s.title}<button class="edit" type="button" data-step="${i}">Edit</button></h3><dl>${s.fields.map(f=>`<dt>${f.label}</dt><dd>${escapeHTML(answers[f.name]||'Not provided')}</dd>`).join('')}</dl></section>`).join('')}<label class="consent"><input type="checkbox" name="consent" required ${consent?'checked':''}><span>I confirm my information is accurate. I understand the seven-day availability requirement and temporary nature of the role. I agree to be contacted by text about my application.</span></label><div id="submission-status" aria-live="polite">${submissionMessage}</div><button type="button" id="download" class="button secondary download">Download my answers ↓</button>`:`<h2 tabindex="-1">${steps[step].title}</h2><p>${steps[step].description}</p>${steps[step].fields.map(fieldHTML).join('')}`;$('#back').hidden=step===0;$('#continue').innerHTML=review?'Submit application <span>↗</span>':'Continue <span>→</span>';document.querySelectorAll('.edit').forEach(b=>b.addEventListener('click',()=>go(Number(b.dataset.step))));if(review)$('#download').addEventListener('click',download);updateSubmissionControls();}
function capture(){if(submitted)return;if(step<steps.length)steps[step].fields.forEach(f=>{const el=document.getElementById(f.name);answers[f.name]=el.value.trim()});else consent=!!document.querySelector('[name="consent"]')?.checked;}
function go(n){capture();step=n;render();$('#application-form').scrollIntoView({block:'start',behavior:'auto'});$('#fields h2').focus({preventScroll:true});}
$('#back').addEventListener('click',()=>go(step-1));
$('#application-form').addEventListener('input',capture);
function applicationText(){return `ALDERIVE PROPERTIES — LISTING ASSISTANT APPLICATION\n\n${steps.map(s=>s.title.toUpperCase()+'\n'+s.fields.map(f=>f.label+': '+(answers[f.name]||'Not provided')).join('\n')).join('\n\n')}\n\nAcknowledgment: ${consent?'I confirm my information is accurate. I understand the seven-day availability requirement and temporary nature of the role. I agree to be contacted by text about my application.':'Not confirmed'}\n`;}
function download(){capture();const blob=new Blob([applicationText()],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='alderive-application.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function renderConfirmation(){
  $('#step-count').textContent='APPLICATION RECEIVED';
  $('#progress').hidden=true;
  $('#form-actions').hidden=true;
  $('#application-form .form-note').hidden=true;
  $('#fields').innerHTML=`<h2 tabindex="-1">Application received.</h2><p>Thank you for applying to Alderive Properties. Our team aims to respond within two days by text at the mobile number you provided.</p><p>Please submit only one application. There is no need to apply again while you wait for a response.</p><p><strong>Alderive Properties does not charge applicants a fee to apply.</strong></p><p>If approved, you can start immediately. We will send your assignment details and posting instructions by text.</p><button type="button" id="download" class="button secondary download">Download my answers ↓</button><p style="margin-top:24px"><a class="text-link" href="#">Back to the opportunity ←</a></p>`;
  $('#download').addEventListener('click',download);
  $('#fields h2').focus({preventScroll:true});
  $('#application-form').scrollIntoView({block:'start'});
}
function updateSubmissionControls(){
  const locked=submitting||submitted;
  document.querySelectorAll('#application-form input, #application-form select, #application-form textarea, #application-form .edit, #back, #continue').forEach(el=>{el.disabled=locked;});
  $('#application-form').setAttribute('aria-busy',String(submitting));
  if(step===steps.length)$('#continue').textContent=submitted?'Application submitted':submitting?'Submitting…':'Submit application';
}
function showSubmissionMessage(message){
  submissionMessage=message;
  const status=$('#submission-status');
  if(status){status.innerHTML=message;status.scrollIntoView({block:'center'});}
}
$('#application-form').addEventListener('submit',async event=>{
  event.preventDefault();
  if(submitting||submitted)return;
  capture();
  if(!event.currentTarget.reportValidity())return;
  if(step<steps.length){go(step+1);return;}
  if(!consent)return;
  const payload=new FormData();
  steps.forEach(section=>section.fields.forEach(field=>payload.append(field.name,answers[field.name]||'')));
  payload.append('consent','I confirm my information is accurate. I understand the seven-day availability requirement and temporary nature of the role. I agree to be contacted by text about my application.');
  payload.append('application',applicationText());
  payload.append('_subject','Listing assistant application — '+answers.name);
  submitting=true;
  updateSubmissionControls();
  showSubmissionMessage('<div class="email-ready"><p>Submitting your application…</p></div>');
  try{
    const response=await fetch(event.currentTarget.action,{method:'POST',body:payload,headers:{Accept:'application/json'}});
    if(!response.ok){
      const data=await response.json().catch(()=>({}));
      throw new Error(Array.isArray(data.errors)?data.errors.map(error=>error.message).join(' '):'Please try again in a moment.');
    }
    submitted=true;
    renderConfirmation();
  }catch(error){
    showSubmissionMessage(`<div class="email-ready" role="alert"><h3>We couldn’t confirm your submission.</h3><p>Please try again in a moment. Your answers are still on this page. You can retry or download them and email <a href="mailto:${email}">${email}</a>.</p></div>`);
  }finally{
    submitting=false;
    updateSubmissionControls();
  }
});
route();

// Application journey: buttons, keyboard navigation, and touch swipe.
(() => {
  const carousel = document.querySelector('.process-slideshow');
  const slides = [...carousel.querySelectorAll('.steps article')];
  const dots = [...carousel.querySelectorAll('[data-process-slide]')];
  let current = 0;
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const isNext = i === (current + 1) % slides.length;
      slide.classList.toggle('is-next', isNext);
      slide.setAttribute('aria-hidden', String(i !== current && !isNext));
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
    });
    dots.forEach((dot, i) => {
      if (i === current) dot.setAttribute('aria-current', 'step');
      else dot.removeAttribute('aria-current');
    });
    carousel.querySelector('.process-count').textContent = `Step ${current + 1} of ${slides.length}`;
  }
  carousel.classList.add('is-ready');
  carousel.querySelector('.process-controls').hidden = false;
  carousel.querySelector('[data-process-prev]').addEventListener('click', () => show(current - 1));
  carousel.querySelector('[data-process-next]').addEventListener('click', () => show(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  let start;
  carousel.addEventListener('touchstart', event => {
    const touch = event.touches[0];
    start = event.touches.length === 1 ? {x: touch.clientX, y: touch.clientY} : null;
  }, {passive: true});
  carousel.addEventListener('touchend', event => {
    if (!start) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
    start = null;
  }, {passive: true});
  carousel.addEventListener('touchcancel', () => { start = null; });
  show(0);
})();
