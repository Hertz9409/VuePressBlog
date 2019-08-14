# 正则表达式(Regular Expressions)学习笔记

*文章参考来源:[掘金|JsTheGreat](https://juejin.im/post/5bda4e6fe51d45681f245274) , [ECMAScript6入门--阮一峰](http://es6.ruanyifeng.com/#docs/regex)* , [百度百科](https://baike.baidu.com/item/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)

*推荐资源：[正则表达式大全](http://tool.oschina.net/uploads/apidocs/jquery/regexp.html) , [好用的正则表达式分析工具1](https://jex.im/regulex/) , [好用的正则表达式分析工具2](https://regexper.com/) , [ASCII对照表](http://tool.oschina.net/commons?type=4)*

正则表达式三个特点: 提取文本, 强大, 难记

正则表达式的应用: 数据验证;复杂字符串搜索替换;基于模式匹配从字符串中提取子字符串.

## 一、语法

### 1.检索普通字符

```javascript
'hello 😀 regexp'.match(/😀/);
// ["😀", index: 6, input: "hello 😀 regexp", groups: undefined]
```

### 2.开始与结束

**^** 字符(脱字符),在正则中属于元字符,表示文本的开始,即如果它是正则主体的第一个符号,那么紧跟它的字符必须是被匹配文本的第一个字符.

``` javascript
'regexp'.match(/^r/);
// ["r", index: 0, input: "regexp", groups: undefined]
```

``` javascript
'regexp'.match(/a^r/);
// null
```

注意点: 

* 作为匹配文本开始元字符的时候必须是正则主体的第一个符号,否则正则无效
* 它匹配的是一个位置,不是具体的文本
* 在其他规则中存在另外的含义

**$**字符与**^**正好相反,它代表文本的结束,必须是正则主体的最后一个符号.

```javascript
'regexp'.match(/p$/);
// ["p", index: 5, input: "regexp", groups: undefined]
```

### 3.转义

正则中存在很多元字符,这些元字符本身也是字符,如果我们想要匹配他们本身时,就需要使用转义**\\**

```javascript
'price: $3.6'.match(/\$[0-9]+\.[0-9]+$/);
// ["$3.6", index: 7, input: "price: $3.6", groups: undefined]
```

**\\**本身也是元字符,它后面跟随其他元字符就可以还原那个元字符本来的含义

当**\\** **\\** 时,表示转义**\\**本身,当出现三个时,我们可以把它们分成两段去理解,以此类推

当普通字符前跟**\\**时,还是普通字符

### 4.带反斜杠的元字符

一般来说,普通字符前加反斜杠还是普通字符,但是有些普通字符,添加反斜杠后会变成元字符

| 元字符 | 含义                                   |
| ------ | -------------------------------------- |
| \b     | 匹配一个单词边界                       |
| \B     | 匹配一个非单词边界                     |
| \d     | 匹配一个数字字符                       |
| \D     | 匹配一个非数字字符                     |
| \s     | 匹配一个空白字符                       |
| \S     | 匹配一个非空白字符                     |
| \w     | 匹配一个字母或者一个数字或者一个下划线 |
| \W     | 匹配一个字母、数字和下划线之外的字符   |

大写代表反义

* **\b元字符**

  **\b**匹配的也是单个位置,而不是字符.单词和空格之间的位置,就是单词边界,单词边界对中文等其他语言是无效的.

```javascript
  'hello regexp'.match(/\bregexp$/);
  // ["regexp", index: 6, input: "hello regexp", groups: undefined]
  'hello regexp'.match(/\Bregexp$/);
  // null
```

```javascript
  'jiangshuying huge liuhuaqiang'.match(/\bhuge\b/);
  // ["huge", index: 13, input: "jiangshuying huge liuhuaqiang", groups: undefined]
  '江疏影 胡歌 刘华强'.match(/\b胡歌\b/);
  // null
```

* **\d元字符**

  **\d**匹配单个数字

```javascript
  '123'.match(/\d/);
  // ["1", index: 0, input: "123", groups: undefined]
```

* **\s元字符**

  **\s**匹配单个空白字符,包括 **空格\f(换页)\n(换行)\r(回车)\t(制表字符)\v(垂直制表符)** ,如果不需要区分空格和换行,可以直接使用**\s**

```javascript
  'a b'.match(/\w\s\w/);
  // ["a b", index: 0, input: "a b", groups: undefined]
  'a b'.match(/\w\f\w/);
  // null
  'a b'.match(/\w\n\w/);
  // null
  'a b'.match(/\w\r\w/);
  // null
  'a b'.match(/\w\t\w/);
  // null
  'a b'.match(/\w\v\w/);
  // null
  'a b'.match(/\w \w/);
  // ["a b", index: 0, input: "a b", groups: undefined]
```

* **\w元字符**

  **\w**匹配单个字母数字下划线

```javascript
  '正则'.match(/\w/);
  // null
```

### 5."."字符

匹配除换行符之外的任意单个字符

```javascript
'@regexp'.match(/./);
// ["@", index: 0, input: "@regexp", groups: undefined]
```

### 6.量词

上面介绍了很多元字符,都只能匹配单个字符,当我们要匹配多个时,该怎么办呢?

| 量词  | 含义                                 |
| ----- | ------------------------------------ |
| ?     | 重复0次或一次                        |
| +     | 重复一次或者多此,至少一次            |
| *     | 重复0次或多此,即任意次               |
| {n}   | 重复n次                              |
| {n,}  | 重复n次或者更多次                    |
| {n,m} | 重复n次到m次之间的次数，包含n次和m次 |

说明: 

* **?**在诸如匹配http协议时很有用,如**/http(s)?/**
* 使用**/.*/**匹配对我们没有用的文本,表示**若干除换行符之外的字符**
* **{n,m}**之间不能有空格,空格在正则中是有含义的

***量词重复紧贴在它前面的某个集合***

```javascript
'gooooogle'.match(/go{2,5}gle/);
// ["gooooogle", index: 0, input: "gooooogle", groups: undefined]
//一个量词不能紧贴在另一个量词后面
'gooooogle'.match(/go{2,5}+gle/);
// Uncaught SyntaxError: Invalid regular expression: /go{2,5}+gle/: Nothing to repeat
```

### 7.贪婪模式和非贪婪模式

```javascript
'https'.match(/http(s)?/);
// ["https", "s", index: 0, input: "https", groups: undefined]
'https'.match(/http(s)??/);
// ["http", undefined, index: 0, input: "https", groups: undefined]
```

紧跟在**?**后面的**?**不是一个量词,而是一个模式切换符,从贪婪模式切换到非贪婪模式.

贪婪模式在正则中是默认模式,就是在既定规则下匹配尽可能多的文本.紧跟在量词后面加上**?**就是开启非贪婪模式(匹配到结果就结束),这里要特别注意:**?必须紧跟量词,不然就自己变成量词了**.

### 8.字符组

正则中的普通字符只能匹配它自己,如果我们不能确定一个普通字符是什么,该怎么办呢?

```javascript
'grey or gray'.match(/gr[ae]y/);
// ["grey", index: 0, input: "grey or gray", groups: undefined]
```

方括号在正则中表示一个区间,我们称之为字符组.

* 字符组中的字符集合只是所有的可选项,最终只能匹配一个字符

* 字符组是独立的,字符组内部的元字符不需要转义

* **^**和**-**在字符组中存在特殊含义

  **^**在字符组中表示取反,**-**不再是普通字符,而是表示连字符(匹配范围在它左边字符和右边字符之间的字符(按照ASCII表的顺序)),如果要表示普通字符,使用**\\**转义符

```javascript
  '$'.match(/[$&@]/);
  // ["$", index: 0, input: "$", groups: undefined]
  'regexp'.match(/[^abc]/);//匹配不是abc的字符
  // ["r", index: 0, input: "regexp", groups: undefined]
  '13'.match(/[1-9]3/);
  // ["13", index: 0, input: "13", groups: undefined]
  'abc-3'.match(/[0-z]/);
  // ["a", index: 0, input: "abc-3", groups: undefined]
  'xyz-3'.match(/[0-c]/);
  // ["3", index: 4, input: "xyz-3", groups: undefined]
  'xyz-3'.match(/[0-$]/);
  // Uncaught SyntaxError: Invalid regular expression: /[0-$]/: Range out of order in character class
```


### 9.捕获组(具名组)和非捕获组[ES2018]

```javascript
  'i love you very very very much'.match(/i love you (very )+much/);
  // ["i love you very very very much", "very ", index: 0, input: "i love you very very very much", groups: undefined]
```

  圆括号的意思是将它其中的字符集合打包成一个整体,然后量词就可以操作这个整体了.

  #### 9.1.正则内捕获

```javascript
  '<App>hello regexp</App>'.match(/<([a-zA-Z]+)>.*<\/\1>/);
  // ["<App>hello regexp</App>", "App", index: 0, input: "<App>hello regexp</App>", groups: undefined]
```

  正则内捕获使用**\数字**的形式,分别对应前面的圆括号捕获的内容,这种捕获的引用也称为反向引用.

```javascript
  '<App>hello regexp</App><p>A</p><p>hello regexp</p>'.match(/<((A|a)pp)>(hello regexp)+<\/\1><p>\2<\/p><p>\3<\/p>/);
  // ["<App>hello regexp</App><p>A</p><p>hello regexp</p>", "App", "A", "hello regexp", index: 0, input: "<App>hello regexp</App><p>A</p><p>hello regexp</p>", groups: undefined]
```

  如果有嵌套的圆括号,那么捕获的引用是先递归,然后才是下一个顶级捕获.

  #### 9.2.正则外捕获

```javascript
  '@abc'.match(/@(abc)/);
  // ["@abc", "abc", index: 0, input: "@abc", groups: undefined]
  '@xyz'.match(/@(xyz)/);
  // ["@xyz", "xyz", index: 0, input: "@xyz", groups: undefined]
  RegExp.$1;
  // "xyz"
  'hello **regexp**'.replace(/\*{2}(.*)\*{2}/, '<strong>$1</strong>');
  // "hello <strong>regexp</strong>"
```

  **RegExp**是构造正则表达式的构造函数,如果有捕获组,它的实例属性**$数字**会显示对应的引用,如果有多个正则捕获组,则显示最后一个正则的捕获.

  #### 9.3.非捕获组

  当我们需要匹配捕获组,但是又不需要捕获组结果时,我们可以使用非捕获组(?:pattern)

```javascript
'industry'.match(/industr(y|ies)/);
//["industry", "y", index: 0, input: "industry", groups: undefined]
'industry'.match(/industr(?:y|ies)/);
// ["industry", index: 0, input: "industry", groups: undefined]
```

  #### 9.4.捕获命名

  使用**\数字**引用捕获必须保证捕获组的顺序不变,在ES2018中,增加了捕获命名的新特性,使引用更加确定.

```javascript
  '<App>hello regexp</App>'.match(/<(?<tag>[a-zA-Z]+)>.*<\/\k<tag>>/);
  // ["<App>hello regexp</App>", "App", index: 0, input: "<App>hello regexp</App>", groups: {tag: "App"}]
  
  const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
  
  const matchObj = RE_DATE.exec('1999-12-31');
  const year = matchObj.groups.year; // 1999
  const month = matchObj.groups.month; // 12
  const day = matchObj.groups.day; // 31
```

  在捕获组内部最前面加上`?<key>`,它就被命名了,使用`\k<key>`语法就可以引用已经命名的捕获组.

  ### 10.分支

  如果我们需要在正则中使用**或者**,那么我们就需要使用**|**

```javascript
  '江疏影'.match(/江疏影|刘华强/);
  // ["江疏影", index: 0, input: "江疏影", groups: undefined]
```

  字符组也是一个多选结构,但是与分支不同.字符组最终只能匹配一个字符,而分支匹配的是**|**左边所有的字符或者右边所有的字符.

### 11.零宽断言😂[前瞻后顾]

零宽: 它匹配一个位置,本身没有宽度

断言: 一种判断,断言之前或者之后应该有什么或应该没有什么

#### 11.1.零宽肯定先行断言(?=)[正向肯定预查]

```javascript
'CoffeeScript JavaScript javascript'.match(/\b\w{4}(?=Script\b)/);
// ["Java", index: 13, input: "CoffeeScript JavaScript javascript", groups: undefined]
'ab1cde2fg'.replace(/[a-z](?=\d)/g, 'X'); // aX1cdX2fg
```

人话: 要匹配一段文本,这段文本后面必须紧跟另一段特定的文本,即要满足断言前面的条件,也要满足后面的条件,但是返回结果只要前面部分的文本.

#### 11.2.零宽肯定后行断言(?<=)[ES2018] [反向肯定预查]

```javascript
'演员高圆圆 将军霍去病 演员霍思燕'.match(/(?<=演员)霍\S+/);
// ["霍思燕", index: 14, input: "演员高圆圆 将军霍去病 演员霍思燕", groups: undefined]
'演员高圆圆 将军霍去病 演员霍思燕'.match(/(?<=演员)霍.+?(?=\s|$)/);
// ["霍思燕", index: 14, input: "演员高圆圆 将军霍去病 演员霍思燕", groups: undefined]
'ab1cde2fg'.replace(/(?<=\d)[a-z]/g, 'X'); // ab1Xde2Xg
```

匹配一段文本,这段文本前面必须紧跟另一段特定的文本,只取后面的文本

#### 11.3.零宽否定先行断言(?!)[正向否定预查]

```javascript
 'TypeScript Perl JavaScript'.match(/\b\w{4}(?!Script\b)/);
 // ["Perl", index: 11, input: "TypeScript Perl JavaScript", groups: undefined]
 'ab1cde2fg'.replace(/[a-z](?!\d)/g, 'X'); // Xb1XXe2XX
```

否定就是没有,就是要求一段文本,后面一定不要紧跟一段指定文本

#### 11.4.零宽否定后行断言(?<!)[ES2018] [反向否定预查]

```javascript
'演员高圆圆 将军霍去病 演员霍思燕'.match(/(?<!演员)霍\S+/);
// ["霍去病", index: 8, input: "演员高圆圆 将军霍去病 演员霍思燕", groups: undefined]
'ab1cde2fg'.replace(/(?<!\d)[a-z]/g, 'X'); // XX1cXX2fX
```

要求一段文本,前面一定不跟某一段指定文本

### 12.修饰符

语法: 将修饰符放在正则主题的末尾,如: **/abc/gi**

#### 12.1.g修饰符(global)

默认情况下,正则从左向右匹配,只要匹配到结果就会结束,g修饰符会开启全局匹配模式,找到所有的匹配结果

```javascript
'演员高圆圆 将军霍去病 演员霍思燕'.match(/(?<=演员)\S+/);
// ["高圆圆", index: 2, input: "演员高圆圆 将军霍去病 演员霍思燕", groups: undefined]
'演员高圆圆 将军霍去病 演员霍思燕'.match(/(?<=演员)\S+/g);
// ["高圆圆", "霍思燕"]
```

#### 12.2.i修饰符(ignoreCase)

默认情况话,正则是区分大小写的,i修饰符的作用是可以全局忽略大小写.

```javascript
'javascript is great'.match(/JavaScript/);
// null
'javascript is great'.match(/JavaScript/i);
// ["javascript", index: 0, input: "javascript is great", groups: undefined]
```

#### 12.3.m修饰符(multiline)

默认情况下，**^**和**$**匹配的是文本的开始和结束，加上**m**修饰符，它们的含义就变成了多行的**行首**和**行尾**,支持多行搜索

```javascript
`
abc
xyz
`.match(/xyz/);
// ["xyz", index: 5, input: "↵abc↵xyz↵", groups: undefined]
`
abc
xyz
`.match(/^xyz$/);
// null
`
abc
xyz
`.match(/^xyz$/m);
// ["xyz", index: 5, input: "↵abc↵xyz↵", groups: undefined]
```

#### 12.4.y修饰符(sticky粘连)[ES6]

y修饰符有和g修饰符重合的功能，它们都是全局匹配,不同在于,`g`修饰符只要剩余位置中存在匹配就可，而`y`修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义

```javascript
'a bag with a tag has a mag'.match(/\wag/g);
// ["bag", "tag", "mag"]
'a bag with a tag has a mag'.match(/\wag/y);
// null
'bagtagmag'.match(/\wag/y);
// ["bag", index: 0, input: "bagtagmag", groups: undefined]
'bagtagmag'.match(/\wag/gy);
// ["bag", "tag", "mag"]
```

❓不是说y是全局匹配吗,为什么上面第三条语句没有全局匹配,第四条才全局匹配了。

##### 12.4.1.lastIndex

针对上面的问题,我们不得不讲一下正则表达式的lastIndex属性了.

JS中,正则表达式使用方式有两种,一种是正则表达式对象的方法,一种是字符串对象的方法,前者有exec(str),test(str)两个方法,后者match(regexp)、replace(regexp)、search(regexp)、split(search)四个方法.**当作为正则表达式对象的方法使用时**,需要特别注意lastIndex的属性.

lastIndex从字面上来讲就是最后一个索引，实际上它的意思是正则表达式开始下一次查找的索引位置，第一次的时候总是为0的，第一次查找完了的时候会把lastIndex的值设为匹配到得字符串的最后一个字符的索引位置加1，第二次查找的时候会从lastIndex这个位置开始，后面的以此类推。如果没有找到，则会把lastIndex重置为0。要注意的是，lastIndex属性只有在有全局标志正则表达式中才有作用.

```javascript
const reg1 = /\wag/y;
reg1.exec('bagtagmag');
// ["bag", index: 0, input: "bagtagmag", groups: undefined]
reg1.exec('bagtagmag');
// ["tag", index: 3, input: "bagtagmag", groups: undefined]
reg1.exec('bagtagmag');
// ["mag", index: 6, input: "bagtagmag", groups: undefined]

const reg2 = /\wag/g;
reg2.exec('bag_tag_mag');
// ["bag", index: 0, input: "bag_tag_mag", groups: undefined]
reg2.exec('bag_tag_mag');
// ["tag", index: 4, input: "bag_tag_mag", groups: undefined]
reg2.exec('bag_tag_mag');
// ["mag", index: 8, input: "bag_tag_mag", groups: undefined]

reg1.exec('bag_tag_mag');
// ["bag", index: 0, input: "bag_tag_mag", groups: undefined]
reg1.lastIndex // 3
reg1.exec('bag_tag_mag');
// null

reg1.lastIndex = 4;
reg1.exec('bag_tag_mag');
//["tag", index: 4, input: "bag_tag_mag", groups: undefined]
```

#### 12.5.s修饰符(singleline)[ES2018]

**s**修饰符的作用是让**.**可以匹配任意单个字符.

```javascript
`
abc
xyz
`.match(/c.x/);
// null
`
abc
xyz
`.match(/c.x/s);
// ["c↵x", index: 3, input: "↵abc↵xyz↵", groups: undefined]
```

#### 12.6.u修饰符(unicode)[ES6]

有些Unicode字符超过一个字节,正则无法正确识别,可用u修饰符来处理.

## 二、方法

### 1.RegExp类型及方法

JavaScript通过RegExp类型来支持正则表达式`var exp = / pattern / flags`

其中的模式(pattern)部分可以是任何简单或复杂的正则表达式,修饰符(flags)可以是一个或多个,表明正则表达式的行为.

我们还可以通过构造函数来创建正则表达式.

``` 
new RegExp('abc'); // /abc/
new RegExp('abc','gi'); // /abc/gi
new RegExp(/abc/gi); // /abc/gi
new RegExp(/abc/m,'gi'); // /abc/gi
```

构造函数接收两个参数:第一个参数是匹配模式或者是正则表达式,第二个参数是修饰符.

如果第一个参数的正则表达式定义了修饰符,第二个参数又有值,则以第二个参数定义的修饰符为准.[ES6]

RegExp实例也带有几个正则方法(exec,test)

#### 1.1.exec方法

作用: 根据参数返回匹配结果,和match相似.只有当参数为空时,exec返回null.

```javascript
/xyz/.exec('abc-xyz-abc');
//["xyz", index: 4, input: "abc-xyz-abc", groups: undefined]
/xyz/.exec(); // null
```

RegExp实例有一个lastIndex属性,每匹配一次,这个属性就更新为下一次匹配开始的位置,exec根据这个属性来进行全局匹配.如果有多个匹配结果,多次执行能够获取所有匹配结果,所以exec一般用于循环语句中.

```javascript
const reg = /abc/g;
reg.lastIndex; // 0
reg.exec('abc-xyz-abc'); // ["abc", index: 0, input: "abc-xyz-abc", groups: undefined]
reg.lastIndex;// 3
reg.exec('abc-xyz-abc'); // ["abc", index: 8, input: "abc-xyz-abc", groups: undefined]
reg.lastIndex;// 11
reg.exec('abc-xyz-abc'); // null
reg.lastIndex;// 0
reg.exec('abc-xyz-abc'); // ["abc", index: 0, input: "abc-xyz-abc", groups: undefined]
reg.lastIndex;// 3

'abc-xyz-abc'.match(reg); // ["abc", "abc"]
```

#### 1.2.test方法

作用: 找出源文本中是否有匹配项,与字符串方法search类似,多用于表单验证.

```javascript
/abc/.test('abc-xyz-abc'); // true
```

由于是正则实例方法,全局匹配时也需要考虑lastIndex的更新问题.

### 2.String类型自带方法

正则表达式是用来匹配字符串的,所以String实例中天生带有几个可以使用正则匹配的方法(match,replace,search,split)

#### 2.1.match方法

作用: 根据参数返回匹配结果,接收正则表达式作为唯一参数,如果参数是字符串,match方法内部会隐式调用new RegExp()方法进行转换

返回结果: 

| 结果       | 返回值 | 说明                                                         |
| ---------- | ------ | ------------------------------------------------------------ |
| 匹配失败   | null   |                                                              |
| 非全局匹配 | 数组   | 数组第一个值为匹配结果  数组中有一个index属性,标明匹配结果在文本中的起始位置 |
| 全局匹配   | 数组   | 数组中会列出所有的匹配结果,其他信息(index等)则不显示了.      |

#### 2.2.replace方法

作用: 用给定字符串替换匹配结果,并返回新的替换后的文本,源字符串不会改变.接收两个参数:第一个参数为字符串或者正则表达式,如果参数是字符串,匹配替换只会执行一次,第二个参数可以是字符串或函数,用于替换.

```javascript
'abc-xyz-abc'.replace('abc', 'biu'); // "biu-xyz-abc"
'abc-xyz-abc'.replace(/abc/, 'biu'); // "biu-xyz-abc"
'abc-xyz-abc'.replace(/abc/g, 'biu'); // "biu-xyz-biu"
```

第二个参数如果是字符串时,`$`字符具有特殊含义

| 字符         | 替换文本                                 |
| ------------ | ---------------------------------------- |
| $1 、$2 、$3 | 与正则中的第1到第3个子表达式相匹配的文本 |
| $&           | 与正则相匹配的结果                       |
| $`           | 位于匹配结果左侧的文本                   |
| $'           | 位于匹配结果右侧的文本                   |
| $$           | $符号本身,第一个\$相当于时转义           |

```javascript
'@abc-xyz-$abc'.replace(/([^-]+)abc/g, '$1biu'); //"@biu-xyz-$biu"
'@abc-xyz-$abc'.replace(/([^-]+)abc/g, '{$&}'); //"{@abc}-xyz-{$abc}"
'@abc-xyz-$abc'.replace(/([^-]+)abc/g, '{$`}'); //"{}-xyz-{@abc-xyz-}"
'@abc-xyz-$abc'.replace(/([^-]+)abc/g, "{$'}"); //"{-xyz-$abc}-xyz-{}"
'@abc-xyz-$abc'.replace(/([^-]+)abc/g, '$$biu'); //"$biu-xyz-$biu"
```

当第二个参数是函数时,每一个匹配都会调用该函数,它返回的字符串作为替换文本使用.该函数的第一个参数是匹配模式的字符串,接下来的参数分别是\$1,\$2,\$3这样的与子表达式匹配的字符串,接下来的参数是一个整数,声明匹配在文本中开始的位置,最后一个参数是文本本身.

```javascript
name = 'aaa bbb ccc';
uw=name.replace(/\b\w+\b/g, function(word){
  return word.substring(0,1).toUpperCase()+word.substring(1);}
  );// "Aaa Bbb Ccc"

var s = "Hello,My name is Vincent. What is your name?"
var newStr = s.replace(/\b\w{4}\b/g,replacer)
console.log(newStr)
function replacer(match) {
    console.log(match);
    return match.toUpperCase();
}
/*
name
What
your
name
Hello,My NAME is Vincent. WHAT is YOUR NAME?
*/
```

#### 2.3.search方法

作用: 找出 **首次** 匹配项的索引,匹配失败返回-1,接收一个正则表达式作为唯一参数,如果传入字符串,也会隐式调用new RegExp()方法

```javascript
'abc-xyz-abc'.search(/xyz/); // 4
```

#### 2.4.split方法

作用: 根据传入的分隔符切割源字符串,返回一个被切割单元组成的数组.

接收两个参数,第一个参数可以是字符串或者正则表达式,作为分隔符,第二个参数可选,限制数组返回长度.

```javascript
'abc-def_mon+xyz'.split(/[-_+]/);//  ["abc", "def", "mon", "xyz"]
```

## 三、ES6新变化

ES6中,将字符串的4个正则方法(match,replace,search,split)在语言内部全部调用RegExp的实例方法,从而做到所有与正则相关的方法,全部定义在RegExp对象上.

## 四、常用正则表达式

1. 手机号码检查: 最简单的判断为11位数字就行 `/^\d{11}$/`

2. email检查:   `/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/`

3. url地址参数获取:  `new RegExp("(?:^\?|&)" + name + "=(.*?)(?=&|$)")`
```javascript
 '?aaa=22112&b=sasa'.match(/(?:^\?|&)b=(.*?)(?=&|$)/)
 //["&b=sasa", "sasa", index: 10, input: "?aaa=22112&b=sasa", groups: undefined]
```
4. 密码强度检查,密码必须由字母数字特殊字符(~!@#$%^&*)组成,且不少于8个字符:

```javascript
/^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[~!@#$%^&*]).{8,}$/;
```

5. 数字的千位分隔符表示法

```javascript
"1111122332144".replace(/(?=(\B\d{3})+$)/g, ",")
//"1,111,122,332,144"
```

   