export default interface CurrencyType {
  _id: string;
  ids?: Array<string>;
  name: string;
  symbol: string;
  iso_code: string;
  exchange_rate: string;
  live_exchange_rates: "show" | "hide";
  status: "show" | "hide";
  created_at: Date;
  updated_at: Date;
  __v: number;
}
