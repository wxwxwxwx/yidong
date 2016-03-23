window.onload=function(){
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
}