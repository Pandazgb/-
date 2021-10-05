function randomnumber(max, min) {
	return parseInt(Math.random() * (max - min) + min);
}

function randomname() {
	var lastname = ["赵", "钱", "孙", "李", "上官", "周", "武", "郑", "王", "张"];
	var firstname = ["熊", "胆", "四", "龙", "宇", "荣", "凯", "五", "堂", "祥"];

	return lastname[randomnumber(10, 0)] + firstname[randomnumber(10, 0)];
}


function checkability() {
	var rep = $(".ability");
	for (var i = 0; i < rep.length; i++) {
		rep[i].value = person[rep[i].id];
	}
}


function enemy(max, min) {
	if (!(this instanceof enemy)) {
		return new enemy();
	}

	this.name = randomname();
	this.xl = 100;
	this.hs = randomnumber(max, min);
	this.sb = randomnumber(max, min);
	this.yb = randomnumber(max, min);
	this.tb = randomnumber(max, min);
	this.way = "q";
	this.vector = 0;
	this.hedge = 0.1;
}

function calculatenumber(type, one, actway) {
	// type中 0是攻击，1是防御
	// actway攻击时武器类型q拳法，t腿法，wq武器
	if (type == 0) {
		switch (one.way) {
			case "q":
				var num = one.sb * 0.4 + one.yb * 0.3 + one.tb * 0.3;
				return num;

			case "t":
				var num = one.sb * 0.2 + one.yb * 0.3 + one.tb * 0.5;
				return num;

			case "wq":
				var num = one.sb * 0.34 + one.yb * 0.33 + one.tb * 0.33;
				return num;

			default:
				return console.error("请检查输入攻击类型");
		}
	}
	// way防御时根据攻击部位计算h上部，m中部，l下部
	if (type == 1) {
		// console.log(one.tb);
		// console.log(actway);
		switch (actway) {
			case "h":
				var num = one.sb * 0.3 + one.yb * 0.2 + one.tb * 0.1;
				return num;
			case "m":
				var num = one.sb * 0.01 + one.yb * 0.3 + one.tb * 0.2;
				return num;
			case "l":
				var num = one.sb * 0.01 + one.yb * 0.2 + one.tb * 0.3;
				return num;
			default:
				return console.error("请检查输入防御部位");
		}
	}
	return console.error("type值出错")

}

function attack(A, B, actway) {
	if (actway == "v") {
		A.vector += A.tb * 0.24;
		return 0;
	} else {
		var act = calculatenumber(0, A, );
		var def = calculatenumber(1, B, actway);
		if (act > def) {
			return parseFloat(act - def).toFixed(2);
		} else {
			return 0;
		}
	}

}

function randomactway() {
	var randomactway = ["h", "m", "l", "v"];
	return randomactway[randomnumber(3, 0)];
}

function actvector(A, B) {
	var av = A.tb * 0.24;
	var bv = B.tb * 0.24;
	for (i = 1; i < 10; i++) {
		var lastA = A.vector + av * i;
		var lastB = B.vector + bv * i;
		if (lastA > lastB) {
			if (lastA >= 10) {
				A.vector -= 10;
			}
			if (lastB >= 10) {
				B.vector -= 10;
			} else {
				B.vector -= lastB;
			}
			return A.name;
		}
		if (lastA < lastB) {
			if (lastB >= 10) {
				B.vector -= 10;
			}
			if (lastA >= 10) {
				A.vector -= 10;
			} else {
				A.vector -= lastB;
			}
			return B.name;
		}
		if (lastA = lastB) {
			return "both";

		}

	}
}

function textact(person, enmery1, select, sh) {
	if (enmery1.xl > 0) {
		document.getElementById("zdqk").innerHTML += "&#10;你选择" + select + "&#10;" + enmery1
			.name +
			"受到伤害" + sh + "  剩余血量为" + enmery1.xl;
		identifyvector(person, enmery1);
		return 0;
	} else {
		document.getElementById("zdqk").innerHTML += "&#10;你选择" + select + "&#10;" + enmery1
			.name +
			"受到伤害" + sh + "  剩余血量为0" + "&#10;您获得了胜利！";
		person.xl = 100;
		person.start = "off";
		return 1;
	}
}


function identifyvector(person, enmery1) {
	var result = actvector(person, enmery1);
	if (result == person.name) {
		// console.log("是我");
		document.getElementById("zdqk").innerHTML += "&#10;请你发动攻击";
	}
	if (result == enmery1.name) {
		do {
			if (Math.random() < person.hedge) {
				document.getElementById("zdqk").innerHTML += "&#10;" + enmery1.name + "发动攻击  你闪避了伤害  剩余血量为" +
					person.xl;
				str = actvector(person, enmery1);
			} else {
				var sh = attack(enmery1, person, randomactway());
				var str;
				person.xl = parseFloat(person.xl - sh).toFixed(2);
				if (person.xl > 0) {
					document.getElementById("zdqk").innerHTML += "&#10;" + enmery1.name + "发动攻击，你受到伤害" + sh +
						"  剩余血量为" +
						person
						.xl;
					str = actvector(person, enmery1);
				} else {
					document.getElementById("zdqk").innerHTML += "&#10;" + enmery1.name + "发动攻击，你受到伤害" + sh +
						"  剩余血量为0" +
						"&#10;您被击败";
					person.xl = 100;
					person.start = "off"
					return;
				}
			}

		} while (str == person.name);
		// console.log("是我");
		document.getElementById("zdqk").innerHTML += "&#10;请你发动攻击";
	}
	if (result == "both") {
		var sh = attack(enmery1, person, randomactway());
		person.xl = parseFloat(person.xl - sh).toFixed(2);
		if (person.xl > 0) {
			document.getElementById("zdqk").innerHTML += "&#10;" + enmery1.name + "发动攻击，你受到伤害" + sh + "  剩余血量为" +
				person
				.xl + "&#10;请你发动攻击";

		} else {
			document.getElementById("zdqk").innerHTML += "&#10;" + enmery1.name + "发动攻击，你受到伤害" + sh + "  剩余血量为0" +
				"&#10;您被击败!";
			person.xl = 100;
			person.start = "off"
			return;
		}
	}
}
