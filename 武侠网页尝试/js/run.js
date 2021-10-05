var person = {
	name: '猫熊啊',
	xl: 90,
	hs: 10,
	sb: 80,
	yb: 70,
	tb: 20,
	vector: 0,
	way: "q",
	start: "off",
	hedge: 0.1,
}

// console.log($(".ability"));
checkability();
var enmery1;

$("#start").click(function() {
	if (person.start == "off") {
		person.start = "on";
	} else {
		return document.getElementById("zdqk").innerHTML += "&#10;请完成当前战斗";
	}
	enmery1 = new enemy(100, 0);
	var str = "遭遇" + enmery1.name + "对方剩余血量" + enmery1.xl + "  耗损为" + enmery1.hs + "&#10;手臂强度为" + enmery1.sb +
		"  腰部强度为" + enmery1.yb + "  腿部强度为" + enmery1.tb;
	document.getElementById("zdqk").innerHTML = str;
	// if (person.tb > enmery1.tb) {
	// 	document.getElementById("zdqk").innerHTML += "&#10;你的身法较高，请先发动攻击";
	// } else {
	// 	if (Math.random() < person.hedge) {
	// 		document.getElementById("zdqk").innerHTML += "&#10;" + enmery1.name + "发动攻击  你闪避了伤害  剩余血量为" +
	// 			person.xl;
	// 	} else {
	// 		var sh = attack(enmery1, person, randomactway());
	// 		person.xl -= sh;
	// 		document.getElementById("zdqk").innerHTML += "&#10;" + enmery1.name + "发动攻击  你受到伤害" + sh +
	// 			"  剩余血量为" +
	// 			person.xl;
	// 	}
	identifyvector(person, enmery1);
	// }
})
$(".add").click(function(e) {
	var name = e.target.id.replace('add', "");
	person[name]++;
	checkability();
});

$(".czbt").click(function(e) {
	if (person.start == "off") {
		return document.getElementById("zdqk").innerHTML += "&#10;请开始下一场战斗"
	}
	if (Math.random() < enmery1.hedge) {
		document.getElementById("zdqk").innerHTML += "&#10;你发动攻击  " + enmery1.name + "闪避了伤害  剩余血量为" +
			enmery1.xl;
		identifyvector(person, enmery1);
	} else {
		var sh = attack(person, enmery1, e.target.id);
		enmery1.xl = parseFloat(enmery1.xl - sh).toFixed(2);
		textact(person,enmery1, e.target.innerText,sh);
		
		// if (enmery1.xl > 0) {
		// 	document.getElementById("zdqk").innerHTML += "&#10;你选择" + e.target.innerText + "&#10;" + enmery1
		// 		.name +
		// 		"受到伤害" + sh + "  剩余血量为" + enmery1.xl;
		// 	identifyvector(person, enmery1);
		// } else {
		// 	document.getElementById("zdqk").innerHTML += "&#10;你选择" + e.target.innerText + "&#10;" + enmery1
		// 		.name +
		// 		"受到伤害" + sh + "  剩余血量为0" + "&#10;您获得了胜利！";
		// 	person.xl = 100;
		// 	person.start = "off";
		// }
	}
})

