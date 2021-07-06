import _ from "lodash";

// 下划线转换驼峰
export function toHump(name: string) {
  return name.replace(/\_(\w)/g, (all, letter) => letter.toUpperCase());
}

// 驼峰转换为'-'分割
export function toMidLine(name: string) {
  return name.replace(/([A-Z])/g, "-$1").toLowerCase();
}

export const difference = (obj: any, base: any) => {
  function changes(object: any, newBase: any) {
    return _.transform(object, (result: any, value: any, key: any) => {
      if (!_.isEqual(value, newBase[key])) {
        result[key] =
          _.isObject(value) && _.isObject(newBase[key])
            ? changes(value, newBase[key])
            : value;
      }
    });
  }
  return changes(obj, base);
};

function customizer(objValue: any, srcValue: any, propKey: any) {
  if (!_.isUndefined(objValue)) {
    console.error(`merge error:${propKey} 重复设置`);
    return objValue;
  }
  return srcValue;
}
export const mergeGiveupRepeat = _.partialRight(_.assignWith, customizer);

// function differenceItemCustomizer(objValue:any, srcValue:any) {
//   if(!_.isUndefined(objValue)) {

//   }
// }

export function filterNumPoint(val: any) {
  const curVal = val;
  let finalVal = curVal.toString();
  // if (!finalVal.split('.')[1]) {
  //   finalVal = finalVal.substr(0, finalVal.length - 1)
  // }
  if (finalVal.substring(finalVal.length - 1, finalVal.length) === ".") {
    finalVal = finalVal.substr(0, finalVal.length - 1);
  }
  return finalVal;
}
