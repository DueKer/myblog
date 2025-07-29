---
title: React
sidebar: true 
---

# React 相关面试题

## 基础概念

1. **什么是 React？它的主要特点是什么？**
   - React 是一个用于构建用户界面的 JavaScript 库，由 Facebook 开发和维护
   - 主要特点：
     - **组件化**：将 UI 拆分为独立、可复用的组件，每个组件管理自己的状态
     - **声明式编程**：声明想要的结果，而不是一步步指定如何实现
     - **虚拟 DOM**：在内存中维护一个虚拟 DOM，最小化实际 DOM 操作
     - **单向数据流**：数据从父组件流向子组件，使应用状态可预测
     - **JSX 语法**：允许在 JavaScript 中编写类似 HTML 的代码
   
   ```jsx
   // React 组件示例
   import React from 'react';
   
   function Welcome(props) {
     return <h1>你好, {props.name}</h1>;
   }
   
   export default function App() {
     return (
       <div>
         <Welcome name="小明" />
         <Welcome name="小红" />
         <Welcome name="小刚" />
       </div>
     );
   }
   ```

2. **什么是 JSX？为什么在 React 中使用它？**
   - JSX 是 JavaScript 的语法扩展，允许在 JavaScript 中编写类似 HTML 的代码
   - JSX 本质上是 `React.createElement()` 函数的语法糖
   - 优势：
     - **结构清晰**：HTML 风格语法更直观地描述 UI
     - **类型安全**：编译时可以发现错误
     - **提高开发效率**：编写模板更加简单和快速
     - **防注入攻击**：自动转义，可以防止 XSS 攻击
   
   ```jsx
   // JSX 与等效的 React.createElement 对比
   
   // 使用 JSX
   const element = (
     <div className="greeting">
       <h1>你好，世界！</h1>
     </div>
   );
   
   // 不使用 JSX（等效代码）
   const element = React.createElement(
     'div',
     { className: 'greeting' },
     React.createElement('h1', null, '你好，世界！')
   );
   ```
   
   **JSX 转换流程图：**
   
   ```mermaid
   flowchart LR
     A[JSX 代码] --> B[Babel 转换]
     B --> C[React.createElement 调用]
     C --> D[React 元素对象]
     D --> E[渲染到 DOM]
   ```

3. **React 中的元素和组件有什么区别？**
   - **元素(Elements)**：
     - 描述 UI 的不可变对象，是组件的最小单位
     - 是纯 JavaScript 对象，创建成本低
     - 表示界面上的 DOM 节点或用户定义的组件
   - **组件(Components)**：
     - 可重用的代码块，接受输入(props)并返回 React 元素
     - 可以是函数或类
     - 可以包含状态和生命周期方法
   
   ```jsx
   // React 元素示例
   const element = <h1>这是一个 React 元素</h1>;
   
   // React 组件示例
   function Welcome(props) {
     return <h1>你好, {props.name}</h1>; // 返回一个 React 元素
   }
   
   // 使用组件创建元素
   const componentElement = <Welcome name="小明" />;
   ```
   
   **元素与组件关系图：**
   
   ```mermaid
   flowchart TD
     A[组件定义] --> B[组件实例化]
     B --> C[创建 React 元素]
     C --> D[渲染到 DOM]
     E[Props] --> B
     F[State] --> B
   ```

## 组件与生命周期

4. **React 中的类组件与函数组件有什么区别？**
   - **类组件(Class Components)**：
     - 使用 ES6 class 语法
     - 可以使用生命周期方法
     - 可以使用 `this.state` 和 `this.setState()`
     - 更复杂，代码量较大
   - **函数组件(Function Components)**：
     - 使用函数定义
     - 使用 Hooks 可实现状态管理和副作用
     - 没有 `this` 关键字，更简洁易读
     - 性能优化更容易，包体积更小
   
   ```jsx
   // 类组件
   class Welcome extends React.Component {
     constructor(props) {
       super(props);
       this.state = { count: 0 };
     }
     
     render() {
       return <h1>你好，{this.props.name}，点击次数：{this.state.count}</h1>;
     }
   }
   
   // 函数组件（使用 Hooks）
   function Welcome(props) {
     const [count, setCount] = React.useState(0);
     
     return (
       <h1>你好，{props.name}，点击次数：{count}</h1>
     );
   }
   ```
   
   **类组件与函数组件对比图：**
   
   ```mermaid
   classDiagram
     class 类组件 {
       +state
       +props
       +生命周期方法()
       +this 上下文
       +render()
     }
     
     class 函数组件 {
       +props
       +Hooks
       +没有 this
       +返回 JSX
     }
   ```

5. **React 组件的生命周期方法有哪些？它们的调用顺序是什么？**
   - **挂载阶段**：
     - `constructor()` → 初始化 state、绑定方法
     - `static getDerivedStateFromProps()` → 从 props 派生 state
     - `render()` → 渲染 UI
     - `componentDidMount()` → 组件已挂载，可以进行 DOM 操作、数据获取
   - **更新阶段**：
     - `getDerivedStateFromProps()` → 更新时从 props 派生 state
     - `shouldComponentUpdate()` → 性能优化，决定是否需要重新渲染
     - `render()` → 重新渲染 UI
     - `getSnapshotBeforeUpdate()` → 在 DOM 更新前获取信息
     - `componentDidUpdate()` → 组件已更新，可以操作 DOM，但要注意避免无限循环
   - **卸载阶段**：
     - `componentWillUnmount()` → 清理资源、取消订阅
   
   ```jsx
   class LifecycleDemo extends React.Component {
     constructor(props) {
       super(props);
       this.state = { count: 0 };
       console.log('1. 构造函数执行');
     }
     
     static getDerivedStateFromProps(props, state) {
       console.log('2. getDerivedStateFromProps 执行');
       return null;
     }
     
     componentDidMount() {
       console.log('4. componentDidMount 执行');
     }
     
     shouldComponentUpdate(nextProps, nextState) {
       console.log('5. shouldComponentUpdate 执行');
       return true;
     }
     
     getSnapshotBeforeUpdate(prevProps, prevState) {
       console.log('7. getSnapshotBeforeUpdate 执行');
       return null;
     }
     
     componentDidUpdate(prevProps, prevState, snapshot) {
       console.log('8. componentDidUpdate 执行');
     }
     
     componentWillUnmount() {
       console.log('9. componentWillUnmount 执行');
     }
     
     handleClick = () => {
       this.setState({ count: this.state.count + 1 });
     };
     
     render() {
       console.log('3/6. render 执行');
       return (
         <div>
           <p>计数: {this.state.count}</p>
           <button onClick={this.handleClick}>增加</button>
         </div>
       );
     }
   }
   ```
   
   **React 生命周期流程图：**
   
   ```mermaid
   flowchart TD
     A[组件创建] --> B[constructor]
     B --> C[getDerivedStateFromProps]
     C --> D[render]
     D --> E[React 更新 DOM]
     E --> F[componentDidMount]
     
     G[Props 或 State 更新] --> H[getDerivedStateFromProps]
     H --> I[shouldComponentUpdate]
     I -- 返回 true --> J[render]
     I -- 返回 false --> K[停止更新过程]
     J --> L[getSnapshotBeforeUpdate]
     L --> M[React 更新 DOM]
     M --> N[componentDidUpdate]
     
     O[组件卸载] --> P[componentWillUnmount]
   ```

6. **React Hooks 是什么？常用的 Hooks 有哪些？**
   - **Hooks** 是 React 16.8 引入的新特性，让函数组件能够使用状态和其他 React 特性
   - Hooks 解决了类组件中的问题：难以复用状态逻辑、复杂组件难以理解、this 关键字混淆
   - **常用 Hooks**：
     - **useState**：管理组件状态
     - **useEffect**：处理副作用，替代生命周期方法
     - **useContext**：访问 Context 数据
     - **useReducer**：复杂状态管理，类似 Redux
     - **useCallback**：缓存回调函数，避免不必要的重新渲染
     - **useMemo**：缓存计算结果，提高性能
     - **useRef**：保存可变引用，访问 DOM 元素
     - **useLayoutEffect**：与 useEffect 类似，但在浏览器绘制前同步执行
   
   ```jsx
   import React, { useState, useEffect, useContext, useReducer, 
                   useCallback, useMemo, useRef } from 'react';
   
   // 用户上下文
   const UserContext = React.createContext();
   
   // Reducer 函数
   function reducer(state, action) {
     switch (action.type) {
       case 'increment':
         return { count: state.count + 1 };
       case 'decrement':
         return { count: state.count - 1 };
       default:
         throw new Error();
     }
   }
   
   function HooksDemo() {
     // useState 示例
     const [name, setName] = useState('小明');
     
     // useReducer 示例
     const [state, dispatch] = useReducer(reducer, { count: 0 });
     
     // useRef 示例
     const inputRef = useRef(null);
     
     // useContext 示例
     const user = useContext(UserContext);
     
     // useCallback 示例
     const handleClick = useCallback(() => {
       console.log('按钮被点击');
       dispatch({ type: 'increment' });
     }, []);
     
     // useMemo 示例
     const expensiveCalculation = useMemo(() => {
       console.log('执行复杂计算');
       return state.count * 100;
     }, [state.count]);
     
     // useEffect 示例
     useEffect(() => {
       document.title = `你点击了 ${state.count} 次`;
       
       // 清除副作用
       return () => {
         document.title = '应用';
       };
     }, [state.count]);
     
     return (
       <div>
         <p>你好，{name}</p>
         <p>计数: {state.count}</p>
         <p>计算结果: {expensiveCalculation}</p>
         <button onClick={handleClick}>增加</button>
         <button onClick={() => dispatch({ type: 'decrement' })}>减少</button>
         <button onClick={() => setName('小红')}>更改名称</button>
         <input ref={inputRef} />
         <button onClick={() => inputRef.current.focus()}>聚焦输入框</button>
       </div>
     );
   }
   ```
   
   **React Hooks 脑图：**
   
   ```mermaid
   mindmap
     root((React Hooks))
       状态Hooks
         useState
         useReducer
       副作用Hooks
         useEffect
         useLayoutEffect
       性能优化
         useMemo
         useCallback
       引用&上下文
         useRef
         useImperativeHandle
         useContext
       自定义Hooks
         抽象共用逻辑
         可组合
   ```

