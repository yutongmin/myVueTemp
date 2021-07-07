import _ from "lodash";

/**
 * 判断一个数是否为正数
 * @param data
 */
export function isPositiveNumber(data: any) {
  if (_.isNumber(data) && data > 0) {
    return true;
  }
  return false;
}

/**
 * 判断一个数是否为非负数
 */
export function isNotNegativeNumber(data: any) {
  if (_.isNumber(data) && data >= 0) {
    return true;
  }
  return false;
}

/**
 * 输入类型
 */
export const INPUT_TYPE = {
  /**
   * 正数
   */
  positiveNumber: "positiveNumber",
  /**
   * 非负数
   */
  notNegativeNumber: "notNegativeNumber",
  /**
   * 字符串
   */
  string: "string",
};

export function getAge(birthday: any) {
  if (!birthday) {
    return "";
  }
  const birthdayStr = birthday.replace(/[^\d]/g, "-");
  let age: number | string = "";
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();
  const birthdayArray = birthdayStr.split("-");
  if (birthdayArray.length < 3) {
    return "";
  }
  const birthdayYear = birthdayArray[0];
  const birthdayMonth = birthdayArray[1];
  const birthdayDay = birthdayArray[2];

  if (todayMonth * 1 - birthdayMonth * 1 < 0) {
    age = todayYear * 1 - birthdayYear * 1 - 1;
  } else if (todayMonth * 1 - birthdayMonth * 1 > 0) {
    age = todayYear * 1 - birthdayYear * 1;
  } else if (todayDay - birthdayDay >= 0) {
    age = todayYear * 1 - birthdayYear * 1;
  } else {
    age = todayYear * 1 - birthdayYear * 1 - 1;
  }
  return age * 1;
}

/*
 * 保留两位小数
 */
export function keepTwoDecimal(price: any) {
  if (_.isNaN(Number(price)) || price === "" || price === null) {
    return "";
  }
  return Number(price).toFixed(2);
}

export default {};
