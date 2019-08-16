module.exports = {
    title: "Hertz's Blog",
    description: "Hertz's Blog By VuePress",
    base: '/VuePressBlogHtml/',
    themeConfig: {
        lastUpdated: '上次更新',
        nav: [
            {
                text: '前端',
                link: '/FrontEnd/'
            },
            {
                text: '后端',
                link: '/BackEnd/'
            },
            {
                text: '其他',
                link: '/Others/'
            },
            { text: 'GitHub', link: 'https://github.com/Hertz9409' },
        ],
        sidebarDepth: 3,
        sidebar: {
            '/FrontEnd/': [
                {
                    title: "JS",
                    collapsable: false,
                    children: [
                        ["JS/断点续传/", '断点续传'],
                        ["JS/正则表达式基础/", '正则表达式基础']
                    ]
                },
                {
                    title: "CSS",
                    collapsable: false,
                    children: [
                        ["CSS/CSS1/", 'css基础知识1'],
                        ["CSS/CSS2/", 'css基础知识2']
                    ]
                },
                {
                    title: "HTML",
                    collapsable: false,
                    children: []
                },
                {
                    title: "VUE",
                    collapsable: false,
                    children: [["VUE/My-Vue-Study-1/", 'VUE基础知识1'], ["VUE/My-Vue-Study-2/", 'VUE基础知识2'],]
                }
            ],
            '/Others/': [
                ["WIN10-FLASH-DEBUGGER-FOR-IE/", 'Win10下开启IE flash debugger'], ["代理服务/", '代理服务'], ["使用icomoon生成字体图标文件/", '使用icomoon生成字体图标文件']
            ]
        }
    },
    plugins: [
        ['@vuepress/back-to-top', true],
        ['@vuepress/pwa', {
          serviceWorker: true,
          updatePopup: true
        }],
        ['@vuepress/medium-zoom', true]
      ],
}