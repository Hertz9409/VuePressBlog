const { fs, path } = require('@vuepress/shared-utils')
module.exports = () => ({
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
                text: 'GIS',
                link: '/GIS/'
            },
            {
                text: '其他',
                link: '/Others/'
            },
            { text: 'GitHub', link: 'https://github.com/Hertz9409' },
        ],
        sidebarDepth: 3,
        sidebar: {
            '/FrontEnd/': getCatalog('FrontEnd'),
            '/BackEnd/': getCatalog('BackEnd'),
            '/GIS/': getCatalog('GIS'),
            '/Others/': getCatalog('Others')
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
})
// 获取当前目录,只有一级直接展示数组目录,二级目录需要分类展示,目前最多两级
function getCatalog(catalog) {
    let firstCatalog = [];
    let secondCatalog = [];
    fs.readdirSync(path.resolve(__dirname, `../${catalog}`)).forEach(dirname => {
        if (dirname.toLocaleUpperCase().indexOf('README') < 0) {
            firstCatalog.push([dirname + '/', dirname]);
            // 判断二级目录有没有README.md文件,没有则是二级目录文件夹,需要继续遍历
            if(fs.readdirSync(path.resolve(__dirname, `../${catalog}/${dirname}`)).includes('README.md')) {
                //
            } else {
                let children = [];
                fs.readdirSync(path.resolve(__dirname, `../${catalog}/${dirname}`)).forEach(filename => {
                    children.push([`${dirname}/${filename}/`, filename]);
                });
                secondCatalog.push({
                    title: dirname,
                    collapsable: false,
                    children
                });
            }
        }
    });
    return secondCatalog.length > 0 ? secondCatalog : firstCatalog;
}