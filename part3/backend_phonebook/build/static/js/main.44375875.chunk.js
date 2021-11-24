(this.webpackJsonpphone_book=this.webpackJsonpphone_book||[]).push([[0],{42:function(e,n,t){},43:function(e,n,t){"use strict";t.r(n);var r=t(1),c=t(18),o=t.n(c),a=t(8),u=t(3),i=t(5),s=t(4),l=t.n(s),d="/api/persons",b={getAll:function(){return l.a.get(d).then((function(e){return e.data}))},create:function(e){return l.a.post(d,e).then((function(e){return e.data}))},update:function(e,n){return l.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},deletePerson:function(e){return l.a.delete("".concat(d,"/").concat(e))}},f=t(0),j=function(e){var n=e.filter,t=e.handleFilterChange;return Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{children:"Filter shown with"}),Object(f.jsx)("input",{type:"text",placeholder:"Enter name to search",value:n,onChange:t})]})},h=function(e){var n=e.onSubmit,t=e.handleInputChange,r=e.newPerson;return Object(f.jsxs)("form",{onSubmit:n,children:[Object(f.jsx)("div",{children:Object(f.jsx)("input",{type:"text",name:"name",placeholder:"Enter name",value:r.name,onChange:t})}),Object(f.jsx)("div",{children:Object(f.jsx)("input",{type:"tel",name:"number",placeholder:"Enter number",value:r.number,onChange:t})}),Object(f.jsx)("div",{children:Object(f.jsx)("button",{type:"submit",children:"Add"})})]})},m=function(e){var n=e.person,t=e.deletePerson;return Object(f.jsxs)("li",{children:[n.name," ",n.number," ",Object(f.jsx)("button",{onClick:t,children:"Delete"})," "]})},p=function(e){var n=e.persons,t=e.deletePerson;return Object(f.jsx)("ul",{children:n.map((function(e){return Object(f.jsx)(m,{person:e,deletePerson:function(){return t(e)}},e.name)}))})},O=(t(42),function(e){var n=e.notification;return null===n?null:Object(f.jsx)("div",{className:n.type,children:n.message})}),v=function(){var e=Object(r.useState)([]),n=Object(i.a)(e,2),t=n[0],c=n[1],o=Object(r.useState)({name:"",number:""}),s=Object(i.a)(o,2),l=s[0],d=s[1],m=Object(r.useState)(""),v=Object(i.a)(m,2),x=v[0],g=v[1],w=Object(r.useState)(null),C=Object(i.a)(w,2),y=C[0],P=C[1];Object(r.useEffect)((function(){console.log("effect"),b.getAll().then((function(e){console.log("promise fulfilled"),c(e)}))}),[]);var k=function(e,n){P({message:e,type:n}),setTimeout((function(){P(null)}),2e3)};console.log("render",t.length,"persons");var S=0===x.length?t:t.filter((function(e){return e.name.toLowerCase().includes(x.toLowerCase())}));return Object(f.jsxs)("div",{children:[Object(f.jsx)("h2",{children:"Phonebook"}),Object(f.jsx)(O,{notification:y}),Object(f.jsx)(j,{filter:x,handleFilterChange:function(e){g(e.target.value)}}),Object(f.jsx)("h2",{children:"Add a new"}),Object(f.jsx)(h,{onSubmit:function(e){e.preventDefault();var n={name:l.name,number:l.number},r=t.find((function(e){return e.name.toLowerCase()===n.name.toLowerCase()}));if(r){if(window.confirm("".concat(r.name," is already added to phonebook, replace the old number with a new one?"))){var o=Object(u.a)(Object(u.a)({},r),{},{number:n.number});b.update(o.id,o).then((function(e){c(t.map((function(n){return n.id!==e.id?n:e}))),k("Changed number of  ".concat(r.name),"succes"),d({name:"",number:""})})).catch((function(e){k("Information of ".concat(o.name," has already been removed from server"),"error"),c(t.filter((function(e){return e.id!==o.id})))}))}}else b.create(n).then((function(e){k("Added ".concat(n.name),"succes"),c(t.concat(e)),d({name:"",number:""})})).catch((function(e){return k(e.response.data.error,"error")}))},handleInputChange:function(e){d(Object(u.a)(Object(u.a)({},l),{},Object(a.a)({},e.target.name,e.target.value)))},newPerson:l}),Object(f.jsx)("h2",{children:"Numbers"}),Object(f.jsx)(p,{persons:S,deletePerson:function(e){window.confirm("Delete ".concat(e.name,"?"))&&b.deletePerson(e.id).then((function(n){c(t.filter((function(n){return n.id!==e.id}))),k("Deleted ".concat(e.name),"succes")})).catch((function(){c(t.filter((function(n){return n.id!==e.id}))),k("".concat(e.name," has already been removed"),"error")}))}})]})};o.a.render(Object(f.jsx)(v,{}),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.44375875.chunk.js.map