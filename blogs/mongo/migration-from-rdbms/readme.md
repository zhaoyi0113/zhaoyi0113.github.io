# 教你如何将关系型数据导入MongoDB

今天一早就收到一封关于MongoDB的邮件，`MongoDB began trading as a public company on the NASDAQ under the symbol “MDB.” `。是的，在经过长达10年的开源项目后，MongoDB终于登上了`纳斯达克`。作为一个MongoDB的忠实粉丝，除了为它感到骄傲之外，还想在此整理一下工作在MongoDB上的一些想法和经验。此文也算是为MongoDB的推广献一份力量。

# 准备工作

关系型数据库已经统治数据存储长达三十几年的时间，即便在2000年以后诞生了NoSQL数据库，但他的出现并没有改变关系型数据的统治地位。随着最近几年互联网应用的快速崛起，以及互联网用户的不断增加，数据来源越来越复杂多样，传统关系型数据存储面临了很大的挑战。这种挑战体现在数据格式死板，改动困难，存储不够灵活，难于扩展等方面。因此，很多企业、公司都先后把数据从关系型迁移到NoSQL上来，其中MongoDB又是使用相对较广泛的数据库实现。本文就为大家分享一下关系型数据导入进MongoDB中应当遵循的步骤和注意的问题。

在考虑将关系型数据导入到NoSQL中时，首先需要确认的几点是：首先这个导入过程不会是全自动的，并不是像备份数据，迁移数据，记住几个命令那么简单；其次，这个过程不是一个纯技术问题，在制定具体方案时，项目经理，业务分析人员，开发人员，数据库管理员都应当参与到方案的讨论中。迁移的计划、技术方案、各个项目负责人的职责应当在全体人员在场的情况下制定清楚；最后，应当考虑到迁移失败以后的恢复方案，根据应用数据的复杂程度不同，迁移的工作量也不会完全一样。

![工作计划](./plan.png)

上图列出了一个项目经过关系型数据向NoSQL中迁移的大致步骤，当然这绝对不是一个唯一的标准。只是通常情况下的做法，可能会根据不同项目的特别需求有一些调整。下面我们来详细分析每一个阶段的具体工作内容。

# 数据模型定义

有可能你会觉得奇怪，MongoDB不是结构无关的NoSQL数据库吗？为什么我们要提到数据库表结构定义。实际上，NoSQL中的结构无关值得是从技术层面来讲，数据库对表结构没有强约束，任何格式的JSON都可以插入进MongoDB表中。但是，我们在做项目时不能为所欲为的在数据库中插入数据，一定要遵循我们自己定义的一套规则来进行，否则程序根本无法管理数据层面的业务逻辑。在讨论表结构之前，先来看一下MongoDB中的一些术语和关系型数据库的对应关系。

RDBMS | MongoDB
----- | -------
数据库 | 数据库
表(Table) | 集合（Collection）
行（Row）| 文档 （Document）
索引（Index）|索引（Index）
|

看起来很好理解，在MongoDB中我们把表称做`Collection`，表中每一行的数据称作`Document`。其他的基本沿用关系型数据库的命名。在MongoDB中，所有的数据格式都是以JSON为数据库类型，它能够比较灵活的存储各种数据库关系。这也是为什么MongoDB能够在一个Collection中存储各种不同结构的数据。比如，你可以插入这样一个JSON到MongoDB中：`{"user": {"name": "Zhang San", }}`，另外再插入这个JSON`{"product": {"id": "00001"}}`。可以看到这两个JSON没有任何关系，也没有任何相同的属性，但在MongoDB中都是合法的数据，他们可以同时存在于一个Collection中。当然，我们并不鼓励大家这样做，因为这样很难维护你的数据库表格，而且对于查询索引来说也很麻烦，会产生很多不必要的索引存储。我们所说的结构灵活指的是在一个结构框架基础上，可以灵活扩充、添加新的数据而不用重新定义数据Schema。因此，我们在进行数据库迁移之前需要讨论如何定义Collection的结构。

