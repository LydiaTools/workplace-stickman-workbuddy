const fs=require('fs'),path=require('path'),{spawn}=require('child_process');
const {svg}=require('./camera-v4.cjs');
async function main(){
 const mode=process.argv[2]||'handdraw',out=path.resolve(process.argv[3]||`../样片/${mode}.mp4`);
 const local=fs.existsSync(path.join(__dirname,'runtime.local.json'))?JSON.parse(fs.readFileSync(path.join(__dirname,'runtime.local.json'),'utf8').replace(/^\uFEFF/,'')):{};
 const sharp=require(process.env.SHARP_MODULE||local.sharp||'sharp');
 const ff=process.env.FFMPEG_PATH||local.ffmpeg||'ffmpeg';
 const fps=Number(process.env.RENDER_FPS||60),duration=24;
 fs.mkdirSync(path.dirname(out),{recursive:true});
 const preview=process.argv.includes('--preview');
 if(preview){for(const t of [0,.4,3.8,7.8,10.4,14.5,16.5,20.2,23.3]){await sharp(Buffer.from(svg(t,mode))).jpeg({quality:94}).toFile(path.join(path.dirname(out),`${mode}-${t}.jpg`));}console.log('preview done');return;}
 const ffargs=['-hide_banner','-loglevel','error','-y','-f','image2pipe','-vcodec','png','-framerate',String(fps),'-i','pipe:0','-i',path.join(__dirname,'music.wav'),'-t',String(duration),'-af','volume=3.8','-c:v','libx264','-preset','fast','-crf','17','-pix_fmt','yuv420p','-r',String(fps),'-c:a','aac','-b:a','192k','-movflags','+faststart',out];
 const enc=spawn(ff,ffargs,{stdio:['pipe','inherit','inherit']});
 let end=new Promise((res,rej)=>enc.on('close',c=>c===0?res():rej(new Error('ffmpeg exit '+c))));
 enc.stdin.on('error',e=>console.error(e.message));
 for(let i=0;i<duration*fps;i++){
   const buf=await sharp(Buffer.from(svg(i/fps,mode))).png({compressionLevel:1}).toBuffer();
   if(!enc.stdin.write(buf))await new Promise(r=>enc.stdin.once('drain',r));
   if(i%(fps*4)===0)console.log(mode,Math.round(i/fps)+' / '+duration+'s');
 }
 enc.stdin.end();await end;
 const sha=require('crypto').createHash('sha256').update(fs.readFileSync(out)).digest('hex');
 fs.writeFileSync(out+'.receipt.json',JSON.stringify({host:process.env.RUN_HOST||null,model:process.env.RUN_MODEL||null,mode,fps,duration,output:out,sha256:sha,engine:'original deterministic SVG narrative scene rendering',voice:false},null,2));
 console.log(JSON.stringify({out,sha256:sha}));
}
main().catch(e=>{console.error(e);process.exitCode=1});
