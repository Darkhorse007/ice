---
title: 关于 icestark
order: 0
---

[icestark](https://github.com/ice-lab/icestark) 是一个非常轻量的，支持模块化开发大型 react 项目的解决方案。是飞冰（ICE）的工作台解决方案，面向大型中后台系统的前端架构方案，

随着 SPA 的不断发展，越来越多逻辑处理转移到前端，我们大胆预判：未来大型中后台项目的场景会越来越多，包括应用改造上云、业务边界不断拓展、各类原有系统的前后端整合等等。

## 工作台方案

随着集团中台化战略的推进，我们针对大型中后台系统，提出了一套基于 icestark 的工作台解决方案。对比传统方案，优势如图所示。

![工作台方案](https://img.alicdn.com/tfs/TB1SVvaa2WG3KVjSZPcXXbkbXXa-1049-497.png)

## 应用架构

下图是使用 icestark 方案的应用架构图

![demo示例](https://img.alicdn.com/tfs/TB1JBLqXBCw3KVjSZFuXXcAOpXa-741-836.png)

- 使用 icestark 方案的应用，会按照 UI 进行框架应用、子应用的拆分
- 框架应用：负责子应用的注册，公共内容（Common Header、Common Sidebar、Common Footer等）展示
- 子应用：负责自身业务相关的内容展示

## 特性

- 非常轻量
- 代码侵入性少
- SPA 级用户体验
- 面向 react 设计
- TypeScript 支持

## 和 ice-scripts、iceworks 的关系？

- ice-scripts 是 react 链路的工程工具，目的是简化 react 项目配置
- iceworks 是前端快速可视化搭建的平台，目的是快速搭建前端项目，提升前端开发效率
- icestark 可以方便得将 iceworks / ice-scripts 管理的 react 项目，模块化的方式组合成一个复杂系统
