/*popup.js test版 作者 小贝
* */
!function () {

}(),
    function(e,i){
        "use strict";
        //c是默认配置，m是实现方法，p是popup实体
        var c,p,m;
        c={
            config:{
                shade:!0,
                type:0,
                title:!0,
                titleText:null,
                moveType:!0,
                icon:1,
                time:3000,
                resize:!0,
                scrollbar:!0,
                content:"",
                bnt:[{name:"确定",callback:function(){}},{name:"取消",callback:function(){}}],

            },
            class:["popup-shade","popup-main","popup-title","popup-content","popup-operation"],
            type:["msg","alert"],
            cache:[],
            index:0,
            moveState:!1,
            moveS:0,
            moveV:0
        };

        p={
            v:"test",
            //普通信信息框 a:内容 b：{},c:Callback
            alert:function(a,c,b){
                var t= typeof c =="function";
                console.log(a)
                console.log(b)
                console.log(c)
                return      !t && (b=c),
                    b?b.type=2:b={type:2},
                    p.init(a,c,b)
            }
        };

        //实体类初始化方法
        //参数 a:内容 b：风格,c:Callback,d类型
        p.init=function(a,e,b){
            console.error(i)
            var o={
                shade:!0,
                type:b.type,
                title: b.title ? b.title:!0,
                titleText: b.titleText ? b.titleText:"提示",
                move:!0,
                icon:1,
                time:3000,
                resize:!0,
                scrollbar:!0,
                content: a?a:"内容",
                bnt:[{name:"确定",callback:function(){}},{name:"取消",callback:function(){}}],
                end: e?e:!1
            }
            var t=new m(o);
            t.move();
            t.clos();
            t.resize();
            c.cache.push(t);
            console.log(c)
            return c.index;
        }


        m=function(e){
            var _t=this
            _t.index=++c.index,
                _t.config=e;
            _t.create();
            for(var p=0;p<_t.content.length;p++){
                i("body").append(_t.content[p]);
            }
            _t.content[0].css({"top":"50%","left":"50%","margin":(-_t.content[0].height())/2 + "px 0 0" + -_t.content[0].width()/2+"px"});
        }


        m.pt=m.prototype;
        //
        m.pt.create=function(){
            var _a=this,
                _c=_a.config;
            //生成content
            switch (_a.config.type){
                //msg
                case 1: break;
                //alert
                case 2:
                    this.template(_c);
                    break;
            }
            //绑定事件初始化
        }
        //模板初始化 传入配置生成内容框
        m.pt.template=function(e){
            console.error(i)
            var b=i("<div id='"+c.class[2]+c.index+"' class='popup-main'></div>");
            e.title ? b.append(" <div class='popup-title' style='cursor: move;'>"+(e.titleText ?e.titleText : "信息")+"</div>"):0;
            e.content ? b.append(" <div class='popup-content' >"+(e.content? e.content:'')+"</div>"):0;
            e.bnt ? b.append("   <div class='popup-btn' > <a class='popup-btn0 popup-close'>确定</a> <a class='popup-btn1 popup-close'>取消</a> </div>"):0;
            //遮罩
            var k=i("<div id='popup-shade"+c.index+"' class='popup-shade'></div>");
            this.content=[];
            this.content.push(b,k);

            return b;
        }
        //初始化拖拽事件
        m.pt.move=function(){
            var t=this,
                u=t.config,
                v=t.content[0],
                s=c;
            v.find(".popup-title").on("mousedown",function(e){
                e.preventDefault();
                s.moveState=!0;
                s.moveS={x:e.clientX,y:e.clientY};
                s.moveV={x:v.offset().left,y:v.offset().top};

                console.log("x"+e.clientX+"y"+e.clientY);
                console.log(v.offset())
                console.log(v.offset().left)
                console.log(s.moveV)
            })
            i("body").on("mousemove",function(e){
                if(!s.moveState){
                    return
                }
                e.preventDefault();
                var moveX,moveY;
                moveX=s.moveV.x+((s.moveS.x-e.clientX)*-1),
                    moveY=s.moveV.y+((s.moveS.y-e.clientY)*-1);

                v.offset({top:moveY,left:moveX})

            }).on("mouseup",function(){
                s.moveState=!1;
                console.log(s.moveState)

            })
        }
        //图标关闭
        m.pt.clos=function(){
            var t=this,
                u=t.config,
                v=t.content,
                s=c;
            v[0].find(".popup-close").on("click",function(e){
                e.stopPropagation();
                for(var i in v){
                    v[i].remove();
                }
                console.log(c)
            })
        }
        //窗口变化
        m.pt.resize=function(){
            var t=this,
                u=t.config,
                v=t.content,
                s=c;
            i(e).resize(function() {
                var w,h,ww,wh;
                ww=window.innerWidth/2 ;
                wh=window.innerHeight/2;
                v[0].css({"top":"50%","left":"50%","margin":(-v[0].height()+40)/2 + "px 0 0" + -v[0].width()/2+"px"});
            });
        }

        m.content=[];
        //初始化
        e.popup=p;

    }(window,jQuery)
