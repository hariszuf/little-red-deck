import * as THREE from 'three';
import {cards} from '../dist/model.js';
import {cardSVG} from '../dist/artwork.js';
let activeSelect=()=>{};
export function select(id){activeSelect(id);}
export function mount(host,{onSelect=()=>{}}={}){
 if(!host)return ()=>{};
 const hint=document.querySelector('#scene-hint');
 const fallback=()=>{if(hint)hint.textContent='EXPLORE ALL 22 CARDS BELOW';};
 if(!window.WebGLRenderingContext){fallback();return ()=>{};}
 let renderer;
 try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{fallback();return ()=>{};}
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.domElement.setAttribute('aria-hidden','true');host.append(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(0,0,10.6);
 const group=new THREE.Group();scene.add(group);
 scene.add(new THREE.AmbientLight(0xffe2ac,2));const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(3,4,6);scene.add(key);
 // Six visible meshes and an eight-texture cache keep the larger deck light on mobile.
 const geometry=new THREE.BoxGeometry(2.06,3.43,.035);
 const edge=new THREE.MeshStandardMaterial({color:0xa9925e,metalness:.55,roughness:.6});
 const items=[],faces=[],cache=new Map(),pending=new Map(),urls=new Set();
 let activeIds=new Set(),dead=false,raf=0,selected=-1,rotation=0,pitch=0,dragging=false,startX=0,startY=0,moved=false,visible=true,lastFrame=0,tick=0;
 const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
 function target(slot){if(slot===0)return {x:0,y:.12,z:1.25,r:-.06};const lane=[-2,-1,1,2,3][slot-1];return {x:lane*.54,y:-Math.abs(lane)*.11,z:-Math.abs(lane)*.18,r:-lane*.13};}
 function prune(){for(const [id,entry]of [...cache.entries()].sort((a,b)=>a[1].used-b[1].used)){if(cache.size<=8)break;if(!activeIds.has(id)){entry.texture.dispose();cache.delete(id);}}}
 function textureFor(c){
  if(cache.has(c.id)){const entry=cache.get(c.id);entry.used=++tick;return Promise.resolve(entry.texture);}
  if(pending.has(c.id))return pending.get(c.id);
  const promise=new Promise((resolve,reject)=>{
   const url=URL.createObjectURL(new Blob([cardSVG(c)],{type:'image/svg+xml'}));urls.add(url);const image=new Image();
   image.onload=()=>{URL.revokeObjectURL(url);urls.delete(url);if(dead){resolve(null);return;}
    const canvas=document.createElement('canvas');canvas.width=540;canvas.height=900;const context=canvas.getContext('2d');context.drawImage(image,0,0,540,900);
    const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());cache.set(c.id,{texture,used:++tick});prune();resolve(texture);
   };
   image.onerror=()=>{URL.revokeObjectURL(url);urls.delete(url);reject(new Error('Card artwork could not be loaded.'));};image.src=url;
  }).finally(()=>pending.delete(c.id));pending.set(c.id,promise);return promise;
 }
 for(let slot=0;slot<6;slot++){
  const face=new THREE.MeshBasicMaterial({color:0x183130});faces.push(face);const mesh=new THREE.Mesh(geometry,[edge,edge,edge,edge,face,edge]);mesh.userData={index:0,generation:0,ready:false};group.add(mesh);items.push(mesh);
  const t=target(slot);mesh.position.set(t.x,t.y,t.z);mesh.rotation.z=t.r;
 }
 function render(){if(!dead)renderer.render(scene,camera);}
 function choose(id){
  const n=cards.findIndex(c=>c.id===id);if(n<0||dead||n===selected)return;selected=n;
  const indices=items.map((_,slot)=>(selected+slot)%cards.length);activeIds=new Set(indices.map(i=>cards[i].id));host.classList.remove('scene-ready');
  items.forEach((mesh,slot)=>{const index=indices[slot],c=cards[index],generation=++mesh.userData.generation;mesh.userData.index=index;mesh.userData.ready=false;faces[slot].map=null;faces[slot].color.set(0x183130);faces[slot].needsUpdate=true;
   textureFor(c).then(texture=>{if(dead||mesh.userData.generation!==generation)return;faces[slot].map=texture;faces[slot].color.set(0xffffff);faces[slot].needsUpdate=true;mesh.userData.ready=true;if(items.every(m=>m.userData.ready)){host.classList.add('scene-ready');prune();render();}}).catch(()=>{if(!dead)fallback();});
  });onSelect(id);render();
 }
 activeSelect=choose;
 function resize(){const {width,height}=host.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height,false);camera.aspect=width/height;camera.position.z=camera.aspect<.8?12.7:10.6;camera.updateProjectionMatrix();render();}
 const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
 function down(e){dragging=true;moved=false;startX=e.clientX;startY=e.clientY;host.setPointerCapture(e.pointerId);host.classList.add('dragging');}
 function move(e){if(!dragging)return;const dx=e.clientX-startX,dy=e.clientY-startY;if(Math.abs(dx)+Math.abs(dy)>7)moved=true;rotation=THREE.MathUtils.clamp(dx/400,-.55,.55);pitch=THREE.MathUtils.clamp(dy/600,-.2,.2);if(reduced){group.rotation.set(pitch,rotation,0);render();}}
 function up(e){if(!dragging)return;dragging=false;host.classList.remove('dragging');if(!moved){const rect=host.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(items)[0];if(hit)choose(cards[hit.object.userData.index].id);}}
 function cancel(){dragging=false;host.classList.remove('dragging');}
 host.addEventListener('pointerdown',down);host.addEventListener('pointermove',move);host.addEventListener('pointerup',up);host.addEventListener('pointercancel',cancel);
 function frame(time){if(dead)return;if(visible&&!document.hidden&&time-lastFrame>33){lastFrame=time;group.rotation.y=THREE.MathUtils.lerp(group.rotation.y,rotation,.07);group.rotation.x=THREE.MathUtils.lerp(group.rotation.x,pitch,.07);items.forEach((mesh,i)=>{const t=target(i);mesh.position.y=THREE.MathUtils.lerp(mesh.position.y,t.y+Math.sin(time*.0007+i*.8)*.055,.08);});render();}raf=requestAnimationFrame(frame);}
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;});observer.observe(host);choose(cards[0].id);resize();if(!reduced)raf=requestAnimationFrame(frame);
 return ()=>{dead=true;cancelAnimationFrame(raf);resizeObserver.disconnect();observer.disconnect();host.removeEventListener('pointerdown',down);host.removeEventListener('pointermove',move);host.removeEventListener('pointerup',up);host.removeEventListener('pointercancel',cancel);faces.forEach(m=>m.dispose());edge.dispose();cache.forEach(entry=>entry.texture.dispose());cache.clear();geometry.dispose();urls.forEach(u=>URL.revokeObjectURL(u));renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();activeSelect=()=>{};};
}
