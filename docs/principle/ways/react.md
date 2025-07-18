---
title: React
sidebar: true 
---

# React 相关面试题

## 基础概念

1. **什么是 React？它的主要特点是什么？**
   - React 是一个用于构建用户界面的 JavaScript 库
   - 主要特点：组件化、声明式编程、虚拟 DOM、单向数据流、JSX 语法

2. **什么是 JSX？为什么在 React 中使用它？**
   - JSX 是 JavaScript 的语法扩展，允许在 JavaScript 中编写类似 HTML 的代码
   - 优势：结构清晰、语法检查、提高开发效率

3. **React 中的元素和组件有什么区别？**
   - 元素：描述 UI 的不可变对象，是组件的最小单位
   - 组件：可重用的代码块，接受输入并返回 React 元素

## 组件与生命周期

4. **React 中的类组件与函数组件有什么区别？**
   - 类组件：使用 ES6 class 语法，可以使用生命周期方法和 state
   - 函数组件：更简洁，使用 Hooks 可实现状态管理和副作用

5. **React 组件的生命周期方法有哪些？它们的调用顺序是什么？**
   - 挂载阶段：constructor → getDerivedStateFromProps → render → componentDidMount
   - 更新阶段：getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate
   - 卸载阶段：componentWillUnmount

6. **React Hooks 是什么？常用的 Hooks 有哪些？**
   - Hooks 是 React 16.8 引入的新特性，让函数组件能够使用状态和其他 React 特性
   - 常用 Hooks：useState、useEffect、useContext、useReducer、useCallback、useMemo、useRef

## 状态管理

7. **什么是 state？它与 props 有什么区别？**
   - state：组件内部的可变数据，由组件自身管理
   - props：从父组件传递给子组件的数据，子组件不能修改

8. **如何在 React 中进行状态提升？为什么需要状态提升？**
   - 状态提升：将共享状态提升到最近的共同父组件
   - 目的：保持数据一致性，便于多个组件共享和修改同一状态

9. **Redux 的核心原则是什么？它解决了什么问题？**
   - 核心原则：单一数据源、状态只读、使用纯函数进行修改
   - 解决问题：管理复杂应用的状态，实现可预测的状态管理

## 性能优化

10. **React 中如何避免不必要的渲染？**
    - 使用 React.memo 包装函数组件
    - 在类组件中实现 shouldComponentUpdate
    - 使用 PureComponent
    - 使用 useMemo 和 useCallback 缓存计算结果和回调函数

11. **什么是虚拟 DOM？它如何提高性能？**
    - 虚拟 DOM 是内存中的 JavaScript 对象，代表真实 DOM
    - 通过批量更新和差异比较算法减少实际 DOM 操作，提高渲染效率

12. **React Fiber 是什么？它解决了什么问题？**
    - React Fiber 是 React 16 中新的协调引擎
    - 解决问题：支持任务优先级、中断和恢复渲染过程，提高应用响应性

## 路由与服务端渲染

13. **React Router 的主要组件有哪些？它们的作用是什么？**
    - BrowserRouter/HashRouter：路由容器
    - Route：定义路径和对应组件的映射
    - Link/NavLink：导航链接
    - Switch：独占路由匹配

14. **什么是服务端渲染(SSR)？它有哪些优势？**
    - SSR：在服务器上渲染 React 组件，将 HTML 直接发送给客户端
    - 优势：更好的 SEO、更快的首屏加载、更好的用户体验

15. **Next.js 的主要特性有哪些？**
    - 服务端渲染
    - 静态站点生成
    - 自动代码分割
    - 文件系统路由
    - API 路由

<div class="tag-container">
  <strong>标签:</strong> 
  <a class="tag tag-red">React</a>
  <a class="tag tag-green">前端</a>
  <a class="tag tag-blue">面试题</a>
</div>
