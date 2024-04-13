import {Injectable} from "@angular/core";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class RedirectLink {
  constructor() {}

  getAttachmentUrl(filePath: string): string {
    const laravelBaseUrl = environment.laravelBaseUrl;
    return `${laravelBaseUrl}/${filePath}`;
  }
}
