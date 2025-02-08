export default interface LanguageType {
  _id: string;
  ids?: Array<string>;
  name: string;
  iso_code: string;
  flag: string;
  status: "show" | "hide";
  created_at: Date;
  updated_at: Date;
  __v: number;
}