MongoDB将JSON存储成一个叫`BSON`的数据结构中，`BSON`指的是`Binary JSON`，二进制JSON，并在JSON的基础上添加了一些新的数据类型，int，float，long。JSON格式可以灵活的存储嵌入式数据结构，以及数据结构，要是在关系型数据库中实现其难度是很难想象的。在定义Collection结构时，需要根据应用程序实际需求找出数据模型的定义，最大程度的利用MongDB的存储灵活性。例如，下面是一个典型的两张一对多的数据库表格。

学生表：

student_id | name | grade 
-------|----|----
00001 | Zhang San | 3
00002 | Li Si | 2
00003 | Wang Wu | 1
|

成绩表：

student_id | course_id | score
----- | ----- | -----
00001 | FIT00337 | 93
00001 | FIT00338 | 77
00001 | FIT00339 | 57
00001 | FIT00340 | 68
00002 | FIT00338 | 86
00002 | FIT00338 | 73
00003 | FIT00338 | 60
|

其中，第一张表是学生表，第二张是学生成绩表，一个学生可以有多门课程的成绩，因此他们之间是一对多的关系，其中`studnet_id`在学生表中是主键，对应成绩表中的外键。在关系型数据库中这种表示方法完美并正确，但是到了MongoDB中也许就是另外一种存储样式了。为了充分利用JSON格式的内嵌式存储，我们通常会把这种关系存储到Collection中的一条记录（Document），如下所示：

```json
{
  "student_id": "00001",
  "name": "Zhang San",
  "grade": 3,
  "courses": [
    {
      "course_id": "FIT00337",
      "score": 93
    },
    {
      "course_id": "FIT00338",
      "score": 77
    },
    {
      "course_id": "FIT00339",
      "score": 57
    }
  ]
}
...
```

上面是对学生Zhang Scan的记录存储，可以看出我们把学生成绩当作是学生表的内嵌字段，由于是一对多的关系，我们把他存储成一个数组的形式。这种基于JSON文档的存储结构有一下几点优势：

- 数据一目了然，当你从数据库中取出一条学生记录后，关于学生的基本信息全部显示出来。方便大家阅读浏览。
- 避免了多次数据库表连接操作。在关系型数据库中存在着多种表之间的链接操作，比如左右连接，内连，外连等等。为了找到关于一个学生的全部信息，我们也许需要进行若干张表的连接才能拿到想要的数据。除了需要写更复杂的SQL语句以外，数据库的性能也会收到影响。当数据库进行一次连接操作时，内部可能是需要从磁盘不同位置读取数据，加大了IO操作。反观MongoDB，一次查询只需要读取一次磁盘，大大提高的查询效率。
- 删除、修改操作简单方便。如果所有相关学生的信息都存储在一张Collection中，那么对学生信息的删除和修改只需要在一张表中操作就可以。试想一下在关系型数据库中，如果需要删除一个学生纪录，有可能需要操作学生表、成绩表、宿舍表、等等与学生关联的所有表，这样的设计是困扰关系型数据库开发人员的一大难题。搞不好数据库中就会存储大量过时、失效的数据，而这些数据可能成为永远也不会被访问的死角。
- 所有Document都是自我描述的，这方便大家进行数据库的水平扩展。在MongoDB Shard中，我们可以将一个Collection切分到不同的Shard集群中，这种切分方法在不需要进行JOIN的操作前提下变得十分简单。因为，DBA再不用担心需要进行夸节点的JOIN操作。（关于MongoDB水平扩展的内容，情参考另外一篇文章`MongoDB的水平扩展，你做对了吗？`。

# 内嵌还是引用

上面是一个将一对多关系的两张表整合到一个Document中，实际上我们的数据表结构会复杂很多，一个企业级应用动辄就要设计几百甚至上千张表，表之间会有一对一，一对多，多对多种关联关系。对于如此复杂的场景目前我们还没有一个准确的可以使用任何情况的解决方案。基本上都需要针对业务数据具体分析，从而得出新的数据结构。这里，我可以给大家列出一些基本的原则以及处理不同关系的基本方法，根据这些基本原则方法我想大家总可以根据自己的业务归纳出一个行之有效的解决方案。具体到MongoDB，有内嵌和饮用两种方式来进行关联，下面我们分布看一下它们应用的场景。

## 内嵌

就像上面举的例子那样，将关系型数据中表的一行内嵌到与他相关联的表中使之在新的Collection中成为一个Document。这种内嵌的方法适用于两种情况：

