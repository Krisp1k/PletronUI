
module.exports = (client) => {
    client.randomPletronReply = async () => {

        const replies = [
            "Nerus, programuju, jsem programator.",
            "Mel jsem sen, ze jednoho dne budou lide vynakladat stejnou energii a penize na skutecne cile. Ale jsem rad, ze jsem se spletl.",
            "Ahoj",
            "Koupe kreditu ve hre je opravdu klicem k stastnemu a naplnenemu zivotu. Kdo potrebuje skutecne zazitky, ze?",
            "Tvoje mama",
            "Pokoslav smrdi",
            "Nevotravuj a bez si radsi koupit kredity",
            "Ty jsi ale trubka",
            "A Nejsi ty nahodou Enchanter?",
            "Takovou pohadku znam taky",
            "A nechces treba ban?",
            "Moje mentalni vada je vskutku vdecna za vas prispevek ke koupi dalsiho balicku virtualniho vzduchu.",
            "Ano, to je pravda. Misto toho jsem radsi vytvoril virtualni svet, kde si muzete koupit imaginarni veci. Jsem takovy filantrop, ze ano?",
            "Nerus mě, pracuju na naproste hovadine které dam prehnane staty a pak vam ji prodam za litr",
            "Jeste chvili me otravuj a dam ti BAN!",
            "Zeptej se Werona",
            "Ty ulicniku",
            "Ted se mi nechce odpovidat, nemam cas",
            "Pracuju na Dark Elfovi, nerus",
            "????",
            "A nevis kdy Enchanter natoci dalsi video?",
            "Ty nezlob me a dam ti prava na redakcni sloupek",
            "Za tohle te abdiknu!!",
            "Chyba LPho? Kdepak!",
            "Vite, co ma spolecneho Pan Hradu s moji manzelkou? Na oboje seru.",
            "Ty mas asi dost velky koule abys tohle rekl",
            "Nemuzu mluvit, dcera zakopla o server",
            "Promin, nemohu ti ted odpovidat, protoze jsem prilis zamestnan tym, jak zlepsit svet pomoci pixelovych hrdinu.",
            "Mozna jsem mel byt spisovatel, protoze vymyslim uzasne pribehy o virtualnich princich a princeznach. Ale radeji prodavam kredity.",
            "Vitej, chtel jsem te pozdravit slovem, ktere v dnesni dobe prevysuje vsechny emoji na svete: 'Ahoj'.",
            "Kdo potrebuje skutecne zazitky ze zivota, kdyz si muze kupovat virtualni zbrane a hrdiny? Pan Hradu je klicem k naplnenemu zivotu, samozrejme.",
            "Ach, tvoje mama. Ta je vseude, i v online hrach. Vecna legenda. Teda, az na Pana Hradu, tam by se na mapu nevesla.",
            "Pokoslav smrdi? Ne, to je jenom jeho virtualni oder, ktery ma uzasno silu odradit nepritele.",
            "Prosim, neotravuj me svymi problemi. Radsi si zajdi do obchodu a kup si spetku kreditu.",
            "Jsi opravdu k nicemu, ale nemusis byt smutny, svet Pana Hradu je tu pro vsechny. Tedy, pokud mas penize, jinak muzes jit vis kam.",
            "Mam rad pohadky. Ale vikas, co mam jeste rad? Kreditove balicky, ktere si muze kupit v online svete Pana Hradu.",
            "Ban? To je takove prekvapeni, ktere obcas zpestri den. Mozna bych mel zacit sbirat bany jako sbiratelske karty.",
            "Ach ty, jsi takovy mistr vyroby trubek.",
            "Ver mi, zivot je mnohem plnejsi a stastnejsi, kdyz utraci penize za virtualni kredity misto za skutecne zazitky. Nebo ne?",
            "Jsem tak vytizeny programovanim, ze bych se mohl stat robotem misto clovekem.",
            "Tak co, stale chces ban? Mozna bych mel tesit lidi jako ty.",
            "Ty maly darebaku.",
            "Za to muze Terms",
            "Za to muze Sae",
            "Za to muze Toru"
        ];

        
        const randomReply = replies[Math.floor(Math.random() * replies.length)]
        console.log("LP odpověď : " + randomReply)
        return randomReply;
    }
}