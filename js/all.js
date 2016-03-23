//getStyle获取函数
//obj是获取的对象attr是要获取的属性
function getStyle(obj,attr){
	if(obj.currentStyle){
return obj.currentStyle[attr]
}else{
  return getComputedStyle(obj,null)[attr]   
}
}
// get class(className)获取类名
// className指定的类名
//range是范围
function getClass(className,range){
	var range=range?range:document;
	if(range.getElementsByClassName){
		return range.getElementsByClassName(className);
	}else{
		var all=range.getElementsByTagName("*")
		var newARR=[];
		for(var i=0;i<all.length;i++){
			if(check(all[i].className,className)){
                 newARR.push(all[i])
			}
		}
             return newARR;
	}
}
//check检查函数
//arr是数组num是要检查相等的值
//目的是检查arr数组中arr[i]是否与num相等的值，如果有返回1；没有返回0
function check(arr,num){
	var arrc=arr.split(" ");
for(i=0;i<arrc.length;i++){
	if(arrc[i]==num){
		return true;
	}
}return false;

}
//copy是复制函数，先判断环境是ie或者w3c
//val是要复制进去的东西
//obj是要传入的对象的id名

function copy(obj,val){
	if(obj.textContent)
     {
          if(val==undefined){
               return obj.textContent
          	}else{
          	obj.textContent=val
     }
	}else{
		if(val==undefined){
               return obj.innerText
          	}else{
          	obj.innerText=val
          }
     }
}

/*getChilds获取某个对象的子元素
obj父元素
type true获取父元素里面的元素节点和有意义的文本
    false获取父元素的元素节点
*/
function getChilds(obj,type){
  var type=type?type:false
  var childs=obj.childNodes
  var temp=[];
  if(type===false){
  for(var i=0;i<childs.length;i++){
        if(childs[i].nodeType==1){
            temp.push(childs[i])
        }
 }}
else if(type===true){
  for(var i=0;i<childs.length;i++){
  if(childs[i].nodeType==1||(childs[i].nodeType==3&&!/^\s+$/.test(childs[i].nodeValue))){         
            temp.push(childs[i])          
        }  
}
}return temp
}



/*getFirst获取某个对象的第一个有意义的
obj父元素

*/
function getFirst(obj){
  return getChilds(obj,true)[0]
}

/*getLast获取某个对象的第一个有意义的
obj父元素

*/
function getLast(obj){
  return getChilds(obj,true)[getChilds(obj,true).length-1]
}

/*getNum获取某个对象的第一个有意义的
obj父元素
num是需要获取的对象的位置
*/
function getNum(obj,num){
  return getChilds(obj,true)[num]
}


/*after是将创建的地div属性添加到inner之后out是父元素

*/

function after(inner,div,out){
          var a=inner.parentNode
          getChilds(a)
         for(var i=0;i<a.length;i++){
         if(a[i]==inner){
        return i
         }
       }var after=getChilds(a)[i+1]
       out.insertBefore(div,after)
       }
/*getNext获取下一个有意义的
obj当前的元素
type  true 识别有意义的文本
      false 忽略文本
*/
function getNext(obj,type){
  var type=type?type:false
  var next=obj.nextSibling;
  if(type===false){
    if(!next){
      return false
    }
    while(next.nodeType==3||next.nodeType==8){
      next=next.nextSibling;
      if(!next){
      return false
    }
    }
  }
else if(type===true){
  if(!next){
      return false
    }
    while((next.nodeType==3&&/^\s+$/.test(next.nodeValue))||next.nodeType==8){
      next=next.nextSibling;
      if(!next){
      return false
    }
    }
}return next
}


/*insertAfter获取下一个有意义的
obj要插入的对象
next要插入的位置
type  true 识别有意义的文本
      false 忽略文本
*/

function insertAfter(obj,next,type){
  var type=type?type:false
  var pos=getNext(next,type)
  var parent=next.parentNode;
  if(!pos){
    parent.appendChild(obj)
  }else{
    parent.insertBefore(obj.pos)
  }

}





//allgain获取(#one,.one,div,<div>)样式
//selecter是获取的参数(#one,.one,div)
function allgain(selecter,ranges){
  var ranges=ranges?ranges:document;
	var first=selecter.charAt(0)
       if(first=="."){
       return getClass(selecter.substr(1))
       }else if(first=="#"){
       return ranges.getElementById(selecter.substr(1))
       }else if(/^[a-z][a-z1-6]{0,10}$/.test(selecter)){
       	return ranges.getElementsByTagName(selecter)
       }else if(/^<[a-z][a-z1-6]{0,10}>$/.test(selecter)){
        return document.createElement(selecter.slice(1,-1))
       }
}