- 当表关系是一对一时，或者
- 当表关系是一对多时

在上面两种关系下，如果关系表不经常单独进行查询，它只是依附在主表查询的基础上进行，那么我们可以考虑使用内嵌的方法。以产品和产品价格为例说明一下，在纪录产品价格时，价格是会随着时间的变化而取不同的值。一款新上线的产品价格相对较高，随着时间的推移其价格也会随之下降。在一些类似双十一节假日期间，价格也会临时调整。在分析产品销售状况的时候，我们还要考虑到在什么样的价格下产品销量高，所以不能简单的把产品和价格放到一张表中，必然会存在一张与产品相关联的价格表，它纪录了产品当前价格以及历史价格。那么，我们在统计产品的销量报表时，这张价格表不会单独存在，它必然会依附在产品表之下。此时，将产品价格内嵌到产品表中就是一个比较可行的方案。查询语句可以通过一个Collection找出所有产品相关价格从而避免了表之间的JOIN操作。

但是并不是所有的一对一和一对多的关系都适合使用内嵌的方式。在一下情况下应当慎重使用内嵌数据结构：

- 如果一个Document的大小超过了MongoDB的限制（16M），此时不应考虑嵌入数据结构。当你的数据表关系很复杂，可能将所有相关的数据内嵌到一个Document中会超过16M的限制。
- 如果一个Document需要经常被访问，而其中的一个内嵌Document很少被访问到，这时不太适合使用内嵌；因为这会使MongoDB在检索数据时增加内存的消耗。
- 如果一个Document中的一个内嵌Document需要经常修改，或者大小经常发生变化，而另一个内嵌Document相对静态，这是也不要考虑使用内嵌结构。
- 由于内嵌Document的增加和减少会导致整个Document大小发生变化，当变化超过了分配给Document的磁盘空间时会导致数据库从新为Document分配空间。

## 引用

除了内嵌之外还可以使用引用的方式来关联数据。引用的方式和关系型数据库表的主外键很想。你可以把主表和外键表分别存储成一个Collection，然后用他们的`_id`进行关联，`_id`是MongoDB文档中一个比较特殊的字段，他会被MongoDB自动生成并且唯一存在在一个Collection中。但是，在使用引用的时候需要注意一下几点：

- 在一些复杂的多对多关系表中，不要尝试引用，因为这会加大应用程序逻辑上的开发和维护。
- 当使用内嵌结构产生过多重复数据的时候，可以考虑使用引用。
- 虽然MongoDB不支持JOIN操作，但是可以通过Aggregation中的`$lookup`指令来完成连接多表的操作请求。

# 应用集成

