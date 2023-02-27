import getData from "./api";

const tbody = document.querySelector("tbody");
getData()
.then((Response) => Response.json())
.then((data)=> {
  showProduct(data)

const productDelete = document.querySelectorAll(".btn-remove")
// console.log(productDelete) 
for(let btn of productDelete){
  const id = btn.dataset.id
// console.log("id ne" , id)
  btn.addEventListener("click" , ()=>{
      return removeProduct(id)

  })

}

const productEdit = document.querySelectorAll(".btn-edit") 
for(let btn of productEdit){
      btn.addEventListener("click" ,()=>{
        const id = btn.dataset.id
        return UpdateProduct(id);
        

      })

}


})

const showProduct = (data) =>{
tbody.innerHTML = data.map((product , index) =>{
  return `
  <tr class ="mx-auto">
            <td>${index + 1}</td>
            <td>${product.productName}</td>
            <td><img src="${product.image}" class="w-20" alt=""></td>
            <td><button class="text-red-500 btn-remove" data-id="${product.id}" >Remove</button>
            <button class="text-yellow-500 btn-edit"  data-id="${product.id}" >Edit</button>
            </td>
            
          </tr>
  `


}).join("")


}

const removeProduct = (id)=>{

  return fetch(`http://localhost:3000/products/${id}`, {
  method :"DELETE"

  })


}


const productAdd = ()=>{
  document.querySelector("body").innerHTML = /*html*/  `
  <form action="">
 
  <label for="" class ="bg-yellow-500 text-white font-bold">Name</label>
    <input type="text" id="productname" class="w-full border-2" >
    
    <label for="" class="bg-yellow-500 text-white font-bold ">Avatar</label>
    <input type="text"  id="avatar" class="w-full border-2">
    <button id="btn-submit">Thêm</button>


</form>
  
  `
const btnSM =document.querySelector("#btn-submit") 
const nameproduct =document.querySelector("#productname") 
const avatar =document.querySelector("#avatar") 

  btnSM.addEventListener("click" , ()=> 
  {
    
    const newProducts = {
      
      "productName": nameproduct.value,
      "image" : avatar.value
    }
    fetch("http://localhost:3000/products" , {
      method : "POST" ,
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(newProducts)
    })
  })
}

const btnADD = document.querySelector(".btn-add");
btnADD.addEventListener("click" , ()=>{
  productAdd();
})


const UpdateProduct = (id) =>{

  fetch(`http://localhost:3000/products/${id}`)
  .then((Response) => Response.json())
.then((data) =>{

  document.querySelector("body").innerHTML = /*html*/  `
  <form action="">
 
  <label for="" class ="bg-yellow-500 text-white font-bold">Name</label>
    <input type="text" id="productname" class="w-full border-2" value="${data.productName}" >
    
    <label for="" class="bg-yellow-500 text-white font-bold " >Avatar</label>
    <input type="text"  id="avatar" class="w-full border-2" value="${data.image}">
    <button id="btn-update">SUA</button>


</form>
  
  `
  const btnSM =document.querySelector("#btn-update") 
const nameproduct =document.querySelector("#productname") 
const avatar =document.querySelector("#avatar") 

  btnSM.addEventListener("click" , ()=> 
  {
    
    const newProducts = {
      
      "productName": nameproduct.value,
      "image" : avatar.value
    }
    fetch(`http://localhost:3000/products/${id}` , {
      method : "PUT" ,
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(newProducts)
    })
  })
  
  
  

})

} 