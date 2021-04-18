import React, { Component } from 'react';
import 'styles/home.less';

class Home extends Component {
    render () {
        return (
            <div className="app-home">
                <div className="title">体验 React</div>
                <div className="content">React 从诞生之初就是可被逐步采用的，因而你可以按需引入或多或少的 React 特性。不管你是想体验下 React，用它给简单的 HTML 页面增加一点交互，还是要开始一个完全由 React 驱动的复杂应用，该章节内容里的链接都能帮你快速开始。</div>

                <div className="title">在线体验</div>
                <div className="content">如果你对体验 React 感兴趣，可以尝试在线代码编辑器。从 CodePen，CodeSandbox，Glitch, 或者 Stackblitz 开始一个 React 版本的 Hello World 模版。</div>
                <div className="content">如果你喜欢使用自己的文本编辑器，也可以下载这个 HTML 文件，然后编辑文件内容，最后再用浏览器从本地文件系统打开文件，预览页面效果。注意：这个文件中包含一个低效率的运行时代码转换脚本，所以我们推荐仅在简单的演示项目中使用。</div>

                <div className="title">在网站中添加 React</div>
                <div className="content">你可以立即在 HTML 文件中添加 React，然后选择逐渐拓展它的应用范围，或只在一些动态小部件中使用它。</div>
                
                <div className="title">创建新的 React 应用</div>
                <div className="content">当你刚开始一个 React 应用时，通过 HTML 的 script 标签引入 React 依然是最好的选项，因为这能让你的项目立即启动。</div>
                <div className="content">但随着应用越来越大，你可能会需要更加集成化的安装方式。我们推荐了一些 JavaScript 工具链，它们适合大型应用。它们只需很少甚至零配置，就能让你充分利用丰富的 React 生态。立即尝试。</div>

                <img className="start" src={ require('assets/images/start.jpg') } title="飞船" />

                <audio src={ require('assets/media/20210325.mp3') } controls />

            </div>
        )
    }
}

export default Home;