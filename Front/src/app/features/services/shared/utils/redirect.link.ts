import {Injectable} from "@angular/core";

export class RedirectLink {
  // @ts-ignore
  @Injectable({
    providedIn: 'root',
  })
  constructor() {
  }

  getAttachmentUrl(filePath: string): string {
    const laravelBaseUrl = 'http://127.0.0.1:8000/storage';
    return `${laravelBaseUrl}/${filePath}`;
  }

}
