---
sidebar: auto
---

# Client API

::: tip TIP
记录每日一刷的算法题
:::

## 算法题汇总

<!-- ::: warning WARN
Note that if you're accessing `$pagination` at a route which doesn't match any classification, the value of
`$pagination` will be `null`.

So when you develop layout components, you need to verify that `$pagination` exists.
::: -->

### `题目1`

给定一个整数数组nums和一个目标值target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标


````
示例
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
````


```js

```

### `$pagination.length`

Length of current paginations.

### `$pagination.hasPrev`

Whether previous pagination page exists.

### `$pagination.prevLink`

Link of previous pagination page.

### `$pagination.hasNext`

Whether next pagination page exists.

### `$pagination.nextLink`

Link of next pagination page.

### `$pagination.getSpecificPageLink`

Get specific pagination page via page number.

::: tip TIP
You can use this function to custom the pagination component as the internal
[`<Pagnination />`](../components/#pagination) component.
:::

## $frontmatterKey

if you create a [Frontmatter Classifier](../guide/getting-started.md#frontmatter-classifier) as follows:

```js
module.exports = {
  plugins: [
    [
      "@vuepress/blog",
      {
        frontmatters: [
          {
            // Unique ID of current classification
            id: "tag",
            // Decide that the frontmatter keys will be grouped under this classification
            keys: ["tag"],
            // Path of the `entry page` (or `list page`)
            path: "/tag/",
            // Layout of the `entry page`
            layout: "Tag",
          },
        ],
      },
    ],
  ],
};
```

Then this plugin will inject a `$frontmatterKey` object to the prototype of Vue, so you can use it directly at your
layout component (`<Tag />`).

### `$frontmatterKey.list`

Get the list of matched frontmatter classifier types.

The interface is as follows:

```typescript
type FrontmatterKeyList = Array<{
  name: string;
  path: string;
  pages: Array<VuePressPage>;
}>;
```

You can re-read the [Frontmatter Classifier](../guide/getting-started.md#frontmatter-classifier) to see the live
example of `tag`.

::: tip Multiple Frontmatter Classifiers

If you create two frontmatter classifiers, e.g. `tag` and `category`, then in `/tag/` route, the `$frontmatterKey` will
automatically point to `tag`, while in `/category/`, it will point to `category`.

This variable is essentially designed to generalize the list page of frontmatter keys

:::

## $service

### $service.comment

#### `$service.comment.enabled`

Whether comment is enabled.

#### `$service.comment.service`

Get the comment service

### $service.email

#### `$service.email.enabled`

Whether email (newsletter) service is enabled.

### $service.feed

#### `$service.feed.rss`

whether RSS feed is enabled.

#### `$service.feed.atom`

whether Atom feed is enabled.

#### `$service.feed.json`

whether JSON feed is enabled.
