import{f as l,r as p,j as e,B as x,c as s,m as d,d as u}from"./index-e70a6624.js";import{A as f}from"./index-634d62f3.js";const y=l("CopyCheck",[["path",{d:"m12 15 2 2 4-4",key:"2c609p"}],["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]),h=l("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]),m=({textToCopy:t,className:o})=>{const[n,a]=p.useState(!1);async function i(r){return"clipboard"in navigator?await navigator.clipboard.writeText(r):document.execCommand("copy",!0,r)}function c(){i(t).then(()=>{a(!0),setTimeout(()=>{a(!1)},1500)}).catch(r=>{console.log(r)})}return e.jsx(x,{variant:"outline",onClick:c,className:s("px-1 py-1 h-fit w-fit",o),children:n?e.jsx(y,{size:18}):e.jsx(h,{size:18})})},w=({message:t})=>e.jsxs(d.div,{initial:{opacity:0,x:100},animate:{opacity:1,x:0},className:s("flex flex-row gap-1.5 w-auto max-w-[66vw] px-3 py-1.5 rounded-xl shadow-md",t.role==="user"?"bg-primary text-primary-foreground self-start":"border-2 bg-background self-end"),children:[e.jsx("pre",{className:s("whitespace-pre-line break-words",t.role==="assistant"&&"after:h-[1em] after:tracking-[1rem] after:content-['\x000a0']"),children:t.content}),e.jsx(m,{textToCopy:t.content,className:s({hidden:t.role==="user"})})]}),C=p.forwardRef(({messages:t,isFetching:o},n)=>{const{t:a}=u(["messages"]);return t.length>0?e.jsx("div",{ref:n,className:"absolute flex flex-col gap-4 w-full max-w-[1000px] px-3 md:px-20 pb-10 pt-7 z-10",children:e.jsxs(f,{initial:!1,children:[t.map((i,c)=>e.jsx(w,{message:i},c)),o&&e.jsx(d.div,{className:"self-end",initial:{opacity:0,x:100},animate:{opacity:1,x:0},children:e.jsx("p",{className:"font-sans px-3 py-1.5 rounded-xl w-fit shadow-md bg-background border-2 ml-5",children:a("typing")})})]})}):null});export{C as default};
