const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient;

async function index(req, res){

    const data = await prisma.photo.findMany({
        include: {
            categories: {
                select: {
                    name: true,
                }
            }
        }
    })

    return res.json(data)

}

async function show(req, res){

    const {id} = req.params

    const data = await prisma.photo.findUnique({
        where: {
            id: parseInt(id),
        },
    })

    if(!data){
        res.status(404).send("photo non trovata");
    }

    return res.json(data)
    
}

async function store(req, res){

    const datiIngresso = req.body;

    const newPhoto = await prisma.photo.create({

        data:{
            title: datiIngresso.title,
            description: datiIngresso.description,
            image: datiIngresso.image,
            visible: datiIngresso.visible,
            categories: {
                connect: datiIngresso.category.map(idCategory => ({id: idCategory}))
            }
        },
        include: {
            categories: {
                select: {
                    name: true,
                }
            }
        }

    })

    return res.json(newPhoto)
    
}

async function update(req, res){

    const {id} = req.params;
    const datiIngresso = req.body;

    const photoAggiornata = await prisma.photo.update({

        data: datiIngresso,
        where: {
            id: parseInt(id)
        }
    })

    return res.json(photoAggiornata)

    
}

async function destroy(req, res){

    await prisma.photo.delete({
        where:{
            id: parseInt(req.params.id)
        },
    });

    return res.json("photo eliminata")
    
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
} 