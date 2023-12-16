const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient;

async function index(req, res){

    const data = await prisma.category.findMany()

    return res.json(data)

}

async function store(req, res){

    const datiIngresso = req.body;

    const newCategories = await prisma.category.create({

        data:{
            name: datiIngresso.name
        }

    })

    return res.json(newCategories)
    
}



module.exports = {
    store,
    index
} 