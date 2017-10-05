# MongoDB Shard Key你选对了吗？

## 分布式数据库的前世今生

当人们一开始使用数据库系统的时候，所有数据都是跑在一台服务器上，即所谓的单机数据库服务器。在企业级应用中，我们会搭建一台应用程序服务器，一般它会被运行在一台服务器或者工作站上，大多数情况下采用Linux／Unix／Windows操作系统，也有人把这样的服务器称之为应用程序服务器。顾名思义，他的作用是处理复杂的业务逻辑。但是一点需要注意的是，在这样的构架中，这台应用程序服务器不会存储任何业务数据，也就是说，他只负责逻辑运算，处理用户请求，真正存放数据的地方是前面提到的那台数据库服务器。应用程序服务器将用户的请求转换成数据库语言（通常是SQL），运行在数据库中，从而进行数据的增删改查。数据库服务器不会对外直接开放，管理人员也不允许直接在数据库层面操作数据。所有的操作都会经过应用程序服务器来完成。应用程序层、数据库层再加上UI层，被称为传统的Web三层构架。

### Replication

随着数据量的增大，技术的不断进步以及需求的增加，安全性、可靠性、容错性、可恢复性等因素被人们考虑进数据库的设计中。于是出现了分布式数据库系统。以前在存储数据的时候，都是采用单体构架模式，及数据全部存储在一台数据库中，一旦数据库出现问题，所有的应用请求都会收到影响。数据库的恢复也是一个令人头疼的问题。有时一次数据库的全回复会运行几个小时甚至几天的时间。在互联网应用不断普及的今天，业务需求对构架产生了严峻的挑战。没有哪个互联网应用会允许若干小时的宕机时间。分布式数据库的产生，为我们提供了技术上的解决方案。在部署数据库的时候，不用于以前的单体应用，分布式下数据库部署包括多点部署，一套业务应用数据库被分布在多台数据库服务器上，分主从服务器。主服务器处理日常业务请求，从服务器在运行时不断的对主服务器进行备份，当主服务器出现宕机、或者运行不稳定的情况时，从服务器会立刻替换成主服务器，继续对外提供服务。此时，开发运维人员会对出现问题的服务器进行抢修、回复，之后再把它投入到生产环境中。这样的构架也被称作为高可用构架，它支持了灾难恢复，为业务世界提供了可靠的支持，也是很多企业级应用采用的主流构架之一。需要指出的是，在这样的主从设计中，从数据库常常被设计成只读，主数据库支持读写操作。一般会有一台主数据库连接若干台从数据库。在互联网产品的应用中，人们大多数情况下会对应用服务器请求读操作，这样应用服务器可以把读操作请求分发到若干个从数据库中，这样就避免了主数据库的并发请求次数过高的问题。至于为什么大多数应用都是读操作，你可以想一下在你使用微信或者微博的时候，你是看别人发布的图片多还是自己发布的时候多。当你不断下滑屏幕，刷新朋友圈，这些都是读请求。只有当评论、点赞、分享的时候才会进行写操作。

我们的世界就是这样，当技术为人们解决了现实问题以后，新的需求会层出不穷。例如，在解放以后，人们面临的问题是吃喝，农民如何能够填饱肚子成为国家急需解决的问题。国家搞大锅饭，搞集体主义，搞计划经济，每人分到的口粮基本相同，没有区别。但是问题出现在农民劳动不积极，没有主动意识。后来，在70年代末，80年代初的时候，政府要求农村实行责任制，土地承包制，这样的政策立竿见影，激发了农民的劳动积极性，没有了大锅饭，谁勤奋，谁的产出就多，谁分到的粮食就充足；因此立刻解决了人们的吃饭问题。吃饭问题解决以后，就是物质文化需求，百姓手里有了钱，有了余粮，不用像以前那样有事没事儿都在地里干活，日出而做日落而息的日子已经远去，自己可以支配的时间越来越充足，接下来就是要享受生活。盖房、打扮、娱乐、教育，各种活动不断涌现出来，再后来就是普及高等教育，城市化，现代化，国际化，家家户户都有大学生，很多家庭甚至都送孩子出国留学。在这样的刺激下，国家GDP一跃成为世界第二，在未来几年中称为世界第一大经济体也是指日可待。智能手机，互联网+，创业潮的不断兴起，点燃了这样一个有几千年文明历史的民族的激情。各种新点子、新概念不断的涌现，谁的手机里没有安装几十个互联网应用，从订餐，快递，到住房，旅游，再到教育，养老，那一个环节没有互联网的支持，没有技术的成分。我们就是生存在这样一个的平凡而又不乏豪情的社会中。许许多多的需求和数据充斥着我们的构架，挑战着我们的数据存储。

