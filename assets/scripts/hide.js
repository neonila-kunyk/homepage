Array.from(document.querySelectorAll(".show-items")).forEach((element)=>{
    element.onclick = showItems;
})
Array.from(document.querySelectorAll(".hide-items")).forEach((element)=>{
    element.onclick = hideItems;
})

function showItems(event) {
    const el = event.currentTarget;
    console.log(el.parent);
    el.nextElementSibling.style.display = "block";
    el.style.display = "none";
    el.nextElementSibling.nextElementSibling.style.display = "block";
}

function hideItems(event) {
    const el = event.currentTarget;
    el.previousElementSibling.style.display = "none";
    el.previousElementSibling.previousElementSibling.style.display = "block";
    el.style.display = "none";
}