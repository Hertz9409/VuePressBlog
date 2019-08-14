module.exports = {
    title: "Hertz's Blog",
    description: "Hertz's Blog By VuePress",
    themeConfig: {
        nav: [
            {
                text: '前端',
                link: '/FrontEnd/'
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
                }
            ]
        }
    }
}