## 状态管理

7. **什么是 state？它与 props 有什么区别？**
   - **State**：
     - 组件内部的可变数据，由组件自身管理
     - 可以通过 `setState()` 或 `useState()` 更新
     - 状态更新可能是异步的
     - 可以根据用户交互或网络响应等改变
   - **Props**：
     - 从父组件传递给子组件的数据
     - 子组件不能修改（只读）
     - 父组件更新 props 会导致子组件重新渲染
     - 可以传递回调函数，让子组件与父组件通信
   
   ```jsx
   // Props 和 State 示例
   
   // 父组件
   function Parent() {
     // 这是 state
     const [count, setCount] = useState(0);
     
     // 处理子组件的回调
     const handleChildClick = () => {
       setCount(count + 1);
     };
     
     return (
       <div>
         <p>父组件计数: {count}</p>
         <button onClick={() => setCount(count + 1)}>
           在父组件增加
         </button>
         
         {/* 传递 props 给子组件 */}
         <Child count={count} onButtonClick={handleChildClick} />
       </div>
     );
   }
   
   // 子组件
   function Child(props) {
     return (
       <div style={{ margin: '20px', padding: '20px', border: '1px solid gray' }}>
         <p>从父组件接收的计数: {props.count}</p>
         <button onClick={props.onButtonClick}>
           从子组件增加父组件的计数
         </button>
       </div>
     );
   }
   ```
   
   **Props vs State 对比图：**
   
   ```mermaid
   classDiagram
     class Props {
       +从父组件接收
       +只读
       +外部传入
       +不可在组件内修改
     }
     
     class State {
       +组件内部维护
       +可变
       +组件自己管理
       +可通过setState/useState更新
     }
     
     Props --> Component : 传入
     Component --> State : 维护
   ```

8. **如何在 React 中进行状态提升？为什么需要状态提升？**
   - **状态提升**是指将共享状态提升到最近的共同父组件
   - **原因**：
     - 保持数据一致性
     - 便于多个组件共享和修改同一状态
     - 符合单向数据流原则
     - 避免组件间复杂的数据同步
   - **实现方式**：
     1. 将状态移动到父组件
     2. 父组件通过 props 将状态传给子组件
     3. 父组件创建修改状态的方法并传给子组件
     4. 子组件通过调用这些方法来"修改"状态
   
   ```jsx
   // 状态提升示例
   
   // 没有状态提升
   function ChildA() {
     const [value, setValue] = useState('');
     return <input value={value} onChange={(e) => setValue(e.target.value)} />;
   }
   
   function ChildB() {
     const [value, setValue] = useState('');
     return <input value={value} onChange={(e) => setValue(e.target.value)} />;
   }
   
   // 使用状态提升
   function Parent() {
     const [value, setValue] = useState('');
     
     return (
       <>
         <ChildA value={value} onChange={setValue} />
         <ChildB value={value} onChange={setValue} />
       </>
     );
   }
   
   function ChildA({ value, onChange }) {
     return <input value={value} onChange={(e) => onChange(e.target.value)} />;
   }
   
   function ChildB({ value, onChange }) {
     return <input value={value} onChange={(e) => onChange(e.target.value)} />;
   }
   ```
   
   **状态提升流程图：**
   
   ```mermaid
   flowchart TD
     A[共同父组件] -->|传递状态| B[子组件A]
     A -->|传递状态| C[子组件B]
     B -->|调用更新函数| D[父组件状态更新]
     C -->|调用更新函数| D
     D -->|触发重新渲染| A
   ```

9. **Redux 的核心原则是什么？它解决了什么问题？**
   - **核心原则**：
     - **单一数据源**：整个应用的状态存储在单个 store 的对象树中
     - **状态只读**：唯一改变状态的方法是触发 action
     - **使用纯函数进行修改**：通过 reducer 纯函数描述状态如何变化
   - **解决的问题**：
     - 管理复杂应用的状态
     - 实现可预测的状态管理
     - 处理组件间的数据共享
     - 简化状态同步
     - 实现时间旅行调试等高级功能
   
   ```jsx
   // Redux 示例
   import { createStore } from 'redux';
   import { Provider, useSelector, useDispatch } from 'react-redux';
   
   // 定义 action 类型
   const INCREMENT = 'INCREMENT';
   const DECREMENT = 'DECREMENT';
   
   // 定义 action 创建函数
   function increment() {
     return { type: INCREMENT };
   }
   
   function decrement() {
     return { type: DECREMENT };
   }
   
   // 定义 reducer
   function counterReducer(state = { count: 0 }, action) {
     switch (action.type) {
       case INCREMENT:
         return { count: state.count + 1 };
       case DECREMENT:
         return { count: state.count - 1 };
       default:
         return state;
     }
   }
   
   // 创建 store
   const store = createStore(counterReducer);
   
   // React 组件
   function Counter() {
     // 从 Redux store 获取状态
     const count = useSelector(state => state.count);
     // 获取 dispatch 函数
     const dispatch = useDispatch();
     
     return (
       <div>
         <p>计数: {count}</p>
         <button onClick={() => dispatch(increment())}>增加</button>
         <button onClick={() => dispatch(decrement())}>减少</button>
       </div>
     );
   }
   
   // 应用入口
   function App() {
     return (
       <Provider store={store}>
         <Counter />
       </Provider>
     );
   }
   ```
   
   **Redux 数据流流程图：**
   
   ```mermaid
   flowchart LR
     A[View/UI] -->|派发 Action| B[Action]
     B -->|传递给| C[Reducer]
     C -->|更新| D[Store]
     D -->|通知| A
   ```

## 性能优化

10. **React 中如何避免不必要的渲染？**
    - **使用 React.memo 包装函数组件**：
      - 仅当组件的 props 变化时才重新渲染
    - **在类组件中实现 shouldComponentUpdate**：
      - 自定义比较逻辑，决定是否重新渲染
    - **使用 PureComponent**：
      - 自动实现浅比较的 shouldComponentUpdate
    - **使用 useMemo 和 useCallback**：
      - 缓存计算结果和回调函数，避免重复创建
    - **虚拟化长列表**：
      - 只渲染可见部分，减少 DOM 节点
    
    ```jsx
    // 使用 React.memo
    const MemoizedComponent = React.memo(function MyComponent(props) {
      /* 渲染使用 props */
      return (
        <div>
          <p>Name: {props.name}</p>
        </div>
      );
    });
    
    // 类组件优化
    class OptimizedComponent extends React.Component {
      shouldComponentUpdate(nextProps, nextState) {
        // 只有当 name 改变时才重新渲染
        return this.props.name !== nextProps.name;
      }
      
      render() {
        return <div>Name: {this.props.name}</div>;
      }
    }
    
    // PureComponent 示例
    class PureComponentExample extends React.PureComponent {
      render() {
        return <div>Name: {this.props.name}</div>;
      }
    }
    
    // useMemo 和 useCallback 示例
    function OptimizedFunctionComponent({ data, onItemClick }) {
      // 缓存计算结果
      const processedData = React.useMemo(() => {
        console.log('处理数据');
        return data.map(item => item.toUpperCase());
      }, [data]); // 只有 data 改变时才重新计算
      
      // 缓存回调函数
      const handleClick = React.useCallback((id) => {
        console.log('项目被点击');
        onItemClick(id);
      }, [onItemClick]); // 只有 onItemClick 改变时才创建新函数
      
      return (
        <ul>
          {processedData.map((item, index) => (
            <li key={index} onClick={() => handleClick(index)}>
              {item}
            </li>
          ))}
        </ul>
      );
    }
    ```
    
    **性能优化决策流程图：**
    
    ```mermaid
    flowchart TD
      A[开始优化] --> B{是类组件还是函数组件?}
      B -->|类组件| C{简单或复杂比较?}
      C -->|简单比较| D[使用 PureComponent]
      C -->|复杂比较| E[实现 shouldComponentUpdate]
      
      B -->|函数组件| F{需要优化什么?}
      F -->|整个组件| G[使用 React.memo]
      F -->|计算结果| H[使用 useMemo]
      F -->|回调函数| I[使用 useCallback]
      F -->|长列表| J[使用虚拟滚动]
    ```

