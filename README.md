<p align="center">
    <img src="http://public-photo-bed.oss-cn-hangzhou.aliyuncs.com/github/Tutu%20Code.png"/>
</p>
<div align="center">
  使用 ChatGPT 将数据库表结构/实体类转换为前端代码.
</div>

## 📚 使用文档

### 输入表结构

下面是在`PostgreSQL`数据库中存储的一张 `product_list` 商品列表的表结构，我们拿这张表作为后面的使用案例。

```plsql
CREATE TABLE product_list (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50),
  stock INT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON COLUMN product_list.id IS 'ID';
COMMENT ON COLUMN product_list.name IS '商品名称';
COMMENT ON COLUMN product_list.description IS '商品描述';
COMMENT ON COLUMN product_list.price IS '商品价格';
COMMENT ON COLUMN product_list.category IS '商品类别';
COMMENT ON COLUMN product_list.stock IS '商品库存数量';
COMMENT ON COLUMN product_list.image_url IS '图片';
```

### 选择代码语言和代码类型

支持多种语言，实体类或者 `SQL`，你选择的语言和代码类型会作为关键词传给 `ChatGPT`，输入的越准确生成的代码结果也就越准确。
`API Key` 为 `OpenAI` 的 `Key`
![image.png](https://cdn.nlark.com/yuque/0/2023/png/275583/1683691323618-580ace82-f9b2-424a-acb1-a3e5c91465bb.png#averageHue=%23566b49&clientId=u6396ca7a-2118-4&from=paste&height=679&id=u954ae66a&originHeight=1358&originWidth=2044&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1042183&status=done&style=none&taskId=ua7db3169-c472-4e6c-a704-fe4366db74e&title=&width=1022)

### 生成 Typescript 代码，动态增改字段

![image.png](https://cdn.nlark.com/yuque/0/2023/png/275583/1683689477512-4615e02f-3a0d-42b2-9fac-c11e0c6f18c8.png#averageHue=%232e323c&clientId=u6396ca7a-2118-4&from=paste&height=679&id=GTzLF&originHeight=1358&originWidth=2046&originalType=binary&ratio=2&rotation=0&showTitle=false&size=768817&status=done&style=none&taskId=u675184bb-b4b8-4bce-a700-17da442170a&title=&width=1023)

#### 生成 Typescript 类型代码

如果你的项目是由 `Typescript` 构建的，那么 `TutuCode` 会基于表结构生成对应的 `Typescript` 类型代码。

#### 动态增改字段

表结构中有些字段可能是不需要展示在前端页面中的，所以你可以通过左边的 `Form` 进行简单的增删改，同时`Tutucode`会基于右侧的 `Form` 重新生成新的 `Typescript`类型代码。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/275583/1683694271264-57c515da-afcf-407b-b4e5-228207a48f72.png#averageHue=%232d313b&clientId=u92bbc460-fb00-4&from=paste&height=680&id=u06eb7abf&originHeight=1360&originWidth=2046&originalType=binary&ratio=2&rotation=0&showTitle=false&size=483959&status=done&style=none&taskId=u3111d5da-3fe8-4d6e-9ca4-42e31ec8db0&title=&width=1023)

#### 表单中各个字段的使用含义

| `Field Name` | 与后端交互的字段名称                                                             |
| ------------ | -------------------------------------------------------------------------------- |
| `Field Type` | 对应 `Typescript` 中的类型名称                                                   |
| `Label Name` | 表单组件或者列表组件的 `Title` 或 `Label`，默认是由表结构中的 `comment` 字段生成 |
| `Required`   | 是否必填。可同步到 `Typescript` 类型的可选属性，`Form` 组件中的 `Rules`          |

### 生成前端代码

选择你使用的前端框架、第三方 UI 组件库、生成的目标组件来生成你的前端代码。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/275583/1683694218663-4eaa622f-6235-4c79-8894-057754acd278.png#averageHue=%232e323c&clientId=u92bbc460-fb00-4&from=paste&height=680&id=u08595e3b&originHeight=1360&originWidth=2052&originalType=binary&ratio=2&rotation=0&showTitle=false&size=906015&status=done&style=none&taskId=ufc2b0184-0c60-4323-a4ee-1e1dfa4c1e3&title=&width=1026)

生成的前端完整代码

```vue
<template>
  <div>
    <el-table :data="products" style="width: 100%">
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="description" label="商品描述"></el-table-column>
      <el-table-column
        prop="price"
        label="商品价格"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="category"
        label="商品类别"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="stock"
        label="商品库存数量"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="imageUrl"
        label="图片"
        width="180"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const products = reactive<Product[]>([
      {
        name: 'MacBook Pro',
        price: 80000,
        stock: 88
      },
      {
        name: 'iPhone 11 Pro Max',
        description: 'Apple newest iPhone',
        price: 11000,
        stock: 58
      },
      {
        name: 'AirPods Pro',
        price: 1500,
        stock: 99
      },
      {
        name: 'iPad Pro',
        description: 'iPad Pro 12.9-inch',
        price: 5500,
        category: 'Tablet',
        stock: 65,
        imageUrl: 'https://example.com/ipad.png'
      }
    ]);

    return {
      products
    };
  }
});
</script>
```

## 📦 本地运行

```bash
$ pnpm install

$ pnpm run dev
```

由于本地运行时会调用 `OpenAI` 的接口，所以请确保能正常的通过访问 `ChatGPT`, 并且已设置终端代理。

可以在终端输入 `curl -vv https://www.google.com` 测试一下是否可以正常响应，有时肉体虽然翻出去了，但灵魂并没有。

[设置终端代理](https://github.com/Dreamacro/clash/issues/592)

## 🔨 Deploy

### Vercel 部署（推荐）

[https://vercel.com/dashboard](https://vercel.com/dashboard)

- 一键部署，方便、免费、省心。
- 如果不想使用 `vercel` 提供的域名，可以在 `Domains` 里面获取到 `DNS` 值，然后在你的域名提供商配置一下的 `DNS` 即可

### Docker 部署

根目录下提供了 `Dockerfile` 文件, 默认端口 `3000`

```bash
$ docker build -t nextjs-docker .

$ docker run -p 3000:3000 nextjs-docker
```
