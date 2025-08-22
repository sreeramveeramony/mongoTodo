var btn=document.getElementById("btn");
btn.onclick=async()=>{
    let ipbox=document.getElementById("inputbox");
    let task=ipbox.value;
    await fetch("/task",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({text:task})
        }
    );
    loadTask();
}
async function loadTask(){
    
    let res=await fetch("/task");
    let tasks=await res.json();
    let ul=document.getElementById("list");
    ul.innerHTML="";
    
    tasks.forEach(task => {
        
        let list=document.createElement("li");
        let del=document.createElement("button");
        del.textContent="Delete";
        
        list.textContent=task.text;
        list.appendChild(del)
        ul.appendChild(list);
        del.onclick=()=>{
            fetch(`/task/${task._id}`,{method:"DELETE",});
            loadTask();
        }
        })

        
};
loadTask();