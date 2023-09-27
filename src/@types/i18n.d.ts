import "i18n";
import resources from "./resourses";

declare module "i18n" {
  interface CustomTypeOptions {
    // custom resources type
    resources: typeof resources;
    // other
  }
}