对此，你可能已经想到，前面提到的分布式数据库多点部署是不是会存在大量的瓶颈。比如，在主从数据库结构中，从数据库的内容基本上可以说是主数据库的一份全拷贝，这样的技术称之为`Replication`。`Replication`在实现主从数据同步时，通常采用`Transaction Log`的方式，比如，当一条数据插入到主数据库的时候，主数据库会像`Trasaction Log`中插入一条记录来声明这次数据库写纪录的操作。之后，一个`Replication Process`会被触发，这个进程会把`Transaction Log`中的内容同步到从数据库中。整个过程如下图所示：

![Replication](./replication.png)

对于数据库的扩展来说，通常有两种方法，水平扩展和垂直扩展。

- 垂直扩展：这种扩展方式比较传统，是针对一台服务器进行硬件升级，比如添加强大的CPU，内存或者添加磁盘空间等等。这种方式的局限性是仅限于单台服务器的扩容，尽可能的增加单台服务器的硬件配置。

- 水平扩展：这种方式是目前构架上的主流形式，指的是通过增加服务器数量来进行对系统性能的扩容。在这样的构架下，单台服务器的配置并不会很高，可能是配置比较低、很廉价的PC，每台机器承载着系统的一个子集，所有机器服务器组成的集群会比单体服务器提供更强大、高效的系统容载量。这样的问题是系统构架会比单体服务器复杂，搭建、维护都要求更高的技术背景。MongoDB中的Sharding正式为了水平扩展而设计的，下面就来挤开shard面纱，探讨一下shard中不同分片的技术区别以及对数据库系统的影响。

### 分片 （Shard）

这样的结构可以保证从数据库中的全部数据都会有多分拷贝，数据库的高可用可以保障。但是新的问题是如果要存储大量的数据，不论主从服务器，都需要存储全部数据库，这样检索必然会出现性能问题。可以这样讲，`Replication`只能算是分布式数据库的第一阶段。主要解决的是数据库高可用，读数据可以水平扩展，部分解决了主数据并发访问量大的问题。但是它并没有解决数据库写操作的分布式需求，此外在数据库查询时也只限制在一台服务器上，并不能支持一次查询多台数据库服务器。我们假设，如果有一种构架，可以实现数据库水平切分，把切分的数据分布存储在不同的服务器上，这样当查询请求发送到数据库时，可以在多台数据库中异步检索符合查询条件的语句，这样不但可以利用多台服务器的CPU，而且还可以充分利用不同服务器上的IO，显而易见这样的构架会大大提高查询语句的性能。但是这样的实现却给数据库设计者代码不少麻烦，首先要解决的就是事务（`Transaction`），我们知道在进行一次数据库写操作的时候，需要定一个事务操作，这样在操作失败的时候可以回滚到原始状态，那当在分布式数据库的情况下，事务需要跨越多个数据库节点以保持数据的完整性，这给开发者带来不少的麻烦。此外，在关系型数据库中存在大量表关联的情况，分布式的查询操作就会牵扯到大量的数据迁移，显然这必将降低数据库性能。但是，在非关系型数据库中，我们弱化甚至去除了事务和多表关联操作，根据CAP理论：在分布式数据库环境中，为了保持构架的扩展性，在分区容错性不变的前提下，我们必须从一致性和可用性中取其一，那么，从这一点上来理解“NoSQL数据库是为了保证A与P，而牺牲C”的说法，也是可以讲得通的。同时，根据该理论，业界有一种非常流行的认识，那就是：关系型数据库设计选择了一致性与可用性，NoSQL数据库设计则不同。其中，`HBase`选择了一致性与分区可容忍性，`Cassandra`选择了可用性与分区可容忍性。

