## 单例模式

#### 定义

保证一个类仅有一个实例,并提供访问此实例的全局访问点.

#### 用途

如果一个类负责连接数据库线程池,日志记录逻辑等,此时需要单例模式来**保证对象不被重复创建以达到降低开销的目的**.

#### 代码实现

* "惰性单例": 仅在用户需要时才会创建对象实例

```javascript
const Singleton = function() {};

Singleton.getInstance = (function() {
  // 由于es6没有静态类型,故闭包: 函数外部无法访问 instance
  let instance = null;
  return function() {
    // 检查是否存在实例
    if (!instance) {
      instance = new Singleton();
    }
    return instance;
  };
})();

let s1 = Singleton.getInstance();
let s2 = Singleton.getInstance();

console.log(s1 === s2);
```

## 工厂模式

#### 定义

定义一个创建对象的接口,但让实现这个接口的类来决定实例化哪个类.工厂方法让类的实例化推迟到子类中进行.

将`new`对象的操作包裹一层,对外提供一个可以根据不同参数创建不同对象的函数.

#### 优缺点

隐藏原始类,方便代码迁移,调用者只需记住类的代名词;

多层封装,导致类数码过多,系统复杂度增加

#### 代码实现

```javascript
/**
 * 实体类：Dog、Cat
 */
class Dog {
  run() {
    console.log("狗");
  }
}
class Cat {
  run() {
    console.log("猫");
  }
}
/**
 * 工厂类：Animal
 */
class Animal {
  constructor(name) {
    name = name.toLocaleLowerCase();
    switch (name) {
      case "dog":
        return new Dog();
      case "cat":
        return new Cat();
      default:
        throw TypeError("class name wrong");
    }
  }
}
/**
 * 以下是测试代码
 */
const cat = new Animal("cat");
cat.run();
const dog = new Animal("dog");
dog.run();
```

## 抽象工厂模式

#### 定义

围绕一个超级工厂类,创建其他工厂类,再围绕工厂类,创建实体类

#### 代码

```javascript
// 实体类
class Dog {
  run() {
    console.log("狗");
  }
}
class Cat {
  run() {
    console.log("猫");
  }
}
class Male {
  run() {
    console.log("男性");
  }
}
class Female {
  run() {
    console.log("女性");
  }
}
// 抽象工厂类
class AbstractFactory {
  getPerson() {
    throw new Error("子类请实现接口");
  }
  getAnimal() {
    throw new Error("子类请实现接口");
  }
}
// person animal工厂类
class PersonFactory extends AbstractFactory {
  getPerson(person) {
    person = person.toLocaleLowerCase();
    switch (person) {
      case "male":
        return new Male();
      case "female":
        return new Female();
      default:
        break;
    }
  }
  getAnimal() {
    return null;
  }
}
class AnimalFactory extends AbstractFactory {
  getPerson() {
    return null;
  }
  getAnimal(animal) {
    animal = animal.toLocaleLowerCase();
    switch (animal) {
      case "cat":
        return new Cat();
      case "dog":
        return new Dog();
      default:
        break;
    }
  }
}
// 超级工厂类
class Factory {
  constructor(choice) {
    choice = choice.toLocaleLowerCase();
    switch (choice) {
      case "person":
        return new PersonFactory();
      case "animal":
        return new AnimalFactory();
      default:
        break;
    }
  }
}
// 创建person工厂
const personFactory = new Factory("person");
// 从person工厂中创建 male 和 female 实体
const male = personFactory.getPerson("male"),
  female = personFactory.getPerson("female");
// 输出测试
male.run();
female.run();

// 创建animal工厂
const animalFactory = new Factory("animal");
// 从animal工厂中创建 dog 和 cat 实体
const dog = animalFactory.getAnimal("dog"),
  cat = animalFactory.getAnimal("cat");
// 输出测试
dog.run();
cat.run();
```

