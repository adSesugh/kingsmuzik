import{u as d,a as o,j as e,H as u}from"./app.8bed910f.js";import{B as p}from"./Button.8b2eee9e.js";import{I as c}from"./Input.c4ef0241.js";import{V as f}from"./ValidationErrors.b97887a0.js";import{A as w}from"./AuthLayout.edba770e.js";import"./ApplicationLogo.a8871269.js";import"./index.esm.fad5b1a8.js";import"./iconBase.36102785.js";import"./styles.c79e221e.js";function H({status:a}){const{data:s,setData:r,post:m,processing:i,errors:l}=d({email:""}),n=t=>{r(t.target.name,t.target.value)};return o(w,{type:"fpassword",children:[e(u,{title:"Forgot Password"}),e("div",{className:"mb-4 text-sm text-gray-500 leading-normal font-serif",children:"Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one."}),a&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:a}),e(f,{errors:l}),o("form",{onSubmit:t=>{t.preventDefault(),m(route("password.email"))},children:[e(c,{type:"text",name:"email",value:s.email,className:"mt-1 block w-full",isFocused:!0,handleChange:n}),e("div",{className:"flex items-center justify-end mt-4",children:e(p,{className:"ml-4",processing:i,children:"Email Password Reset Link"})})]})]})}export{H as default};
