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
        basePotimonFromDataBase.types.map(x=>({id: x.type_id})),
        basePotimonFromDataBase.evolution[0] ? basePotimonFromDataBase.evolution[0].id : null,
        basePotimonFromDataBase.evolution[0] ? basePotimonFromDataBase.evolution[0].minimum_level : null,
        basePotimonFromDataBase.moves.map(x=>({skill: fetchSkill(x.id), requiredLevel: x.level})),
        basePotimonFromDataBase.captureRate[0].capture_rate,
        'description bidon',
        basePotimonFromDataBase.baseExperience[0].height,
    )
}