本文关注于非关系型数据库中分区的技巧和性能，以MongoDB为例进行说明，在下面的章节中就围绕这一点展开讨论。

# MongoDB 分片原理

MongoDB中通过Shard支持服务器水平扩展，通过Replication支持高可用（HA）。这两种技术可以分开来使用，但是在大数据库企业级应用中通常人们会把他们结合在一起使用。

## MongoDB Sharding

首先我们简要概述一下分片在MongoDB中的工作原理。通过分片这个单词我们可以看出，他的意思是将数据库表中的数据按照一定的边界分成若干组，每一组放到一台MongoDB服务器上。那用户数据举例，比如你有一张数据表存放用户基本信息，可能由于你的应用很受欢迎，短时间内就积攒了上亿个用户，这样当你在这张表上进行查询时通常会耗费比较长的时间，这样这个用户表就称为了你的应用程序的性能瓶颈。很显然的做法是对这张用户表进行拆分，假设用户表中有一个`age`年龄字段，我们先做一个简单的拆分操作，按照用户的年龄段把数据放到不同的服务器上，以20为一个单位，20岁以下的用户放到server1，20到40岁的用户放到server2，40-60岁的用户放到server3，60岁以上放到server4，后面我们会讲这样的拆分是否合理。在这个例子中，用户年龄`age`就是我们进行`Sharding`的`Shard Key`，拆分出来的`server1`, `server2`, `server3`和`server4`就是这个集群中的4个`Shard`服务器。好，Shard集群已经有了，并且数据已经拆分完好，当用户进行一次查询请求的时候我们如何向这四个Shard服务器发送请求呢？例如：我的查询条件是用户年龄在18到35岁之间，这样个查询请求应当发送到`server1`和`server2`，因为他们存储了用户年龄在40以下的数据，我们不希望这样的请求发送到另外两台服务器中因为他们并不会返回任何数据结果。此时，另外一个成员就要登场了，`mongos`，它可以被称为Shard集群中的路由器，就像我们网络环境中使用的路由器一样，它的作用就是讲请求转发到对应的目标服务器中，有了它我们刚才那条查询语句就会正确的转发给`server`和`server2`，而不会发送到`server3`和`server4`上。除了`mongos`和`shard`之外，另一个必须的成员是配置服务器，`config server`，它存储Shard集群中所有其他成员的配置信息，`mongos`会到这台`config server`查看集群中其他服务器的地址，这是一台不需要太高性能的服务器，因为它不会用来做复杂的查询计算，值得注意的是，在MongoDB3.4以后，`config server`必须是一个`replica set`。理解了上面的例子以后，一个Shard集群就可以部署成下图所示的结构：

![Shard Structure](./shard-1.png)

其中：

- shard:  每一个Shard服务器存储数据的一个子集，例如上面的用户表，每一个Shard存储一个年龄段的用户数据。
- mongos: 处理来自应用服务器的请求，它是在应用服务器和Shard集群之间的一个接口。
- config server: 存储shard集群的配置信息，通常部署在一个replica set上。

## MongoDB Shard 性能分析

### 环境准备

这样的服务器构架是否合理，或者说是否能够满足数据量不断增长的需求。如果仅仅是通过理论解释恐怕很难服众，我已经信奉理论结合实际的工作方式，所以在我的文章中处理阐述理论之外，一定会有一定的示例为大家验证理论的结果。接下来我们就根据上面的例子做一套本地运行环境。由于MongoDB的便捷性，我们可以在任何一台PC上搭建这样一个数据库集群环境，并且不限制操作系统类型，任何Windows/Linux/Mac的主流版本都可以运行这样的环境。

