import{u as c,j as t,m as x}from"./index-113990be.js";import{F as m,a as d,b as p,c as h,d as j,e as u}from"./gpt-form-9b7de952.js";import{T as F}from"./textarea-b3eac810.js";const o=3,T=({step:s,form:e,renderButtons:r,incrementStep:l})=>{const{t:a}=c(["form"]);async function i(){await e.trigger("context"),e.getFieldState("context").invalid||(l(),localStorage.setItem("context",e.getValues("context")||""))}return t.jsxs(x.div,{className:"flex absolute p-1 left-0 right-0 top-0 flex-col",animate:{translateX:`${-(s-o)*400}px`},style:{translateX:`${-(s-o)*400}px`},transition:{ease:"easeInOut"},children:[t.jsx("h1",{className:"font-medium text-medium text-xl mb-3",children:a("step3.heading")}),t.jsx(m,{control:e.control,name:"context",render:({field:n})=>t.jsxs(d,{children:[t.jsx(p,{className:"text-md",children:a("step3.title")}),t.jsx(h,{children:a("step3.description")}),t.jsx(j,{children:t.jsx(F,{...n,"data-testid":"form-context-textarea",placeholder:a("step3.placeholder"),disabled:s!==o})}),t.jsx(u,{})]})}),r(i)]})};export{T as default};