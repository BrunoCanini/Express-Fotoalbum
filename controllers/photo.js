const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient;
const {validationResult, matchedData} = require("express-validator");


async function index(req, res){

    // console.log(req.query)

    const visible = (req.query.visible ?? "true") === "true"

    const data = await prisma.photo.findMany({
        where:{
            visible
        },
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
        include: {
            categories: {
                select: {
                    name: true,
                }
            }
        }
    })

    if(!data){
        res.status(404).send("photo non trovata");
    }

    return res.json(data)
    
}

async function store(req, res){

    const validation = validationResult(req);

    if(!validation.isEmpty()){
        return res.status(422).json(validation.array())
    }

    const datiIngresso = matchedData(req);
    // const datiIngresso = req.body;

    const newPhoto = await prisma.photo.create({

        data:{
            title: datiIngresso.title,
            description: datiIngresso.description,
            image: datiIngresso.image,
            visible: datiIngresso.visible,
            categories: {
                connect: datiIngresso.categories.map(idCategory => ({id: idCategory}))
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

    const validation = validationResult(req);

    if(!validation.isEmpty()){
        return res.status(422).json(validation.array())
    }

    const datiIngresso = matchedData(req);

    // const datiIngresso = req.body;

    const photoAggiornata = await prisma.photo.update({

        // data: datiIngresso,
        data:{
            title: datiIngresso.title,
            description: datiIngresso.description,
            image: datiIngresso.image,
            visible: datiIngresso.visible,
            categories: {
                set: datiIngresso.categories.map(idCategory => ({id: idCategory}))
            }
        },
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