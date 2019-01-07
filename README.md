# 基于gulp的适用于小程序的sass转wxss工具

## 初始化项目

1. 克隆项目到本地 https://github.com/lvyueyang/gulp-scss2wxss.git 安装

```bash
npm i
```

2. 在app文件夹下建立对应文件书写代码  

3. 启动实时编译  
```bash  
gulp serve 
```  
4. 立刻编译全部  
```bash  
gulp all
```

## 关于编译  
默认只编译在`app/style/`下的子文件, `app/style/modules` 下的文件不会编译  
在 `app/pages/`下的二级scss文件会被编译, 编译后的文件存在于同级目录  
