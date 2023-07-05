class ProductManager {
    constructor(){
        this.products=[]
    }

    getProducts=()=>{
        return this.products
    }

    generatorId=()=>{
        const counter=this.products.length
        if(counter===0)
        {
            return 1
        }

        else{
            return (this.products[counter-1].id)+1
        }
    }

    addProduct=(title,description,price,thumbnail,code,stock)=>{
    const id=this.generatorId()
    if(!title || !description || !price || !thumbnail || !code || !stock){
        console.error("Ingrese los datos del producto")
        return
    }

    const existingProduct = this.products.find(item => item.code === code);
    if (existingProduct) {
     console.error("codigo existente");
     return 
    } else {
      
     this.products.push({
       id,
       title,
       description,
       price,
       thumbnail,
       code,
       stock
     });

    }

}
    
 getProductById=(id)=>{
 const product=this.getProducts().find(item=>item.id===id)
 if (!product){
    console.error("Not found")
    return;
}
 else {
 return product
}

}

}

const productManager= new ProductManager()
productManager.addProduct("product1", "description 1",1, "url","abc1",100)
productManager.addProduct("product2", "description 2",2, "url","abc2",200)
productManager.addProduct("product3", "description 3",3, "url","abc3",300)
productManager.addProduct("product4", "description 4",4, "url","abc4",400)


console.log(productManager.getProducts())
console.log("producto por id")
console.log(productManager.getProductById(5))