11. **什么是虚拟 DOM？它如何提高性能？**
    - **虚拟 DOM** 是内存中的 JavaScript 对象，代表真实 DOM 的轻量级副本
    - 通过批量更新和差异比较算法减少实际 DOM 操作，提高渲染效率
    - 主要优势：
      - **批量更新**：将多个 DOM 操作合并成一个，减少浏览器重绘和回流
      - **最小化 DOM 操作**：只更新发生变化的部分，而不是整个 DOM
      - **高效的差异比较**：使用高效的算法（如 React 的 Diff 算法）找出最小差异
   
   ```jsx
   // 虚拟 DOM 示例
   import React from 'react';
   
   function App() {
     const [count, setCount] = React.useState(0);
     
     return (
       <div>
         <h1>计数: {count}</h1>
         <button onClick={() => setCount(count + 1)}>增加</button>
       </div>
     );
   }
   
   // 虚拟 DOM 的实际操作流程
   // 1. 组件渲染 -> 生成虚拟 DOM (VDOM)
   // 2. 用户交互 -> 触发状态更新 -> 生成新的 VDOM
   // 3. React 比较新旧 VDOM -> 找出最小差异 (Diff)
   // 4. 只更新实际需要变化的 DOM 节点
   ```
   
   **虚拟 DOM 工作流程图：**
   
   ```mermaid
   flowchart TD
     A[组件渲染] --> B[生成虚拟DOM树]
     C[状态/属性变化] --> D[生成新的虚拟DOM树]
     B --> E[Diff算法比较差异]
     D --> E
     E --> F[计算最小DOM操作]
     F --> G[批量更新真实DOM]
   ```

12. **React Fiber 是什么？它解决了什么问题？**
    - **React Fiber** 是 React 16 中新的协调引擎
    - 解决了传统 React 的性能瓶颈，特别是大型应用中的渲染问题
    - 主要改进：
      - **任务优先级**：支持不同类型的任务（如布局、绘制、交互），优先处理高优先级任务
      - **可中断和恢复**：渲染过程可以被中断，以便处理更高优先级的工作
      - **增量渲染**：可以只渲染部分 UI，而不是一次性渲染整个树
      - **更好的错误处理**：提供更好的错误边界和错误恢复机制
   
   ```jsx
   // React Fiber 示例 - 使用并发模式
   import React from 'react';
   
   // 创建一个长列表渲染组件
   function SlowList({ count }) {
     const items = [];
     for (let i = 0; i < count; i++) {
       items.push(<SlowItem key={i} index={i} />);
     }
     return <ul>{items}</ul>;
   }
   
   function SlowItem({ index }) {
     // 人为延迟渲染过程
     let startTime = performance.now();
     while (performance.now() - startTime < 100) {
       // 模拟复杂计算
     }
     
     return <li>项目 {index}</li>;
   }
   
   // 使用 React.startTransition 包装低优先级更新
   function App() {
     const [count, setCount] = React.useState(100);
     const [isPending, startTransition] = React.useTransition();
     
     function handleClick() {
       // 使用 startTransition 标记为低优先级更新
       startTransition(() => {
         setCount(c => c + 100);
       });
     }
     
     return (
       <div>
         <button onClick={handleClick} disabled={isPending}>
           {isPending ? '加载中...' : '添加100项'}
         </button>
         <SlowList count={count} />
       </div>
     );
   }
   ```
   
   **React Fiber 架构图：**
   
   ```mermaid
   flowchart TD
     A[JavaScript主线程] --> B{工作循环}
     B -->|高优先级| C[用户交互任务]
     B -->|中优先级| D[网络请求回调]
     B -->|低优先级| E[React渲染]
     E --> F{检查时间片}
     F -->|还有剩余时间| G[继续渲染]
     F -->|时间片用完| H[暂停渲染]
     H --> I[返回控制权给主线程]
     I --> B
     G --> J[完成渲染]
     J --> K[提交变更到DOM]
   ```

## 路由与服务端渲染

13. **React Router 的主要组件有哪些？它们的作用是什么？**
    - **BrowserRouter/HashRouter**：
      - 路由容器，包裹整个应用，管理路由状态
      - 监听 URL 变化，匹配当前路由
    - **Route**：
      - 定义路径和对应组件的映射
      - 可以嵌套，匹配路径时渲染对应的组件
    - **Link/NavLink**：
      - 导航链接，用于在应用中跳转
      - NavLink 可以高亮当前激活的路由
    - **Switch**：
      - 独占路由匹配，当匹配到第一个符合条件的 Route 时停止
      - 避免多个 Route 同时匹配
    - **Navigate** (v6)：
      - 声明式导航重定向组件
      - 用于程序化地导航到其他路由
    - **Outlet** (v6)：
      - 在父路由中渲染子路由
      - 实现嵌套路由结构
   
   ```jsx
   // React Router v6 示例
   import React from 'react';
   import { BrowserRouter, Routes, Route, Link, Outlet, Navigate, useParams, useNavigate } from 'react-router-dom';
   
   function Home() {
     return <h2>首页</h2>;
   }
   
   function About() {
     return <h2>关于我们</h2>;
   }
   
   function Products() {
     return (
       <div>
         <h2>产品列表</h2>
         <nav>
           <Link to="product/1">产品 1</Link>
           <Link to="product/2">产品 2</Link>
         </nav>
         <Outlet /> {/* 子路由会渲染在这里 */}
       </div>
     );
   }
   
   function Product() {
     const { productId } = useParams();
     const navigate = useNavigate();
     
     return (
       <div>
         <h3>产品 {productId} 详情</h3>
         <button onClick={() => navigate(-1)}>返回</button>
       </div>
     );
   }
   
   function App() {
     return (
       <BrowserRouter>
         <div>
           <h1>React Router 示例</h1>
           <nav>
             <Link to="/">首页</Link>
             <Link to="/about">关于我们</Link>
             <Link to="/products">产品</Link>
           </nav>
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/about" element={<About />} />
             <Route path="/products" element={<Products />}>
               <Route path="product/:productId" element={<Product />} />
             </Route>
             <Route path="*" element={<Navigate to="/" replace />} />
           </Routes>
         </div>
       </BrowserRouter>
     );
   }
   ```
   
   **React Router 结构图：**
   
   ```mermaid
   mindmap
     root((React Router))
       路由容器
         BrowserRouter
         HashRouter
         MemoryRouter
       路由匹配
         Routes
         Route
       导航组件
         Link
         NavLink
         Navigate
       布局组件
         Outlet
       Hooks
         useParams
         useNavigate
         useLocation
         useRoutes
   ```

14. **什么是服务端渲染(SSR)？它有哪些优势？**
    - **SSR**：在服务器上渲染 React 组件，将 HTML 直接发送给客户端
    - 优势：
      - **更好的 SEO**：搜索引擎可以直接抓取渲染后的 HTML
      - **更快的首屏加载**：服务器可以直接发送 HTML，减少客户端请求
      - **更好的用户体验**：首屏加载更快，用户可以更快看到内容
      - **适合低性能设备**：减轻客户端渲染负担
      - **更好的社交媒体分享**：社交媒体可以获取页面元数据
   
   ```jsx
   // 使用 Express 和 React 实现基本的 SSR
   // server.js
   import express from 'express';
   import React from 'react';
   import { renderToString } from 'react-dom/server';
   import App from './App';
   
   const app = express();
   
   app.get('/', (req, res) => {
     // 在服务器渲染组件
     const html = renderToString(<App />);
     
     // 发送包含预渲染 HTML 的完整页面
     res.send(`
       <!DOCTYPE html>
       <html>
         <head>
           <title>React SSR</title>
         </head>
         <body>
           <div id="root">${html}</div>
           <script src="bundle.js"></script>
         </body>
       </html>
     `);
   });
   
   app.listen(3000, () => {
     console.log('服务器运行在 http://localhost:3000');
   });
   
   // App.js
   import React from 'react';
   
   function App() {
     return <h1>Hello from Server!</h1>;
   }
   
   export default App;
   ```
   
   **SSR vs CSR 流程图：**
   
   ```mermaid
   graph TD
     subgraph "服务器端渲染 (SSR)"
       A1[客户端请求] --> B1[服务器获取数据]
       B1 --> C1[服务器上渲染 React]
       C1 --> D1[生成 HTML]
       D1 --> E1[客户端接收 HTML]
       E1 --> F1[页面可见]
       F1 --> G1[JavaScript 加载]
       G1 --> H1[React 接管页面]
     end
     
     subgraph "客户端渲染 (CSR)"
       A2[客户端请求] --> B2[服务器发送基础 HTML]
       B2 --> C2[客户端接收 HTML]
       C2 --> D2[加载 JavaScript]
       D2 --> E2[React 初始化]
       E2 --> F2[获取数据]
       F2 --> G2[渲染页面]
       G2 --> H2[页面可见]
     end
   ```

