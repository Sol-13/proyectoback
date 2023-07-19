import fs from "fs"

export default class ProductManager{
    constructor(path){
        this.path=path,
        this.products=[
      ]
    }

//Lectura de producto
getProducts=async()=>{   
    const productList= await fs.promises.readFile(this.path,"utf-8")
    const productListParse=JSON.parse(productList)
    return productListParse
}

//Generador de ID
generatedId=async()=>{
    const counter=this.products.length
    if (counter===0){
        return 1
    }
    else{
        return (this.products[counter-1].id)+1
    }
}

//Crear-agregar producto
addProduct=async(title, description,price,thumbnail,code,stock)=>{
if (!title || !description|| !price || !thumbnail || !code || !stock){
console.error("Ingresar datos del producto")
return
}
else{
    const code2=this.products.find(elemento=>elemento.code===code)
    if(code2){
        console.error("El codigo del producto es repetido")
        return
    }
    else {
        const id=await this.generatedId()
        const productNew={
            id, title, description,price,thumbnail,code,stock

        }
        this.products.push(productNew)
        await fs.promises.writeFile(this.path,JSON.stringify(this.products,null,2))
    
}
}
}


     //Actualizacion
     updateProduct=async(id,title,description,price,thumbnail,code,stock)=>{
        if(!id|| !title || !description || !price || !thumbnail|| !code||!stock){
          console.error("Ingresar datos para actualizar productos")
          return 
        }
        else{
            const allProducts=await this.getProducts()
            const code2=allProducts.find(elemento=>elemento.code===code)
            if(code2){
                 console.error("Codigo de actualizacion de producto, repetido")
                 return
            }
            else{
                const currentProductsList=await this.getProducts()
                const newProductsList=currentProductsList.map(elemento=>{
                    if(elemento.id===id){
                      const updatedProduct={
                        ...elemento,
                        title,description,price,thumbnail,code,stock
                      }
                      return updatedProduct
                    }
                    else{
                        return elemento
                    }
                })
                await fs.promises.writeFile(this.path,JSON.stringify(newProductsList,null,2))
            }
            
        }
      }







//Eliminar
      deleteProduct=async(id)=>{
        const allProducts=await this.getProducts()
        const productsWithoutFound=allProducts.filter(elemento=>elemento.id!==id)
       await fs.promises.writeFile(this.path,JSON.stringify(productsWithoutFound,null,2))
      }
    getProductById=async(id)=>{
        const allProducts=await this.getProducts()
       const found=allProducts.find(element=>element.id===id)
       return found
    }



}

/*async function generator(){

const productManager=new ProductManager("./files/products.json");
const solo=  await productManager.getProductById(1)
console.log(solo)
}

generator()*/
