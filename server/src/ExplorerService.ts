import fs from "fs";
import { DirectoryTree } from "Shared/Domain/Services/FileCrawler/DirectoryTree";

export default class ExplorerService {
  public static explore<T, C>(handler: T, metadataKey: string): C[] {
    const handlerMetadata = Reflect.getMetadata(metadataKey, handler);
    if (!handlerMetadata) {
      return [];
    }

    return handlerMetadata;
  }

  public static bindControllers(): void {
    const dirPath = process.env.NODE_ENV === 'dev' ? `${process.cwd()}/src` : `${process.cwd()}/../src`;
    const tree = new DirectoryTree(dirPath);


    tree.crawl(ExplorerService.isPathOfAController);
  }

  private static isPathOfAController(path: string): void {
    const isInsideFolderCalledControllersRegex = new RegExp('(?<=/Controller).*?(?=.ts)');
    const spliced = path.split('/');

    const isController = spliced[spliced.length - 1].includes('Controller');
    if (
      path.includes('Controller') &&
      !fs.lstatSync(path).isDirectory() &&
      isInsideFolderCalledControllersRegex.test(path) &&
      isController
    ) {
      import(path);
    }
  }
}
