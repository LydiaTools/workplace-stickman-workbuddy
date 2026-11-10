from pathlib import Path
import argparse, json, shutil, sys

p=argparse.ArgumentParser()
p.add_argument('project')
p.add_argument('--mode',choices=['handdraw','stickman'],required=True)
p.add_argument('--sharp')
p.add_argument('--ffmpeg')
a=p.parse_args()
base=Path(__file__).resolve().parent
src=next((q for q in [base/'assets'/'narrative-motion',base.parent/'assets'/'narrative-motion',base/'工程'] if q.exists()),None)
if src is None:raise SystemExit('缺少随包工程assets/narrative-motion，请重新解压完整Skill。')
out=Path(a.project).resolve()
if (out/'render.cjs').exists():raise SystemExit('目标已有工程。请新建文件夹，避免覆盖。')
out.mkdir(parents=True,exist_ok=True)
for name in ['render.cjs','story-scenes.cjs','music.wav']+[n for n in ['camera-v4.cjs','hook-timings.json'] if (src/n).exists()]:
 shutil.copy2(src/name,out/name)
(out/'package.json').write_text(json.dumps({'name':'narrative-motion-project','private':True,'version':'2.0.0','dependencies':{'sharp':'0.35.5'}},indent=2),encoding='utf8')
(out/'本期任务.json').write_text(json.dumps({'mode':a.mode,'duration':24,'fps':60,'width':1920,'height':1080,'instruction':'先检查四幕情节与角色道具关系，再生成预览。换题必须改动作，不只替换标题。','command':f'node render.cjs {a.mode} output/preview.mp4'},ensure_ascii=False,indent=2),encoding='utf8')
runtime={}
if (base/'runtime.local.json').exists():runtime=json.loads((base/'runtime.local.json').read_text(encoding='utf-8-sig'))
if a.sharp:runtime['sharp']=a.sharp
if a.ffmpeg:runtime['ffmpeg']=a.ffmpeg
if runtime:(out/'runtime.local.json').write_text(json.dumps(runtime,indent=2),encoding='utf8')
print(json.dumps({'project':str(out),'mode':a.mode,'next':f'node render.cjs {a.mode} output/preview.mp4 --preview'},ensure_ascii=False))
