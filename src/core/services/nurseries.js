async function getNurseries() {
    return ([
        {   
            id: '3a77f0a4-b068-41cc-ad1d-6adc14607254',
            name: 'Питомник растений: Лесобор',
            type: { Flower: false, Shrub: false, Сoniferous: true, Deciduous: true, Fruit: true },
            image: 'https://img2.akspic.ru/previews/5/7/1/6/6/166175/166175-gubka_bob-multfilm-multik-bikini_bottom-nikelodeon-500x.jpg',
            adress: 'Чусовской тракт, Екатеринбург',
            description: 'Питомник "Ёлы-палы" специализируется на выращивании хвойных растений, декоративных деревьев и кустарников в контейнерах и открытом грунте.',
            coordinate: {
                latitude: 56.83946339851334,
                longitude: 60.60966348268215
            },
            delivery: {
                self: true,
                organization: true
            }
        }
    ])
}

async function getNurserieById(id) {
    return ([
        {   
            id: '3a77f0a4-b068-41cc-ad1d-6adc14607254',
            name: 'Питомник растений: Лесобор',
            type: { Flower: false, Shrub: false, Сoniferous: true, Deciduous: true, Fruit: true },
            image: 'https://img2.akspic.ru/previews/5/7/1/6/6/166175/166175-gubka_bob-multfilm-multik-bikini_bottom-nikelodeon-500x.jpg',
            adress: 'Чусовской тракт, Екатеринбург',
            description: 'Питомник "Ёлы-палы" специализируется на выращивании хвойных растений, декоративных деревьев и кустарников в контейнерах и открытом грунте.',
            coordinate: {
                latitude: 56.83946339851334,
                longitude: 60.60966348268215
            },
            delivery: {
                Delivery: true,
                Pickup: true
            },
            phone: '8 800 555 35 55',
            site: 'www.vk.com'
        }
    ].find(item => item.id == id))
}

export default {
    getNurseries,
    getNurserieById
}