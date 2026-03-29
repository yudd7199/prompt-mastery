export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method Not Allowed'});
  const {name,email,message}=req.body;
  if(!name||!email||!message) return res.status(400).json({error:'Missing fields'});
  console.log('Contact message:',{name,email,message});
  res.status(200).json({status:'success'});
}