15. **Next.js 的主要特性有哪些？**
    - **服务器端渲染 (SSR)**
      - 可以预渲染页面，提高首屏加载速度和 SEO
    - **静态站点生成 (SSG)**
      - 构建时预渲染页面，实现最快的加载速度
    - **自动代码分割**
      - 按需加载 JavaScript，减少初始加载体积
    - **文件系统路由**
      - 基于文件系统的路由，无需手动配置
    - **API 路由**
      - 可以在 Next.js 应用内创建 API 端点
    - **增量静态生成 (ISR)**
      - 在构建后更新静态页面
    - **内置图像优化**
      - 自动优化图像，提高性能
    - **国际化路由**
      - 支持多语言路由
   
   ```jsx
   // Next.js 基本页面示例
   // pages/index.js
   import { useState } from 'react';
   import Head from 'next/head';
   import Link from 'next/link';
   import Image from 'next/image';
   
   // 静态生成数据获取
   export async function getStaticProps() {
     // 调用外部 API 获取数据
     const res = await fetch('https://api.example.com/posts');
     const posts = await res.json();
     
     return {
       props: {
         posts,
       },
       // 每10秒重新生成页面（ISR）
       revalidate: 10,
     };
   }
   
   export default function Home({ posts }) {
     const [count, setCount] = useState(0);
     
     return (
       <div>
         <Head>
           <title>Next.js 示例</title>
           <meta name="description" content="Next.js 应用示例" />
         </Head>
         
         <main>
           <h1>欢迎使用 Next.js</h1>
           <p>计数: {count}</p>
           <button onClick={() => setCount(count + 1)}>增加</button>
           
           <h2>博客文章列表</h2>
           <ul>
             {posts.map((post) => (
               <li key={post.id}>
                 <Link href={`/posts/${post.id}`}>
                   <a>{post.title}</a>
                 </Link>
               </li>
             ))}
           </ul>
           
           <Image
             src="/images/profile.jpg"
             alt="个人头像"
             width={500}
             height={300}
             priority
           />
         </main>
       </div>
     );
   }
   ```
   
   **Next.js 架构脑图：**
   
   ```mermaid
   mindmap
     root((Next.js))
       渲染方式
         服务器端渲染(SSR)
         静态站点生成(SSG)
         增量静态再生(ISR)
         客户端渲染(CSR)
       路由
         文件系统路由
         动态路由
         嵌套路由
       数据获取
         getStaticProps
         getStaticPaths
         getServerSideProps
       优化
         自动代码分割
         图像优化
         字体优化
         脚本优化
       API功能
         API路由
         中间件
         国际化
   ```

## React 最新特性

16. **React 18 的主要新特性有哪些？**
    - **并发渲染（Concurrent Rendering）**
      - 允许 React 中断、暂停和恢复渲染工作
      - 使 UI 保持响应，即使在大量渲染的情况下
    - **自动批处理（Automatic Batching）**
      - 将多个状态更新自动合并为一次重新渲染
      - 提高应用性能，减少不必要的渲染
    - **过渡更新（Transitions）**
      - 将更新标记为非紧急，优先处理交互
      - 使用 `useTransition` 和 `startTransition`
    - **服务器组件（Server Components）**
      - 在服务器上渲染且不包含交互性的组件
      - 减少客户端 JavaScript 体积
    - **Suspense 改进**
      - 支持 SSR 和数据获取
      - 更好的错误处理和边界
   
   ```jsx
   // React 18 新特性示例
   import React, { useState, useTransition, Suspense } from 'react';
   
   // 模拟数据获取
   const fetchData = () => {
     return new Promise(resolve => {
       setTimeout(() => {
         resolve(['项目 1', '项目 2', '项目 3']);
       }, 2000);
     });
   };
   
   // 使用 Resource 模式包装数据获取
   function createResource() {
     let status = 'pending';
     let result;
     let suspender = fetchData().then(
       r => {
         status = 'success';
         result = r;
       },
       e => {
         status = 'error';
         result = e;
       }
     );
     
     return {
       read() {
         if (status === 'pending') {
           throw suspender;
         } else if (status === 'error') {
           throw result;
         } else if (status === 'success') {
           return result;
         }
       }
     };
   }
   
   const resource = createResource();
   
   function DataComponent() {
     const data = resource.read();
     
     return (
       <ul>
         {data.map((item, index) => (
           <li key={index}>{item}</li>
         ))}
       </ul>
     );
   }
   
   function App() {
     const [tab, setTab] = useState('home');
     const [isPending, startTransition] = useTransition();
     
     function selectTab(nextTab) {
       startTransition(() => {
         setTab(nextTab);
       });
     }
     
     return (
       <div>
         <button onClick={() => selectTab('home')}>首页</button>
         <button onClick={() => selectTab('data')}>数据</button>
         
         {isPending && <p>加载中...</p>}
         
         {tab === 'home' ? (
           <h1>欢迎回来</h1>
         ) : (
           <Suspense fallback={<p>加载数据...</p>}>
             <DataComponent />
           </Suspense>
         )}
       </div>
     );
   }
   ```
   
   **React 18 主要特性脑图：**
   
   ```mermaid
   mindmap
     root((React 18))
       并发特性
         useTransition
         useDeferredValue
         Suspense改进
       性能优化
         自动批处理
         选择性水合
       新API
         createRoot
         hydrateRoot
       服务器特性
         服务器组件
         Suspense for SSR
         流式SSR
       React DOM
         自动批处理
         flushSync API
   ```

17. **什么是 React 的并发模式（Concurrent Mode）？它有什么优势？**
    - **并发模式**是 React 的新渲染机制，允许中断、暂停和恢复渲染工作
    - **工作原理**：
      - 将渲染工作分解为小的工作单元（Fiber）
      - 根据优先级安排这些工作单元
      - 可以中断低优先级工作来处理高优先级工作
      - 完成后恢复之前的工作
    - **优势**：
      - 提高应用响应性：即使在复杂计算中也能响应用户输入
      - 实现复杂的 UI 更新而不阻塞用户输入
      - 避免渲染导致的卡顿
      - 提供更好的用户体验
   
   ```jsx
   // 并发模式示例：搜索过滤
   import React, { useState, useTransition, useDeferredValue } from 'react';
   
   // 模拟大型数据集
   const generateItems = () => {
     const items = [];
     for (let i = 0; i < 10000; i++) {
       items.push(`项目 ${i + 1}`);
     }
     return items;
   };
   
   const allItems = generateItems();
   
   function SearchResults({ query }) {
     // 人为延迟以模拟复杂计算
     let startTime = performance.now();
     while (performance.now() - startTime < 100) {
       // 模拟耗时操作
     }
     
     if (!query) return null;
     
     const filteredItems = allItems.filter(item => 
       item.toLowerCase().includes(query.toLowerCase())
     );
     
     return (
       <ul>
         {filteredItems.map(item => (
           <li key={item}>{item}</li>
         ))}
       </ul>
     );
   }
   
   function App() {
     const [query, setQuery] = useState('');
     const [isPending, startTransition] = useTransition();
     
     // 使用延迟值
     const deferredQuery = useDeferredValue(query);
     
     const handleChange = (e) => {
       // 立即更新输入框值（高优先级）
       setQuery(e.target.value);
       
       // 将搜索结果标记为低优先级更新
       // startTransition(() => {
       //   setQuery(e.target.value);
       // });
     };
     
     return (
       <div>
         <input
           type="text"
           value={query}
           onChange={handleChange}
           placeholder="搜索..."
         />
         {isPending ? <p>更新搜索结果...</p> : null}
         <SearchResults query={deferredQuery} />
       </div>
     );
   }
   ```
   
   **并发模式工作原理流程图：**
   
   ```mermaid
   flowchart TD
     A[用户输入] --> B[React接收更新]
     B --> C{是否为高优先级?}
     C -->|是| D[立即开始渲染]
     C -->|否| E[标记为低优先级]
     D --> F[渲染过程]
     E --> G[等待空闲时间]
     G --> F
     F --> H{有高优先级任务中断?}
     H -->|是| I[保存当前进度]
     I --> D
     H -->|否| J[完成渲染]
     J --> K[提交到DOM]
   ```

