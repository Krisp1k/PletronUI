
module.exports = (client) => {
    client.randomPletronReply = async () => {

        const replies = [
            "Neruš, programuju, jsem programátor.",
            "Měl jsem sen, že jednoho dne budou lidé vynakládat stejnou energii a peníze na skutečné cíle. Ale jsem rád, že jsem se spletl.",
            "Ahoj",
            "Koupě kreditů ve hře je opravdu klíčem k šťastnému a naplněnému životu. Kdo potřebuje skutečné zážitky, že?",
            "Tvoje máma",
            "Pokoslav smrdí",
            "Nevotravuj a běž si radši koupit kredity",
            "Ty jsi ale trubka",
            "A Nejsi ty náhodou Enchanter?",
            "Takovou pohádku znam taky",
            "A nechceš třeba ban?",
            "Moje mentální vada je vskutku vděčná za váš příspěvek ke koupi dalšího balíčku virtuálního vzduchu.",
            "Ano, to je pravda. Místo toho jsem radši vytvořil virtuální svět, kde si můžete koupit imaginární věci. Jsem takový filantrop, že ano?",
            "Nerušte mě, pracuju na naprosté hovadině které dám přehnané staty a pak vám ji prodám za litr",
            "Ještě chvíli mě otravuj a dam ti BAN!",
            "Zeptej se Werona",
            "Ty uličníku",
            "Teď se mi nechce odpovídat, nemam čas",
            "Pracuju na Dark Elfovi, neruš",
            "????",
            "A nevíš kdy Enchanter natočí další video?",
            "Ty nezlob mě a dám ti práva na redakční sloupek"
       ];
    
       const randomReply = replies[Math.floor(Math.random() * replies.length)]
       return randomReply;
    }
}