对于如何创建一个MongoDB Shard环境，网上有很多教程和命令供大家选择，创建一个有3个Mongos，每个Mongos连接若干个Shards，再加上3个config server cluster，通常需要20几台MongoDB服务器。如果一行命令一行命令的打，即便是在非常熟练的情况下，没有半个小时恐怕搭建不出来。不过幸运的是有第三方库帮我们做这个事情，大家可以查看一下`mtools`。他是用来创建各种MongoDB环境的命令行工具，代码使用`python`写的，可以通过`pip install`安装到你的环境上。具体的使用方法可以参考`https://github.com/rueckstiess/mtools/wiki/mlaunch`。也可以通过`https://github.com/zhaoyi0113/mongo-cluster-docker`上面的脚本把环境搭载Docker上面。

下面的命令用来在本地创建一个MongoDB Shard集群，包含1个`mongos`路由，3个`shard` replica，每个replica有3个`shard`服务器，3个`config`服务器。这样一共创建13个进程。

```
mlaunch init --replicaset --sharded 3 --nodes 3 --config 3 --hostname localhost --port 38017 --mongos 1
```

服务器创建好以后我们可以连接到`mongos`上看一下shard状态，端口是上面制定的38017。

```javascript
mongos> sh.status()
--- Sharding Status --- 
  ...
  shards:
	{  "_id" : "shard01",  "host" : "shard01/localhost:38018,localhost:38019,localhost:38020",  "state" : 1 }
	{  "_id" : "shard02",  "host" : "shard02/localhost:38021,localhost:38022,localhost:38023",  "state" : 1 }
	{  "_id" : "shard03",  "host" : "shard03/localhost:38024,localhost:38025,localhost:38026",  "state" : 1 }
  active mongoses:
	"3.4.0" : 1
  ...
  ```

可以看到刚才创建的shard服务器已经加入到这台mongos中了，这里有3个shard cluster，每个cluster包含3个shard服务器。除此之外，我们并没有看到关于Shard更多的信息。这是因为这台服务器集群还没有任何数据，而且也没有进行数据切分。

### 数据准备

首先是数据的录入，为了分析我们服务器集群的性能，需要准备大量的用户数据，幸运的是`mtools`提供了`mgenerate`方法供我们使用。他可以根据一个数据模版向MongoDB中插入任意条json数据。下面的json结构是我们在例子中需要使用的数据模版：

```json
{
    "user": {
        "name": {
            "first": {"$choose": ["Liam", "Aubrey", "Zoey", "Aria", "Ellie", "Natalie", "Zoe", "Audrey", "Elizabeth", "Scarlett", "Layla", "Victoria", "Brooklyn", "Lucy", "Lillian", "Claire", "Nora", "Riley", "Leah"] },
            "last": {"$choose": ["Smith", "Patel", "Young", "Allen", "Mitchell", "James", "Anderson", "Phillips", "Lee", "Bell", "Parker", "Davis"] }
        }, 
        "gender": {"$choose": ["female", "male"]},
        "age": "$number", 
        "address": {
            "zip_code": {"$number": [10000, 99999]},
            "city": {"$choose": ["Beijing", "ShangHai", "GuangZhou", "ShenZhen"]}
        },
        "created_at": {"$date": ["2010-01-01", "2014-07-24"] }
    }
}
```