18. **React 18 中的 useTransition 和 useDeferredValue 有什么用途？**
    - **useTransition**：
      - 标记非紧急更新，允许其他紧急更新先进行处理
      - 返回一个状态标志和一个启动函数：`[isPending, startTransition]`
      - 适用于触发大规模更新的事件处理程序
    - **useDeferredValue**：
      - 为高消耗的值创建延迟版本，优先处理其他更新
      - 返回一个新的引用，可能"延后"于原始值
      - 适用于传递给复杂子组件树的值
    - **区别**：
      - `useTransition` 包装状态更新函数
      - `useDeferredValue` 包装值本身
   
   ```jsx
   // useTransition 示例
   function TabContainer() {
     const [tab, setTab] = useState('home');
     const [isPending, startTransition] = useTransition();
     
     function selectTab(nextTab) {
       startTransition(() => {
         setTab(nextTab);
       });
     }
     
     return (
       <div>
         <TabButton
           isActive={tab === 'home'}
           onClick={() => selectTab('home')}
         >
           首页
         </TabButton>
         <TabButton
           isActive={tab === 'posts'}
           onClick={() => selectTab('posts')}
         >
           文章
         </TabButton>
         
         {isPending ? (
           <p>加载中...</p>
         ) : (
           <div>
             {tab === 'home' && <HomeTab />}
             {tab === 'posts' && <PostsTab />}
           </div>
         )}
       </div>
     );
   }
   
   // useDeferredValue 示例
   function SearchPage() {
     const [query, setQuery] = useState('');
     // 创建延迟版本的query值
     const deferredQuery = useDeferredValue(query);
     
     // 检查是否正在使用延迟值
     const isStale = query !== deferredQuery;
     
     return (
       <div>
         <input
           value={query}
           onChange={e => setQuery(e.target.value)}
           placeholder="搜索..."
         />
         <div style={{
           opacity: isStale ? 0.7 : 1,
           transition: 'opacity 0.2s ease'
         }}>
           <SearchResults query={deferredQuery} />
         </div>
       </div>
     );
   }
   ```
   
   **useTransition vs useDeferredValue 对比图：**
   
   ```mermaid
   graph TD
     A[状态更新类型] --> B{直接控制更新?}
     B -->|是| C[useTransition]
     B -->|否| D[useDeferredValue]
     
     C --> E[适用场景]
     E --> F[按钮点击]
     E --> G[表单提交]
     E --> H[Tab切换]
     
     D --> I[适用场景]
     I --> J[搜索输入]
     I --> K[接收第三方库值]
     I --> L[无法修改更新源]
   ```

19. **什么是 React Server Components？它们有什么优势？**
    - **Server Components** 是在服务器上渲染且不包含交互性的组件
    - 优势：
      - 减少客户端 JavaScript 体积
      - 直接访问服务器资源
      - 自动代码分割
      - 更好的性能和用户体验
      - 新的数据获取和状态管理模式
    - **工作原理**：
      - 在服务器上执行初始渲染
      - 将渲染结果作为数据传输到客户端
      - 客户端组件可以"插入"交互元素
   
   ```jsx
   // React Server Components 示例
   // 服务器组件 - ServerComponent.server.jsx
   import { db } from './database';
   import { ClientComponent } from './ClientComponent.client';
   
   async function ServerComponent({ id }) {
     // 直接访问服务器资源（例如数据库）
     // 在服务器组件中，可以使用异步/await
     const data = await db.user.findUnique({ where: { id } });
     
     return (
       <div>
         <h1>{data.name} 的个人资料</h1>
         <p>邮箱: {data.email}</p>
         
         {/* 客户端组件处理交互性 */}
         <ClientComponent userId={id} />
       </div>
     );
   }
   
   // 客户端组件 - ClientComponent.client.jsx
   'use client';
   
   import { useState } from 'react';
   
   export function ClientComponent({ userId }) {
     const [liked, setLiked] = useState(false);
     
     return (
       <div>
         <button onClick={() => setLiked(!liked)}>
           {liked ? '已点赞' : '点赞'}
         </button>
       </div>
     );
   }
   
   // 应用入口
   function App({ userId }) {
     return (
       <div>
         <h1>用户应用</h1>
         <Suspense fallback={<div>加载中...</div>}>
           <ServerComponent id={userId} />
         </Suspense>
       </div>
     );
   }
   ```
   
   **Server Components vs Client Components 对比图：**
   
   ```mermaid
   flowchart TD
     A[服务器组件] -->|渲染在| B[服务器]
     C[客户端组件] -->|渲染在| D[浏览器]
     B -->|渲染结果发送到| D
     
     subgraph 服务器组件优势
     E[直接访问后端资源]
     F[零JS包大小]
     G[自动代码分割]
     H[隐藏敏感逻辑]
     end
     
     subgraph 客户端组件优势
     I[交互性]
     J[使用浏览器API]
     K[使用状态和生命周期]
     L[使用事件处理]
     end
   ```

20. **React 18 中的 Suspense 有哪些改进？**
    - **支持服务端渲染**
      - 在 React 18 之前，Suspense 在 SSR 中不起作用
      - 现在可以在 SSR 中使用 Suspense，实现流式渲染
    - **与 Transition API 集成**
      - 更好地处理加载状态和用户体验
    - **支持数据获取和代码分割**
      - 可以处理多种异步场景
    - **改进的错误处理**
      - 与错误边界更好地集成
   
   ```jsx
   // React 18 Suspense 改进示例
   import React, { Suspense, lazy, useState, useTransition } from 'react';
   
   // 懒加载组件
   const HeavyComponent = lazy(() => import('./HeavyComponent'));
   
   // 数据获取
   const fetchData = () => {
     return new Promise(resolve => {
       setTimeout(() => {
         resolve({ name: '张三', age: 28 });
       }, 1000);
     });
   };
   
   // 使用资源模式
   function createResource() {
     let resource = null;
     return () => {
       if (resource === null) {
         resource = fetchData().then(data => ({
           data,
           status: 'success'
         })).catch(error => ({
           error,
           status: 'error'
         }));
       }
       
       const cachedResource = resource;
       throw cachedResource;
     };
   }
   
   const getUserData = createResource();
   
   function UserData() {
     const data = getUserData();
     return (
       <div>
         <h2>用户数据</h2>
         <p>姓名: {data.name}</p>
         <p>年龄: {data.age}</p>
       </div>
     );
   }
   
   function App() {
     const [tab, setTab] = useState('home');
     const [isPending, startTransition] = useTransition();
     
     function handleTabClick(nextTab) {
       startTransition(() => {
         setTab(nextTab);
       });
     }
     
     return (
       <div>
         <nav>
           <button onClick={() => handleTabClick('home')}>首页</button>
           <button onClick={() => handleTabClick('profile')}>个人资料</button>
           <button onClick={() => handleTabClick('heavy')}>重量级组件</button>
         </nav>
         
         {isPending && <p>正在切换...</p>}
         
         <div style={{ opacity: isPending ? 0.7 : 1 }}>
           {tab === 'home' && <h1>首页内容</h1>}
           
           {tab === 'profile' && (
             <Suspense fallback={<p>加载个人资料中...</p>}>
               <UserData />
             </Suspense>
           )}
           
           {tab === 'heavy' && (
             <Suspense fallback={<p>加载组件中...</p>}>
               <HeavyComponent />
             </Suspense>
           )}
         </div>
       </div>
     );
   }
   ```
   
   **React 18 Suspense 改进流程图：**
   
   ```mermaid
   flowchart TD
     A[请求页面] -->|SSR| B[初始HTML]
     B -->|包含Suspense边界| C[流式传输HTML]
     C -->|优先渲染可用内容| D[显示初始界面]
     D -->|加载JS| E[React接管页面]
     E -->|使用Transition| F[避免不必要的加载提示]
     F -->|数据可用| G[显示完整内容]
     
     H[Suspense] -->|SSR| I[流式渲染]
     H -->|客户端| J[代码分割]
     H -->|数据获取| K[异步数据]
     H -->|过渡| L[useTransition]
   ```

## React 与 Vue 对比

21. **React 和 Vue 在核心理念上有什么区别？**
    - **React**：
      - 强调函数式编程理念
      - JSX 作为模板系统，一切皆 JavaScript
      - 单向数据流
      - 显式状态管理
      - 更偏向于"库"而非"框架"，提供更多灵活性
    - **Vue**：
      - 结合响应式和组件化的系统
      - 模板语法（HTML 扩展），分离关注点
      - 双向绑定选项（v-model）
      - 自动依赖追踪
      - 更偏向于"框架"，提供更多约定和内置功能
   
   ```jsx
   // React 示例
   function Counter() {
     const [count, setCount] = React.useState(0);
     
     return (
       <div>
         <p>计数: {count}</p>
         <button onClick={() => setCount(count + 1)}>增加</button>
       </div>
     );
   }
   
   // Vue 示例
   /* 
   <template>
     <div>
       <p>计数: {{ count }}</p>
       <button @click="count++">增加</button>
     </div>
   </template>
   
   <script>
   export default {
     data() {
       return {
         count: 0
       };
     }
   }
   </script>
   */
   
   // Vue 3 Composition API 示例
   /*
   <template>
     <div>
       <p>计数: {{ count }}</p>
       <button @click="count++">增加</button>
     </div>
   </template>
   
   <script setup>
   import { ref } from 'vue';
   
   const count = ref(0);
   </script>
   */
   ```

