// Object Literal
let dog = {
    name: "Tatsu",
    age: 3,
};

let cat = {
    name: "Tatsu",
    age: 3,
};

console.log(dog);


// object constuctor

function Pet(name, age, color) {
    this.name = name;
    this.age = age;
    this.color = color;
}

let lion = new Pet("Alex", 8, "Yellow");
let zebra = new Pet("Amber", 12, "Black/White");
console.log(lion);


console.log(zebra);

// Class

class Animal {
    //exec auto when a new object is created
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    doSomething() {
        console.log("I'm doing it")
    }
}

let wildcat = new Animal("will", 3);
console.log(wildcat);