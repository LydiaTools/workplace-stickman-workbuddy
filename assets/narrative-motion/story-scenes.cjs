let tightFraming=false;
// Original layered narrative artwork. Frame time is the only animation clock.
const C={paper:'#f6f2e8',ink:'#263b37',teal:'#2a8c80',coral:'#ed7358',gold:'#edbd45',muted:'#7b8b83',white:'#fffdf7',blue:'#729bb4'};
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
const lerp=(a,b,x)=>a+(b-a)*ease(x);
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;');
const rr=(x,y,w,h,fill=C.white,r=14,stroke=C.ink,sw=3)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const line=(x,y,X,Y,c=C.ink,sw=4)=>`<path d="M${x} ${y} L${X} ${Y}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>`;
const path=(d,c=C.ink,sw=4,fill='none')=>`<path d="${d}" stroke="${c}" stroke-width="${sw}" fill="${fill}" stroke-linecap="round" stroke-linejoin="round"/>`;
const circle=(x,y,r,fill=C.white,stroke=C.ink,sw=3)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const text=(s,x,y,size=30,color=C.ink,weight=600,anchor='start')=>`<text x="${x}" y="${y}" font-family="Microsoft YaHei,Arial,sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}">${esc(s)}</text>`;
const g=(s,x=0,y=0,scale=1,rot=0,opacity=1)=>`<g transform="translate(${x} ${y}) scale(${scale}) rotate(${rot})" opacity="${clamp(opacity)}">${s}</g>`;
function paper(x,y,color=C.gold,label='',rot=0,scale=1){return g(path('M-45 -58 L29 -58 L45 -42 L45 58 L-45 58 Z',C.ink,3,color)+path('M29 -58 L29 -42 L45 -42',C.ink,2)+line(-25,-25,25,-25,C.ink,3)+line(-25,-9,14,-9,C.ink,3)+(label?text(label,0,29,19,C.ink,700,'middle'):line(-25,9,25,9,C.ink,3)),x,y,scale,rot)}
function folder(x,y,color=C.gold,label='',scale=1,rot=0,open=0){return g(path('M-72 -42 L-72 -56 L-22 -56 L-11 -42 L73 -42 L73 48 L-72 48 Z',C.ink,3,color)+path(`M-77 ${-18-open*12} L66 ${-18-open*12} L73 48 L-72 48 Z`,C.ink,3,color)+(label?text(label,0,20,22,C.ink,700,'middle'):''),x,y,scale,rot)}
function clock(x,y,t,s=1){let a=(t*0.3)%6.283;return g(circle(0,0,49,C.white)+Array.from({length:12},(_,i)=>line(41*Math.cos(i*Math.PI/6),41*Math.sin(i*Math.PI/6),45*Math.cos(i*Math.PI/6),45*Math.sin(i*Math.PI/6),C.muted,2)).join('')+line(0,0,28*Math.sin(a),-28*Math.cos(a),C.coral,3)+line(0,0,17*Math.sin(a*.2),-17*Math.cos(a*.2),C.ink,4)+circle(0,0,3,C.ink),x,y,s)}
function shelf(x,y,labels=['工作','资料','归档'],scale=1){return g(rr(0,0,200,238,'#e6dbbf',9)+[0,1,2].map((v)=>rr(10,10+v*74,180,67,v===0?'#b0d1bc':v===1?'#ead184':'#8db3c5',4)+rr(57,31+v*74,86,27,C.white,4)+text(labels[v],100,52+v*74,19,C.ink,600,'middle')+line(85,68+v*74,115,68+v*74,C.ink,3)).join('')+line(22,238,16,262,C.ink,5)+line(180,238,187,262,C.ink,5),x,y,scale)}
function monitor(x,y,mode='blank',p=0,s=1){let inner=rr(-133,-178,266,167,'#dce9df',8,C.ink,3);if(mode==='tree'){inner+=text('项目 / 资料 / 备份',-110,-143,16,C.muted);for(let i=0;i<4;i++){inner+=g(folder(0,0,i===3?C.coral:C.gold,'',.23),-94+i*42,-108+i*22)+line(-88+i*42,-105+i*22,-88+i*42,-85+i*22,C.muted,2)}}if(mode==='work'){inner+=rr(-107,-153,213,112,C.white,4,C.muted,1)+[0,1,2,3].map((i)=>rr(-87,-135+i*21,Math.max(4,160*clamp(p*4-i)),7,i===3?C.teal:'#adc9bc',2,'none',0)).join('')}if(mode==='search'){inner+=rr(-113,-146,226,35,C.white,7,C.ink,2)+circle(-94,-130,7,'none',C.teal,2)+line(-89,-125,-84,-120,C.teal,2)+text('合同 + 项目名称',-69,-123,16)+rr(-108,-97,215,54,'#b5d8bc',4,'none',0)+text('已找到 · 最新合同',-91,-65,18,C.ink)}return g(rr(-146,-191,292,193,C.ink,12,C.ink,3)+inner+line(0,4,0,42,C.ink,8)+path('M-50 49 Q0 37 50 49',C.ink,6),x,y,s)}
function desk(x,y,w=650){return g(rr(0,0,w,24,'#d0bda0',8)+line(26,26,16,190,C.ink,7)+line(w-27,26,w-12,190,C.ink,7)+line(40,72,w-38,72,'#d0bda0',5),x,y)}
function plant(x,y,s=1){return g(path('M-27 0 L-18 61 L22 61 L32 0 Z',C.ink,3,'#dfae8c')+line(0,0,-2,-95,C.teal,5)+path('M-2 -55 Q-65 -98 -34 -115 Q-10 -104 -2 -55',C.teal,2,'#8ab69a')+path('M0 -33 Q67 -87 43 -99 Q12 -82 0 -33',C.teal,2,'#8ab69a'),x,y,s)}
function bubble(s,x,y,p=1,color=C.white){if(tightFraming)return '';return g(rr(-75,-42,150,70,color,20)+path('M-24 27 L-36 47 L-4 29',C.ink,3,color)+text(s,0,4,26,C.ink,700,'middle'),x,y,lerp(.75,1,p),0,p)}
function person(x,y,o={}){
 const s=o.s||1,kind=o.kind||'handdraw',lean=o.lean||0,mood=o.mood||'neutral';
 const shoulder=[lean,56],hip=[0,154],head=[lean,0];
 const L=o.left||[-73,120],R=o.right||[70,120],legs=o.legs||[[-45,270],[44,270]];
 let arms='';for(const [hand,sign] of [[L,-1],[R,1]]){const sx=shoulder[0]+sign*15,sy=shoulder[1]+8;const elbow=[(sx+hand[0])/2+sign*18,(sy+hand[1])/2+15];arms+=path(`M${sx} ${sy} L${elbow[0]} ${elbow[1]} L${hand[0]} ${hand[1]}`,C.ink,kind==='stickman'?7:16);if(kind!=='stickman'){arms+=path(`M${sx} ${sy} L${elbow[0]} ${elbow[1]}`,o.shirt||C.teal,12);arms+=circle(hand[0],hand[1],8,'#edc7a0',C.ink,2)}}
 let body=kind==='stickman'?line(shoulder[0],35,0,154,C.ink,8):path(`M${lean-29} 44 Q${lean} 32 ${lean+30} 44 L27 151 Q-4 164 -31 151 Z`,C.ink,3,o.shirt||C.teal);
 let legsvg=legs.map((foot,i)=>path(`M${i?15:-14} 151 L${foot[0]+(i?-7:7)} ${lerp(195,220,clamp(Math.abs(foot[0])/100))} L${foot[0]} ${foot[1]} L${foot[0]+17} ${foot[1]}`,C.ink,kind==='stickman'?7:12)).join('');
 let face=circle(head[0],head[1],39,kind==='stickman'?C.white:'#edc7a0',C.ink,3);
 if(kind!=='stickman')face+=path(`M${lean-38} -3 Q${lean-43} -47 ${lean} -47 Q${lean+42} -47 ${lean+39} -5 Q${lean+25} -25 ${lean+17} -20 Q${lean} -35 ${lean-27} -15 Z`,C.ink,3,C.ink);
 const ex=lean+(o.look||0);face+=circle(ex-13,-2,2.8,C.ink,C.ink,1)+circle(ex+13,-2,2.8,C.ink,C.ink,1);
 if(mood==='panic'){face+=path(`M${lean-22} -21 L${lean-7} -13 M${lean+8} -13 L${lean+23} -21`,C.ink,3)+`<ellipse cx="${lean}" cy="21" rx="9" ry="12" fill="none" stroke="${C.ink}" stroke-width="3"/>`+path(`M${lean+48} -14 Q${lean+60} 4 ${lean+50} 10 Q${lean+40} 5 ${lean+48} -14`,C.blue,2,C.blue)}
 else if(mood==='smile')face+=path(`M${lean-15} 15 Q${lean} 34 ${lean+16} 15`,C.ink,3);
 else if(mood==='tired')face+=line(ex-21,-7,ex-5,-7,C.ink,3)+line(ex+5,-7,ex+21,-7,C.ink,3)+path(`M${lean-12} 24 Q${lean} 16 ${lean+12} 24`,C.ink,3);
 else face+=line(lean-10,20,lean+10,20,C.ink,3);
 return g(legsvg+body+arms+face,x,y,s,0,o.opacity??1);
}
function handText(s,x,y,size=38,p=1,color=C.ink){return `<g clip-path="url(#reveal-${String(x).replace('.','_')}-${String(y).replace('.','_')})"><defs><clipPath id="reveal-${String(x).replace('.','_')}-${String(y).replace('.','_')}"><rect x="${x-3}" y="${y-size-8}" width="${(s.length*size+30)*clamp(p)}" height="${size+24}"/></clipPath></defs>${text(s,x,y,size,color,700)}</g>`}
function arrow(x,y,X,Y,color=C.teal,p=1){return `<g opacity="${p}">${path(`M${x} ${y} Q${(x+X)/2} ${y-35} ${X} ${Y}`,color,4)+path(`M${X-15} ${Y-9} L${X} ${Y} L${X-14} ${Y+12}`,color,4)}</g>`}
function header(k,title,t,color=C.teal){if(tightFraming)return '';return text(k,78,67,18,color,700)+handText(title,78,128,43,ease(t/.8))+line(80,149,80+Math.min(title.length*43,850)*ease(t/1.1),149,color,5)}
function room(t){return line(55,703,1545,703,'#c8cbbc',2)+g(rr(0,0,226,174,'#e1e6d8',4,'#b5c3b7',3)+line(113,0,113,174,'#b5c3b7',3)+line(0,86,226,86,'#b5c3b7',3)+path('M0 149 Q83 106 226 142','#adc6b0',3,'#cad9be'),1190,207)+plant(1450,643,.85)+clock(1095,250,t,.65)}
function frameHanddraw(t){
 const n=Math.min(3,Math.floor(t/6)),u=t-n*6;let v='';
 if(n===0){v+=header('文件整理这件事','文件越分越细，为什么反而更难找？',u)+room(t);v+=desk(325,591,805)+monitor(873,542,'tree',u)+person(588,426,{lean:lerp(-9,35,u/4),mood:u>2?'panic':'neutral',left:[-74,135],right:[lerp(92,170,u/4),lerp(146,108,u/4)],legs:[[-76,275],[28,275]]});
 for(let i=0;i<7;i++){let p=ease((u-i*.5)/.8);v+=g(folder(0,0,[C.gold,C.coral,C.blue][i%3],['工作','工作2','备份','最终','新最终','再整理','旧资料'][i],.8,-6+i*2),lerp(1440,1100+i%2*110,p),lerp(400,630-i*57,p),1,0,p)}
 v+=bubble('在哪儿？',457,271,ease((u-2.4)/.5));
 }
 if(n===1){v+=header('01 / 卡在哪里','目录越来越深，目标反而藏起来了',u,C.coral);v+=path('M260 310 L1270 310 L1270 632 L260 632 Z','#cccebf',3,'#e9e6d7');
 for(let j=0;j<4;j++){let xx=285+j*275;v+=folder(xx,318,C.gold,['项目','资料','备份','最终版'][j],.83);if(j<3)v+=arrow(xx+90,321,xx+186,321,'#a5ac9b',ease((u-j*.5)/.6));}
 for(let j=0;j<3;j++)for(let i=0;i<4;i++)v+=folder(340+i*255,440+j*60,['#d1c6a7','#b4c6b3','#d4b89d'][j],'',.38,(i%2?3:-2));
 let xx=lerp(295,1120,u/4.8);v+=person(xx,488,{s:.62,kind:'handdraw',mood:'panic',lean:Math.sin(u*2)*4,left:[-74,55+Math.sin(u*4)*23],right:[72,90-Math.sin(u*4)*23],legs:[[-35-Math.sin(u*4)*19,270],[37+Math.sin(u*4)*19,270]]});v+=paper(1240,525,C.coral,'合同',-5,.75)+circle(1240,525,78,'none',C.coral,3);v+=bubble('再找一次…',840,733,ease((u-3.3)/.6));
 }

 if(n===2){
  v+=header('02 / 换个方法','固定入口 + 清楚命名，少做一层选择',u)+room(t)+desk(325,591,805)+shelf(1026,375,['今天要用','项目资料','完成归档'],1.05)+monitor(840,541,'search',u,.8);
  let p=ease((u-1.1)/3.5),ins=ease((u-4.7)/.9),cx=lerp(605,950,p),hx=lerp(672,1127,p),hy=lerp(550,410,p);
  let release=ease((u-5.3)/.6),rx=lerp(hx-cx,105,release),ry=lerp(hy-422,145,release);
  v+=person(cx,422,{mood:ins>.8?'smile':'focus',left:[-65,139],right:[rx,ry],legs:[[-47+Math.sin(u*7)*13*Math.sin(p*Math.PI),275-Math.max(0,Math.sin(u*7))*20*Math.sin(p*Math.PI)],[54-Math.sin(u*7)*13*Math.sin(p*Math.PI),275-Math.max(0,-Math.sin(u*7))*20*Math.sin(p*Math.PI)]]});
  let doc=paper(hx,hy+ins*90,C.gold,'合同',0,.68);
  v+=ins>0?'<defs><clipPath id="filing-slot"><rect x="0" y="0" width="1600" height="435"/></clipPath></defs><g clip-path="url(#filing-slot)">'+doc+'</g>':doc;
  v+=g(rr(-108,-29,216,58,C.white,11,C.teal,3)+text('项目名_合同_日期',0,9,20,C.teal,700,'middle'),842,281,1,0,ease((u-.3)/.6));
  v+=g(circle(0,0,22,C.teal,C.teal,0)+path('M-10 0 L-2 8 L12 -8',C.white,4),1181,403,1,0,ins);
 }


 if(n===3){
  v+=header('03 / 找回结果','整理的目的，是下次能直接找到',u)+room(t)+desk(325,591,805)+shelf(1115,400,['今天要用','项目资料','完成归档'],.74)+monitor(860,543,'search',1,.83);
  let approach=ease((u-.2)/1.8),take=ease((u-2)/.65),give=ease((u-3)/1.2),withdraw=ease((u-4.4)/1.2);
  let cx=lerp(680,1000,approach),hx=lerp(1188,1070,take);hx=lerp(hx,1100,give);
  let hy=lerp(423,460,take),rx=lerp(90,hx-cx,approach),ry=lerp(140,hy-422,approach);
  rx=lerp(rx,70,withdraw);ry=lerp(ry,135,withdraw);
  v+=person(cx,422,{mood:take>.7?'smile':'focus',left:[-65,139],right:[rx,ry],legs:[[-50+Math.sin(u*7)*12*Math.sin(approach*Math.PI),275-Math.max(0,Math.sin(u*7))*17*Math.sin(approach*Math.PI)],[46-Math.sin(u*7)*12*Math.sin(approach*Math.PI),275-Math.max(0,-Math.sin(u*7))*17*Math.sin(approach*Math.PI)]]});
  v+=person(1160,426,{s:.98,mood:give>.7?'smile':'neutral',shirt:C.blue,left:[lerp(-30,-61,give),35],right:[48,150],legs:[[-38,275],[42,275]]});
  v+=paper(hx,hy,C.gold,'合同',-4,.69);
  v+=g(circle(0,0,35,C.teal,C.teal,0)+path('M-17 0 L-4 13 L21 -15',C.white,5),1080,285,1,0,ease((u-4.5)/.6));
 }

 return v;
}
function frameStick(t){const n=Math.min(3,Math.floor(t/6)),u=t-n*6;let v='';
 if(n===0){v+=header('职场的一天','忙了一整天，最重要的事却没动',u,C.coral)+room(t*1.6)+desk(350,596,820)+monitor(925,546,'work',.1,.9);v+=person(617,426,{kind:'stickman',mood:u>1.6?'panic':'tired',lean:lerp(0,25,u/5),left:[-78,180],right:[150,166],legs:[[-58,274],[50,274]]});v+=paper(405,542,C.gold,'计划',-6,.67);
 for(let i=0;i<6;i++){const p=ease((u-i*.65-.4)/1),xx=lerp(1540,810+(i%3)*100,p),yy=lerp(220+i*25,532-i*40,p);v+=paper(xx,yy,[C.coral,C.blue,C.gold][i%3],['消息','加急','报表','修改','开会','再改'][i],lerp(-20,(i%2?9:-8),p),.68);}
 v+=bubble('马上处理',459,270,ease((u-2)/.5));}
 if(n===1){v+=header('越忙，越被动','消息一来就回，自己的计划一直往后排',u,C.coral)+room(t*2)+desk(350,596,820)+monitor(925,546,'work',.2,.9);let q=ease((u-1)/1.2);v+=person(617,426,{kind:'stickman',mood:'panic',lean:lerp(-18,35,q),left:[lerp(-130,-65,q),lerp(62,178,q)],right:[lerp(50,201,q),lerp(128,73,q)],legs:[[-55,274],[50,274]]});v+=g(rr(-34,-61,68,122,C.ink,12)+rr(-27,-48,54,88,C.white,5)+circle(0,-20,13,C.coral,C.coral,0)+text('3',0,-14,18,C.white,700,'middle'),lerp(487,552,q),lerp(433,549,q),1,lerp(-10,0,q));v+=person(lerp(1260,960,ease((u-2)/2)),426,{kind:'stickman',left:[-110,28],right:[50,150],mood:'neutral'});v+=paper(lerp(1150,850,ease((u-2)/2)),lerp(454,515,ease((u-2)/2)),C.coral,'加急',-9,.72);v+=g(paper(0,0,C.gold,'计划',-5,.8),lerp(445,220,u/5),lerp(548,660,u/5));v+=arrow(450,670,240,694,C.coral,ease((u-3)/.7));}
 if(n===2){v+=header('先停一下，做一个选择','把今天最重要的一件事，单独拿出来',u);v+=room(t)+desk(350,596,820)+monitor(963,542,'work',0,.9)+shelf(1126,391,['稍后处理','等待回复','已完成'],.73);let p=ease((u-.7)/2),hx=lerp(461,720,p),hy=lerp(555,430,p);v+=person(617,426,{kind:'stickman',mood:'focus',left:[hx-617,hy-426],right:[137,116],legs:[[-55,274],[50,274]]});v+=paper(hx,hy,C.gold,'计划',lerp(-10,0,p),.9);for(let i=0;i<4;i++){let q=ease((u-2-i*.35)/1.3);v+=paper(lerp(836+i*30,1195,q),lerp(555-i*20,440+i*26,q),i%2?C.coral:C.blue,'',lerp(i*5,0,q),.6)}v+=g(circle(0,0,70,'none',C.teal,4)+text('1',0,21,62,C.teal,700,'middle'),853,285,lerp(.6,1,ease((u-3.2)/.8)),0,ease((u-3.2)/.8));}
 if(n===3){v+=header('完成，再切换','少接一轮来回，多推进一件正事',u);v+=room(t)+desk(350,596,820)+monitor(942,545,'work',ease(u/3.5),.95)+shelf(1126,391,['稍后处理','等待回复','已完成'],.73);let done=ease((u-3.5)/2.2),hx=lerp(785,1153,done),hy=lerp(544,523,done);let cx=lerp(617,1030,done);v+=person(cx,426,{kind:'stickman',mood:u>2.3?'smile':'focus',lean:lerp(17,0,done),left:[-63,138],right:[hx-cx,hy-426],legs:[[-55+Math.sin(u*8)*13*Math.sin(done*Math.PI),274-Math.max(0,Math.sin(u*8))*20*Math.sin(done*Math.PI)],[50-Math.sin(u*8)*13*Math.sin(done*Math.PI),274-Math.max(0,-Math.sin(u*8))*20*Math.sin(done*Math.PI)]]});let put=ease((u-5.0)/.9),doc=paper(hx,hy+put*8,C.gold,'计划',0,.72-put*.36)+g(path('M-18 6 L-3 20 L24 -14',C.teal,6),hx,hy+put*8+13*(1-put*.5),1-put*.5,0,ease((u-2.8)/.4));
  v+=put>0?'<defs><clipPath id="archive-slot"><rect x="0" y="0" width="1600" height="560"/></clipPath></defs><g clip-path="url(#archive-slot)">'+doc+'</g>':doc;if(!tightFraming)v+=g(rr(-92,-35,184,70,C.teal,16,C.teal,0)+text('今日正事 ✓',0,11,28,C.white,700,'middle'),796,274,1,0,ease((u-3.4)/.6));}
 return v;}
function svg(t,mode='handdraw'){
 const u=t%6, fade=Math.min(1,u/.22,(24-t)/.4);const scene=mode==='stickman'?frameStick(t):frameHanddraw(t);
 return `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1600 900"><defs><pattern id="paper" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".65" fill="#d6d9ca"/></pattern></defs><rect width="1600" height="900" fill="${C.paper}"/><rect width="1600" height="900" fill="url(#paper)" opacity=".5"/><g opacity="${clamp(fade)}">${scene}</g><g opacity=".65">${[0,1,2,3].map(i=>rr(78+i*52,826,38,5,Math.floor(t/6)>=i?C.teal:'#cbd0c2',2,'none',0)).join('')}${text('— '+(Math.min(3,Math.floor(t/6))+1)+' / 4',1530,836,17,C.muted,600,'end')}</g></svg>`;
}
module.exports={svg,C,frameHanddraw,frameStick,text,esc,setTight:x=>{tightFraming=x}};