22. **React 和 Vue 的组件系统有什么不同？**
    - **React**：
      - 使用 JSX 表达式，一切皆 JavaScript
      - 组件逻辑和 UI 在同一文件的同一部分
      - 组件是纯 JavaScript 函数或类
      - Props 和 Children 作为组件输入
      - 使用 PropTypes 或 TypeScript 进行类型检查
    - **Vue**：
      - 模板语法（HTML 扩展），单文件组件（.vue 文件）
      - 模板、脚本和样式分离
      - 提供特定的指令如 v-if、v-for 等
      - Props、Events 和 Slots 作为组件通信方式
      - 内置模板类型检查
   
   ```jsx
   // React 组件示例
   function UserCard({ name, email, children }) {
     return (
       <div className="user-card">
         <h3>{name}</h3>
         <p>{email}</p>
         <div className="content">{children}</div>
       </div>
     );
   }
   
   // 使用组件
   function App() {
     return (
       <UserCard name="张三" email="zhangsan@example.com">
         <p>这是子内容</p>
       </UserCard>
     );
   }
   
   // Vue 组件示例
   /*
   <!-- UserCard.vue -->
   <template>
     <div class="user-card">
       <h3>{{ name }}</h3>
       <p>{{ email }}</p>
       <div class="content">
         <slot></slot>
       </div>
     </div>
   </template>
   
   <script>
   export default {
     props: {
       name: String,
       email: String
     }
   }
   </script>
   
   <!-- 使用组件 -->
   <template>
     <UserCard name="张三" email="zhangsan@example.com">
       <p>这是子内容</p>
     </UserCard>
   </template>
   */
   ```
   
   **React vs Vue 组件系统对比：**
   
   ```mermaid
   classDiagram
     class React组件 {
       +JSX模板
       +JavaScript逻辑
       +CSS-in-JS
       +props输入
       +children插槽
     }
     
     class Vue组件 {
       +HTML模板
       +JavaScript逻辑
       +Scoped CSS
       +props输入
       +事件输出
       +slots插槽
     }
   ```

23. **React 和 Vue 在状态管理方面有什么区别？**
    - **React**：
      - 内置状态管理：useState、useReducer
      - 全局状态管理：Context API
      - 第三方库：Redux、MobX、Recoil、Zustand
      - 手动处理状态更新，明确的 action 和 dispatch
      - 通常使用不可变数据结构
    - **Vue**：
      - Vue 2：内置响应式系统 + data 对象
      - Vue 3：Composition API + reactive/ref
      - 全局状态管理：Vuex（Vue 2）/ Pinia（Vue 3）
      - 自动依赖跟踪和组件更新
      - 响应式系统允许直接修改状态
   
   ```jsx
   // React 状态管理示例 - 使用 Context + useReducer
   import React, { createContext, useContext, useReducer } from 'react';
   
   // 创建 Context
   const CounterContext = createContext();
   
   // Reducer 函数
   function counterReducer(state, action) {
     switch (action.type) {
       case 'increment':
         return { count: state.count + 1 };
       case 'decrement':
         return { count: state.count - 1 };
       default:
         return state;
     }
   }
   
   // 提供者组件
   function CounterProvider({ children }) {
     const [state, dispatch] = useReducer(counterReducer, { count: 0 });
     
     return (
       <CounterContext.Provider value={{ state, dispatch }}>
         {children}
       </CounterContext.Provider>
     );
   }
   
   // 使用 Context 的组件
   function Counter() {
     const { state, dispatch } = useContext(CounterContext);
     
     return (
       <div>
         <p>计数: {state.count}</p>
         <button onClick={() => dispatch({ type: 'increment' })}>增加</button>
         <button onClick={() => dispatch({ type: 'decrement' })}>减少</button>
       </div>
     );
   }
   
   // 应用
   function App() {
     return (
       <CounterProvider>
         <Counter />
       </CounterProvider>
     );
   }
   
   // Vue 状态管理示例 - 使用 Pinia
   /*
   // store.js
   import { defineStore } from 'pinia';
   
   export const useCounterStore = defineStore('counter', {
     state: () => ({
       count: 0
     }),
     actions: {
       increment() {
         this.count++;
       },
       decrement() {
         this.count--;
       }
     }
   });
   
   // Counter.vue
   <template>
     <div>
       <p>计数: {{ counter.count }}</p>
       <button @click="counter.increment()">增加</button>
       <button @click="counter.decrement()">减少</button>
     </div>
   </template>
   
   <script setup>
   import { useCounterStore } from './store';
   
   const counter = useCounterStore();
   </script>
   */
   ```
   
   **React vs Vue 状态管理流程图：**
   
   ```mermaid
   flowchart TD
     subgraph React
     A1[组件] -->|Dispatch Action| B1[Reducer]
     B1 -->|更新状态| C1[Store/Context]
     C1 -->|触发重新渲染| A1
     end
     
     subgraph Vue
     A2[组件] -->|直接修改| B2[响应式状态]
     B2 -->|通过依赖追踪自动更新| A2
     end
   ```

24. **React 和 Vue 在性能方面有什么差异？**
    - **React**：
      - 使用虚拟 DOM
      - 强调不可变数据和单向数据流
      - 需要手动优化（React.memo, useCallback, useMemo）
      - Fiber 架构支持时间分片和优先级
      - 更精细的控制何时重新渲染
    - **Vue**：
      - 使用虚拟 DOM + 响应式系统
      - 自动追踪依赖关系，精确知道哪些组件需要重新渲染
      - 更少需要手动优化
      - 编译时优化，如静态树提升、静态属性提升
      - 更自动化的性能优化策略
   
   ```jsx
   // React 性能优化示例
   import React, { useState, useMemo, useCallback } from 'react';
   
   function ExpensiveComponent({ data, onItemClick }) {
     console.log('ExpensiveComponent 重新渲染');
     
     return (
       <ul>
         {data.map(item => (
           <li key={item.id} onClick={() => onItemClick(item.id)}>
             {item.name}
           </li>
         ))}
       </ul>
     );
   }
   
   // 优化后的组件
   const MemoizedExpensiveComponent = React.memo(ExpensiveComponent);
   
   function App() {
     const [count, setCount] = useState(0);
     const [items] = useState([
       { id: 1, name: '项目 1' },
       { id: 2, name: '项目 2' },
       { id: 3, name: '项目 3' }
     ]);
     
     // 使用 useMemo 缓存计算结果
     const processedData = useMemo(() => {
       console.log('处理数据');
       return items.map(item => ({
         ...item,
         name: item.name.toUpperCase()
       }));
     }, [items]);
     
     // 使用 useCallback 缓存回调函数
     const handleItemClick = useCallback(id => {
       console.log('项目被点击:', id);
     }, []);
     
     return (
       <div>
         <p>计数: {count}</p>
         <button onClick={() => setCount(count + 1)}>增加</button>
         <MemoizedExpensiveComponent 
           data={processedData} 
           onItemClick={handleItemClick} 
         />
       </div>
     );
   }
   
   // Vue 性能优化示例
   /*
   <template>
     <div>
       <p>计数: {{ count }}</p>
       <button @click="count++">增加</button>
       <ExpensiveComponent 
         :data="processedData" 
         @item-click="handleItemClick" 
       />
     </div>
   </template>
   
   <script>
   import { ref, computed } from 'vue';
   import ExpensiveComponent from './ExpensiveComponent.vue';
   
   export default {
     components: { ExpensiveComponent },
     setup() {
       const count = ref(0);
       const items = ref([
         { id: 1, name: '项目 1' },
         { id: 2, name: '项目 2' },
         { id: 3, name: '项目 3' }
       ]);
       
       // Vue 自动缓存计算结果
       const processedData = computed(() => {
         console.log('处理数据');
         return items.value.map(item => ({
           ...item,
           name: item.name.toUpperCase()
         }));
       });
       
       function handleItemClick(id) {
         console.log('项目被点击:', id);
       }
       
       return {
         count,
         processedData,
         handleItemClick
       };
     }
   };
   </script>
   */
   ```

25. **React 和 Vue 的学习曲线有什么不同？**
    - **React**：
      - 需要深入理解 JavaScript，特别是 ES6+ 特性
      - JSX 语法需要适应（混合 HTML 和 JS）
      - 函数式编程思想（纯函数、不可变性）
      - 更多的自由度意味着更多的决策（状态管理、路由、样式方案等）
      - 社区解决方案丰富，但需要自己选择和组合
    - **Vue**：
      - 入门门槛较低，模板语法接近 HTML
      - 框架提供了更多的约定和指导
      - 官方生态系统更加统一（Vue Router, Vuex/Pinia）
      - 单文件组件（.vue）结构直观，分离关注点
      - API 设计直观，概念上更接近传统网页开发
   
   **React vs Vue 学习路径对比：**
   
   ```mermaid
   gantt
     title 框架学习曲线
     dateFormat X
     axisFormat %L
     section React
     基础语法      :0, 2
     JSX          :1, 3
     组件状态      :2, 4
     Hooks        :3, 6
     上下文和状态管理 :5, 8
     性能优化      :7, 10
     
     section Vue
     基础语法      :0, 2
     模板指令      :1, 3
     组件系统      :2, 4
     Composition API :3, 5
     状态管理      :4, 6
     性能优化      :5, 7
   ```
   
   **React vs Vue 总体对比：**
   
   | 特性 | React | Vue |
   |------|-------|-----|
   | 模板系统 | JSX | HTML模板语法 |
   | 状态管理 | useState/useReducer + Context | Reactive/Ref + Pinia |
   | 组件通信 | Props + Context | Props + Events + Provide/Inject |
   | 学习曲线 | 较陡 | 较平缓 |
   | 灵活性 | 非常高 | 中等 |
   | 生态系统 | 丰富但分散 | 集中且官方主导 |
   | 适用场景 | 大型应用、复杂UI、团队自由度高 | 快速开发、中小应用、清晰约定 |

