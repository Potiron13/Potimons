//(id, name, experienceDonnee, hp, attaque, defence, specialAttaque, specialDefence, speed, elementTypeId,
    //evolution, evolutionLevel, futureSkills, tauxDeCapture, description)

function mapBasePotimon(basePotimonFromDataBase){
    return new BasePotimon(
        basePotimonFromDataBase.baseExperience[0].id,
        basePotimonFromDataBase.baseExperience[0].identifier,
        basePotimonFromDataBase.baseExperience[0].base_experience,
        basePotimonFromDataBase.stats.find(x=>x.stat === 'hp').value,
        basePotimonFromDataBase.stats.find(x=>x.stat === 'attack').value,
        basePotimonFromDataBase.stats.find(x=>x.stat === 'defense').value,
        basePotimonFromDataBase.stats.find(x=>x.stat === 'special-attack').value,
        basePotimonFromDataBase.stats.find(x=>x.stat === 'special-defense').value,
        basePotimonFromDataBase.stats.find(x=>x.stat === 'speed').value,
        'toto',
        99,
        [],
        12,
        'salut',
    )
}