把它保存为一个叫`user.json`的文件中，然后使用`mgenerate`插入十万条随机数据。随机数据的格式就按照上面`json`文件的定义。你可以通过调整 `--num`的参数来插入不同数量的Document。([Link to mgenerate wiki](https://github.com/rueckstiess/mtools/wiki/mgenerate))

`mgenerate user.json --num 1000000 --database test --collection users --port 38017`

上面的命令会像`test`数据库中`users` collection插入一百万条数据。在有些机器上，运行上面的语句可能需要等待一段时间，因为生成一百万条数据是一个比较耗时的操作，之所以生成如此多的数据是方便后面我们分析性能时，可以看到性能的显著差别。当然你也可以只生成十万条数据来进行测试，只要能够在你的机器上看到不同`find`语句的执行时间差异就可以。

插入完数据之后，我们想看一下刚刚插入的数据在服务器集群中是如何分配的。通常，可以通过`sh.status()` MongoDB shell命令查看。不过对于一套全新的集群服务器，再没有shard任何collection之前，我们是看不到太多有用的信息。不过，可以通过explain一条查询语句来看一下数据的分布情况。这里不得不强调一下在进行数据性能分析时一个好的IDE对工作效率有多大的影响，我选择[dbKoda](www.dbkoda.com)作为MongoDB的IDE主要原因是他是目前唯一一款对MongoDB Shell的完美演绎，对于MongoDB Shell命令不太熟悉的开发人员来说尤为重要，幸运的是这款IDE还支持Windows/Mac/Linux三种平台，基本上覆盖了绝大多数操作系统版本。下面是对刚才建立的一百万条collection的一次find的explain结果。（对于Explain的应用，大家可以参考我的另外一片文章：[如何通过MongoDB自带的Explain功能提高检索性能？](https://mp.weixin.qq.com/s/xQniuEaUI9g3ICHsI66NRw))

![Explain](./explain-1.png)

从上图中可以看到，我们插入的一百万条数据全部被分配到了第一个shard服务器中，这并不是我们想看到的结果，不要着急，因为我还没有进行数据切分，所以MongoDB并不会自动的分配这些数据。下面我们来一点一点分析如何利用Shard实现高效的数据查询。

### 配置Shard数据库

环境搭建好并且数据已经准备完毕以后，接下来的事情就是配置数据库并切分数据。方便起见，我们把用户分为三组，20岁以下（junior)，20到40岁（middle）和40岁以上（senior），为了节省篇幅，我在这里不过多的介绍如何使用MongoDB命令，按照下面的几条命令执行以后，我们的数据会按照用户年龄段拆分成若干个chunk，并分发到不同的shard cluster中。如果对下面的命令不熟悉，可以查看MongoDB官方文档关于Shard Zone/Chunk的解释。

```javascript
db.getSiblingDB('test').getCollection('users').createIndex({'user.age':1})
sh.setBalancerState(false)
sh.enableSharding('test')
sh.shardCollection('test.users', {'user.age':1})
```

从上面的命令中可以看出，我们首先要为Shard Key创建索引，之后禁止Balancer的运行，这么做的原因是不希望在Shard Collection的过程中还运行Balancer。之后对test库中的users collection进行按用户年龄字段的shard操作，如果Shard collection成功返回，你会得到下面的输出结果：`{ "collectionsharded" : "test.users", "ok" : 1 }`。

随后不要忘记，我们还需要将Balancer打开：`sh.setBalancerState(true) `。刚打开以后运行`sh.isBalancerRunning()`应当返回`true`，说明Balancer正在运行调整Chunk在不同Shards服务器。下面对数据进行分组：

```javascript
sh.addShardTag('shard01', 'junior')
sh.addShardTag('shard02', 'middle')
sh.addShardTag('shard03', 'senior')

sh.addTagRange('test.users', {'user\uff0eage': MinKey}, {'user\uff0eage':20}, 'junior')
sh.addTagRange('test.users', {'user\uff0eage': 21}, {'user\uff0eage':40}, 'middle')
sh.addTagRange('test.users', {'user\uff0eage': 41}, {'user\uff0eage': MaxKey}, 'senior')
sh.setBalancerState(true)
```

分组之后别忘了启动Balancer。一般Balancer会运行一段时间，因为他要对分组的数据重新分配到指定的shard服务器上，你可以通过`sh.isBalancerRunning()`命令查看Balancer是否正在运行。现在可以稍事休息一下喝杯咖啡或看看窗外的风景。

为了理解数据如何在不同Shard中的分配，我们有必要分析一下chunk和zone的划分：


**关于Shard需要注意的几点**

- 一旦你对一个Colleciton进行了Shard操作，你选择的Shard Key和它对应的值将成为不可变对象，所以：
  
  - 你无法在为这个collection重新选择Shard Key
  - 你不能更新Shard key的值



# References
[MongoDB Shard](https://docs.mongodb.com/manual/sharding/)

[Shard Keys](https://docs.mongodb.com/manual/core/sharding-shard-key/)

[MongoDB Docker Cluster](https://github.com/zhaoyi0113/mongo-cluster-docker)

[CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem)