// ====== 中英文切换 ======
let lang='zh';
const content={
  zh:{headerTitle:"掌握 AI 提示词的艺术",headerDesc:"逻辑清晰，循序渐进，帮助你高效设计专业提示词",headerBtn:"开始使用"},
  en:{headerTitle:"Master the Art of AI Prompts",headerDesc:"Learn step-by-step to design effective prompts",headerBtn:"Get Started"}
};
function renderContent(){
  document.querySelector('#home h1').innerText=content[lang].headerTitle;
  document.querySelector('#home p').innerText=content[lang].headerDesc;
  document.querySelector('#home .btn').innerText=content[lang].headerBtn;
  document.getElementById('langSwitch').innerText=lang==='zh'?'EN':'中文';
}
document.getElementById('langSwitch').onclick=()=>{lang=lang==='zh'?'en':'zh';renderContent();}
renderContent();

// ====== 模板生成 ======
function generateTemplate(){
  const topic=document.getElementById('templateInput').value.trim();
  if(!topic){alert(lang==='zh'?'请输入主题':'Please enter a topic'); return;}
  const originalPrompt=lang==='zh'?`写一篇关于“${topic}”的文章`:`Write an article about "${topic}"`;
  const optimizedPrompt=lang==='zh'?
    `你是科技科普作者，用通俗语言写一篇500字左右关于${topic}的文章，适合高中生阅读，分点清晰`:
    `You are a tech writer, write a 500-word article about "${topic}", in plain language, suitable for high school students, clearly structured`;
  document.getElementById('templateOutput').innerHTML=
    `<div class="compare-card"><h4>${lang==='zh'?'原始提示词':'Original Prompt'}</h4><p>${originalPrompt}</p></div>
     <div class="compare-card"><h4>${lang==='zh'?'优化提示词':'Optimized Prompt'}</h4><p>${optimizedPrompt}</p></div>`;
}

// ====== 交互模拟 ======
document.getElementById('simulateBtn').onclick = runSimulate;
async function runSimulate(){
  const instruction=document.getElementById('simInput').value.trim();
  const ai=document.getElementById('aiSelect').value;
  const statusEl=document.getElementById('simStatus');
  const contentEl=document.getElementById('simContent');
  if(!instruction){alert(lang==='zh'?'请输入指令':'Please enter instruction'); return;}
  statusEl.innerText='生成中... ⏳';
  contentEl.innerText='';
  try{
    const res=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt:instruction,aiType:ai})});
    const data=await res.json();
    if(data.error){statusEl.innerText='生成失败 ❌'; contentEl.innerText=data.error; return;}
    statusEl.innerText='生成完成 ✅';
    const text=data.result;
    let i=0;
    const interval=setInterval(()=>{contentEl.innerText+=text.charAt(i);i++;if(i>=text.length) clearInterval(interval);},25);
  }catch(err){statusEl.innerText='请求失败 ❌'; contentEl.innerText=err.message;}
}

// ====== 对比生成 ======
function generateComparison(){
  const topic=document.getElementById('compareTopic').value.trim();
  let upgrade=document.getElementById('compareUpgrade').value.trim();
  if(!topic){alert(lang==='zh'?'请输入主题':'Please enter topic'); return;}
  if(!upgrade) upgrade=lang==='zh'?`你是一名AI教育导师，写一篇关于“${topic}”的教程，结构清晰`:`You are an AI tutor, write an article about "${topic}", clearly structured`;
  const original=lang==='zh'?`写一篇关于“${topic}”的文章`:`Write an article about "${topic}"`;
  const html=`<div class="flex-row">
    <div class="compare-card"><h4>${lang==='zh'?'原始提示词':'Original'}</h4><p>${original}</p></div>
    <div class="compare-card"><h4>${lang==='zh'?'升级提示词':'Upgraded'}</h4><p>${upgrade}</p></div>
    <div class="compare-card"><h4>${lang==='zh'?'模拟输出':'Simulated Output'}</h4><p>${lang==='zh'?`本文详细讲解“${topic}”，包括步骤和示例`:`This article explains "${topic}", including steps and examples.`}</p></div>
  </div>`;
  document.getElementById('compareOutput').innerHTML=html;
}