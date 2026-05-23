import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "FilterList",
  pure: false,
  standalone: true,
})
export class FilterListPipe implements PipeTransform {
  constructor() {}

  transform(value: any, ...args: unknown[]) {
    if (!value?.length || !args?.length) {
      return [];
    }
    const key: string = args[0] as string;
    const valueKey = args[1] ? args[1] : true;
    return value.filter((data: any) => data[key] == valueKey);
  }
}
