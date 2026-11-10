const hooks=require('./hook-timings.json');
const {C,frameHanddraw,frameStick,setTight,text,esc}=require('./story-scenes.cjs');
const clip=x=>Math.max(0,Math.min(1,x));
const E=x=>{x=clip(x);return x*x*(3-2*x)};
const L=(a,b,x)=>a+(b-a)*E(x);
function camera(t,mode){
 const n=Math.min(3,Math.floor(t/6)),u=t-n*6;
 let cx=850,cy=490,z=1.65;
 if(mode==='handdraw'){
  if(n===0){cx=L(840,855,u/3);cy=485;z=L(1.50,1.72,u/5);if(u>3.3){cx=L(855,800,(u-3.3)/1.3);cy=480;z=L(1.72,1.95,(u-3.3)/1.3);}}
  if(n===1){cx=L(550,1090,u/5.3);cy=473;z=L(1.65,2.20,u/2.5);}
  if(n===2){cx=L(790,1000,(u-1)/3.8);cy=475;z=L(1.85,2.10,u/5);}
  if(n===3){cx=L(925,1100,(u-2.1)/2);cy=478;z=L(1.58,2.04,(u-2.1)/2);}
 }else{
  if(n===0){cx=L(790,845,u/5);cy=483;z=L(1.52,1.83,u/5);}
  if(n===1){cx=L(775,615,(u-2)/2.6);cy=490;z=L(1.65,1.90,u/5);}
  if(n===2){cx=L(670,750,u/5);cy=475;z=L(1.80,2.03,u/5);}
  if(n===3){cx=L(810,1010,(u-2)/2.7);cy=490;z=L(1.65,2.02,u/5);}
 }
 return {cx,cy,z};
}
const captions={
 handdraw:[
  [0,2.7,'文件越分越细，为什么还难找？','完整问题、翻找人物、文件层级同屏'],
  [2.7,6,'越整理，“最终版”反而越多','多个版本先后出现，人物伸手与困惑表情'],
  [6,9,'打开一层，还有下一层','人物沿目录逐层行走，镜头跟随'],
  [9,12,'真正要找的文件，越藏越深','人物继续到目标位置，合同高亮'],
  [12,15,'先把文件名写清楚','命名标签出现、人物拿起对应合同'],
  [15,18,'再放到一个固定入口','身体走近收纳柜、合同插入槽位'],
  [18,21,'下次要用，直接取出来','人物走近并拿出同一合同'],
  [21,24,'找到了，交给同事','合同递交、同事接住、表情放松']
 ],
 stickman:[
  [0,2.7,'为什么忙了一天，正事却没推进？','人物、未完成计划和进来的临时任务同屏'],
  [2.7,6,'临时任务，一件接一件','加急纸张持续进入、人物伸手处理'],
  [6,9,'消息一来，就先回消息','拿起手机、视线转向通知'],
  [9,12,'自己的计划，被推到一边','同事递来加急、计划移出原位置'],
  [12,15,'先把最重要的一件事拿出来','主角拿起原计划并单独展示'],
  [15,18,'其他任务，先放到稍后处理','零散任务进入暂存位置'],
  [18,21,'专心做完这一件','工作进度与手部动作同步推进'],
  [21,24,'完成了，再处理下一件','拿起已完成计划、走到归档位置并放好']
 ]
};
function svg(t,mode='handdraw'){
 setTight(true);const scene=mode==='stickman'?frameStick(t):frameHanddraw(t);setTight(false);
 const cam=camera(t,mode),tx=800-cam.cx*cam.z,ty=475-cam.cy*cam.z;
 const beat=captions[mode].find(x=>t>=x[0]&&t<x[1])||captions[mode][7];
 const opening=t<hooks[mode].duration+.10,capY=opening?112:840,size=opening?48:34,x=opening?76:800,anchor=opening?'start':'middle';
 const spokenCaption=opening?hooks[mode].text:beat[2];
 // The first frame is a complete scene. No scene-wide fade from black or blank paper.
 return '<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1600 900">'+
 '<defs><pattern id="paper" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".7" fill="#d6d9ca"/></pattern><clipPath id="stage"><rect x="0" y="0" width="1600" height="795"/></clipPath></defs>'+
 '<rect width="1600" height="900" fill="'+C.paper+'"/><rect width="1600" height="900" fill="url(#paper)" opacity=".45"/>'+
 '<g clip-path="url(#stage)"><g transform="translate('+tx+' '+ty+') scale('+cam.z+')">'+scene+'</g></g>'+
 (opening?text(mode==='stickman'?'职场里的一天':'文件整理这件事',76,56,18,C.teal,700):'')+
 '<text x="'+x+'" y="'+capY+'" text-anchor="'+anchor+'" font-family="Microsoft YaHei,Arial,sans-serif" font-size="'+size+'" font-weight="700" fill="'+C.ink+'" stroke="'+C.paper+'" stroke-width="8" paint-order="stroke">'+esc(spokenCaption)+'</text></svg>';
}
module.exports={svg,camera,captions};