## 高级概念与模式

26. **什么是 React 中的高阶组件(HOC)？它们解决什么问题？**
    - **HOC** 是接收一个组件并返回一个新组件的函数
    - 用途：
      - 代码复用
      - 逻辑抽象
      - 状态抽象
      - props 操作
   
   ```jsx
   // HOC 示例
   import React from 'react';
   
   function withLogger(Component) {
     return function WrappedComponent(props) {
       console.log('HOC 包裹组件');
       return <Component {...props} />;
     };
   }
   
   function Welcome(props) {
     return <h1>你好, {props.name}</h1>;
   }
   
   const LoggedWelcome = withLogger(Welcome);
   ```

27. **什么是 React 中的 Render Props 模式？它与 HOC 有什么区别？**
    - **Render Props**：通过 prop 传递一个渲染函数给组件
    - 区别：
      - HOC 使用组合
      - Render Props 使用 props 传递函数
   
   ```jsx
   // Render Props 示例
   import React from 'react';
   
   function DataSource(props) {
     return (
       <div>
         <h2>数据源</h2>
         {props.renderData()}
       </div>
     );
   }
   
   function App() {
     return (
       <DataSource
         renderData={() => (
           <div>
             <p>从数据源获取的数据</p>
             <p>这是一个 Render Props 示例</p>
           </div>
         )}
       />
     );
   }
   ```

28. **什么是 React 中的受控组件和非受控组件？**
    - **受控组件**：表单数据由 React 组件控制
    - **非受控组件**：表单数据由 DOM 自身控制，通过 ref 获取值
   
   ```jsx
   // 受控组件和非受控组件示例
   import React, { useState } from 'react';
   
   function ControlledInput() {
     const [value, setValue] = useState('');
     
     return (
       <input
         type="text"
         value={value}
         onChange={(e) => setValue(e.target.value)}
       />
     );
   }
   
   function UncontrolledInput() {
     const inputRef = React.useRef(null);
     
     return (
       <input
         type="text"
         ref={inputRef}
       />
     );
   }
   ```

29. **什么是 React 中的错误边界(Error Boundaries)？如何实现？**
    - **错误边界**：捕获子组件树中的 JavaScript 错误并记录错误
    - 实现：
      - 通过 `getDerivedStateFromError` 和 `componentDidCatch` 生命周期方法
      - 可以捕获渲染、生命周期方法、构造函数中的错误
   
   ```jsx
   // 错误边界示例
   import React from 'react';
   
   class ErrorBoundary extends React.Component {
     constructor(props) {
       super(props);
       this.state = { hasError: false };
     }
     
     static getDerivedStateFromError(error) {
       return { hasError: true };
     }
     
     componentDidCatch(error, errorInfo) {
       console.error('捕获到错误:', error);
       console.error('错误信息:', errorInfo);
     }
     
     render() {
       if (this.state.hasError) {
         return <h1>Something went wrong.</h1>;
       }
       return this.props.children;
     }
   }
   
   function App() {
     return (
       <ErrorBoundary>
         <h1>应用内容</h1>
         <p>这里可能会抛出错误</p>
         <button onClick={() => { throw new Error('模拟错误'); }}>
           触发错误
         </button>
       </ErrorBoundary>
     );
   }
   ```

30. **React 中的 Context API 是什么？它解决了什么问题？**
    - **Context**：提供一种在组件树中共享值的方式，无需显式通过 props 传递
    - 解决：
      - `prop drilling`（属性钻取）问题
      - 避免在多个层级组件中传递相同的 props
      - 使组件树中的组件能够访问共享数据
   
   ```jsx
   // Context API 示例
   import React, { createContext, useContext } from 'react';
   
   const ThemeContext = createContext('light');
   
   function App() {
     return (
       <ThemeContext.Provider value="dark">
         <Header />
         <Content />
       </ThemeContext.Provider>
     );
   }
   
   function Header() {
     const theme = useContext(ThemeContext);
     return <h1>当前主题: {theme}</h1>;
   }
   
   function Content() {
     const theme = useContext(ThemeContext);
     return <p>内容区域，主题: {theme}</p>;
   }
   ```

## React 生态系统

31. **React 生态中常用的状态管理库有哪些？它们的特点是什么？**
    - **Redux**：
      - 可预测的状态容器
      - 中心化状态管理
      - 使用纯函数进行状态修改
    - **MobX**：
      - 响应式状态管理
      - 使用可观察对象（Observables）
      - 更简单的 API
    - **Recoil**：
      - Facebook 推出的原子化状态管理库
      - 使用原子化状态，易于理解和维护
    - **Zustand**：
      - 极简的状态管理库
      - 使用 hooks API
      - 轻量级，易于集成
   
   ```jsx
   // 状态管理库示例
   import React from 'react';
   import { Provider, useSelector, useDispatch } from 'react-redux';
   import { createStore } from 'redux';
   
   // Redux 示例
   const INCREMENT = 'INCREMENT';
   const DECREMENT = 'DECREMENT';
   
   function increment() {
     return { type: INCREMENT };
   }
   
   function decrement() {
     return { type: DECREMENT };
   }
   
   function counterReducer(state = { count: 0 }, action) {
     switch (action.type) {
       case INCREMENT:
         return { count: state.count + 1 };
       case DECREMENT:
         return { count: state.count - 1 };
       default:
         return state;
     }
   }
   
   const store = createStore(counterReducer);
   
   function Counter() {
     const count = useSelector(state => state.count);
     const dispatch = useDispatch();
     
     return (
       <div>
         <p>计数: {count}</p>
         <button onClick={() => dispatch(increment())}>增加</button>
         <button onClick={() => dispatch(decrement())}>减少</button>
       </div>
     );
   }
   
   function App() {
     return (
       <Provider store={store}>
         <Counter />
       </Provider>
     );
   }
   
   // MobX 示例
   import React from 'react';
   import { useObserver } from 'mobx-react';
   import { observable, action } from 'mobx';
   
   const counterStore = observable({
     count: 0,
     increment: action(() => {
       counterStore.count++;
     }),
     decrement: action(() => {
       counterStore.count--;
     }),
   });
   
   function Counter() {
     return useObserver(() => (
       <div>
         <p>计数: {counterStore.count}</p>
         <button onClick={counterStore.increment}>增加</button>
         <button onClick={counterStore.decrement}>减少</button>
       </div>
     ));
   }
   
   function App() {
     return <Counter />;
   }
   
   // Recoil 示例
   import React from 'react';
   import { useRecoilState } from 'recoil';
   
   const countState = atom({
     key: 'countState',
     default: 0,
   });
   
   function Counter() {
     const [count, setCount] = useRecoilState(countState);
     
     return (
       <div>
         <p>计数: {count}</p>
         <button onClick={() => setCount(count + 1)}>增加</button>
         <button onClick={() => setCount(count - 1)}>减少</button>
       </div>
     );
   }
   
   function App() {
     return <Counter />;
   }
   
   // Zustand 示例
   import React from 'react';
   import { useStore } from './store'; // 假设 store.js 文件
   
   function Counter() {
     const { count, increment, decrement } = useStore();
     
     return (
       <div>
         <p>计数: {count}</p>
         <button onClick={increment}>增加</button>
         <button onClick={decrement}>减少</button>
       </div>
     );
   }
   
   function App() {
     return <Counter />;
   }
   ```

32. **React 中常用的 UI 组件库有哪些？**
    - **Material-UI (现在的 MUI)**：
      - 基于 Material Design
      - 提供大量预构建的组件
      - 高度可定制
    - **Ant Design**：
      - 企业级 UI 设计语言
      - 提供完整的组件库
      - 支持国际化
    - **Chakra UI**：
      - 简单、模块化、可访问性强的组件库
      - 使用 Chakra UI 的组件
    - **Tailwind CSS + Headless UI**：
      - 实用优先的 CSS 框架
      - 无样式 UI 组件
      - 灵活性高
   
   ```jsx
   // UI 组件库示例
   import React from 'react';
   import { Button, Text, Box } from '@chakra-ui/react';
   
   function App() {
     return (
       <Box p={5}>
         <Text fontSize="2xl">Chakra UI 示例</Text>
         <Button colorScheme="teal" size="md" mt={4}>
           点击我
         </Button>
       </Box>
     );
   }
   ```

