// vue全局组件注册
import Vue from "vue";
import _ from "lodash";
import { toMidLine } from "@/utils/commonTools";

const req: any = require;
const requireComponent = req.context(
  // 其组件目录的相对路径
  "@/components/base",
  // 是否查询其子目录
  false
);

/**
 * 该项目注册路径为/components/base
 * 则该路径下的组件不需要引入，可直接在vue组件里使用，使用名称为短横线命名
 * 例：TopHeader -> app-top-headers
 */
export default () => {
  requireComponent.keys().forEach((fileName: string) => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName);

    // 转换为短横线分割命名法
    const componentName = `app-${toMidLine(
      _.camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
    )}`;

    // 全局注册组件
    Vue.component(
      componentName,
      // 如果这个组件选项是通过 `export default` 导出的，
      // 那么就会优先使用 `.default`，
      // 否则回退到使用模块的根。
      componentConfig.default || componentConfig
    );
  });
};
