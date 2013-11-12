#pragma strict

//Objects
public var ball : GameObject;
public var d1 : GameObject;
public var d2 : GameObject;
public var d3 : GameObject;

public var runs : int;
public var progress : int;
public var wins1 : int;
public var losses1 : int;
public var wins2 : int;
public var losses2 : int;

private var runNum : int;
private var counter : int;
private var choice : int;
private var winner : int;
private var other : int;
//Switch or stay
private var style : boolean;


function Start () {
	runs = 1000;
	progress = 0;
	wins1 = 0;
	losses1 = 0;
	wins2 = 0;
	losses2 = 0;
	runNum = 0;
	counter = 0;
	style = true;
}

function Update () {
	if(counter == 40 && progress <= 2*runs){
		progress ++;
		style = !style;
		draw();
		//Chose the right door at the start
		choice = Random.Range(0, 3);
		winner = Random.Range(0, 3);
		if(choice != winner){
			other = winner;
		}
		else{
			for(var e : int = 0; e < 3; e ++){
				if(e != choice && e != winner){
					other = e;
					break;
				}
			}
		}
		if(choice == winner){
			if(style){
				losses2 ++;
			}
			else{
				wins1 ++;
			}
			runNum ++;
		}
		else{
			if(style){
				wins2 ++;
			}
			else{
				losses1 ++;
			}
		}
		reset();
		counter = 0;
	}
	if(counter < 40){
		if(counter == 30){
			for(e = 0; e < 3; e ++){
				if(style && e == other && e == 0){
					d1.transform.position.y = -10;
				}
				else if(style && e == other && e == 1){
					d2.transform.position.y = -10;
				}
				else if(style && e == other && e == 2){
					d3.transform.position.y = -10;
				}
				else if(!style && e == choice && e == 0){
					d1.transform.position.y = -10;
				}
				else if(!style && e == choice && e == 1){
					d2.transform.position.y = -10;
				}
				else if(!style && e == choice && e == 2){
					d3.transform.position.y = -10;
				}
			}
		}
		else if(counter == 20 && style){
			for(e = 0; e < 3; e ++){
				if(e == choice && e == 0){
					d1.renderer.material.color = Color.gray;
				}
				else if(e == choice && e == 1){
					d2.renderer.material.color = Color.gray;
				}
				else if(e == choice && e == 2){
					d3.renderer.material.color = Color.gray;
				}
				if(e == other && e == 0){
					d1.renderer.material.color = Color.red;
				}
				else if(e == other && e == 1){
					d2.renderer.material.color = Color.red;
				}
				else if(e == other && e == 2){
					d3.renderer.material.color = Color.red;
				}
			}
		} 
		else if(counter == 10){
			if(other == winner){
				for(e = 0; e < 3; e ++){
					if(e != winner && e != choice){
						if(e == 0){
							d1.transform.position.y = -10;
						}
						else if(e == 1){
							d2.transform.position.y = -10;
						}
						else if(e == 2){
							d3.transform.position.y = -10;
						}
					}
				}
			}
			else{
				if(other == 0){
					d1.transform.position.y = -10;
				}
				else if(other == 1){
					d2.transform.position.y = -10;
				}
				else if(other == 2){
					d3.transform.position.y = -10;
				}
				for(e = 0; e < 3; e ++){
					if(e != other && e != winner){
						other = e;
					}
				}
			}
		}
		counter ++;
	}
}

function draw(){
	if(losses1 == 0){
		guiText.text = "\nTactic 1: 0%";
	}
	else{
		guiText.text = "\nTactic 1: " + (100 * wins1 / (progress / 2 + 0.0)) + "%";
	}
	if(losses2 == 0){
		guiText.text += "\nTactic 2: 0%";
	}
	else{
		guiText.text += "\nTactic 2: " + (100 * wins2 / (progress / 2 + 0.0)) + "%";
	}
}

function reset(){
	d1.transform.position.y = 1;
	d2.transform.position.y = 1;
	d3.transform.position.y = 1;
	d1.renderer.material.color = Color.gray;
	d2.renderer.material.color = Color.gray;
	d3.renderer.material.color = Color.gray;
	for(var e : int = 0; e < 3; e ++){
		if(e == choice && e == 0){
			d1.renderer.material.color = Color.red;
		}
		else if(e == choice && e == 1){
			d2.renderer.material.color = Color.red;
		}
		else if(e == choice && e == 2){
			d3.renderer.material.color = Color.red;
		}
	}
	if(winner == 0){
		ball.transform.position.x = -19.2;
	}
	else if(winner == 1){
		ball.transform.position.x = 2.5;
	}
	else if(winner == 2){
		ball.transform.position.x = -19.2;
	}
}