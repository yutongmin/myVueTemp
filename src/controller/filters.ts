import dayjs from "dayjs";
import { keepTwoDecimal } from "@/utils/numberUtils";

interface Filters {
  [propsName: string]: Function;
}

const filters: Filters = {
  timeFormat: (value: string) => {
    if (!value) {
      return "";
    }
    return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
  },
  setDigital: keepTwoDecimal,
};

export default filters;
