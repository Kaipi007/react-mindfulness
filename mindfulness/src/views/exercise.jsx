const hobbies = ["reading", "coding", "gaming"];

for (let key in hobbies){
    console.log("${index} : ${key}");
}


for (let key of hobbies){
    console.log("${key}");
}