33. **什么是 React Query？它解决了什么问题？**
    - **React Query** 是用于数据获取、缓存和状态管理的库
    - 解决：
      - 服务器状态管理
      - 缓存
      - 数据同步
      - 加载和错误状态
   
   ```jsx
   // React Query 示例
   import React from 'react';
   import { useQuery } from 'react-query';
   
   function DataFetching() {
     const { data, error, isLoading } = useQuery('todos', () =>
       fetch('https://jsonplaceholder.typicode.com/todos/1').then(res =>
         res.json()
       )
     );
     
     if (isLoading) return <div>加载中...</div>;
     if (error) return <div>加载失败: {error.message}</div>;
     
     return <div>数据: {JSON.stringify(data)}</div>;
   }
   
   function App() {
     return <DataFetching />;
   }
   ```

34. **React Testing Library 的核心理念是什么？它与 Enzyme 有什么区别？**
    - **核心理念**：测试应该接近用户使用应用的方式
    - 区别：
      - Enzyme 关注实现细节
      - React Testing Library 关注用户行为
   
   ```jsx
   // React Testing Library 示例
   import React from 'react';
   import { render, screen } from '@testing-library/react';
   
   function App() {
     return <h1>Hello, World!</h1>;
   }
   
   test('renders a heading', () => {
     render(<App />);
     const heading = screen.getByRole('heading', { level: 1 });
     expect(heading).toHaveTextContent('Hello, World!');
   });
   ```

35. **React Native 与 React 有什么关系和区别？**
    - **关系**：都使用相同的设计理念和核心库
    - **区别**：
      - React 用于 Web 应用
      - React Native 用于移动应用
      - 渲染器不同（Web 使用 DOM，React Native 使用原生组件）
   
   ```jsx
   // React Native 示例
   import React from 'react';
   import { Text, View, StyleSheet } from 'react-native';
   
   function App() {
     return (
       <View style={styles.container}>
         <Text style={styles.text}>Hello, React Native!</Text>
       </View>
     );
   }
   
   const styles = StyleSheet.create({
     container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#f0f0f0',
     },
     text: {
       fontSize: 20,
       color: '#333',
     },
   });
   ```

## React 性能优化进阶

36. **什么是代码分割？如何在 React 中实现？**
    - **代码分割**：将代码分成小块，按需加载
    - 实现：
      - 使用动态 `import()`
      - 使用 `React.lazy` 和 `Suspense`
      - 基于路由的代码分割
      - 基于组件的代码分割
   
   ```jsx
   // 代码分割示例
   import React, { lazy, Suspense } from 'react';
   
   const OtherComponent = lazy(() => import('./OtherComponent'));
   
   function App() {
     return (
       <Suspense fallback={<div>加载中...</div>}>
         <OtherComponent />
       </Suspense>
     );
   }
   ```

37. **如何处理 React 应用中的大型列表渲染问题？**
    - **虚拟滚动**：只渲染可视区域内的元素
    - 使用库：`react-window`、`react-virtualized`
    - 分页加载：限制一次显示的数据量
   
   ```jsx
   // 虚拟滚动示例
   import React, { useEffect, useRef, useState } from 'react';
   import { FixedSizeList as List } from 'react-window';
   
   function Row({ index, style }) {
     return (
       <div style={style}>
         Item {index}
       </div>
     );
   }
   
   function App() {
     const [items, setItems] = useState(Array.from({ length: 1000 }));
     const listRef = useRef(null);
     
     useEffect(() => {
       const observer = new IntersectionObserver(
         (entries) => {
           if (entries[0].isIntersecting) {
             // 当列表底部可见时，加载更多数据
             setItems(prev => [...prev, ...Array.from({ length: 10 })]);
           }
         },
         { threshold: 0.5 } // 当元素可见 50% 时触发
       );
       
       if (listRef.current) {
         observer.observe(listRef.current);
       }
       
       return () => {
         if (listRef.current) {
           observer.unobserve(listRef.current);
         }
         observer.disconnect();
       };
     }, []);
     
     return (
       <div style={{ height: '300px', width: '100%', border: '1px solid #ccc' }}>
         <List
           height={300}
           itemCount={items.length}
           itemSize={35}
           width={300}
         >
           {({ index, style }) => <Row key={index} index={index} style={style} />}
         </List>
         <div ref={listRef} style={{ height: '10px' }}></div>
       </div>
     );
   }
   ```

38. **如何优化 React Context 的性能？**
    - **分割 Context**：根据不同的更新频率
    - 使用 `React.memo`：避免不必要的重新渲染
    - 优化 `Provider` 值：避免每次渲染创建新对象
   
   ```jsx
   // Context 性能优化示例
   import React, { createContext, useContext, useMemo } from 'react';
   
   const ThemeContext = createContext('light');
   
   function App() {
     const theme = useMemo(() => 'dark', []); // 模拟一个缓慢的计算
     
     return (
       <ThemeContext.Provider value={theme}>
         <Header />
         <Content />
       </ThemeContext.Provider>
     );
   }
   
   function Header() {
     const theme = useContext(ThemeContext);
     return <h1>当前主题: {theme}</h1>;
   }
   
   function Content() {
     const theme = useContext(ThemeContext);
     return <p>内容区域，主题: {theme}</p>;
   }
   ```

39. **什么是 React 的严格模式？它有什么作用？**
    - **严格模式**：一个开发工具，用于突出显示应用中潜在问题
    - 作用：
      - 识别不安全的生命周期
      - 检测过时 API
      - 警告副作用
      - 帮助发现潜在问题
   
   ```jsx
   // 严格模式示例
   import React from 'react';
   
   function App() {
     return (
       <React.StrictMode>
         <div>
           <h1>React 严格模式</h1>
           <p>这里会触发警告，因为组件构造函数在开发环境中会执行两次。</p>
           <Counter />
         </div>
       </React.StrictMode>
     );
   }
   
   function Counter() {
     const [count, setCount] = React.useState(0);
     
     return (
       <div>
         <p>计数: {count}</p>
         <button onClick={() => setCount(count + 1)}>增加</button>
       </div>
     );
   }
   ```

40. **如何优化 React 应用的首屏加载性能？**
    - 代码分割和懒加载
    - 预渲染或服务端渲染
    - 图片优化和资源压缩
    - 缓存策略

## React 最佳实践

41. **什么是 React 中的状态归一化？为什么它很重要？**
    - **状态归一化**：将嵌套数据结构扁平化，避免数据重复
    - 重要性：
      - 简化状态更新
      - 提高性能
      - 避免不一致
   
   ```jsx
   // 状态归一化示例
   import React, { useState } from 'react';
   
   function App() {
     const [user, setUser] = useState({
       name: '小明',
       address: {
         city: '北京',
         street: '朝阳区',
       },
     });
     
     const handleNameChange = (e) => {
       setUser(prev => ({ ...prev, name: e.target.value }));
     };
     
     const handleCityChange = (e) => {
       setUser(prev => ({
         ...prev,
         address: { ...prev.address, city: e.target.value },
       }));
     };
     
     return (
       <div>
         <h2>用户信息</h2>
         <input
           type="text"
           value={user.name}
           onChange={handleNameChange}
         />
         <input
           type="text"
           value={user.address.city}
           onChange={handleCityChange}
         />
         <p>完整用户信息: {JSON.stringify(user)}</p>
       </div>
     );
   }
   ```

42. **如何处理 React 应用中的认证和授权？**
    - 使用 Context API 存储认证状态
    - 实现受保护的路由
    - 使用 JWT 或其他令牌机制
    - 处理令牌刷新和会话过期

43. **如何实现 React 组件的动态导入和代码分割？**
    - 使用 React.lazy 和 Suspense
    - 基于路由的代码分割
    - 基于组件的代码分割

44. **如何处理 React 应用中的表单验证？**
    - 使用库：Formik、React Hook Form
    - 自定义验证逻辑
    - 显示错误消息和验证状态

45. **React 中如何实现无限滚动？**
    - 监听滚动事件
    - 使用 Intersection Observer API
    - 实现数据分页加载
    - 使用库：react-infinite-scroll-component

## React 未来展望

46. **React 团队对函数式组件的态度是什么？未来会废弃类组件吗？**
    - **React 团队鼓励使用函数式组件和 Hooks**
    - **类组件不会被废弃，但新功能可能优先支持函数式组件**

47. **React 的并发特性将如何改变应用开发？**
    - 更好的用户体验：非阻塞渲染
    - 新的设计模式：优先级管理
    - 性能改进：更精细的渲染控制

48. **React Server Components 未来会如何影响前端架构？**
    - 零客户端 JavaScript 的组件
    - 服务器和客户端代码的无缝集成
    - 更好的性能和用户体验
    - 新的数据获取和状态管理模式

49. **React 的竞品框架（Vue、Svelte、Solid）带来了哪些启示？**
    - 编译优化：从 Svelte 和 Solid 获得的启示
    - 反应性系统：从 Vue 获得的启示
    - 开发体验：从各框架的 API 设计中获得的启示

50. **WebAssembly 会如何影响 React 的未来？**
    - 性能提升可能性
    - 与现有 JavaScript 代码的集成
    - 新的渲染策略和优化

<div class="tag-container">
  <strong>标签:</strong> 
  <a class="tag tag-red">React</a>
  <a class="tag tag-green">前端</a>
  <a class="tag tag-blue">面试题</a>
</div>
