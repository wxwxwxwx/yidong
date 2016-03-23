window.onload=function()
{
    // 下拉菜单 开始
    var lis=document.getElementsByClassName("item")
	var down=document.getElementsByClassName("down")
    for(var i=0;i<lis.length;i++){
	lis[i].index=i;
    lis[i].onmouseover=function(){
    	for(var j=0;j<lis.length;j++){
    		down[j].style.display="none"
    	}
    	down[this.index].style.display="block"
    }
    lis[i].onmouseout=function(){
    	for(var j=0;j<lis.length;j++){
    	 down[this.index].style.display="none"
    	}
   }
}

// 下拉菜单结束
// 轮播图开始

var win=allgain(".banner_img")[0]
var img=allgain("a",win)
console.log(img)
var li=allgain("span",win)
console.log(li)
var wins=allgain(".btn")[0]
var divs=allgain("div",wins)
carousel(win,li,img,divs,2000,500,"hot","anniu_span")




    var all=allgain(".change")[0]
    var box=allgain(".changer")[0]
    var box1=allgain(".changebox")[0]
    var as=allgain("div",box1)
   
    var btnl=allgain(".btnl")[0]
    var btnr=allgain(".btnr")[0]
    var len=as.length
    console.log(len)
    var aW=285
    box.style.width=aW*len+"px"
    var flag=true
    var t
    t=setInterval(move,1000)
box.onmouseover=function(){
    clearInterval(t)
}
box.onmouseout=function(){
     t=setInterval(move,1000)
}
btnl.onclick=function(){
    move()
}
btnr.onclick=function(){
    mover()
}


function mover(){
        if(!flag){
            return
        }
flag=false;
      var first=getFirst(box1)
            var last=getLast(box1)
            box1.style.left=-aW+"px";
        box1.insertBefore(last,first)
        animate(box1,{left:0},function(){
            
        flag=true
        })
        
    }


    function move(){
        if(!flag){
            return
        }
flag=false;
        animate(box1,{left:-aW},function(){
            // for(var i=0;i<num;i++){
            var first=getFirst(box1)
            box1.style.left="0px";
        box1.appendChild(first)
        flag=true
        })
        
    }

}