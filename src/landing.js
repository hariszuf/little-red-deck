import * as THREE from 'three';
import {cards} from '../dist/model.js';
import {cardSVG} from '../dist/artwork.js';
let activeSelect=()=>{};
export function select(id){activeSelect(id);}
export function mount(host,{onSelect=()=>{}}={}){
 if(!host)return ()=>{};
 const hint=document.querySelector('#scene-hint');
 if(!window.WebGLRenderingContext){if(hint)hint.textContent='EXPLORE THE SIX CARDS BELOW';return ()=>{};}
 let renderer;
 try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{if(hint)hint.textContent='EXPLORE THE SIX CARDS BELOW';return ()=>{};}
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.domElement.setAttribute('aria-hidden','true');host.append(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(0,0,10.6);
 const group=new THREE.Group();scene.add(group);
 scene.add(new THREE.AmbientLight(0xffe2ac,2));const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(3,4,6);scene.add(key);
 const materials=[],textures=[],geometries=[],items=[],urls=new Set();let dead=false,raf=0,selected=0,rotation=0,pitch=0,dragging=false,startX=0,startY=0,moved=false,visible=true,lastFrame=0;
 const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
 function target(index){if(index===selected)return {x:0,y:.12,z:1.25,r:-.06};const others=items.map((_,i)=>i).filter(i=>i!==selected),slot=others.indexOf(index),slots=[-2,-1,1,2,3],lane=slots[slot];return {x:lane*.54,y:-Math.abs(lane)*.11,z:-Math.abs(lane)*.18,r:-lane*.13};}
 for(const [index,c]of cards.entries()){
 const geometry=new THREE.BoxGeometry(2.06,3.43,.035);geometries.push(geometry);
 const edge=new THREE.MeshStandardMaterial({color:0xa9925e,metalness:.55,roughness:.6});const face=new THREE.MeshBasicMaterial({color:0x183130});materials.push(edge,face);
 const mesh=new THREE.Mesh(geometry,[edge,edge,edge,edge,face,edge]);mesh.userData.index=index;group.add(mesh);items.push(mesh);
 const svg=cardSVG(c);const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));urls.add(url);const image=new Image();
 image.onload=()=>{URL.revokeObjectURL(url);urls.delete(url);if(dead)return;const canvas=document.createElement('canvas');canvas.width=720;canvas.height=1200;const context=canvas.getContext('2d');context.drawImage(image,0,0,720,1200);const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());textures.push(texture);face.map=texture;face.color.set(0xffffff);face.needsUpdate=true;if(textures.length===cards.length){host.classList.add('scene-ready');render();}};
 image.onerror=()=>{URL.revokeObjectURL(url);urls.delete(url);};image.src=url;
 }
 items.forEach((mesh,i)=>{const t=target(i);mesh.position.set(t.x,t.y,t.z);mesh.rotation.z=t.r;});
 function resize(){const {width,height}=host.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height,false);camera.aspect=width/height;camera.position.z=camera.aspect<.8?12.7:10.6;camera.updateProjectionMatrix();render();}
 function render(){if(!dead)renderer.render(scene,camera);}
 const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
 function choose(id){const n=cards.findIndex(c=>c.id===id);if(n<0||dead)return;selected=n;onSelect(id);if(reduced){items.forEach((mesh,i)=>{const t=target(i);mesh.position.set(t.x,t.y,t.z);mesh.rotation.z=t.r;});render();}}
 activeSelect=choose;
 function down(e){dragging=true;moved=false;startX=e.clientX;startY=e.clientY;host.setPointerCapture(e.pointerId);host.classList.add('dragging');}
 function move(e){if(!dragging)return;const dx=e.clientX-startX,dy=e.clientY-startY;if(Math.abs(dx)+Math.abs(dy)>7)moved=true;rotation=THREE.MathUtils.clamp(dx/400,-.55,.55);pitch=THREE.MathUtils.clamp(dy/600,-.2,.2);if(reduced){group.rotation.set(pitch,rotation,0);render();}}
 function up(e){if(!dragging)return;dragging=false;host.classList.remove('dragging');if(!moved){const rect=host.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(items)[0];if(hit)choose(cards[hit.object.userData.index].id);}}
 function cancel(){dragging=false;host.classList.remove('dragging');}
 host.addEventListener('pointerdown',down);host.addEventListener('pointermove',move);host.addEventListener('pointerup',up);host.addEventListener('pointercancel',cancel);
 function frame(time){if(dead)return;if(visible&&!document.hidden&&time-lastFrame>33){lastFrame=time;group.rotation.y=THREE.MathUtils.lerp(group.rotation.y,rotation,.07);group.rotation.x=THREE.MathUtils.lerp(group.rotation.x,pitch,.07);items.forEach((mesh,i)=>{const t=target(i);mesh.position.x=THREE.MathUtils.lerp(mesh.position.x,t.x,.08);mesh.position.y=THREE.MathUtils.lerp(mesh.position.y,t.y+Math.sin(time*.0007+i*.8)*.055,.08);mesh.position.z=THREE.MathUtils.lerp(mesh.position.z,t.z,.08);mesh.rotation.z=THREE.MathUtils.lerp(mesh.rotation.z,t.r,.08);});render();}raf=requestAnimationFrame(frame);}
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;});observer.observe(host);resize();if(!reduced)raf=requestAnimationFrame(frame);
 return ()=>{dead=true;cancelAnimationFrame(raf);resizeObserver.disconnect();observer.disconnect();host.removeEventListener('pointerdown',down);host.removeEventListener('pointermove',move);host.removeEventListener('pointerup',up);host.removeEventListener('pointercancel',cancel);materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());geometries.forEach(g=>g.dispose());urls.forEach(u=>URL.revokeObjectURL(u));renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();activeSelect=()=>{};};
}
