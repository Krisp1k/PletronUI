module.exports = (client) => {
	client.randomPletronReply = async () => {
		const replies = [
			{ rarity: 0.1, text: "Nerus, programuju, jsem programator." },
			{ rarity: 0.05, text: "Mel jsem sen, ze jednoho dne budou lide vynakladat stejnou energii a penize na skutecne cile. Ale jsem rad, ze jsem se spletl." },
			{ rarity: 0.2, text: "Ahoj" },
			{ rarity: 0.08, text: "Koupe kreditu ve hre je opravdu klicem k stastnemu a naplnenemu zivotu. Kdo potrebuje skutecne zazitky, ze?" },
			{ rarity: 0.1, text: "Tvoje mama" },
			{ rarity: 0.1, text: "Pokoslav smrdi" },
			{ rarity: 0.18, text: "Nevotravuj a bez si radsi koupit kredity" },
			{ rarity: 0.2, text: "Ty jsi ale trubka" },
			{ rarity: 0.1, text: "A Nejsi ty nahodou Enchanter?" },
			{ rarity: 0.15, text: "Takovou pohadku znam taky" },
			{ rarity: 0.05, text: "A nechces treba ban?" },
			{ rarity: 0.05, text: "Moje mentalni vada je vskutku vdecna za vas prispevek ke koupi dalsiho balicku virtualniho vzduchu." },
			{ rarity: 0.05, text: "Ano, to je pravda. Misto toho jsem radsi vytvoril virtualni svet, kde si muzete koupit imaginarni veci. Jsem takovy filantrop, ze ano?" },
			{ rarity: 0.1, text: "Nerus mě, pracuju na naproste hovadine které dam prehnane staty a pak vam ji prodam za litr" },
			{ rarity: 0.15, text: "Jeste chvili me otravuj a dam ti BAN!" },
			{ rarity: 0.28, text: "Zeptej se Werona" },
			{ rarity: 0.1, text: "Ty ulicniku" },
			{ rarity: 0.2, text: "Ted se mi nechce odpovidat, nemam cas" },
			{ rarity: 0.1, text: "Pracuju na Dark Elfovi, nerus" },
			{ rarity: 0.2, text: "????" },
			{ rarity: 0.1, text: "A nevis kdy Enchanter natoci dalsi video?" },
			{ rarity: 0.15, text: "Ty nezlob me a dam ti prava na redakcni sloupek" },
			{ rarity: 0.1, text: "Za tohle te abdiknu!!" },
			{ rarity: 0.12, text: "Chyba LPho? Kdepak!" },
			{ rarity: 0.2, text: "Vite, co ma spolecneho Pan Hradu s moji manzelkou? Na oboje seru." },
			{ rarity: 0.15, text: "Ty mas asi dost velky koule abys tohle rekl" },
			{ rarity: 0.3, text: "Nemuzu mluvit, dcera zakopla o server" },
			{ rarity: 0.07, text: "Promin, nemohu ti ted odpovidat, protoze jsem prilis zamestnan tym, jak zlepsit svet pomoci pixelovych hrdinu." },
			{ rarity: 0.1, text: "Mozna jsem mel byt spisovatel, protoze vymyslim uzasne pribehy o virtualnich princich a princeznach. Ale radeji prodavam kredity." },
			{ rarity: 0.15, text: "Vitej, chtel jsem te pozdravit slovem, ktere v dnesni dobe prevysuje vsechny emoji na svete: 'Ahoj'." },
			{ rarity: 0.1, text: "Kdo potrebuje skutecne zazitky ze zivota, kdyz si muze kupovat virtualni zbrane a hrdiny? Pan Hradu je klicem k naplnenemu zivotu, samozrejme." },
			{ rarity: 0.15, text: "Ach, tvoje mama. Ta je vseude, i v online hrach. Vecna legenda. Teda, az na Pana Hradu, tam by se na mapu nevesla." },
			{ rarity: 0.12, text: "Pokoslav smrdi? Ne, to je jenom jeho virtualni oder, ktery ma uzasno silu odradit nepritele." },
			{ rarity: 0.05, text: "Prosim, neotravuj me svymi problemi. Radsi si zajdi do obchodu a kup si spetku kreditu." },
			{ rarity: 0.2, text: "Jsi opravdu k nicemu, ale nemusis byt smutny, svet Pana Hradu je tu pro vsechny. Tedy, pokud mas penize, jinak muzes jit vis kam." },
			{ rarity: 0.05, text: "Mam rad pohadky. Ale vikas, co mam jeste rad? Kreditove balicky, ktere si muze kupit v online svete Pana Hradu." },
			{ rarity: 0.1, text: "Ban? To je takove prekvapeni, ktere obcas zpestri den. Mozna bych mel zacit sbirat bany jako sbiratelske karty." },
			{ rarity: 0.05, text: "Ach ty, jsi takovy mistr vyroby trubek." },
			{ rarity: 0.12, text: "Ver mi, zivot je mnohem plnejsi a stastnejsi, kdyz utraci penize za virtualni kredity misto za skutecne zazitky. Nebo ne?" },
			{ rarity: 0.1, text: "Jsem tak vytizeny programovanim, ze bych se mohl stat robotem misto clovekem." },
			{ rarity: 0.15, text: "Tak co, stale chces ban? Mozna bych mel tesit lidi jako ty." },
			{ rarity: 0.2, text: "Ty maly darebaku." },
			{ rarity: 0.1, text: "Za to muze Terms" },
			{ rarity: 0.3, text: "Za to muze Sae" },
			{ rarity: 0.1, text: "Za to muze Toru" },
			{ rarity: 0.08, text: "MÁM VÁS DOST! VOLÁM CASABLANKU!" },
			{ rarity: 0.3, text: "cus" },
			{ rarity: 0.15, text: ":angry:" },
			{ rarity: 0.3, text: "A jen dodam, ze takhle se pak siri zpravy ze LP lze" },
			{ rarity: 0.15, text: "Co po me chces?" },
			{ rarity: 0.2, text: "Tak s tim se neda nic delat." },
			{ rarity: 0.2, text: "csucus" },
			{ rarity: 0.2, text: "?" },
			{ rarity: 0.1, text: "Ted hlidam rocniho synka, jsem v jednom kole" },
			{ rarity: 0.15, text: "Nestiham" },
			{ rarity: 0.2, text: "Enchater uz mi zase vyhrozuje znicenim PH a využitím udajnych der." },
			{ rarity: 0.12, text: "asi jsem vážně mizerný programátor" },
			{ rarity: 0.2, text: "LP ZA TO NEMŮŽE -- ONDŘEJ NOVÁK CASABLANCA INT" },
			{ rarity: 0.08, text: "I TY V TOM JEDES!!! MAM TADY STOVKY LOGU!!" },
			{ rarity: 0.1, text: "Technik casablanky mi ukazal diablo, fajn hra je to" },
			{ rarity: 0.3, text: "Proč jseš doprdele tak křivej????" },
			{ rarity: 0.2, text: "Promin, volaji mi ted z casablanky" },
			{ rarity: 0.15, text: "ja ti nelzu" },
			{ rarity: 0.3, text: "Ty uličníku, že ty načítáš scripty?! Jo promiň, to je klanový popis!" },
			{ rarity: 0.1, text: "<:NmeckoNaTopu:1091837509765443644> <:NmeckoNaTopu:1091837509765443644> <:NmeckoNaTopu:1091837509765443644>" },
			{ rarity: 0.2, text: "Asi bys neměl kamarádům říkat, že ti platím." },
			{ rarity: 0.1, text: "Já už mám chybu... jsem idiot" },
			{ rarity: 0.15, text: "Ten můj algorytmus na arény je na hovno" },
			{ rarity: 0.3, text: ":smile:" },
			{ rarity: 0.15, text: "poko je na kluky" },
			{ rarity: 0.2, text: "Ok" },
			{ rarity: 0.1, text: "PH je PvP hra" },
			{ rarity: 0.2, text: "Neobtezuj, timhle se zabyva kriminalka a pravni zastupci" },
			{ rarity: 0.2, text: "..." },
			{ rarity: 0.2, text: "Provokujes me a beres mi cas!!!" },
			{ rarity: 0.2, text: "Jdu obědvat." },
			{ rarity: 0.12, text: "Já jsem si myslel, že jsi chytrý, ale ty jsi ještě větší idiot než já." },
			{ rarity: 0.2, text: "nevim" },
			{ rarity: 0.2, text: "asi jo" },
			{ rarity: 0.15, text: "Nechci tě zklamat, ale já jsem taky jenom člověk." },
			{ rarity: 0.1, text: "je mi to jedno" },
			{ rarity: 0.125, text: "https://c.tenor.com/0a_xdCNLGmMAAAAd/tenor.gif" },
			{ rarity: 0.125, text: "https://cdn.discordapp.com/attachments/1084272870244483122/1185943871461531719/409185517_7177670042264652_6804470949511447860_n.png?ex=6591734c&is=657efe4c&hm=a88129d20774f00a5c8e2252816d70debb95854114a276bbe66b6a320a45762a&" },
		];

		const totalRarity = replies.reduce((sum, reply) => sum + reply.rarity, 0);
		const randomChance = Math.random() * totalRarity;
		let currentRarity = 0;

		for (const reply of replies) {
			currentRarity += reply.rarity;
			if (randomChance <= currentRarity) {
				await client.log("LP RNG REPLY", '"' + reply.text + '"', "PLETRON");
				return reply.text;
			}
		}
	};
};
