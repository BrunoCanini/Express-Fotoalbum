const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient;

async function index(req, res){

    const data = await prisma.user.findMany({
        select: {
            name: true,
            email: true
        }
    })

    return res.json(data)

}

async function store(req, res){

    const datiIngresso = req.body;

    const newUser = await prisma.user.create({

        data:{
            name: datiIngresso.title,
            surname: datiIngresso.description,
            email: datiIngresso.image,
            password: datiIngresso.visible,
        }

    })

    return res.json(newUser)
    
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