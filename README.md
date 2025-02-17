# vue-preset
结合 vue-cli3 的 preset 搭建基于 git repo 的前端项目模板

## 快速开始

```bash
# 安装 vue-cli 3.0
npm install -g @vue/cli

# 根据远程 preset 创建项目
vue create --preset lawrence998/vue-preset my-project
# or
vue create --preset direct:https://github.com/lawrence998/vue-preset my-project --clone
# 在gitlab私有服务器远程 preset 创建项目
vue create --preset gitlab:my-gitlab-server.com:group/projectname --clone my-project
vue create --preset direct:ssh://git@my-gitlab-server.com/group/projectname.git --clone my-project

# 本地预览
cd my-project && yarn run serve

```

## 文档
```bash
# 本地预览
npm run docs:dev

# 构建部署版本
npm run docs:build
```
## 待办
- [ ] 新增**多页**模板
- [x] 支持 REST 接口规范，可以参考 [restful](https://github.com/lawrence998/vue-preset/blob/ece3b851d947ec00d42815919ca32bb1e84be1b3/generator/template/src/services/request.js#L136)
- [x] axios retry 特性，可以参考 [axios-retry](https://github.com/lawrence998/vue-preset/blob/axios-retry/generator/template/src/services/request.js)
- [x] axios cancel request
- [x] 引入 vant-ui
- [x] 新增**TS**模板
- [x] 新增离线包相关特性

