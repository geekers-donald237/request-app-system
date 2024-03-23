import {Injectable} from "@angular/core";
import {environment} from "../../../../../environments/environment";

export class RedirectLink {
  // @ts-ignore
  @Injectable({
    providedIn: 'root',
  })
  constructor() {
  }

  getAttachmentUrl(filePath: string): string {
    const laravelBaseUrl = environment.laravelBaseUrl;
    return `${laravelBaseUrl}/${filePath}`;
  }

}
