webpackJsonp([1],{"9jMM":function(e,t,r){"use strict";t.a={data:function(){return{iconClassArr:["message","work","book","13","jiangbei","icon26"],indexArr:[0,1,2,3,4,5],currentIndex:0}},methods:{choose:function(e){this.currentIndex=e},addItem:function(e){this.$store.commit("ADD_ITEM",e)},removeItem:function(e,t){this.$store.commit("REMOVE_ITEM",{i1:e,i2:t})}},computed:{profile:function(){return this.$store.state.profile}}}},Czyj:function(e,t,r){"use strict";var n=r("cnC7"),o=r("Obkc"),i=r("KvDf");t.a={name:"app",components:{TopHeader:o.a,Editor:n.a,Preview:i.a}}},GvAS:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"editor"},[r("ul",{staticClass:"tabs-btn"},e._l(e.indexArr,function(t){return r("li",{class:{active:e.currentIndex===t},on:{click:function(r){e.choose(t)}}},[r("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[r("use",{attrs:{"xlink:href":"#icon-"+e.iconClassArr[t]}})])])})),e._v(" "),r("ul",{staticClass:"editor-panel"},e._l(e.indexArr,function(t){return r("li",{directives:[{name:"show",rawName:"v-show",value:e.currentIndex===t,expression:"currentIndex === i"}]},[0===t?r("el-form",[r("h2",[e._v("个人信息")]),e._v(" "),r("div",{staticClass:"input-group"},[r("el-form-item",{attrs:{label:"姓名："}},[r("el-input",{model:{value:e.profile.personalInformation.name,callback:function(t){e.$set(e.profile.personalInformation,"name",t)},expression:"profile.personalInformation.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"出生日期："}},[r("el-input",{model:{value:e.profile.personalInformation.birthday,callback:function(t){e.$set(e.profile.personalInformation,"birthday",t)},expression:"profile.personalInformation.birthday"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"性别："}},[r("el-input",{model:{value:e.profile.personalInformation.sex,callback:function(t){e.$set(e.profile.personalInformation,"sex",t)},expression:"profile.personalInformation.sex"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"目前状态："}},[r("el-input",{model:{value:e.profile.personalInformation.currentStatus,callback:function(t){e.$set(e.profile.personalInformation,"currentStatus",t)},expression:"profile.personalInformation.currentStatus"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"工作年限："}},[r("el-input",{model:{value:e.profile.personalInformation.workingYears,callback:function(t){e.$set(e.profile.personalInformation,"workingYears",t)},expression:"profile.personalInformation.workingYears"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"所在城市："}},[r("el-input",{model:{value:e.profile.personalInformation.liveCity,callback:function(t){e.$set(e.profile.personalInformation,"liveCity",t)},expression:"profile.personalInformation.liveCity"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"期望城市："}},[r("el-input",{model:{value:e.profile.personalInformation.expectCity,callback:function(t){e.$set(e.profile.personalInformation,"expectCity",t)},expression:"profile.personalInformation.expectCity"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"期望职位："}},[r("el-input",{model:{value:e.profile.personalInformation.expectPosition,callback:function(t){e.$set(e.profile.personalInformation,"expectPosition",t)},expression:"profile.personalInformation.expectPosition"}})],1)],1)]):1===t?r("el-form",[r("h2",[e._v("工作经历")]),e._v(" "),e._l(e.profile.work,function(n,o){return r("div",{staticClass:"input-group"},[r("el-form-item",{attrs:{label:"工作时间："}},[r("el-input",{model:{value:n.time,callback:function(t){e.$set(n,"time",t)},expression:"item.time"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"项目经历："}},[r("el-input",{attrs:{type:"textarea"},model:{value:n.project,callback:function(t){e.$set(n,"project",t)},expression:"item.project"}})],1),e._v(" "),r("i",{staticClass:"el-icon-circle-close",on:{click:function(r){e.removeItem(t,o)}}})],1)}),e._v(" "),r("el-button",{attrs:{type:"primary",round:""},on:{click:function(r){e.addItem(t)}}},[e._v("添加")])],2):2===t?r("el-form",[r("h2",[e._v("教育情况")]),e._v(" "),e._l(e.profile.education,function(n,o){return r("div",{staticClass:"input-group"},[r("el-form-item",{attrs:{label:"教育时间："}},[r("el-input",{model:{value:n.time,callback:function(t){e.$set(n,"time",t)},expression:"item.time"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"教育经历："}},[r("el-input",{attrs:{type:"textarea"},model:{value:n.situation,callback:function(t){e.$set(n,"situation",t)},expression:"item.situation"}})],1),e._v(" "),r("i",{staticClass:"el-icon-circle-close",on:{click:function(r){e.removeItem(t,o)}}})],1)}),e._v(" "),r("el-button",{attrs:{type:"primary",round:""},on:{click:function(r){e.addItem(t)}}},[e._v("添加")])],2):3===t?r("el-form",[r("h2",[e._v("个人爱好")]),e._v(" "),e._l(e.profile.hobbies,function(n,o){return r("div",{staticClass:"input-group"},[r("el-form-item",{attrs:{label:"爱好："}},[r("el-input",{model:{value:n.hobby,callback:function(t){e.$set(n,"hobby",t)},expression:"item.hobby"}})],1),e._v(" "),r("i",{staticClass:"el-icon-circle-close",on:{click:function(r){e.removeItem(t,o)}}})],1)}),e._v(" "),r("el-button",{attrs:{type:"primary",round:""},on:{click:function(r){e.addItem(t)}}},[e._v("添加")])],2):4===t?r("el-form",[r("h2",[e._v("获奖情况")]),e._v(" "),e._l(e.profile.prize,function(n,o){return r("div",{staticClass:"input-group"},[r("el-form-item",{attrs:{label:"获奖名称："}},[r("el-input",{model:{value:n.name,callback:function(t){e.$set(n,"name",t)},expression:"item.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"获奖描述："}},[r("el-input",{attrs:{type:"textarea"},model:{value:n.description,callback:function(t){e.$set(n,"description",t)},expression:"item.description"}})],1),e._v(" "),r("i",{staticClass:"el-icon-circle-close",on:{click:function(r){e.removeItem(t,o)}}})],1)}),e._v(" "),r("el-button",{attrs:{type:"primary",round:""},on:{click:function(r){e.addItem(t)}}},[e._v("添加")])],2):r("el-form",[r("h2",[e._v("联系方式")]),e._v(" "),r("div",{staticClass:"input-group"},[r("el-form-item",{attrs:{label:"电话："}},[r("el-input",{model:{value:e.profile.contact.phone,callback:function(t){e.$set(e.profile.contact,"phone",t)},expression:"profile.contact.phone"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"邮箱："}},[r("el-input",{model:{value:e.profile.contact.email,callback:function(t){e.$set(e.profile.contact,"email",t)},expression:"profile.contact.email"}})],1)],1)])],1)}))])},o=[],i={render:n,staticRenderFns:o};t.a=i},IB6h:function(e,t){},JL75:function(e,t,r){"use strict";t.a={computed:{profile:function(){return this.$store.getters.getProfile}}}},KrKn:function(e,t){},KvDf:function(e,t,r){"use strict";function n(e){r("akbI")}var o=r("JL75"),i=r("pWwg"),a=r("0HdQ"),s=n,l=a(o.a,i.a,!1,s,null,null);t.a=l.exports},M93x:function(e,t,r){"use strict";function n(e){r("dJrd")}var o=r("Czyj"),i=r("UeKI"),a=r("0HdQ"),s=n,l=a(o.a,i.a,!1,s,null,null);t.a=l.exports},NHnr:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("5vqR"),o=r("M93x"),i=r("YtJ0"),a=r("0SyO"),s=r.n(a),l=r("dHzK"),c=(r.n(l),r("KrKn"));r.n(c);n.default.config.productionTip=!1,n.default.use(s.a),new n.default({el:"#app",store:i.a,template:"<App/>",components:{App:o.a}})},Obkc:function(e,t,r){"use strict";function n(e){r("IB6h")}var o=r("haCm"),i=r("Y/2M"),a=r("0HdQ"),s=n,l=a(o.a,i.a,!1,s,null,null);t.a=l.exports},QvOg:function(e,t){},UeKI:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("TopHeader"),e._v(" "),r("main",{attrs:{id:"main"}},[r("div",{staticClass:"wrap"},[r("Editor"),e._v(" "),r("Preview")],1)])],1)},o=[],i={render:n,staticRenderFns:o};t.a=i},"Y/2M":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("header",{staticClass:"header"},[r("div",{staticClass:"wrap"},[r("div",{staticClass:"logo"},[e._v("Resumer")]),e._v(" "),r("div",{staticClass:"btn-group"},[e.isLogined?r("span",{staticClass:"username"},[e._v(e._s(e.currentUser.username))]):e._e(),e._v(" "),e.isLogined?e._e():r("el-button",{attrs:{type:"primary",round:""},on:{click:e.openLoginPop}},[e._v("登陆")]),e._v(" "),e.isLogined?e._e():r("el-button",{attrs:{type:"primary",round:""},on:{click:e.openRegisterPop}},[e._v("注册")]),e._v(" "),e.isLogined?r("el-button",{key:"logout",attrs:{type:"primary",round:""},on:{click:e.logOut}},[e._v("退出登陆")]):e._e(),e._v(" "),e.isLogined?r("el-button",{key:"save",attrs:{type:"primary",round:""},on:{click:e.saveFormData}},[e._v("保存")]):e._e(),e._v(" "),e.isLogined?r("a",{attrs:{href:"preview.html?username="+e.currentUser.username,target:"blank"}},[e._v("预览")]):e._e(),e._v(" "),e.isLogined?r("el-popover",{ref:"shareLink",attrs:{placement:"bottom",width:"300",trigger:"click"}},[r("el-form",{attrs:{label:"80px"}},[r("el-form-item",{attrs:{label:"复制以下链接："}},[r("el-input",{on:{focus:function(t){e.textSelected(t)}},model:{value:e.url,callback:function(t){e.url=t},expression:"url"}})],1)],1)],1):e._e(),e._v(" "),e.isLogined?r("el-button",{directives:[{name:"popover",rawName:"v-popover:shareLink",arg:"shareLink"}],key:"shareLink",attrs:{type:"primary",round:""}},[e._v("分享预览")]):e._e()],1),e._v(" "),r("transition",{attrs:{name:"el-fade-in-linear"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.shouldShowPop,expression:"shouldShowPop"}],staticClass:"layer-mask"},[r("div",{staticClass:"layer-pop"},[r("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[r("el-tab-pane",{attrs:{label:"登陆",name:"login"}},[r("el-form",{ref:"loginForm",staticClass:"demo-ruleForm",attrs:{model:e.loginData,"label-position":e.labelPosition,"label-width":"60px",rules:e.rules1}},[r("el-form-item",{attrs:{label:"账号：",prop:"username"}},[r("el-input",{attrs:{placeholder:"请输入账号"},model:{value:e.loginData.username,callback:function(t){e.$set(e.loginData,"username",t)},expression:"loginData.username"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"密码：",prop:"password","auto-complete":"off"}},[r("el-input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:e.loginData.password,callback:function(t){e.$set(e.loginData,"password",t)},expression:"loginData.password"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("loginForm","login")}}},[e._v("登陆")]),e._v(" "),r("el-button",{on:{click:function(t){e.resetForm("loginForm")}}},[e._v("重置")])],1)],1)],1),e._v(" "),r("el-tab-pane",{attrs:{label:"注册",name:"signup"}},[r("el-form",{ref:"signupForm",staticClass:"demo-ruleForm",attrs:{"label-position":e.labelPosition,"label-width":"60px",model:e.signupData,rules:e.rules1}},[r("el-form-item",{attrs:{label:"账号：",prop:"username"}},[r("el-input",{attrs:{placeholder:"6-8位，接受大小写字母、数字和下划线"},model:{value:e.signupData.username,callback:function(t){e.$set(e.signupData,"username",t)},expression:"signupData.username"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"密码：",prop:"password"}},[r("el-input",{attrs:{type:"password",placeholder:"6-8位，接受大小写字母、数字和下划线"},model:{value:e.signupData.password,callback:function(t){e.$set(e.signupData,"password",t)},expression:"signupData.password"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("signupForm","signup")}}},[e._v("注册")]),e._v(" "),r("el-button",{on:{click:function(t){e.resetForm("signupForm")}}},[e._v("重置")])],1)],1)],1)],1),e._v(" "),r("i",{staticClass:"el-icon-circle-close",on:{click:e.closePop}})],1)])])],1)])},o=[],i={render:n,staticRenderFns:o};t.a=i},YtJ0:function(e,t,r){"use strict";var n=r("Q+Ik"),o=r.n(n),i=r("KH7x"),a=r.n(i),s=r("MgeX"),l=r.n(s),c=r("HzJ8"),u=r.n(c),p=r("9rMa"),f=r("5vqR"),m=r("UM2g"),v=r.n(m);f.default.use(p.a);v.a.init({appId:"mvEzkoDQA3TSp6uTIbz81Mk0-gzGzoHsz",appKey:"hV7aJ6xx0vtOh9FIvc3e8eei"});var d=new p.a.Store({state:{profile:{personalInformation:{name:"",birthday:"",sex:"",currentStatus:"",workingYears:"",liveCity:"",expectCity:"",expectPosition:""},work:[{time:"",project:""},{time:"",project:""}],education:[{time:"",situation:""},{time:"",situation:""}],hobbies:[{hobby:""},{hobby:""}],prize:[{name:"",desription:""},{name:"",description:""}],contact:{phone:"",email:""}}},getters:{getProfile:function(e){var t={},r=e.profile,n=function(e){var t=!0,r=!0,n=!1,o=void 0;try{for(var i,a=u()(l()(e));!(r=(i=a.next()).done);r=!0){if(i.value){t=!1;break}}}catch(e){n=!0,o=e}finally{try{!r&&a.return&&a.return()}finally{if(n)throw o}}return t},i=!0,s=!1,c=void 0;try{for(var p,f=u()(o()(r));!(i=(p=f.next()).done);i=!0){var m=p.value,v=a()(m,2),d=v[0],_=v[1];!function(e,r){Array.isArray(r)?t[e]=r.filter(function(e){return!n(e)}):t[e]=r}(d,_)}}catch(e){s=!0,c=e}finally{try{!i&&f.return&&f.return()}finally{if(s)throw c}}return t}},mutations:{ADD_ITEM:function(e,t){switch(t){case 1:e.profile.work.push({time:"",project:""});break;case 2:e.profile.education.push({time:"",situation:""});break;case 3:e.profile.hobbies.push({hobby:""});break;case 4:e.profile.prize.push({name:"",description:""});break;default:return}},REMOVE_ITEM:function(e,t){var r=t.i1,n=t.i2,o=function(e,t){1!==e.length&&e.splice(t,1)};switch(r){case 1:o(e.profile.work,n);break;case 2:o(e.profile.education,n);break;case 3:o(e.profile.hobbies,n);break;case 4:o(e.profile.prize,n);break;default:return}},CHANGE_PROFILE:function(e,t){e.profile=t}}});t.a=d},akbI:function(e,t){},cnC7:function(e,t,r){"use strict";function n(e){r("QvOg")}var o=r("9jMM"),i=r("GvAS"),a=r("0HdQ"),s=n,l=a(o.a,i.a,!1,s,null,null);t.a=l.exports},dHzK:function(e,t){},dJrd:function(e,t){},haCm:function(e,t,r){"use strict";var n=r("3cXf"),o=r.n(n),i=r("UM2g"),a=r.n(i);t.a={data:function(){return{isLogined:!1,shouldShowPop:!1,activeName:"",labelPosition:"right",signupData:{username:"",password:""},loginData:{username:"",password:""},currentUser:null,url:"",rules1:{username:[{validator:function(e,t,r){return/^\s*$/.test(t)?r(new Error("账号不能为空")):/\s+/g.test(t)?r(new Error("账号中不能包含空字符")):/^\w{6,8}$/i.test(t)?r():r(new Error("账号格式出错"))},trigger:"blur"}],password:[{validator:function(e,t,r){return/^\s*$/.test(t)?r(new Error("密码不能为空")):/\s+/g.test(t)?r(new Error("密码中不能包含空字符")):/^\w{6,8}$/i.test(t)?r():r(new Error("密码格式出错"))},trigger:"blur"}]}}},methods:{openLoginPop:function(){this.shouldShowPop=!0,this.activeName="login"},openRegisterPop:function(){this.shouldShowPop=!0,this.activeName="signup"},closePop:function(){this.shouldShowPop=!1},signUp:function(){var e=this,t=new a.a.User;t.setUsername(this.signupData.username),t.setPassword(this.signupData.password),t.signUp().then(function(){e.loginData.username=e.signupData.username,e.loginData.password=e.signupData.password,e.showMessage("注册成功","success"),setTimeout(function(){return e.logIn(!0)},1e3)},function(){return e.showMessage("注册失败，网络连接出错","error")})},logIn:function(e){var t=this;a.a.User.logIn(this.loginData.username,this.loginData.password).then(function(r){t.showMessage("登陆成功","success"),setTimeout(function(){t.closePop(),t.currentUser=t.getCurrentUser(),t.isLogined=!0,t.setUrl(),e||t.getFormData()},1e3)},function(){return t.showMessage("登陆失败，账号或密码错误","error")})},logOut:function(){a.a.User.logOut(),window.location.reload()},getCurrentUser:function(){var e=a.a.User.current();return{id:e.id,createdAt:e.createdAt,username:e.attributes.username,hasSavedData:!1}},saveFormData:function(){var e=this,t=a.a.Object.extend("Todo"),r=o()(this.$store.state.profile),n=this.currentUser.username;if(this.currentUser.hasSavedData){var i=a.a.Object.createWithoutData("Todo",this.currentUser.todoId);i.set({data:r}),i.save().then(function(){return e.showMessage("保存成功","success")},function(){return e.showMessage("保存失败，网络连接出错","error")})}else{var s=new t,l=new a.a.ACL;l.setReadAccess(a.a.User.current(),!0),l.setWriteAccess(a.a.User.current(),!0),s.setACL(l),s.set({data:r,username:n}),s.save().then(function(){e.showMessage("保存成功","success"),e.currentUser.hasSavedData=!0,e.currentUser.todoId=s.id},function(){return e.showMessage("保存失败，网络连接出错","error")})}},getFormData:function(){var e=this;new a.a.Query("Todo").find().then(function(t){console.log(t);var r=t[0];e.currentUser.hasSavedData=0!==t.length,e.currentUser.todoId=r.id,e.$store.commit("CHANGE_PROFILE",JSON.parse(r.attributes.data))},function(){return console.log("获取数据失败")})},setUrl:function(){var e=window.location.host,t=window.location.pathname.match(/\/?[\w\/]*\/{1}/)[0],r=this.currentUser.username;this.url=""+e+t+"preview.html?username="+r},showMessage:function(e,t){this.$message({message:e,type:t,duration:1e3})},textSelected:function(e){e.target.select()},submitForm:function(e,t){var r=this;this.$refs[e].validate(function(e){if(!e)return!1;"login"===t?(console.log("login"),r.logIn(!1)):"signup"===t&&(r.signUp(),console.log("signup"))})},resetForm:function(e){this.$refs[e].resetFields()}}}},pWwg:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"preview"},[r("div",{staticClass:"preview-personalInformation"},[r("h2",[e._v(e._s(e.profile.personalInformation.name))]),e._v(" "),r("p",[e._v(e._s(e.profile.personalInformation.birthday))]),e._v(" "),r("p",[e._v(e._s(e.profile.personalInformation.sex))]),e._v(" "),r("p",[e._v(e._s(e.profile.personalInformation.currentStatus))]),e._v(" "),r("p",[e._v(e._s(e.profile.personalInformation.workingYears))]),e._v(" "),r("p",[e._v(e._s(e.profile.personalInformation.liveCity))]),e._v(" "),r("p",[e._v(e._s(e.profile.personalInformation.expectCity))]),e._v(" "),r("p",[e._v(e._s(e.profile.personalInformation.expectPosition))])]),e._v(" "),r("div",{staticClass:"preview-work"},e._l(e.profile.work,function(t){return r("ul",[r("li",[e._v(e._s(t.time))]),e._v(" "),r("li",[e._v(e._s(t.project))])])})),e._v(" "),r("div",{staticClass:"preview-education"},e._l(e.profile.education,function(t){return r("ul",[r("li",[e._v(e._s(t.time))]),e._v(" "),r("li",[e._v(e._s(t.situation))])])})),e._v(" "),r("div",{staticClass:"preview-hobbies"},[r("ul",e._l(e.profile.hobbies,function(t){return r("li",[e._v(e._s(t.hobby))])}))]),e._v(" "),r("div",{staticClass:"preview-prize"},e._l(e.profile.prize,function(t){return r("ul",[r("li",[e._v(e._s(t.name))]),e._v(" "),r("li",[e._v(e._s(t.description))])])})),e._v(" "),r("div",{staticClass:"preview-contact"},[r("ul",[r("li",[e._v(e._s(e.profile.contact.phone))]),e._v(" "),r("li",[e._v(e._s(e.profile.contact.email))])])])])},o=[],i={render:n,staticRenderFns:o};t.a=i}},["NHnr"]);
//# sourceMappingURL=app.4fec817014eb36a8fb79.js.map