有了数据模型的定义，我们就可以开始进行应用集成。集成的方法可以使用MongoDB的Driver，它支持了几乎常用的各种计算机语言。使用简单和开发效率高是MongoDB的两大特点。于SQL语句不同的是，MongoDB采用了API的方法提供接口，开发人员可以选择支持自己熟悉语言的Driver，DBA可以直接使用Mongo Shell脚本。幸运的是，MongoDB提供了API和SQL语句的对照表供大家参考，[SQL to MongoDB Mapping Chart](https://docs.mongodb.com/manual/reference/sql-comparison/)。

另一个强大的功能不能不提的是Aggregation Framework（聚合）。并不是所有NoSQL数据库都支持Aggregation，简单理解Aggregation可以把它当成是Hadoop里面的Map Reduce，或者SQL里面的Left Join。在没有Aggregation的情况下，开发人员进行数据迁移不得不进行如下操作：

- 在应用程序层开发类似Aggregation的功能，将数据聚合在一起并写进数据库。这样做加大了应用程序的复杂度，并且很难适应各种不同数据的组合情况。没遇到一个新的需求都需要进行一定量的开发工作。
- 有些人会把数据到如今Hadoop，然后在上面运行MapReduce生成结果，之后将结果倒进NoSQL中。这是一个折中的方法，但是他并不支持实时数据迁移，只能进行线下操作。

MongoDB支持原生Aggregation操作，你可以把需要迁移的数据进行聚合操作，每一次操作可以想象成一个流水线上的环节，将所有的操作连接起来可以构成一条Aggregation Pipeline。在Pipeline上面的每一个节点都有自己的输入输出，前一个节点的输出是下一个节点的输入。有兴趣的同学可以在这个连接上找到更多的关于Aggregation操作，它列出了每一个Aggregation命令和SQL语句的对应关系，[SQL to Aggregation Mapping Chart](https://docs.mongodb.com/manual/reference/sql-aggregation-comparison/)

# 数据完整性

在关系型数据库中，有很多支持ACID事务操作的方法和应用，DBA并不希望在数据迁移的过程中有任何闪失，例如损失数据完整性。MongoDB在这方面具有不同形式的支持。在3.0以上版本中，MongoDB支持了[WiredTiger Storage Engine](https://docs.mongodb.com/manual/core/wiredtiger/)，他支持了Document级别上的锁操作。也就是说，在进行数据库写操作时，MongoDB可以保证针对一个Document操作的原子性，这个操作可以和其他操作完全分隔开来。除了对单个Dcoument的原子操作支持外，MongoDB还支持多Document的事务，比如，`findAndModify`方法允许你在进行多个文档操作的时保持事务完整。再比如，可以通过`Perform Two Phase Commits`实现更新多个文档的原子操作，更多信息请访问[Perform Two Phase Commits](https://docs.mongodb.com/manual/tutorial/perform-two-phase-commits/)。

# 数据一致性

在数据一致性方面，MongoDB通过Read Preference来调节一致性的程度。默认情况下，在一个MongoDB Replica Set中，所有的数据库读操作都会发到Primary服务器上，Replica Set中的所有Secondary保证数据最终一致性。同时，MongoDB提供了修改这种一致性的行为方式。数据库管理员可以通过修改Read Preference参数达到对一致性不同要求的场景。数据一致性可以有下面集中方案：

- primary： 默认模式，所有请求都会发送到Primary上。
- primaryPreferred：大部分读请求都会发送到Primary，但是当Primary无法访问时，改请求会被转发到Secondary上。
- secondary： 所有请求都会发送到Secondary上。
- secondaryPreferred： 大部分情况下，读请求被发送到Secondary中，但是如果Replica中没有Secondary，请求会发送到Primary上。
- nearest：  请求会被发送到网络最近的服务器上。该模式在多数据中心上非常有效。

# 数据迁移

进行完上面的设计和思考以后，数据迁移就会变得想对容易。将数据导入进MongoDB有几个不同的选择，可以使用mongoimport将JSON数据进行导入，也可以通过ETL（Extract Transform Load)工具完成。很多项目允许在当前应用程序运行的情况下并行迁移关系型数据库中的数据，并且支持增量更新，具体操作如下：

- 当一条记录从关系型数据库读出后，应用程序会将这条记录按照先前定义的JONS格式插入到MongoDB中。
- 一致性检查，可以通过MD5等方法进行数据一致性检查。
- 新的插入操作和数据修改操作全部转到MongoDB中完成。

# 小结

按照本文提供的方法和步骤，项目团队可以在数据迁移中减少不必要的时间和错误的操作。当然，数据永远是应用系统中的核心内容，任何数据迁移都需要支持错误恢复，如果失败也要能够快速恢复到以前的版本上。在这方面，MongoDB做到了更灵活的支持，具体内容可以参考[MongoDB Webnar](https://www.mongodb.com/webinars)。

# 参考文献

[Data Modeling](https://docs.mongodb.com/manual/core/data-modeling-introduction/)

[SQL to MongoDB Mapping Chart](https://docs.mongodb.com/manual/reference/sql-comparison/)

[SQL to Aggregation Mapping Chart](https://docs.mongodb.com/manual/reference/sql-aggregation-comparison/)

[WiredTiger Storage Engine](https://docs.mongodb.com/manual/core/wiredtiger/)

[Perform Two Phase Commits](https://docs.mongodb.com/manual/tutorial/perform-two-phase-commits/)

https://resources.mongodb.com/migrating-to-mongodb/rdbmstomongodbmigration

# 关于作者

赵翼，毕业于北京理工大学，目前就职于SouthbankSoftware，从事NoSQL，MongoDB方面的开发工作。曾在GE，ThoughtWorks，元气兔担任项目开发，技术总监等职位，接触过的项目种类繁多，有Web，Mobile，医疗器械，社交网络，大数据存储等。
