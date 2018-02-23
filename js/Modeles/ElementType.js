class ElementType {
    constructor(id, name, listWeakness, listResistance) {
        this.id = id;
        this.name = name;
        this.listWeaknessId = listWeakness;
        this.listResistanceId = listResistance;
    }
}

AllElementType = [
    new ElementType(1, strTypeAcier, [2, 7, 15], [1, 3, 6, 8, 9, 10, 11, 12, 13, 14, 18]),
    new ElementType(2, strTypeCombat, [6, 13, 18], [9, 14, 16]),
    new ElementType(3, strTypeDragon, [3, 8], [4, 5, 7, 11]),
    new ElementType(4, strTypeEau, [5, 11], [1, 4, 7, 8]),
    new ElementType(5, strTypeElectrik, [15], [1, 5, 18]),
    new ElementType(6, strTypeFee, [1, 12], [2, 3, 9, 17]),
    new ElementType(7, strTypeFeu, [4, 14, 15], [1, 6, 7, 8, 9, 11]),
    new ElementType(8, strTypeGlace, [1, 2, 7, 14], [8]),
    new ElementType(9, strTypeInsecte, [7, 14, 18], [2, 11, 15]),
    new ElementType(10, strTypeNormal, [2], [16]),
    new ElementType(11, strTypePlante, [7, 8, 9, 12, 18], [4, 5, 11, 15]),
    new ElementType(12, strTypePoison, [13, 15], [2, 6, 9, 11, 12]),
    new ElementType(13, strTypePsy, [9, 16, 17], [2, 13]),
    new ElementType(14, strTypeRoche, [1, 2, 4, 11 , 15], [7, 10, 12, 18]),
    new ElementType(15, strTypeSol, [4, 8, 11], [5, 12, 14]),
    new ElementType(16, strTypeSpectre, [16, 17], [2, 9, 10, 12]),
    new ElementType(17, strTypeTenebre, [2, 6, 9], [13, 16, 17]),
    new ElementType(18, strTypeVol, [5, 8, 14], [2, 9, 11]),
];