// Seamless无缝轮播图函数
// win是banner上层div
// li小圆圈
// img图片
// btn按钮
// t时间间隔
// colorout轮播时其余圆点的颜色
// colorover轮播时当前圆点的颜色

function Seamless(win,li,img,btn,t,colorout,colorover){
var imgW=parseInt(getStyle(img[0],"width"))
var num=0;
var index=0
var flag=true
// flag修复btn点击过快时的bug
li[0].style.background=colorover
// 轮播图结束
for(var i=0;i<img.length;i++){
  if(i==0){
    continue
  }
  img[i].style.left=imgW+"px"
}

var T=setInterval(move,t);

win.onmouseover=function(){
  clearInterval(T)
}
win.onmouseout=function(){
  T=setInterval(move,t)
}
for(var i=0;i<li.length;i++)
{
  li[i].index=i;
  li[i].onclick=function(){
    if(index==this.index){
      return;
    }
     for(var i=0;i<img.length;i++){
     li[i].style.background=colorout
  }
  li[this.index].style.background=colorover
    img[this.index].style.left=imgW+"px"
     animate(img[index],{left:-imgW},t)
  animate(img[this.index],{left:0},t)
  index=num=this.index
  }
}
for(var i=0;i<btn.length;i++){
  if(i%2==0){
         
    btn[i].onclick=function(){
    moveL()
   }
  }else{
    btn[i].onclick=function(){
    moveR();
   }

  }
}
function moveL(){
if(!flag){
  return
}
flag=false;
  num--;
  if(num<0)
    {
      num=img.length-1;
    }
  img[num].style.left=-imgW+"px"
  animate(img[index],{left:imgW},t,function(){flag=true})
  animate(img[num],{left:0},t)
  for(var i=0;i<img.length;i++){
     li[i].style.background=colorout
  }
  li[num].style.background=colorover
  index=num
}



function moveR(){
if(!flag){
  return
}
flag=false;
  num++;
  if(num==img.length)
    {
      num=0;
    }
  img[num].style.left=imgW+"px"
  animate(img[index],{left:-imgW},t,function(){flag=true})
  animate(img[num],{left:0},t)
  for(var i=0;i<img.length;i++){
     li[i].style.background=colorout
  }
  li[num].style.background=colorover
  index=num
}



function move(){
if(!flag){
  return
}
flag=false;
  num++;
  if(num==img.length)
    {
      num=0;
    }
  img[num].style.left=imgW+"px"
  animate(img[index],{left:-imgW},t,function(){flag=true})
  animate(img[num],{left:0},t)
  for(var i=0;i<img.length;i++){
     li[i].style.background=colorout
  }
  li[num].style.background=colorover
  index=num
}


}

// carousel轮播图函数
// win是banner上层div
// li小圆圈
// img图片
// btn按钮
// t时间间隔
// t1是animate内的时间
// classover轮播时其余圆点的className
// classout轮播时当前圆点的className



function carousel(win,li,img,btn,t,t1,classover,classout){
var num=0;
 li[0].className=classover
 var T=setInterval(move,t)
win.onmouseover=function(){
    clearInterval(T)
}
win.onmouseout=function(){
    clearInterval(T)
    T=setInterval(move,t)
}
for(var i=0;i<img.length;i++){
    li[i].index=i;
li[i].onclick=function(){
    num=this.index
    for(var i=0;i<img.length;i++){
     animate(img[i],{opacity:0},t1);
    li[i].className=classout
}
    // img[this.index].style["z-index"]=10
       animate(img[this.index],{opacity:1},t1);
    li[this.index].className=classover
}
}

for(var i=0;i<btn.length;i++){
    btn[i].index=i;
btn[i].onclick=function(){
    if(this.index%2==0){
   moveL()
}else{
       move()
}
}
}

function moveL(){
num--;
if(num<0){
    num=img.length-1
}
for(var i=0;i<img.length;i++){
     animate(img[i],{opacity:0},t1);
    li[i].className=classout
}
 animate(img[num],{opacity:1},t1);
li[num].className=classover
}






function move(){
num++;
if(num==img.length){
    num=0
}
for(var i=0;i<img.length;i++){
     animate(img[i],{opacity:0},500);
    li[i].className=classout
}
 animate(img[num],{opacity:1},500);
li[num].className=classover
// console.log(getComputedStyle(li[num],null).className)
}
// 轮播图结束

}

// 轮播图结束