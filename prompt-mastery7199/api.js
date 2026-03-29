import fetch from 'node-fetch';
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method Not Allowed'});
  const {prompt,aiType}=req.body;
  if(!prompt||!aiType) return res.status(400).json({error:'Missing prompt or aiType'});
  try{
    let resultText='';
    if(aiType==='openai'){
      const response=await fetch('https://api.openai.com/v1/chat/completions',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},
        body:JSON.stringify({model:"gpt-3.5-turbo",messages:[{role:'user',content:prompt}],max_tokens:500})
      });
      const data=await response.json();
      resultText=data.choices[0].message.content;
    }else if(aiType==='doubao'){
      const response=await fetch('https://api.doubao.ai/generate',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.DOUBAO_API_KEY}`},
        body:JSON.stringify({prompt})
      });
      const data=await response.json();
      resultText=data.result;
    }
    res.status(200).json({result:resultText});
  }catch(err){console.error(err); res.status(500).json({error:'AI request failed'});}
}