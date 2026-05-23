import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "ImageSanitizer",
})
export class ImageSanitizerPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, ...args: unknown[]): unknown {
    if (value) {
      const randomValue = new Date().getMilliseconds();
      return `${value}?timer=${randomValue}`;
    }
    return null;
  }
}
